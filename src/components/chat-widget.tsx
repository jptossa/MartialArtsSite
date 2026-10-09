"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  supportHours,
  supportPhone,
  supportPhoneHref,
  supportRep,
} from "@/lib/mock-data/site-content";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Which martial art is best for self-defense?",
  "I'm a total beginner. Where do I start?",
  "Compare Muay Thai and Brazilian Jiu-Jitsu",
];

const GREETING =
  "Welcome. Tell me about your goals and experience and I'll point you toward a martial art. No quiz about your spirit animal.";

const MAX_CHARS = 1000;

// Only internal martial art pages become links; everything else stays plain text.
const PATH_PATTERN = /(\/martial-arts\/[a-z0-9-]+)/g;
const PATH_ONLY = /^\/martial-arts\/[a-z0-9-]+$/;

function renderText(text: string) {
  return text.split(PATH_PATTERN).map((part, i) =>
    PATH_ONLY.test(part) ? (
      <Link key={i} href={part}>
        {part}
      </Link>
    ) : (
      part
    ),
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, error, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string, base: Message[] = messages) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const history: Message[] = [...base, { role: "user", content: trimmed }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error ?? `Sorry, something went wrong. Call ${supportPhone}.`,
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: reply }]);
      }
      if (!reply.trim()) throw new Error("No reply came back. Please try again.");
    } catch (e) {
      // Drop the empty assistant bubble and show the error with a retry.
      setMessages((current) =>
        current[current.length - 1]?.content === ""
          ? current.slice(0, -1)
          : current,
      );
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  return (
    <div className="chat">
      {open && (
        <section className="chat-panel" role="dialog" aria-label="Chat assistant">
          <header className="chat-head">
            <h2>Ask the Dojo</h2>
            <button
              type="button"
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              &times;
            </button>
          </header>

          <div className="chat-log" ref={logRef} aria-live="polite">
            <p className="chat-msg chat-msg-bot">{GREETING}</p>
            {messages.length === 0 && (
              <ul className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => void send(s)}>
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {messages.map((m, i) => (
              <p
                key={i}
                className={`chat-msg ${m.role === "user" ? "chat-msg-user" : "chat-msg-bot"}`}
              >
                {m.content === "" ? (
                  <span className="chat-typing">Thinking&hellip;</span>
                ) : (
                  renderText(m.content)
                )}
              </p>
            ))}
            {error && (
              <div className="chat-error" role="alert">
                <p>{error}</p>
                {lastUser && (
                  <button
                    type="button"
                    // Resend the unanswered user turn on top of the history before it.
                    onClick={() => void send(lastUser.content, messages.slice(0, -1))}
                  >
                    Try again
                  </button>
                )}
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <label htmlFor="chat-input" className="visually-hidden">
              Your message
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={2}
              value={input}
              maxLength={MAX_CHARS}
              placeholder="Ask about a martial art…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
            />
            <button type="submit" disabled={pending || !input.trim()}>
              Send
            </button>
          </form>

          <p className="chat-foot">
            Prefer a person? Call {supportRep}:{" "}
            <a href={supportPhoneHref}>{supportPhone}</a>
            <span> ({supportHours})</span>
          </p>
        </section>
      )}

      <button
        type="button"
        className="chat-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "Close" : "Ask the Dojo"}
      </button>
    </div>
  );
}
