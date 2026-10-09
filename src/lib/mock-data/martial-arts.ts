import type { MartialArt } from "@/lib/types";

// PLACEHOLDER DATA — real details for each art will be supplied later,
// then moved into Supabase.

export const martialArts: MartialArt[] = [
  {
    slug: "brazilian-jiu-jitsu",
    name: "Brazilian Jiu-Jitsu",
    tagline: "Control and submit opponents on the ground.",
    description:
      "Brazilian Jiu-Jitsu focuses on grappling and ground fighting, using leverage and technique so a smaller person can control and submit a larger opponent.",
    originCountry: "Brazil",
    category: "grappling",
    difficulty: "intermediate",
    focusAreas: ["Ground control", "Joint locks", "Chokes", "Escapes"],
    benefits: ["Works regardless of size", "Great full-body workout", "Safe to spar at full intensity"],
  },
  {
    slug: "krav-maga",
    name: "Krav Maga",
    tagline: "Fast, practical self-defense built for real threats.",
    description:
      "Krav Maga is a military-developed system that combines striking, grappling, and threat-response drills designed for real-world survival scenarios.",
    originCountry: "Israel",
    category: "hybrid",
    difficulty: "beginner",
    focusAreas: ["Threat response", "Striking", "Weapon defense", "Stress inoculation"],
    benefits: ["Quick to learn basics", "Scenario-based training", "Builds awareness"],
  },
  {
    slug: "muay-thai",
    name: "Muay Thai",
    tagline: "The art of eight limbs.",
    description:
      "Muay Thai uses punches, kicks, elbows, and knees, along with clinch work, to deliver powerful strikes from every range.",
    originCountry: "Thailand",
    category: "striking",
    difficulty: "intermediate",
    focusAreas: ["Kicks", "Elbows and knees", "Clinch", "Conditioning"],
    benefits: ["Excellent cardio", "Powerful striking", "Builds toughness"],
  },
  {
    slug: "boxing",
    name: "Boxing",
    tagline: "Sharpen your hands, footwork, and defense.",
    description:
      "Boxing teaches punching technique, head movement, and footwork, building speed, timing, and ring awareness.",
    originCountry: "United Kingdom",
    category: "striking",
    difficulty: "beginner",
    focusAreas: ["Punching", "Footwork", "Head movement", "Timing"],
    benefits: ["Easy to start", "Great conditioning", "Sharpens reflexes"],
  },
  {
    slug: "judo",
    name: "Judo",
    tagline: "Use an opponent's momentum against them.",
    description:
      "Judo emphasizes throws, takedowns, and pins, teaching you to unbalance and control an opponent with leverage and timing.",
    originCountry: "Japan",
    category: "grappling",
    difficulty: "intermediate",
    focusAreas: ["Throws", "Takedowns", "Pins", "Falling safely"],
    benefits: ["Teaches safe falling", "Builds balance and strength", "Effective against larger opponents"],
  },
  {
    slug: "wing-chun",
    name: "Wing Chun",
    tagline: "Efficient close-range strikes and trapping.",
    description:
      "Wing Chun is a close-quarters Chinese style built on economy of motion, centerline defense, and fast simultaneous attack and defense.",
    originCountry: "China",
    category: "striking",
    difficulty: "intermediate",
    focusAreas: ["Close-range striking", "Trapping", "Sensitivity drills", "Centerline"],
    benefits: ["Efficient movement", "Works in tight spaces", "Builds reflexes"],
  },
  {
    slug: "karate",
    name: "Karate",
    tagline: "Strong fundamentals in striking and discipline.",
    description:
      "Karate teaches punches, kicks, and blocks through forms (kata) and sparring, with a strong emphasis on discipline and technique.",
    originCountry: "Japan",
    category: "striking",
    difficulty: "beginner",
    focusAreas: ["Kata", "Blocking", "Kicking", "Sparring"],
    benefits: ["Structured progression", "Builds discipline", "Good for all ages"],
  },
  {
    slug: "aikido",
    name: "Aikido",
    tagline: "Redirect force and neutralize attacks.",
    description:
      "Aikido focuses on redirecting an attacker's energy using joint locks and throws, emphasizing control and conflict de-escalation.",
    originCountry: "Japan",
    category: "grappling",
    difficulty: "advanced",
    focusAreas: ["Joint locks", "Throws", "Redirection", "Weapons basics"],
    benefits: ["Low impact", "Emphasizes de-escalation", "Improves balance and posture"],
  },
];
