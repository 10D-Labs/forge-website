import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/hero";
import {
  SocialProofBar,
  HowItWorksSection,
  MeetTheTrainersSection,
} from "@/components/sections";
import FeaturesSection from "@/components/FeaturesSection";
import ProblemSection from "@/components/ProblemSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { useScrollToElement } from "@/hooks/useScrollToElement";

const homepageFAQs = [
  {
    question: "Do I need a personal trainer?",
    answer:
      "A personal trainer provides three things most people struggle to get on their own: custom workout plans tailored to your goals, accountability to stay consistent, and expert guidance so you always know what to do. Studies show people who work with trainers see significantly better results. Forge makes these benefits accessible to everyone.",
  },
  {
    question: "How much does a personal trainer cost?",
    answer:
      "Traditional personal trainers typically charge $50-150 per session, or $300-500 per month for regular training. That puts quality fitness guidance out of reach for most people. Forge provides the same personalized workout plans, real-time coaching, and accountability for a fraction of that cost.",
  },
  {
    question: "What's the best alternative to an expensive personal trainer?",
    answer:
      "Forge is designed specifically for people who want personal trainer-level guidance without the premium price tag. You get custom workout plans built for your goals and schedule, 24/7 coaching support, and built-in accountability - everything a trainer provides, available whenever you need it.",
  },
  {
    question: "Can I get good results without a personal trainer?",
    answer:
      "You can make progress on your own, but personalized guidance dramatically improves both results and consistency. Research shows people with structured programs and accountability are far more likely to reach their goals. Forge bridges this gap by providing expert-level guidance that adapts to you.",
  },
  {
    question: "What is Forge?",
    answer:
      "Forge is a personal trainer in your pocket. It creates custom workout plans based on your goals, fitness level, schedule, and available equipment. You get real-time coaching during workouts, 24/7 support for any fitness questions, and accountability features that keep you consistent - all for a fraction of traditional personal training costs.",
  },
  {
    question: "How is Forge different from other fitness apps?",
    answer:
      "Most fitness apps offer generic workout programs that aren't tailored to you. Forge creates truly personalized plans and provides real-time coaching that adapts as you progress. Plus, you can choose from four distinct trainer personalities - from tough love to gentle encouragement - so you get guidance that matches how you like to train.",
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
];

const Index = () => {
  const location = useLocation();
  const { scrollToElement } = useScrollToElement();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("scrollTo") === "waitlist") {
      setTimeout(() => {
        scrollToElement('waitlist', { center: true });
      }, 100);
    }
  }, [location.search, scrollToElement]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Forge - Build The Body You've Always Wanted"
        description="Ready to transform? Forge combines AI coaching with expert guidance to help you build strength, confidence, and the body you've always wanted. Start today."
        canonicalPath="/"
        keywords="AI personal trainer, custom workout plans, AI fitness coach, virtual personal trainer, affordable fitness coaching, 24/7 workout guidance, personalized exercise plans"
        markdownUrl="/markdown/home.md"
      />
      <StructuredData
        type="organization"
        name="Forge"
        url="https://forgetrainer.ai"
        logo="https://forgetrainer.ai/icon-512.png"
        description="Forge is an AI-powered personal trainer that delivers custom workout plans and 24/7 fitness guidance at a fraction of the cost of traditional personal training."
        sameAs={[
          "https://www.instagram.com/forgetrainer",
          "https://www.tiktok.com/@forgetrainer",
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
        offers={{
          price: "0",
          priceCurrency: "USD",
          description: "Join waitlist to be notified at launch",
        }}
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

      <Header />

      <main role="main" itemScope itemType="https://schema.org/WebPage">
        {/* Hero - Primary conversion point */}
        <HeroSection />

        {/* Social Proof - Build trust immediately */}
        <SocialProofBar />

        {/* Features - Value proposition */}
        <FeaturesSection />

        {/* How It Works - Reduce friction */}
        <HowItWorksSection />

        {/* Problem/Solution - Competitive positioning */}
        <ProblemSection />

        {/* Meet The Trainers - Showcase unique feature */}
        <MeetTheTrainersSection />

        {/* FAQ - Answer common questions, optimize for AI search */}
        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about personal training with Forge"
          questions={homepageFAQs}
        />

        {/* CTA - Final conversion push */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
