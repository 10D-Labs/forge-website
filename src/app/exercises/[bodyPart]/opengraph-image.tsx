import { getExercisesByBodyPart } from "@/lib/exercises";
import { generateHubOGImage } from "@/lib/og-hub-template";
import { OG_WIDTH, OG_HEIGHT, ogImageConfig } from "@/lib/og-utils";
import { SLUG_TO_BODY_PART } from "@/types/exercise";

export const alt = "Forge Exercise Library";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image({
  params,
}: {
  params: Promise<{ bodyPart: string }>;
}) {
  const { bodyPart: slug } = await params;
  const bodyPart = SLUG_TO_BODY_PART[slug];

  if (!bodyPart) {
    return generateHubOGImage({ title: "Exercises" });
  }

  const exercises = getExercisesByBodyPart(bodyPart);

  return generateHubOGImage({
    title: `${bodyPart} Exercises`,
    count: exercises.length,
  });
}
