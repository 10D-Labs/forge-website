import exercisesData from "@/data/exercises.json";
import type {
  Exercise,
  BodyPart,
  Equipment,
  TargetMuscle,
  Difficulty,
  ExerciseFilters,
  BodyPartHub,
  EquipmentHub,
  MuscleHub,
  ExerciseCombination,
} from "@/types/exercise";
import {
  BODY_PART_SLUGS,
  EQUIPMENT_SLUGS,
  TARGET_SLUGS,
  SLUG_TO_BODY_PART,
  SLUG_TO_EQUIPMENT,
  SLUG_TO_TARGET,
} from "@/types/exercise";

// Re-export slug mappings for convenience
export {
  BODY_PART_SLUGS,
  EQUIPMENT_SLUGS,
  TARGET_SLUGS,
  SLUG_TO_BODY_PART,
  SLUG_TO_EQUIPMENT,
  SLUG_TO_TARGET,
  DIFFICULTY_SLUGS,
  SLUG_TO_DIFFICULTY,
} from "@/types/exercise";

// Cache for exercises data
let cachedExercises: Exercise[] | null = null;

/**
 * Get all exercises from the database
 */
export function getAllExercises(): Exercise[] {
  if (!cachedExercises) {
    cachedExercises = exercisesData as Exercise[];
  }
  return cachedExercises;
}

/**
 * Generate a URL-friendly slug from an exercise name
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Sort exercises by popularity (descending) then alphabetically by name
 */
function sortByPopularity(exercises: Exercise[]): Exercise[] {
  return [...exercises].sort((a, b) => {
    // Higher popularity first
    if (b.popularity !== a.popularity) {
      return b.popularity - a.popularity;
    }
    // Then alphabetically
    return a.name.localeCompare(b.name);
  });
}

/**
 * Get a single exercise by its URL slug
 */
export function getExerciseBySlug(slug: string): Exercise | undefined {
  return getAllExercises().find((e) => slugify(e.name) === slug);
}

/**
 * Get a single exercise by its ID
 */
export function getExerciseById(id: string): Exercise | undefined {
  return getAllExercises().find((e) => e.id === id);
}

/**
 * Get all exercises for a specific body part (sorted by popularity)
 */
export function getExercisesByBodyPart(bodyPart: BodyPart): Exercise[] {
  const filtered = getAllExercises().filter((e) => e.bodyPart === bodyPart);
  return sortByPopularity(filtered);
}

/**
 * Get all exercises using specific equipment (sorted by popularity)
 */
export function getExercisesByEquipment(equipment: Equipment): Exercise[] {
  const filtered = getAllExercises().filter((e) => e.equipment === equipment);
  return sortByPopularity(filtered);
}

/**
 * Get all exercises targeting a specific muscle (sorted by popularity)
 */
export function getExercisesByTarget(target: TargetMuscle): Exercise[] {
  const filtered = getAllExercises().filter((e) => e.target === target);
  return sortByPopularity(filtered);
}

/**
 * Get all exercises at a specific difficulty level (sorted by popularity)
 */
export function getExercisesByDifficulty(difficulty: Difficulty): Exercise[] {
  const filtered = getAllExercises().filter((e) => e.difficulty === difficulty);
  return sortByPopularity(filtered);
}

/**
 * Get exercises matching multiple filter criteria (sorted by popularity)
 */
export function getExercisesByFilters(filters: ExerciseFilters): Exercise[] {
  const filtered = getAllExercises().filter((e) => {
    if (filters.bodyPart && e.bodyPart !== filters.bodyPart) return false;
    if (filters.equipment && e.equipment !== filters.equipment) return false;
    if (filters.target && e.target !== filters.target) return false;
    if (filters.difficulty && e.difficulty !== filters.difficulty) return false;
    if (filters.category && e.category !== filters.category) return false;
    return true;
  });
  return sortByPopularity(filtered);
}

/**
 * Get related exercises (same target muscle, different exercise)
 * Prioritizes popular exercises as recommendations
 */
export function getRelatedExercises(
  exercise: Exercise,
  limit: number = 6
): Exercise[] {
  const allExercises = getAllExercises();

  // Score exercises by relevance
  const scored = allExercises
    .filter((e) => e.id !== exercise.id)
    .map((e) => {
      let score = 0;

      // Same target muscle = highest priority
      if (e.target === exercise.target) score += 10;

      // Same body part
      if (e.bodyPart === exercise.bodyPart) score += 5;

      // Same equipment (variation of same movement)
      if (e.equipment === exercise.equipment) score += 3;

      // Same difficulty (good for progression suggestions)
      if (e.difficulty === exercise.difficulty) score += 2;

      // Secondary muscle overlap
      const secondaryOverlap = e.secondaryMuscles.filter((m) =>
        exercise.secondaryMuscles.includes(m)
      ).length;
      score += secondaryOverlap;

      // Boost popular exercises (popularity 1-5, so add 0-4 points)
      score += (e.popularity - 1);

      return { exercise: e, score };
    });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.exercise);
}

/**
 * Get easier alternatives for an exercise (same target, lower difficulty)
 */
export function getEasierAlternatives(
  exercise: Exercise,
  limit: number = 3
): Exercise[] {
  const difficultyOrder = { Beginner: 0, Intermediate: 1, Advanced: 2 };
  const currentLevel = difficultyOrder[exercise.difficulty];

  return getAllExercises()
    .filter(
      (e) =>
        e.id !== exercise.id &&
        e.target === exercise.target &&
        difficultyOrder[e.difficulty] < currentLevel
    )
    .slice(0, limit);
}

/**
 * Get harder progressions for an exercise (same target, higher difficulty)
 */
export function getHarderProgressions(
  exercise: Exercise,
  limit: number = 3
): Exercise[] {
  const difficultyOrder = { Beginner: 0, Intermediate: 1, Advanced: 2 };
  const currentLevel = difficultyOrder[exercise.difficulty];

  return getAllExercises()
    .filter(
      (e) =>
        e.id !== exercise.id &&
        e.target === exercise.target &&
        difficultyOrder[e.difficulty] > currentLevel
    )
    .slice(0, limit);
}

/**
 * Get unique body parts from all exercises
 */
export function getUniqueBodyParts(): BodyPart[] {
  const bodyParts = new Set<BodyPart>();
  getAllExercises().forEach((e) => bodyParts.add(e.bodyPart));
  return Array.from(bodyParts).sort();
}

/**
 * Get unique equipment types from all exercises
 */
export function getUniqueEquipment(): Equipment[] {
  const equipment = new Set<Equipment>();
  getAllExercises().forEach((e) => equipment.add(e.equipment));
  return Array.from(equipment).sort();
}

/**
 * Get unique target muscles from all exercises
 */
export function getUniqueTargets(): TargetMuscle[] {
  const targets = new Set<TargetMuscle>();
  getAllExercises().forEach((e) => targets.add(e.target));
  return Array.from(targets).sort();
}

/**
 * Get body part hub data with aggregations
 */
export function getBodyPartHubs(): BodyPartHub[] {
  const exercises = getAllExercises();
  const bodyParts = getUniqueBodyParts();

  return bodyParts.map((bodyPart) => {
    const filtered = exercises.filter((e) => e.bodyPart === bodyPart);
    const targets = new Set<TargetMuscle>();
    const equipment = new Set<Equipment>();
    const difficulties = new Set<Difficulty>();

    filtered.forEach((e) => {
      targets.add(e.target);
      equipment.add(e.equipment);
      difficulties.add(e.difficulty);
    });

    return {
      bodyPart,
      slug: slugify(bodyPart),
      exerciseCount: filtered.length,
      targetMuscles: Array.from(targets).sort(),
      equipmentTypes: Array.from(equipment).sort(),
      difficulties: Array.from(difficulties),
    };
  });
}

/**
 * Get equipment hub data with aggregations
 */
export function getEquipmentHubs(): EquipmentHub[] {
  const exercises = getAllExercises();
  const equipmentTypes = getUniqueEquipment();

  return equipmentTypes.map((equipment) => {
    const filtered = exercises.filter((e) => e.equipment === equipment);
    const bodyParts = new Set<BodyPart>();
    const targets = new Set<TargetMuscle>();

    filtered.forEach((e) => {
      bodyParts.add(e.bodyPart);
      targets.add(e.target);
    });

    return {
      equipment,
      slug: EQUIPMENT_SLUGS[equipment],
      exerciseCount: filtered.length,
      bodyParts: Array.from(bodyParts).sort(),
      targetMuscles: Array.from(targets).sort(),
    };
  });
}

/**
 * Get muscle hub data with aggregations
 */
export function getMuscleHubs(): MuscleHub[] {
  const exercises = getAllExercises();
  const targets = getUniqueTargets();

  return targets.map((muscle) => {
    const filtered = exercises.filter((e) => e.target === muscle);
    const bodyParts = new Set<BodyPart>();
    const equipment = new Set<Equipment>();

    filtered.forEach((e) => {
      bodyParts.add(e.bodyPart);
      equipment.add(e.equipment);
    });

    return {
      muscle,
      slug: slugify(muscle),
      exerciseCount: filtered.length,
      bodyParts: Array.from(bodyParts).sort(),
      equipmentTypes: Array.from(equipment).sort(),
    };
  });
}

/**
 * Get the GIF URL for an exercise
 */
export function getExerciseGifUrl(exercise: Exercise): string {
  return `/exercises/gifs/${exercise.id}.gif`;
}

/**
 * Search exercises by name (case-insensitive partial match)
 * Results sorted by popularity (most common first)
 */
export function searchExercises(query: string, limit: number = 20): Exercise[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  const matches = getAllExercises().filter((e) =>
    e.name.toLowerCase().includes(normalizedQuery)
  );

  return sortByPopularity(matches).slice(0, limit);
}

/**
 * Get exercise counts by body part
 */
export function getExerciseCountsByBodyPart(): Record<BodyPart, number> {
  const counts: Partial<Record<BodyPart, number>> = {};
  getAllExercises().forEach((e) => {
    counts[e.bodyPart] = (counts[e.bodyPart] || 0) + 1;
  });
  return counts as Record<BodyPart, number>;
}

/**
 * Get exercise counts by equipment
 */
export function getExerciseCountsByEquipment(): Record<Equipment, number> {
  const counts: Partial<Record<Equipment, number>> = {};
  getAllExercises().forEach((e) => {
    counts[e.equipment] = (counts[e.equipment] || 0) + 1;
  });
  return counts as Record<Equipment, number>;
}

/**
 * Get exercise counts by target muscle
 */
export function getExerciseCountsByTarget(): Record<TargetMuscle, number> {
  const counts: Partial<Record<TargetMuscle, number>> = {};
  getAllExercises().forEach((e) => {
    counts[e.target] = (counts[e.target] || 0) + 1;
  });
  return counts as Record<TargetMuscle, number>;
}
