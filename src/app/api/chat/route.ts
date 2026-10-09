import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import {
  CHAT_MODEL,
  MAX_HISTORY_MESSAGES,
  MAX_MESSAGE_CHARS,
  MAX_OUTPUT_TOKENS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/chat/config";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";
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

  const encoder = new TextEncoder();
  let iterator: AsyncIterator<Anthropic.MessageStreamEvent>;
  let first: IteratorResult<Anthropic.MessageStreamEvent>;
  try {
    const stream = client.messages.stream({
      model: CHAT_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      output_config: { effort: "low" },
      system: [
        {
          type: "text",
          text: await buildSystemPrompt(),
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });
    iterator = stream[Symbol.asyncIterator]();
    // Pull the first event now so connection/auth errors become a real
    // HTTP error instead of a half-open stream.
    first = await iterator.next();
  } catch (error) {
    console.error("chat: request failed", error);
    if (error instanceof Anthropic.RateLimitError) {
      return errorResponse(TROUBLE, 503);
    }
    return errorResponse(TROUBLE, 502);
  }

  const body$ = new ReadableStream<Uint8Array>({
    async start(controller) {
      const write = (text: string) => controller.enqueue(encoder.encode(text));
      try {
        let result = first;
        while (!result.done) {
          const event = result.value;
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            write(event.delta.text);
          } else if (
            event.type === "message_delta" &&
            event.delta.stop_reason === "refusal"
          ) {
            write(`\n\n${DECLINED}`);
          }
          result = await iterator.next();
        }
      } catch (error) {
        console.error("chat: stream failed", error);
        write(`\n\n${TROUBLE}`);
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
