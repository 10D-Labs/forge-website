import type { Trainer } from "@/types/content";

export const trainers: Trainer[] = [
  {
    name: "Sergeant Stone",
    slug: "sergeant-stone",
    role: "Tough love",
    description: "Direct coaching for days when you need a firm push.",
    vibe: "Show up. Put in the work.",
    avatarUrl: "/trainers/sergeant-stone-portrait.webp",
    fullDescription: "You know what you want. Sometimes you need a push to follow through. Stone is Forge's drill-instructor-style AI coach: direct, demanding, and focused on helping you stay consistent.",
    trainingStyle: ["Straight answers and clear expectations", "Firm reminders to follow through", "A focus on consistency over perfection"],
    bestFor: ["You like a direct, no-nonsense tone", "You respond well to a challenge", "You want firm accountability"],
    samplePhrases: ["You showed up when you didn't want to. That's the only thing that matters. Now do it again tomorrow."],
  },
  {
    name: "Maya",
    slug: "maya",
    role: "Supportive",
    description: "Patient encouragement to help you build confidence.",
    vibe: "One step. Then the next.",
    avatarUrl: "/trainers/maya-portrait.webp",
    fullDescription: "Starting can feel like the hardest part. Maya is Forge's supportive AI coach, with patient explanations and encouragement for every small win. Ask your questions, find your pace, and build confidence as you go.",
    trainingStyle: ["Patient, step-by-step explanations", "Encouragement for the effort you put in", "Small, achievable goals to build confidence"],
    bestFor: ["You're new to training or getting back into it", "You feel unsure about the gym", "You prefer encouragement to pressure"],
    samplePhrases: ["You showed up today, and that's already a win!"],
  },
  {
    name: "Mike",
    slug: "mike",
    role: "Laid-back",
    description: "Easygoing coaching with a sense of humor.",
    vibe: "Good company. Good reps.",
    avatarUrl: "/trainers/mike-portrait.webp",
    fullDescription: "You want to get stronger and enjoy the time you spend doing it. Mike is Forge's easygoing AI coach. Expect practical advice, a casual tone, and a sense of humor to help you keep coming back.",
    trainingStyle: ["Practical advice in plain language", "A conversational tone and a sense of humor", "Room for training to fit around your life"],
    bestFor: ["You want workouts to feel less intimidating", "You like a relaxed coaching style", "You want a routine you enjoy returning to"],
    samplePhrases: ["One more set and then you're out of here, deal?"],
  },
  {
    name: "Reese",
    slug: "reese",
    role: "Technique-focused",
    description: "Focused guidance for people who want to understand their training.",
    vibe: "Know why. Train with purpose.",
    avatarUrl: "/trainers/reese-portrait.webp",
    fullDescription: "You want to understand the reason behind the plan. Reese is Forge's focused AI coach, ready to talk through exercise technique, training targets, and what your progress means for your next session.",
    trainingStyle: ["Clear explanations of exercise technique", "Attention to your training numbers", "The reasons behind your exercises and targets"],
    bestFor: ["You like to understand how your plan works", "You enjoy tracking your training", "You prefer a focused, detailed approach"],
    samplePhrases: ["Your numbers are trending up. Here's why that matters."],
  },
];

export function getTrainerBySlug(slug: string): Trainer | undefined {
  return trainers.find((trainer) => trainer.slug === slug);
}
