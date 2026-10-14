import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";

// Cookie-backed Supabase client for server components, server actions and
// route handlers. Reads `cookies()`, so callers must sit behind <Suspense>.
export async function createClient() {
  // The Supabase client reads the clock while loading the session, which
  // Cache Components forbids during (pre)rendering. Wait for a real request
  // first, so session reads are never attempted in a prerender pass.
  await connection();
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a server component, which cannot set cookies.
            // Safe to ignore: src/proxy.ts refreshes the session instead.
          }
        },
      },
    },
  );
}
