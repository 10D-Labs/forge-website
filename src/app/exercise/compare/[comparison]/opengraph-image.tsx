import { ImageResponse } from "next/og";
import { getExerciseBySlug } from "@/lib/exercises";
import {
  OG_WIDTH,
  OG_HEIGHT,
  ORANGE,
  WARM_BLACK,
  WHITE,
  WHITE_60,
  ogImageConfig,
  loadFont,
  getLogoBase64,
} from "@/lib/og-utils";

export const alt = "Exercise Comparison - Forge";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image({
  params,
}: {
  params: Promise<{ comparison: string }>;
}) {
  const { comparison } = await params;

  // Parse "exercise1-vs-exercise2" format
  const parts = comparison.split("-vs-");
  const exercise1 = parts[0] ? getExerciseBySlug(parts[0]) : null;
  const exercise2 = parts[1] ? getExerciseBySlug(parts[1]) : null;

  const name1 = exercise1?.name || parts[0]?.replace(/-/g, " ") || "Exercise 1";
  const name2 = exercise2?.name || parts[1]?.replace(/-/g, " ") || "Exercise 2";

  const font = await loadFont();
  const logo = getLogoBase64();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: WARM_BLACK,
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Label */}
        <span
          style={{
            fontSize: 18,
            fontFamily: "Barlow Condensed",
            fontWeight: 800,
            color: ORANGE,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          EXERCISE COMPARISON
        </span>

        {/* Comparison layout */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          {/* Exercise 1 */}
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <span
              style={{
                fontSize: name1.length > 20 ? 36 : 44,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE,
                textTransform: "uppercase",
                textAlign: "right",
                lineHeight: 1.1,
              }}
            >
              {name1}
            </span>
          </div>

          {/* VS */}
          <span
            style={{
              fontSize: 56,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: ORANGE,
            }}
          >
            VS
          </span>

          {/* Exercise 2 */}
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: name2.length > 20 ? 36 : 44,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE,
                textTransform: "uppercase",
                textAlign: "left",
                lineHeight: 1.1,
              }}
            >
              {name2}
            </span>
          </div>
        </div>

        {/* Logo bottom-right */}
        <img
          src={logo}
          width={48}
          height={48}
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Barlow Condensed",
          data: font,
          weight: 800,
          style: "normal",
        },
      ],
    }
  );
}
