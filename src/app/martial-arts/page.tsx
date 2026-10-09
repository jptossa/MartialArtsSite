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
      <p>Explore the styles we offer and find the one that fits you.</p>
      <ul>
        {arts.map((art) => (
          <li key={art.slug}>
            <h2>
              <Link href={`/martial-arts/${art.slug}`}>{art.name}</Link>
            </h2>
            <p>{art.tagline}</p>
            <p>
              {art.category} · {art.difficulty}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
