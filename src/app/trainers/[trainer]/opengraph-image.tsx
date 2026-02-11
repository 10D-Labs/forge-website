import { ImageResponse } from "next/og";
import { getTrainerBySlug } from "@/content/trainers";
import {
  OG_WIDTH,
  OG_HEIGHT,
  ORANGE,
  WARM_BLACK,
  WARM_800,
  WHITE,
  WHITE_60,
  ogImageConfig,
  loadFont,
  getLogoBase64,
} from "@/lib/og-utils";

export const alt = "Forge AI Trainer";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image({
  params,
}: {
  params: Promise<{ trainer: string }>;
}) {
  const { trainer: trainerSlug } = await params;
  const trainer = getTrainerBySlug(trainerSlug);

  if (!trainer) {
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
          Trainer Not Found
        </div>
      ),
      { ...size }
    );
  }

  const font = await loadFont();
  const logo = getLogoBase64();
  const initial = trainer.name.charAt(0).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: WARM_BLACK,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Large initial letter as background element */}
        <div
          style={{
            position: "absolute",
            right: -20,
            bottom: -40,
            fontSize: 500,
            fontFamily: "Barlow Condensed",
            fontWeight: 800,
            color: `${ORANGE}15`,
            lineHeight: 1,
          }}
        >
          {initial}
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px",
            width: "100%",
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
              marginBottom: 24,
            }}
          >
            AI TRAINER
          </span>

          {/* Trainer name */}
          <span
            style={{
              fontSize: 80,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: WHITE,
              textTransform: "uppercase",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            {trainer.name}
          </span>

          {/* Role */}
          <span
            style={{
              fontSize: 32,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: ORANGE,
              marginBottom: 16,
            }}
          >
            {trainer.role}
          </span>

          {/* Vibe tagline */}
          <span
            style={{
              fontSize: 24,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: WHITE_60,
              maxWidth: "70%",
            }}
          >
            {trainer.vibe}
          </span>

          {/* Footer URL */}
          <span
            style={{
              fontSize: 18,
              color: WHITE_60,
              marginTop: 40,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            forgetrainer.ai
          </span>
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
