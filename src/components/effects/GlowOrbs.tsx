import { cn } from "@/lib/utils";

interface GlowOrbsProps {
  className?: string;
  variant?: "hero" | "section" | "subtle";
}

// CSS-only glow orbs - no Framer Motion dependency for better performance
const GlowOrbs = ({ className, variant = "hero" }: GlowOrbsProps) => {
  const orbConfigs = {
    hero: [
      {
        size: 600,
        color: "hsl(var(--primary) / 0.12)",
        position: { top: "-20%", left: "-10%" },
        animationClass: "animate-orb-1",
      },
      {
        size: 400,
        color: "hsl(var(--primary) / 0.08)",
        position: { bottom: "10%", right: "-5%" },
        animationClass: "animate-orb-2",
      },
      {
        size: 300,
        color: "hsl(var(--primary) / 0.06)",
        position: { top: "40%", right: "20%" },
        animationClass: "animate-orb-3",
      },
    ],
    section: [
      {
        size: 400,
        color: "hsl(var(--primary) / 0.08)",
        position: { top: "10%", left: "-5%" },
        animationClass: "animate-orb-1",
      },
      {
        size: 300,
        color: "hsl(var(--primary) / 0.05)",
        position: { bottom: "20%", right: "-10%" },
        animationClass: "animate-orb-2",
      },
    ],
    subtle: [
      {
        size: 300,
        color: "hsl(var(--primary) / 0.04)",
        position: { top: "20%", left: "10%" },
        animationClass: "animate-orb-3",
      },
    ],
  };

  const orbs = orbConfigs[variant];

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
      style={{ contain: "strict" }}
    >
      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${orb.animationClass}`}
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            ...orb.position,
            willChange: "transform",
            contain: "layout paint",
          }}
        />
      ))}
    </div>
  );
};

export default GlowOrbs;
