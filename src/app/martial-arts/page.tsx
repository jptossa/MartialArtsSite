import type { Metadata } from "next";
import Link from "next/link";
import { getMartialArts } from "@/lib/martial-arts";

export const metadata: Metadata = {
  title: "Martial Arts",
  description: "Browse the martial arts and self-defense styles we teach.",
};

export default async function MartialArtsPage() {
  const arts = await getMartialArts();

  return (
    <main>
      <h1>Martial Arts</h1>
      <p className="page-intro">
        Striking, grappling, and weapons, centuries of tradition, and one style
        that is right for you. Browse what we teach, or ask our assistant to
        pick for you.
      </p>
      <ul className="card-grid">
        {arts.map((art) => (
          <li className="card" key={art.slug}>
            <h2>
              <Link className="card-link" href={`/martial-arts/${art.slug}`}>
                {art.name}
              </Link>
            </h2>
            <p>{art.tagline}</p>
            <p className="meta">
              {art.category} · {art.difficulty}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
