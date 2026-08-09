import type { Metadata } from "next";
import WilksCalculator from "./WilksCalculator";

export const metadata: Metadata = {
  title: "Wilks Calculator - Original and 2020 Scores for Any Total",
  description:
    "Free Wilks calculator for powerlifters. Enter your bodyweight and total or individual lifts to get your original Wilks and Wilks 2020 scores side by side.",
  keywords: [
    "wilks calculator",
    "wilks score",
    "wilks 2020 calculator",
    "powerlifting score",
    "pound for pound calculator",
    "powerlifting total",
  ],
  openGraph: {
    title: "Wilks Calculator - Original and 2020 Scores | Forge",
    description:
      "Enter your bodyweight and total to see your original Wilks and Wilks 2020 scores side by side.",
    url: "https://forgetrainer.ai/tools/wilks-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wilks Calculator - Original and 2020 Scores | Forge",
    description:
      "Enter your bodyweight and total to see your original Wilks and Wilks 2020 scores side by side.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/wilks-calculator",
    types: { "text/markdown": "/markdown/tools/wilks-calculator.md" },
  },
};

export default function WilksCalculatorPage() {
  return <WilksCalculator />;
}
