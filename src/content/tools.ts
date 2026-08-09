export interface ToolEntry {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  keywords: string[];
}

// Drives the /tools hub and the Related Tools section on each tool page.
export const tools: ToolEntry[] = [
  {
    slug: "1rm-calculator",
    name: "1RM Calculator",
    tagline: "Estimate your one-rep max",
    description:
      "Enter any set, weight, reps, and how close to failure you went. See your max across seven proven formulas plus the right load for every rep count.",
    keywords: ["1RM", "7 formulas", "reps in reserve", "load chart"],
  },
  {
    slug: "barbell-plate-calculator",
    name: "Barbell Plate Calculator",
    tagline: "Plate math for any target weight",
    description:
      "Type a target weight and get the exact plates per side, or tap the plates already on the bar to count the total. Works in kg and lb.",
    keywords: ["plates", "bar math", "kg and lb", "reverse count"],
  },
  {
    slug: "weightlifting-percentage-chart",
    name: "Weightlifting Percentage Chart",
    tagline: "Every training load from your max",
    description:
      "Turn your one-rep max into working weights from 100% down to 30%, with the reps and training zone for each percentage. One lift or the big four at once.",
    keywords: ["% of 1RM", "training loads", "zones", "big four"],
  },
  {
    slug: "warm-up-calculator",
    name: "Warm-Up Calculator",
    tagline: "A ramp to any working weight",
    description:
      "Enter your working weight and get a ready-to-run warm-up: sets, reps, and loads from the empty bar to your first work set.",
    keywords: ["warm-up", "ramp", "sets and reps", "powerlifting"],
  },
  {
    slug: "rpe-calculator",
    name: "RPE Calculator",
    tagline: "Plan a set at any effort",
    description:
      "Pair your estimated max with a target RPE and rep count to get your working weight. Full RPE chart with reps in reserve translated to plain language.",
    keywords: ["RPE", "RIR", "target load", "backoff sets"],
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    tagline: "Estimate body fat at home",
    description:
      "Use the US Navy tape method with a measuring tape, or a quick height-and-weight estimate. See fat mass, lean mass, and where you land.",
    keywords: ["body fat %", "Navy method", "tape measure", "lean mass"],
  },
  {
    slug: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    tagline: "How much of you is muscle",
    description:
      "Calculate lean body mass from your body fat percentage, or estimate it with the Boer, Hume, and James formulas. Includes FFMI with honest context.",
    keywords: ["LBM", "FFMI", "Boer", "body composition"],
  },
  {
    slug: "training-volume-calculator",
    name: "Training Volume Calculator",
    tagline: "Are you training enough to grow",
    description:
      "Enter your weekly hard sets per muscle group and see which muscles sit below the growth floor, inside the productive range, or past what you can recover from.",
    keywords: ["weekly sets", "per muscle", "growth floor", "recovery"],
  },
  {
    slug: "dots-calculator",
    name: "DOTS Calculator",
    tagline: "Compare strength across weight classes",
    description:
      "Score your powerlifting total with the DOTS formula, the modern standard for pound-for-pound comparisons across bodyweights and sexes.",
    keywords: ["DOTS", "powerlifting", "total", "pound for pound"],
  },
  {
    slug: "wilks-calculator",
    name: "Wilks Calculator",
    tagline: "The classic pound-for-pound score",
    description:
      "Score your powerlifting total with the original Wilks formula and the 2020 update. Useful for older meet results and historical comparisons.",
    keywords: ["Wilks", "Wilks 2020", "powerlifting", "total"],
  },
  {
    slug: "ideal-body-weight-calculator",
    name: "Ideal Body Weight Calculator",
    tagline: "The classic formulas, with context",
    description:
      "Run the Devine, Robinson, Miller, and Hamwi formulas side by side, then see why anyone who lifts should treat the answer with suspicion.",
    keywords: ["Devine", "Robinson", "Miller", "Hamwi"],
  },
  {
    slug: "personal-trainer-cost-calculator",
    name: "Personal Trainer Cost Calculator",
    tagline: "What a human trainer really costs",
    description:
      "Estimate what a personal trainer costs per session, month, and year in your city, then see how much you would save with an AI trainer.",
    keywords: ["trainer cost", "per session", "savings"],
  },
];
