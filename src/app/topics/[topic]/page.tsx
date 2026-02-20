import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTopicBySlug, topics } from "@/content/topics";
import TopicPageContent from "./TopicPageContent";

interface TopicPageProps {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    return {};
  }

  const title = `${topic.name} - Forge Fitness Blog`;
  const description = topic.metaDescription || topic.description;

  return {
    title,
    description,
    keywords: topic.keywords,
    openGraph: {
      title,
      description,
      url: `https://forgetrainer.ai/topics/${topicSlug}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `https://forgetrainer.ai/topics/${topicSlug}`,
      types: {
        "text/markdown": `/markdown/topics/${topicSlug}.md`,
      },
    },
  };
}

export function generateStaticParams() {
  return topics.map((topic) => ({
    topic: topic.slug,
  }));
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    notFound();
  }

  return <TopicPageContent topicSlug={topicSlug} />;
}
