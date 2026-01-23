import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { blogPosts } from "@/content/blog";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Forge Blog - Fitness Tips, Workouts & Training Advice"
        description="Insights, updates, and tips from the Forge team. Learn about AI fitness training, workout strategies, and staying consistent with your fitness goals."
        canonicalPath="/blog"
        keywords="fitness tips blog, workout advice articles, exercise motivation, training consistency, gym beginners guide, fitness habit building, strength training tips"
        markdownUrl="/markdown/blog.md"
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Blog", url: "https://forgetrainer.ai/blog" },
        ]}
      />
      <Header />
      <main className="pt-20" role="main" itemScope itemType="https://schema.org/Blog">
        {/* Hero Section */}
        <section className="py-10 md:py-12 bg-surface-0 relative overflow-hidden" style={{ contain: 'layout style' }}>
          <div className="absolute inset-0 bg-mesh opacity-50" style={{ contain: 'strict' }} aria-hidden="true" />
          <div className="container relative z-10 max-w-4xl">
            <p className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4">
              Insights & Tips
            </p>
            <h1
              className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase mb-4"
              itemProp="name"
            >
              The Forge <span className="text-primary text-neon">Blog</span>
            </h1>
            <p className="text-lg text-text-secondary font-barlow" itemProp="description">
              Training advice, fitness tips, and updates from the Forge team.
            </p>
          </div>
        </section>

        {/* Posts Section */}
        <section className="py-10 md:py-12 bg-surface-1 border-t border-border-subtle">
          <div className="container max-w-4xl">
            {sortedPosts.length === 0 ? (
              <p className="text-text-secondary font-barlow">No posts yet. Check back soon!</p>
            ) : (
              <div className="space-y-6" role="feed" aria-label="Blog posts">
                {sortedPosts.map((post, index) => (
                  <article
                    key={post.slug}
                    className="group angular-border card-neon [--angular-bg:hsl(var(--surface-2))] [--angular-border-color:hsl(var(--border))] p-6 hover:[--angular-border-color:hsl(var(--primary)/0.5)] transition-all"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                    itemProp="blogPost"
                    aria-posinset={index + 1}
                    aria-setsize={sortedPosts.length}
                  >
                    <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                      <h2
                        className="relative z-10 font-barlow-condensed text-xl md:text-2xl font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors mb-3"
                        itemProp="headline"
                      >
                        {post.title}
                      </h2>
                      <p className="relative z-10 text-text-secondary mb-4 font-barlow" itemProp="description">
                        {post.excerpt}
                      </p>
                      <div className="relative z-10 flex items-center gap-4 text-sm text-text-tertiary font-barlow">
                        <span
                          className="flex items-center gap-1"
                          itemProp="author"
                          itemScope
                          itemType="https://schema.org/Person"
                        >
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
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <span className="relative z-10 inline-flex items-center gap-1 mt-4 text-primary font-barlow-condensed font-semibold uppercase tracking-wide text-sm">
                        Read more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
