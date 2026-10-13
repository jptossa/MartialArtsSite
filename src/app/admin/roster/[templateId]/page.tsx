import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requireRole } from "@/lib/auth";
import { getRoster } from "@/lib/bookings";
import { getTemplateById } from "@/lib/classes";
import { nextOccurrence, shiftDate, weekdayNames } from "@/lib/format";
import { getMartialArtBySlug } from "@/lib/martial-arts";

export const metadata: Metadata = { title: "Class roster" };

export default function RosterPage(
  props: PageProps<"/admin/roster/[templateId]">,
) {
  return (
    <main>
      <p>
        <Link className="back-link" href="/admin">
          &larr; Timetable
        </Link>
      </p>
      <h1>Class roster</h1>
      <Suspense fallback={<p>Loading&hellip;</p>}>
        <RosterContent params={props.params} searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}

async function RosterContent({
  params,
  searchParams,
}: {
  params: PageProps<"/admin/roster/[templateId]">["params"];
  searchParams: PageProps<"/admin/roster/[templateId]">["searchParams"];
}) {
  const [{ templateId }, { date: dateParam }] = await Promise.all([
    params,
    searchParams,
  ]);
  await requireRole(["admin", "instructor"], `/admin/roster/${templateId}`);

  // RLS hides slots an instructor does not own, so this is also the access check.
  const template = await getTemplateById(templateId);
  if (!template) notFound();
  const art = await getMartialArtBySlug(template.artSlug);

  const requested = Array.isArray(dateParam) ? dateParam[0] : dateParam;
  const date =
    requested && /^\d{4}-\d{2}-\d{2}$/.test(requested)
      ? requested
      : nextOccurrence(template.weekday, template.timezone);

  const roster = await getRoster(template.id, date);

  return (
    <>
      <p className="lede">
        {art?.name ?? template.artSlug} &middot; {weekdayNames[template.weekday]}{" "}
        {date} &middot; {roster.length} of {template.capacity} booked
      </p>

      <p className="roster-nav">
        <Link
          className="button small ghost"
          href={`/admin/roster/${template.id}?date=${shiftDate(date, -7)}`}
        >
          &larr; Previous week
        </Link>
        <Link
          className="button small ghost"
          href={`/admin/roster/${template.id}?date=${shiftDate(date, 7)}`}
        >
          Next week &rarr;
        </Link>
      </p>

      {roster.length === 0 ? (
        <p>No one is booked into this class yet.</p>
      ) : (
        <ol className="roster">
          {roster.map((r) => (
            <li key={r.bookingId}>
              <strong>{r.fullName || "(no name)"}</strong>
              {r.phone && <span>{r.phone}</span>}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
