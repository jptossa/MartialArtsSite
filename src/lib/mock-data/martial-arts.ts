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
  {
    slug: "taekwondo",
    name: "Taekwondo",
    tagline: "Fast feet, sharp technique, and a very good stretch.",
    description:
      "Taekwondo is a Korean striking art best known for fast, high, and spinning kicks. Training blends kicking technique, patterned forms called poomsae, and sparring, with a strong emphasis on discipline and courtesy. Be prepared to discover exactly how flexible you are not.",
    originCountry: "South Korea",
    category: "striking",
    difficulty: "beginner",
    focusAreas: [
      {
        title: "Kicks",
        description:
          "Front, roundhouse, side, back, and spinning kicks, with an emphasis on speed, height, and accuracy. Legs do most of the talking here.",
      },
      {
        title: "Poomsae",
        description:
          "Forms performed alone that link stances, blocks, and strikes, building balance and technique without needing a partner.",
      },
      {
        title: "Sparring",
        description:
          "Timing, distance, and reacting to a live partner in protective gear, with points for clean, controlled strikes.",
      },
      {
        title: "Flexibility and footwork",
        description:
          "Hip and leg mobility for high kicks, plus quick stepping and angling to close the gap or leave it.",
      },
    ],
    benefits: [
      {
        title: "Clear, structured progression",
        description:
          "Colored belts and graded tests give you visible goals, which makes it easy to stay motivated.",
      },
      {
        title: "Flexibility, balance, and leg strength",
        description:
          "Regular kicking practice builds a level of leg strength and mobility that carries over into everyday life.",
      },
      {
        title: "Good for all ages",
        description:
          "Widely taught to children and teens, and just as workable for adults who want to start from the beginning.",
      },
      {
        title: "Keeps trouble at a distance",
        description:
          "Fast, long-range kicking teaches you to manage space, which is half of staying safe.",
      },
    ],
  },
  {
    slug: "wrestling",
    name: "Wrestling",
    tagline: "The oldest grappling sport, and no one has improved on the basics.",
    description:
      "Wrestling is built on takedowns and control: take an opponent to the ground, keep them there, and stop the same being done to you. It rewards strength, stamina, and relentless pressure, and it is among the most physically demanding martial arts there is. Nobody finishes a practice feeling rested.",
    originCountry: "Worldwide (ancient origins)",
    category: "grappling",
    difficulty: "intermediate",
    focusAreas: [
      {
        title: "Takedowns",
        description:
          "Single legs, double legs, and trips that bring an opponent to the mat. You decide how and where the fight reaches the ground.",
      },
      {
        title: "Takedown defense",
        description:
          "Sprawling and balance to stay on your feet, which is a skill worth having long before it's needed.",
      },
      {
        title: "Top control",
        description:
          "Riding, breaking down, and holding an opponent in place so they can't get back up or get away.",
      },
      {
        title: "Escapes",
        description:
          "Standing up and getting out from underneath, built through constant live practice.",
      },
    ],
    benefits: [
      {
        title: "Control over where a fight goes",
        description:
          "You learn to stay standing when you want to, and to control a single opponent when you have to.",
      },
      {
        title: "Outstanding conditioning and toughness",
        description:
          "Few arts build strength, stamina, and mental grit as quickly as live wrestling does.",
      },
      {
        title: "Techniques tested live",
        description:
          "Practice is hard and resisting, so you find out fast what actually works.",
      },
      {
        title: "No uniform required",
        description:
          "The techniques work in everyday clothes, with no need to grab a jacket that won't be there.",
      },
    ],
  },
  {
    slug: "kickboxing",
    name: "Kickboxing",
    tagline: "Boxing hands, plus the legs that boxing leaves at home.",
    description:
      "Kickboxing combines the punches and footwork of boxing with kicks borrowed from karate and Muay Thai, built around fast combinations thrown from a mobile stance. It is just as popular as a competitive sport as it is as a high-energy fitness class. Your lungs will have opinions.",
    originCountry: "Japan and the United States",
    category: "striking",
    difficulty: "beginner",
    focusAreas: [
      {
        title: "Combinations",
        description:
          "Chaining jabs, crosses, hooks, and kicks into smooth sequences, drilled on pads and heavy bags.",
      },
      {
        title: "Kicks",
        description:
          "Round kicks, front kicks, and teeps to control distance and add power to the boxing basics.",
      },
      {
        title: "Footwork and defense",
        description:
          "Moving in and out of range, changing angles, and defending with blocks, slips, and kick checks.",
      },
      {
        title: "Conditioning",
        description:
          "Cardio, core strength, and stamina built through rounds of bag work, pads, and circuits.",
      },
    ],
    benefits: [
      {
        title: "Easy to start",
        description:
          "A short list of core techniques means you can be useful in your first few classes, then keep improving for years.",
      },
      {
        title: "Excellent cardio",
        description:
          "High-tempo rounds work the whole body and are an efficient way to build fitness.",
      },
      {
        title: "Timing, speed, and composure",
        description:
          "Learning to throw and defend combinations under pressure builds confidence you can use elsewhere.",
      },
      {
        title: "Widely available",
        description:
          "From competitive gyms to fitness classes, it's easy to find somewhere to train.",
      },
    ],
  },
  {
    slug: "sambo",
    name: "Sambo",
    tagline: "Judo and wrestling went east and came back armed with leg locks.",
    description:
      "Sambo is a Russian martial art whose name means roughly \"self-defense without weapons\". It blends throws, ground control, and leg locks, with a combat version that adds striking. It is practical, efficient, and not widely known, which is rather the point of a secret weapon.",
    originCountry: "Soviet Union (Russia)",
    category: "hybrid",
    difficulty: "intermediate",
    focusAreas: [
      {
        title: "Throws",
        description:
          "Judo-style and wrestling-style throws and takedowns, done fast and with little wasted movement.",
      },
      {
        title: "Leg locks",
        description:
          "Ankle locks, knee bars, and other leg attacks. Sport sambo allows them, which sets it apart from many grappling arts.",
      },
      {
        title: "Ground work",
        description:
          "Pins, control, and escapes, built through short, intense rounds of live sparring.",
      },
      {
        title: "Combat striking",
        description:
          "Combat sambo adds punches, kicks, and elbows in protective gear for a more complete approach.",
      },
    ],
    benefits: [
      {
        title: "A well-rounded blend",
        description:
          "Throws, ground control, and leg locks in a single system, so you aren't learning one piece in isolation.",
      },
      {
        title: "Tested in live practice",
        description:
          "Techniques are used against resisting partners, so you find out what actually works.",
      },
      {
        title: "Strong conditioning",
        description:
          "Stamina, strength, and toughness come from constant live work.",
      },
      {
        title: "Efficient and practical",
        description:
          "The system is built around what's fast and effective, with very little decoration.",
      },
    ],
  },
  {
    slug: "eskrima",
    name: "Eskrima",
    tagline: "Learn it with a stick. It all transfers to your hands.",
    description:
      "Eskrima, also known as kali or arnis, is a Filipino martial art centered on sticks, blades, and improvised objects. Training begins with a rattan stick and applies the same angles and footwork to knives and empty hands. It is the art for people who've always wanted a good reason to hold a stick.",
    originCountry: "Philippines",
    category: "weapons",
    difficulty: "intermediate",
    focusAreas: [
      {
        title: "Angles",
        description:
          "Numbered strikes and the lines of attack they follow, which form the basis of everything else.",
      },
      {
        title: "Footwork",
        description:
          "Moving in, out, and around an opponent in triangle and box patterns to manage distance.",
      },
      {
        title: "Flow drills",
        description:
          "Continuous partner patterns like sinawali that build rhythm, coordination, and hand speed.",
      },
      {
        title: "Blade work and empty hands",
        description:
          "Knife defense with training tools, then trapping, checking, and striking using the same movement.",
      },
    ],
    benefits: [
      {
        title: "Coordination, timing, and hand speed",
        description:
          "Flow drills build fast, relaxed hands and the ability to keep a rhythm under pressure.",
      },
      {
        title: "Awareness of armed situations",
        description:
          "You learn how weapons change distance and timing, which reinforces the advice to avoid and escape when possible.",
      },
      {
        title: "One set of principles",
        description:
          "Sticks, knives, and empty hands share the same angles and footwork, so one skill supports the others.",
      },
      {
        title: "Low-impact, partner-based practice",
        description:
          "Mostly rhythmic partner drills with modest equipment, which keeps the bruises to a minimum.",
      },
    ],
  },
];
