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
        keywords="fitness blog, AI workout tips, personal training advice, fitness motivation, workout strategies"
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Blog", url: "https://forgetrainer.ai/blog" },
        ]}
      />
      <Header />
      <main className="pt-24 pb-16" role="main" itemScope itemType="https://schema.org/Blog">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" itemProp="name">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground" itemProp="description">
              Insights, updates, and tips from the Forge team.
            </p>
          </header>

          {sortedPosts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          ) : (
            <div className="space-y-8" role="feed" aria-label="Blog posts">
              {sortedPosts.map((post, index) => (
                <article
                  key={post.slug}
                  className="group border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                  itemProp="blogPost"
                  aria-posinset={index + 1}
                  aria-setsize={sortedPosts.length}
                >
                  <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                    <h2 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3" itemProp="headline">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4" itemProp="description">{post.excerpt}</p>
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
                    <span className="inline-flex items-center gap-1 mt-4 text-primary font-medium">
                      Read more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;