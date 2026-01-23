import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import StructuredData from "@/components/StructuredData";
import { topics } from "@/content/topics";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://forgetrainer.ai/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      types: {
        "text/markdown": `/markdown/blog/${slug}.md`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const wordCount = post.content.split(/\s+/).length;

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="article"
        title={post.title}
        description={post.excerpt}
        publishedTime={post.date}
        author={post.author}
        url={`https://forgetrainer.ai/blog/${slug}`}
        wordCount={wordCount}
        keywords={post.keywords}
        articleSection={
          post.category
            ? topics.find((t) => t.slug === post.category)?.name
            : undefined
        }
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Blog", url: "https://forgetrainer.ai/blog" },
          { name: post.title, url: `https://forgetrainer.ai/blog/${slug}` },
        ]}
      />

      <main className="pt-20" role="main">
        {/* Header */}
        <header className="py-10 md:py-12 bg-surface-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-sm font-barlow">
                  <li>
                    <Link
                      href="/"
                      className="text-text-tertiary hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="text-text-quaternary">/</li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-text-tertiary hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  {post.category && (
                    <>
                      <li className="text-text-quaternary">/</li>
                      <li>
                        <Link
                          href={`/topics/${post.category}`}
                          className="text-text-tertiary hover:text-primary transition-colors"
                        >
                          {topics.find((t) => t.slug === post.category)?.name ||
                            post.category}
                        </Link>
                      </li>
                    </>
                  )}
                </ol>
              </nav>

              {/* Category Tag */}
              {post.category && (
                <Link
                  href={`/topics/${post.category}`}
                  className="inline-block px-3 py-1.5 text-xs font-barlow-condensed font-semibold text-primary uppercase tracking-wider angular-border-sm [--angular-bg:hsl(var(--primary)/0.1)] [--angular-border-color:hsl(var(--primary)/0.3)] hover:[--angular-border-color:hsl(var(--primary))] transition-colors mb-4"
                >
                  <span className="relative z-10">
                    {topics.find((t) => t.slug === post.category)?.name ||
                      post.category}
                  </span>
                </Link>
              )}

              <h1 className="font-barlow-condensed text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-text-tertiary font-barlow">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span className="w-1 h-1 rounded-full bg-text-quaternary" />
                <span>{post.author}</span>
                <span className="w-1 h-1 rounded-full bg-text-quaternary" />
                <span>{Math.ceil(wordCount / 200)} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <article className="py-12 md:py-16 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-invert prose-orange max-w-none prose-headings:font-barlow-condensed prose-headings:uppercase prose-headings:tracking-wide prose-h2:text-2xl prose-h3:text-xl prose-p:font-barlow prose-p:text-text-secondary prose-p:leading-relaxed prose-li:font-barlow prose-li:text-text-secondary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-text-secondary">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug]}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section
                  className="mt-16 pt-12 border-t border-border-subtle"
                  aria-labelledby="related-posts-heading"
                >
                  <h2
                    id="related-posts-heading"
                    className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-8"
                  >
                    Related Articles
                  </h2>

                  <div className="grid gap-6 md:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <article key={relatedPost.slug}>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="group block p-5 angular-border card-neon transition-all duration-300 hover:[--angular-border-color:hsl(var(--primary)/0.5)] h-full"
                        >
                          <time
                            dateTime={relatedPost.date}
                            className="text-xs text-text-tertiary font-barlow uppercase tracking-wide"
                          >
                            {new Date(relatedPost.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </time>

                          <h3 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>

                          <p className="text-sm text-text-secondary font-barlow line-clamp-3">
                            {relatedPost.excerpt}
                          </p>

                          <span className="inline-flex items-center mt-4 text-sm font-barlow-condensed font-semibold text-primary uppercase tracking-wide group-hover:underline">
                            Read More
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
                </section>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
