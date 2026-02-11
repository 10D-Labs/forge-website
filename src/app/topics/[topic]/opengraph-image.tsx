import { ImageResponse } from "next/og";
import { getTopicBySlug } from "@/content/topics";
import { blogPosts } from "@/content/blog";
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

export const alt = "Forge Blog Topic";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = ogImageConfig.contentType;

export default async function Image({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
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
          Topic Not Found
        </div>
      ),
      { ...size }
    );
  }

  const font = await loadFont();
  const logo = getLogoBase64();

  // Count posts for this topic
  const postCount = blogPosts.filter(
    (post) => post.category && topic.relatedCategories.includes(post.category)
  ).length;

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
            marginBottom: 24,
          }}
        >
          BLOG TOPIC
        </span>

        {/* Topic name */}
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
              fontSize: 64,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: WHITE,
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            {topic.name}
          </span>

          <span
            style={{
              fontSize: 24,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: WHITE_60,
              maxWidth: "80%",
            }}
          >
            {topic.description.length > 120
              ? topic.description.slice(0, 117) + "..."
              : topic.description}
          </span>
        </div>

        {/* Post count */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span
            style={{
              fontSize: 56,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: ORANGE,
              lineHeight: 1,
            }}
          >
            {postCount}
          </span>
          <span
            style={{
              fontSize: 24,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              color: WHITE_60,
              textTransform: "uppercase",
            }}
          >
            {postCount === 1 ? "Article" : "Articles"}
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
