"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const outcomes = [
  "Walk into the gym knowing exactly what to do.",
  "See your weights go up week after week.",
  "Stop explaining your injuries to every new app.",
  "Train on YOUR schedule, not a trainer\u2019s.",
  "Actually look forward to your next workout.",
  "Spend $5/month instead of $500.",
];

const TransformationSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="transformation-heading"
    >
      {/* Background effects — dual corner glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.04)_0%,transparent_50%)]" />

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
            What Changes?
          </motion.p>
          <motion.h2
            id="transformation-heading"
            className="font-barlow-condensed text-h1 font-black uppercase mb-4"
            variants={fadeInUp}
          >
            This Is What&apos;s
            <span className="text-primary text-neon block">Waiting For You</span>
          </motion.h2>
        </motion.header>

        {/* Outcomes Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {outcomes.map((outcome) => (
            <motion.div
              key={outcome}
              variants={fadeInUp}
              className="flex items-start gap-4 p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 card-neon"
            >
              <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              </span>
              <p className="font-barlow font-medium text-foreground leading-snug">
                {outcome}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationSection;
