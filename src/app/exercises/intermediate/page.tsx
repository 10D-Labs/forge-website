import type { Metadata } from "next";
import Link from "next/link";
import { getExercisesByDifficulty } from "@/lib/exercises";
import { generateDifficultyMetadata } from "@/lib/seo/metadata-factory";
import {
  generateExerciseListSchema,
  generateHubBreadcrumbs,
  SchemaScript,
} from "@/lib/seo/schema-generators";
import { ExerciseGrid } from "@/components/exercises";

export const metadata: Metadata = generateDifficultyMetadata(
  "Intermediate",
  getExercisesByDifficulty("Intermediate").length
);

export default function IntermediateExercisesPage() {
  const exercises = getExercisesByDifficulty("Intermediate");

  const listSchema = generateExerciseListSchema(
    "Intermediate Exercises",
    exercises,
    "https://forgetrainer.ai/exercises/intermediate"
  );
  const breadcrumbSchema = generateHubBreadcrumbs(
    "difficulty",
    "Intermediate",
    "intermediate"
  );

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
              <li className="text-text-secondary">Intermediate</li>
            </ol>
          </nav>

          <div className="inline-block px-3 py-1 mb-4 text-sm font-barlow-condensed font-semibold uppercase tracking-wide bg-primary/20 text-primary rounded">
            Intermediate Level
          </div>

          <h1 className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            Intermediate Exercises
          </h1>
          <p className="font-barlow text-xl text-text-secondary max-w-2xl">
            Ready to level up? These {exercises.length} intermediate exercises
            will help you build serious strength and take your training to the
            next level.
          </p>
        </div>
      </section>

      {/* Difficulty Navigation */}
      <section className="py-4 bg-surface-1 border-y border-border-subtle sticky top-16 z-20">
        <div className="container">
          <div className="flex gap-2">
            <Link
              href="/exercises/beginner"
              className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-border bg-surface-2 hover:text-success hover:bg-success/10 transition-colors"
            >
              <span>Beginner</span>
            </Link>
            <span
              className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-primary/40 bg-primary/20 text-primary"
            >
              <span>Intermediate</span>
            </span>
            <Link
              href="/exercises/advanced"
              className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-border bg-surface-2 hover:text-error hover:bg-destructive/10 transition-colors"
            >
              <span>Advanced</span>
            </Link>
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
            Ready to Progress?
          </h2>
          <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
            Our AI trainers will help you break through plateaus and build the
            strength you're after. Get a program designed for your goals.
          </p>
          <Link
            href="/?scrollTo=waitlist"
            className="inline-flex items-center justify-center px-8 py-3 font-barlow-condensed font-bold uppercase tracking-wide text-primary-foreground rounded-[14px] bg-primary border border-primary hover:bg-forge-orange-dark transition-colors"
          >
            <span>Join the Waitlist</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
