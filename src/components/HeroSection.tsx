import { useEffect, useState } from "react";
import appMockup from "@/assets/app-mockup-hero.png";
import WaitlistForm from "./WaitlistForm";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-hero-gradient">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-blue-glow opacity-50" />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div
            className={`max-w-xl transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
              <span className="text-sm font-medium text-primary">Coming Soon</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Personal AI
              <span className="text-gradient block">Fitness Trainer</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Get expert-level workout plans, personalized guidance, and 24/7 support from your AI trainer — all for a fraction of the cost of a human trainer.
            </p>

            {/* Waitlist Form */}
            <div id="waitlist">
              <WaitlistForm />
              <p className="text-sm text-muted-foreground mt-3">Be the first to know when we launch.</p>
            </div>
          </div>

          {/* App Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className={`animate-float transition-all duration-700 ease-out delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <img 
                src={appMockup} 
                alt="Forge App - Personal AI Fitness Trainer showing custom workout plans and progress tracking" 
                className="w-60 md:w-64 lg:w-80 drop-shadow-2xl rounded-3xl" 
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
