import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProblemSection from "@/components/ProblemSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("scrollTo") === "waitlist") {
      // Small delay to ensure page is rendered
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
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProblemSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
