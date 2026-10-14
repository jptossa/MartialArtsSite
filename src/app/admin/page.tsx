import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TemplateForm } from "@/components/template-form";
import { setTemplateActive } from "@/lib/actions/admin";
import { requireRole } from "@/lib/auth";
import { getStaff, getTemplates } from "@/lib/classes";
import { formatStartTime, weekdayNames } from "@/lib/format";
import { getMartialArts } from "@/lib/martial-arts";

export const metadata: Metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <main>
      <h1>Timetable</h1>
      <Suspense fallback={<p>Loading&hellip;</p>}>
        <AdminContent />
      </Suspense>
    </main>
  );
}

async function AdminContent() {
  const user = await requireRole(["admin", "instructor"], "/admin");
  const isAdmin = user.role === "admin";

  const [templates, arts, staff] = await Promise.all([
    getTemplates(),
    getMartialArts(),
    isAdmin ? getStaff() : Promise.resolve([]),
  ]);
  const artNames = new Map(arts.map((a) => [a.slug, a.name]));

  return (
    <>
      <section aria-labelledby="slots-heading">
        <h2 id="slots-heading">
          {isAdmin ? "Weekly classes" : "Your weekly classes"}
        </h2>
        {templates.length === 0 ? (
          <p>No classes yet.</p>
        ) : (
          <ul className="schedule">
            {templates.map((t) => (
              <li
                key={t.id}
                className={`schedule-item${t.active ? "" : " muted"}`}
              >
                <div className="schedule-when">
                  <strong>{artNames.get(t.artSlug) ?? t.artSlug}</strong>
                  <span>
                    {weekdayNames[t.weekday]}s {formatStartTime(t.startTime)}{" "}
                    &middot; {t.durationMinutes} min
                  </span>
                </div>
                <div className="schedule-meta">
                  <span>{t.location}</span>
                  <span>{t.capacity} seats</span>
                  <span>{t.level === "all" ? "All levels" : t.level}</span>
                  {!t.active && <span>Inactive</span>}
                </div>
                <div className="schedule-action">
                  <Link
                    className="button small ghost"
                    href={`/admin/roster/${t.id}`}
                  >
                    Roster
                  </Link>
                  {isAdmin && (
                    <form className="inline-form" action={setTemplateActive}>
                      <input type="hidden" name="id" value={t.id} />
                      <input
                        type="hidden"
                        name="active"
                        value={String(!t.active)}
                      />
                      <button className="button small ghost" type="submit">
                        {t.active ? "Deactivate" : "Activate"}
                      </button>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {isAdmin && (
        <section aria-labelledby="add-heading">
          <h2 id="add-heading">Add a weekly class</h2>
          <TemplateForm
            arts={arts.map((a) => ({ slug: a.slug, name: a.name }))}
            staff={staff}
          />
        </section>
      )}
    </>
  );
}
