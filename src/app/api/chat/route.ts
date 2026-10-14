import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import {
  CHAT_MODEL,
  ESCALATE_MARKER,
  HARD_QUESTION_MAX_OUTPUT_TOKENS,
  HARD_QUESTION_MODEL,
  MAX_HISTORY_MESSAGES,
  MAX_MESSAGE_CHARS,
  MAX_OUTPUT_TOKENS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/chat/config";
import { claimSonnetSlot } from "@/lib/chat/sonnet-budget";
import { buildSystemPrompt, DIFFICULTY_CHECK } from "@/lib/chat/system-prompt";
import {
  supportHours,
  supportPhone,
  supportRep,
} from "@/lib/mock-data/site-content";

const handoff = `For anything I can't sort out, ${supportRep} can help at ${supportPhone} (${supportHours}).`;
const TROUBLE = `Sorry, I'm having trouble right now. ${handoff}`;
const DECLINED = `I can't help with that one. ${handoff}`;

// SDK reads ANTHROPIC_API_KEY from the environment.
const client = new Anthropic();

type ChatMessage = { role: "user" | "assistant"; content: string };
type SystemBlocks = Anthropic.TextBlockParam[];

// A stream whose first event has already arrived, so connection/auth errors
// surface before we commit to an HTTP response.
type Opened = {
  stream: ReturnType<typeof client.messages.stream>;
  iterator: AsyncIterator<Anthropic.MessageStreamEvent>;
  first: IteratorResult<Anthropic.MessageStreamEvent>;
};

// Best-effort per-IP limiter. In-memory, so it is per server instance only.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.trim() === "") return null;
    // Assistant turns are our own earlier (longer) replies.
    const limit = role === "user" ? MAX_MESSAGE_CHARS : MAX_MESSAGE_CHARS * 4;
    if (content.length > limit) return null;
    messages.push({ role, content });
  }

  const recent = messages.slice(-MAX_HISTORY_MESSAGES);
  while (recent.length > 0 && recent[0].role !== "user") recent.shift();
  if (recent.length === 0 || recent[recent.length - 1].role !== "user") {
    return null;
  }
  return recent;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function openStream(
  tier: "fast" | "hard",
  system: SystemBlocks,
  messages: ChatMessage[],
): Promise<Opened> {
  const stream =
    tier === "fast"
      ? client.messages.stream({
          model: CHAT_MODEL,
          max_tokens: MAX_OUTPUT_TOKENS,
          // Chat doesn't need reasoning, and adaptive thinking draws on
          // max_tokens (it once used the whole budget and left an empty or
          // cut-off reply).
          thinking: { type: "disabled" },
          output_config: { effort: "low" },
          system,
          messages,
        })
      : client.messages.stream({
          model: HARD_QUESTION_MODEL,
          max_tokens: HARD_QUESTION_MAX_OUTPUT_TOKENS,
          // Thinking stays on (the default): this tier exists for questions
          // that benefit from it.
          output_config: { effort: "medium" },
          system,
          messages,
        });
  const iterator = stream[Symbol.asyncIterator]();
  return { stream, iterator, first: await iterator.next() };
}

// Visible text of a reply. Thinking and other non-text events are skipped.
async function* textOf({ iterator, first }: Opened): AsyncGenerator<string> {
  let result = first;
  while (!result.done) {
    const event = result.value;
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      yield event.delta.text;
    } else if (
      event.type === "message_delta" &&
      event.delta.stop_reason === "refusal"
    ) {
      yield `\n\n${DECLINED}`;
    } else if (
      event.type === "message_delta" &&
      event.delta.stop_reason === "max_tokens"
    ) {
      console.warn("chat: reply hit max_tokens");
    }
    result = await iterator.next();
  }
}

// Haiku flagged a hard question. Spend one of today's Sonnet slots on it; if
// the budget is gone (or Sonnet can't be reached), Haiku answers as best it can.
async function openHardAnswer(
  system: SystemBlocks,
  messages: ChatMessage[],
): Promise<Opened> {
  if (await claimSonnetSlot()) {
    try {
      const opened = await openStream("hard", system, messages);
      console.info("chat: hard question answered by", HARD_QUESTION_MODEL);
      return opened;
    } catch (error) {
      console.error("chat: hard-question model failed, using Haiku", error);
    }
  } else {
    console.info("chat: hard question, but no Sonnet slot; Haiku answers");
  }
  return openStream("fast", system, messages);
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return errorResponse(
      `The chat assistant isn't set up yet. ${handoff}`,
      503,
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return errorResponse(
      "You're sending messages faster than we can read them. Give it a minute and try again.",
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request.", 400);
  }
  const messages = parseMessages(body);
  if (!messages) {
    return errorResponse(
      `Invalid message. Keep it under ${MAX_MESSAGE_CHARS} characters.`,
      400,
    );
  }

  // The main prompt (with the documents) is the cached prefix. Only the first
  // Haiku pass gets the extra routing instruction, so it never leaks into the
  // answering pass.
  const main: Anthropic.TextBlockParam = {
    type: "text",
    text: await buildSystemPrompt(),
    cache_control: { type: "ephemeral" },
  };
  const answerPrompt: SystemBlocks = [main];
  // A visitor who types the marker is trying to burn Sonnet slots on demand,
  // so such a message gets no routing instruction and just gets a normal answer.
  const routingAllowed = !messages[messages.length - 1].content.includes(
    ESCALATE_MARKER,
  );
  const routingPrompt: SystemBlocks = routingAllowed
    ? [main, { type: "text", text: DIFFICULTY_CHECK }]
    : answerPrompt;

  let haiku: Opened;
  try {
    haiku = await openStream("fast", routingPrompt, messages);
  } catch (error) {
    console.error("chat: request failed", error);
    if (error instanceof Anthropic.RateLimitError) {
      return errorResponse(TROUBLE, 503);
    }
    return errorResponse(TROUBLE, 502);
  }

  const encoder = new TextEncoder();
  const body$ = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wroteText = false;
      const emit = (text: string) => {
        if (!text) return;
        wroteText = true;
        controller.enqueue(encoder.encode(text));
      };

      try {
        // Hold back the first few characters: if the reply is the escalation
        // marker, swallow it and hand the question up instead of showing it.
        let held = "";
        let decided = !routingAllowed; // no routing: stream straight through
        let escalate = false;
        for await (const chunk of textOf(haiku)) {
          if (decided) {
            emit(chunk);
            continue;
          }
          held += chunk;
          const probe = held.trimStart();
          if (probe.startsWith(ESCALATE_MARKER)) {
            escalate = true;
            break;
          }
          if (ESCALATE_MARKER.startsWith(probe)) continue; // might still become the marker
          decided = true;
          emit(held);
        }
        if (escalate) {
          haiku.stream.abort();
          const hard = await openHardAnswer(answerPrompt, messages);
          for await (const chunk of textOf(hard)) emit(chunk);
        } else if (!decided) {
          emit(held); // stream ended while still a (partial) marker prefix
        }
        // Never leave the visitor with a blank reply.
        if (!wroteText) emit(TROUBLE);
      } catch (error) {
        console.error("chat: stream failed", error);
        emit(`\n\n${TROUBLE}`);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body$, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
