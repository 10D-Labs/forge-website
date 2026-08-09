import type { Metadata } from "next";
import TrainingVolumeCalculator from "./TrainingVolumeCalculator";

export const metadata: Metadata = {
  title: "Training Volume Calculator - Weekly Sets Per Muscle Group",
  description:
    "Free training volume calculator. Enter weekly hard sets per muscle and see which muscles sit below the growth floor, in the productive range, or past recovery.",
  keywords: [
    "training volume calculator",
    "weekly sets per muscle",
    "sets per muscle group",
    "volume landmarks",
    "hypertrophy volume",
    "how many sets to build muscle",
  ],
  openGraph: {
    title: "Training Volume Calculator - Weekly Sets Per Muscle | Forge",
    description:
      "Enter your weekly hard sets per muscle group and see which muscles sit below the growth floor, inside the productive range, or past what you can recover from.",
    url: "https://forgetrainer.ai/tools/training-volume-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Training Volume Calculator - Weekly Sets Per Muscle | Forge",
    description:
      "Enter your weekly hard sets per muscle group and see which muscles sit below the growth floor, inside the productive range, or past what you can recover from.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/training-volume-calculator",
    types: { "text/markdown": "/markdown/tools/training-volume-calculator.md" },
  },
};

export default function TrainingVolumeCalculatorPage() {
  return <TrainingVolumeCalculator />;
}
