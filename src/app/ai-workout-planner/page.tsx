import type { Metadata } from "next";
import AIWorkoutPlannerContent from "./AIWorkoutPlannerContent";

export const metadata: Metadata = {
  title: "AI Workout Planner - Custom Plans Built for You",
  description:
    "Get a personalized workout plan from an AI that knows your goals, schedule, equipment, and injuries. Not templates. Real programming with progressive overload. Try Forge free.",
  keywords: [
    "AI workout planner",
    "AI workout plan generator",
    "personalized workout plan",
    "custom workout plan AI",
    "AI exercise planner",
    "workout plan generator",
  ],
  openGraph: {
    title: "AI Workout Planner - Custom Plans Built for You | Forge",
    description:
      "Get a personalized workout plan from an AI that knows your goals, schedule, equipment, and injuries. Not templates. Real programming with progressive overload.",
    url: "https://forgetrainer.ai/ai-workout-planner",
  },
  twitter: {
    title: "AI Workout Planner - Custom Plans Built for You | Forge",
    description:
      "Get a personalized workout plan from an AI that knows your goals, schedule, equipment, and injuries. Not templates. Real programming with progressive overload.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/ai-workout-planner",
  },
};

export default function AIWorkoutPlannerPage() {
  return <AIWorkoutPlannerContent />;
}
