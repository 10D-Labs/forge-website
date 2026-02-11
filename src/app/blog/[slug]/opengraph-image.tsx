import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
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

export const alt = "Forge Blog";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

const CATEGORY_LABELS: Record<string, string> = {
  "training-fundamentals": "Training Fundamentals",
  "workout-recovery": "Workout Recovery",
  "strength-training": "Strength Training",
  "fitness-psychology": "Fitness Psychology",
  "exercise-technique": "Exercise Technique",
  "fitness-technology": "Fitness Technology",
  "getting-started": "Getting Started",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
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
          Post Not Found
        </div>
      ),
      { ...size }
    );
  }

  const font = await loadFont();
  const logo = getLogoBase64();
  const categoryLabel = post.category
    ? CATEGORY_LABELS[post.category] || post.category
    : "Blog";

  // Truncate title if too long (max ~80 chars for 2 lines at this font size)
  const title =
    post.title.length > 80 ? post.title.slice(0, 77) + "..." : post.title;

  // Format date
  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

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
        {/* Category badge */}
        <div style={{ display: "flex", marginBottom: 32 }}>
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
                fontSize: 18,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontSize: title.length > 55 ? 48 : 56,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: WHITE,
              textTransform: "uppercase",
              lineHeight: 1.1,
              maxWidth: "90%",
            }}
          >
            {title}
          </span>
        </div>

        {/* Bottom row: date + author */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            {date && (
              <span
                style={{
                  fontSize: 20,
                  fontFamily: "Barlow Condensed",
                  fontWeight: 800,
                  color: WHITE_60,
                }}
              >
                {date}
              </span>
            )}
            <span
              style={{
                fontSize: 20,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                color: WHITE_60,
              }}
            >
              {post.author}
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
