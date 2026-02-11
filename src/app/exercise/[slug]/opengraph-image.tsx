import { ImageResponse } from "next/og";
import { getExerciseBySlug } from "@/lib/exercises";
import {
  OG_WIDTH,
  OG_HEIGHT,
  ORANGE,
  WARM_BLACK,
  WARM_800,
  WHITE,
  WHITE_60,
  GREEN,
  RED,
  ogImageConfig,
  loadFont,
  getLogoBase64,
} from "@/lib/og-utils";

export const alt = "Forge Exercise";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exercise = getExerciseBySlug(slug);

  if (!exercise) {
    // Fallback for unknown exercises
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: WARM_BLACK,
            color: WHITE,
            fontSize: 48,
            fontFamily: "Barlow Condensed",
          }}
        >
          Exercise Not Found
        </div>
      ),
      { ...size }
    );
  }

  const font = await loadFont();
  const logo = getLogoBase64();

  const difficultyColor =
    exercise.difficulty === "Beginner"
      ? GREEN
      : exercise.difficulty === "Advanced"
      ? RED
      : WHITE;

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
        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: ORANGE,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            EXERCISE LIBRARY
          </span>
        </div>

        {/* Exercise name */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontSize: exercise.name.length > 30 ? 56 : 68,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: WHITE,
              textTransform: "uppercase",
              lineHeight: 1.1,
              maxWidth: "90%",
            }}
          >
            {exercise.name}
          </span>
        </div>

        {/* Badges row */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {/* Target muscle badge (orange) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              backgroundColor: ORANGE,
              borderRadius: 8,
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE,
                textTransform: "uppercase",
              }}
            >
              {exercise.target}
            </span>
          </div>

          {/* Equipment badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              backgroundColor: WARM_800,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE,
                textTransform: "uppercase",
              }}
            >
              {exercise.equipment}
            </span>
          </div>

          {/* Difficulty badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              backgroundColor: WARM_800,
              borderRadius: 8,
              border: `1px solid ${difficultyColor}40`,
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: difficultyColor,
                textTransform: "uppercase",
              }}
            >
              {exercise.difficulty}
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
