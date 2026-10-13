import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { ClassLevel, ClassSession, ClassTemplate } from "@/lib/types";

// Data-access seam for the weekly timetable (Supabase). Server-only.

const WINDOW_DAYS = 28; // matches the booking window enforced by book_class()

type ScheduleRow = {
  template_id: string;
  class_date: string;
  starts_at: string;
  timezone: string;
  duration_minutes: number;
  location: string;
  level: ClassLevel;
  capacity: number;
  booked_count: number;
  spots_left: number;
  instructor_name: string | null;
  my_booking_id: string | null;
};

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Upcoming dated occurrences of an art's weekly classes, soonest first.
// Reads cookies (to know "my booking"), so call it behind <Suspense>.
export async function getSchedule(artSlug: string): Promise<ClassSession[]> {
  const supabase = await createClient();

  // After the cookie read, so this is request-time, not prerender-time.
  // Start a day early: the SQL function drops anything already started and
  // the studio's "today" can trail UTC.
  const from = new Date();
  from.setUTCDate(from.getUTCDate() - 1);
  const to = new Date();
  to.setUTCDate(to.getUTCDate() + WINDOW_DAYS);

  const { data, error } = await supabase.rpc("get_schedule", {
    p_art_slug: artSlug,
    p_from: isoDate(from),
    p_to: isoDate(to),
  });
  if (error) throw new Error(`get_schedule failed: ${error.message}`);

  return (data as ScheduleRow[]).map((r) => ({
    templateId: r.template_id,
    classDate: r.class_date,
    startsAt: r.starts_at,
    timezone: r.timezone,
    durationMinutes: r.duration_minutes,
    location: r.location,
    level: r.level,
    capacity: r.capacity,
    bookedCount: r.booked_count,
    spotsLeft: r.spots_left,
    instructorName: r.instructor_name,
    myBookingId: r.my_booking_id,
  }));
}

type TemplateRow = {
  id: string;
  art_slug: string;
  weekday: number;
  start_time: string;
  duration_minutes: number;
  location: string;
  capacity: number;
  level: ClassLevel;
  timezone: string;
  active: boolean;
  instructor_id: string | null;
};

// Weekly slots visible to the caller under RLS: every slot for admins, only
// their own for instructors.
export async function getTemplates(): Promise<ClassTemplate[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("class_templates")
    .select("*")
    .order("art_slug")
    .order("weekday")
    .order("start_time");
  if (error) throw new Error(`class_templates query failed: ${error.message}`);

  return (data as TemplateRow[]).map((r) => ({
    id: r.id,
    artSlug: r.art_slug,
    weekday: r.weekday,
    startTime: r.start_time,
    durationMinutes: r.duration_minutes,
    location: r.location,
    capacity: r.capacity,
    level: r.level,
    timezone: r.timezone,
    active: r.active,
    instructorId: r.instructor_id,
  }));
}

export async function getTemplateById(
  id: string,
): Promise<ClassTemplate | null> {
  const all = await getTemplates();
  return all.find((t) => t.id === id) ?? null;
}

export type StaffMember = { id: string; fullName: string; role: string };

// Admins and instructors, for the "instructor" dropdown. Under RLS only
// admins can read other people's profiles, so this is an admin-page helper.
export async function getStaff(): Promise<StaffMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .in("role", ["instructor", "admin"])
    .order("full_name");
  if (error) throw new Error(`profiles query failed: ${error.message}`);

  return data.map((p) => ({
    id: p.id as string,
    fullName: (p.full_name as string) || "(unnamed)",
    role: p.role as string,
  }));
}
