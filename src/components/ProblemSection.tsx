"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, ExternalLink } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const problems = [
    "Costs $300-500+ per month",
    "Limited to scheduled sessions",
    "Same playbook for most clients",
    "No support outside gym hours",
    "Forgets your history and injuries",
    "Everyone sees you have a trainer",
  ];

  const solutions = [
    "Under $20/month — not $500",
    "Available 24/7, whenever you need it",
    "Personalized to YOUR body and goals",
    "Instant answers, anytime",
    "Never forgets your injuries",
    "Private — just you and your phone",
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="problem-heading"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-radial-hero opacity-30" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.header
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4"
          >
            The Better Way
          </motion.p>
          <motion.h2
            id="problem-heading"
            className="font-barlow-condensed text-h1 font-black uppercase mb-4"
            variants={fadeInUp}
          >
            The Problem With
            <span className="text-primary text-neon block">Traditional Training</span>
          </motion.h2>
          <motion.p className="text-text-secondary text-lg font-barlow" variants={fadeInUp}>
            Personal training works, but it's expensive and inconvenient.
            <br />
            Forge changes that.
          </motion.p>
        </motion.header>

        {/* Desktop: Side-by-side cards */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Problem Card */}
          <motion.article
            className="relative p-8 rounded-[20px] border border-destructive/30 bg-surface-0 overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-labelledby="traditional-trainers-heading"
          >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-destructive/5 rounded-full blur-3xl" aria-hidden="true" />

            <h3
              id="traditional-trainers-heading"
              className="relative z-10 font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0" aria-hidden="true">
                <X className="w-5 h-5 text-destructive" />
              </span>
              Traditional Trainers
            </h3>

            <ul className="space-y-4 relative z-10" aria-label="Problems with traditional trainers">
              {problems.map((problem, index) => (
                <motion.li
                  key={problem}
                  className="flex items-center gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <span className="w-10 flex items-center justify-center shrink-0" aria-hidden="true">
                    <X className="w-5 h-5 text-destructive" />
                  </span>
                  <span>{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>

          {/* Solution Card */}
          <motion.article
            className="relative p-8 rounded-[20px] border border-primary/30 bg-surface-0 card-neon overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            aria-labelledby="forge-trainers-heading"
          >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />

            <h3
              id="forge-trainers-heading"
              className="relative z-10 font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0" aria-hidden="true">
                <Check className="w-5 h-5 text-primary" />
              </span>
              Forge AI Trainers
            </h3>

            <ul className="space-y-4 relative z-10" aria-label="Benefits of Forge AI trainers">
              {solutions.map((solution, index) => (
                <motion.li
                  key={solution}
                  className="flex items-center gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="w-10 flex items-center justify-center shrink-0" aria-hidden="true">
                    <Check className="w-5 h-5 text-primary" />
                  </span>
                  <span>{solution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>
        </div>

        {/* Mobile: Unified column cards (matches desktop layout) */}
        <div className="md:hidden grid grid-cols-2 gap-3 max-w-lg mx-auto">
          {/* Traditional Column */}
          <motion.div
            className="rounded-xl border border-destructive/20 bg-destructive/[0.03] overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-3 bg-destructive/10 text-center">
              <span className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-destructive">Traditional</span>
            </div>
            <div className="p-2 space-y-2">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  className="p-2.5 rounded-lg bg-surface-0/50 flex items-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.4 + index * 0.08 }}
                >
                  <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground leading-snug">{problem}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Forge Column */}
          <motion.div
            className="rounded-xl border border-primary/20 bg-primary/[0.03] overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-3 bg-primary/10 text-center">
              <span className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-primary">Forge</span>
            </div>
            <div className="p-2 space-y-2">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  className="p-2.5 rounded-lg bg-surface-0/50 flex items-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5 + index * 0.08 }}
                >
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground leading-snug">{solution}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Research citation callout */}
        <motion.a
          href="https://www.jssm.org/jssm-25-235.xml-Fulltext"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 mx-auto max-w-2xl flex items-start gap-3 p-4 rounded-[14px] border border-primary/15 bg-primary/[0.04] hover:bg-primary/[0.07] transition-colors cursor-pointer group"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <span className="mt-0.5 shrink-0 text-primary/60 group-hover:text-primary transition-colors">
            <ExternalLink className="w-4 h-4" />
          </span>
          <p className="text-sm text-text-secondary font-barlow leading-relaxed">
            <span className="text-foreground font-medium">Backed by research:</span>{" "}
            A 2026 peer-reviewed study found AI outperformed certified personal trainers in scientific accuracy, comprehensibility, and actionability — on every question tested.{" "}
            <span className="text-primary/70 group-hover:text-primary transition-colors font-medium">
              Journal of Sports Science and Medicine
            </span>
          </p>
        </motion.a>
      </div>
    </section>
  );
};

export default ProblemSection;
