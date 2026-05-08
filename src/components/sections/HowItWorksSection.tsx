"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Target, Dumbbell } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import StructuredData from "../StructuredData";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Download Forge",
    description:
      "Free on iOS and Android. Your first workout is ready before your coffee gets cold.",
  },
  {
    number: "02",
    icon: Target,
    title: "Answer a Few Questions",
    description:
      "Goals. Schedule. Equipment. Injuries. Your trainer builds a complete picture.",
  },
  {
    number: "03",
    icon: Dumbbell,
    title: "Open the App and Train",
    description:
      "Every set, every rep, every weight is planned for you. Just show up and follow along.",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="pt-12 pb-6 md:pt-16 md:pb-8 bg-surface-1 border-t border-border-subtle relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <StructuredData
        type="howTo"
        name="How to Get Started with Forge AI Personal Training"
        description="Download Forge and start your AI-powered personal training journey in three simple steps."
        steps={steps.map((step) => ({
          name: step.title,
          text: step.description,
        }))}
      />
      <div className="container">
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
            How It Works
          </motion.p>
          <motion.h2
            id="how-it-works-heading"
            variants={fadeInUp}
            className="font-barlow-condensed text-h1 font-black uppercase mb-4"
          >
            Three Steps.
            <span className="text-primary text-neon block">That&apos;s It.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-text-secondary text-lg font-barlow">
            No setup headaches. No learning curve. Just download and train.
          </motion.p>
        </motion.header>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <motion.div
            className="absolute top-24 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.div
            className="grid md:grid-cols-3 gap-8 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="text-center relative"
              >
                {/* Icon Circle */}
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />

                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-primary/30" />

                  {/* Inner circle with icon */}
                  <div className="relative w-full h-full rounded-full bg-surface-1 border border-border flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Number badge */}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-surface-1 border border-border flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-gradient">{step.number}</span>
                  </div>
                </motion.div>

                <h3 className="text-h4 font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
