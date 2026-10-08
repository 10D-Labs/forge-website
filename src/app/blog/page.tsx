import PageIntro from "@/components/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import StructuredData from "@/components/StructuredData";
import { topics } from "@/content/topics";

export const metadata: Metadata = {
  title: "Forge Fitness Blog - Training Tips, Workouts & Guidance",
  description:
    "Free fitness guides backed by research: workout splits, form tips, recovery science, and AI training. Updated weekly by the Forge team.",
  keywords: [
    "fitness blog",
    "workout tips",
    "training advice",
    "personal trainer tips",
    "gym guidance",
    "exercise tutorials",
    "fitness education",
  ],
  openGraph: {
    title: "Forge Fitness Blog - Training Tips, Workouts & Guidance",
    description:
      "Expert fitness advice and training guidance from your AI personal trainer.",
    url: "https://forgetrainer.ai/blog",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/blog",
    types: {
      "text/markdown": "/markdown/blog.md",
    },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Blog", url: "https://forgetrainer.ai/blog" },
        ]}
      />

      <main className="resource-page">
        <PageIntro eyebrow="Blog" title="Understand your training." accent="Make each session count." description="Practical guides to strength, technique, recovery, and building a routine you can keep." id="blog-heading" />

        {/* Topics */}
        <section
          className="py-8 bg-surface-1 border-y border-border-subtle"
          aria-label="Browse by topic"
        >
          <div className="site-width">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-text-tertiary font-barlow mr-2">
                Browse:
              </span>
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="px-4 py-2 text-sm font-barlow-condensed font-semibold uppercase tracking-wide text-text-secondary hover:text-primary rounded-[10px] border border-border bg-surface-2 hover:border-primary transition-colors"
                >
                  <span className="relative z-10">{topic.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 md:py-16 bg-surface-0">
          <div className="site-width">
            <div className="journal-grid">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="journal-card group"
                >
                  <Link href={`/blog/${post.slug}`} className="journal-card-link">
                    {post.category && (
                      <span className="inline-block px-3 py-1 text-xs font-barlow-condensed font-semibold text-primary uppercase tracking-wider rounded-[10px] border border-primary/30 bg-primary/10 mb-4">
                        <span className="relative z-10">
                          {topics.find((t) => t.relatedCategories.includes(post.category!))?.name ||
                            post.category}
                        </span>
                      </span>
                    )}

                    <time
                      dateTime={post.updated || post.date}
                      className="block text-xs text-text-tertiary font-barlow uppercase tracking-wide mb-2"
                    >
                      {post.updated && post.updated !== post.date ? "Updated " : ""}
                      {new Date((post.updated || post.date) + "T12:00:00").toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </time>

                    <h2 className="font-barlow-condensed text-3xl font-bold uppercase tracking-wide mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-text-secondary font-barlow text-base leading-relaxed mb-6">
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
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
