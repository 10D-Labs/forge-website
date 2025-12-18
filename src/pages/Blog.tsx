import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/content/blog";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Insights, updates, and tips from the Forge team.
          </p>

          {sortedPosts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          ) : (
            <div className="space-y-8">
              {sortedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 mt-4 text-primary font-medium">
                      Read more <ArrowRight className="h-4 w-4" />
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
