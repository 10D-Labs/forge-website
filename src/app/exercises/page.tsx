import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllExercises,
  getBodyPartHubs,
  getEquipmentHubs,
  slugify,
} from "@/lib/exercises";
import { generateExercisesHubMetadata } from "@/lib/seo/metadata-factory";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  SchemaScript,
} from "@/lib/seo/schema-generators";

export const metadata: Metadata = generateExercisesHubMetadata(
  getAllExercises().length
);

export default function ExercisesPage() {
  const totalExercises = getAllExercises().length;
  const bodyPartHubs = getBodyPartHubs();
  const equipmentHubs = getEquipmentHubs();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://forgetrainer.ai" },
    { name: "Exercises", url: "https://forgetrainer.ai/exercises" },
  ]);

  const collectionSchema = generateCollectionPageSchema(
    "Exercise Library",
    `Browse ${totalExercises}+ exercises with video demonstrations and detailed instructions`,
    "https://forgetrainer.ai/exercises",
    totalExercises
  );

  return (
    <div className="min-h-screen bg-background">
      <SchemaScript schema={breadcrumbSchema} />
      <SchemaScript schema={collectionSchema} />

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
              <li className="text-text-secondary">Exercises</li>
            </ol>
          </nav>

          <h1 className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            Exercise Library
          </h1>
          <p className="font-barlow text-xl text-text-secondary max-w-2xl">
            Browse {totalExercises.toLocaleString()}+ exercises with video
            demonstrations, step-by-step instructions, and form tips.
          </p>
        </div>
      </section>

      {/* Difficulty Quick Filters */}
      <section className="py-6 bg-surface-1 border-y border-border-subtle">
        <div className="container">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-barlow-condensed text-sm uppercase tracking-wide text-text-tertiary">
              Filter by Difficulty:
            </span>
            <div className="flex gap-2">
              <Link
                href="/exercises/beginner"
                className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide angular-border text-success hover:[--angular-bg:hsl(var(--success)/0.2)] transition-colors"
                style={{ "--angular-bg": "hsl(var(--success) / 0.1)", "--angular-border-color": "hsl(var(--success) / 0.3)" } as React.CSSProperties}
              >
                <span>Beginner</span>
              </Link>
              <Link
                href="/exercises/intermediate"
                className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide angular-border text-primary hover:[--angular-bg:hsl(var(--primary)/0.2)] transition-colors"
                style={{ "--angular-bg": "hsl(var(--primary) / 0.1)", "--angular-border-color": "hsl(var(--primary) / 0.3)" } as React.CSSProperties}
              >
                <span>Intermediate</span>
              </Link>
              <Link
                href="/exercises/advanced"
                className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide angular-border text-error hover:[--angular-bg:hsl(var(--destructive)/0.2)] transition-colors"
                style={{ "--angular-bg": "hsl(var(--destructive) / 0.1)", "--angular-border-color": "hsl(var(--destructive) / 0.3)" } as React.CSSProperties}
              >
                <span>Advanced</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body Parts Section */}
      <section className="py-12 md:py-16 bg-surface-0">
        <div className="container">
          <h2 className="font-barlow-condensed text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8">
            Browse by Body Part
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bodyPartHubs.map((hub) => (
              <Link
                key={hub.bodyPart}
                href={`/exercises/${hub.slug}`}
                className="group angular-border card-neon p-6 transition-all duration-300 hover:[--angular-border-color:hsl(var(--primary)/0.5)]"
              >
                <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-2 group-hover:text-primary transition-colors">
                  {hub.bodyPart}
                </h3>
                <p className="font-barlow text-sm text-text-tertiary">
                  {hub.exerciseCount} exercises
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-12 md:py-16 bg-surface-1 border-t border-border-subtle">
        <div className="container">
          <h2 className="font-barlow-condensed text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8">
            Browse by Equipment
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {equipmentHubs.map((hub) => (
              <Link
                key={hub.equipment}
                href={`/exercises/equipment/${hub.slug}`}
                className="group angular-border card-neon p-4 transition-all duration-300 hover:[--angular-border-color:hsl(var(--primary)/0.5)]"
              >
                <h3 className="font-barlow-condensed text-base font-bold uppercase tracking-wide mb-1 group-hover:text-primary transition-colors">
                  {hub.equipment}
                </h3>
                <p className="font-barlow text-xs text-text-tertiary">
                  {hub.exerciseCount} exercises
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-surface-0 border-t border-border-subtle">
        <div className="container text-center">
          <h2 className="font-barlow-condensed text-2xl md:text-3xl font-bold uppercase mb-4">
            Get Personalized Workout Plans
          </h2>
          <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
            Let our AI trainers create custom workout plans based on your goals,
            schedule, and available equipment.
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
