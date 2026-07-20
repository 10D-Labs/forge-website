import type { Metadata } from "next";
import PersonalTrainerCostCalculator from "./PersonalTrainerCostCalculator";

export const metadata: Metadata = {
  title: "Personal Trainer Cost Calculator (2026) - What You'll Really Pay",
  description:
    "Free personal trainer cost calculator. Estimate what a personal trainer costs per session, month, and year by trainer type and city, then see how much you'd save with an AI trainer.",
  keywords: [
    "personal trainer cost calculator",
    "how much does a personal trainer cost",
    "personal training cost estimator",
    "personal trainer price calculator",
    "personal trainer cost per month",
  ],
  openGraph: {
    title: "Personal Trainer Cost Calculator (2026) | Forge",
    description:
      "Estimate what a personal trainer costs per session, month, and year, and see how much you'd save with an AI trainer for as little as $5/month.",
    url: "https://forgetrainer.ai/tools/personal-trainer-cost-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Trainer Cost Calculator (2026) | Forge",
    description:
      "Estimate what a personal trainer costs per session, month, and year, and see how much you'd save with an AI trainer.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools/personal-trainer-cost-calculator",
  },
};

export default function PersonalTrainerCostCalculatorPage() {
  return <PersonalTrainerCostCalculator />;
}
