import WaitlistForm from "./WaitlistForm";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section 
      className="py-20 md:py-28 bg-forge-dark relative overflow-hidden"
      aria-labelledby="cta-heading"
      itemScope
      itemType="https://schema.org/Action"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-blue-glow opacity-30" aria-hidden="true" />

      <div className="container relative z-10">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 
            id="cta-heading" 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            itemProp="name"
          >
            Ready to Transform Your
            <span className="text-gradient block">Fitness Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto" itemProp="description">
            Join the waitlist to be the first to experience the future of personal trainers. Start training smarter, not
            harder.
          </p>

          {/* Waitlist Form */}
          <div
            className={`flex justify-center transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            role="form"
            aria-label="Join waitlist"
          >
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
