"use client";

import { useActionState } from "react";
import { createTemplate } from "@/lib/actions/admin";
import type { FormState } from "@/lib/actions/auth";
import { weekdayNames } from "@/lib/format";

const initialState: FormState = { error: null };

export function TemplateForm({
  arts,
  staff,
}: {
  arts: { slug: string; name: string }[];
  staff: { id: string; fullName: string }[];
}) {
  const [state, formAction, pending] = useActionState(
    createTemplate,
    initialState,
  );

  return (
    <form className="form form-wide" action={formAction}>
      <div className="field">
        <label htmlFor="t-art">Martial art</label>
        <select id="t-art" name="artSlug" required defaultValue="">
          <option value="" disabled>
            Choose&hellip;
          </option>
          {arts.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="t-weekday">Day</label>
        <select id="t-weekday" name="weekday" required defaultValue="">
          <option value="" disabled>
            Choose&hellip;
          </option>
          {weekdayNames.map((name, i) => (
            <option key={name} value={i}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="t-start">Start time</label>
        <input id="t-start" name="startTime" type="time" required />
      </div>

      <div className="field">
        <label htmlFor="t-duration">Duration (minutes)</label>
        <input
          id="t-duration"
          name="durationMinutes"
          type="number"
          min={15}
          max={240}
          step={5}
          defaultValue={60}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="t-capacity">Capacity</label>
        <input
          id="t-capacity"
          name="capacity"
          type="number"
          min={1}
          max={200}
          defaultValue={12}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="t-level">Level</label>
        <select id="t-level" name="level" defaultValue="all" required>
          <option value="all">All levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="t-location">Location</label>
        <input
          id="t-location"
          name="location"
          type="text"
          defaultValue="Main studio"
          maxLength={80}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="t-instructor">Instructor (optional)</label>
        <select id="t-instructor" name="instructorId" defaultValue="">
          <option value="">None</option>
          {staff.map((s) => (
            <option key={s.id} value={s.id}>
              {s.fullName}
            </option>
          ))}
        </select>
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
        {pending ? "Saving…" : "Add to timetable"}
      </button>
    </form>
  );
}
