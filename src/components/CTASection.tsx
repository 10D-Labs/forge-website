import WaitlistForm from "./WaitlistForm";

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
            Join the waitlist to be the first to experience your personalized AI trainer. Start training smarter, not harder.
          </p>

          {/* Waitlist Form */}
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
