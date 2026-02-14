import type { Topic, BlogCategory } from "@/types/content";

export const topics: Topic[] = [
  {
    slug: "workout-recovery",
    name: "Workout Recovery",
    description: "Master the science of recovery to maximize your gains. Learn about rest days, deload weeks, sleep optimization, and the biology of muscle growth.",
    metaDescription: "Complete guide to workout recovery: rest days, deload weeks, muscle protein synthesis, and recovery science. Learn how to optimize rest for faster fitness results.",
    keywords: ["workout recovery", "rest days", "deload week", "muscle recovery", "active recovery", "overtraining"],
    relatedCategories: ["workout-recovery"],
  },
  {
    slug: "training-fundamentals",
    name: "Training Fundamentals",
    description: "Master the core principles every lifter needs. From progressive overload to workout splits, these fundamentals drive long-term results.",
    metaDescription: "Training fundamentals guide: progressive overload, workout splits, training frequency, and periodization. Science-backed principles for building muscle and strength.",
    keywords: ["training fundamentals", "progressive overload", "workout split", "training frequency", "muscle building basics"],
    relatedCategories: ["training-fundamentals"],
  },
  {
    slug: "strength-training",
    name: "Strength Training",
    description: "Build strength and muscle with proven training methods. Equipment guides, plateau-busting strategies, and lifting techniques backed by research.",
    metaDescription: "Strength training guides: equipment selection, breaking plateaus, lifting techniques, and hypertrophy programs. Science-backed methods for building muscle.",
    keywords: ["strength training", "hypertrophy", "muscle building", "lifting techniques", "workout plateau"],
    relatedCategories: ["strength-training"],
  },
  {
    slug: "exercise-technique",
    name: "Exercise Technique",
    description: "Perfect your form and technique to train safely and effectively. Learn proper execution for compound lifts and understand rep tempo principles.",
    metaDescription: "Master exercise form and technique: squat, deadlift, bench press, and more. Learn proper technique, rep tempo, and how to train safely for better results.",
    keywords: ["exercise form", "proper technique", "rep tempo", "lifting form", "workout technique"],
    relatedCategories: ["exercise-technique"],
  },
  {
    slug: "fitness-psychology",
    name: "Fitness Motivation & Psychology",
    description: "Build lasting fitness habits and overcome mental barriers. Discover the psychology of workout consistency, habit formation, and staying motivated.",
    metaDescription: "Build lasting gym habits with fitness psychology: identity-based habits, workout consistency, mental barriers, and motivation science. Make exercise stick.",
    keywords: ["fitness motivation", "gym consistency", "workout habits", "fitness psychology", "mental barriers"],
    relatedCategories: ["fitness-psychology"],
  },
  {
    slug: "fitness-technology",
    name: "AI & Fitness Technology",
    description: "Explore how AI is transforming personal training. Compare AI fitness apps, learn about tracking technology, and discover the future of personalized fitness.",
    metaDescription: "AI fitness technology guide: best AI personal trainer apps, fitness tracking methods, and how technology is making personalized training accessible to everyone.",
    keywords: ["AI personal trainer", "fitness apps", "AI workout", "fitness technology", "fitness tracking"],
    relatedCategories: ["fitness-technology"],
  },
  {
    slug: "getting-started",
    name: "Getting Started with Fitness",
    description: "New to fitness? Start here. Learn the basics of personal training, why guidance matters, and how to begin your fitness journey the right way.",
    metaDescription: "Start your fitness journey: beginner guides, personal training benefits, and how to build a workout routine. Everything you need to know to get started.",
    keywords: ["fitness for beginners", "getting started gym", "personal training benefits", "beginner workout"],
    relatedCategories: ["getting-started"],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getPostsForTopic(topicSlug: string): BlogCategory[] {
  const topic = getTopicBySlug(topicSlug);
  return topic?.relatedCategories ?? [];
}
