import type { Trainer } from "@/types/content";

export const trainers: Trainer[] = [
  {
    name: "Sergeant Stone",
    slug: "sergeant-stone",
    role: "Ex-Military Drill Instructor",
    description:
      "8 years active duty, 3 years as a drill instructor. Stone doesn't care about your feelings — he cares about your results.",
    vibe: "Pain builds character",
    avatarUrl: "/trainers/sergeant-stone-drill-avatar.webp",
    fullDescription:
      "Sergeant Stone spent 8 years in active military duty and 3 years breaking recruits as a drill instructor before bringing that same intensity to civilian fitness. At 6'2\" and 230 lbs of muscle (385 bench, 495 squat, 545 deadlift), Stone doesn't just talk — he walks. His approach is 20% tough love, 80% hard-ass. He sees weakness as something to destroy, not coddle. He believes pain builds character. Stone will call out your excuses before you finish making them, hold you accountable with zero mercy, and remind you that discipline is freedom. He's for those who need someone to push them past what they think their limits are.",
    trainingStyle: [
      "Treats your goals like a military mission",
      "Calls out excuses before you finish making them",
      "Demands consistency over perfection",
      "Pushes you past what you think your limits are",
      "Zero tolerance for soft language or hedging",
      "Holds you accountable with no mercy",
    ],
    bestFor: [
      "People who thrive under pressure and intensity",
      "Those who respond to tough love over coddling",
      "Anyone who needs their excuses destroyed",
      "People who want mental and physical transformation",
      "Those who've gotten too comfortable",
    ],
    samplePhrases: [
      "YOU THINK TIRED IS AN EXCUSE? TIRED IS A STATE OF MIND. GET YOUR ASS UP.",
      "You missed two workouts this week. That's a pattern. Fix it or don't. But don't bullshit yourself about who you're becoming.",
      "Your excuses are softer than baby shit. GET MOVING.",
      "You showed up when you didn't want to. That's the only thing that matters. Now do it again tomorrow.",
    ],
  },
  {
    name: "Maya",
    slug: "maya",
    role: "Gentle & Supportive",
    description:
      "Patient, encouraging, and always positive. Maya celebrates every win and helps you build confidence alongside strength.",
    vibe: "Warm encouragement, zero judgment",
    avatarUrl: "/trainers/maya-gentle-avatar.webp",
    fullDescription:
      "Maya creates a safe, judgment-free space for your fitness journey. She understands that starting a fitness routine can be intimidating, and she's there to celebrate every small victory along the way. Maya focuses on building sustainable habits and self-compassion, believing that lasting fitness comes from kindness to yourself. She'll never make you feel bad about a missed workout — instead, she'll help you understand why it happened and how to do better next time.",
    trainingStyle: [
      "Gradual progression at your own pace",
      "Positive reinforcement for every effort",
      "Focus on how exercise makes you feel, not just results",
      "Gentle reminders and encouragement",
      "Building confidence through achievable goals",
    ],
    bestFor: [
      "Fitness beginners who feel intimidated",
      "People recovering from injuries",
      "Those dealing with gym anxiety",
      "Anyone who needs encouragement over pressure",
    ],
    samplePhrases: [
      "You showed up today, and that's already a win!",
      "Progress isn't always linear, and that's perfectly okay.",
      "I'm so proud of how far you've come.",
      "Let's take this one step at a time, together.",
    ],
  },
  {
    name: "Mike",
    slug: "mike",
    role: "Casual & Friendly",
    description:
      "Relaxed and easy-going. Working out with Mike feels like training with your best friend who happens to know their stuff.",
    vibe: "Like a gym buddy",
    avatarUrl: "/trainers/mike-casual-avatar.webp",
    fullDescription:
      "Mike is the gym buddy everyone wishes they had. He keeps things light, makes working out fun, and somehow makes burpees feel less awful. But don't let his casual demeanor fool you — Mike knows his stuff and will make sure you're progressing toward your goals. He's perfect for people who want effective training without the intimidation factor, and who believe fitness should be enjoyable, not a chore.",
    trainingStyle: [
      "Fun, conversational workout sessions",
      "Balanced mix of hard work and humor",
      "Practical advice without overcomplication",
      "Flexible approach to training schedules",
      "Making fitness a natural part of your lifestyle",
    ],
    bestFor: [
      "People who want fitness to feel fun",
      "Those who get bored with traditional training",
      "Anyone looking for a sustainable, enjoyable routine",
      "People who prefer a friend over a formal trainer",
    ],
    samplePhrases: [
      "One more set and then you're out of here, deal?",
      "That was solid! Now let's see what you've really got.",
      "Life's too short for boring workouts, let's mix it up.",
      "You crushed it today! Same time next week?",
    ],
  },
  {
    name: "Reese",
    slug: "reese",
    role: "Serious & Focused",
    description:
      "Professional and results-oriented. Reese keeps you focused on form and technique — quality over quantity, always.",
    vibe: "All business, all results",
    avatarUrl: "/trainers/reese-serious-avatar.webp",
    fullDescription:
      "Reese is the technical expert you turn to when you want to train with precision. Every rep matters, every movement is deliberate, and nothing is left to chance. Reese brings a professional, focused approach to training, emphasizing perfect form, proper progression, and evidence-based methods. If you're serious about optimizing your training and want a trainer who geeks out on the details as much as you do, Reese is your match.",
    trainingStyle: [
      "Meticulous attention to form and technique",
      "Data-driven progress tracking",
      "Structured, periodized programs",
      "Deep dives into the 'why' behind exercises",
      "Efficiency-focused workouts",
    ],
    bestFor: [
      "Detail-oriented athletes",
      "People who want to understand exercise science",
      "Those focused on injury prevention",
      "Anyone who values precision over intensity",
    ],
    samplePhrases: [
      "Here's how to tell if your form is right.",
      "Your numbers are trending up — here's why that matters.",
      "Quality over quantity. One perfect rep beats ten sloppy ones.",
      "I've adjusted your program based on this week's performance.",
    ],
  },
];

export function getTrainerBySlug(slug: string): Trainer | undefined {
  return trainers.find((t) => t.slug === slug);
}
