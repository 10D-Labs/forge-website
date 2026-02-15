import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getExercisesByFilters, slugify } from "@/lib/exercises";
import { getValidCombinations } from "@/lib/content-quality";
import { generateComboMetadata } from "@/lib/seo/metadata-factory";
import {
  generateExerciseListSchema,
  generateComboBreadcrumbs,
  SchemaScript,
} from "@/lib/seo/schema-generators";
import { ExerciseGrid } from "@/components/exercises";
import type { BodyPart, Equipment } from "@/types/exercise";
import {
  SLUG_TO_BODY_PART,
  SLUG_TO_EQUIPMENT,
  BODY_PART_SLUGS,
  EQUIPMENT_SLUGS,
} from "@/types/exercise";

// Singular forms of body parts for description text (lowercase)
const BODY_PART_SINGULAR: Record<BodyPart, string> = {
  Arms: "arm",
  Back: "back",
  Cardio: "cardio",
  Chest: "chest",
  Core: "core",
  Legs: "leg",
  Neck: "neck",
  Shoulders: "shoulder",
};

// Singular forms for page headlines (Title Case)
const BODY_PART_HEADLINE: Record<BodyPart, string> = {
  Arms: "Arm",
  Back: "Back",
  Cardio: "Cardio",
  Chest: "Chest",
  Core: "Core",
  Legs: "Leg",
  Neck: "Neck",
  Shoulders: "Shoulder",
};

// Equipment names for CTA headlines (pluralized where appropriate)
const EQUIPMENT_CTA_TEXT: Record<Equipment, string> = {
  "Ab Wheel": "an Ab Wheel",
  Barbell: "Barbells",
  "Body Weight": "Bodyweight",
  Cable: "Cable Machines",
  "Cardio Machine": "Cardio Machines",
  Dumbbell: "Dumbbells",
  "EZ Bar": "an EZ Bar",
  "Jump Rope": "a Jump Rope",
  Kettlebell: "Kettlebells",
  Machine: "Machines",
  "Medicine Ball": "Medicine Balls",
  "Resistance Band": "Resistance Bands",
  Rings: "Rings",
  "Smith Machine": "a Smith Machine",
  "Trap Bar": "a Trap Bar",
  Treadmill: "a Treadmill",
  "Weight Plate": "Weight Plates",
};

// Equipment names for description text (lowercase, with article)
const EQUIPMENT_DESC_TEXT: Record<Equipment, string> = {
  "Ab Wheel": "an ab wheel",
  Barbell: "a barbell",
  "Body Weight": "just your bodyweight",
  Cable: "cable machines",
  "Cardio Machine": "cardio machines",
  Dumbbell: "dumbbells",
  "EZ Bar": "an EZ bar",
  "Jump Rope": "a jump rope",
  Kettlebell: "kettlebells",
  Machine: "gym machines",
  "Medicine Ball": "a medicine ball",
  "Resistance Band": "resistance bands",
  Rings: "gymnastic rings",
  "Smith Machine": "a Smith machine",
  "Trap Bar": "a trap bar",
  Treadmill: "a treadmill",
  "Weight Plate": "weight plates",
};

// Equipment names for page headlines (Title Case, with articles where needed)
const EQUIPMENT_HEADLINE_TEXT: Record<Equipment, string> = {
  "Ab Wheel": "an Ab Wheel",
  Barbell: "a Barbell",
  "Body Weight": "Bodyweight",
  Cable: "a Cable Machine",
  "Cardio Machine": "a Cardio Machine",
  Dumbbell: "Dumbbells",
  "EZ Bar": "an EZ Bar",
  "Jump Rope": "a Jump Rope",
  Kettlebell: "Kettlebells",
  Machine: "Machines",
  "Medicine Ball": "a Medicine Ball",
  "Resistance Band": "Resistance Bands",
  Rings: "Rings",
  "Smith Machine": "a Smith Machine",
  "Trap Bar": "a Trap Bar",
  Treadmill: "a Treadmill",
  "Weight Plate": "Weight Plates",
};

interface ComboPageProps {
  params: Promise<{ bodyPart: string; equipment: string }>;
}

export async function generateStaticParams() {
  // Only generate pages for valid combinations with 5+ exercises
  const validCombos = getValidCombinations();
  return validCombos.map((combo) => ({
    bodyPart: BODY_PART_SLUGS[combo.bodyPart],
    equipment: EQUIPMENT_SLUGS[combo.equipment],
  }));
}

export async function generateMetadata({
  params,
}: ComboPageProps): Promise<Metadata> {
  const { bodyPart: bodyPartSlug, equipment: equipmentSlug } = await params;

  const bodyPart = SLUG_TO_BODY_PART[bodyPartSlug];
  const equipment = SLUG_TO_EQUIPMENT[equipmentSlug];

  if (!bodyPart || !equipment) {
    return { title: "Not Found" };
  }

  const exercises = getExercisesByFilters({ bodyPart, equipment });
  const metadata = generateComboMetadata(bodyPart, equipment, exercises.length);

  if (!metadata) {
    return {
      title: "Not Found",
      robots: { index: false, follow: true },
    };
  }

  return metadata;
}

export default async function ComboPage({ params }: ComboPageProps) {
  const { bodyPart: bodyPartSlug, equipment: equipmentSlug } = await params;

  const bodyPart = SLUG_TO_BODY_PART[bodyPartSlug] as BodyPart;
  const equipment = SLUG_TO_EQUIPMENT[equipmentSlug] as Equipment;

  if (!bodyPart || !equipment) {
    notFound();
  }

  const exercises = getExercisesByFilters({ bodyPart, equipment });

  // Must have at least 5 exercises for this page to exist
  if (exercises.length < 5) {
    notFound();
  }

  // Get difficulty breakdown
  const difficultyBreakdown = {
    beginner: exercises.filter((e) => e.difficulty === "Beginner").length,
    intermediate: exercises.filter((e) => e.difficulty === "Intermediate")
      .length,
    advanced: exercises.filter((e) => e.difficulty === "Advanced").length,
  };

  const listSchema = generateExerciseListSchema(
    `${bodyPart} ${equipment} Exercises`,
    exercises,
    `https://forgetrainer.ai/exercises/${bodyPartSlug}/${equipmentSlug}`
  );
  const breadcrumbSchema = generateComboBreadcrumbs(bodyPart, equipment);

  return (
    <div className="min-h-screen bg-background">
      <SchemaScript schema={listSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-surface-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="container relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm font-barlow">
              <li>
                <Link
                  href="/"
                  className="text-text-tertiary hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-text-quaternary">/</li>
              <li>
                <Link
                  href="/exercises"
                  className="text-text-tertiary hover:text-primary transition-colors"
                >
                  Exercises
                </Link>
              </li>
              <li className="text-text-quaternary">/</li>
              <li>
                <Link
                  href={`/exercises/${bodyPartSlug}`}
                  className="text-text-tertiary hover:text-primary transition-colors"
                >
                  {bodyPart}
                </Link>
              </li>
              <li className="text-text-quaternary">/</li>
              <li className="text-text-secondary">{equipment}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap gap-2 mb-4">
            <Link
              href={`/exercises/${bodyPartSlug}`}
              className="px-3 py-1 text-xs font-barlow-condensed font-semibold text-primary uppercase tracking-wider rounded-[10px] border border-primary/30 bg-primary/10 hover:border-primary transition-colors"
            >
              {bodyPart}
            </Link>
            <Link
              href={`/exercises/equipment/${equipmentSlug}`}
              className="px-3 py-1 text-xs font-barlow-condensed font-semibold text-text-secondary uppercase tracking-wider rounded-[10px] border border-text-secondary/30 bg-text-secondary/10 hover:border-text-secondary transition-colors"
            >
              {equipment}
            </Link>
          </div>

          <h1 className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            {BODY_PART_HEADLINE[bodyPart]} Exercises with {EQUIPMENT_HEADLINE_TEXT[equipment]}
          </h1>
          <p className="font-barlow text-xl text-text-secondary max-w-2xl">
            {exercises.length} effective {BODY_PART_SINGULAR[bodyPart]} exercises you
            can do with{" "}
            {equipment === "Body Weight"
              ? "no equipment"
              : EQUIPMENT_DESC_TEXT[equipment]}
            . Complete instructions and form tips included.
          </p>
        </div>
      </section>

      {/* Difficulty Breakdown */}
      <section className="py-4 bg-surface-1 border-y border-border-subtle">
        <div className="container">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-barlow text-text-tertiary">
              Difficulty breakdown:
            </span>
            <div className="flex gap-3">
              {difficultyBreakdown.beginner > 0 && (
                <span className="flex items-center gap-1.5 text-sm font-barlow">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  {difficultyBreakdown.beginner} Beginner
                </span>
              )}
              {difficultyBreakdown.intermediate > 0 && (
                <span className="flex items-center gap-1.5 text-sm font-barlow">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {difficultyBreakdown.intermediate} Intermediate
                </span>
              )}
              {difficultyBreakdown.advanced > 0 && (
                <span className="flex items-center gap-1.5 text-sm font-barlow">
                  <span className="w-2 h-2 rounded-full bg-error" />
                  {difficultyBreakdown.advanced} Advanced
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Grid */}
      <section className="py-12 md:py-16 bg-surface-0">
        <div className="container">
          <ExerciseGrid exercises={exercises} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-surface-1 border-t border-border-subtle">
        <div className="container text-center">
          <h2 className="font-barlow-condensed text-2xl font-bold uppercase mb-4">
            Build Your {bodyPart} with {EQUIPMENT_CTA_TEXT[equipment]}
          </h2>
          <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
            Get a personalized {BODY_PART_SINGULAR[bodyPart]} workout plan using{" "}
            {EQUIPMENT_DESC_TEXT[equipment]}. Our AI trainers design programs for your specific goals.
          </p>
          <Link
            href="/#waitlist"
            className="inline-flex items-center justify-center px-8 py-3 font-barlow-condensed font-bold uppercase tracking-wide text-primary-foreground rounded-[14px] bg-primary border border-primary hover:bg-forge-orange-dark transition-colors"
          >
            <span>Join the Waitlist</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
