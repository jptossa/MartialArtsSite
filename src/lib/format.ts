// Class times are shown in the studio's timezone, not the visitor's.

export function formatClassDay(startsAt: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone,
  }).format(new Date(startsAt));
}

export function formatClassTime(startsAt: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(new Date(startsAt));
}

export const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// "18:00:00" -> "6:00 PM"
export function formatStartTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${period}`;
}

// YYYY-MM-DD plus/minus whole days (pure calendar math, no timezone).
export function shiftDate(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// The next date (today included) that falls on `weekday` in `timeZone`.
// Reads the clock, so only call it at request time.
export function nextOccurrence(weekday: number, timeZone: string): string {
  // en-CA formats as YYYY-MM-DD.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone }).format(
    new Date(),
  );
  const todayWeekday = new Date(`${today}T00:00:00Z`).getUTCDay();
  return shiftDate(today, (weekday - todayWeekday + 7) % 7);
}
