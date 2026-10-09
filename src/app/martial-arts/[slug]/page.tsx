import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMartialArtBySlug, getMartialArts } from "@/lib/martial-arts";

// Opt out of instant-navigation validation: awaiting `params` is intentional,
// and a Suspense boundary would turn the 404 for unknown slugs into a 200.
export const instant = false;

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
        <Link className="back-link" href="/martial-arts">
          &larr; All martial arts
        </Link>
      </p>

      <article>
        <h1>{art.name}</h1>
        <p className="tagline">{art.tagline}</p>
        <p className="lede">{art.description}</p>

        <dl className="facts">
          <div>
            <dt>Origin</dt>
            <dd>{art.originCountry}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{art.category}</dd>
          </div>
          <div>
            <dt>Difficulty</dt>
            <dd>{art.difficulty}</dd>
          </div>
        </dl>

        <div className="detail-lists">
          <section aria-labelledby="focus-heading">
            <h2 id="focus-heading">Focus Areas</h2>
            <ul>
              {art.focusAreas.map((area) => (
                <li key={area.title}>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="benefits-heading">
            <h2 id="benefits-heading">Benefits</h2>
            <ul>
              {art.benefits.map((benefit) => (
                <li key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
