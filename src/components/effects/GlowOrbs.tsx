import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowOrbsProps {
  className?: string;
  variant?: "hero" | "section" | "subtle";
}

const GlowOrbs = ({ className, variant = "hero" }: GlowOrbsProps) => {
  const orbConfigs = {
    hero: [
      {
        size: 600,
        color: "hsl(var(--primary) / 0.12)",
        position: { top: "-20%", left: "-10%" },
        animation: {
          x: [0, 50, 0],
          y: [0, 30, 0],
        },
        duration: 20,
      },
      {
        size: 400,
        color: "hsl(var(--primary) / 0.08)",
        position: { bottom: "10%", right: "-5%" },
        animation: {
          x: [0, -30, 0],
          y: [0, -50, 0],
        },
        duration: 15,
      },
      {
        size: 300,
        color: "hsl(var(--primary) / 0.06)",
        position: { top: "40%", right: "20%" },
        animation: {
          x: [0, 40, 0],
          y: [0, -30, 0],
        },
        duration: 18,
      },
    ],
    section: [
      {
        size: 400,
        color: "hsl(var(--primary) / 0.08)",
        position: { top: "10%", left: "-5%" },
        animation: {
          x: [0, 30, 0],
          y: [0, 20, 0],
        },
        duration: 22,
      },
      {
        size: 300,
        color: "hsl(var(--primary) / 0.05)",
        position: { bottom: "20%", right: "-10%" },
        animation: {
          x: [0, -20, 0],
          y: [0, -30, 0],
        },
        duration: 18,
      },
    ],
    subtle: [
      {
        size: 300,
        color: "hsl(var(--primary) / 0.04)",
        position: { top: "20%", left: "10%" },
        animation: {
          x: [0, 20, 0],
          y: [0, 15, 0],
        },
        duration: 25,
      },
    ],
  };

  const orbs = orbConfigs[variant];

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            ...orb.position,
          }}
          animate={orb.animation}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default GlowOrbs;
