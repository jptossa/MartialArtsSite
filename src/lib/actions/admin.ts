"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { getMartialArtBySlug } from "@/lib/martial-arts";
import { createClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/actions/auth";

const LEVELS = ["beginner", "intermediate", "advanced", "all"];
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Admin only. The database enforces the same rule through row-level security.
export async function createTemplate(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireRole(["admin"], "/admin");

  const artSlug = String(formData.get("artSlug") ?? "");
  const weekday = Number(formData.get("weekday"));
  const startTime = String(formData.get("startTime") ?? "");
  const durationMinutes = Number(formData.get("durationMinutes"));
  const capacity = Number(formData.get("capacity"));
  const level = String(formData.get("level") ?? "");
  const location = String(formData.get("location") ?? "").trim();
  const instructorId = String(formData.get("instructorId") ?? "");

  if (!(await getMartialArtBySlug(artSlug))) {
    return { error: "Choose a martial art." };
  }
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
    return { error: "Choose a weekday." };
  }
  if (!/^\d{2}:\d{2}$/.test(startTime)) return { error: "Enter a start time." };
  if (
    !Number.isInteger(durationMinutes) ||
    durationMinutes < 15 ||
    durationMinutes > 240
  ) {
    return { error: "Duration must be between 15 and 240 minutes." };
  }
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 200) {
    return { error: "Capacity must be between 1 and 200." };
  }
  if (!LEVELS.includes(level)) return { error: "Choose a level." };
  if (!location || location.length > 80) {
    return { error: "Enter a location (80 characters or fewer)." };
  }
  if (instructorId && !UUID_PATTERN.test(instructorId)) {
    return { error: "Invalid instructor." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("class_templates").insert({
    art_slug: artSlug,
    weekday,
    start_time: startTime,
    duration_minutes: durationMinutes,
    capacity,
    level,
    location,
    instructor_id: instructorId || null,
  });
  if (error) return { error: "Could not save the class. Please try again." };

  revalidatePath("/admin");
  revalidatePath("/martial-arts/[slug]", "page");
  return { error: null, message: "Class added to the weekly timetable." };
}

export async function setTemplateActive(formData: FormData) {
  await requireRole(["admin"], "/admin");

  const id = String(formData.get("id") ?? "");
  const active = formData.get("active") === "true";
  if (!UUID_PATTERN.test(id)) return;

  const supabase = await createClient();
  await supabase.from("class_templates").update({ active }).eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/martial-arts/[slug]", "page");
}
