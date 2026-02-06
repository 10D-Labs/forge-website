import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getExercisesByEquipment,
  getEquipmentHubs,
  slugify,
} from "@/lib/exercises";
import { generateEquipmentHubMetadata } from "@/lib/seo/metadata-factory";
import {
  generateExerciseListSchema,
  generateHubBreadcrumbs,
  generateFAQSchema,
  generateEquipmentFAQs,
  SchemaScript,
} from "@/lib/seo/schema-generators";
import { ExerciseGrid } from "@/components/exercises";
import type { Equipment, BodyPart } from "@/types/exercise";
import { SLUG_TO_EQUIPMENT, EQUIPMENT_SLUGS, BODY_PART_SLUGS } from "@/types/exercise";

interface EquipmentPageProps {
  params: Promise<{ equipment: string }>;
}

const VALID_EQUIPMENT = Object.values(EQUIPMENT_SLUGS);

// Equipment names formatted for CTA text (pluralized where appropriate)
const EQUIPMENT_CTA_TEXT: Record<Equipment, string> = {
  "Ab Wheel": "Ab Wheel",
  Barbell: "Barbell",
  "Body Weight": "Body Weight",
  Cable: "Cable Machine",
  "Cardio Machine": "Cardio Machine",
  Dumbbell: "Dumbbells",
  "EZ Bar": "EZ Bar",
  "Jump Rope": "Jump Rope",
  Kettlebell: "Kettlebells",
  Machine: "Gym Machines",
  "Medicine Ball": "Medicine Ball",
  "Resistance Band": "Resistance Bands",
  Rings: "Rings",
  "Smith Machine": "Smith Machine",
  "Trap Bar": "Trap Bar",
  Treadmill: "Treadmill",
  "Weight Plate": "Weight Plates",
};

// Helper for singular/plural
const plural = (count: number, word: string) => count === 1 ? word : `${word}s`;

// Full hero description for each equipment type (unique copy, no repetition)
const EQUIPMENT_HERO_DESC: Record<Equipment, (count: number) => string> = {
  "Ab Wheel": (count) =>
    `${count} ab wheel ${plural(count, "exercise")} to build a rock-solid core. Target your abs, obliques, and lower back with one of the most effective core training tools.`,
  Barbell: (count) =>
    `${count} barbell ${plural(count, "exercise")} for serious strength gains. The foundation of any strength program—master compound lifts and build total-body power.`,
  "Body Weight": (count) =>
    `${count} bodyweight ${plural(count, "exercise")} you can do anywhere, anytime. No gym required—build strength, endurance, and flexibility using just your body.`,
  Cable: (count) =>
    `${count} cable machine ${plural(count, "exercise")} for constant tension training. Perfect for isolation work and building muscle through a full range of motion.`,
  "Cardio Machine": (count) =>
    `${count} cardio machine ${plural(count, "exercise")} to boost your endurance and burn calories. Build cardiovascular fitness with treadmills, bikes, and more.`,
  Dumbbell: (count) =>
    `${count} dumbbell ${plural(count, "exercise")} for versatile strength training. Build balanced muscle, fix imbalances, and train anywhere from home to the gym.`,
  "EZ Bar": (count) =>
    `${count} EZ bar ${plural(count, "exercise")} designed for comfortable, effective arm training. The angled grip reduces wrist strain during curls and extensions.`,
  Kettlebell: (count) =>
    `${count} kettlebell ${plural(count, "exercise")} for explosive power and conditioning. Combine strength and cardio in dynamic, full-body movements.`,
  Machine: (count) =>
    `${count} machine ${plural(count, "exercise")} for guided, safe resistance training. Ideal for beginners learning movement patterns or advanced lifters isolating muscles.`,
  "Medicine Ball": (count) =>
    `${count} medicine ball ${plural(count, "exercise")} for explosive power and core strength. Add dynamic, athletic movements to your training routine.`,
  "Resistance Band": (count) =>
    `${count} resistance band ${plural(count, "exercise")} for portable, effective training. Build muscle and improve mobility anywhere—perfect for travel or home workouts.`,
  Rings: (count) =>
    `${count} gymnastic ring ${plural(count, "exercise")} for elite upper body strength. Master bodyweight training with one of the most challenging tools in the gym.`,
  "Smith Machine": (count) =>
    `${count} Smith machine ${plural(count, "exercise")} for controlled, stable lifting. Great for solo training when you need a spotter-free setup.`,
  "Trap Bar": (count) =>
    `${count} trap bar ${plural(count, "exercise")} for powerful hip-hinge movements. A joint-friendly alternative for deadlifts and carries that reduces lower back strain.`,
  "Jump Rope": (count) =>
    `${count} jump rope ${plural(count, "exercise")} for cardio and coordination. A simple, portable tool for burning calories and improving footwork.`,
  Treadmill: (count) =>
    `${count} treadmill ${plural(count, "exercise")} for running, walking, and interval training. Control your pace and incline for targeted cardio sessions.`,
  "Weight Plate": (count) =>
    `${count} weight plate ${plural(count, "exercise")} for functional strength training. A versatile tool for carries, presses, and rotational movements.`,
};

export async function generateStaticParams() {
  return VALID_EQUIPMENT.map((equipment) => ({ equipment }));
}

export async function generateMetadata({
  params,
}: EquipmentPageProps): Promise<Metadata> {
  const { equipment: equipmentSlug } = await params;

  if (!VALID_EQUIPMENT.includes(equipmentSlug)) {
    return { title: "Not Found" };
  }

  const equipment = SLUG_TO_EQUIPMENT[equipmentSlug];
  const exercises = getExercisesByEquipment(equipment);

  return generateEquipmentHubMetadata(equipment, exercises.length);
}

export default async function EquipmentPage({ params }: EquipmentPageProps) {
  const { equipment: equipmentSlug } = await params;

  if (!VALID_EQUIPMENT.includes(equipmentSlug)) {
    notFound();
  }

  const equipment = SLUG_TO_EQUIPMENT[equipmentSlug] as Equipment;
  const exercises = getExercisesByEquipment(equipment);

  // Get body parts available for this equipment (only those with 5+ exercises for valid combo pages)
  const bodyParts = [...new Set(exercises.map((e) => e.bodyPart))].sort();
  const bodyPartCounts = bodyParts
    .map((bp) => ({
      bodyPart: bp,
      count: exercises.filter((e) => e.bodyPart === bp).length,
    }))
    .filter((bc) => bc.count >= 5);

  const listSchema = generateExerciseListSchema(
    `${equipment} Exercises`,
    exercises,
    `https://forgetrainer.ai/exercises/equipment/${equipmentSlug}`
  );
  const breadcrumbSchema = generateHubBreadcrumbs(
    "equipment",
    equipment,
    equipmentSlug
  );

  // Generate FAQ schema for SEO
  const faqs = generateEquipmentFAQs(equipment, exercises.length);
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
              <li className="text-text-secondary">{equipment}</li>
            </ol>
          </nav>

          <h1 className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            {equipment} Exercises
          </h1>
          <p className="font-barlow text-xl text-text-secondary max-w-2xl">
            {EQUIPMENT_HERO_DESC[equipment](exercises.length)}
          </p>
        </div>
      </section>

      {/* Body Part Filter Navigation - only show if there are valid combinations */}
      {bodyPartCounts.length > 1 && (
        <section className="py-4 bg-surface-1 border-y border-border-subtle sticky top-16 z-20">
          <div className="container">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 text-sm font-barlow text-text-tertiary">
                Filter by body part:
              </span>
              {bodyPartCounts.map(({ bodyPart, count }) => (
                <Link
                  key={bodyPart}
                  href={`/exercises/${BODY_PART_SLUGS[bodyPart]}/${equipmentSlug}`}
                  className="px-3 py-1.5 text-sm font-barlow-condensed uppercase tracking-wide angular-border hover:text-primary hover:[--angular-bg:hsl(var(--primary)/0.1)] transition-colors"
                >
                  <span>{bodyPart} ({count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Exercise Grid */}
      <section className={`pb-12 md:pb-16 bg-surface-0 ${bodyPartCounts.length > 1 ? "pt-12 md:pt-16" : "pt-6 md:pt-8"}`}>
        <div className="container">
          <ExerciseGrid exercises={exercises} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-surface-1 border-t border-border-subtle">
        <div className="container text-center">
          <h2 className="font-barlow-condensed text-2xl font-bold uppercase mb-4">
            {equipment === "Body Weight"
              ? "No Equipment? No Problem."
              : `Get the Most Out of Your ${EQUIPMENT_CTA_TEXT[equipment]}`}
          </h2>
          <p className="font-barlow text-text-secondary mb-6 max-w-xl mx-auto">
            Our AI trainers create custom workout plans based on your available
            equipment. Tell us what you have, and we'll build the perfect
            program.
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
