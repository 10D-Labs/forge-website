import { ImageResponse } from "next/og";
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

export const alt = "Forge Blog";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image() {
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
          justifyContent: "center",
          backgroundColor: WARM_BLACK,
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          width={64}
          height={64}
          style={{ marginBottom: 32 }}
        />

        {/* Title */}
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
          FORGE BLOG
        </span>

        {/* Tagline */}
        <span
          style={{
            fontSize: 28,
            fontFamily: "Barlow Condensed",
            fontWeight: 800,
            color: WHITE_60,
          }}
        >
          Science-backed fitness guides, training tips, and expert advice
        </span>

        {/* Footer URL */}
        <span
          style={{
            fontSize: 18,
            color: ORANGE,
            marginTop: 40,
            fontFamily: "Barlow Condensed",
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          forgetrainer.ai/blog
        </span>
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
