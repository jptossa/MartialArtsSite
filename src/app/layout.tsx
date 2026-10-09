import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteName } from "@/lib/mock-data/site-content";

export const metadata: Metadata = {
  title: {
    default: `${siteName} — Find the right martial art for you`,
    template: `%s | ${siteName}`,
  },
  description:
    "Self-defense and personal protection training. Discover the martial art that fits your goals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav aria-label="Main">
            <Link href="/">{siteName}</Link>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/martial-arts">Martial Arts</Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <footer>
          <p>&copy; {siteName}</p>
        </footer>
      </body>
    </html>
  );
}
