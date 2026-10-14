import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The chatbot reads content/martial-arts/*.txt at runtime (src/lib/chat/
  // knowledge.ts). File tracing currently finds that folder on its own; this
  // makes sure the files are always bundled with the route on Vercel, even if
  // the path logic changes.
  outputFileTracingIncludes: {
    "/api/chat": ["./content/**/*"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
