// Exercise database types for programmatic SEO pages

export type BodyPart =
  | "Arms"
  | "Back"
  | "Cardio"
  | "Chest"
  | "Core"
  | "Legs"
  | "Neck"
  | "Shoulders";

export type Equipment =
  | "Ab Wheel"
  | "Barbell"
  | "Body Weight"
  | "Cable"
  | "Cardio Machine"
  | "Dumbbell"
  | "EZ Bar"
  | "Kettlebell"
  | "Machine"
  | "Medicine Ball"
  | "Resistance Band"
  | "Rings"
  | "Smith Machine"
  | "Trap Bar";

export type TargetMuscle =
  | "Abductors"
  | "Abs"
  | "Adductors"
  | "Biceps"
  | "Calves"
  | "Cardiovascular"
  | "Chest"
  | "Forearms"
  | "Glutes"
  | "Hamstrings"
  | "Lats"
  | "Lower Back"
  | "Neck"
  | "Quads"
  | "Serratus"
  | "Shoulders"
  | "Traps"
  | "Triceps"
  | "Upper Back";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type ExerciseCategory =
  | "Balance"
  | "Cardio"
  | "Mobility"
  | "Plyometrics"
  | "Rehabilitation"
  | "Strength"
  | "Stretching";

export interface Exercise {
  id: string;
  name: string;
  bodyPart: BodyPart;
  equipment: Equipment;
  target: TargetMuscle;
  secondaryMuscles: string[];
  instructions: string[];
  description: string;
  difficulty: Difficulty;
  category: ExerciseCategory;
  popularity: 1 | 2 | 3 | 4 | 5; // 5 = foundational, 1 = rare
}

// URL-friendly slug versions of body parts
export const BODY_PART_SLUGS: Record<BodyPart, string> = {
  Arms: "arms",
  Back: "back",
  Cardio: "cardio",
  Chest: "chest",
  Core: "core",
  Legs: "legs",
  Neck: "neck",
  Shoulders: "shoulders",
};

// URL-friendly slug versions of equipment
export const EQUIPMENT_SLUGS: Record<Equipment, string> = {
  "Ab Wheel": "ab-wheel",
  Barbell: "barbell",
  "Body Weight": "bodyweight",
  Cable: "cable",
  "Cardio Machine": "cardio-machine",
  Dumbbell: "dumbbell",
  "EZ Bar": "ez-bar",
  Kettlebell: "kettlebell",
  Machine: "machine",
  "Medicine Ball": "medicine-ball",
  "Resistance Band": "resistance-band",
  Rings: "rings",
  "Smith Machine": "smith-machine",
  "Trap Bar": "trap-bar",
};

// URL-friendly slug versions of target muscles
export const TARGET_SLUGS: Record<TargetMuscle, string> = {
  Abductors: "abductors",
  Abs: "abs",
  Adductors: "adductors",
  Biceps: "biceps",
  Calves: "calves",
  Cardiovascular: "cardiovascular",
  Chest: "chest",
  Forearms: "forearms",
  Glutes: "glutes",
  Hamstrings: "hamstrings",
  Lats: "lats",
  "Lower Back": "lower-back",
  Neck: "neck",
  Quads: "quads",
  Serratus: "serratus",
  Shoulders: "shoulders",
  Traps: "traps",
  Triceps: "triceps",
  "Upper Back": "upper-back",
};

// Reverse lookups (slug to display name)
export const SLUG_TO_BODY_PART: Record<string, BodyPart> = Object.fromEntries(
  Object.entries(BODY_PART_SLUGS).map(([k, v]) => [v, k as BodyPart])
) as Record<string, BodyPart>;

export const SLUG_TO_EQUIPMENT: Record<string, Equipment> = Object.fromEntries(
  Object.entries(EQUIPMENT_SLUGS).map(([k, v]) => [v, k as Equipment])
) as Record<string, Equipment>;

export const SLUG_TO_TARGET: Record<string, TargetMuscle> = Object.fromEntries(
  Object.entries(TARGET_SLUGS).map(([k, v]) => [v, k as TargetMuscle])
) as Record<string, TargetMuscle>;

// Difficulty slugs (already URL-friendly, just lowercase)
export const DIFFICULTY_SLUGS: Record<Difficulty, string> = {
  Beginner: "beginner",
  Intermediate: "intermediate",
  Advanced: "advanced",
};

export const SLUG_TO_DIFFICULTY: Record<string, Difficulty> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

// Filter types for querying exercises
export interface ExerciseFilters {
  bodyPart?: BodyPart;
  equipment?: Equipment;
  target?: TargetMuscle;
  difficulty?: Difficulty;
  category?: ExerciseCategory;
}

// Aggregation types for hub pages
export interface BodyPartHub {
  bodyPart: BodyPart;
  slug: string;
  exerciseCount: number;
  targetMuscles: TargetMuscle[];
  equipmentTypes: Equipment[];
  difficulties: Difficulty[];
}

export interface EquipmentHub {
  equipment: Equipment;
  slug: string;
  exerciseCount: number;
  bodyParts: BodyPart[];
  targetMuscles: TargetMuscle[];
}

export interface MuscleHub {
  muscle: TargetMuscle;
  slug: string;
  exerciseCount: number;
  bodyParts: BodyPart[];
  equipmentTypes: Equipment[];
}

// Combination page type
export interface ExerciseCombination {
  bodyPart: BodyPart;
  equipment: Equipment;
  slug: string;
  exerciseCount: number;
}
