import { LucideIcon } from "lucide-react";

// Blog content types
export type BlogCategory =
  | "training-fundamentals"
  | "workout-recovery"
  | "strength-training"
  | "fitness-psychology"
  | "exercise-technique"
  | "fitness-technology"
  | "getting-started";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  keywords?: string[];
  category?: BlogCategory;
  relatedPosts?: string[]; // Manual overrides for related posts
}

// Trainer types for programmatic pages
export interface Trainer {
  name: string;
  slug: string;
  role: string;
  description: string;
  vibe: string;
  avatarUrl: string;
  // Extended fields for trainer profile pages
  fullDescription?: string;
  trainingStyle?: string[];
  bestFor?: string[];
  samplePhrases?: string[];
}

// Feature types
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Topic types for programmatic SEO pages
export interface Topic {
  slug: string;
  name: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  relatedCategories: BlogCategory[];
}
