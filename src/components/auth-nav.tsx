import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logOut } from "@/lib/actions/auth";

// Header items that depend on the session. Reads cookies, so the layout wraps
// it in <Suspense> with a static "Log in" fallback.
export async function AuthNav() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <li>
          <Link href="/login">Log in</Link>
        </li>
        <li>
          <Link href="/signup">Sign up</Link>
        </li>
      </>
    );
  }

  return (
    <>
      {(user.role === "admin" || user.role === "instructor") && (
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      )}
      <li>
        <Link href="/account">Account</Link>
      </li>
      <li>
        <form action={logOut}>
          <button type="submit" className="nav-button">
            Log out
          </button>
        </form>
      </li>
    </>
  );
}
