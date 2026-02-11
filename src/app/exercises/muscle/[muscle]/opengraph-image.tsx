import { getExercisesByTarget } from "@/lib/exercises";
import { generateHubOGImage } from "@/lib/og-hub-template";
import { OG_WIDTH, OG_HEIGHT, ogImageConfig } from "@/lib/og-utils";
import { SLUG_TO_TARGET } from "@/types/exercise";

export const alt = "Forge Exercise Library";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image({
  params,
}: {
  params: Promise<{ muscle: string }>;
}) {
  const { muscle: slug } = await params;
  const muscle = SLUG_TO_TARGET[slug];

  if (!muscle) {
    return generateHubOGImage({ title: "Exercises" });
  }

  const exercises = getExercisesByTarget(muscle);

  return generateHubOGImage({
    title: `${muscle} Exercises`,
    count: exercises.length,
  });
}
