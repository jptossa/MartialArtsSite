"use client";

import { useActionState } from "react";
import { logIn, signUp, type FormState } from "@/lib/actions/auth";

const initialState: FormState = { error: null };

export function AuthForm({
  mode,
  next,
}: {
  mode: "login" | "signup";
  next: string;
}) {
  const [state, formAction, pending] = useActionState(
    mode === "signup" ? signUp : logIn,
    initialState,
  );
  const isSignup = mode === "signup";

  return (
    <form className="form" action={formAction}>
      <input type="hidden" name="next" value={next} />

      {isSignup && (
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
          />
        </div>
      )}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          minLength={isSignup ? 8 : undefined}
          required
        />
        {isSignup && <p className="hint">At least 8 characters.</p>}
      </div>

      {isSignup && (
        <div className="field">
          <label htmlFor="phone">Phone (optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
          />
          <p className="hint">So the studio can reach you about a class.</p>
        </div>
      )}

      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
      {state.message && (
        <p className="form-success" role="status">
          {state.message}
        </p>
      )}

      <button className="button" type="submit" disabled={pending}>
        {pending ? "Please wait…" : isSignup ? "Create account" : "Log in"}
      </button>
    </form>
  );
}
