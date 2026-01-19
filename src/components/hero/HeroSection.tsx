import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GridBackground, GlowOrbs } from "@/components/effects";
import Hero3DPhone from "./Hero3DPhone";
import WaitlistForm from "@/components/WaitlistForm";
import { staggerContainer, fadeInUp, heroContent } from "@/lib/animations";

const HeroSection = () => {
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
          <motion.div
            className="max-w-2xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow / Badge */}
            <motion.div variants={fadeInUp}>
              <span
                className="inline-block font-barlow-condensed text-label-lg text-primary mb-6"
              >
                Build Confidence. Build Strength.
              </span>
            </motion.div>

            {/* Staggered Headline */}
            <motion.h1
              id="hero-heading"
              className="font-barlow-condensed text-display-lg font-black uppercase leading-none mb-8 headline-stagger"
              variants={heroContent}
              itemProp="headline"
            >
              <span>Your</span>
              <span>Personal</span>
              <span>Trainer.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-md"
              variants={fadeInUp}
              itemProp="description"
            >
              Personal training without the $500/month price tag. Custom workouts, real guidance, and an AI that actually knows you.
            </motion.p>

            {/* Waitlist Form */}
            <motion.div
              id="waitlist"
              variants={fadeInUp}
              role="form"
              aria-label="Join waitlist form"
              className="mb-8"
            >
              <WaitlistForm />
              <p className="text-sm text-text-tertiary mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>

          </motion.div>

          {/* Right: 3D Phone */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Hero3DPhone className="relative z-10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="flex flex-col items-center gap-2 pb-8 pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="font-barlow-condensed text-xs text-text-tertiary uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
