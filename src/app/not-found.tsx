import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>We couldn&apos;t find what you were looking for.</p>
      <p>
        <Link href="/martial-arts">Browse martial arts</Link> or{" "}
        <Link href="/">return home</Link>.
      </p>
    </main>
  );
}
