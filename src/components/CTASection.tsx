"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

import { GlowOrbs } from "./effects";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-surface-1 relative overflow-hidden border-t border-border-subtle"
      aria-labelledby="cta-heading"
    >
      {/* Background Effects */}
      <GlowOrbs variant="section" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-sm font-semibold text-primary uppercase tracking-wider mb-8"
            >
              <span className="w-2 h-2 bg-primary animate-pulse rounded-full" />
              <span>Available Now</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="cta-heading"
            className="font-barlow-condensed text-display font-black uppercase leading-none mb-8"
            variants={fadeInUp}
          >
            Ready To <span className="text-primary text-neon">Transform?</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto font-barlow"
            variants={fadeInUp}
          >
            Download Forge and start training with{" "}
            <span className="whitespace-nowrap">AI-powered</span> personal training today.
          </motion.p>

          {/* Store Badges */}
          <motion.div className="mb-10 flex flex-col items-center" variants={fadeInUp}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
              <a
                href="https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?ct=cta-bottom&mt=8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Forge on the App Store"
              >
                <img
                  src="/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={140}
                  height={47}
                  className="hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=website&utm_medium=badge&utm_campaign=organic&utm_content=cta-bottom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Forge on Google Play"
              >
                <img
                  src="/google-play-badge.svg"
                  alt="Get it on Google Play"
                  width={155}
                  height={60}
                  className="hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
            <p className="text-sm text-text-tertiary">
              Available on iOS and Android
            </p>
          </motion.div>

          {/* Trust signals */}
          <motion.ul
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary font-barlow list-none"
            variants={fadeInUp}
            aria-label="Benefits"
          >
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Free 7-day trial</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Under $5/month</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Cancel anytime</span>
            </li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
