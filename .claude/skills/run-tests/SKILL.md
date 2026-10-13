---
name: run-tests
description: Run this project's automated checks (ESLint, then the Next.js production build, which type-checks and prerenders every route) and report pass/fail. Use when the user asks to run the tests, run the test suite, run the checks or CI locally, or verify that nothing is broken before committing or shipping.
---

# Run the automated test suite

This project has **no unit-test runner**. Its automated suite is the same two steps GitHub Actions runs (`.github/workflows/ci.yml`), so passing here means CI should pass:

1. `npm run lint` — ESLint
2. `npm run build` — type-checks, compiles, and prerenders every route (including each `/martial-arts/[slug]` page)

Do not invent or install a test framework to satisfy this skill. If the user wants real unit tests, that is a separate request: ask which framework they want first.

## Steps

Run from the project root. Run them in order and keep going even if lint fails, so the user gets the full picture in one pass.

1. If `node_modules` is missing, run `npm ci` first.
2. Run `npm run lint`. Note the exit code and every error/warning with its `file:line`.
3. Run `npm run build` (give it a generous timeout, up to 10 minutes). No `ANTHROPIC_API_KEY` is needed. Note the exit code and, on failure, the first error with its `file:line`. Type errors and prerender errors both fail the build.
4. Report a short summary:
   - one line per step: pass or fail
   - for failures: the error text, the file and line, and a one-sentence likely cause
   - the overall verdict

## Notes

- Fix failures only if the user asked for that. By default, report them.
- Known false alarm: in `next dev`, React logs a "Encountered a script tag" warning for the theme script in `layout.tsx`. It is dev-only and intentional (see CLAUDE.md). It does not appear in lint or build.
- A prerender error mentioning an "unstable value" (`new Date()`, `Math.random()`) means a server component needs `"use cache"`, a client component, or `await connection()` (Cache Components is enabled).
- The chatbot's behavior (on-topic, recommendation, off-topic, escalation, injection scenarios) is checked **manually** and needs `ANTHROPIC_API_KEY`. It is not part of this suite. Do not run those scenarios unless the user asks. After any change to `src/lib/chat/system-prompt.ts` or `content/martial-arts/`, mention that they are still worth re-checking.
