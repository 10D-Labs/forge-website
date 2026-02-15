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
  "Beginner",
  getExercisesByDifficulty("Beginner").length
);

export default function BeginnerExercisesPage() {
  const exercises = getExercisesByDifficulty("Beginner");

  const listSchema = generateExerciseListSchema(
    "Beginner Exercises",
    exercises,
    "https://forgetrainer.ai/exercises/beginner"
  );
  const breadcrumbSchema = generateHubBreadcrumbs(
    "difficulty",
    "Beginner",
    "beginner"
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
              <li className="text-text-secondary">Beginner</li>
            </ol>
          </nav>

          <div className="inline-block px-3 py-1 mb-4 text-sm font-barlow-condensed font-semibold uppercase tracking-wide bg-success/20 text-success rounded">
            Beginner Friendly
          </div>

          <h1 className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            Beginner Exercises
          </h1>
          <p className="font-barlow text-xl text-text-secondary max-w-2xl">
            Start your fitness journey with these {exercises.length}{" "}
            beginner-friendly exercises. Perfect for building a foundation and
            learning proper form.
          </p>
        </div>
      </section>

      {/* Difficulty Navigation */}
      <section className="py-4 bg-surface-1 border-y border-border-subtle sticky top-16 z-20">
        <div className="container">
          <div className="flex gap-2">
            <span
              className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-success/40 bg-success/20 text-success"
            >
              <span>Beginner</span>
            </span>
            <Link
              href="/exercises/intermediate"
              className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-border bg-surface-2 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <span>Intermediate</span>
            </Link>
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
            New to Fitness? We've Got You.
          </h2>
          <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
            Our AI trainers specialize in helping beginners build strength
            safely. Get a personalized plan that grows with you.
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
