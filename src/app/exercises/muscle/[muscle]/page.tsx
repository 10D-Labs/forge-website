import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getExercisesByTarget, slugify } from "@/lib/exercises";
import { getValidMuscleHubs } from "@/lib/content-quality";
import { generateMuscleHubMetadata } from "@/lib/seo/metadata-factory";
import {
  generateExerciseListSchema,
  generateHubBreadcrumbs,
  generateFAQSchema,
  generateMuscleFAQs,
  SchemaScript,
} from "@/lib/seo/schema-generators";
import { ExerciseGrid } from "@/components/exercises";
import type { TargetMuscle } from "@/types/exercise";
import { SLUG_TO_TARGET, TARGET_SLUGS, EQUIPMENT_SLUGS } from "@/types/exercise";

interface MusclePageProps {
  params: Promise<{ muscle: string }>;
}

export async function generateStaticParams() {
  // Only generate pages for muscles with enough exercises
  const validMuscles = getValidMuscleHubs();
  return validMuscles.map((hub) => ({ muscle: hub.slug }));
}

export async function generateMetadata({
  params,
}: MusclePageProps): Promise<Metadata> {
  const { muscle: muscleSlug } = await params;
  const muscle = SLUG_TO_TARGET[muscleSlug];

  if (!muscle) {
    return { title: "Not Found" };
  }

  const exercises = getExercisesByTarget(muscle);

  return generateMuscleHubMetadata(muscle, exercises.length);
}

export default async function MusclePage({ params }: MusclePageProps) {
  const { muscle: muscleSlug } = await params;
  const muscle = SLUG_TO_TARGET[muscleSlug] as TargetMuscle;

  if (!muscle) {
    notFound();
  }

  const exercises = getExercisesByTarget(muscle);

  // Check minimum threshold
  if (exercises.length < 5) {
    notFound();
  }

  // Get equipment types available for this muscle
  const equipmentTypes = [...new Set(exercises.map((e) => e.equipment))].sort();

  const listSchema = generateExerciseListSchema(
    `${muscle} Exercises`,
    exercises,
    `https://forgetrainer.ai/exercises/muscle/${muscleSlug}`
  );
  const breadcrumbSchema = generateHubBreadcrumbs("muscle", muscle, muscleSlug);

  // Generate FAQ schema for SEO
  const topExercises = exercises.slice(0, 5).map((e) => e.name);
  const faqs = generateMuscleFAQs(muscle, exercises.length, topExercises);
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
              <li className="text-text-secondary">{muscle}</li>
            </ol>
          </nav>

          <h1 className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            {muscle} Exercises
          </h1>
          <p className="font-barlow text-xl text-text-secondary max-w-2xl">
            Build stronger {muscle.toLowerCase()} with these {exercises.length}{" "}
            targeted exercises. Complete instructions and form tips included.
          </p>
        </div>
      </section>

      {/* Equipment Filter */}
      <section className="py-4 bg-surface-1 border-y border-border-subtle sticky top-16 z-20">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 text-sm font-barlow text-text-tertiary">
              Available equipment:
            </span>
            {equipmentTypes.map((equipment) => (
              <Link
                key={equipment}
                href={`/exercises/equipment/${EQUIPMENT_SLUGS[equipment]}`}
                className="px-3 py-1.5 text-sm font-barlow-condensed uppercase tracking-wide angular-border bg-surface-2 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {equipment}
              </Link>
            ))}
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
            Build Your {muscle} with Forge
          </h2>
          <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
            Get a complete workout plan targeting your {muscle.toLowerCase()},
            designed by our AI trainers for your specific goals.
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
