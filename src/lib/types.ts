export type MartialArtCategory = "striking" | "grappling" | "hybrid" | "weapons";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export type MartialArtDetail = {
  title: string;
  description: string;
};

export type MartialArt = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  originCountry: string;
  category: MartialArtCategory;
  difficulty: Difficulty;
  focusAreas: MartialArtDetail[];
  benefits: MartialArtDetail[];
};

export type Benefit = {
  title: string;
  description: string;
};

export type Service = {
  title: string;
  description: string;
};

// ---- Accounts and class booking ----

export type UserRole = "member" | "instructor" | "admin";
export type ClassLevel = Difficulty | "all";

export type CurrentUser = {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: UserRole;
};

// One dated occurrence of a weekly slot, with live seat counts.
export type ClassSession = {
  templateId: string;
  classDate: string; // YYYY-MM-DD in the studio's timezone
  startsAt: string; // ISO instant
  timezone: string;
  durationMinutes: number;
  location: string;
  level: ClassLevel;
  capacity: number;
  bookedCount: number;
  spotsLeft: number;
  instructorName: string | null;
  myBookingId: string | null;
};

export type MyBooking = {
  bookingId: string;
  artSlug: string;
  classDate: string;
  startsAt: string;
  timezone: string;
  durationMinutes: number;
  location: string;
  status: "booked" | "cancelled";
};

// A weekly slot as managed by staff.
export type ClassTemplate = {
  id: string;
  artSlug: string;
  weekday: number; // 0 = Sunday
  startTime: string; // HH:MM:SS
  durationMinutes: number;
  location: string;
  capacity: number;
  level: ClassLevel;
  timezone: string;
  active: boolean;
  instructorId: string | null;
};

export type RosterEntry = {
  bookingId: string;
  fullName: string;
  phone: string | null;
  bookedAt: string;
};
