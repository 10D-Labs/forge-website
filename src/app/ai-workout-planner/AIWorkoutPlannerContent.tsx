"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Target, Calendar, Dumbbell, TrendingUp, Check } from "lucide-react";
import { GridBackground, GlowOrbs } from "@/components/effects";
import WaitlistForm from "@/components/WaitlistForm";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const valueProps = [
  {
    icon: Target,
    title: "Goal-Based Plans",
    description:
      "Tell Forge your goal: build muscle, lose fat, get stronger, or improve endurance. Your AI workout planner builds a program designed to get you there.",
  },
  {
    icon: Calendar,
    title: "Fits Your Schedule",
    description:
      "Train 3 days a week or 6. 30-minute sessions or 90. Your AI planner adapts your workout plan to the time you actually have.",
  },
  {
    icon: Dumbbell,
    title: "Equipment-Aware",
    description:
      "Home gym with dumbbells? Full commercial gym? Bodyweight only? Forge plans around what you have access to, not what you don't.",
  },
  {
    icon: TrendingUp,
    title: "Progressive Overload Built In",
    description:
      "Every week, your plan progresses. More weight, more reps, or more volume. Forge tracks everything and tells you exactly what to lift next.",
  },
];

const comparison = [
  {
    feature: "Personalized to your goals",
    aiPlanner: true,
    templates: false,
    humanTrainer: true,
  },
  {
    feature: "Adapts to your schedule",
    aiPlanner: true,
    templates: false,
    humanTrainer: true,
  },
  {
    feature: "Programs around injuries",
    aiPlanner: true,
    templates: false,
    humanTrainer: true,
  },
  {
    feature: "Progressive overload tracking",
    aiPlanner: true,
    templates: false,
    humanTrainer: true,
  },
  {
    feature: "Available 24/7",
    aiPlanner: true,
    templates: true,
    humanTrainer: false,
  },
  {
    feature: "Under $20/month",
    aiPlanner: true,
    templates: true,
    humanTrainer: false,
  },
  {
    feature: "Explains why each exercise is chosen",
    aiPlanner: true,
    templates: false,
    humanTrainer: true,
  },
];

const faqs = [
  {
    question: "How does an AI workout planner create my plan?",
    answer:
      "Forge asks about your goals, experience level, schedule, available equipment, and any injuries. It uses that information to build a periodized program with progressive overload, choosing exercises that match your situation and adjusting week to week as you progress.",
  },
  {
    question: "Is an AI workout plan as good as one from a human trainer?",
    answer:
      "A 2023 study in the Journal of Sports Science & Medicine found that AI-generated workout plans matched or exceeded the quality of plans from certified trainers. Forge builds on that with injury awareness, real-time adjustments, and 24/7 availability that most human trainers can't offer.",
  },
  {
    question: "Can the AI planner handle my injuries?",
    answer:
      "Yes. Forge remembers every injury and limitation you report. It automatically substitutes exercises and never programs movements that could aggravate existing issues. You tell it once, and it remembers forever.",
  },
  {
    question: "How often does my plan change?",
    answer:
      "Forge uses periodized programming, so your plan evolves every week with progressive overload. It also adjusts if you miss workouts, report new limitations, or change your goals. It's not a static PDF — it's a living program.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "Whatever you have. Forge plans workouts for full gyms, home setups with basic equipment, or bodyweight-only training. You tell it what's available, and it builds around that.",
  },
  {
    question: "How is this different from free workout plan generators?",
    answer:
      "Free generators give you a one-time plan based on basic inputs. Forge is an ongoing AI trainer: it tracks your progress, increases weights and volume over time, adapts to missed sessions, remembers injuries, and can answer questions about your programming in real time.",
  },
];

export default function AIWorkoutPlannerContent() {
  const heroRef = useRef(null);
  const valueRef = useRef(null);
  const compareRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const valueInView = useInView(valueRef, { once: true, amount: 0.1 });
  const compareInView = useInView(compareRef, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "AI Workout Planner", url: "https://forgetrainer.ai/ai-workout-planner" },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <StructuredData
        type="softwareApplication"
        name="Forge AI Workout Planner"
        alternateName="Forge Workout Planner"
        applicationCategory="HealthApplication"
        applicationSubCategory="Workout Planning"
        operatingSystem={["iOS", "Android"]}
        description="AI workout planner that creates personalized exercise programs based on your goals, schedule, equipment, and injuries. Uses progressive overload and periodized programming."
        offers={[
          {
            name: "Monthly Plan",
            price: "19.99",
            priceCurrency: "USD",
            description: "7-day free trial, then $19.99/month",
            billingPeriod: "P1M",
          },
        ]}
        featureList={[
          "Goal-based personalized workout plans",
          "Schedule-adaptive programming",
          "Equipment-aware exercise selection",
          "Progressive overload tracking",
          "Injury-aware auto-substitution",
          "24/7 AI coaching support",
        ]}
        audienceType="People looking for personalized workout plans without expensive trainers"
        keywords="AI workout planner, workout plan generator, personalized exercise plan"
        datePublished="2026-02-19"
      />

      <main className="pt-20" role="main">
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative py-16 md:py-24 bg-surface-0 overflow-hidden"
          aria-labelledby="planner-heading"
        >
          <GridBackground fadeDirection="bottom" opacity={0.06} />
          <GlowOrbs variant="hero" />

          <div className="container relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-6"
              >
                AI-POWERED WORKOUT PLANNING
              </motion.p>

              <motion.h1
                id="planner-heading"
                variants={fadeInUp}
                className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none mb-8"
              >
                AI Workout{" "}
                <span className="text-primary text-neon">Planner</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-text-secondary font-barlow mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Not a template. Not a random generator. Forge builds workout plans around your
                goals, schedule, equipment, and injuries, then adjusts every week as you progress.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="max-w-md mx-auto mb-8"
                role="form"
                aria-label="Join waitlist form"
              >
                <WaitlistForm />
                <p className="text-sm text-text-tertiary mt-3">
                  Free 7-day trial at launch. No credit card required.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Value Props */}
        <section
          ref={valueRef}
          className="py-16 md:py-24 bg-surface-1 border-t border-border-subtle"
          aria-labelledby="value-heading"
        >
          <div className="container">
            <motion.header
              className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
              initial="hidden"
              animate={valueInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2
                id="value-heading"
                variants={fadeInUp}
                className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-4"
              >
                How Forge Plans{" "}
                <span className="text-primary text-neon">Your Workouts</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-text-secondary text-lg font-barlow"
              >
                Every plan is built from scratch based on who you are and what you need.
              </motion.p>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate={valueInView ? "visible" : "hidden"}
            >
              {valueProps.map((prop) => {
                const Icon = prop.icon;
                return (
                  <motion.div
                    key={prop.title}
                    variants={fadeInUp}
                    className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2"
                  >
                    <div className="w-14 h-14 rounded-[10px] border border-primary/30 bg-surface-2 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-3">
                      {prop.title}
                    </h3>
                    <p className="text-text-secondary font-barlow leading-relaxed">
                      {prop.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Comparison */}
        <section
          ref={compareRef}
          className="py-16 md:py-24 bg-surface-0 border-t border-border-subtle"
          aria-labelledby="compare-heading"
        >
          <div className="container">
            <motion.header
              className="max-w-2xl mx-auto text-center mb-12"
              initial="hidden"
              animate={compareInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2
                id="compare-heading"
                variants={fadeInUp}
                className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-4"
              >
                AI Planner vs Templates vs{" "}
                <span className="text-primary text-neon">Human Trainers</span>
              </motion.h2>
            </motion.header>

            <motion.div
              className="max-w-3xl mx-auto overflow-x-auto"
              initial="hidden"
              animate={compareInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <table className="w-full text-left border-collapse" role="table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary">
                      Feature
                    </th>
                    <th className="py-4 px-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-primary text-center">
                      Forge AI
                    </th>
                    <th className="py-4 px-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary text-center">
                      Templates
                    </th>
                    <th className="py-4 px-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary text-center">
                      Human Trainer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-border-subtle">
                      <td className="py-4 px-4 font-barlow text-text-secondary">
                        {row.feature}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.aiPlanner ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-text-tertiary">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.templates ? (
                          <Check className="w-5 h-5 text-text-tertiary mx-auto" />
                        ) : (
                          <span className="text-text-tertiary">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.humanTrainer ? (
                          <Check className="w-5 h-5 text-text-tertiary mx-auto" />
                        ) : (
                          <span className="text-text-tertiary">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title="AI Workout Planner Questions"
          subtitle="Common questions about how Forge plans your workouts"
          questions={faqs}
        />

        {/* Bottom CTA */}
        <section className="py-16 md:py-24 bg-surface-1 border-t border-border-subtle relative overflow-hidden">
          <GlowOrbs variant="section" />
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-6">
                Stop Guessing.{" "}
                <span className="text-primary text-neon">Start Training.</span>
              </h2>
              <p className="text-lg text-text-secondary font-barlow mb-8">
                Join the waitlist and get a personalized workout plan from an AI that actually
                knows what it's doing.
              </p>
              <div
                className="max-w-md mx-auto mb-8"
                role="form"
                aria-label="Join waitlist form"
              >
                <WaitlistForm />
              </div>
              <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary font-barlow list-none">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Free 7-day trial</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Under $20/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Cancel anytime</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
