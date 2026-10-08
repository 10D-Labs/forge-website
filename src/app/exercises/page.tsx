import PageIntro from "@/components/PageIntro";
import { ToolCTA } from "@/components/tools/ToolParts";
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
    "Browse 900+ exercises with video demonstrations and detailed instructions",
    "https://forgetrainer.ai/exercises",
    totalExercises
  );

  return (
    <main className="resource-page">
      <SchemaScript schema={breadcrumbSchema} />
      <SchemaScript schema={collectionSchema} />

      <PageIntro eyebrow="Free exercise library" title="Learn the movement." accent="Train with confidence." description={`Explore ${totalExercises.toLocaleString("en-US")} exercises with demonstrations and step-by-step instructions. Find a movement by body part, equipment, or experience level.`} id="exercises-heading" />

      {/* Difficulty Quick Filters */}
      <section className="py-6 bg-surface-1 border-y border-border-subtle">
        <div className="site-width">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-barlow-condensed text-sm uppercase tracking-wide text-text-tertiary">
              Filter by Difficulty:
            </span>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/exercises/beginner"
                className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-success/30 bg-success/10 text-success hover:bg-success/20 transition-colors"
              >
                <span>Beginner</span>
              </Link>
              <Link
                href="/exercises/intermediate"
                className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <span>Intermediate</span>
              </Link>
              <Link
                href="/exercises/advanced"
                className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide rounded-[20px] border border-destructive/30 bg-destructive/10 text-error hover:bg-destructive/20 transition-colors"
              >
                <span>Advanced</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body Parts Section */}
      <section className="py-12 md:py-16 bg-surface-0">
        <div className="site-width">
          <h2 className="font-barlow-condensed text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8">
            Browse by Body Part
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bodyPartHubs.map((hub) => (
              <Link
                key={hub.bodyPart}
                href={`/exercises/${hub.slug}`}
                className="resource-card group rounded-[20px] border border-border bg-surface-2 card-neon p-6 transition-all duration-300 hover:border-primary/50"
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
        <div className="site-width">
          <h2 className="font-barlow-condensed text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8">
            Browse by Equipment
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {equipmentHubs.map((hub) => (
              <Link
                key={hub.equipment}
                href={`/exercises/equipment/${hub.slug}`}
                className="resource-card group rounded-[20px] border border-border bg-surface-2 card-neon p-4 transition-all duration-300 hover:border-primary/50"
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

      <ToolCTA headline="Put what you learn" headlineAccent="into your next workout." subline="Get a plan built around your goals, schedule, and equipment. Your AI coach is there when you have questions." utmContent="exercises-hub" />
    </main>
  );
}
