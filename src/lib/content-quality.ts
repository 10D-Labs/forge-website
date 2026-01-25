import { getAllExercises, slugify } from "@/lib/exercises";
import type {
  Exercise,
  BodyPart,
  Equipment,
  TargetMuscle,
  ExerciseCombination,
} from "@/types/exercise";
import { BODY_PART_SLUGS, EQUIPMENT_SLUGS } from "@/types/exercise";

/**
 * Minimum thresholds for page creation
 * Pages with fewer exercises than these thresholds should not be created
 * to avoid thin content
 */
export const MINIMUM_EXERCISES_FOR_COMBO_PAGE = 5;
export const MINIMUM_EXERCISES_FOR_MUSCLE_PAGE = 5;
export const MINIMUM_EXERCISES_FOR_HUB_PAGE = 3;

/**
 * Check if a combo page should be created based on exercise count
 */
export function shouldCreateComboPage(
  bodyPart: BodyPart,
  equipment: Equipment
): boolean {
  const exercises = getAllExercises();
  const count = exercises.filter(
    (e) => e.bodyPart === bodyPart && e.equipment === equipment
  ).length;
  return count >= MINIMUM_EXERCISES_FOR_COMBO_PAGE;
}

/**
 * Check if a muscle hub page should be created based on exercise count
 */
export function shouldCreateMuscleHubPage(muscle: TargetMuscle): boolean {
  const exercises = getAllExercises();
  const count = exercises.filter((e) => e.target === muscle).length;
  return count >= MINIMUM_EXERCISES_FOR_MUSCLE_PAGE;
}

/**
 * Get all valid body part + equipment combinations that meet minimum thresholds
 * Used by generateStaticParams for combo pages
 */
export function getValidCombinations(): ExerciseCombination[] {
  const exercises = getAllExercises();
  const comboCounts = new Map<string, number>();

  // Count exercises for each combination
  exercises.forEach((e) => {
    const key = `${e.bodyPart}|${e.equipment}`;
    comboCounts.set(key, (comboCounts.get(key) || 0) + 1);
  });

  // Filter to only combinations meeting minimum threshold
  const validCombos: ExerciseCombination[] = [];

  comboCounts.forEach((count, key) => {
    if (count >= MINIMUM_EXERCISES_FOR_COMBO_PAGE) {
      const [bodyPart, equipment] = key.split("|") as [BodyPart, Equipment];
      validCombos.push({
        bodyPart,
        equipment,
        slug: `${BODY_PART_SLUGS[bodyPart]}/${EQUIPMENT_SLUGS[equipment]}`,
        exerciseCount: count,
      });
    }
  });

  return validCombos.sort((a, b) => b.exerciseCount - a.exerciseCount);
}

/**
 * Get all valid muscle hub pages that meet minimum thresholds
 */
export function getValidMuscleHubs(): Array<{
  muscle: TargetMuscle;
  slug: string;
  exerciseCount: number;
}> {
  const exercises = getAllExercises();
  const muscleCounts = new Map<TargetMuscle, number>();

  exercises.forEach((e) => {
    muscleCounts.set(e.target, (muscleCounts.get(e.target) || 0) + 1);
  });

  const validMuscles: Array<{
    muscle: TargetMuscle;
    slug: string;
    exerciseCount: number;
  }> = [];

  muscleCounts.forEach((count, muscle) => {
    if (count >= MINIMUM_EXERCISES_FOR_MUSCLE_PAGE) {
      validMuscles.push({
        muscle,
        slug: slugify(muscle),
        exerciseCount: count,
      });
    }
  });

  return validMuscles.sort((a, b) => b.exerciseCount - a.exerciseCount);
}

/**
 * Calculate a content uniqueness score for an exercise page
 * Higher score = more unique content = better SEO
 */
export function calculateExerciseContentScore(exercise: Exercise): number {
  let score = 0;

  // Base points for having core content
  if (exercise.description && exercise.description.length > 50) score += 20;
  if (exercise.instructions.length >= 3) score += 30;
  if (exercise.secondaryMuscles.length > 0) score += 15;

  // Bonus for instruction detail
  const avgInstructionLength =
    exercise.instructions.reduce((sum, i) => sum + i.split(" ").length, 0) /
    exercise.instructions.length;
  if (avgInstructionLength > 15) score += 20;

  // Description quality
  if (exercise.description && exercise.description.length > 100) score += 15;

  return Math.min(score, 100);
}

/**
 * Get exercises with low content scores that might need improvement
 */
export function getExercisesNeedingContentImprovement(): Exercise[] {
  return getAllExercises()
    .filter((e) => calculateExerciseContentScore(e) < 50)
    .sort(
      (a, b) =>
        calculateExerciseContentScore(a) - calculateExerciseContentScore(b)
    );
}

/**
 * Get summary statistics about content quality
 */
export function getContentQualityStats(): {
  totalExercises: number;
  validCombos: number;
  validMuscleHubs: number;
  lowContentExercises: number;
  averageContentScore: number;
} {
  const exercises = getAllExercises();
  const validCombos = getValidCombinations();
  const validMuscleHubs = getValidMuscleHubs();
  const lowContentExercises = getExercisesNeedingContentImprovement();

  const totalScore = exercises.reduce(
    (sum, e) => sum + calculateExerciseContentScore(e),
    0
  );

  return {
    totalExercises: exercises.length,
    validCombos: validCombos.length,
    validMuscleHubs: validMuscleHubs.length,
    lowContentExercises: lowContentExercises.length,
    averageContentScore: Math.round(totalScore / exercises.length),
  };
}
