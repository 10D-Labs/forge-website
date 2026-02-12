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
    slug: "how-to-track-your-workouts",
    title: "How to Track Your Workouts (And Why It Matters)",
    date: "2026-02-12",
    excerpt: "Discover why tracking your workouts is the difference between spinning your wheels and making real progress. Three proven methods, what to log, and how to actually use the data.",
    author: "The Forge Team",
    keywords: ["how to track workouts", "workout tracking methods", "best way to track workouts", "workout log template", "how to log workouts", "track gym progress", "progressive overload tracking"],
    category: "training-fundamentals"
  },
  {
    slug: "how-to-breathe-during-weightlifting",
    title: "How to Breathe During Weightlifting: Complete Guide",
    date: "2026-02-10",
    excerpt: "Master breathing techniques for lifting: Learn the Valsalva maneuver, when to breathe during squats and deadlifts, and how proper breathing boosts performance and protects your spine.",
    author: "The Forge Team",
    keywords: ["breathing during weightlifting", "valsalva maneuver", "how to breathe while lifting", "breathing technique squats", "breathing technique deadlift"],
    category: "exercise-technique"
  },
  {
    slug: "fix-muscle-imbalances-complete-guide",
    title: "How to fix muscle imbalances: complete guide",
    date: "2026-02-09",
    excerpt: "One side stronger than the other? Learn what causes muscle imbalances, when they become a problem, and the exact training protocol to fix them.",
    author: "The Forge Team",
    keywords: ["muscle imbalance", "unilateral training", "muscle asymmetry", "fix muscle imbalance", "one arm stronger than the other"],
    category: "training-fundamentals"
  },
  {
    slug: "junk-volume-explained",
    title: "Junk volume: why more sets don't always mean more gains",
    date: "2026-02-08",
    excerpt: "Junk volume wastes recovery without building muscle. Learn the science-backed sweet spot between too little and too much training volume for maximum gains.",
    author: "The Forge Team",
    keywords: ["junk volume", "training volume", "muscle growth", "maximum recoverable volume", "hypertrophy training", "optimal training volume"],
    category: "training-fundamentals"
  },
  {
    slug: "gym-intimidation-guide",
    title: "Gym intimidation: why it happens and how to overcome it",
    date: "2026-02-07",
    excerpt: "40% of Americans avoid gyms due to intimidation. Learn the psychology behind gym anxiety and a proven 30-day framework to build confidence at the gym.",
    author: "The Forge Team",
    keywords: ["gym intimidation", "gym anxiety", "gymtimidation", "first time gym", "overcome gym anxiety", "gym confidence"],
    category: "getting-started"
  },
  {
    slug: "muscle-soreness-after-workout-guide",
    title: "Muscle soreness after a workout: what your body is actually telling you",
    date: "2026-02-06",
    excerpt: "Learn what DOMS really means, how to tell muscle soreness from injury, when to train through it, and recovery methods backed by research.",
    author: "The Forge Team",
    keywords: ["muscle soreness after workout", "DOMS", "delayed onset muscle soreness", "should I workout when sore", "muscle soreness vs injury"],
    category: "workout-recovery"
  },
  {
    slug: "pre-workout-post-workout-nutrition",
    title: "Pre-workout and post-workout nutrition: What science actually says",
    date: "2026-02-05",
    excerpt: "Cut through nutrition myths with evidence-based answers on pre-workout and post-workout meals. Learn why timing matters less than total daily intake.",
    author: "The Forge Team",
    keywords: ["pre workout nutrition", "post workout nutrition", "anabolic window myth", "workout meal timing", "what to eat before workout"],
    category: "training-fundamentals"
  },
  {
    slug: "how-ai-personalizes-workouts",
    title: "How AI Actually Personalizes Your Workouts (The Science Behind Smart Fitness Apps)",
    date: "2026-02-04",
    excerpt: "Every fitness app claims to 'personalize' workouts. Most are lying. Here's the science behind apps that actually adapt to you, and how to spot the difference.",
    author: "The Forge Team",
    keywords: ["AI workout personalization", "fitness app technology", "machine learning fitness", "smart workout apps", "AI fitness apps"],
    category: "fitness-technology"
  },
  {
    slug: "best-hypertrophy-programs-2026",
    title: "Best Hypertrophy Programs 2026: PHUL, PHAT, nSuns & More",
    date: "2026-02-03",
    excerpt: "Compare 8 proven hypertrophy programs (PHUL, PHAT, nSuns, Reddit PPL). Science-based guide helps you match the right muscle-building program to your schedule.",
    author: "The Forge Team",
    keywords: ["best hypertrophy program", "best program for muscle growth", "PHUL vs PHAT", "hypertrophy workout program", "science based hypertrophy program", "best hypertrophy program for intermediate", "which hypertrophy program should I do"],
    category: "training-fundamentals"
  },
  {
    slug: "how-long-to-see-gym-results",
    title: "How Long Does It Take to See Gym Results? (Realistic Timeline)",
    date: "2026-02-02",
    excerpt: "Three weeks in and nothing visible yet? You're not doing it wrong. Learn what actually happens in your body week by week, when you'll see real changes, and how to avoid the comparison trap.",
    author: "The Forge Team",
    keywords: ["how long to see gym results", "when will I see muscle gains", "gym progress timeline", "beginner muscle growth", "how long to build muscle", "first workout results"],
    category: "getting-started"
  },
  {
    slug: "calorie-deficit-weight-loss",
    title: "Calorie Deficit for Weight Loss: What Science Actually Says",
    date: "2026-02-01",
    excerpt: "Calorie deficits are required for weight loss, but food choices affect hunger, metabolism, and sustainability. Science-backed guide to energy balance, NEAT, TEF, and why both calories and food quality matter.",
    author: "The Forge Team",
    keywords: ["calorie deficit", "weight loss", "energy balance", "thermic effect of food", "NEAT", "food quality vs calories", "metabolic adaptation"],
    category: "training-fundamentals"
  },
  {
    slug: "why-steroids-are-bad",
    title: "Why Steroids Are Bad: Natural Muscle Building Works Better",
    date: "2026-01-31",
    excerpt: "Steroid users face 3x higher mortality risk. Natural training with proper programming builds impressive muscle safely. Here's what the research shows.",
    author: "The Forge Team",
    keywords: ["anabolic steroids", "steroid risks", "natural muscle building", "steroid side effects", "natural vs steroids"],
    category: "fitness-psychology"
  },
  {
    slug: "pull-up-progression-guide",
    title: "How to Do Your First Pull-Up (And Progress to 20+)",
    date: "2026-01-30",
    excerpt: "Most people can't do a single pull-up. This complete progression guide takes you from zero to 20+ using proven training methods: negatives, GTG, and weighted variations.",
    author: "The Forge Team",
    keywords: ["pull-up progression", "first pull-up", "pull-up training", "chin-up vs pull-up", "negative pull-ups", "greasing the groove", "bodyweight strength"],
    category: "exercise-technique"
  },
  {
    slug: "how-to-spot-bad-fitness-advice",
    title: "How to Spot Bad Fitness Advice (5-Step Framework & Red Flags)",
    date: "2026-01-29",
    excerpt: "More than 60% of fitness content is misleading. Learn the 5-step framework to spot red flags, evaluate trainers, and stop following bad advice.",
    author: "The Forge Team",
    keywords: ["fitness advice red flags", "how to spot bad fitness advice", "fitness influencer credibility", "evidence-based fitness", "personal trainer credentials"],
    category: "getting-started"
  },
  {
    slug: "gym-etiquette-complete-guide",
    title: "Gym Etiquette: The Complete Guide to Unspoken Rules",
    date: "2026-01-28",
    excerpt: "Learn the unwritten gym rules that 2,000 gym-goers say matter most. From reracking weights to handling equipment hogs, here's what you need to know.",
    author: "The Forge Team",
    keywords: ["gym etiquette", "gym etiquette rules", "unwritten gym rules", "gym manners", "gym behavior"],
    category: "getting-started"
  },
  {
    slug: "how-to-warm-up-before-lifting",
    title: "How to Warm Up Before Lifting: Complete Guide",
    date: "2026-01-26",
    excerpt: "Learn the 3-phase warm-up protocol that reduces injury risk by 36%. Complete guide with specific sets, reps, and timing for every major lift.",
    author: "The Forge Team",
    keywords: ["warm up before lifting", "lifting warm up routine", "how to warm up for strength training", "exercise-specific warm up", "dynamic stretching", "warm up sets"],
    category: "exercise-technique"
  },
  {
    slug: "how-to-find-good-personal-trainer",
    title: "How to Find a Good Personal Trainer (2026 Guide)",
    date: "2026-01-25",
    excerpt: "Not all personal trainers are created equal. Learn how to spot certified professionals, verify credentials online, ask the right questions, and avoid trainers who'll waste your money or injure you.",
    author: "The Forge Team",
    keywords: ["how to find a good personal trainer", "personal trainer certification", "questions to ask personal trainer", "personal trainer red flags", "how to choose personal trainer", "NCCA certified trainer"],
    category: "getting-started"
  },
  {
    slug: "personal-training-on-a-budget",
    title: "How to Get Personal Training on a Budget: 7 Smart Strategies",
    date: "2026-01-23",
    excerpt: "Personal trainers cost $300-500/month. Here are 7 proven strategies to get quality training guidance for a fraction of the price.",
    author: "The Forge Team",
    keywords: ["personal training on a budget", "affordable personal training", "cheap personal trainer", "how to afford personal trainer", "budget fitness coaching"],
    category: "getting-started"
  },
  {
    slug: "first-time-at-gym-trainers-guide",
    title: "First Time at the Gym? A Trainer's Complete Guide",
    date: "2026-01-22",
    excerpt: "Your first gym visit doesn't have to be scary. Here's exactly what to bring, when to go, what to do, and how to survive your first workout.",
    author: "The Forge Team",
    keywords: ["first time at gym", "gym beginner guide", "gym anxiety", "first gym workout", "gym etiquette", "beginner workout plan"],
    category: "getting-started"
  },
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
    title: "Do You Need a Personal Trainer? 12 Signs to Consider",
    date: "2026-01-19",
    excerpt: "Not sure if personal training is worth it? This self-assessment guide reveals 12 signs you'd benefit from a trainer, plus affordable alternatives to fit any budget.",
    author: "The Forge Team",
    keywords: ["do I need a personal trainer", "signs you need a personal trainer", "personal trainer worth it", "when to hire personal trainer", "personal training benefits"],
    category: "getting-started"
  },
  {
    slug: "fitness-decision-paralysis-guide",
    title: "Fitness Decision Paralysis: How to Finally Pick a Plan",
    date: "2026-01-17",
    excerpt: "Overwhelmed by workout options? Learn why fitness decision paralysis happens and use this 6-step framework to finally choose a program and start making progress.",
    author: "The Forge Team",
    keywords: ["fitness decision paralysis", "how to choose a workout plan", "workout overwhelm", "analysis paralysis gym", "beginner workout confusion"],
    category: "fitness-psychology"
  },
  {
    slug: "program-hopping-guide",
    title: "Program Hopping: Why You Can't Stick to One Plan",
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
    title: "Machines vs Barbells vs Dumbbells: What Works Best",
    date: "2026-01-13",
    excerpt: "Every piece of gym equipment builds muscle differently. Here's what the research says about when to use machines, barbells, or dumbbells for your specific goals.",
    author: "The Forge Team",
    keywords: ["barbells vs dumbbells vs machines", "free weights vs machines", "best equipment for strength training", "gym equipment for beginners", "barbell vs dumbbell strength"],
    category: "strength-training"
  },
  {
    slug: "your-brain-sabotages-workouts",
    title: "Your Brain Is Sabotaging Your Workouts: Fight Back",
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
    title: "How to Break Through a Workout Plateau (2026)",
    date: "2026-01-08",
    excerpt: "Stuck at the same weights or seeing no progress? Learn the science-backed strategies to break through workout plateaus using smart training variation, deload weeks, and periodization.",
    author: "The Forge Team",
    keywords: ["workout plateau", "training variation", "progressive overload", "periodization", "deload", "muscle adaptation", "FITT principle", "training frequency"],
    category: "strength-training"
  },
  {
    slug: "muscle-growth-during-recovery",
    title: "Muscle Growth Biology: Why Rest Builds Muscle",
    date: "2026-01-06",
    excerpt: "Discover the cellular mechanisms that transform your workouts into muscle growth. Learn why muscle protein synthesis peaks 24 hours after training, how satellite cells build new muscle tissue, and why sleep is your most anabolic activity.",
    author: "The Forge Team",
    keywords: ["muscle protein synthesis", "muscle growth biology", "satellite cells", "mTOR pathway", "recovery science", "growth hormone", "supercompensation", "how muscles grow", "muscle recovery"],
    category: "workout-recovery"
  },
  {
    slug: "rep-tempo-explained",
    title: "Rep Tempo Explained: Fast vs Slow Reps for Gains",
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
    title: "Bridging the Fitness Gap in Personal Training",
    date: "2026-01-02",
    excerpt: "Personal trainers are invaluable for those who can access them. But cost, scheduling, anxiety, and geography leave millions without the fitness guidance they need. Here's how AI fitness technology is democratizing access.",
    author: "The Forge Team",
    keywords: ["personal training cost", "AI fitness app", "gym anxiety", "fitness accessibility", "personal trainer alternatives"],
    category: "fitness-technology"
  },
  {
    slug: "rest-days-explained",
    title: "Rest Days Explained: Your Secret Weapon for Gains",
    date: "2026-01-01",
    excerpt: "Discover why rest days accelerate your fitness gains, how to spot overtraining, and the science-backed strategies that turn recovery into your competitive advantage.",
    author: "The Forge Team",
    keywords: ["rest days", "active recovery", "passive recovery", "overtraining syndrome", "muscle recovery"],
    category: "workout-recovery"
  },
  {
    slug: "progressive-overload-explained",
    title: "Progressive Overload Explained: Build More Muscle",
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
    title: "How to Track Fitness Progress: 7 Proven Methods",
    date: "2025-12-29",
    excerpt: "Learn how to track fitness progress with 7 proven methods. Why the scale fails, what to measure instead, and how technology makes tracking effortless.",
    author: "The Forge Team",
    keywords: ["how to track fitness progress", "fitness tracking methods", "track workout progress", "body composition tracking", "progressive overload tracking"],
    category: "fitness-technology"
  },
  {
    slug: "best-ai-personal-trainer-apps-2026",
    title: "Best AI Personal Trainer Apps in 2026: Reviews",
    date: "2025-12-24",
    excerpt: "Compare the top 11 AI personal trainer apps of 2026. Find the perfect AI fitness coach for your goals, budget, and experience level with our expert analysis and recommendations.",
    author: "The Forge Team",
    keywords: ["AI personal trainer apps", "best AI fitness apps 2026", "AI workout app comparison", "AI personal training app reviews", "AI fitness coach app", "personal trainer app with AI"],
    category: "fitness-technology"
  },
  {
    slug: "fitness-challenges-that-keep-you-motivated",
    title: "5 Fitness Challenges That Keep You Motivated",
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
    title: "The Science of Workout Consistency",
    date: "2025-12-21",
    excerpt: "Why consistency beats intensity, what the research says about habit formation, and practical strategies to finally make exercise stick.",
    author: "The Forge Team",
    category: "fitness-psychology"
  },
  {
    slug: "personalized-workout-plans-vs-generic",
    title: "Personalized vs Generic Workout Plans: What Works",
    date: "2025-12-20",
    excerpt: "Generic fitness programs fail most people. Here's why personalization matters and how to finally get a workout plan that works for your body and goals.",
    author: "The Forge Team",
    category: "training-fundamentals"
  },
  {
    slug: "ai-vs-traditional-personal-trainers",
    title: "AI vs Traditional Personal Trainers (2026)",
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
