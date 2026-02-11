import { getExercisesByFilters } from "@/lib/exercises";
import { generateHubOGImage } from "@/lib/og-hub-template";
import { OG_WIDTH, OG_HEIGHT, ogImageConfig } from "@/lib/og-utils";
import { SLUG_TO_BODY_PART, SLUG_TO_EQUIPMENT } from "@/types/exercise";

export const alt = "Forge Exercise Library";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image({
  params,
}: {
  params: Promise<{ bodyPart: string; equipment: string }>;
}) {
  const { bodyPart: bpSlug, equipment: eqSlug } = await params;
  const bodyPart = SLUG_TO_BODY_PART[bpSlug];
  const equipment = SLUG_TO_EQUIPMENT[eqSlug];

  if (!bodyPart || !equipment) {
    return generateHubOGImage({ title: "Exercises" });
  }

  const exercises = getExercisesByFilters({ bodyPart, equipment });

  return generateHubOGImage({
    title: `${bodyPart} ${equipment} Exercises`,
    count: exercises.length,
  });
}
