import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";

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
        title="Forge - Your Personal AI Fitness Trainer | Custom Workouts & 24/7 Guidance"
        description="Get custom workout plans, 24/7 guidance, and expert-level training from your AI personal trainer. All for a fraction of the cost of a human trainer. Join the waitlist today!"
        canonicalPath="/"
        keywords="AI fitness trainer, personal trainer app, AI workout app, fitness coaching, custom workout plans, AI gym trainer, affordable personal training"
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
