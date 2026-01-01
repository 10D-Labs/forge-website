// Blog post registry - add new posts here
// To add a new post: 
// 1. Create a .md file in src/content/blog/
// 2. Add the metadata below

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  keywords?: string[];
}

export const blogPosts: BlogPostMeta[] = [
  // Add more posts here in the format:
  // {
  //   slug: "your-post-slug",
  //   title: "Your Post Title",
  //   date: "YYYY-MM-DD",
  //   excerpt: "A brief description...",
  //   author: "Author Name"
  // }
  {
    slug: "rest-days-explained",
    title: "Rest Days Explained: Why Recovery Is Your Secret Weapon for Faster Fitness Results",
    date: "2026-01-01",
    excerpt: "Discover why rest days accelerate your fitness gains, how to spot overtraining, and the science-backed strategies that turn recovery into your competitive advantage.",
    author: "The Forge Team",
    keywords: ["rest days", "active recovery", "passive recovery", "overtraining syndrome", "muscle recovery"]
  },
  {
    slug: "progressive-overload-explained",
    title: "Progressive Overload Explained: The Science-Backed Method to Build Muscle and Strength",
    date: "2025-12-31",
    excerpt: "Learn how progressive overload drives muscle growth and strength gains. Discover 7 proven methods to apply progressive resistance training and avoid common mistakes.",
    author: "The Forge Team",
    keywords: ["progressive overload", "build muscle", "strength training", "muscle growth", "workout progression"]
  },
  {
    slug: "best-workout-split-guide",
    title: "Best Workout Split for Your Goals: Science-Based Guide (2025)",
    date: "2025-12-30",
    excerpt: "Discover the best workout split for muscle growth. Compare full-body, upper/lower, and PPL routines. Science-backed guide to choosing your ideal training frequency.",
    author: "The Forge Team",
    keywords: ["workout split", "best workout split", "workout split for beginners", "training frequency", "muscle hypertrophy", "resistance training split"]
  },
  {
    slug: "how-to-track-fitness-progress",
    title: "How to Track Fitness Progress: 7 Methods That Work Better Than the Scale",
    date: "2025-12-29",
    excerpt: "Learn how to track fitness progress with 7 proven methods. Why the scale fails, what to measure instead, and how technology makes tracking effortless.",
    author: "The Forge Team",
    keywords: ["how to track fitness progress", "fitness tracking methods", "track workout progress", "body composition tracking", "progressive overload tracking"]
  },
  {
    slug: "fitness-challenges-that-keep-you-motivated",
    title: "5 Fitness Challenges That Actually Keep You Motivated (2025 Guide)",
    date: "2025-12-23",
    excerpt: "Proven fitness challenges that boost motivation and build lasting habits, plus how to design your own and make them stick.",
    author: "The Forge Team"
  },
  {
    slug: "home-workouts-vs-gym",
    title: "Home Workouts vs. Gym: What Actually Works Better in 2025?",
    date: "2025-12-22",
    excerpt: "Comparing the real pros and cons of training at home versus the gym, and why the best answer might be 'both.'",
    author: "The Forge Team"
  },
  {
    slug: "science-of-workout-consistency",
    title: "The Science of Workout Consistency: How to Finally Stick With Exercise",
    date: "2025-12-21",
    excerpt: "Why consistency beats intensity, what the research says about habit formation, and practical strategies to finally make exercise stick.",
    author: "The Forge Team"
  },
  {
    slug: "personalized-workout-plans-vs-generic",
    title: "Why Personalized Workout Plans Beat Generic Programs Every Time",
    date: "2025-12-20",
    excerpt: "Generic fitness programs fail most people. Here's why personalization matters and how to finally get a workout plan that works for your body and goals.",
    author: "The Forge Team"
  },
  {
    slug: "ai-vs-traditional-personal-trainers",
    title: "AI Personal Trainers vs. Traditional Personal Trainers in 2025",
    date: "2025-12-19",
    excerpt: "Comparing AI fitness coaches to traditional personal trainers: when each option makes sense and how to choose what's right for you.",
    author: "The Forge Team"
  },
  {
    slug: "why-do-we-need-personal-trainers",
    title: "Why Do We Need Personal Trainers?",
    date: "2025-12-18",
    excerpt: "Breaking down the benefits of personal trainers and how Forge helps you succeed.",
    author: "The Forge Team"
  },
  {
    slug: "welcome-to-forge",
    title: "Welcome to Forge",
    date: "2025-12-17",
    excerpt: "Introducing Forge - your AI-powered personal fitness trainer that's changing the way people work out.",
    author: "The Forge Team"
  }
];
