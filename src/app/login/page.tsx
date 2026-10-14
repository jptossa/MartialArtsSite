import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthPanel } from "@/components/auth-panel";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <main className="narrow">
      <h1>Log in</h1>
      <Suspense fallback={<p>Loading&hellip;</p>}>
        <AuthPanel mode="login" searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
