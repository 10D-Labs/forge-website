import type { Metadata } from "next";
import OneRepMaxCalculator from "./OneRepMaxCalculator";

export const metadata: Metadata = {
  title: "1RM Calculator - Estimate Your One-Rep Max (7 Formulas)",
  description:
    "Free one-rep max calculator. Enter the weight and reps from any set, add reps in reserve, and see your estimated 1RM across seven formulas plus the right load for every rep count.",
  keywords: [
    "1rm calculator",
    "one rep max calculator",
    "estimate 1rm",
    "epley formula",
    "brzycki formula",
    "rep max calculator",
  ],
  openGraph: {
    title: "1RM Calculator - Estimate Your One-Rep Max | Forge",
    description:
      "Enter any set and see your estimated one-rep max across seven proven formulas, plus the load for every rep count.",
    url: "https://forgetrainer.ai/tools/1rm-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "1RM Calculator - Estimate Your One-Rep Max | Forge",
    description:
      "Enter any set and see your estimated one-rep max across seven proven formulas, plus the load for every rep count.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/1rm-calculator",
    types: { "text/markdown": "/markdown/tools/1rm-calculator.md" },
  },
};

export default function OneRepMaxCalculatorPage() {
  return <OneRepMaxCalculator />;
}
