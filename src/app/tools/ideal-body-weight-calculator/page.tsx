import type { Metadata } from "next";
import IdealBodyWeightCalculator from "./IdealBodyWeightCalculator";

export const metadata: Metadata = {
  title: "Ideal Body Weight Calculator - Devine, Robinson, Miller, Hamwi",
  description:
    "Free ideal body weight calculator. Enter your height to see the Devine, Robinson, Miller, and Hamwi formulas side by side, with honest context for lifters.",
  keywords: [
    "ideal body weight calculator",
    "devine formula",
    "robinson formula",
    "hamwi formula",
    "miller formula",
    "healthy weight for height",
  ],
  openGraph: {
    title: "Ideal Body Weight Calculator - 4 Formulas Compared | Forge",
    description:
      "See the Devine, Robinson, Miller, and Hamwi estimates side by side, plus honest context on when lifters outgrow them.",
    url: "https://forgetrainer.ai/tools/ideal-body-weight-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideal Body Weight Calculator - 4 Formulas Compared | Forge",
    description:
      "See the Devine, Robinson, Miller, and Hamwi estimates side by side, plus honest context on when lifters outgrow them.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/ideal-body-weight-calculator",
    types: { "text/markdown": "/markdown/tools/ideal-body-weight-calculator.md" },
  },
};

export default function IdealBodyWeightCalculatorPage() {
  return <IdealBodyWeightCalculator />;
}
