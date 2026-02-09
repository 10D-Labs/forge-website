import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllExercises,
  getExerciseBySlug,
  getRelatedExercises,
  slugify,
  getExerciseVideoUrl,
} from "@/lib/exercises";
import { generateExerciseMetadata } from "@/lib/seo/metadata-factory";
import {
  generateExerciseHowToSchema,
  generateExerciseBreadcrumbs,
  SchemaScript,
} from "@/lib/seo/schema-generators";
import { ExerciseDetail, RelatedExercises } from "@/components/exercises";

interface ExercisePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const exercises = getAllExercises();
  return exercises.map((exercise) => ({
    slug: slugify(exercise.name),
  }));
}

export async function generateMetadata({
  params,
}: ExercisePageProps): Promise<Metadata> {
  const { slug } = await params;
  const exercise = getExerciseBySlug(slug);

  if (!exercise) {
    return { title: "Exercise Not Found" };
  }

  return generateExerciseMetadata(exercise);
}

export default async function ExercisePage({ params }: ExercisePageProps) {
  const { slug } = await params;
  const exercise = getExerciseBySlug(slug);

  if (!exercise) {
    notFound();
  }

  const relatedExercises = getRelatedExercises(exercise, 6);

  const howToSchema = generateExerciseHowToSchema(exercise);
  const breadcrumbSchema = generateExerciseBreadcrumbs(exercise);

  const videoUrl = getExerciseVideoUrl(exercise);

  return (
    <div className="min-h-screen bg-background">
      {/* Preload the main exercise video for faster LCP */}
      <link rel="preload" as="video" href={videoUrl} />
      <SchemaScript schema={howToSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      <main className="pt-20">
        {/* Header */}
        <header className="py-6 bg-surface-0 border-b border-border-subtle">
          <div className="container">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4">
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
                    href={`/exercises/${slugify(exercise.bodyPart)}`}
                    className="text-text-tertiary hover:text-primary transition-colors"
                  >
                    {exercise.bodyPart}
                  </Link>
                </li>
                <li className="text-text-quaternary">/</li>
                <li className="text-text-secondary truncate max-w-[200px]">
                  {exercise.name}
                </li>
              </ol>
            </nav>
          </div>
        </header>

        {/* Exercise Detail */}
        <ExerciseDetail exercise={exercise} />

        {/* Related Exercises */}
        <RelatedExercises
          exercises={relatedExercises}
          title={`More ${exercise.target} Exercises`}
        />

        {/* CTA Section */}
        <section className="py-12 bg-surface-1 border-t border-border-subtle">
          <div className="container text-center">
            <h2 className="font-barlow-condensed text-2xl font-bold uppercase mb-4">
              Master The {exercise.name} with Forge
            </h2>
            <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
              Get personalized coaching, form feedback, and workout plans
              featuring {exercise.name} and other exercises tailored to your
              goals.
            </p>
            <Link
              href="/?scrollTo=waitlist"
              className="inline-flex items-center justify-center px-8 py-3 font-barlow-condensed font-bold uppercase tracking-wide text-primary-foreground rounded-[14px] bg-primary border border-primary hover:bg-forge-orange-dark transition-colors"
            >
              <span>Join the Waitlist</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
