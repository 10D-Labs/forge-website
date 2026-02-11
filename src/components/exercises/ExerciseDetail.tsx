"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Exercise } from "@/types/exercise";
import { EQUIPMENT_SLUGS } from "@/types/exercise";
import { slugify, getExerciseGifUrl, getExerciseVideoUrl } from "@/lib/exercises";
import InstructionsList from "./InstructionsList";
import type { BlogPostMeta } from "@/lib/blog";

interface ExerciseEnrichment {
  tips: string[];
  commonMistakes: string[];
  faqs: { q: string; a: string }[];
}

interface ExerciseDetailProps {
  exercise: Exercise;
  enrichment?: ExerciseEnrichment | null;
  dynamicFaqs?: { q: string; a: string }[];
  relatedArticles?: BlogPostMeta[];
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-[14px] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-2/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-barlow font-semibold text-text-primary pr-4">{q}</span>
        <svg
          className={`w-5 h-5 text-text-tertiary shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="font-barlow text-text-secondary leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function ExerciseDetail({
  exercise,
  enrichment,
  dynamicFaqs,
  relatedArticles,
}: ExerciseDetailProps) {
  const tips = enrichment?.tips ?? [
    "Focus on controlled movements rather than speed",
    "Breathe out during the exertion phase",
    "Keep your core engaged throughout the movement",
  ];

  const allFaqs = [
    ...(enrichment?.faqs ?? []),
    ...(dynamicFaqs ?? []),
  ];

  return (
    <div className="py-8 md:py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - GIF */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-[20px] overflow-hidden bg-surface-2 border border-border">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label={`${exercise.name} demonstration`}
                >
                  <source src={getExerciseVideoUrl(exercise)} type="video/webm" />
                  <source src={getExerciseGifUrl(exercise)} type="image/gif" />
                </video>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="rounded-[20px] border border-border p-4 bg-surface-1">
                  <p className="text-xs font-barlow text-text-tertiary uppercase tracking-wide mb-1">
                    Target Muscle
                  </p>
                  <p className="font-barlow-condensed font-bold text-primary">
                    {exercise.target}
                  </p>
                </div>
                <div className="rounded-[20px] border border-border p-4 bg-surface-1">
                  <p className="text-xs font-barlow text-text-tertiary uppercase tracking-wide mb-1">
                    Equipment
                  </p>
                  <p className="font-barlow-condensed font-bold">
                    {exercise.equipment}
                  </p>
                </div>
                <div className="rounded-[20px] border border-border p-4 bg-surface-1">
                  <p className="text-xs font-barlow text-text-tertiary uppercase tracking-wide mb-1">
                    Difficulty
                  </p>
                  <p
                    className={`font-barlow-condensed font-bold ${
                      exercise.difficulty === "Beginner"
                        ? "text-success"
                        : exercise.difficulty === "Intermediate"
                        ? "text-primary"
                        : "text-error"
                    }`}
                  >
                    {exercise.difficulty}
                  </p>
                </div>
                <div className="rounded-[20px] border border-border p-4 bg-surface-1">
                  <p className="text-xs font-barlow text-text-tertiary uppercase tracking-wide mb-1">
                    Category
                  </p>
                  <p className="font-barlow-condensed font-bold">
                    {exercise.category}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href={`/exercises/${slugify(exercise.bodyPart)}`}
                className="px-3 py-1 text-xs font-barlow-condensed font-semibold text-primary uppercase tracking-wider rounded-[10px] border border-primary/30 bg-primary/10 hover:border-primary transition-colors"
              >
                {exercise.bodyPart}
              </Link>
              <Link
                href={`/exercises/equipment/${EQUIPMENT_SLUGS[exercise.equipment]}`}
                className="px-3 py-1 text-xs font-barlow-condensed font-semibold text-text-secondary uppercase tracking-wider rounded-[10px] border border-text-secondary/30 bg-text-secondary/10 hover:border-text-secondary transition-colors"
              >
                {exercise.equipment}
              </Link>
            </div>

            {/* Title */}
            <h1 className="font-barlow-condensed text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-6">
              {exercise.name}
            </h1>

            {/* Description */}
            <p className="font-barlow text-text-secondary text-lg leading-relaxed mb-8">
              {exercise.description}
            </p>

            {/* Secondary Muscles */}
            {exercise.secondaryMuscles.length > 0 && (
              <div className="mb-8">
                <h2 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide mb-3">
                  Also Works
                </h2>
                <div className="flex flex-wrap gap-2">
                  {exercise.secondaryMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-3 py-1 text-sm font-barlow bg-surface-2 rounded"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-6">
                How to Perform
              </h2>
              <InstructionsList instructions={exercise.instructions} />
            </div>

            {/* Pro Tips */}
            <div className="rounded-[20px] border border-primary/20 p-6 bg-primary/5 mb-6">
              <h3 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide text-primary mb-3">
                Pro Tips
              </h3>
              <ul className="space-y-2 font-barlow text-text-secondary">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-baseline gap-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            {enrichment?.commonMistakes && enrichment.commonMistakes.length > 0 && (
              <div className="rounded-[20px] border border-error/20 p-6 bg-error/5 mb-6">
                <h3 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide text-error mb-3">
                  Common Mistakes
                </h3>
                <ul className="space-y-2 font-barlow text-text-secondary">
                  {enrichment.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-baseline gap-2">
                      <span className="text-error">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQ */}
            {allFaqs.length > 0 && (
              <div className="mt-8">
                <h2 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {allFaqs.map((faq, i) => (
                    <FAQItem key={i} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Articles - Full width below the two-column layout */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="mt-12 pt-10 border-t border-border-subtle">
            <h2 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-6">
              Related Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((post) => (
                <article key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block p-5 rounded-[20px] border border-border bg-surface-2 card-neon transition-all duration-300 hover:border-primary/50 h-full"
                  >
                    <h3 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide mb-3 group-hover:text-primary transition-colors line-clamp-2">
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
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
