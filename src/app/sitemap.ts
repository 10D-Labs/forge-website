import type { MetadataRoute } from "next";
import { getAllExercises, slugify } from "@/lib/exercises";
import { getAllPosts } from "@/lib/blog";
import { getValidCombinations, getValidMuscleHubs } from "@/lib/content-quality";
import {
  BODY_PART_SLUGS,
  EQUIPMENT_SLUGS,
  DIFFICULTY_SLUGS,
} from "@/types/exercise";
import { trainers } from "@/content/trainers";
import { topics } from "@/content/topics";

const BASE_URL = "https://forgetrainer.ai";

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
      url: `${BASE_URL}/exercises`,
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
  ];

  // Individual exercise pages (1,251 pages)
  const exercises = getAllExercises();
  const exercisePages: MetadataRoute.Sitemap = exercises.map((exercise) => ({
    url: `${BASE_URL}/exercise/${slugify(exercise.name)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Body part hub pages (8 pages)
  const bodyPartPages: MetadataRoute.Sitemap = Object.values(BODY_PART_SLUGS).map(
    (slug) => ({
      url: `${BASE_URL}/exercises/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // Equipment hub pages (14 pages)
  const equipmentPages: MetadataRoute.Sitemap = Object.values(EQUIPMENT_SLUGS).map(
    (slug) => ({
      url: `${BASE_URL}/exercises/equipment/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // Muscle hub pages (only valid ones)
  const muscleHubs = getValidMuscleHubs();
  const musclePages: MetadataRoute.Sitemap = muscleHubs.map((hub) => ({
    url: `${BASE_URL}/exercises/muscle/${hub.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Difficulty pages (3 pages)
  const difficultyPages: MetadataRoute.Sitemap = Object.values(DIFFICULTY_SLUGS).map(
    (slug) => ({
      url: `${BASE_URL}/exercises/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  // Combination pages (body part + equipment)
  const validCombos = getValidCombinations();
  const comboPages: MetadataRoute.Sitemap = validCombos.map((combo) => ({
    url: `${BASE_URL}/exercises/${BODY_PART_SLUGS[combo.bodyPart]}/${EQUIPMENT_SLUGS[combo.equipment]}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

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
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Combine all pages
  return [
    ...staticPages,
    ...trainerPages,
    ...topicPages,
    ...blogPages,
    ...bodyPartPages,
    ...equipmentPages,
    ...musclePages,
    ...difficultyPages,
    ...comboPages,
    ...exercisePages, // Put exercises last since there are so many
  ];
}
