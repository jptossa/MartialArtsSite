"use client";

import { useActionState } from "react";
import {
  bookClassAction,
  cancelBookingAction,
} from "@/lib/actions/booking";
import type { FormState } from "@/lib/actions/auth";

const initialState: FormState = { error: null };

export function BookButton({
  templateId,
  classDate,
}: {
  templateId: string;
  classDate: string;
}) {
  const [state, formAction, pending] = useActionState(
    bookClassAction,
    initialState,
  );

  return (
    <form className="inline-form" action={formAction}>
      <input type="hidden" name="templateId" value={templateId} />
      <input type="hidden" name="classDate" value={classDate} />
      <button className="button small" type="submit" disabled={pending}>
        {pending ? "Booking…" : "Book"}
      </button>
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}

export function CancelButton({ bookingId }: { bookingId: string }) {
  const [state, formAction, pending] = useActionState(
    cancelBookingAction,
    initialState,
  );

  return (
    <form className="inline-form" action={formAction}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <button className="button small ghost" type="submit" disabled={pending}>
        {pending ? "Cancelling…" : "Cancel"}
      </button>
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
