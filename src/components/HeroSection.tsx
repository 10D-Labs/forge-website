import appMockup1 from "@/assets/app-mockup-1.png";
import appMockup2 from "@/assets/app-mockup-2.png";
import WaitlistForm from "./WaitlistForm";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-hero-gradient">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-blue-glow opacity-50" />
      
      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="max-w-xl animate-fade-up">
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

          {/* App Mockups */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Primary phone */}
              <div className="relative z-20 animate-float">
                <img src={appMockup1} alt="Forge App - Workout Tracking" className="w-64 md:w-72 lg:w-80 rounded-3xl shadow-2xl glow-blue" />
              </div>
              
              {/* Secondary phone */}
              <div className="absolute -right-12 md:-right-20 top-16 md:top-24 z-10 animate-float-delayed">
                <img src={appMockup2} alt="Forge App - AI Chat" className="w-52 md:w-60 lg:w-64 rounded-3xl shadow-xl opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;