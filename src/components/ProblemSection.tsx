"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const problems = [
  {
    headline: "Personal trainers cost $300-500/month.",
    body: "Expert guidance sits behind a paywall most people can\u2019t afford.",
  },
  {
    headline: "Fitness apps give everyone the same plan.",
    body: "They call it \u2018personalized\u2019 because you entered your height and weight. That\u2019s a formula, not coaching.",
  },
  {
    headline: "Nobody remembers your history.",
    body: "You mentioned your bad knee last session. They still told you to do squats again. Nobody is paying attention.",
  },
  {
    headline: "Nothing feels like it\u2019s working.",
    body: "Without tracking, without progressive overload, without someone noticing when you skip, of course you quit.",
  },
];

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-surface-1 relative overflow-hidden border-t border-border-subtle"
      aria-labelledby="problem-heading"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-radial-hero opacity-30" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.header
            className="mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4"
            >
              It&apos;s Not Your Fault
            </motion.p>
            <motion.h2
              id="problem-heading"
              className="font-barlow-condensed text-h1 font-black uppercase mb-4"
              variants={fadeInUp}
            >
              The Fitness Industry
              <span className="text-primary text-neon block">Wasn&apos;t Built For You</span>
            </motion.h2>
          </motion.header>

          {/* Editorial problem list */}
          <motion.div
            className="relative space-y-12 pl-8 md:pl-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {problems.map((problem, index) => (
              <motion.div
                key={problem.headline}
                variants={fadeInUp}
                className="relative"
              >
                {/* Connecting line to next circle */}
                {index < problems.length - 1 && (
                  <div
                    className="absolute left-[calc(-2rem+0.9375rem)] md:left-[calc(-3rem+1.1875rem)] top-4 md:top-5 w-0.5 bg-primary/30"
                    style={{ bottom: '-4rem' }}
                  />
                )}
                {/* Number accent */}
                <span className="absolute -left-8 md:-left-12 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface-1 border border-primary/30 flex items-center justify-center z-10">
                  <span className="font-barlow-condensed text-sm md:text-base font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                <h3 className="font-barlow font-bold text-xl md:text-2xl text-foreground mb-3 leading-snug">
                  {problem.headline}
                </h3>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed font-barlow max-w-2xl">
                  {problem.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
