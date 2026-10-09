import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>
        This page dodged us. Even our best instructors can&apos;t catch
        everything.
      </p>
      <p>
        <Link href="/martial-arts">Browse martial arts</Link> or{" "}
        <Link href="/">return home</Link>.
      </p>
    </main>
  );
}
