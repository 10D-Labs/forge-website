"use client";

import { ChevronDown } from "lucide-react";
import { lazy, Suspense, useState, useEffect } from "react";
import { GridBackground, GlowOrbs } from "@/components/effects";
import HeroPhoneStatic from "./HeroPhoneStatic";
import WaitlistForm from "@/components/WaitlistForm";

// Lazy load the interactive 3D phone (loads Framer Motion)
const Hero3DPhone = lazy(() => import("./Hero3DPhone"));

const HeroSection = () => {
  const [showInteractive, setShowInteractive] = useState(false);

  // Delay loading interactive version until after initial paint
  useEffect(() => {
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setShowInteractive(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setShowInteractive(true), 1000);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <section
      className="relative pt-20 overflow-hidden bg-surface-0"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Background Effects */}
      <GridBackground fadeDirection="bottom" opacity={0.08} />
      <GlowOrbs variant="hero" />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="max-w-2xl hero-animate-container">
            {/* Eyebrow / Badge */}
            <div className="hero-animate-item">
              <span
                className="inline-block font-barlow-condensed text-label-lg text-primary mb-6"
              >
                AI-POWERED PERSONAL TRAINING
              </span>
            </div>

            {/* Staggered Headline */}
            <h1
              id="hero-heading"
              className="font-barlow-condensed text-display-lg font-black uppercase leading-none mb-8 headline-stagger hero-animate-item"
              itemProp="headline"
            >
              <span>Your AI</span>
              <span>Personal</span>
              <span>Trainer.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-md hero-animate-item"
              itemProp="description"
            >
              AI personal training without the $500/month price tag. Whether you're a complete beginner or getting back into it, your AI fitness coach tells you exactly what to do.
            </p>

            {/* Waitlist Form */}
            <div
              id="waitlist"
              role="form"
              aria-label="Join waitlist form"
              className="mb-8 hero-animate-item"
            >
              <WaitlistForm />
              <p className="text-sm text-text-tertiary mt-3">
                Launching soon. We'll notify you first.
              </p>
            </div>

          </div>

          {/* Right: Phone - Static first, then interactive */}
          {/* Fixed container prevents CLS during component swap */}
          <div
            className="relative flex justify-center lg:justify-end hero-animate-phone"
            style={{
              // Reserve exact space for phone to prevent any layout shift
              // This container size matches the phone dimensions at each breakpoint
              contain: "layout",
            }}
          >
            {showInteractive ? (
              <Suspense fallback={<HeroPhoneStatic />}>
                <Hero3DPhone className="relative z-10" />
              </Suspense>
            ) : (
              <HeroPhoneStatic />
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="flex flex-col items-center gap-2 pb-8 pt-4 hero-scroll-indicator"
        aria-hidden="true"
      >
        <span className="font-barlow-condensed text-xs text-text-tertiary uppercase tracking-widest">Scroll</span>
        <div className="hero-scroll-bounce">
          <ChevronDown className="w-5 h-5 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
