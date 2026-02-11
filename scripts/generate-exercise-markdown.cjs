/**
 * Generate markdown files for all exercise pages
 * These are used by LLM/AI crawlers for better discoverability
 *
 * Run: node scripts/generate-exercise-markdown.js
 */

const fs = require('fs');
const path = require('path');

// Load exercise data
const exercisesPath = path.join(__dirname, '../src/data/exercises.json');
const exercises = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));

// Try to load enrichment data (may not exist yet during initial generation)
let enrichmentData = {};
try {
  const enrichmentPath = path.join(__dirname, '../src/data/exercise-enrichment.ts');
  const enrichmentContent = fs.readFileSync(enrichmentPath, 'utf8');
  // Find the object between "EXERCISE_ENRICHMENT...= {" and the closing "};"
  const startMarker = 'EXERCISE_ENRICHMENT';
  const startIdx = enrichmentContent.indexOf(startMarker);
  if (startIdx !== -1) {
    const objStart = enrichmentContent.indexOf('{', startIdx);
    // Find the matching closing }; by looking for "};\n\n/**" or end pattern
    const endPattern = '};\n\n/**';
    let objEnd = enrichmentContent.indexOf(endPattern, objStart);
    if (objEnd === -1) {
      // Fallback: find last }; before "export function"
      objEnd = enrichmentContent.lastIndexOf('};', enrichmentContent.indexOf('export function'));
    }
    if (objStart !== -1 && objEnd !== -1) {
      const objectStr = enrichmentContent.substring(objStart, objEnd + 1);
      enrichmentData = eval('(' + objectStr + ')');
      console.log(`Loaded enrichment data for ${Object.keys(enrichmentData).length} exercises`);
    } else {
      console.log('Note: Could not find enrichment object boundaries');
    }
  }
} catch (e) {
  console.log('Note: Could not load enrichment data: ' + e.message);
}

// Comparison pairs (matching the comparison page)
const COMPARISON_PAIRS = [
  ["barbell-bench-press", "dumbbell-bench-press"],
  ["barbell-bench-press", "barbell-incline-bench-press"],
  ["barbell-bench-press", "barbell-decline-bench-press"],
  ["barbell-incline-bench-press", "dumbbell-incline-fly"],
  ["cable-incline-fly", "dumbbell-fly"],
  ["dumbbell-bench-press", "dumbbell-fly"],
  ["barbell-bent-over-row", "dumbbell-bent-over-row"],
  ["cable-lat-pulldown", "barbell-bent-over-row"],
  ["deadlift", "barbell-bent-over-row"],
  ["barbell-bent-over-row", "cable-floor-seated-wide-grip-row"],
  ["deadlift", "barbell-romanian-deadlift"],
  ["barbell-deadlift", "barbell-sumo-deadlift"],
  ["barbell-full-squat", "leg-press"],
  ["barbell-front-squat", "barbell-full-squat"],
  ["leg-extension", "barbell-full-squat"],
  ["barbell-lunge", "dumbbell-lunge"],
  ["barbell-lunge", "walking-lunge"],
  ["barbell-hack-squat", "leg-press"],
  ["barbell-seated-overhead-press", "dumbbell-arnold-press"],
  ["lateral-raise", "cable-lateral-raise"],
  ["face-pull", "barbell-rear-delt-row"],
  ["cable-front-raise", "barbell-front-raise"],
  ["barbell-curl", "dumbbell-alternate-bicep-curl"],
  ["ez-bar-curl", "barbell-curl"],
  ["cable-tricep-pushdown", "barbell-skull-crusher"],
  ["barbell-close-grip-bench-press", "tricep-dip"],
  ["barbell-preacher-curl", "barbell-curl"],
  ["bicycle-crunch", "cable-kneeling-crunch"],
  ["front-plank-with-twist", "dead-bug"],
  ["hanging-leg-raise", "cable-kneeling-crunch"],
  ["decline-situp", "bicycle-crunch"],
];

// Output directory
const outputDir = path.join(__dirname, '../public/markdown/exercises');

// Slug mappings (matching src/types/exercise.ts)
const BODY_PART_SLUGS = {
  Arms: "arms",
  Back: "back",
  Cardio: "cardio",
  Chest: "chest",
  Core: "core",
  Legs: "legs",
  Neck: "neck",
  Shoulders: "shoulders",
};

const EQUIPMENT_SLUGS = {
  "Ab Wheel": "ab-wheel",
  Barbell: "barbell",
  "Body Weight": "bodyweight",
  Cable: "cable",
  "Cardio Machine": "cardio-machine",
  Dumbbell: "dumbbell",
  "EZ Bar": "ez-bar",
  Kettlebell: "kettlebell",
  Machine: "machine",
  "Medicine Ball": "medicine-ball",
  "Resistance Band": "resistance-band",
  Rings: "rings",
  "Smith Machine": "smith-machine",
  "Trap Bar": "trap-bar",
  Treadmill: "treadmill",
  "Weight Plate": "weight-plate",
  "Jump Rope": "jump-rope",
};

const TARGET_SLUGS = {
  Abductors: "abductors",
  Abs: "abs",
  Adductors: "adductors",
  Biceps: "biceps",
  Calves: "calves",
  Cardiovascular: "cardiovascular",
  Chest: "chest",
  Forearms: "forearms",
  Glutes: "glutes",
  Hamstrings: "hamstrings",
  "Hip Flexors": "hip-flexors",
  Lats: "lats",
  "Lower Back": "lower-back",
  Neck: "neck",
  Obliques: "obliques",
  Quads: "quads",
  Quadriceps: "quadriceps",
  Serratus: "serratus",
  Shoulders: "shoulders",
  Traps: "traps",
  Triceps: "triceps",
  "Upper Back": "upper-back",
};

// Singular forms for headlines
const BODY_PART_HEADLINE = {
  Arms: "Arm",
  Back: "Back",
  Cardio: "Cardio",
  Chest: "Chest",
  Core: "Core",
  Legs: "Leg",
  Neck: "Neck",
  Shoulders: "Shoulder",
};

const EQUIPMENT_HEADLINE = {
  "Ab Wheel": "an Ab Wheel",
  Barbell: "a Barbell",
  "Body Weight": "Bodyweight",
  Cable: "a Cable Machine",
  "Cardio Machine": "a Cardio Machine",
  Dumbbell: "Dumbbells",
  "EZ Bar": "an EZ Bar",
  Kettlebell: "Kettlebells",
  Machine: "Machines",
  "Medicine Ball": "a Medicine Ball",
  "Resistance Band": "Resistance Bands",
  Rings: "Rings",
  "Smith Machine": "a Smith Machine",
  "Trap Bar": "a Trap Bar",
  Treadmill: "a Treadmill",
  "Weight Plate": "Weight Plates",
  "Jump Rope": "a Jump Rope",
};

// Hero descriptions for equipment pages
const EQUIPMENT_HERO_DESC = {
  "Ab Wheel": "Build a rock-solid core. Target your abs, obliques, and lower back with one of the most effective core training tools.",
  Barbell: "The foundation of any strength program. Master compound lifts and build total-body power with serious strength gains.",
  "Body Weight": "Train anywhere, anytime. No gym required — build strength, endurance, and flexibility using just your body.",
  Cable: "Constant tension training for isolation work. Build muscle through a full range of motion with precise control.",
  "Cardio Machine": "Boost your endurance and burn calories. Build cardiovascular fitness with treadmills, bikes, and more.",
  Dumbbell: "Versatile strength training for balanced muscle. Fix imbalances and train anywhere from home to the gym.",
  "EZ Bar": "Comfortable, effective arm training. The angled grip reduces wrist strain during curls and extensions.",
  Kettlebell: "Explosive power and conditioning. Combine strength and cardio in dynamic, full-body movements.",
  Machine: "Guided, safe resistance training. Ideal for beginners learning movement patterns or advanced lifters isolating muscles.",
  "Medicine Ball": "Explosive power and core strength. Add dynamic, athletic movements to your training routine.",
  "Resistance Band": "Portable, effective training. Build muscle and improve mobility anywhere — perfect for travel or home workouts.",
  Rings: "Elite upper body strength. Master bodyweight training with one of the most challenging tools in the gym.",
  "Smith Machine": "Controlled, stable lifting. Great for solo training when you need a spotter-free setup.",
  "Trap Bar": "Powerful hip-hinge movements. A joint-friendly alternative for deadlifts and carries that reduces lower back strain.",
};

// Utility functions
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function exerciseCount(count) {
  return count === 1 ? '1 exercise' : `${count} exercises`;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getExercisesByBodyPart(bodyPart) {
  return exercises.filter(e => e.bodyPart === bodyPart);
}

function getExercisesByEquipment(equipment) {
  return exercises.filter(e => e.equipment === equipment);
}

function getExercisesByTarget(target) {
  return exercises.filter(e => e.target === target);
}

function getExercisesByDifficulty(difficulty) {
  return exercises.filter(e => e.difficulty === difficulty);
}

function getExercisesByFilters(filters) {
  return exercises.filter(e => {
    if (filters.bodyPart && e.bodyPart !== filters.bodyPart) return false;
    if (filters.equipment && e.equipment !== filters.equipment) return false;
    return true;
  });
}

function getValidCombinations() {
  const combos = [];
  const bodyParts = [...new Set(exercises.map(e => e.bodyPart))];
  const equipmentTypes = [...new Set(exercises.map(e => e.equipment))];

  for (const bodyPart of bodyParts) {
    for (const equipment of equipmentTypes) {
      const count = exercises.filter(e => e.bodyPart === bodyPart && e.equipment === equipment).length;
      if (count >= 5) {
        combos.push({ bodyPart, equipment, count });
      }
    }
  }
  return combos;
}

// Markdown generators
function generateMainExercisesMarkdown() {
  const totalExercises = exercises.length;
  const bodyParts = [...new Set(exercises.map(e => e.bodyPart))].sort();
  const equipmentTypes = [...new Set(exercises.map(e => e.equipment))].sort();

  let md = `# Exercise Library - Forge

## Quick Answer

Forge's exercise library contains ${totalExercises}+ exercises with detailed instructions and form tips. Browse by body part, equipment type, difficulty level, or target muscle.

---

## Browse by Body Part

`;

  for (const bp of bodyParts) {
    const count = getExercisesByBodyPart(bp).length;
    md += `- **[${bp} Exercises](https://forgetrainer.ai/exercises/${BODY_PART_SLUGS[bp]})** (${exerciseCount(count)})\n`;
  }

  md += `
---

## Browse by Equipment

`;

  for (const eq of equipmentTypes) {
    const count = getExercisesByEquipment(eq).length;
    md += `- **[${eq} Exercises](https://forgetrainer.ai/exercises/equipment/${EQUIPMENT_SLUGS[eq]})** (${exerciseCount(count)})\n`;
  }

  md += `
---

## Browse by Difficulty

- **[Beginner Exercises](https://forgetrainer.ai/exercises/beginner)** (${exerciseCount(getExercisesByDifficulty('Beginner').length)})
- **[Intermediate Exercises](https://forgetrainer.ai/exercises/intermediate)** (${exerciseCount(getExercisesByDifficulty('Intermediate').length)})
- **[Advanced Exercises](https://forgetrainer.ai/exercises/advanced)** (${exerciseCount(getExercisesByDifficulty('Advanced').length)})

---

## About Forge

Forge is a personal trainer in your pocket. Our AI trainers create custom workout plans using exercises from this library, tailored to your goals, schedule, and available equipment.

**[Join the Waitlist](https://forgetrainer.ai/?scrollTo=waitlist)**

---

*Forge - Personal training for everyone.*
*Website: https://forgetrainer.ai*
`;

  return md;
}

function generateEquipmentMarkdown(equipment) {
  const equipmentExercises = getExercisesByEquipment(equipment);
  const slug = EQUIPMENT_SLUGS[equipment];
  const count = equipmentExercises.length;

  // Group by body part
  const byBodyPart = {};
  for (const e of equipmentExercises) {
    if (!byBodyPart[e.bodyPart]) byBodyPart[e.bodyPart] = [];
    byBodyPart[e.bodyPart].push(e);
  }

  let md = `# ${equipment} Exercises - Forge

## Quick Answer

${count} ${equipment.toLowerCase()} ${count === 1 ? 'exercise' : 'exercises'}. ${EQUIPMENT_HERO_DESC[equipment]}

---

## All ${equipment} Exercises by Body Part

`;

  for (const [bp, exs] of Object.entries(byBodyPart).sort((a, b) => a[0].localeCompare(b[0]))) {
    md += `### ${bp} (${exerciseCount(exs.length)})\n\n`;
    for (const e of exs.sort((a, b) => (b.popularity || 3) - (a.popularity || 3))) {
      md += `- **${e.name}** — ${e.difficulty} | Target: ${e.target}\n`;
    }
    md += `\n`;
  }

  md += `---

## Get Custom ${equipment} Workouts

Our AI trainers create personalized workout plans based on your available equipment. Tell us what you have, and we'll build the perfect program.

**[Join the Waitlist](https://forgetrainer.ai/?scrollTo=waitlist)**

---

*Forge - Personal training for everyone.*
*Website: https://forgetrainer.ai*
`;

  return md;
}

function generateBodyPartMarkdown(bodyPart) {
  const bpExercises = getExercisesByBodyPart(bodyPart);
  const slug = BODY_PART_SLUGS[bodyPart];
  const count = bpExercises.length;
  const headline = BODY_PART_HEADLINE[bodyPart];

  // Group by equipment
  const byEquipment = {};
  for (const e of bpExercises) {
    if (!byEquipment[e.equipment]) byEquipment[e.equipment] = [];
    byEquipment[e.equipment].push(e);
  }

  let md = `# ${headline} Exercises - Forge

## Quick Answer

${count} exercises targeting your ${bodyPart.toLowerCase()}. Build strength and muscle with exercises organized by equipment type.

---

## All ${headline} Exercises by Equipment

`;

  for (const [eq, exs] of Object.entries(byEquipment).sort((a, b) => a[0].localeCompare(b[0]))) {
    md += `### ${eq} (${exerciseCount(exs.length)})\n\n`;
    for (const e of exs.sort((a, b) => (b.popularity || 3) - (a.popularity || 3))) {
      md += `- **${e.name}** — ${e.difficulty} | Target: ${e.target}\n`;
    }
    md += `\n`;
  }

  md += `---

## Build Your ${bodyPart} with Forge

Get a personalized ${headline.toLowerCase()} workout plan from our AI trainers, tailored to your goals and available equipment.

**[Join the Waitlist](https://forgetrainer.ai/?scrollTo=waitlist)**

---

*Forge - Personal training for everyone.*
*Website: https://forgetrainer.ai*
`;

  return md;
}

function generateComboMarkdown(bodyPart, equipment) {
  const comboExercises = getExercisesByFilters({ bodyPart, equipment });
  const bpSlug = BODY_PART_SLUGS[bodyPart];
  const eqSlug = EQUIPMENT_SLUGS[equipment];
  const count = comboExercises.length;
  const bpHeadline = BODY_PART_HEADLINE[bodyPart];
  const eqHeadline = EQUIPMENT_HEADLINE[equipment];

  // Difficulty breakdown
  const beginner = comboExercises.filter(e => e.difficulty === 'Beginner').length;
  const intermediate = comboExercises.filter(e => e.difficulty === 'Intermediate').length;
  const advanced = comboExercises.filter(e => e.difficulty === 'Advanced').length;

  let md = `# ${bpHeadline} Exercises with ${eqHeadline} - Forge

## Quick Answer

${count} effective ${bpHeadline.toLowerCase()} exercises you can do with ${equipment === 'Body Weight' ? 'no equipment' : equipment.toLowerCase()}. Complete instructions and form tips included.

**Difficulty breakdown:** ${beginner} Beginner | ${intermediate} Intermediate | ${advanced} Advanced

---

## All ${bpHeadline} ${equipment} Exercises

`;

  // Group by difficulty
  const byDifficulty = { Beginner: [], Intermediate: [], Advanced: [] };
  for (const e of comboExercises) {
    byDifficulty[e.difficulty].push(e);
  }

  for (const diff of ['Beginner', 'Intermediate', 'Advanced']) {
    if (byDifficulty[diff].length > 0) {
      md += `### ${diff} (${byDifficulty[diff].length} exercises)\n\n`;
      for (const e of byDifficulty[diff].sort((a, b) => (b.popularity || 3) - (a.popularity || 3))) {
        md += `- **${e.name}** — Target: ${e.target}`;
        if (e.secondaryMuscles && e.secondaryMuscles.length > 0) {
          md += ` | Secondary: ${e.secondaryMuscles.join(', ')}`;
        }
        md += `\n`;
      }
      md += `\n`;
    }
  }

  md += `---

## Get a Custom ${bpHeadline} Workout

Our AI trainers design personalized ${bpHeadline.toLowerCase()} workout plans using ${equipment === 'Body Weight' ? 'bodyweight exercises' : equipment.toLowerCase()}. Built for your specific goals.

**[Join the Waitlist](https://forgetrainer.ai/?scrollTo=waitlist)**

---

*Forge - Personal training for everyone.*
*Website: https://forgetrainer.ai*
`;

  return md;
}

function generateDifficultyMarkdown(difficulty) {
  const diffExercises = getExercisesByDifficulty(difficulty);
  const count = diffExercises.length;

  // Group by body part
  const byBodyPart = {};
  for (const e of diffExercises) {
    if (!byBodyPart[e.bodyPart]) byBodyPart[e.bodyPart] = [];
    byBodyPart[e.bodyPart].push(e);
  }

  const diffDesc = {
    Beginner: "Perfect for those new to fitness or returning after a break. These exercises focus on fundamental movement patterns with lower complexity.",
    Intermediate: "For regular gym-goers ready to progress. These exercises require good form and moderate strength or coordination.",
    Advanced: "Challenging exercises for experienced lifters. These require significant strength, mobility, or skill to perform safely."
  };

  let md = `# ${difficulty} Exercises - Forge

## Quick Answer

${count} ${difficulty.toLowerCase()}-level ${count === 1 ? 'exercise' : 'exercises'}. ${diffDesc[difficulty]}

---

## All ${difficulty} Exercises by Body Part

`;

  for (const [bp, exs] of Object.entries(byBodyPart).sort((a, b) => a[0].localeCompare(b[0]))) {
    md += `### ${bp} (${exerciseCount(exs.length)})\n\n`;
    for (const e of exs.sort((a, b) => (b.popularity || 3) - (a.popularity || 3))) {
      md += `- **${e.name}** — ${e.equipment} | Target: ${e.target}\n`;
    }
    md += `\n`;
  }

  md += `---

## Train at Your Level with Forge

Our AI trainers create workout plans matched to your fitness level, progressing you safely as you get stronger.

**[Join the Waitlist](https://forgetrainer.ai/?scrollTo=waitlist)**

---

*Forge - Personal training for everyone.*
*Website: https://forgetrainer.ai*
`;

  return md;
}

function generateTargetMarkdown(target) {
  const targetExercises = getExercisesByTarget(target);
  const slug = TARGET_SLUGS[target];
  const count = targetExercises.length;

  // Group by equipment
  const byEquipment = {};
  for (const e of targetExercises) {
    if (!byEquipment[e.equipment]) byEquipment[e.equipment] = [];
    byEquipment[e.equipment].push(e);
  }

  let md = `# ${target} Exercises - Forge

## Quick Answer

${count} exercises targeting your ${target.toLowerCase()}. Build strength and muscle with exercises organized by equipment type.

---

## All ${target} Exercises by Equipment

`;

  for (const [eq, exs] of Object.entries(byEquipment).sort((a, b) => a[0].localeCompare(b[0]))) {
    md += `### ${eq} (${exerciseCount(exs.length)})\n\n`;
    for (const e of exs.sort((a, b) => (b.popularity || 3) - (a.popularity || 3))) {
      md += `- **${e.name}** — ${e.difficulty} | Body Part: ${e.bodyPart}\n`;
    }
    md += `\n`;
  }

  md += `---

## Build Your ${target} with Forge

Get a personalized workout plan from our AI trainers, tailored to your goals and available equipment.

**[Join the Waitlist](https://forgetrainer.ai/?scrollTo=waitlist)**

---

*Forge - Personal training for everyone.*
*Website: https://forgetrainer.ai*
`;

  return md;
}

function generateIndividualExerciseMarkdown(exercise) {
  const slug = slugify(exercise.name);
  const bpSlug = BODY_PART_SLUGS[exercise.bodyPart];
  const eqSlug = EQUIPMENT_SLUGS[exercise.equipment];
  const enrichment = enrichmentData[slug];

  let md = `# ${exercise.name}

## Quick answer

${exercise.description} ${exercise.difficulty} ${exercise.bodyPart.toLowerCase()} exercise using ${exercise.equipment.toLowerCase()}. Targets ${exercise.target.toLowerCase()}${exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 ? `, also works ${exercise.secondaryMuscles.join(', ').toLowerCase()}` : ''}.

- **Body Part:** ${exercise.bodyPart}
- **Equipment:** ${exercise.equipment}
- **Target Muscle:** ${exercise.target}
${exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 ? `- **Secondary Muscles:** ${exercise.secondaryMuscles.join(', ')}` : ''}
- **Difficulty:** ${exercise.difficulty}
- **Category:** ${exercise.category}

---

## How to perform

`;

  if (exercise.instructions && exercise.instructions.length > 0) {
    exercise.instructions.forEach((step, index) => {
      md += `${index + 1}. ${step}\n`;
    });
  }

  // Pro tips
  if (enrichment && enrichment.tips && enrichment.tips.length > 0) {
    md += `\n## Pro tips\n\n`;
    for (const tip of enrichment.tips) {
      md += `- ${tip}\n`;
    }
  }

  // Common mistakes
  if (enrichment && enrichment.commonMistakes && enrichment.commonMistakes.length > 0) {
    md += `\n## Common mistakes\n\n`;
    for (const mistake of enrichment.commonMistakes) {
      md += `- ${mistake}\n`;
    }
  }

  // FAQ
  md += `\n## FAQ\n\n`;

  // Enrichment FAQs
  if (enrichment && enrichment.faqs && enrichment.faqs.length > 0) {
    for (const faq of enrichment.faqs) {
      md += `### ${faq.q}\n\n${faq.a}\n\n`;
    }
  }

  // Dynamic FAQs
  md += `### What muscles does the ${exercise.name} work?\n\n`;
  md += `The ${exercise.name} primarily targets the ${exercise.target.toLowerCase()}`;
  if (exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0) {
    md += `, with secondary activation in the ${exercise.secondaryMuscles.join(', ').toLowerCase()}`;
  }
  md += `. It's classified as a ${exercise.category.toLowerCase()} exercise for the ${exercise.bodyPart.toLowerCase()}.\n\n`;

  md += `### Is the ${exercise.name} good for beginners?\n\n`;
  if (exercise.difficulty === 'Beginner') {
    md += `Yes, the ${exercise.name} is rated as a beginner-level exercise. It's a great starting point for building ${exercise.target.toLowerCase()} strength.\n\n`;
  } else if (exercise.difficulty === 'Intermediate') {
    md += `The ${exercise.name} is rated as intermediate. Beginners should build a base of ${exercise.target.toLowerCase()} strength with easier variations first.\n\n`;
  } else {
    md += `The ${exercise.name} is an advanced exercise. Beginners should master fundamental ${exercise.bodyPart.toLowerCase()} movements first.\n\n`;
  }

  md += `## Related exercises

- [More ${exercise.bodyPart} Exercises](https://forgetrainer.ai/exercises/${bpSlug})
- [More ${exercise.equipment} Exercises](https://forgetrainer.ai/exercises/equipment/${eqSlug})
- [More ${exercise.target} Exercises](https://forgetrainer.ai/exercises/muscle/${TARGET_SLUGS[exercise.target] || slugify(exercise.target)})

---

Get a personalized workout plan with [Forge](https://forgetrainer.ai).
`;

  return md;
}

function generateComparisonMarkdown(exercise1, exercise2) {
  let md = `# ${exercise1.name} vs ${exercise2.name}

## Quick answer

${exercise1.name} targets the ${exercise1.target.toLowerCase()} using ${exercise1.equipment.toLowerCase()} (${exercise1.difficulty}), while ${exercise2.name} targets the ${exercise2.target.toLowerCase()} using ${exercise2.equipment.toLowerCase()} (${exercise2.difficulty}).

---

## Comparison

| Attribute | ${exercise1.name} | ${exercise2.name} |
|-----------|${'-'.repeat(exercise1.name.length + 2)}|${'-'.repeat(exercise2.name.length + 2)}|
| Body Part | ${exercise1.bodyPart} | ${exercise2.bodyPart} |
| Target | ${exercise1.target} | ${exercise2.target} |
| Equipment | ${exercise1.equipment} | ${exercise2.equipment} |
| Difficulty | ${exercise1.difficulty} | ${exercise2.difficulty} |
| Category | ${exercise1.category} | ${exercise2.category} |
| Secondary | ${(exercise1.secondaryMuscles || []).join(', ') || 'None'} | ${(exercise2.secondaryMuscles || []).join(', ') || 'None'} |

## FAQ

### What's the difference between ${exercise1.name} and ${exercise2.name}?

${exercise1.name} targets the ${exercise1.target.toLowerCase()} using ${exercise1.equipment.toLowerCase()}, while ${exercise2.name} targets the ${exercise2.target.toLowerCase()} using ${exercise2.equipment.toLowerCase()}.

### Which is better for beginners?

${exercise1.difficulty === 'Beginner' ? `${exercise1.name} is beginner-friendly.` : exercise2.difficulty === 'Beginner' ? `${exercise2.name} is better for beginners.` : 'Both exercises require some training experience.'}

### Can I do both in the same workout?

Yes, you can include both exercises in your routine${exercise1.bodyPart === exercise2.bodyPart ? ` since they both target ${exercise1.bodyPart.toLowerCase()}` : ''}. Alternate between them to work your muscles from different angles.

---

- [${exercise1.name} Guide](https://forgetrainer.ai/exercise/${slugify(exercise1.name)})
- [${exercise2.name} Guide](https://forgetrainer.ai/exercise/${slugify(exercise2.name)})

Get a personalized workout plan with [Forge](https://forgetrainer.ai).
`;

  return md;
}

// Main execution
function main() {
  console.log('Generating exercise markdown files...\n');

  // Ensure directories exist
  ensureDir(outputDir);
  ensureDir(path.join(outputDir, 'equipment'));
  ensureDir(path.join(outputDir, 'muscle'));

  let fileCount = 0;

  // 1. Main exercises page
  const mainMd = generateMainExercisesMarkdown();
  fs.writeFileSync(path.join(__dirname, '../public/markdown/exercises.md'), mainMd);
  console.log('Created: exercises.md');
  fileCount++;

  // 2. Equipment pages
  const equipmentTypes = [...new Set(exercises.map(e => e.equipment))];
  for (const equipment of equipmentTypes) {
    const md = generateEquipmentMarkdown(equipment);
    const slug = EQUIPMENT_SLUGS[equipment];
    fs.writeFileSync(path.join(outputDir, 'equipment', `${slug}.md`), md);
    console.log(`Created: exercises/equipment/${slug}.md`);
    fileCount++;
  }

  // 3. Body part pages
  const bodyParts = [...new Set(exercises.map(e => e.bodyPart))];
  for (const bodyPart of bodyParts) {
    const md = generateBodyPartMarkdown(bodyPart);
    const slug = BODY_PART_SLUGS[bodyPart];
    ensureDir(path.join(outputDir, slug));
    fs.writeFileSync(path.join(outputDir, `${slug}.md`), md);
    console.log(`Created: exercises/${slug}.md`);
    fileCount++;
  }

  // 4. Combo pages (body part + equipment with 5+ exercises)
  const validCombos = getValidCombinations();
  for (const combo of validCombos) {
    const md = generateComboMarkdown(combo.bodyPart, combo.equipment);
    const bpSlug = BODY_PART_SLUGS[combo.bodyPart];
    const eqSlug = EQUIPMENT_SLUGS[combo.equipment];
    ensureDir(path.join(outputDir, bpSlug));
    fs.writeFileSync(path.join(outputDir, bpSlug, `${eqSlug}.md`), md);
    console.log(`Created: exercises/${bpSlug}/${eqSlug}.md`);
    fileCount++;
  }

  // 5. Difficulty pages
  for (const difficulty of ['beginner', 'intermediate', 'advanced']) {
    const md = generateDifficultyMarkdown(difficulty.charAt(0).toUpperCase() + difficulty.slice(1));
    fs.writeFileSync(path.join(outputDir, `${difficulty}.md`), md);
    console.log(`Created: exercises/${difficulty}.md`);
    fileCount++;
  }

  // 6. Target muscle pages
  const targets = [...new Set(exercises.map(e => e.target))];
  for (const target of targets) {
    const md = generateTargetMarkdown(target);
    const slug = TARGET_SLUGS[target];
    if (slug) {
      fs.writeFileSync(path.join(outputDir, 'muscle', `${slug}.md`), md);
      console.log(`Created: exercises/muscle/${slug}.md`);
      fileCount++;
    }
  }

  // 7. Individual exercise pages (in /exercise/ not /exercises/)
  const individualDir = path.join(__dirname, '../public/markdown/exercise');
  ensureDir(individualDir);
  for (const exercise of exercises) {
    const md = generateIndividualExerciseMarkdown(exercise);
    const slug = slugify(exercise.name);
    fs.writeFileSync(path.join(individualDir, `${slug}.md`), md);
    fileCount++;
  }
  console.log(`Created: ${exercises.length} individual exercise pages in exercise/`);

  // 8. Comparison pages
  const compareDir = path.join(individualDir, 'compare');
  ensureDir(compareDir);
  const exerciseSlugMap = {};
  for (const e of exercises) {
    exerciseSlugMap[slugify(e.name)] = e;
  }
  let comparisonCount = 0;
  for (const [slug1, slug2] of COMPARISON_PAIRS) {
    const e1 = exerciseSlugMap[slug1];
    const e2 = exerciseSlugMap[slug2];
    if (e1 && e2) {
      const md = generateComparisonMarkdown(e1, e2);
      fs.writeFileSync(path.join(compareDir, `${slug1}-vs-${slug2}.md`), md);
      comparisonCount++;
      fileCount++;
    }
  }
  console.log(`Created: ${comparisonCount} comparison pages in exercise/compare/`);

  console.log(`\nDone! Generated ${fileCount} markdown files.`);
}

main();
