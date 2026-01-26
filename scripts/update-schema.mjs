import fs from 'fs';

let content = fs.readFileSync('src/lib/seo/schema-generators.tsx', 'utf8');

// Add video property to HowTo schema
const videoProperty = `    video: {
      "@type": "VideoObject",
      name: \`\${exercise.name} Demonstration\`,
      description: \`Watch how to properly perform the \${exercise.name} exercise\`,
      thumbnailUrl: \`\${BASE_URL}\${getExerciseGifUrl(exercise)}\`,
      contentUrl: \`\${BASE_URL}\${getExerciseVideoUrl(exercise)}\`,
      uploadDate: "2025-01-01",
      duration: "PT30S",
    },`;

content = content.replace(
  '    image: `${BASE_URL}${getExerciseGifUrl(exercise)}`,\n    step:',
  '    image: `${BASE_URL}${getExerciseGifUrl(exercise)}`,\n' + videoProperty + '\n    step:'
);

// Add VideoObject schema function after HowTo schema
const videoSchemaFunc = `
/**
 * Generate VideoObject schema for an exercise video
 */
export function generateExerciseVideoSchema(exercise: Exercise): object {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: \`\${exercise.name} - Exercise Demonstration\`,
    description: \`Learn how to perform the \${exercise.name} with proper form. This \${exercise.difficulty.toLowerCase()} \${exercise.bodyPart.toLowerCase()} exercise targets the \${exercise.target.toLowerCase()}\${exercise.equipment !== "Body Weight" ? \` using \${exercise.equipment.toLowerCase()}\` : ""}.\`,
    thumbnailUrl: \`\${BASE_URL}\${getExerciseGifUrl(exercise)}\`,
    contentUrl: \`\${BASE_URL}\${getExerciseVideoUrl(exercise)}\`,
    embedUrl: \`\${BASE_URL}/exercise/\${slugify(exercise.name)}\`,
    uploadDate: "2025-01-01",
    duration: "PT30S",
    publisher: {
      "@type": "Organization",
      name: "Forge",
      logo: { "@type": "ImageObject", url: \`\${BASE_URL}/logo.png\` },
    },
  };
}
`;

content = content.replace(
  '/**\n * Generate ExercisePlan schema',
  videoSchemaFunc + '/**\n * Generate ExercisePlan schema'
);

// Add FAQ schema functions
const faqFuncs = `
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
    { question: \`What are the best \${bodyPart.toLowerCase()} exercises?\`, answer: \`Some of the most effective \${bodyPart.toLowerCase()} exercises include \${topExercises.slice(0, 3).join(", ")}. These exercises target key muscle groups and can be adapted for all fitness levels.\` },
    { question: \`How many \${bodyPart.toLowerCase()} exercises should I do per workout?\`, answer: \`For most people, 3-5 \${bodyPart.toLowerCase()} exercises per workout session is optimal. Focus on compound movements first, then isolation exercises.\` },
    { question: \`How often should I train \${bodyPart.toLowerCase()}?\`, answer: \`Most people benefit from training \${bodyPart.toLowerCase()} 2-3 times per week with at least 48 hours of rest between sessions.\` },
    { question: \`Can beginners do these \${bodyPart.toLowerCase()} exercises?\`, answer: \`Yes! We have \${exerciseCount} \${bodyPart.toLowerCase()} exercises ranging from beginner to advanced.\` },
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
    { question: \`What exercises can I do with \${equipment.toLowerCase()}?\`, answer: \`There are \${exerciseCount} exercises you can perform with \${equipment.toLowerCase()}, targeting various muscle groups.\` },
    { question: \`Is \${equipment.toLowerCase()} good for beginners?\`, answer: \`\${equipment} can be suitable for all fitness levels. Start with lighter weights and focus on form.\` },
    { question: \`What muscles can I train with \${equipment.toLowerCase()}?\`, answer: \`\${equipment} is versatile and can be used to train multiple muscle groups.\` },
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
    { question: \`What are the best exercises for \${muscle.toLowerCase()}?\`, answer: \`Top exercises for the \${muscle.toLowerCase()} include \${topExercises.slice(0, 3).join(", ")}.\` },
    { question: \`How do I build bigger \${muscle.toLowerCase()}?\`, answer: \`Focus on progressive overload with compound and isolation exercises. Aim for 10-15 sets per week.\` },
    { question: \`How many \${muscle.toLowerCase()} exercises are available?\`, answer: \`We have \${exerciseCount} exercises that target the \${muscle.toLowerCase()}.\` },
  ];
}
`;

content = content.replace(
  '/**\n * Generate ExercisePlan schema',
  faqFuncs + '/**\n * Generate ExercisePlan schema'
);

fs.writeFileSync('src/lib/seo/schema-generators.tsx', content);
console.log('Schema generators updated successfully');
