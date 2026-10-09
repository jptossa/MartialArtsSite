import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMartialArtBySlug, getMartialArts } from "@/lib/martial-arts";

export async function generateStaticParams() {
  const arts = await getMartialArts();
  return arts.map((art) => ({ slug: art.slug }));
}

export async function generateMetadata(
  props: PageProps<"/martial-arts/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const art = await getMartialArtBySlug(slug);
  if (!art) return {};
  return { title: art.name, description: art.tagline };
}

export default async function MartialArtPage(
  props: PageProps<"/martial-arts/[slug]">,
) {
  const { slug } = await props.params;
  const art = await getMartialArtBySlug(slug);
  if (!art) notFound();

  return (
    <main>
      <p>
        <Link href="/martial-arts">&larr; All martial arts</Link>
      </p>

      <article>
        <h1>{art.name}</h1>
        <p>{art.tagline}</p>
        <p>{art.description}</p>

        <dl>
          <dt>Origin</dt>
          <dd>{art.originCountry}</dd>
          <dt>Category</dt>
          <dd>{art.category}</dd>
          <dt>Difficulty</dt>
          <dd>{art.difficulty}</dd>
        </dl>

        <section aria-labelledby="focus-heading">
          <h2 id="focus-heading">Focus Areas</h2>
          <ul>
            {art.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="benefits-heading">
          <h2 id="benefits-heading">Benefits</h2>
          <ul>
            {art.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
