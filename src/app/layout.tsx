import type { Metadata } from "next";
import { Alfa_Slab_One, Crimson_Pro, Oswald } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ChatWidget } from "@/components/chat-widget";
import { siteName } from "@/lib/mock-data/site-content";

// Victorian slab wood-type for headings, book serif for body,
// condensed gothic for labels/nav.
const display = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-body",
});

const label = Oswald({
  subsets: ["latin"],
  variable: "--font-label",
});

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
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${label.variable}`}
    >
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
          <section className="disclaimer" aria-labelledby="disclaimer-heading">
            <h2 id="disclaimer-heading">Disclaimer</h2>
            <p>
              Martial arts and self-defense training carry a real risk of
              injury. Check with a physician before you begin, and train with a
              qualified instructor. Nothing on this site, including
              recommendations from Ask the Dojo, is medical, legal, or
              professional advice, and no amount of training can guarantee your
              safety. When you can leave, leave.
            </p>
          </section>
          <p>&copy; {siteName}</p>
        </footer>
        <ChatWidget />
      </body>
    </html>
  );
}
