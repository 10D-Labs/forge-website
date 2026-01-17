import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { blogPosts } from "@/content/blog";
import { Calendar, User, ArrowLeft } from "lucide-react";

// Import all markdown files from the blog content folder
const markdownModules = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
});

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    const loadContent = async () => {
      if (!slug) return;

      const path = `/src/content/blog/${slug}.md`;
      const loader = markdownModules[path];

      if (loader) {
        try {
          const rawContent = (await loader()) as string;
          // Remove frontmatter (content between --- markers)
          const contentWithoutFrontmatter = rawContent.replace(/^---[\s\S]*?---\n*/, "");
          setContent(contentWithoutFrontmatter);
        } catch (error) {
          console.error("Failed to load blog post:", error);
        }
      }
      setLoading(false);
    };

    loadContent();
  }, [slug]);

  if (!post && !loading) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {post && (
        <>
          <SEOHead
            title={post.title}
            description={post.excerpt}
            canonicalPath={`/blog/${post.slug}`}
            ogType="article"
            publishedTime={post.date}
            author={post.author}
            keywords={`${post.title}, fitness tips, AI trainer, workout advice, personal training`}
          />
          <StructuredData
            type="article"
            title={post.title}
            description={post.excerpt}
            publishedTime={post.date}
            author={post.author}
            url={`https://forgetrainer.ai/blog/${post.slug}`}
          />
          <StructuredData
            type="breadcrumb"
            items={[
              { name: "Home", url: "https://forgetrainer.ai" },
              { name: "Blog", url: "https://forgetrainer.ai/blog" },
              { name: post.title, url: `https://forgetrainer.ai/blog/${post.slug}` },
            ]}
          />
        </>
      )}
      <Header />
      <main className="pt-20" role="main">
        {/* Hero Section */}
        <section className="py-10 md:py-12 bg-surface-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden="true" />
          <div className="container relative z-10 max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-text-tertiary hover:text-primary transition-colors font-barlow text-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Blog
              </Link>
            </nav>

            {loading ? (
              <div className="animate-pulse" aria-label="Loading article">
                <div className="h-10 bg-surface-2 w-3/4 mb-4" />
                <div className="h-4 bg-surface-2 w-1/2" />
              </div>
            ) : post ? (
              <header>
                <h1
                  className="font-barlow-condensed text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-primary text-neon"
                  itemProp="headline"
                >
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-text-tertiary font-barlow">
                  <span
                    className="flex items-center gap-1"
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span itemProp="name">{post.author}</span>
                  </span>
                  <time className="flex items-center gap-1" dateTime={post.date} itemProp="datePublished">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </header>
            ) : null}
          </div>
        </section>

        {/* Article Content */}
        <section className="py-10 md:py-12 bg-surface-1 border-t border-border-subtle">
          <div className="container max-w-3xl">
            {loading ? (
              <div className="animate-pulse space-y-3" aria-label="Loading content">
                <div className="h-4 bg-surface-2" />
                <div className="h-4 bg-surface-2" />
                <div className="h-4 bg-surface-2 w-5/6" />
              </div>
            ) : post ? (
              <article itemScope itemType="https://schema.org/BlogPosting">
                <div
                  className="prose prose-invert max-w-none
                    prose-headings:font-barlow-condensed prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-foreground
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-zinc-300 prose-p:font-barlow prose-p:leading-relaxed
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-li:text-zinc-300 prose-li:font-barlow
                    prose-ul:text-zinc-300
                    prose-ol:text-zinc-300
                    prose-blockquote:border-l-primary prose-blockquote:text-zinc-300 prose-blockquote:font-barlow prose-blockquote:italic
                    prose-code:text-primary prose-code:bg-surface-2 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-surface-2 prose-pre:border prose-pre:border-border"
                  itemProp="articleBody"
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>
              </article>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
