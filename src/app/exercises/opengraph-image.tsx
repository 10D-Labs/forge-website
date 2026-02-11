import { getAllExercises } from "@/lib/exercises";
import { generateHubOGImage } from "@/lib/og-hub-template";
import { OG_WIDTH, OG_HEIGHT, ogImageConfig } from "@/lib/og-utils";

export const alt = "Forge Exercise Library";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image() {
  const count = getAllExercises().length;
  return generateHubOGImage({
    title: "Exercise Library",
    subtitle: "Filter by body part, equipment, muscle, or difficulty",
    count,
  });
}
