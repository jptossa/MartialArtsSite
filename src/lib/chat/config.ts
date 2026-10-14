// Haiku keeps the assistant fast and cheap. Override with CHAT_MODEL if needed.
export const CHAT_MODEL = process.env.CHAT_MODEL ?? "claude-haiku-5-5";

// Replies are short by prompt design; this is headroom, not a target.
export const MAX_OUTPUT_TOKENS = 1024;

// Hard questions are handed up to a larger model, up to a daily cap enforced
// in Supabase (claim_sonnet_slot(); the limit itself lives in that SQL
// function). Sonnet is allowed to think, and thinking counts against
// max_tokens, so it gets a bigger budget.
export const HARD_QUESTION_MODEL =
  process.env.CHAT_HARD_MODEL ?? "claude-sonnet-5-5";
export const HARD_QUESTION_MAX_OUTPUT_TOKENS = 4096;

// Haiku replies with exactly this (and nothing else) to flag a hard question.
// The route swallows it; visitors never see it.
export const ESCALATE_MARKER = "[[HARD_QUESTION]]";
export const MAX_HISTORY_MESSAGES = 20;
export const MAX_MESSAGE_CHARS = 1000;

// Best-effort per-IP limit (in-memory, so per server instance).
export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 12;
