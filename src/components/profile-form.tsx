"use client";

import { useActionState } from "react";
import { updateProfile, type FormState } from "@/lib/actions/auth";

const initialState: FormState = { error: null };

export function ProfileForm({
  fullName,
  phone,
  email,
}: {
  fullName: string;
  phone: string | null;
  email: string;
}) {
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );

  return (
    <form className="form" action={formAction}>
      <div className="field">
        <label htmlFor="profile-email">Email</label>
        <input id="profile-email" type="email" value={email} readOnly />
      </div>

      <div className="field">
        <label htmlFor="profile-name">Full name</label>
        <input
          id="profile-name"
          name="fullName"
          type="text"
          defaultValue={fullName}
          autoComplete="name"
          maxLength={100}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="profile-phone">Phone</label>
        <input
          id="profile-phone"
          name="phone"
          type="tel"
          defaultValue={phone ?? ""}
          autoComplete="tel"
          maxLength={30}
        />
      </div>

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
        {pending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
