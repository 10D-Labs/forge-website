import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import StructuredData from "@/components/StructuredData";
import { topics } from "@/content/topics";

export const metadata: Metadata = {
  title: "Forge Fitness Blog - Training Tips, Workouts & Guidance",
  description:
    "Expert fitness advice, workout tips, and training guidance from your AI personal trainer. Learn how to build muscle, lose fat, and transform your fitness.",
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

      <main className="pt-20" role="main">
        {/* Header */}
        <section
          className="py-10 md:py-12 bg-surface-0 relative overflow-hidden"
          aria-labelledby="blog-heading"
        >
          <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4">
                Blog
              </p>
              <h1
                id="blog-heading"
                className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6"
              >
                Training Tips &{" "}
                <span className="text-primary text-neon">Guidance</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-barlow">
                Expert fitness advice to help you train smarter, get stronger,
                and build the body you want.
              </p>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section
          className="py-8 bg-surface-1 border-y border-border-subtle"
          aria-label="Browse by topic"
        >
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-3">
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
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-[20px] border border-border bg-surface-2 card-neon transition-all duration-300 hover:border-primary/50"
                >
                  <Link href={`/blog/${post.slug}`} className="block p-6">
                    {post.category && (
                      <span className="inline-block px-3 py-1 text-xs font-barlow-condensed font-semibold text-primary uppercase tracking-wider rounded-[10px] border border-primary/30 bg-primary/10 mb-4">
                        <span className="relative z-10">
                          {topics.find((t) => t.relatedCategories.includes(post.category!))?.name ||
                            post.category}
                        </span>
                      </span>
                    )}

                    <time
                      dateTime={post.date}
                      className="block text-xs text-text-tertiary font-barlow uppercase tracking-wide mb-2"
                    >
                      {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>

                    <h2 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-text-secondary font-barlow text-sm leading-relaxed line-clamp-3 mb-4">
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
