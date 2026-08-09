import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparePage from "@/components/compare/ComparePage";
import { competitors, getCompetitor } from "@/content/compare";

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};

  const url = `https://forgetrainer.ai/compare/${competitor.slug}`;
  return {
    title: competitor.metaTitle,
    description: competitor.metaDescription,
    keywords: competitor.keywords,
    openGraph: {
      title: `${competitor.metaTitle} | Forge`,
      description: competitor.metaDescription,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${competitor.metaTitle} | Forge`,
      description: competitor.metaDescription,
    },
    alternates: {
      canonical: url,
      types: {
        "text/markdown": `/markdown/compare/${competitor.slug}.md`,
      },
    },
  };
}

export default async function CompareSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  return <ComparePage competitor={competitor} />;
}
