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
  "Advanced",
  getExercisesByDifficulty("Advanced").length
);

export default function AdvancedExercisesPage() {
  const exercises = getExercisesByDifficulty("Advanced");

  const listSchema = generateExerciseListSchema(
    "Advanced Exercises",
    exercises,
    "https://forgetrainer.ai/exercises/advanced"
  );
  const breadcrumbSchema = generateHubBreadcrumbs(
    "difficulty",
    "Advanced",
    "advanced"
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
              <li className="text-text-secondary">Advanced</li>
            </ol>
          </nav>

          <div className="inline-block px-3 py-1 mb-4 text-sm font-barlow-condensed font-semibold uppercase tracking-wide bg-error/20 text-error rounded">
            Advanced Level
          </div>

          <h1 className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            Advanced Exercises
          </h1>
          <p className="font-barlow text-xl text-text-secondary max-w-2xl">
            Challenge yourself with these {exercises.length} advanced exercises.
            Master these movements to build elite-level strength and athleticism.
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
            <Link
              href="/exercises/intermediate"
              className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-border bg-surface-2 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <span>Intermediate</span>
            </Link>
            <span
              className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-destructive/40 bg-destructive/20 text-error"
            >
              <span>Advanced</span>
            </span>
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
            Push Your Limits
          </h2>
          <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
            Our AI trainers can help you program these advanced movements
            safely and effectively. Get a plan that matches your ambition.
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
