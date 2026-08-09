import type { Metadata } from "next";
import WarmUpCalculator from "./WarmUpCalculator";

export const metadata: Metadata = {
  title: "Warm-Up Calculator - Exact Ramp Sets for Any Working Weight",
  description:
    "Free warm-up calculator. Enter a working weight and get a ready-to-run ramp: exact warm-up loads and reps from the empty bar to your first work set.",
  keywords: [
    "warm up calculator",
    "warm-up sets calculator",
    "lifting warm up",
    "ramp up sets",
    "warm up before lifting",
  ],
  openGraph: {
    title: "Warm-Up Calculator - Ramp to Any Working Weight | Forge",
    description:
      "Enter a working weight and get exact warm-up sets, reps, and loads from the empty bar to your first work set.",
    url: "https://forgetrainer.ai/tools/warm-up-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warm-Up Calculator - Ramp to Any Working Weight | Forge",
    description:
      "Enter a working weight and get exact warm-up sets, reps, and loads from the empty bar to your first work set.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/warm-up-calculator",
    types: { "text/markdown": "/markdown/tools/warm-up-calculator.md" },
  },
};

export default function WarmUpCalculatorPage() {
  return <WarmUpCalculator />;
}
