import { getExercisesByEquipment } from "@/lib/exercises";
import { generateHubOGImage } from "@/lib/og-hub-template";
import { OG_WIDTH, OG_HEIGHT, ogImageConfig } from "@/lib/og-utils";
import { SLUG_TO_EQUIPMENT } from "@/types/exercise";

export const alt = "Forge Exercise Library";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image({
  params,
}: {
  params: Promise<{ equipment: string }>;
}) {
  const { equipment: slug } = await params;
  const equipment = SLUG_TO_EQUIPMENT[slug];

  if (!equipment) {
    return generateHubOGImage({ title: "Exercises" });
  }

  const exercises = getExercisesByEquipment(equipment);

  return generateHubOGImage({
    title: `${equipment} Exercises`,
    count: exercises.length,
  });
}
