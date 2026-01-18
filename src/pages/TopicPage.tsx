import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { getTopicBySlug, topics } from "@/content/topics";
import { blogPosts } from "@/content/blog";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { ArrowLeft, Calendar } from "lucide-react";

const TopicPage = () => {
  const { topic: topicSlug } = useParams<{ topic: string }>();
  const topic = topicSlug ? getTopicBySlug(topicSlug) : undefined;

  if (!topic) {
    return <Navigate to="/blog" replace />;
  }

  // Get posts that match any of this topic's related categories
  const topicPosts = blogPosts.filter(
    (post) => post.category && topic.relatedCategories.includes(post.category)
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${topic.name} - Fitness Guides & Tips`}
        description={topic.metaDescription}
        canonicalPath={`/topics/${topic.slug}`}
        keywords={topic.keywords.join(", ")}
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Blog", url: "https://forgetrainer.ai/blog" },
          { name: topic.name, url: `https://forgetrainer.ai/topics/${topic.slug}` },
        ]}
      />

      <Header />

      <main className="pt-20" role="main">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-surface-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden="true" />
          <div className="container relative z-10">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-text-tertiary hover:text-primary transition-colors font-barlow text-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Blog
              </Link>
            </nav>

            <motion.header
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4"
              >
                Topic
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 text-primary text-neon"
              >
                {topic.name}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-text-secondary font-barlow max-w-2xl"
              >
                {topic.description}
              </motion.p>
            </motion.header>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12 md:py-16 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {topicPosts.map((post) => (
                <motion.article key={post.slug} variants={fadeInUp}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block p-6 angular-border card-neon transition-all duration-300 hover:[&::before]:bg-primary/50 h-full"
                  >
                    <time
                      dateTime={post.date}
                      className="flex items-center gap-1 text-xs text-text-tertiary font-barlow uppercase tracking-wide mb-3"
                    >
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {new Date(post.date).toLocaleDateString("en-US", {
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
          <div className="container">
            <h2 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-8">
              Explore Other Topics
            </h2>
            <div className="flex flex-wrap gap-3">
              {topics
                .filter((t) => t.slug !== topic.slug)
                .map((t) => (
                  <Link
                    key={t.slug}
                    to={`/topics/${t.slug}`}
                    className="px-4 py-2 angular-border-sm [--angular-bg:hsl(var(--surface-2))] [--angular-border-color:hsl(var(--primary)/0.3)] font-barlow-condensed text-sm font-semibold uppercase tracking-wide text-text-secondary hover:text-primary transition-colors"
                  >
                    <span className="relative z-10">{t.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TopicPage;
