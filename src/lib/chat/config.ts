// Haiku keeps the assistant fast and cheap. Override with CHAT_MODEL if needed.
export const CHAT_MODEL = process.env.CHAT_MODEL ?? "claude-haiku-5-5";

export const MAX_OUTPUT_TOKENS = 600;
export const MAX_HISTORY_MESSAGES = 20;
export const MAX_MESSAGE_CHARS = 1000;

// Best-effort per-IP limit (in-memory, so per server instance).
export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 12;
