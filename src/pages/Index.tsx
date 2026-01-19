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
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { useScrollToElement } from "@/hooks/useScrollToElement";

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

        {/* CTA - Final conversion push */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
