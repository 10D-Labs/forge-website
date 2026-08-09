import type { Metadata } from "next";
import DotsCalculator from "./DotsCalculator";

export const metadata: Metadata = {
  title: "DOTS Calculator - Powerlifting Strength by Bodyweight",
  description:
    "Free DOTS calculator for powerlifting. Enter your bodyweight and total or squat, bench, and deadlift to score your strength pound for pound across weight classes.",
  keywords: [
    "dots calculator",
    "dots score",
    "powerlifting calculator",
    "pound for pound strength",
    "wilks vs dots",
    "powerlifting total calculator",
  ],
  openGraph: {
    title: "DOTS Calculator - Powerlifting Strength by Bodyweight | Forge",
    description:
      "Score your powerlifting total with the DOTS formula, the modern standard for pound-for-pound comparisons across bodyweights.",
    url: "https://forgetrainer.ai/tools/dots-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOTS Calculator - Powerlifting Strength by Bodyweight | Forge",
    description:
      "Score your powerlifting total with the DOTS formula, the modern standard for pound-for-pound comparisons across bodyweights.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/dots-calculator",
    types: { "text/markdown": "/markdown/tools/dots-calculator.md" },
  },
};

export default function DotsCalculatorPage() {
  return <DotsCalculator />;
}
