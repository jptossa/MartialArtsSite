"use server";

import { revalidatePath } from "next/cache";
import { bookClass, cancelBooking } from "@/lib/bookings";
import type { FormState } from "@/lib/actions/auth";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function refresh() {
  revalidatePath("/martial-arts/[slug]", "page");
  revalidatePath("/account");
}

export async function bookClassAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const templateId = String(formData.get("templateId") ?? "");
  const classDate = String(formData.get("classDate") ?? "");
  if (!UUID_PATTERN.test(templateId) || !DATE_PATTERN.test(classDate)) {
    return { error: "Invalid class." };
  }

  // The SQL function checks the session itself (auth.uid()) and every rule.
  const { error } = await bookClass(templateId, classDate);
  refresh();
  return error ? { error } : { error: null, message: "Booked!" };
}

export async function cancelBookingAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const bookingId = String(formData.get("bookingId") ?? "");
  if (!UUID_PATTERN.test(bookingId)) return { error: "Invalid booking." };

  const { error } = await cancelBooking(bookingId);
  refresh();
  return error ? { error } : { error: null, message: "Booking cancelled." };
}
