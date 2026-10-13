import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CancelButton } from "@/components/booking-buttons";
import { ProfileForm } from "@/components/profile-form";
import { requireUser } from "@/lib/auth";
import { getMyBookings, splitBookings } from "@/lib/bookings";
import { formatClassDay, formatClassTime } from "@/lib/format";
import { getMartialArts } from "@/lib/martial-arts";
import type { MyBooking } from "@/lib/types";

export const metadata: Metadata = { title: "Your account" };

export default function AccountPage() {
  return (
    <main>
      <h1>Your account</h1>
      <Suspense fallback={<p>Loading your account&hellip;</p>}>
        <AccountContent />
      </Suspense>
    </main>
  );
}

async function AccountContent() {
  const user = await requireUser("/account");
  const [bookings, arts] = await Promise.all([getMyBookings(), getMartialArts()]);
  const artNames = new Map(arts.map((a) => [a.slug, a.name]));

  const { upcoming, history } = splitBookings(bookings);

  return (
    <>
      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading">Upcoming classes</h2>
        {upcoming.length === 0 ? (
          <p>
            You have no upcoming classes.{" "}
            <Link href="/martial-arts">Browse martial arts</Link> to book one.
          </p>
        ) : (
          <ul className="schedule">
            {upcoming.map((b) => (
              <li key={b.bookingId} className="schedule-item">
                <BookingSummary booking={b} artNames={artNames} />
                <div className="schedule-action">
                  <CancelButton bookingId={b.bookingId} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="profile-heading">
        <h2 id="profile-heading">Your details</h2>
        <ProfileForm
          fullName={user.fullName}
          phone={user.phone}
          email={user.email}
        />
      </section>

      {history.length > 0 && (
        <section aria-labelledby="history-heading">
          <h2 id="history-heading">Past and cancelled</h2>
          <ul className="schedule">
            {history.map((b) => (
              <li key={b.bookingId} className="schedule-item muted">
                <BookingSummary booking={b} artNames={artNames} />
                <div className="schedule-action">
                  <span className="badge">
                    {b.status === "cancelled" ? "Cancelled" : "Attended"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function BookingSummary({
  booking,
  artNames,
}: {
  booking: MyBooking;
  artNames: Map<string, string>;
}) {
  const art = artNames.get(booking.artSlug) ?? booking.artSlug;
  return (
    <>
      <div className="schedule-when">
        <strong>
          <Link href={`/martial-arts/${booking.artSlug}`}>{art}</Link>
        </strong>
        <span>
          {formatClassDay(booking.startsAt, booking.timezone)} &middot;{" "}
          {formatClassTime(booking.startsAt, booking.timezone)}
        </span>
      </div>
      <div className="schedule-meta">
        <span>{booking.location}</span>
        <span>{booking.durationMinutes} min</span>
      </div>
    </>
  );
}
