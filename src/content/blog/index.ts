// Blog post registry - add new posts here
// To add a new post:
// 1. Create a .md file in src/content/blog/
// 2. Add the metadata below

import type { BlogCategory } from "@/types/content";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  keywords?: string[];
  category?: BlogCategory;
  relatedPosts?: string[]; // Manual overrides for related posts (slugs)
}

// Helper to get related posts based on category and keywords
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
  const currentPost = blogPosts.find(p => p.slug === currentSlug);
  if (!currentPost) return [];

  // First check for manual overrides
  if (currentPost.relatedPosts?.length) {
    return currentPost.relatedPosts
      .map(slug => blogPosts.find(p => p.slug === slug))
      .filter((p): p is BlogPostMeta => p !== undefined)
      .slice(0, limit);
  }

  // Otherwise, find posts by same category, then by keyword overlap
  const otherPosts = blogPosts.filter(p => p.slug !== currentSlug);

  const scored = otherPosts.map(post => {
    let score = 0;

    // Same category = high score
    if (post.category && post.category === currentPost.category) {
      score += 10;
    }

    // Keyword overlap
    if (currentPost.keywords && post.keywords) {
      const currentKeywords = new Set(currentPost.keywords.map(k => k.toLowerCase()));
      const matchingKeywords = post.keywords.filter(k =>
        currentKeywords.has(k.toLowerCase())
      );
      score += matchingKeywords.length * 2;
    }

    return { post, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.post);
}

export const blogPosts: BlogPostMeta[] = [
  // Add more posts here in the format:
  // {
  //   slug: "your-post-slug",
  //   title: "Your Post Title",
  //   date: "YYYY-MM-DD",
  //   excerpt: "A brief description...",
  //   author: "Author Name",
  //   category: "training-fundamentals"
  // }
  {
    slug: "personal-trainer-alternatives",
    title: "Personal Trainer Alternatives: What Actually Works",
    date: "2026-01-21",
    excerpt: "Personal trainers cost $300-500/month. Here's an honest look at alternatives that actually work, from AI trainers to group classes, and what you trade for the savings.",
    author: "The Forge Team",
    keywords: ["personal trainer alternatives", "can't afford personal trainer", "alternatives to personal trainer", "AI personal trainer", "group fitness classes"],
    category: "getting-started"
  },
  {
    slug: "how-much-does-personal-trainer-cost",
    title: "How Much Does a Personal Trainer Cost? 2026 Pricing Guide",
    date: "2026-01-20",
    excerpt: "Personal trainers cost $40-$500+ per session depending on location, experience, and setting. Complete breakdown of gym trainers, independent coaches, online training, and AI alternatives with real monthly costs.",
    author: "The Forge Team",
    keywords: ["how much does a personal trainer cost", "personal trainer cost", "personal training prices", "personal trainer rates", "cost of personal trainer"],
    category: "getting-started"
  },
  {
    slug: "do-you-need-a-personal-trainer",
    title: "Do You Need a Personal Trainer? 12 Signs You'd Benefit From One",
    date: "2026-01-19",
    excerpt: "Not sure if personal training is worth it? This self-assessment guide reveals 12 signs you'd benefit from a trainer, plus affordable alternatives to fit any budget.",
    author: "The Forge Team",
    keywords: ["do I need a personal trainer", "signs you need a personal trainer", "personal trainer worth it", "when to hire personal trainer", "personal training benefits"],
    category: "getting-started"
  },
  {
    slug: "fitness-decision-paralysis-guide",
    title: "Fitness Decision Paralysis: Why You Can't Choose a Workout Plan (And How to Finally Start)",
    date: "2026-01-17",
    excerpt: "Overwhelmed by workout options? Learn why fitness decision paralysis happens and use this 6-step framework to finally choose a program and start making progress.",
    author: "The Forge Team",
    keywords: ["fitness decision paralysis", "how to choose a workout plan", "workout overwhelm", "analysis paralysis gym", "beginner workout confusion"],
    category: "fitness-psychology"
  },
  {
    slug: "program-hopping-guide",
    title: "Program Hopping: Why You Keep Switching Workout Plans (And How to Finally Stick to One)",
    date: "2026-01-15",
    excerpt: "Discover why constantly switching workout programs sabotages your progress and learn science-backed strategies to finally commit to a plan long enough to see real results.",
    author: "The Forge Team",
    keywords: ["program hopping", "switching workout programs", "how long to stick with workout program", "workout program consistency", "gym program results"],
    category: "fitness-psychology"
  },
  {
    slug: "deload-week-complete-guide",
    title: "Deload Week Complete Guide: When, Why, and How to Recover",
    date: "2026-01-14",
    excerpt: "Learn when and how to implement deload weeks for optimal recovery. Science-backed strategies to prevent overtraining and maximize long-term gains.",
    author: "The Forge Team",
    keywords: ["deload week", "what is a deload week", "how to deload", "when to deload", "overtraining recovery", "workout recovery", "deload training"],
    category: "workout-recovery"
  },
  {
    slug: "machines-vs-barbells-vs-dumbbells",
    title: "Machines vs Barbells vs Dumbbells: The Science of What Actually Works",
    date: "2026-01-13",
    excerpt: "Every piece of gym equipment builds muscle differently. Here's what the research says about when to use machines, barbells, or dumbbells for your specific goals.",
    author: "The Forge Team",
    keywords: ["barbells vs dumbbells vs machines", "free weights vs machines", "best equipment for strength training", "gym equipment for beginners", "barbell vs dumbbell strength"],
    category: "strength-training"
  },
  {
    slug: "your-brain-sabotages-workouts",
    title: "Your Brain Is Sabotaging Your Workouts (And How to Fight Back)",
    date: "2026-01-12",
    excerpt: "Science reveals your brain shuts you down long before your muscles actually fail. Learn evidence-based strategies to push past mental barriers and unlock real gains.",
    author: "The Forge Team",
    keywords: ["mental barriers in workouts", "brain tells you to quit workout", "push through mental barrier exercise", "central governor theory", "how to do more reps mentally", "40 percent rule fitness"],
    category: "fitness-psychology"
  },
  {
    slug: "master-exercise-form-technique-guide",
    title: "Master Exercise Form: Complete Guide to Perfect Technique",
    date: "2026-01-09",
    excerpt: "Discover why proper exercise form matters more than the weight you lift, how to master technique for the big 5 lifts, and when AI-powered form coaching can help you train safer and smarter.",
    author: "The Forge Team",
    keywords: ["exercise form", "proper technique", "squat form", "deadlift form", "bench press form", "workout injuries", "AI form check"],
    category: "exercise-technique"
  },
  {
    slug: "break-through-workout-plateau",
    title: "How to Break Through a Workout Plateau: The Science of Training Variation",
    date: "2026-01-08",
    excerpt: "Stuck at the same weights or seeing no progress? Learn the science-backed strategies to break through workout plateaus using smart training variation, deload weeks, and periodization.",
    author: "The Forge Team",
    keywords: ["workout plateau", "training variation", "progressive overload", "periodization", "deload", "muscle adaptation", "FITT principle", "training frequency"],
    category: "strength-training"
  },
  {
    slug: "muscle-growth-during-recovery",
    title: "The Biology of Muscle Growth: Why Muscles Are Built During Rest, Not Workouts",
    date: "2026-01-06",
    excerpt: "Discover the cellular mechanisms that transform your workouts into muscle growth. Learn why muscle protein synthesis peaks 24 hours after training, how satellite cells build new muscle tissue, and why sleep is your most anabolic activity.",
    author: "The Forge Team",
    keywords: ["muscle protein synthesis", "muscle growth biology", "satellite cells", "mTOR pathway", "recovery science", "growth hormone", "supercompensation", "how muscles grow", "muscle recovery"],
    category: "workout-recovery"
  },
  {
    slug: "rep-tempo-explained",
    title: "Rep Tempo Explained: Fast vs Slow Reps for Strength and Muscle Growth",
    date: "2026-01-05",
    excerpt: "Does rep speed really matter for building muscle? Discover what science says about fast vs slow reps, time under tension, and how to match your tempo to your training goals.",
    author: "The Forge Team",
    keywords: ["rep tempo", "time under tension", "muscle growth", "strength training", "eccentric training", "concentric training", "lifting speed", "rep speed", "tempo training"],
    category: "exercise-technique"
  },
  {
    slug: "identity-based-habits-gym-consistency",
    title: "Identity-Based Habits: Become the Person Who Goes to the Gym",
    date: "2026-01-04",
    excerpt: "Stop forcing workouts. Build lasting gym consistency with identity-based habits: think 'I'm someone who works out' not 'I should work out.' Science-backed strategies.",
    author: "The Forge Team",
    keywords: ["identity-based habits", "gym consistency", "workout motivation", "fitness identity", "habit formation psychology", "how to stick with gym", "exercise habits", "how to make gym a habit", "become a person who works out"],
    category: "fitness-psychology"
  },
  {
    slug: "remove-every-barrier-gym-effortless",
    title: "Remove Every Barrier: How to Make Going to the Gym Effortless",
    date: "2026-01-03",
    excerpt: "Learn how to eliminate every barrier to gym consistency using friction reduction. Science-backed strategies to make working out effortless. No willpower needed.",
    author: "The Forge Team",
    keywords: ["gym consistency", "workout barriers", "fitness friction", "gym habits", "activation energy", "make working out easier", "how to be consistent with gym"],
    category: "fitness-psychology"
  },
  {
    slug: "bridging-the-fitness-gap",
    title: "Bridging the Fitness Gap: How Millions Are Left Behind by Traditional Personal Training",
    date: "2026-01-02",
    excerpt: "Personal trainers are invaluable for those who can access them. But cost, scheduling, anxiety, and geography leave millions without the fitness guidance they need. Here's how AI fitness technology is democratizing access.",
    author: "The Forge Team",
    keywords: ["personal training cost", "AI fitness app", "gym anxiety", "fitness accessibility", "personal trainer alternatives"],
    category: "fitness-technology"
  },
  {
    slug: "rest-days-explained",
    title: "Rest Days Explained: Why Recovery Is Your Secret Weapon for Faster Fitness Results",
    date: "2026-01-01",
    excerpt: "Discover why rest days accelerate your fitness gains, how to spot overtraining, and the science-backed strategies that turn recovery into your competitive advantage.",
    author: "The Forge Team",
    keywords: ["rest days", "active recovery", "passive recovery", "overtraining syndrome", "muscle recovery"],
    category: "workout-recovery"
  },
  {
    slug: "progressive-overload-explained",
    title: "Progressive Overload Explained: The Science-Backed Method to Build Muscle and Strength",
    date: "2025-12-31",
    excerpt: "Learn how progressive overload drives muscle growth and strength gains. Discover 7 proven methods to apply progressive resistance training and avoid common mistakes.",
    author: "The Forge Team",
    keywords: ["progressive overload", "build muscle", "strength training", "muscle growth", "workout progression"],
    category: "training-fundamentals"
  },
  {
    slug: "best-workout-split-guide",
    title: "Best Workout Split for Your Goals: Science-Based Guide (2025)",
    date: "2025-12-30",
    excerpt: "Discover the best workout split for muscle growth. Compare full-body, upper/lower, and PPL routines. Science-backed guide to choosing your ideal training frequency.",
    author: "The Forge Team",
    keywords: ["workout split", "best workout split", "workout split for beginners", "training frequency", "muscle hypertrophy", "resistance training split"],
    category: "training-fundamentals"
  },
  {
    slug: "how-to-track-fitness-progress",
    title: "How to Track Fitness Progress: 7 Methods That Work Better Than the Scale",
    date: "2025-12-29",
    excerpt: "Learn how to track fitness progress with 7 proven methods. Why the scale fails, what to measure instead, and how technology makes tracking effortless.",
    author: "The Forge Team",
    keywords: ["how to track fitness progress", "fitness tracking methods", "track workout progress", "body composition tracking", "progressive overload tracking"],
    category: "fitness-technology"
  },
  {
    slug: "best-ai-personal-trainer-apps-2026",
    title: "Best AI Personal Trainer Apps & Services in 2026: Expert Reviews & Recommendations",
    date: "2025-12-24",
    excerpt: "Compare the top 11 AI personal trainer apps of 2026. Find the perfect AI fitness coach for your goals, budget, and experience level with our expert analysis and recommendations.",
    author: "The Forge Team",
    keywords: ["AI personal trainer apps", "best AI fitness apps 2026", "AI workout app comparison", "AI personal training app reviews", "AI fitness coach app", "personal trainer app with AI"],
    category: "fitness-technology"
  },
  {
    slug: "fitness-challenges-that-keep-you-motivated",
    title: "5 Fitness Challenges That Actually Keep You Motivated (2025 Guide)",
    date: "2025-12-23",
    excerpt: "Proven fitness challenges that boost motivation and build lasting habits, plus how to design your own and make them stick.",
    author: "The Forge Team",
    category: "fitness-psychology"
  },
  {
    slug: "home-workouts-vs-gym",
    title: "Home Workouts vs. Gym: What Actually Works Better in 2025?",
    date: "2025-12-22",
    excerpt: "Comparing the real pros and cons of training at home versus the gym, and why the best answer might be 'both.'",
    author: "The Forge Team",
    category: "training-fundamentals"
  },
  {
    slug: "science-of-workout-consistency",
    title: "The Science of Workout Consistency: How to Finally Stick With Exercise",
    date: "2025-12-21",
    excerpt: "Why consistency beats intensity, what the research says about habit formation, and practical strategies to finally make exercise stick.",
    author: "The Forge Team",
    category: "fitness-psychology"
  },
  {
    slug: "personalized-workout-plans-vs-generic",
    title: "Why Personalized Workout Plans Beat Generic Programs Every Time",
    date: "2025-12-20",
    excerpt: "Generic fitness programs fail most people. Here's why personalization matters and how to finally get a workout plan that works for your body and goals.",
    author: "The Forge Team",
    category: "training-fundamentals"
  },
  {
    slug: "ai-vs-traditional-personal-trainers",
    title: "AI Personal Trainers vs. Traditional Personal Trainers in 2025",
    date: "2025-12-19",
    excerpt: "Comparing AI fitness coaches to traditional personal trainers: when each option makes sense and how to choose what's right for you.",
    author: "The Forge Team",
    category: "fitness-technology"
  },
  {
    slug: "why-do-we-need-personal-trainers",
    title: "Why Do We Need Personal Trainers?",
    date: "2025-12-18",
    excerpt: "Breaking down the benefits of personal trainers and how Forge helps you succeed.",
    author: "The Forge Team",
    category: "getting-started"
  },
  {
    slug: "welcome-to-forge",
    title: "Welcome to Forge",
    date: "2025-12-17",
    excerpt: "Introducing Forge - your AI-powered personal fitness trainer that's changing the way people work out.",
    author: "The Forge Team",
    category: "getting-started"
  }
];
