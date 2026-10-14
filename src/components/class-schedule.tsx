import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { BookButton, CancelButton } from "@/components/booking-buttons";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/auth";
import { getSchedule } from "@/lib/classes";
import { formatClassDay, formatClassTime } from "@/lib/format";
import type { ClassSession } from "@/lib/types";

// Upcoming classes for one martial art. Reads the session, so the page wraps
// it in <Suspense>; the rest of the art page stays statically prerendered.
export async function ClassSchedule({ artSlug }: { artSlug: string }) {
  if (!isSupabaseConfigured()) {
    return <p>Class booking opens soon.</p>;
  }

  // Read the session first, outside the try: during prerendering this is
  // where the request-time read defers the component, and a catch must not
  // swallow that.
  const user = await getCurrentUser();

  let sessions: ClassSession[];
  try {
    sessions = await getSchedule(artSlug);
  } catch (error) {
    unstable_rethrow(error);
    console.error(error);
    return <p>The class schedule is unavailable right now. Please try again.</p>;
  }

  if (sessions.length === 0) {
    return <p>No classes are scheduled in the next four weeks.</p>;
  }

  return (
    <ul className="schedule">
      {sessions.map((s) => (
        <li key={`${s.templateId}-${s.classDate}`} className="schedule-item">
          <div className="schedule-when">
            <strong>{formatClassDay(s.startsAt, s.timezone)}</strong>
            <span>
              {formatClassTime(s.startsAt, s.timezone)} &middot;{" "}
              {s.durationMinutes} min
            </span>
          </div>
          <div className="schedule-meta">
            <span>{s.location}</span>
            <span>{s.level === "all" ? "All levels" : s.level}</span>
            {s.instructorName && <span>with {s.instructorName}</span>}
            <span>
              {s.spotsLeft === 0
                ? "Full"
                : `${s.spotsLeft} of ${s.capacity} spots left`}
            </span>
          </div>
          <div className="schedule-action">
            <SessionAction session={s} signedIn={user !== null} artSlug={artSlug} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function SessionAction({
  session,
  signedIn,
  artSlug,
}: {
  session: ClassSession;
  signedIn: boolean;
  artSlug: string;
}) {
  if (session.myBookingId) {
    return (
      <>
        <span className="badge">You&rsquo;re booked</span>
        <CancelButton bookingId={session.myBookingId} />
      </>
    );
  }
  if (session.spotsLeft === 0) return null;
  if (!signedIn) {
    return (
      <Link
        className="button small"
        href={`/login?next=${encodeURIComponent(`/martial-arts/${artSlug}`)}`}
      >
        Log in to book
      </Link>
    );
  }
  return (
    <BookButton templateId={session.templateId} classDate={session.classDate} />
  );
}
