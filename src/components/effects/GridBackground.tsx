import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  fadeDirection?: "top" | "bottom" | "both" | "none";
  opacity?: number;
}

const GridBackground = ({
  className,
  fadeDirection = "both",
  opacity = 0.03,
}: GridBackgroundProps) => {
  const fadeGradient = {
    top: "linear-gradient(to bottom, transparent, black 30%)",
    bottom: "linear-gradient(to bottom, black 70%, transparent)",
    both: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
    none: "none",
  };

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* Grid pattern */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / ${opacity}) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / ${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: fadeGradient[fadeDirection],
          WebkitMaskImage: fadeGradient[fadeDirection],
        }}
      />

      {/* Subtle radial glow at top */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
        }}
      />
    </div>
  );
};

export default GridBackground;
