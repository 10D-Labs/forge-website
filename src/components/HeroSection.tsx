import { useEffect, useState } from "react";
import appMockupHero from "@/assets/app-mockup-hero-new.webp";
import WaitlistForm from "./WaitlistForm";

// Base64 tiny placeholder - blurred version
const PLACEHOLDER_BLUR = "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoQABwAPm0qkEWkIqGYBABABsS0AAAMvuP4APy9gAD++Pb/rX/lP/N/8X/if+r/6L/q/+q/5//s/93/1P/af9V/6IAA";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-hero-gradient"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-blue-glow opacity-50" aria-hidden="true" />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div
            className={`max-w-xl transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-all duration-500 delay-100 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              role="status"
              aria-label="Coming soon announcement"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">Coming Soon</span>
            </div>

            <h1
              id="hero-heading"
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              itemProp="headline"
            >
              Your Personal AI
              <span className="text-gradient block">Fitness Trainer</span>
            </h1>

            <p
              className={`text-lg text-muted-foreground mb-8 leading-relaxed transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              itemProp="description"
            >
              Get expert-level workout plans, personalized guidance, and 24/7 support from your AI trainer — all for a
              fraction of the cost of a human trainer.
            </p>

            {/* Waitlist Form */}
            <div
              id="waitlist"
              className={`transition-all duration-700 delay-[400ms] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              role="form"
              aria-label="Join waitlist form"
            >
              <WaitlistForm />
              <p className="text-sm text-muted-foreground mt-3">Be the first to know when we launch.</p>
            </div>
          </div>

          {/* App Mockup with LQIP */}
          <div className="relative flex justify-center lg:justify-end">
            <figure
              className={`animate-float transition-all duration-1000 ease-out delay-500 ${
                isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-95"
              }`}
            >
              <div className="relative w-60 md:w-64 lg:w-80">
                {/* Blur placeholder - shows immediately */}
                <img
                  src={PLACEHOLDER_BLUR}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 w-full h-full rounded-3xl object-cover blur-md scale-105 transition-opacity duration-500 ${
                    imageLoaded ? "opacity-0" : "opacity-100"
                  }`}
                />
                {/* Full quality image */}
                <img
                  src={appMockupHero}
                  alt="Forge App interface showing personalized AI fitness trainer with custom workout plans, progress tracking, and real-time guidance features"
                  className={`w-full rounded-3xl animate-glow-pulse drop-shadow-2xl shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-opacity duration-500 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="320"
                  height="560"
                  itemProp="image"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <figcaption className="sr-only">
                Forge mobile app displaying AI-powered workout recommendations and fitness tracking
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
