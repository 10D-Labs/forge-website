import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { HeroSection } from "@/components/hero";
import { SocialProofBar } from "@/components/sections";
import StructuredData from "@/components/StructuredData";
import HomeScrollHandler from "@/components/HomeScrollHandler";

async function getAppStoreRating() {
  try {
    const res = await fetch(
      "https://itunes.apple.com/lookup?id=6758403402&country=us",
      { next: { revalidate: 86400 } }
    );
    const data = await res.json();
    const app = data.results?.[0];
    if (app?.averageUserRating != null && app?.userRatingCount != null) {
      return {
        ratingValue: String(app.averageUserRating),
        ratingCount: String(app.userRatingCount),
      };
    }
  } catch {
    // Fall through to null
  }
  return null;
}

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
const PainMirrorSection = dynamic(() => import("@/components/sections/PainMirrorSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ProblemSection = dynamic(() => import("@/components/ProblemSection"), {
  loading: () => <div className="min-h-[300px]" />,
});
const SolutionSection = dynamic(() => import("@/components/sections/SolutionSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const MeetTheTrainersSection = dynamic(() => import("@/components/sections/MeetTheTrainersSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const TransformationSection = dynamic(() => import("@/components/sections/TransformationSection"), {
  loading: () => <div className="min-h-[300px]" />,
});
const HowItWorksSection = dynamic(() => import("@/components/sections/HowItWorksSection"), {
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
      "Traditional personal trainers typically charge $50-150 per session, or $300-500 per month for regular training. That puts quality fitness guidance out of reach for most people. Forge provides the same personalized workout plans, real-time coaching, and accountability for around $4/month on the annual plan ($49.99/year), with monthly ($19.99/month) and weekly ($6.99/week) options too. Every plan starts with a free 7-day trial.",
  },
  {
    question: "What is an AI personal trainer?",
    answer:
      "An AI personal trainer is software that uses artificial intelligence to do what a human personal trainer does: create custom workout plans, coach you through exercises, track your progress, and adjust your programming over time. Forge is an AI personal trainer app that goes further by offering four distinct AI trainers with different coaching styles, remembering your injury history permanently, and explaining the reasoning behind every exercise in your plan.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer:
      "Forge was built for you. You don't need to know any exercises, have a routine, or even know what muscles you want to train. Tell Forge your goals and experience level, and it builds a complete program from scratch. Every exercise includes step-by-step instructions and form cues. Your AI trainer answers any question, anytime. No judgment, no stupid questions.",
  },
  {
    question: "What if I have injuries or physical limitations?",
    answer:
      "Tell Forge about your injuries once, and it never forgets. Bad shoulder? Forge will never program overhead presses. Knee issues from years ago? It automatically works around them and substitutes exercises you can do safely. You'll never have to explain your limitations to a new app or trainer again.",
  },
  {
    question: "How is Forge different from Fitbod and other fitness apps?",
    answer:
      "Most fitness apps use fatigue-based algorithms that suggest random exercise combinations. Forge uses periodized programming with progressive overload to systematically increase your weights week over week. It remembers your injury history and auto-substitutes exercises you can't do. And you can ask the AI to explain WHY any exercise is in your plan. No other app does that.",
  },
  {
    question: "Is AI fitness coaching effective?",
    answer:
      "Yes. A 2026 peer-reviewed study published in the Journal of Sports Science and Medicine found that AI outperformed certified personal trainers in scientific accuracy, comprehensibility, and actionability. Forge delivers personalized programming, progressive overload tracking, and 24/7 coaching that most human trainers can't match in availability or consistency.",
  },
  {
    question: "What if I don't have a gym membership?",
    answer:
      "Forge builds workouts around whatever equipment you have. Full gym, home dumbbells, resistance bands, or just your bodyweight. Tell Forge what you have access to, and it programs accordingly.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel through the App Store or Google Play anytime during or after your trial. You'll keep full access until the end of your current billing period, and you won't be charged again.",
  },
];


export default async function HomePage() {
  const appStoreRating = await getAppStoreRating();

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
          "https://www.instagram.com/forgetrainerapp",
          "https://www.tiktok.com/@forgetrainerapp",
          "https://github.com/10D-Labs",
        ]}
      />
      <StructuredData type="website" name="Forge" url="https://forgetrainer.ai" />
      <StructuredData
        type="softwareApplication"
        name="Forge Trainer: Gym & Strength"
        alternateName="Forge"
        applicationCategory="HealthApplication"
        applicationSubCategory="Strength Training"
        operatingSystem={["iOS", "Android"]}
        description="Stop wandering the gym without a plan. Forge builds custom workouts for your goals, schedule, and injuries. 4 AI coaches that remember your history and explain every exercise. Under $5/mo vs $300-500 for a human trainer. Free 7-day trial."
        {...(appStoreRating && { aggregateRating: appStoreRating })}
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
            price: "49.99",
            priceCurrency: "USD",
            description: "7-day free trial, then $49.99/year (on sale from $179.99)",
            billingPeriod: "P1Y",
          },
        ]}
        featureList={[
          "Custom workout plans tailored to your goals",
          "24/7 personal training guidance",
          "Multiple AI trainers to match your style",
          "Progress tracking and accountability",
          "Exercise form guidance",
          "Workout scheduling and reminders",
        ]}
        audienceType="People seeking affordable personal training, gym beginners who need guidance, busy professionals who can't schedule trainer sessions"
        keywords="personal trainer, fitness coach, workout guidance, affordable training, fitness app"
        datePublished="2025-12-17"
      />

      {/* Handle legacy #waitlist links — redirects to /download */}
      <Suspense fallback={null}>
        <HomeScrollHandler />
      </Suspense>

      <main role="main" itemScope itemType="https://schema.org/WebPage">
        {/* 1. Hero - Promise + identity hook */}
        <HeroSection />

        {/* 2. Credibility Bar - Instant trust anchor */}
        <SocialProofBar />

        {/* 3. Pain Mirror - Emotional identification */}
        <PainMirrorSection />

        {/* 4. Problem - Validate past failures */}
        <ProblemSection />

        {/* 5. Solution - Unique mechanism reveal */}
        <SolutionSection />

        {/* 6. Trainers - Personalization + differentiation */}
        <MeetTheTrainersSection />

        {/* 7. Transformation - Paint the "after" picture */}
        <TransformationSection />

        {/* 8. How It Works - Make it feel effortless */}
        <HowItWorksSection />

        {/* 9. FAQ - Handle final objections */}
        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about training with Forge"
          questions={homepageFAQs}
        />

        {/* 10. Final CTA - Close with emotional urgency */}
        <CTASection />
      </main>
    </div>
  );
}
