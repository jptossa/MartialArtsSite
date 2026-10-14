import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthPanel } from "@/components/auth-panel";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage(props: PageProps<"/signup">) {
  return (
    <main className="narrow">
      <h1>Create your account</h1>
      <p className="lede">
        An account lets you book classes and manage your bookings.
      </p>
      <Suspense fallback={<p>Loading&hellip;</p>}>
        <AuthPanel mode="signup" searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
