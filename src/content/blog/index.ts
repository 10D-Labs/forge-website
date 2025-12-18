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
  {
    slug: "welcome-to-forge",
    title: "Welcome to Forge",
    date: "2024-12-18",
    excerpt: "Introducing Forge - your AI-powered personal fitness trainer that's changing the way people work out.",
    author: "The Forge Team"
  }
  // Add more posts here in the format:
  // {
  //   slug: "your-post-slug",
  //   title: "Your Post Title",
  //   date: "YYYY-MM-DD",
  //   excerpt: "A brief description...",
  //   author: "Author Name"
  // }
];
