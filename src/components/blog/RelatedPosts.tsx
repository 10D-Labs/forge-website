"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts, type BlogPostMeta } from "@/content/blog";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface RelatedPostsProps {
  currentSlug: string;
}

const RelatedPosts = ({ currentSlug }: RelatedPostsProps) => {
  const relatedPosts = getRelatedPosts(currentSlug, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section
      className="mt-16 pt-12 border-t border-border-subtle"
      aria-labelledby="related-posts-heading"
      // Contain layout to prevent animations from causing CLS
      style={{ contain: 'layout style' }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.h2
          id="related-posts-heading"
          className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-8"
          variants={fadeInUp}
        >
          Related Articles
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {relatedPosts.map((post) => (
            <RelatedPostCard key={post.slug} post={post} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

interface RelatedPostCardProps {
  post: BlogPostMeta;
}

const RelatedPostCard = ({ post }: RelatedPostCardProps) => {
  return (
    <motion.article variants={fadeInUp}>
      <Link
        href={`/blog/${post.slug}`}
        className="group block p-5 rounded-[20px] border border-border bg-surface-2 card-neon transition-all duration-300 h-full"
      >
        <time
          dateTime={post.date}
          className="text-xs text-text-tertiary font-barlow uppercase tracking-wide"
        >
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>

        <h3 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-text-secondary font-barlow line-clamp-3">
          {post.excerpt}
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
    </motion.article>
  );
};

export default RelatedPosts;
