import type { Exercise, BodyPart, Equipment, TargetMuscle } from "@/types/exercise";
import { BODY_PART_SLUGS, EQUIPMENT_SLUGS } from "@/types/exercise";
import { slugify, getExerciseGifUrl, getExerciseVideoUrl } from "@/lib/exercises";

const BASE_URL = "https://forgetrainer.ai";

/**
 * Generate HowTo schema for an individual exercise
 * This is the primary schema type for exercise pages
 */
export function generateExerciseHowToSchema(exercise: Exercise): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Do ${exercise.name}`,
    description: exercise.description,
    image: `${BASE_URL}${getExerciseGifUrl(exercise)}`,
    video: {
      "@type": "VideoObject",
      name: `${exercise.name} Demonstration`,
      description: `Watch how to properly perform the ${exercise.name} exercise`,
      thumbnailUrl: `${BASE_URL}${getExerciseGifUrl(exercise)}`,
      contentUrl: `${BASE_URL}${getExerciseVideoUrl(exercise)}`,
      uploadDate: "2025-01-01T00:00:00Z",
      duration: "PT30S",
    },
    step: exercise.instructions.map((instruction, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: instruction,
      name: `Step ${index + 1}`,
    })),
    tool:
      exercise.equipment !== "Body Weight"
        ? [
            {
              "@type": "HowToTool",
              name: exercise.equipment,
            },
          ]
        : undefined,
    performTime: "PT5M",
    totalTime: "PT5M",
    prepTime: "PT1M",
    supply: [],
    yield: "1 set of exercises",
    category: "Fitness",
    keywords: `${exercise.target}, ${exercise.bodyPart}, ${exercise.difficulty}, ${exercise.equipment}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/exercise/${slugify(exercise.name)}`,
    },
  };
}


/**
 * Generate VideoObject schema for an exercise video
 */
export function generateExerciseVideoSchema(exercise: Exercise): object {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${exercise.name} - Exercise Demonstration`,
    description: `Learn how to perform the ${exercise.name} with proper form. This ${exercise.difficulty.toLowerCase()} ${exercise.bodyPart.toLowerCase()} exercise targets the ${exercise.target.toLowerCase()}${exercise.equipment !== "Body Weight" ? ` using ${exercise.equipment.toLowerCase()}` : ""}.`,
    thumbnailUrl: `${BASE_URL}${getExerciseGifUrl(exercise)}`,
    contentUrl: `${BASE_URL}${getExerciseVideoUrl(exercise)}`,
    embedUrl: `${BASE_URL}/exercise/${slugify(exercise.name)}`,
    uploadDate: "2025-01-01",
    duration: "PT30S",
    publisher: {
      "@type": "Organization",
      name: "Forge",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
  };
}

/**
 * Generate FAQ schema for hub pages
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Generate FAQ content for body part hub pages
 */
export function generateBodyPartFAQs(
  bodyPart: string,
  exerciseCount: number,
  topExercises: string[]
): Array<{ question: string; answer: string }> {
  return [
    { question: `What are the best ${bodyPart.toLowerCase()} exercises?`, answer: `Some of the most effective ${bodyPart.toLowerCase()} exercises include ${topExercises.slice(0, 3).join(", ")}. These exercises target key muscle groups and can be adapted for all fitness levels.` },
    { question: `How many ${bodyPart.toLowerCase()} exercises should I do per workout?`, answer: `For most people, 3-5 ${bodyPart.toLowerCase()} exercises per workout session is optimal. Focus on compound movements first, then isolation exercises.` },
    { question: `How often should I train ${bodyPart.toLowerCase()}?`, answer: `Most people benefit from training ${bodyPart.toLowerCase()} 2-3 times per week with at least 48 hours of rest between sessions.` },
    { question: `Can beginners do these ${bodyPart.toLowerCase()} exercises?`, answer: `Yes! We have ${exerciseCount} ${bodyPart.toLowerCase()} exercises ranging from beginner to advanced.` },
  ];
}

/**
 * Generate FAQ content for equipment hub pages
 */
export function generateEquipmentFAQs(
  equipment: string,
  exerciseCount: number
): Array<{ question: string; answer: string }> {
  return [
    { question: `What exercises can I do with ${equipment.toLowerCase()}?`, answer: `There are ${exerciseCount} exercises you can perform with ${equipment.toLowerCase()}, targeting various muscle groups.` },
    { question: `Is ${equipment.toLowerCase()} good for beginners?`, answer: `${equipment} can be suitable for all fitness levels. Start with lighter weights and focus on form.` },
    { question: `What muscles can I train with ${equipment.toLowerCase()}?`, answer: `${equipment} is versatile and can be used to train multiple muscle groups.` },
  ];
}

/**
 * Generate FAQ content for muscle hub pages
 */
export function generateMuscleFAQs(
  muscle: string,
  exerciseCount: number,
  topExercises: string[]
): Array<{ question: string; answer: string }> {
  return [
    { question: `What are the best exercises for ${muscle.toLowerCase()}?`, answer: `Top exercises for the ${muscle.toLowerCase()} include ${topExercises.slice(0, 3).join(", ")}.` },
    { question: `How do I build bigger ${muscle.toLowerCase()}?`, answer: `Focus on progressive overload with compound and isolation exercises. Aim for 10-15 sets per week.` },
    { question: `How many ${muscle.toLowerCase()} exercises are available?`, answer: `We have ${exerciseCount} exercises that target the ${muscle.toLowerCase()}.` },
  ];
}
/**
 * Generate ExercisePlan schema for an exercise
 * Alternative/complementary to HowTo
 */
export function generateExercisePlanSchema(exercise: Exercise): object {
  return {
    "@context": "https://schema.org",
    "@type": "ExercisePlan",
    name: exercise.name,
    description: exercise.description,
    exerciseType: exercise.category,
    activityDuration: "PT5M",
    activityFrequency: "As needed",
    intensity: exercise.difficulty,
    workload: exercise.category,
  };
}

/**
 * Generate Breadcrumb schema for navigation
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate ItemList schema for exercise collection pages (hubs)
 */
export function generateExerciseListSchema(
  title: string,
  exercises: Exercise[],
  url: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description: `A collection of ${exercises.length} exercises`,
    url,
    numberOfItems: exercises.length,
    itemListElement: exercises.slice(0, 20).map((exercise, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "ExercisePlan",
        name: exercise.name,
        description: exercise.description,
        url: `${BASE_URL}/exercise/${slugify(exercise.name)}`,
        exerciseType: exercise.category,
        intensity: exercise.difficulty,
      },
    })),
  };
}

/**
 * Generate CollectionPage schema for hub pages
 */
export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string,
  itemCount: number
): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    numberOfItems: itemCount,
    provider: {
      "@type": "Organization",
      name: "Forge",
      url: BASE_URL,
    },
  };
}

/**
 * Generate exercise breadcrumbs for an exercise page
 */
export function generateExerciseBreadcrumbs(exercise: Exercise): object {
  const items = [
    { name: "Home", url: BASE_URL },
    { name: "Exercises", url: `${BASE_URL}/exercises` },
    { name: exercise.bodyPart, url: `${BASE_URL}/exercises/${slugify(exercise.bodyPart)}` },
    { name: exercise.name, url: `${BASE_URL}/exercise/${slugify(exercise.name)}` },
  ];
  return generateBreadcrumbSchema(items);
}

/**
 * Generate hub page breadcrumbs
 */
export function generateHubBreadcrumbs(
  type: "bodyPart" | "equipment" | "muscle" | "difficulty",
  value: string,
  slug: string
): object {
  const items = [
    { name: "Home", url: BASE_URL },
    { name: "Exercises", url: `${BASE_URL}/exercises` },
  ];

  switch (type) {
    case "bodyPart":
      items.push({ name: value, url: `${BASE_URL}/exercises/${slug}` });
      break;
    case "equipment":
      items.push({ name: value, url: `${BASE_URL}/exercises/equipment/${slug}` });
      break;
    case "muscle":
      items.push({ name: value, url: `${BASE_URL}/exercises/muscle/${slug}` });
      break;
    case "difficulty":
      items.push({ name: value, url: `${BASE_URL}/exercises/${slug}` });
      break;
  }

  return generateBreadcrumbSchema(items);
}

/**
 * Generate combo page breadcrumbs
 */
export function generateComboBreadcrumbs(
  bodyPart: BodyPart,
  equipment: Equipment
): object {
  const bodyPartSlug = BODY_PART_SLUGS[bodyPart];
  const equipmentSlug = EQUIPMENT_SLUGS[equipment];

  const items = [
    { name: "Home", url: BASE_URL },
    { name: "Exercises", url: `${BASE_URL}/exercises` },
    { name: bodyPart, url: `${BASE_URL}/exercises/${bodyPartSlug}` },
    {
      name: `${bodyPart} with ${equipment}`,
      url: `${BASE_URL}/exercises/${bodyPartSlug}/${equipmentSlug}`,
    },
  ];

  return generateBreadcrumbSchema(items);
}

/**
 * Helper to render schema as a script tag
 * Use this in page components
 */
export function SchemaScript({ schema }: { schema: object }): JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Generate multiple schemas combined into an array
 */
export function combineSchemas(...schemas: object[]): object[] {
  return schemas;
}

/**
 * Generate comparison FAQ schema for exercise vs exercise pages
 */
export function generateComparisonFAQs(
  exercise1: Exercise,
  exercise2: Exercise
): Array<{ question: string; answer: string }> {
  const e1 = exercise1.name;
  const e2 = exercise2.name;
  const e1Lower = e1.toLowerCase();
  const e2Lower = e2.toLowerCase();

  return [
    {
      question: `What's the difference between ${e1} and ${e2}?`,
      answer: `${e1} targets the ${exercise1.target.toLowerCase()} using ${exercise1.equipment.toLowerCase()}, while ${e2} targets the ${exercise2.target.toLowerCase()} using ${exercise2.equipment.toLowerCase()}. ${e1} is a ${exercise1.difficulty.toLowerCase()} exercise, while ${e2} is ${exercise2.difficulty.toLowerCase()}.`,
    },
    {
      question: `Which is better for beginners, ${e1Lower} or ${e2Lower}?`,
      answer:
        exercise1.difficulty === "Beginner"
          ? `${e1} is better for beginners as it's classified as a beginner exercise${exercise2.difficulty === "Beginner" ? `, though ${e2} is also beginner-friendly` : ""}.`
          : exercise2.difficulty === "Beginner"
            ? `${e2} is better for beginners as it's classified as a beginner exercise.`
            : `Both exercises are ${exercise1.difficulty.toLowerCase()}-level, so some training experience is recommended before attempting either.`,
    },
    {
      question: `Can I do both ${e1Lower} and ${e2Lower} in the same workout?`,
      answer: `Yes, you can include both exercises in your routine${exercise1.bodyPart === exercise2.bodyPart ? ` since they both target ${exercise1.bodyPart.toLowerCase()}` : ""}. Alternate between them to work your muscles from different angles.`,
    },
    {
      question: `What equipment do I need for ${e1Lower} vs ${e2Lower}?`,
      answer:
        exercise1.equipment === exercise2.equipment
          ? `Both exercises use ${exercise1.equipment.toLowerCase()}.`
          : `${e1} requires ${exercise1.equipment.toLowerCase()}, while ${e2} requires ${exercise2.equipment.toLowerCase()}.`,
    },
  ];
}

/**
 * Generate breadcrumbs for comparison page
 */
export function generateComparisonBreadcrumbs(
  exercise1: Exercise,
  exercise2: Exercise
): object {
  const slug1 = slugify(exercise1.name);
  const slug2 = slugify(exercise2.name);

  const items = [
    { name: "Home", url: BASE_URL },
    { name: "Exercises", url: `${BASE_URL}/exercises` },
    {
      name: `${exercise1.name} vs ${exercise2.name}`,
      url: `${BASE_URL}/exercise/compare/${slug1}-vs-${slug2}`,
    },
  ];
  return generateBreadcrumbSchema(items);
}
