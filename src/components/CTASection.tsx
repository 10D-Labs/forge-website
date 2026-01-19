import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import WaitlistForm from "./WaitlistForm";
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
              className="inline-flex items-center gap-2 px-4 py-2 angular-border-sm [--angular-bg:hsl(var(--surface-1))] [--angular-border-color:hsl(var(--primary)/0.3)] font-barlow-condensed text-sm font-semibold text-primary uppercase tracking-wider mb-8"
            >
              <span className="w-2 h-2 bg-primary animate-pulse relative z-10" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
              <span className="relative z-10">Launching Soon</span>
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
            Join thousands of others who are ready to transform their fitness with{" "}
            <span className="whitespace-nowrap">AI-powered</span> personal training. Be first in line when we launch.
          </motion.p>

          {/* Waitlist Form */}
          <motion.div
            className="max-w-md mx-auto mb-10"
            variants={fadeInUp}
            role="form"
            aria-label="Join waitlist form"
          >
            <WaitlistForm />
          </motion.div>

          {/* Trust signals */}
          <motion.ul
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary font-barlow list-none"
            variants={fadeInUp}
            aria-label="Benefits"
          >
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Free to join waitlist</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>No credit card required</span>
            </li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
