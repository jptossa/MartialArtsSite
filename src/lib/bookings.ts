import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { MyBooking, RosterEntry } from "@/lib/types";

// Data-access seam for bookings (Supabase). Server-only. All writes go
// through the book_class()/cancel_booking() SQL functions, which enforce
// capacity, weekday, window and cutoff rules.

const errorMessages: Record<string, string> = {
  not_authenticated: "Please log in to book a class.",
  class_not_found: "That class is no longer available.",
  wrong_weekday: "That class does not run on that date.",
  class_started: "That class has already started.",
  outside_window: "You can only book up to four weeks ahead.",
  already_booked: "You are already booked into this class.",
  class_full: "Sorry, this class is full.",
  overlap: "You already have a class that overlaps this time.",
  too_many_bookings: "You can hold at most 10 upcoming bookings.",
  booking_not_found: "We could not find that booking.",
  cancel_too_late: "Bookings can only be cancelled up to 2 hours before the class.",
};

export function bookingErrorMessage(message: string): string {
  return errorMessages[message] ?? "Something went wrong. Please try again.";
}

export async function bookClass(
  templateId: string,
  classDate: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("book_class", {
    p_template_id: templateId,
    p_class_date: classDate,
  });
  return { error: error ? bookingErrorMessage(error.message) : null };
}

export async function cancelBooking(
  bookingId: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("cancel_booking", {
    p_booking_id: bookingId,
  });
  return { error: error ? bookingErrorMessage(error.message) : null };
}

type MyBookingRow = {
  booking_id: string;
  art_slug: string;
  class_date: string;
  starts_at: string;
  timezone: string;
  duration_minutes: number;
  location: string;
  status: "booked" | "cancelled";
};

// The signed-in user's bookings, newest class first.
export async function getMyBookings(): Promise<MyBooking[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_my_bookings");
  if (error) throw new Error(`get_my_bookings failed: ${error.message}`);

  return (data as MyBookingRow[]).map((r) => ({
    bookingId: r.booking_id,
    artSlug: r.art_slug,
    classDate: r.class_date,
    startsAt: r.starts_at,
    timezone: r.timezone,
    durationMinutes: r.duration_minutes,
    location: r.location,
    status: r.status,
  }));
}

type RosterRow = {
  booking_id: string;
  full_name: string;
  phone: string | null;
  booked_at: string;
};

// Booked members for one session; the database only returns rows to admins
// and to the slot's own instructor.
export async function getRoster(
  templateId: string,
  classDate: string,
): Promise<RosterEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_roster", {
    p_template_id: templateId,
    p_class_date: classDate,
  });
  if (error) throw new Error(`get_roster failed: ${error.message}`);

  return (data as RosterRow[]).map((r) => ({
    bookingId: r.booking_id,
    fullName: r.full_name,
    phone: r.phone,
    bookedAt: r.booked_at,
  }));
}

// Splits bookings into classes still to come (soonest first) and everything
// else (past or cancelled). Reads the clock, so call it at request time.
export function splitBookings(bookings: MyBooking[]): {
  upcoming: MyBooking[];
  history: MyBooking[];
} {
  const now = Date.now();
  const upcoming = bookings
    .filter((b) => b.status === "booked" && Date.parse(b.startsAt) > now)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const history = bookings.filter((b) => !upcoming.includes(b));
  return { upcoming, history };
}
