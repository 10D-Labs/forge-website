"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Target, Dumbbell } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import WaitlistForm from "../WaitlistForm";
import StructuredData from "../StructuredData";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Join the Waitlist",
    description:
      "Enter your email now. We'll notify you the moment the app is ready to download.",
  },
  {
    number: "02",
    icon: Target,
    title: "Tell Us Your Goals",
    description:
      "When the app launches, share your fitness level, goals, schedule, injuries, and more. Your AI trainer builds a complete picture of you.",
  },
  {
    number: "03",
    icon: Dumbbell,
    title: "Start Training",
    description:
      "Open the app, follow the workout, done. Zero decisions required. Your trainer tells you exactly what to do and adapts as you progress.",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="pt-12 pb-6 md:pt-16 md:pb-8 bg-background relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <StructuredData
        type="howTo"
        name="How to Get Started with Forge AI Personal Training"
        description="Join the Forge waitlist and start your AI-powered personal training journey in three simple steps."
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
            className="text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            Simple Process
          </motion.p>
          <motion.h2
            id="how-it-works-heading"
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Get Started in
            <span className="text-gradient block">Three Easy Steps</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
            Join the waitlist today. When we launch, you'll be training in minutes.
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

                {/* Waitlist Form after Step 1 on mobile only */}
                {index === 0 && (
                  <motion.div
                    className="max-w-md mx-auto mt-8 md:hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <WaitlistForm />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Waitlist Form - desktop only */}
          <motion.div
            className="max-w-md mx-auto mt-12 hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <WaitlistForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
