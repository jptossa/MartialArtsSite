import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Refreshes the Supabase session cookie on every page request, and sends
// logged-out visitors away from member-only pages. This redirect is a
// convenience only: authorization is re-checked in src/lib/auth.ts and by
// row-level security.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Supabase not configured yet (fresh clone, CI): keep the public site up.
  if (!url || !key) return response;

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // Validates the JWT and refreshes it when it is close to expiry.
  const { data } = await supabase.auth.getClaims();

  const { pathname } = request.nextUrl;
  const needsLogin =
    pathname === "/account" ||
    pathname.startsWith("/account/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (!data?.claims && needsLogin) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Skip static assets and the chat API (no session needed there).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/chat|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
