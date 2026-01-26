import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getExercisesByBodyPart,
  getBodyPartHubs,
  getUniqueEquipment,
  slugify,
} from "@/lib/exercises";
import { generateBodyPartHubMetadata } from "@/lib/seo/metadata-factory";
import {
  generateExerciseListSchema,
  generateHubBreadcrumbs,
  generateFAQSchema,
  generateBodyPartFAQs,
  SchemaScript,
} from "@/lib/seo/schema-generators";
import { ExerciseGrid } from "@/components/exercises";
import type { BodyPart } from "@/types/exercise";
import { SLUG_TO_BODY_PART, BODY_PART_SLUGS, EQUIPMENT_SLUGS } from "@/types/exercise";

interface BodyPartPageProps {
  params: Promise<{ bodyPart: string }>;
}

const VALID_BODY_PARTS = Object.values(BODY_PART_SLUGS);

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

export async function generateStaticParams() {
  return VALID_BODY_PARTS.map((bodyPart) => ({ bodyPart }));
}

export async function generateMetadata({
  params,
}: BodyPartPageProps): Promise<Metadata> {
  const { bodyPart: bodyPartSlug } = await params;

  if (!VALID_BODY_PARTS.includes(bodyPartSlug)) {
    return { title: "Not Found" };
  }

  const bodyPart = SLUG_TO_BODY_PART[bodyPartSlug];
  const exercises = getExercisesByBodyPart(bodyPart);

  return generateBodyPartHubMetadata(bodyPart, exercises.length);
}

export default async function BodyPartPage({ params }: BodyPartPageProps) {
  const { bodyPart: bodyPartSlug } = await params;

  if (!VALID_BODY_PARTS.includes(bodyPartSlug)) {
    notFound();
  }

  const bodyPart = SLUG_TO_BODY_PART[bodyPartSlug] as BodyPart;
  const exercises = getExercisesByBodyPart(bodyPart);

  // Get equipment types available for this body part (only those with 5+ exercises for valid combo pages)
  const equipmentTypes = [...new Set(exercises.map((e) => e.equipment))].sort();
  const equipmentCounts = equipmentTypes
    .map((eq) => ({
      equipment: eq,
      count: exercises.filter((e) => e.equipment === eq).length,
    }))
    .filter((ec) => ec.count >= 5);

  const listSchema = generateExerciseListSchema(
    `${bodyPart} Exercises`,
    exercises,
    `https://forgetrainer.ai/exercises/${bodyPartSlug}`
  );
  const breadcrumbSchema = generateHubBreadcrumbs(
    "bodyPart",
    bodyPart,
    bodyPartSlug
  );

  // Generate FAQ schema for SEO
  const topExercises = exercises.slice(0, 5).map((e) => e.name);
  const faqs = generateBodyPartFAQs(bodyPart, exercises.length, topExercises);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="min-h-screen bg-background">
      <SchemaScript schema={listSchema} />
      <SchemaScript schema={breadcrumbSchema} />
      <SchemaScript schema={faqSchema} />

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
              <li className="text-text-secondary">{bodyPart}</li>
            </ol>
          </nav>

          <h1 className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            {BODY_PART_HEADLINE[bodyPart]} Exercises
          </h1>
          <p className="font-barlow text-xl text-text-secondary max-w-2xl">
            Browse {exercises.length} exercises targeting your {bodyPart.toLowerCase()}.
            {equipmentCounts.length > 1 && " Filter by equipment type below."}
          </p>
        </div>
      </section>

      {/* Equipment Filter Navigation - only show if there are valid combinations */}
      {equipmentCounts.length > 1 && (
        <section className="py-4 bg-surface-1 border-y border-border-subtle sticky top-16 z-20">
          <div className="container">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 text-sm font-barlow text-text-tertiary">
                Filter by equipment:
              </span>
              {equipmentCounts.map(({ equipment, count }) => (
                <Link
                  key={equipment}
                  href={`/exercises/${bodyPartSlug}/${EQUIPMENT_SLUGS[equipment]}`}
                  className="px-3 py-1.5 text-sm font-barlow-condensed uppercase tracking-wide angular-border hover:text-primary hover:[--angular-bg:hsl(var(--primary)/0.1)] transition-colors"
                >
                  <span>{equipment} ({count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Exercise Grid */}
      <section className={`pb-12 md:pb-16 bg-surface-0 ${equipmentCounts.length > 1 ? "pt-12 md:pt-16" : "pt-6 md:pt-8"}`}>
        <div className="container">
          <ExerciseGrid exercises={exercises} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-surface-1 border-t border-border-subtle">
        <div className="container text-center">
          <h2 className="font-barlow-condensed text-2xl font-bold uppercase mb-4">
            Build Your {bodyPart} with Forge
          </h2>
          <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
            Get a personalized {BODY_PART_SINGULAR[bodyPart]} workout plan from our AI
            trainers, tailored to your goals and available equipment.
          </p>
          <Link
            href="/?scrollTo=waitlist"
            className="inline-flex items-center justify-center px-8 py-3 font-barlow-condensed font-bold uppercase tracking-wide text-primary-foreground angular-border hover:[--angular-bg:hsl(var(--forge-orange-dark))] transition-colors"
            style={{ "--angular-bg": "hsl(var(--primary))", "--angular-border-color": "hsl(var(--primary))" } as React.CSSProperties}
          >
            <span>Join the Waitlist</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
