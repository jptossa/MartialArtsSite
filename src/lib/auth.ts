import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { CurrentUser, UserRole } from "@/lib/types";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

// Only same-site paths, so "?next=" cannot bounce users to another origin.
export function safeNextPath(next: unknown): string | null {
  if (typeof next !== "string") return null;
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("\\")) {
    return null;
  }
  return next;
}

// The signed-in user, or null. Reads the session cookie, so callers must sit
// behind <Suspense> (Cache Components). Deduped per request by React cache().
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  // getClaims() verifies the JWT; getSession() would trust the cookie as-is.
  const { data, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError) console.error("getCurrentUser: getClaims failed", claimsError);
  const claims = data?.claims;
  if (!claims) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, phone, role")
    .eq("id", claims.sub)
    .single();
  if (!profile) {
    // A valid session without a readable profile row: say why, don't just
    // look "logged out".
    console.error("getCurrentUser: signed in but no profile", {
      userId: claims.sub,
      error: profileError,
    });
    return null;
  }

  return {
    id: claims.sub,
    email: typeof claims.email === "string" ? claims.email : "",
    fullName: profile.full_name,
    phone: profile.phone,
    role: profile.role as UserRole,
  };
});

export async function requireUser(next?: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect(next ? `/login?next=${encodeURIComponent(next)}` : "/login");
  }
  return user;
}

// Page/action guard for staff areas. Row-level security enforces the same
// rules in the database; this just gives a clean redirect.
export async function requireRole(
  roles: UserRole[],
  next?: string,
): Promise<CurrentUser> {
  const user = await requireUser(next);
  if (!roles.includes(user.role)) redirect("/account");
  return user;
}
