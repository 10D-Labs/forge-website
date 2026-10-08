"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import PageIntro from "@/components/PageIntro";
import StructuredData from "@/components/StructuredData";
import { getTopicBySlug, topics } from "@/content/topics";
import { blogPosts } from "@/content/blog";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Calendar } from "lucide-react";

interface TopicPageContentProps {
  topicSlug: string;
}

export default function TopicPageContent({ topicSlug }: TopicPageContentProps) {
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    notFound();
  }

  // Get posts that match any of this topic's related categories
  const topicPosts = blogPosts.filter(
    (post) => post.category && topic.relatedCategories.includes(post.category)
  );

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Blog", url: "https://forgetrainer.ai/blog" },
          { name: topic.name, url: `https://forgetrainer.ai/topics/${topic.slug}` },
        ]}
      />

      <main className="resource-page">
        <PageIntro eyebrow="Blog" title={topic.name} accent="Put it into practice." description={topic.description} />

        {/* Posts Grid */}
        <section className="py-12 md:py-16 bg-surface-1 border-t border-border-subtle">
          <div className="site-width">
            <motion.div
              className="journal-grid"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {topicPosts.map((post) => (
                <motion.article key={post.slug} variants={fadeInUp} className="journal-card">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="journal-card-link group"
                  >
                    <time
                      dateTime={post.date}
                      className="flex items-center gap-1 text-xs text-text-tertiary font-barlow uppercase tracking-wide mb-3"
                    >
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>

                    <h2 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-text-secondary font-barlow line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center text-sm font-barlow-condensed font-semibold text-primary uppercase tracking-wide group-hover:underline">
                      Read Article
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.article>
              ))}
            </motion.div>

            {topicPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary font-barlow">
                  No articles in this topic yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Other Topics */}
        <section className="py-12 md:py-16 bg-surface-0 border-t border-border-subtle">
          <div className="site-width">
            <h2 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-8">
              Explore Other Topics
            </h2>
            <div className="flex flex-wrap gap-3">
              {topics
                .filter((t) => t.slug !== topic.slug)
                .map((t) => (
                  <Link
                    key={t.slug}
                    href={`/topics/${t.slug}`}
                    className="px-4 py-2 rounded-[10px] border border-primary/30 bg-surface-2 font-barlow-condensed text-sm font-semibold uppercase tracking-wide text-text-secondary hover:text-primary transition-colors"
                  >
                    <span className="relative z-10">{t.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
