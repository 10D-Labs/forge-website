import type { Metadata } from "next";
import WeightliftingPercentageChart from "./WeightliftingPercentageChart";

export const metadata: Metadata = {
  title: "Weightlifting Percentage Chart - Every Load From Your Max",
  description:
    "Free weightlifting percentage chart. Turn your one-rep max into working weights from 100% down to 30%, with reps and training zones. One lift or the big four.",
  keywords: [
    "weightlifting percentage chart",
    "percentage of 1rm chart",
    "1rm percentage calculator",
    "training load chart",
    "powerlifting percentage chart",
    "rep max chart",
  ],
  openGraph: {
    title: "Weightlifting Percentage Chart - Every Load From Your Max | Forge",
    description:
      "Turn your one-rep max into working weights from 100% down to 30%, with the reps and training zone for each row.",
    url: "https://forgetrainer.ai/tools/weightlifting-percentage-chart",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weightlifting Percentage Chart - Every Load From Your Max | Forge",
    description:
      "Turn your one-rep max into working weights from 100% down to 30%, with the reps and training zone for each row.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/weightlifting-percentage-chart",
    types: { "text/markdown": "/markdown/tools/weightlifting-percentage-chart.md" },
  },
};

export default function WeightliftingPercentageChartPage() {
  return <WeightliftingPercentageChart />;
}
