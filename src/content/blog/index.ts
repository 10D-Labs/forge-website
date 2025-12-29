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
