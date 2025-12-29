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
    slug: "science-of-workout-consistency",
    title: "The Science of Workout Consistency: How to Finally Stick With Exercise",
    date: "2025-12-21",
    excerpt: "Why consistency beats intensity, what the research says about habit formation, and practical strategies to finally make exercise stick.",
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
