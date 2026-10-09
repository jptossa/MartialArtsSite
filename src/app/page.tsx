import Link from "next/link";
import { benefits, mission, services } from "@/lib/mock-data/site-content";

export default function Home() {
  return (
    <main>
      <section aria-labelledby="mission-heading">
        <h1 id="mission-heading">Train smart. Stay safe.</h1>
        <h2>Our Mission</h2>
        <p>{mission}</p>
        <Link href="/martial-arts">Explore martial arts</Link>
      </section>

      <section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading">Why Learn a Martial Art?</h2>
        <ul>
          {benefits.map((benefit) => (
            <li key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="services-heading">
        <h2 id="services-heading">What We Offer</h2>
        <ul>
          {services.map((service) => (
            <li key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
