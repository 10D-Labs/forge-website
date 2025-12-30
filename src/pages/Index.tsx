import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

// Lazy load below-the-fold sections to improve TTI
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const ProblemSection = lazy(() => import("@/components/ProblemSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("scrollTo") === "waitlist") {
      setTimeout(() => {
        const element = document.getElementById("waitlist");
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
          window.scrollTo({ top: middle, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Forge - AI Personal Trainer for Custom Workouts"
        description="Get custom workout plans, 24/7 guidance, and expert-level training from your AI personal trainer. All for a fraction of the cost of a human trainer. Join the waitlist today!"
        canonicalPath="/"
        keywords="AI personal trainer, custom workout plans, AI fitness coach, virtual personal trainer, affordable fitness coaching, 24/7 workout guidance, personalized exercise plans"
      />
      <StructuredData
        type="organization"
        name="Forge"
        url="https://forgetrainer.ai"
        logo="https://forgetrainer.ai/icon-512.png"
        description="Forge is an AI-powered personal trainer that delivers custom workout plans and 24/7 fitness guidance at a fraction of the cost of traditional personal training."
        sameAs={[
          "https://www.instagram.com/forgetrainer",
          "https://www.tiktok.com/@forgetrainer"
        ]}
      />
      <Header />
      <main role="main" itemScope itemType="https://schema.org/WebPage">
        <HeroSection />
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <FeaturesSection />
          <ProblemSection />
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
