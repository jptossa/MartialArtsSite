import type { MartialArt } from "@/lib/types";

// PLACEHOLDER DATA — real details for each art will be supplied later,
// then moved into Supabase. Tone: respectful of the art, light on the jokes.
// Focus areas and benefits are kept consistent with content/martial-arts/*.txt.

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
    focusAreas: [
      {
        title: "Ground control",
        description:
          "Guard, mount, side control, and back control, plus how to move between them. Position comes before submission: you can't finish a fight you're losing the position in.",
      },
      {
        title: "Joint locks",
        description:
          "Armbars, kimuras, and leg locks, applied to the point of submission and no further. Your partner taps, you let go, everyone goes home with the same number of working elbows.",
      },
      {
        title: "Chokes",
        description:
          "Rear-naked, triangle, and cross-collar chokes, which end a fight by restricting blood flow or the airway. Learning them safely is the whole point of the tap-out rule.",
      },
      {
        title: "Escapes",
        description:
          "Bridging, framing, and recovering guard to get out from underneath. A large share of early training, because you will spend a lot of time underneath.",
      },
    ],
    benefits: [
      {
        title: "Works regardless of size",
        description:
          "Technique stands in for strength, which is why a smaller practitioner can control someone much bigger.",
      },
      {
        title: "Safe to spar at full intensity",
        description:
          "Submissions are practiced with a tap-out rule, so you can train against a fully resisting partner with a low injury risk.",
      },
      {
        title: "A demanding full-body workout",
        description:
          "Hips, core, grip, and cardio all get used, often at the same time and usually while someone is leaning on you.",
      },
      {
        title: "Calm problem-solving under pressure",
        description:
          "You learn to stay relaxed and think while physically uncomfortable, a useful skill well outside the gym.",
      },
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
      {
        title: "Threat response",
        description:
          "Reading a situation, using distance, and deciding whether to leave, de-escalate, or act. Walking away counts as a win here.",
      },
      {
        title: "Striking",
        description:
          "Simple, forceful punches, palm strikes, elbows, knees, and kicks aimed at vulnerable targets. Nothing fancy, because fancy fails when you're scared.",
      },
      {
        title: "Weapon defense",
        description:
          "Controlling or avoiding armed attackers, taught alongside the strong advice that running is usually the better option.",
      },
      {
        title: "Stress inoculation",
        description:
          "Learning to act while adrenaline is high and your breathing is ragged. Drills are deliberately uncomfortable so the real thing is less of a shock.",
      },
    ],
    benefits: [
      {
        title: "Quick to learn the basics",
        description:
          "Beginners can pick up useful responses in a matter of weeks, with no prior fitness or experience required.",
      },
      {
        title: "Scenario-based training",
        description:
          "Drills mirror how real attacks tend to begin, such as grabs, chokes, and surprise approaches, rather than a polite bow and a starting stance.",
      },
      {
        title: "Awareness and decision-making",
        description:
          "Training builds the habit of noticing your surroundings and choosing your response early, before things escalate.",
      },
      {
        title: "Good conditioning without a head start",
        description:
          "High-tempo drills build cardio and strength even if you walk in out of shape. Expect to be breathing hard by minute five.",
      },
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
    focusAreas: [
      {
        title: "Kicks",
        description:
          "Round kicks to the legs, body, and head, thrown with the shin and a full hip rotation. The teep, or push kick, keeps an opponent at the end of your leg.",
      },
      {
        title: "Elbows and knees",
        description:
          "Short, damaging strikes for close range, where punches run out of room and everyone is suddenly very near.",
      },
      {
        title: "Clinch",
        description:
          "Controlling an opponent's head and posture to knee them, off-balance them, or throw them. Surprisingly tiring and surprisingly technical.",
      },
      {
        title: "Conditioning",
        description:
          "Cardio, core strength, and shin and leg toughness built through pads, bag work, and a great deal of skipping rope.",
      },
    ],
    benefits: [
      {
        title: "Excellent cardio and full-body strength",
        description:
          "Rounds of pad work and bag work work the legs, core, and lungs hard. You will sleep well.",
      },
      {
        title: "Powerful strikes from every range",
        description:
          "Fists, shins, elbows, and knees give you a response at long, middle, and close distance.",
      },
      {
        title: "Toughness and confidence under pressure",
        description:
          "Controlled contact teaches you to stay composed when something is coming at you, which is half of staying safe.",
      },
      {
        title: "Proven in full-contact competition",
        description:
          "The techniques are tested against resisting opponents in the ring, not just in demonstrations.",
      },
    ],
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
    focusAreas: [
      {
        title: "Punching",
        description:
          "The jab, cross, hook, and uppercut, and chaining them into combinations. Power comes from the legs and hips, not the arm.",
      },
      {
        title: "Footwork",
        description:
          "Moving in, out, and around an opponent while staying balanced. Good footwork decides who gets to hit and who has to react.",
      },
      {
        title: "Head movement",
        description:
          "Slipping, bobbing, and weaving so punches miss rather than land. Defense you can do without taking your hands off your face.",
      },
      {
        title: "Timing",
        description:
          "Knowing when to throw, when to counter, and when to step away. The part that separates a fast puncher from a good boxer.",
      },
    ],
    benefits: [
      {
        title: "Easy to start",
        description:
          "A short list of core techniques means you can be useful in a few classes, and then spend years getting better at them.",
      },
      {
        title: "Excellent conditioning and speed",
        description:
          "Bag work, mitts, and skipping build cardio, coordination, and hand speed together.",
      },
      {
        title: "Sharper reflexes and composure",
        description:
          "Learning to watch a punch arrive without flinching changes how you handle pressure generally.",
      },
      {
        title: "Minimal equipment, widely available",
        description:
          "Gloves, wraps, and a gym are most of what you need, and there is a boxing gym in nearly every city.",
      },
    ],
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
    focusAreas: [
      {
        title: "Throws",
        description:
          "Hip throws, shoulder throws, foot sweeps, and sacrifice throws. Each one starts by breaking the opponent's balance, not by out-muscling them.",
      },
      {
        title: "Takedowns",
        description:
          "Off-balancing and bringing an opponent down under control, so you stay in charge of how the fight reaches the ground.",
      },
      {
        title: "Pins",
        description:
          "Holding someone on their back (osaekomi) so they cannot get up. Control first, everything else later.",
      },
      {
        title: "Falling safely",
        description:
          "Ukemi, the art of absorbing impact without injury, comes first and is practiced every class. Unglamorous, and arguably the most useful thing you'll learn.",
      },
      {
        title: "Ground chokes and arm locks",
        description:
          "Newaza adds chokes and arm locks once the fight is on the ground, finishing what the throw started.",
      },
    ],
    benefits: [
      {
        title: "Teaches safe falling",
        description:
          "Knowing how to land protects you if you are shoved, slip on ice, or trip on the stairs. A skill for everyday life, not just fights.",
      },
      {
        title: "Balance, grip, and functional strength",
        description:
          "Throwing a resisting person builds the kind of strength that carries over to real tasks, plus a grip that opens every jar.",
      },
      {
        title: "Effective against larger opponents",
        description:
          "When the timing is right, a throw uses the opponent's own momentum, so size matters less than you'd expect.",
      },
      {
        title: "Skills tested against resistance",
        description:
          "Live sparring (randori) is common, so you find out what works against someone trying to stop you.",
      },
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
      {
        title: "Centerline",
        description:
          "Protecting and attacking along the body's midline, where the vital targets are and where the shortest path to them runs.",
      },
      {
        title: "Close-range striking",
        description:
          "Short, rapid chain punches and palm strikes delivered without a big wind-up, so they work when there's no room to swing.",
      },
      {
        title: "Trapping",
        description:
          "Pinning or controlling an opponent's limbs at close range, so your hands are free and theirs are not.",
      },
      {
        title: "Sensitivity drills",
        description:
          "Reacting to touch rather than sight, usually with a partner's forearms in contact with yours. Deceptively hard, and the heart of the system.",
      },
      {
        title: "Structure",
        description:
          "A stable stance and good elbow position that make a strike strong without needing a long swing behind it.",
      },
    ],
    benefits: [
      {
        title: "Efficient movement for tight spaces",
        description:
          "Compact techniques work in hallways, doorways, and other places where there's no room for roundhouse anything.",
      },
      {
        title: "Reflexes and coordination",
        description:
          "Sensitivity drills train fast, automatic reactions and the ability to do two things at once with your hands.",
      },
      {
        title: "Low-impact training",
        description:
          "Suitable for a wide range of ages and fitness levels, with far fewer bruises than the heavy-contact arts.",
      },
      {
        title: "A different way of thinking about fighting",
        description:
          "It prioritizes position and economy over power, which pairs well with a faster, more athletic art if you want both.",
      },
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
    focusAreas: [
      {
        title: "Kata",
        description:
          "Forms that build memory, balance, and technique by linking movements into a sequence. Practiced solo, so you can train without a partner.",
      },
      {
        title: "Blocking",
        description:
          "Deflecting and intercepting attacks before they land, taught as a set of clean, repeatable movements.",
      },
      {
        title: "Kicking",
        description:
          "Front, roundhouse, side, and back kicks with good control. Technique and balance before power.",
      },
      {
        title: "Sparring",
        description:
          "Timing, distance, and reacting to a live partner. How realistic it is depends on the school, so it's worth asking before you join.",
      },
    ],
    benefits: [
      {
        title: "Clear, structured progression",
        description:
          "Belts and graded syllabi give you visible goals, which makes it easy to stay motivated and measure your progress.",
      },
      {
        title: "Discipline, focus, and respect",
        description:
          "Etiquette, repetition, and patience are part of every class, and they tend to leak into the rest of your life.",
      },
      {
        title: "Good for all ages",
        description:
          "One of the most common arts for children, and just as welcoming to adults starting from scratch.",
      },
      {
        title: "A strong foundation in stance and striking",
        description:
          "Posture, balance, and basic striking mechanics carry over well if you later move to a more contact-heavy art.",
      },
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
    focusAreas: [
      {
        title: "Joint locks",
        description:
          "Controlling the wrists, elbows, and shoulders so an attacker is restrained rather than injured.",
      },
      {
        title: "Throws",
        description:
          "Using momentum and off-balancing instead of strength, so the attacker's own movement does most of the work.",
      },
      {
        title: "Redirection",
        description:
          "Entering and turning to move out of the line of attack. The name of the game is not being where the punch lands.",
      },
      {
        title: "Weapons basics",
        description:
          "Sword, staff, and knife work that informs the empty-hand techniques, teaching distance and timing from a different angle.",
      },
      {
        title: "Ukemi",
        description:
          "Safe, smooth falling and rolling. You'll do plenty of it, so it's well worth getting good at.",
      },
    ],
    benefits: [
      {
        title: "Low-impact and widely accessible",
        description:
          "Suitable for many ages and fitness levels, with training that is much easier on the body than most contact arts.",
      },
      {
        title: "Emphasizes de-escalation",
        description:
          "Awareness, calm, and avoiding conflict are central to the philosophy, which is a rarer and more valuable skill than it sounds.",
      },
      {
        title: "Balance, posture, and body control",
        description:
          "Regular practice improves flexibility, balance, and how you move, long after you've left the mat.",
      },
      {
        title: "Sensitivity to timing and distance",
        description:
          "You learn to feel when an attack is coming and how far away it is, a skill that pays off in any art.",
      },
    ],
  },
];
