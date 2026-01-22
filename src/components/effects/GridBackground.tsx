import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  fadeDirection?: "top" | "bottom" | "both" | "none";
  opacity?: number;
}

/**
 * Grid background effect with CLS-safe implementation
 * Uses CSS animations instead of JS-driven opacity changes to prevent layout shifts
 */
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
      // Contain prevents this element from affecting parent layout
      style={{ contain: "strict" }}
    >
      {/* Grid pattern - uses CSS animation for CLS-safe fade in */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / ${opacity}) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / ${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: fadeGradient[fadeDirection],
          WebkitMaskImage: fadeGradient[fadeDirection],
          // GPU acceleration without layout impact
          willChange: "opacity",
          contain: "layout paint",
        }}
      />

      {/* Subtle radial glow at top - uses CSS animation for CLS-safe fade in */}
      <div
        className="absolute inset-0 animate-fade-in-slow"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
          willChange: "opacity",
          contain: "layout paint",
        }}
      />
    </div>
  );
};

export default GridBackground;
