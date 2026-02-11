import { getExercisesByDifficulty } from "@/lib/exercises";
import { generateHubOGImage } from "@/lib/og-hub-template";
import { OG_WIDTH, OG_HEIGHT, ogImageConfig } from "@/lib/og-utils";

export const alt = "Advanced Exercises - Forge";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image() {
  const exercises = getExercisesByDifficulty("Advanced");
  return generateHubOGImage({
    title: "Advanced Exercises",
    subtitle: "Challenge yourself",
    count: exercises.length,
  });
}
