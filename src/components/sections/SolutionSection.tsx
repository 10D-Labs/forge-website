"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, ExternalLink, Fingerprint, Brain, HelpCircle, Wallet, LucideIcon } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface Differentiator {
  icon: LucideIcon;
  headline: string;
  body: string;
}

const differentiators: Differentiator[] = [
  {
    icon: Fingerprint,
    headline: "It builds YOUR plan, not A plan.",
    body: "Tell Forge your goals, schedule, equipment, and injuries. It builds a program from scratch. Not a template.",
  },
  {
    icon: Brain,
    headline: "It remembers everything.",
    body: "Bad shoulder? Forge knows. Knee injury from 2019? Never forgets. It automatically works around your limitations.",
  },
  {
    icon: HelpCircle,
    headline: "It explains the why.",
    body: "Ask why any exercise is in your plan. Get actual exercise science reasoning. Understanding builds trust. Trust builds consistency.",
  },
  {
    icon: Wallet,
    headline: "It costs less than a single session.",
    body: "A human trainer charges $50-150 per hour. Forge gives you 24/7 personalized coaching for under $5/month.",
  },
];

const comparisonRows = [
  { label: "Custom workout plans", traditional: true, forge: true },
  { label: "Remembers your injuries", traditional: false, forge: true },
  { label: "Explains programming decisions", traditional: false, forge: true },
  { label: "Available 24/7", traditional: false, forge: true },
  { label: "Under $5/month", traditional: false, forge: true },
  { label: "Progressive overload tracking", traditional: true, forge: true },
];

const SolutionSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="solution-heading"
    >
      {/* Background effects — asymmetric side glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.07)_0%,transparent_50%)]" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.04)_0%,transparent_60%)]" />

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
            This Is Different
          </motion.p>
          <motion.h2
            id="solution-heading"
            className="font-barlow-condensed text-h1 font-black uppercase mb-4"
            variants={fadeInUp}
          >
            The Trainer You
            <span className="text-primary text-neon block">Always Needed</span>
          </motion.h2>
        </motion.header>

        {/* Horizontal Differentiator Cards */}
        <motion.div
          className="space-y-4 md:space-y-5 max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.headline}
                variants={fadeInUp}
                className="flex gap-5 md:gap-6 p-5 md:p-6 rounded-[20px] border border-border bg-surface-2 card-neon"
              >
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-[10px] border border-primary/30 bg-surface-2 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-[10px] opacity-50" />
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary relative z-10 icon-neon" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h3 className="font-barlow font-bold text-lg text-foreground mb-1 leading-snug">
                    {item.headline}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-barlow">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Desktop table */}
          <div className="hidden md:block rounded-[20px] border border-border/40 bg-surface-2 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-4 font-barlow text-sm text-text-tertiary font-medium" />
                  <th className="p-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary text-center">
                    Traditional Trainer
                  </th>
                  <th className="p-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-primary text-center">
                    Forge
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.label}
                    className={index < comparisonRows.length - 1 ? "border-b border-border/20" : ""}
                  >
                    <td className="p-4 font-barlow text-sm text-text-secondary">
                      {row.label}
                    </td>
                    <td className="p-4 text-center">
                      {row.traditional === true ? (
                        <Check className="w-5 h-5 text-text-tertiary mx-auto" aria-label="Yes" />
                      ) : row.traditional === false ? (
                        <X className="w-5 h-5 text-destructive/60 mx-auto" aria-label="No" />
                      ) : (
                        <span className="text-xs text-text-tertiary font-barlow">{row.traditional}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-primary mx-auto" aria-label="Yes" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile comparison cards */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/20 bg-surface-2 overflow-hidden">
              <div className="p-3 bg-surface-1 text-center border-b border-border/20">
                <span className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary">Traditional</span>
              </div>
              <div className="p-2 space-y-2">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="p-2.5 rounded-lg bg-surface-1/50 flex items-start gap-2">
                    {row.traditional === true ? (
                      <Check className="w-4 h-4 text-text-tertiary mt-0.5 shrink-0" aria-hidden="true" />
                    ) : row.traditional === false ? (
                      <X className="w-4 h-4 text-destructive/60 mt-0.5 shrink-0" aria-hidden="true" />
                    ) : (
                      <span className="text-xs text-text-tertiary mt-0.5 shrink-0">~</span>
                    )}
                    <span className="text-xs text-muted-foreground leading-snug">{row.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/[0.03] overflow-hidden">
              <div className="p-3 bg-primary/10 text-center border-b border-primary/10">
                <span className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-primary">Forge</span>
              </div>
              <div className="p-2 space-y-2">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="p-2.5 rounded-lg bg-surface-0/50 flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground leading-snug">{row.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Research citation callout */}
        <motion.a
          href="https://www.jssm.org/jssm-25-235.xml-Fulltext"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 mx-auto max-w-2xl flex items-start gap-3 p-4 rounded-[14px] border border-primary/15 bg-primary/[0.04] hover:bg-primary/[0.07] transition-colors cursor-pointer group"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span className="mt-0.5 shrink-0 text-primary/60 group-hover:text-primary transition-colors">
            <ExternalLink className="w-4 h-4" />
          </span>
          <p className="text-sm text-text-secondary font-barlow leading-relaxed">
            <span className="text-foreground font-medium">Backed by research:</span>{" "}
            A 2026 peer-reviewed study found AI outperformed certified personal trainers in scientific accuracy, comprehensibility, and actionability.{" "}
            <span className="text-primary/70 group-hover:text-primary transition-colors font-medium">
              Journal of Sports Science and Medicine
            </span>
          </p>
        </motion.a>
      </div>
    </section>
  );
};

export default SolutionSection;
