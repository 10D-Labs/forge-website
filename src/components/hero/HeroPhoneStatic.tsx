// Static hero phone - renders immediately without Framer Motion
// Used as placeholder while Hero3DPhone lazy loads
// CLS Prevention: Fixed dimensions match the responsive sizes exactly

// Fixed dimensions for each breakpoint to prevent CLS
// These match Tailwind's w-72 (288px), md:w-80 (320px), lg:w-96 (384px)
// Aspect ratio ~2.05:1 based on actual image dimensions
const PHONE_DIMENSIONS = {
  width: 384,   // lg:w-96 (largest size for proper aspect ratio)
  height: 788,  // Maintains phone aspect ratio
} as const;

const HeroPhoneStatic = () => {
  return (
    // Fixed container prevents layout shift during component swap
    <div
      className="w-72 md:w-80 lg:w-96"
      style={{
        perspective: 1000,
        // Reserve exact space to prevent CLS
        aspectRatio: `${PHONE_DIMENSIONS.width} / ${PHONE_DIMENSIONS.height}`,
      }}
    >
      <div className="relative w-full h-full">
        {/* Glow behind phone - contained to prevent layout impact */}
        <div
          className="absolute inset-0 -z-10 blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            transform: "translateZ(-50px) scale(1.3)",
            contain: "layout paint",
          }}
          aria-hidden="true"
        />

        {/* Phone frame wrapper */}
        <div className="relative w-full h-full">
          {/* Main phone image with responsive srcset for optimized delivery */}
          <img
            src="/app-mockup-hero.webp"
            srcSet="/app-mockup-hero-576w.webp 576w, /app-mockup-hero-768w.webp 768w, /app-mockup-hero.webp 1080w"
            sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
            alt="Forge App interface showing personalized AI fitness trainer with custom workout plans, progress tracking, and real-time guidance"
            width={PHONE_DIMENSIONS.width}
            height={PHONE_DIMENSIONS.height}
            className="w-full h-full rounded-[2.5rem] object-cover"
            style={{
              boxShadow: `
                0 0 0 1px hsl(var(--primary) / 0.1),
                0 25px 50px -12px hsl(0 0% 0% / 0.5),
                0 0 80px hsl(var(--primary) / 0.2)
              `,
            }}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />

          {/* Reflection/shine effect */}
          <div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, transparent 40%, hsl(0 0% 100% / 0.1) 50%, transparent 60%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Static accent elements - contained to prevent layout impact */}
        <div
          className="absolute -top-8 -right-8 w-16 h-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--forge-cyan) / 0.3) 0%, transparent 70%)",
            contain: "layout paint",
          }}
          aria-hidden="true"
        />

        <div
          className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--forge-purple) / 0.3) 0%, transparent 70%)",
            contain: "layout paint",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default HeroPhoneStatic;
