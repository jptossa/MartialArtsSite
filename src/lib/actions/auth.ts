"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser, safeNextPath } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error: string | null; message?: string | null };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function signUp(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const fullName = text(formData, "fullName");
  const email = text(formData, "email");
  const phone = text(formData, "phone");
  const password = String(formData.get("password") ?? "");

  if (!fullName) return { error: "Please enter your name." };
  if (fullName.length > 100) return { error: "That name is too long." };
  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (password.length < 8) {
    return { error: "Your password must be at least 8 characters." };
  }
  if (phone.length > 30) return { error: "That phone number is too long." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) return { error: error.message };

  // With "Confirm email" off in Supabase, signUp returns a session and the
  // visitor is logged in right away. If it is on, there is no session yet.
  if (!data.session || !data.user) {
    return {
      error: null,
      message: "Account created. Check your email to confirm it, then log in.",
    };
  }

  if (phone) {
    await supabase.from("profiles").update({ phone }).eq("id", data.user.id);
  }

  redirect(safeNextPath(formData.get("next")) ?? "/account");
}

export async function logIn(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Invalid email or password." };

  redirect(safeNextPath(formData.get("next")) ?? "/account");
}

export async function logOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateProfile(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await requireUser("/account");
  const fullName = text(formData, "fullName");
  const phone = text(formData, "phone");

  if (!fullName) return { error: "Please enter your name." };
  if (fullName.length > 100) return { error: "That name is too long." };
  if (phone.length > 30) return { error: "That phone number is too long." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, phone: phone || null })
    .eq("id", user.id);
  if (error) return { error: "Could not save your profile. Please try again." };

  revalidatePath("/account");
  return { error: null, message: "Profile saved." };
}
