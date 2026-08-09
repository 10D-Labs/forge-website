import type { Metadata } from "next";
import RpeCalculator from "./RpeCalculator";

export const metadata: Metadata = {
  title: "RPE Calculator - Working Weight for Any Reps and Effort",
  description:
    "Free RPE calculator. Pair your estimated max with a target RPE and reps to get your working weight, plus reps in reserve explained in plain language.",
  keywords: [
    "rpe calculator",
    "rpe chart",
    "reps in reserve",
    "rir calculator",
    "rts rpe chart",
  ],
  openGraph: {
    title: "RPE Calculator - Plan a Set at Any Effort | Forge",
    description:
      "Pair your estimated max with a target RPE and rep count to get your working weight. Full RPE chart included.",
    url: "https://forgetrainer.ai/tools/rpe-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "RPE Calculator - Plan a Set at Any Effort | Forge",
    description:
      "Pair your estimated max with a target RPE and rep count to get your working weight. Full RPE chart included.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/rpe-calculator",
    types: { "text/markdown": "/markdown/tools/rpe-calculator.md" },
  },
};

export default function RpeCalculatorPage() {
  return <RpeCalculator />;
}
