import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser, isSupabaseConfigured, safeNextPath } from "@/lib/auth";

// Body of the /login and /signup pages. Reads the session and ?next=, so the
// pages wrap it in <Suspense>.
export async function AuthPanel({
  mode,
  searchParams,
}: {
  mode: "login" | "signup";
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (!isSupabaseConfigured()) {
    return <p>Accounts are not available yet. Please check back soon.</p>;
  }

  const { next } = await searchParams;
  const nextPath =
    safeNextPath(Array.isArray(next) ? next[0] : next) ?? "/account";

  // Already signed in: skip the form.
  if (await getCurrentUser()) redirect(nextPath);

  const query = nextPath === "/account" ? "" : `?next=${encodeURIComponent(nextPath)}`;

  return (
    <>
      <AuthForm mode={mode} next={nextPath} />
      <p className="form-alt">
        {mode === "login" ? (
          <>
            New here? <Link href={`/signup${query}`}>Create an account</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href={`/login${query}`}>Log in</Link>
          </>
        )}
      </p>
    </>
  );
}
