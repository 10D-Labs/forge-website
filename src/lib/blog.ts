import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogCategory } from "@/types/content";
import type { Exercise } from "@/types/exercise";
import { getAllExercises, slugify } from "@/lib/exercises";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  keywords?: string[];
  category?: BlogCategory;
  relatedPosts?: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): BlogPostMeta[] {
  try {
    const files = fs.readdirSync(postsDirectory);
    const posts = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(".md", "");
        const fullPath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || slug,
          date: data.date || "",
          excerpt: data.excerpt || "",
          author: data.author || "The Forge Team",
          keywords: data.keywords,
          category: data.category,
          relatedPosts: data.relatedPosts,
        } as BlogPostMeta;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
      author: data.author || "The Forge Team",
      keywords: data.keywords,
      category: data.category,
      relatedPosts: data.relatedPosts,
      content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): BlogPostMeta[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);
  if (!currentPost) return [];

  // First check for manual overrides
  if (currentPost.relatedPosts?.length) {
    return currentPost.relatedPosts
      .map((slug) => allPosts.find((p) => p.slug === slug))
      .filter((p): p is BlogPostMeta => p !== undefined)
      .slice(0, limit);
  }

  // Otherwise, find posts by same category, then by keyword overlap
  const otherPosts = allPosts.filter((p) => p.slug !== currentSlug);

  const scored = otherPosts.map((post) => {
    let score = 0;

    // Same category = high score
    if (post.category && post.category === currentPost.category) {
      score += 10;
    }

    // Keyword overlap
    if (currentPost.keywords && post.keywords) {
      const currentKeywords = new Set(
        currentPost.keywords.map((k) => k.toLowerCase())
      );
      const matchingKeywords = post.keywords.filter((k) =>
        currentKeywords.has(k.toLowerCase())
      );
      score += matchingKeywords.length * 2;
    }

    return { post, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  return Array.from(categories);
}

/**
 * Get exercises related to a blog post based on keyword matching
 */
export function getRelatedExercisesForPost(
  post: BlogPostMeta,
  limit: number = 6
): Exercise[] {
  const allExercises = getAllExercises();

  const postText = [
    post.title.toLowerCase(),
    post.excerpt?.toLowerCase() ?? "",
    ...(post.keywords?.map((k) => k.toLowerCase()) ?? []),
  ].join(" ");

  const scored = allExercises.map((exercise) => {
    let score = 0;

    // Exercise name words found in post text
    const nameWords = exercise.name.toLowerCase().split(/\s+/);
    for (const word of nameWords) {
      if (word.length > 3 && postText.includes(word)) {
        score += 3;
      }
    }

    // Target muscle mentioned in post
    if (postText.includes(exercise.target.toLowerCase())) {
      score += 4;
    }

    // Body part mentioned in post
    if (postText.includes(exercise.bodyPart.toLowerCase())) {
      score += 2;
    }

    // Equipment mentioned in post
    if (postText.includes(exercise.equipment.toLowerCase())) {
      score += 2;
    }

    // Category relevance
    if (post.category === "exercise-technique" && exercise.category === "Strength") {
      score += 1;
    }

    // Boost popular exercises so we show the most useful ones
    score += (exercise.popularity - 1) * 0.5;

    return { exercise, score };
  });

  return scored
    .filter((s) => s.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.exercise);
}
