import type { MartialArt } from "@/lib/types";

// PLACEHOLDER DATA — real details for each art will be supplied later,
// then moved into Supabase. Tone: respectful of the art, light on the jokes.

export const martialArts: MartialArt[] = [
  {
    slug: "brazilian-jiu-jitsu",
    name: "Brazilian Jiu-Jitsu",
    tagline: "Chess, but someone is sitting on you.",
    description:
      "Brazilian Jiu-Jitsu is a grappling art built on leverage and technique, so a smaller person can control and submit a larger opponent on the ground. It rewards patience and problem-solving, and it teaches humility quickly — usually by way of a very polite chokehold.",
    originCountry: "Brazil",
    category: "grappling",
    difficulty: "intermediate",
    focusAreas: ["Ground control", "Joint locks", "Chokes", "Escapes"],
    benefits: [
      "Works regardless of size",
      "Great full-body workout",
      "Safe to spar at full intensity",
    ],
  },
  {
    slug: "krav-maga",
    name: "Krav Maga",
    tagline: "No belts, no ceremony, no nonsense.",
    description:
      "Krav Maga is a military-developed system that combines striking, grappling, and threat-response drills for real-world scenarios. The priority is simple: neutralize the threat and get home. It is not the place to look for elegant forms or a tasteful uniform.",
    originCountry: "Israel",
    category: "hybrid",
    difficulty: "beginner",
    focusAreas: [
      "Threat response",
      "Striking",
      "Weapon defense",
      "Stress inoculation",
    ],
    benefits: [
      "Quick to learn the basics",
      "Scenario-based training",
      "Builds awareness",
    ],
  },
  {
    slug: "muay-thai",
    name: "Muay Thai",
    tagline: "Why use two limbs when you have eight?",
    description:
      "Muay Thai uses punches, kicks, elbows, and knees, plus clinch work, to deliver powerful strikes from every range. Expect outstanding conditioning and a newfound respect for your shins, which will toughen up whether you consent or not.",
    originCountry: "Thailand",
    category: "striking",
    difficulty: "intermediate",
    focusAreas: ["Kicks", "Elbows and knees", "Clinch", "Conditioning"],
    benefits: ["Excellent cardio", "Powerful striking", "Builds toughness"],
  },
  {
    slug: "boxing",
    name: "Boxing",
    tagline: "Two fists, one very good idea.",
    description:
      "Boxing teaches punching technique, head movement, and footwork, building speed, timing, and ring awareness. It looks simple, and then you try to throw a clean combination while tired. That is the entire art, and the reason people stay for decades.",
    originCountry: "United Kingdom",
    category: "striking",
    difficulty: "beginner",
    focusAreas: ["Punching", "Footwork", "Head movement", "Timing"],
    benefits: ["Easy to start", "Great conditioning", "Sharpens reflexes"],
  },
  {
    slug: "judo",
    name: "Judo",
    tagline: "The gentle way, with a lot of throwing.",
    description:
      "Judo emphasizes throws, takedowns, and pins, teaching you to unbalance and control an opponent with leverage and timing. You will learn to fall safely first, which is the most underrated self-defense skill there is, and an excellent one for icy sidewalks.",
    originCountry: "Japan",
    category: "grappling",
    difficulty: "intermediate",
    focusAreas: ["Throws", "Takedowns", "Pins", "Falling safely"],
    benefits: [
      "Teaches safe falling",
      "Builds balance and strength",
      "Effective against larger opponents",
    ],
  },
  {
    slug: "wing-chun",
    name: "Wing Chun",
    tagline: "Economy of motion, no wasted effort.",
    description:
      "Wing Chun is a close-quarters Chinese style built on centerline defense, economical movement, and fast simultaneous attack and defense. It is designed for tight spaces — which, if you have ever been in a crowded elevator, you may already appreciate.",
    originCountry: "China",
    category: "striking",
    difficulty: "intermediate",
    focusAreas: [
      "Close-range striking",
      "Trapping",
      "Sensitivity drills",
      "Centerline",
    ],
    benefits: [
      "Efficient movement",
      "Works in tight spaces",
      "Builds reflexes",
    ],
  },
  {
    slug: "karate",
    name: "Karate",
    tagline: "Fundamentals first. Yes, you'll practice the stance.",
    description:
      "Karate teaches punches, kicks, and blocks through forms (kata) and sparring, with a deep emphasis on discipline and technique. Progress is structured and visible, and the belt system gives you something to work toward besides soreness.",
    originCountry: "Japan",
    category: "striking",
    difficulty: "beginner",
    focusAreas: ["Kata", "Blocking", "Kicking", "Sparring"],
    benefits: [
      "Structured progression",
      "Builds discipline",
      "Good for all ages",
    ],
  },
  {
    slug: "aikido",
    name: "Aikido",
    tagline: "Win by not meeting force with force.",
    description:
      "Aikido focuses on redirecting an attacker's energy with joint locks and throws, and emphasizes control and de-escalation over damage. It is subtle, demanding, and takes real patience to make work — more a long game than a quick fix.",
    originCountry: "Japan",
    category: "grappling",
    difficulty: "advanced",
    focusAreas: ["Joint locks", "Throws", "Redirection", "Weapons basics"],
    benefits: [
      "Low impact",
      "Emphasizes de-escalation",
      "Improves balance and posture",
    ],
  },
];
