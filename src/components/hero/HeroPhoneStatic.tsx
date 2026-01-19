// Static hero phone - renders immediately without Framer Motion
// Used as placeholder while Hero3DPhone lazy loads

const HeroPhoneStatic = () => {
  return (
    <div style={{ perspective: 1000 }}>
      <div className="relative">
        {/* Glow behind phone */}
        <div
          className="absolute inset-0 -z-10 blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            transform: "translateZ(-50px) scale(1.3)",
          }}
        />

        {/* Phone frame wrapper */}
        <div className="relative">
          {/* Main phone image */}
          <img
            src="/app-mockup-hero.webp"
            alt="Forge App interface showing personalized AI fitness trainer with custom workout plans, progress tracking, and real-time guidance"
            className="w-72 md:w-80 lg:w-96 rounded-[2.5rem]"
            style={{
              boxShadow: `
                0 0 0 1px hsl(var(--primary) / 0.1),
                0 25px 50px -12px hsl(0 0% 0% / 0.5),
                0 0 80px hsl(var(--primary) / 0.2)
              `,
            }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          {/* Reflection/shine effect */}
          <div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, transparent 40%, hsl(0 0% 100% / 0.1) 50%, transparent 60%)",
            }}
          />
        </div>

        {/* Static accent elements */}
        <div
          className="absolute -top-8 -right-8 w-16 h-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--forge-cyan) / 0.3) 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--forge-purple) / 0.3) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
};

export default HeroPhoneStatic;
