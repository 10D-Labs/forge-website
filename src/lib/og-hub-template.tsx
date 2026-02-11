import { ImageResponse } from "next/og";
import {
  OG_WIDTH,
  OG_HEIGHT,
  ORANGE,
  WARM_BLACK,
  WHITE,
  WHITE_60,
  loadFont,
  getLogoBase64,
} from "@/lib/og-utils";

interface HubOGOptions {
  title: string;
  subtitle?: string;
  count?: number;
  label?: string;
}

/**
 * Shared OG image generator for hub/listing pages.
 * Used by exercises hub, body part hubs, equipment hubs, muscle hubs, etc.
 */
export async function generateHubOGImage({
  title,
  subtitle,
  count,
  label = "EXERCISE LIBRARY",
}: HubOGOptions) {
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
        {/* Top label */}
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
          {label}
        </span>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "flex-start",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: title.length > 25 ? 60 : 72,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: WHITE,
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            {title}
          </span>

          {subtitle && (
            <span
              style={{
                fontSize: 28,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE_60,
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        {/* Exercise count */}
        {count !== undefined && (
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontSize: 64,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: ORANGE,
                lineHeight: 1,
              }}
            >
              {count}+
            </span>
            <span
              style={{
                fontSize: 28,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE_60,
                textTransform: "uppercase",
              }}
            >
              Exercises
            </span>
          </div>
        )}

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
      width: OG_WIDTH,
      height: OG_HEIGHT,
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
