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
  import: "default"
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
          const contentWithoutFrontmatter = rawContent.replace(
            /^---[\s\S]*?---\n*/,
            ""
          );
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
      <main className="pt-24 pb-16" role="main">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </nav>

          {loading ? (
            <div className="animate-pulse" aria-label="Loading article">
              <div className="h-10 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-1/2 mb-8" />
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            </div>
          ) : post ? (
            <article itemScope itemType="https://schema.org/BlogPosting">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" itemProp="headline">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span itemProp="name">{post.author}</span>
                  </span>
                  <time 
                    className="flex items-center gap-1"
                    dateTime={post.date}
                    itemProp="datePublished"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </time>
                </div>
              </header>

              <div 
                className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-li:text-muted-foreground prose-ul:text-muted-foreground"
                itemProp="articleBody"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            </article>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;