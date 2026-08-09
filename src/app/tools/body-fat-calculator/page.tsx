import type { Metadata } from "next";
import BodyFatCalculator from "./BodyFatCalculator";

export const metadata: Metadata = {
  title: "Body Fat Calculator - Navy Tape Method + Quick Estimate",
  description:
    "Free body fat calculator using the US Navy tape method or a quick BMI-based estimate. See your body fat percentage, fat mass, lean mass, and ACE category.",
  keywords: [
    "body fat calculator",
    "navy body fat calculator",
    "body fat percentage",
    "tape measure body fat",
    "lean mass calculator",
    "ace body fat chart",
  ],
  openGraph: {
    title: "Body Fat Calculator - Navy Tape Method + Quick Estimate | Forge",
    description:
      "Estimate your body fat percentage with a tape measure or a quick height and weight estimate, plus fat mass, lean mass, and your ACE category.",
    url: "https://forgetrainer.ai/tools/body-fat-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Fat Calculator - Navy Tape Method + Quick Estimate | Forge",
    description:
      "Estimate your body fat percentage with a tape measure or a quick height and weight estimate, plus fat mass, lean mass, and your ACE category.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/body-fat-calculator",
    types: { "text/markdown": "/markdown/tools/body-fat-calculator.md" },
  },
};

export default function BodyFatCalculatorPage() {
  return <BodyFatCalculator />;
}
