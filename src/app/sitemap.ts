import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { trainers } from "@/content/trainers";
import { topics } from "@/content/topics";

const BASE_URL = "https://forgetrainer.ai";

// NOTE: The exercise section (individual exercises, body-part/equipment/muscle/
// difficulty hubs, combos, comparisons) is intentionally excluded from the
// sitemap and noindexed. It is built on a syndicated public dataset (ExerciseDB)
// that Google treats as duplicate content, which triggered a site-wide
// "Crawled - currently not indexed" verdict. Pages remain live for users.
// To re-index later, restore these entries and remove the noindex in
// src/lib/seo/metadata-factory.ts.

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/delete-account`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/ai-workout-planner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/personal-trainer-cost-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Trainer pages
  const trainerPages: MetadataRoute.Sitemap = trainers.map((trainer) => ({
    url: `${BASE_URL}/trainers/${trainer.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Topic pages
  const topicPages: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: `${BASE_URL}/topics/${topic.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog posts
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...trainerPages, ...topicPages, ...blogPages];
}
