import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { HeroSection } from "@/components/hero";
import { SocialProofBar } from "@/components/sections";
import StructuredData from "@/components/StructuredData";
import HomeScrollHandler from "@/components/HomeScrollHandler";

// Metadata with markdown discovery for LLM crawlers
export const metadata: Metadata = {
  alternates: {
    canonical: "https://forgetrainer.ai/",
    types: {
      "text/markdown": "/markdown/home.md",
    },
  },
};

// Dynamic imports for below-fold sections - code splitting reduces initial bundle
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const HowItWorksSection = dynamic(() => import("@/components/sections/HowItWorksSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ProblemSection = dynamic(() => import("@/components/ProblemSection"), {
  loading: () => <div className="min-h-[300px]" />,
});
const MeetTheTrainersSection = dynamic(() => import("@/components/sections/MeetTheTrainersSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  loading: () => <div className="min-h-[300px]" />,
});
const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => <div className="min-h-[200px]" />,
});

const homepageFAQs = [
  {
    question: "How much does a personal trainer cost?",
    answer:
      "Traditional personal trainers typically charge $50-150 per session, or $300-500 per month for regular training. That puts quality fitness guidance out of reach for most people. Forge provides the same personalized workout plans, real-time coaching, and accountability for a fraction of that cost.",
  },
  {
    question: "What is Forge?",
    answer:
      "Forge is a personal trainer in your pocket. It creates custom workout plans based on your goals, fitness level, schedule, and available equipment. You get real-time coaching during workouts, 24/7 support for any fitness questions, and accountability features that keep you consistent - all for a fraction of traditional personal training costs.",
  },
  {
    question: "How is Forge different from other fitness apps?",
    answer:
      "Apps like Fitbod use fatigue-based algorithms that often suggest illogical exercise combinations. Forge is different: it uses periodized programming with progressive overload to systematically increase your weights week over week. It remembers your complete history — including injuries — and auto-substitutes exercises you can't do. The AI can explain WHY it's programming each exercise, so you understand the logic. Plus, choose from four trainer personalities.",
  },
  {
    question: "How does Forge help with exercise form?",
    answer:
      "Every exercise includes detailed instructions, form cues, and common mistakes to avoid. You can ask your AI trainer questions like 'How do I keep my back straight during deadlifts?' and get specific guidance. No filming required - Forge teaches proper form through clear explanations you can reference anytime, even mid-workout.",
  },
  {
    question: "Can I choose my trainer's personality?",
    answer:
      "Yes! Forge offers four distinct AI trainers: Sergeant Stone for tough love and no excuses, Maya for supportive and encouraging guidance, Mike for a casual gym buddy vibe, and Reese for data-driven technical coaching. You can switch trainers anytime to find the style that motivates you best.",
  },
  {
    question: "What if I have injuries or limitations?",
    answer:
      "Forge remembers every injury you tell it — shoulder issues, bad back, knee problems, all of it. Unlike human trainers who forget or apps that ignore your settings, Forge automatically programs around your limitations. It substitutes exercises you can't do and never suggests movements that would aggravate old injuries. You'll never have to explain your history again.",
  },
  {
    question: "What is an AI personal trainer?",
    answer:
      "An AI personal trainer is software that uses artificial intelligence to do what a human personal trainer does: create custom workout plans, coach you through exercises, track your progress, and adjust your programming over time. Forge is an AI personal trainer app that goes further by offering four distinct trainer personalities, remembering your injury history, and explaining the reasoning behind every exercise in your plan.",
  },
  {
    question: "How much does Forge cost?",
    answer:
      "Forge offers three plans: $6.99/week, $19.99/month, or $179.99/year (about $15/month). All plans include a 7-day free trial. Compare that to traditional personal trainers at $300-500/month, and Forge delivers similar personalized guidance for roughly 95% less.",
  },
  {
    question: "Is AI fitness coaching effective?",
    answer:
      "Yes. A 2023 study published in the Journal of Sports Science & Medicine found that AI-generated workout plans matched or exceeded the quality of plans created by certified personal trainers. Forge builds on that foundation by adding real-time coaching, injury awareness, progressive overload tracking, and trainer personalities that keep you engaged long-term.",
  },
];


export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data for SEO */}
      <StructuredData
        type="organization"
        name="Forge"
        url="https://forgetrainer.ai"
        logo="https://forgetrainer.ai/icon-512.png"
        description="Forge is an AI-powered personal trainer that delivers custom workout plans and 24/7 fitness guidance at a fraction of the cost of traditional personal training."
        sameAs={[
          "https://www.instagram.com/forgetrainer",
          "https://www.tiktok.com/@forgetrainer",
          "https://github.com/10D-Labs",
        ]}
      />
      <StructuredData type="website" name="Forge" url="https://forgetrainer.ai" />
      <StructuredData
        type="softwareApplication"
        name="Forge"
        alternateName="Forge Personal Trainer"
        applicationCategory="HealthApplication"
        applicationSubCategory="Personal Training"
        operatingSystem={["iOS", "Android"]}
        description="Affordable personal trainer in your pocket. Get custom workout plans, real-time coaching, and 24/7 guidance for a fraction of traditional personal training costs. Perfect for people who want expert fitness guidance but can't afford $300-500/month trainer fees."
        offers={[
          {
            name: "Weekly Plan",
            price: "6.99",
            priceCurrency: "USD",
            description: "7-day free trial, then $6.99/week",
            billingPeriod: "P1W",
          },
          {
            name: "Monthly Plan",
            price: "19.99",
            priceCurrency: "USD",
            description: "7-day free trial, then $19.99/month",
            billingPeriod: "P1M",
          },
          {
            name: "Annual Plan",
            price: "179.99",
            priceCurrency: "USD",
            description: "7-day free trial, then $179.99/year (best value)",
            billingPeriod: "P1Y",
          },
        ]}
        featureList={[
          "Custom workout plans tailored to your goals",
          "24/7 personal training guidance",
          "Multiple trainer personalities to match your style",
          "Progress tracking and accountability",
          "Exercise form guidance",
          "Workout scheduling and reminders",
        ]}
        audienceType="People seeking affordable personal training, gym beginners who need guidance, busy professionals who can't schedule trainer sessions"
        keywords="personal trainer, fitness coach, workout guidance, affordable training, fitness app"
        datePublished="2025-12-17"
      />

      {/* Handle scroll to waitlist from URL params */}
      <Suspense fallback={null}>
        <HomeScrollHandler />
      </Suspense>

      <main role="main" itemScope itemType="https://schema.org/WebPage">
        {/* Hero - Primary conversion point */}
        <HeroSection />

        {/* Social Proof - Build trust immediately */}
        <SocialProofBar />

        {/* Below-fold sections - dynamically loaded to reduce initial JS */}
        <FeaturesSection />
        <HowItWorksSection />
        <ProblemSection />
        <MeetTheTrainersSection />
        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about personal training with Forge"
          questions={homepageFAQs}
        />
        <CTASection />
      </main>
    </div>
  );
}
