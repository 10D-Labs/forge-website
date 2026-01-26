import type { Metadata } from "next";
import type { Exercise, BodyPart, Equipment, TargetMuscle, Difficulty } from "@/types/exercise";
import { BODY_PART_SLUGS, EQUIPMENT_SLUGS, TARGET_SLUGS } from "@/types/exercise";
import { slugify } from "@/lib/exercises";

const BASE_URL = "https://forgetrainer.ai";

// Max title length is 70 chars. Layout adds " | Forge" (9 chars), so page title max is 61 chars.
const MAX_TITLE_LENGTH = 61;

/**
 * Generate a title that stays under the character limit
 * Uses shorter suffixes for longer names
 */
function generateExerciseTitle(name: string): string {
  const nameLength = name.length;

  // Short names: full suffix
  if (nameLength <= 35) {
    return `${name}: Form & Tips`;
  }

  // Medium names: minimal suffix
  if (nameLength <= 47) {
    return `${name} Guide`;
  }

  // Long names: no suffix (name alone is close to limit)
  return name;
}

/**
 * Generate metadata for an individual exercise page
 */
export function generateExerciseMetadata(exercise: Exercise): Metadata {
  const slug = slugify(exercise.name);
  const title = generateExerciseTitle(exercise.name);
  const description = `Learn proper ${exercise.name} form and technique. Targets ${exercise.target}${exercise.secondaryMuscles.length > 0 ? ` and ${exercise.secondaryMuscles.slice(0, 2).join(", ")}` : ""}. ${exercise.difficulty} level ${exercise.bodyPart.toLowerCase()} exercise using ${exercise.equipment.toLowerCase()}.`;

  return {
    title,
    description,
    keywords: [
      exercise.name,
      `${exercise.name} form`,
      `how to do ${exercise.name}`,
      `${exercise.target} exercises`,
      `${exercise.equipment} exercises`,
      `${exercise.bodyPart} exercises`,
      `${exercise.difficulty.toLowerCase()} exercises`,
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/exercise/${slug}`,
      type: "article",
      images: [
        {
          url: `${BASE_URL}/exercises/gifs/${exercise.id}.gif`,
          alt: `${exercise.name} demonstration`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/exercise/${slug}`,
      types: {
        "text/markdown": `${BASE_URL}/markdown/exercise/${slug}.md`,
      },
    },
  };
}

/**
 * Generate metadata for body part hub pages
 */
export function generateBodyPartHubMetadata(
  bodyPart: BodyPart,
  exerciseCount: number
): Metadata {
  const slug = slugify(bodyPart);
  const title = `${bodyPart} Exercises: ${exerciseCount}+ Workouts & Form Tips`;
  const description = `Browse ${exerciseCount} ${bodyPart.toLowerCase()} exercises with detailed instructions, form tips, and video demonstrations. Find the perfect exercises for your ${bodyPart.toLowerCase()} workout.`;

  return {
    title,
    description,
    keywords: [
      `${bodyPart.toLowerCase()} exercises`,
      `best ${bodyPart.toLowerCase()} exercises`,
      `${bodyPart.toLowerCase()} workout`,
      `${bodyPart.toLowerCase()} training`,
      `${bodyPart.toLowerCase()} movements`,
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/exercises/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}/exercises/${slug}`,
      types: {
        "text/markdown": `${BASE_URL}/markdown/exercises/${slug}.md`,
      },
    },
  };
}

/**
 * Generate metadata for equipment hub pages
 */
export function generateEquipmentHubMetadata(
  equipment: Equipment,
  exerciseCount: number
): Metadata {
  const slug = EQUIPMENT_SLUGS[equipment];
  const title = `${equipment} Exercises: ${exerciseCount}+ Workouts`;
  const description = `Discover ${exerciseCount} effective exercises using ${equipment.toLowerCase()}. Complete guide with proper form, muscles worked, and workout suggestions for all fitness levels.`;

  return {
    title,
    description,
    keywords: [
      `${equipment.toLowerCase()} exercises`,
      `${equipment.toLowerCase()} workout`,
      `exercises with ${equipment.toLowerCase()}`,
      `${equipment.toLowerCase()} training`,
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/exercises/equipment/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}/exercises/equipment/${slug}`,
      types: {
        "text/markdown": `${BASE_URL}/markdown/exercises/equipment/${slug}.md`,
      },
    },
  };
}

/**
 * Generate metadata for target muscle hub pages
 */
export function generateMuscleHubMetadata(
  muscle: TargetMuscle,
  exerciseCount: number
): Metadata {
  const slug = TARGET_SLUGS[muscle];
  const title = `${muscle} Exercises: ${exerciseCount}+ Workouts`;
  const description = `Target your ${muscle.toLowerCase()} with ${exerciseCount} effective exercises. Detailed instructions, form tips, and variations for all fitness levels.`;

  return {
    title,
    description,
    keywords: [
      `${muscle.toLowerCase()} exercises`,
      `best ${muscle.toLowerCase()} exercises`,
      `${muscle.toLowerCase()} workout`,
      `build ${muscle.toLowerCase()}`,
      `${muscle.toLowerCase()} training`,
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/exercises/muscle/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}/exercises/muscle/${slug}`,
      types: {
        "text/markdown": `${BASE_URL}/markdown/exercises/muscle/${slug}.md`,
      },
    },
  };
}

/**
 * Generate metadata for difficulty filter pages
 */
export function generateDifficultyMetadata(
  difficulty: Difficulty,
  exerciseCount: number
): Metadata {
  const slug = difficulty.toLowerCase();
  const title = `${difficulty} Exercises: ${exerciseCount} ${difficulty}-Friendly Workouts`;
  const description = `Find ${exerciseCount} ${difficulty.toLowerCase()}-level exercises perfect for ${difficulty === "Beginner" ? "getting started with fitness" : difficulty === "Intermediate" ? "progressing your training" : "challenging yourself"}. Detailed form guides and tips included.`;

  return {
    title,
    description,
    keywords: [
      `${difficulty.toLowerCase()} exercises`,
      `${difficulty.toLowerCase()} workout`,
      `${difficulty.toLowerCase()} fitness`,
      difficulty === "Beginner"
        ? "exercises for beginners"
        : `${difficulty.toLowerCase()} training`,
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/exercises/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}/exercises/${slug}`,
      types: {
        "text/markdown": `${BASE_URL}/markdown/exercises/${slug}.md`,
      },
    },
  };
}

/**
 * Generate metadata for combination pages (body part + equipment)
 */
export function generateComboMetadata(
  bodyPart: BodyPart,
  equipment: Equipment,
  exerciseCount: number
): Metadata | null {
  // Return null for thin content pages (handled by calling code)
  if (exerciseCount < 5) {
    return null;
  }

  const bodyPartSlug = BODY_PART_SLUGS[bodyPart];
  const equipmentSlug = EQUIPMENT_SLUGS[equipment];
  const title = `${bodyPart} ${equipment} Exercises (${exerciseCount}+)`;
  const description = `Discover ${exerciseCount} effective ${bodyPart.toLowerCase()} exercises using ${equipment.toLowerCase()}. Complete guide with form tips, muscles worked, and workout suggestions.`;

  return {
    title,
    description,
    keywords: [
      `${bodyPart.toLowerCase()} ${equipment.toLowerCase()} exercises`,
      `${equipment.toLowerCase()} ${bodyPart.toLowerCase()} workout`,
      `best ${bodyPart.toLowerCase()} exercises with ${equipment.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/exercises/${bodyPartSlug}/${equipmentSlug}`,
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}/exercises/${bodyPartSlug}/${equipmentSlug}`,
      types: {
        "text/markdown": `${BASE_URL}/markdown/exercises/${bodyPartSlug}/${equipmentSlug}.md`,
      },
    },
  };
}

/**
 * Generate metadata for the main exercises hub page
 */
export function generateExercisesHubMetadata(totalCount: number): Metadata {
  const title = `Exercise Library: ${totalCount}+ Exercises with Videos`;
  const description = `Browse our complete exercise database with ${totalCount}+ exercises. Filter by body part, equipment, muscle group, or difficulty. Video demonstrations and detailed form guides for every exercise.`;

  return {
    title,
    description,
    keywords: [
      "exercise library",
      "exercise database",
      "workout exercises",
      "exercise guide",
      "fitness exercises",
      "gym exercises",
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/exercises`,
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}/exercises`,
      types: {
        "text/markdown": `${BASE_URL}/markdown/exercises.md`,
      },
    },
  };
}
