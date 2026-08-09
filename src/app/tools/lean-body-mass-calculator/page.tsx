import type { Metadata } from "next";
import LeanBodyMassCalculator from "./LeanBodyMassCalculator";

export const metadata: Metadata = {
  title: "Lean Body Mass Calculator - LBM & FFMI (Boer, Hume, James)",
  description:
    "Free lean body mass calculator. Estimate LBM from your body fat percentage or with the Boer, Hume, and James formulas, plus fat mass and FFMI with honest context.",
  keywords: [
    "lean body mass calculator",
    "lbm calculator",
    "ffmi calculator",
    "boer formula",
    "fat free mass index",
    "muscle mass calculator",
  ],
  openGraph: {
    title: "Lean Body Mass Calculator - LBM & FFMI | Forge",
    description:
      "Calculate lean body mass from your body fat percentage or with the Boer, Hume, and James formulas, plus FFMI with honest context.",
    url: "https://forgetrainer.ai/tools/lean-body-mass-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lean Body Mass Calculator - LBM & FFMI | Forge",
    description:
      "Calculate lean body mass from your body fat percentage or with the Boer, Hume, and James formulas, plus FFMI with honest context.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/lean-body-mass-calculator",
    types: { "text/markdown": "/markdown/tools/lean-body-mass-calculator.md" },
  },
};

export default function LeanBodyMassCalculatorPage() {
  return <LeanBodyMassCalculator />;
}
