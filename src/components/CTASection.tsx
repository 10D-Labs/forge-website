import { Apple, Play } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-forge-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-blue-glow opacity-30" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="text-gradient"> Fitness Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Download Forge today and get your personalized AI trainer. Start training smarter, not harder.
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105"
            >
              <Apple className="w-7 h-7" />
              <div className="text-left">
                <span className="text-xs opacity-70 block">Download on the</span>
                <span className="font-semibold">App Store</span>
              </div>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-secondary border border-border hover:bg-secondary/80 transition-all hover:scale-105"
            >
              <Play className="w-7 h-7 fill-current" />
              <div className="text-left">
                <span className="text-xs opacity-70 block">Get it on</span>
                <span className="font-semibold">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
