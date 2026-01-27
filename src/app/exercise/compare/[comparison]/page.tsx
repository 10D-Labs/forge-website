import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllExercises,
  getExerciseBySlug,
  slugify,
  getExerciseVideoUrl,
  getExerciseGifUrl,
} from "@/lib/exercises";
import {
  generateFAQSchema,
  generateComparisonFAQs,
  generateComparisonBreadcrumbs,
  SchemaScript,
} from "@/lib/seo/schema-generators";
import type { Exercise } from "@/types/exercise";
import { BODY_PART_SLUGS, EQUIPMENT_SLUGS } from "@/types/exercise";

interface ComparisonPageProps {
  params: Promise<{ comparison: string }>;
}

// Popular exercise comparison pairs for programmatic SEO
// Format: [exercise1-slug, exercise2-slug]
const COMPARISON_PAIRS: [string, string][] = [
  // Chest comparisons
  ["barbell-bench-press", "dumbbell-bench-press"],
  ["barbell-bench-press", "barbell-incline-bench-press"],
  ["barbell-bench-press", "barbell-decline-bench-press"],
  ["barbell-incline-bench-press", "dumbbell-incline-fly"],
  ["cable-incline-fly", "dumbbell-fly"],
  ["dumbbell-bench-press", "dumbbell-fly"],
  // Back comparisons
  ["barbell-bent-over-row", "dumbbell-bent-over-row"],
  ["cable-lat-pulldown", "barbell-bent-over-row"],
  ["deadlift", "barbell-bent-over-row"],
  ["barbell-bent-over-row", "cable-floor-seated-wide-grip-row"],
  ["deadlift", "barbell-romanian-deadlift"],
  ["barbell-deadlift", "barbell-sumo-deadlift"],
  // Leg comparisons
  ["barbell-full-squat", "leg-press"],
  ["barbell-front-squat", "barbell-full-squat"],
  ["deadlift", "barbell-romanian-deadlift"],
  ["leg-extension", "barbell-full-squat"],
  ["barbell-lunge", "dumbbell-lunge"],
  ["barbell-lunge", "walking-lunge"],
  ["barbell-hack-squat", "leg-press"],
  // Shoulder comparisons
  ["barbell-seated-overhead-press", "dumbbell-arnold-press"],
  ["lateral-raise", "cable-lateral-raise"],
  ["face-pull", "barbell-rear-delt-row"],
  ["cable-front-raise", "barbell-front-raise"],
  // Arm comparisons
  ["barbell-curl", "dumbbell-alternate-bicep-curl"],
  ["ez-bar-curl", "barbell-curl"],
  ["cable-tricep-pushdown", "barbell-skull-crusher"],
  ["barbell-close-grip-bench-press", "tricep-dip"],
  ["barbell-preacher-curl", "barbell-curl"],
  // Core comparisons
  ["bicycle-crunch", "cable-kneeling-crunch"],
  ["front-plank-with-twist", "dead-bug"],
  ["hanging-leg-raise", "cable-kneeling-crunch"],
  ["decline-situp", "bicycle-crunch"],
];

function parseComparison(comparison: string): { slug1: string; slug2: string } | null {
  const match = comparison.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return { slug1: match[1], slug2: match[2] };
}

export async function generateStaticParams() {
  const allExercises = getAllExercises();
  const slugSet = new Set(allExercises.map((e) => slugify(e.name)));

  // Only generate pages for valid pairs where both exercises exist
  return COMPARISON_PAIRS.filter(
    ([slug1, slug2]) => slugSet.has(slug1) && slugSet.has(slug2)
  ).map(([slug1, slug2]) => ({
    comparison: `${slug1}-vs-${slug2}`,
  }));
}

export async function generateMetadata({
  params,
}: ComparisonPageProps): Promise<Metadata> {
  const { comparison } = await params;
  const parsed = parseComparison(comparison);

  if (!parsed) {
    return { title: "Not Found" };
  }

  const exercise1 = getExerciseBySlug(parsed.slug1);
  const exercise2 = getExerciseBySlug(parsed.slug2);

  if (!exercise1 || !exercise2) {
    return { title: "Not Found" };
  }

  // Keep title under 61 chars (+ 9 for " | Forge" = 70 max)
  const combinedLength = exercise1.name.length + exercise2.name.length;
  const title = combinedLength <= 40
    ? `${exercise1.name} vs ${exercise2.name}: Which Is Better?`
    : `${exercise1.name} vs ${exercise2.name}`;
  const description = `Compare ${exercise1.name} and ${exercise2.name}. Learn the differences in muscles worked, equipment needed, difficulty level, and which exercise is best for your fitness goals.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://forgetrainer.ai/exercise/compare/${comparison}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://forgetrainer.ai/exercise/compare/${comparison}`,
    },
  };
}

function ComparisonCard({ exercise, label }: { exercise: Exercise; label: string }) {
  const videoUrl = getExerciseVideoUrl(exercise);
  const gifUrl = getExerciseGifUrl(exercise);
  const slug = slugify(exercise.name);

  return (
    <div className="angular-border bg-surface-1 overflow-hidden">
      <div className="p-4 bg-surface-2 border-b border-border-subtle">
        <span className="text-xs font-barlow uppercase tracking-wider text-text-tertiary">
          {label}
        </span>
        <h2 className="font-barlow-condensed text-xl md:text-2xl font-bold uppercase mt-1">
          <Link href={`/exercise/${slug}`} className="hover:text-primary transition-colors">
            {exercise.name}
          </Link>
        </h2>
      </div>

      <div className="aspect-video relative bg-surface-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={gifUrl}
        >
          <source src={videoUrl} type="video/webm" />
          <img src={gifUrl} alt={exercise.name} className="w-full h-full object-cover" />
        </video>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-tertiary font-barlow">Body Part</span>
            <p className="font-barlow-condensed font-semibold uppercase">
              <Link
                href={`/exercises/${BODY_PART_SLUGS[exercise.bodyPart]}`}
                className="hover:text-primary transition-colors"
              >
                {exercise.bodyPart}
              </Link>
            </p>
          </div>
          <div>
            <span className="text-text-tertiary font-barlow">Target</span>
            <p className="font-barlow-condensed font-semibold uppercase">{exercise.target}</p>
          </div>
          <div>
            <span className="text-text-tertiary font-barlow">Equipment</span>
            <p className="font-barlow-condensed font-semibold uppercase">
              <Link
                href={`/exercises/equipment/${EQUIPMENT_SLUGS[exercise.equipment]}`}
                className="hover:text-primary transition-colors"
              >
                {exercise.equipment}
              </Link>
            </p>
          </div>
          <div>
            <span className="text-text-tertiary font-barlow">Difficulty</span>
            <p className="font-barlow-condensed font-semibold uppercase">{exercise.difficulty}</p>
          </div>
        </div>

        {exercise.secondaryMuscles.length > 0 && (
          <div>
            <span className="text-text-tertiary font-barlow text-sm">Secondary Muscles</span>
            <p className="font-barlow text-sm mt-1">{exercise.secondaryMuscles.join(", ")}</p>
          </div>
        )}

        <Link
          href={`/exercise/${slug}`}
          className="inline-flex items-center text-sm font-barlow text-primary hover:underline"
        >
          View full exercise guide
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function ComparisonTable({ exercise1, exercise2 }: { exercise1: Exercise; exercise2: Exercise }) {
  const rows = [
    { label: "Body Part", value1: exercise1.bodyPart, value2: exercise2.bodyPart },
    { label: "Primary Muscle", value1: exercise1.target, value2: exercise2.target },
    { label: "Equipment", value1: exercise1.equipment, value2: exercise2.equipment },
    { label: "Difficulty", value1: exercise1.difficulty, value2: exercise2.difficulty },
    { label: "Category", value1: exercise1.category, value2: exercise2.category },
    {
      label: "Secondary Muscles",
      value1: exercise1.secondaryMuscles.join(", ") || "None",
      value2: exercise2.secondaryMuscles.join(", ") || "None",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-subtle">
            <th className="py-3 px-4 text-left font-barlow text-text-tertiary font-normal">
              Attribute
            </th>
            <th className="py-3 px-4 text-left font-barlow-condensed font-bold uppercase">
              {exercise1.name}
            </th>
            <th className="py-3 px-4 text-left font-barlow-condensed font-bold uppercase">
              {exercise2.name}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-surface-1" : ""}>
              <td className="py-3 px-4 font-barlow text-text-secondary">{row.label}</td>
              <td className="py-3 px-4 font-barlow">{row.value1}</td>
              <td className="py-3 px-4 font-barlow">{row.value2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { comparison } = await params;
  const parsed = parseComparison(comparison);

  if (!parsed) {
    notFound();
  }

  const exercise1 = getExerciseBySlug(parsed.slug1);
  const exercise2 = getExerciseBySlug(parsed.slug2);

  if (!exercise1 || !exercise2) {
    notFound();
  }

  const faqs = generateComparisonFAQs(exercise1, exercise2);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateComparisonBreadcrumbs(exercise1, exercise2);

  return (
    <div className="min-h-screen bg-background">
      <SchemaScript schema={faqSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-surface-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="container relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm font-barlow">
              <li>
                <Link href="/" className="text-text-tertiary hover:text-primary transition-colors">
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
              <li className="text-text-secondary">Compare</li>
            </ol>
          </nav>

          <h1 className="font-barlow-condensed text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4">
            {exercise1.name} <span className="text-primary">vs</span> {exercise2.name}
          </h1>
          <p className="font-barlow text-lg md:text-xl text-text-secondary max-w-3xl">
            Compare these two exercises side-by-side. Learn the differences in muscles worked,
            equipment needed, and find out which one is best for your fitness goals.
          </p>
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section className="py-12 md:py-16 bg-surface-0">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ComparisonCard exercise={exercise1} label="Exercise 1" />
            <ComparisonCard exercise={exercise2} label="Exercise 2" />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 md:py-16 bg-surface-1">
        <div className="container">
          <h2 className="font-barlow-condensed text-2xl md:text-3xl font-bold uppercase mb-6">
            Quick Comparison
          </h2>
          <div className="angular-border bg-surface-0 overflow-hidden">
            <ComparisonTable exercise1={exercise1} exercise2={exercise2} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-surface-0">
        <div className="container">
          <h2 className="font-barlow-condensed text-2xl md:text-3xl font-bold uppercase mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="angular-border bg-surface-1 p-6">
                <h3 className="font-barlow-condensed text-lg font-bold mb-3">{faq.question}</h3>
                <p className="font-barlow text-text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-surface-1 border-t border-border-subtle">
        <div className="container text-center">
          <h2 className="font-barlow-condensed text-2xl font-bold uppercase mb-4">
            Get Expert Exercise Guidance
          </h2>
          <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
            Not sure which exercise is right for you? Our AI trainers can create a personalized
            workout plan based on your goals and available equipment.
          </p>
          <Link
            href="/?scrollTo=waitlist"
            className="inline-flex items-center justify-center px-8 py-3 font-barlow-condensed font-bold uppercase tracking-wide text-primary-foreground angular-border hover:[--angular-bg:hsl(var(--forge-orange-dark))] transition-colors"
            style={
              {
                "--angular-bg": "hsl(var(--primary))",
                "--angular-border-color": "hsl(var(--primary))",
              } as React.CSSProperties
            }
          >
            <span>Join the Waitlist</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
