import type { Exercise, BodyPart, Equipment, TargetMuscle } from "@/types/exercise";
import { BODY_PART_SLUGS, EQUIPMENT_SLUGS } from "@/types/exercise";
import { slugify, getExerciseGifUrl } from "@/lib/exercises";

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
