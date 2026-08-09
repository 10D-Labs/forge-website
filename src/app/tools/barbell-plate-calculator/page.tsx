import type { Metadata } from "next";
import BarbellPlateCalculator from "./BarbellPlateCalculator";

export const metadata: Metadata = {
  title: "Barbell Plate Calculator - What to Load for Any Weight",
  description:
    "Free barbell plate calculator. Type a target weight and get the exact plates per side with a visual of the loaded bar, or tap plates to count a total. kg and lb.",
  keywords: [
    "barbell plate calculator",
    "plate calculator",
    "what plates to load",
    "barbell math",
    "plate loading chart",
    "kg plate calculator",
  ],
  openGraph: {
    title: "Barbell Plate Calculator - What to Load for Any Weight | Forge",
    description:
      "Type a target weight and get the exact plates per side, or tap the plates on the bar to count the total. Works in kg and lb.",
    url: "https://forgetrainer.ai/tools/barbell-plate-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barbell Plate Calculator - What to Load for Any Weight | Forge",
    description:
      "Type a target weight and get the exact plates per side, or tap the plates on the bar to count the total. Works in kg and lb.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/barbell-plate-calculator",
    types: { "text/markdown": "/markdown/tools/barbell-plate-calculator.md" },
  },
};

export default function BarbellPlateCalculatorPage() {
  return <BarbellPlateCalculator />;
}
