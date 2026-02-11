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
  getMockupBase64,
} from "@/lib/og-utils";

export const alt = "Forge - AI Personal Trainer";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image() {
  const font = await loadFont();
  const logo = getLogoBase64();
  const mockup = getMockupBase64();

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
        {/* Left content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px",
            width: "60%",
          }}
        >
          {/* Logo */}
          <img
            src={logo}
            width={80}
            height={80}
            style={{ marginBottom: 32 }}
          />

          {/* Staggered headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE,
                textTransform: "uppercase",
                letterSpacing: "-1px",
              }}
            >
              YOUR
            </span>
            <span
              style={{
                fontSize: 72,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: ORANGE,
                textTransform: "uppercase",
                fontStyle: "italic",
                letterSpacing: "-1px",
              }}
            >
              PERSONAL
            </span>
            <span
              style={{
                fontSize: 72,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE,
                textTransform: "uppercase",
                letterSpacing: "-1px",
              }}
            >
              TRAINER.
            </span>
          </div>

          {/* Footer URL */}
          <span
            style={{
              fontSize: 20,
              color: WHITE_60,
              marginTop: 32,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            forgetrainer.ai
          </span>
        </div>

        {/* Right: phone mockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40%",
            paddingRight: 40,
          }}
        >
          <img
            src={mockup}
            height={520}
            style={{
              objectFit: "contain",
              borderRadius: 24,
            }}
          />
        </div>
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
