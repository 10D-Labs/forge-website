import type { Metadata } from "next";
import { getTopicBySlug } from "@/content/topics";

interface TopicLayoutProps {
  children: React.ReactNode;
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    return {
      title: "Topic Not Found",
    };
  }

  return {
    title: `${topic.name} - Fitness Articles & Tips`,
    description: topic.description,
    openGraph: {
      title: `${topic.name} - Forge Fitness Blog`,
      description: topic.description,
      url: `https://forgetrainer.ai/topics/${topicSlug}`,
    },
    alternates: {
      types: {
        "text/markdown": `/markdown/topics/${topicSlug}.md`,
      },
    },
  };
}

export default function TopicLayout({ children }: TopicLayoutProps) {
  return children;
}
