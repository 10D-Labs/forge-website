import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// Use public path for preload compatibility
const appMockupHero = "/app-mockup-hero.webp";

// Fixed dimensions for CLS prevention
// These match Tailwind's w-72 (288px), md:w-80 (320px), lg:w-96 (384px)
// Aspect ratio ~2.05:1 based on actual image dimensions
const PHONE_DIMENSIONS = {
  width: 384,
  height: 788,
} as const;

interface Hero3DPhoneProps {
  className?: string;
}

const Hero3DPhone = ({ className }: Hero3DPhoneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Cache rect to avoid forced reflow on every mouse move
  const [cachedRect, setCachedRect] = useState<DOMRect | null>(null);

  // Detect touch device synchronously to prevent hydration mismatch
  // Use matchMedia for more reliable detection
  const isTouchDevice = typeof window !== 'undefined' &&
    (window.matchMedia?.('(pointer: coarse)')?.matches || false);

  // Mouse position values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural movement
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  // Cache getBoundingClientRect on mount and resize to prevent forced reflow
  useEffect(() => {
    if (!ref.current || isTouchDevice) return;

    const updateRect = () => {
      if (ref.current) {
        setCachedRect(ref.current.getBoundingClientRect());
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [isTouchDevice]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cachedRect || isTouchDevice) return;

    const centerX = cachedRect.left + cachedRect.width / 2;
    const centerY = cachedRect.top + cachedRect.height / 2;

    // Normalize to -0.5 to 0.5
    const x = (e.clientX - centerX) / cachedRect.width;
    const y = (e.clientY - centerY) / cachedRect.height;

    mouseX.set(x);
    mouseY.set(y);
  }, [cachedRect, isTouchDevice, mouseX, mouseY]);

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    // Fixed container prevents layout shift - matches HeroPhoneStatic exactly
    <div
      ref={ref}
      className={`w-72 md:w-80 lg:w-96 ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        aspectRatio: `${PHONE_DIMENSIONS.width} / ${PHONE_DIMENSIONS.height}`,
      }}
    >
      {/* 3D Phone Container */}
      <motion.div
        className="relative"
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow behind phone - contained to prevent layout impact */}
        <motion.div
          className="absolute inset-0 -z-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            transform: "translateZ(-50px) scale(1.3)",
            contain: "layout paint",
          }}
          initial={{ opacity: 0.5 }}
          animate={shouldReduceMotion ? { opacity: 0.5 } : { opacity: [0.4, 0.6, 0.4] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          aria-hidden="true"
        />

        {/* Phone frame wrapper */}
        <motion.div
          className="relative w-full h-full"
          animate={shouldReduceMotion ? undefined : { y: [0, -15, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {/* Main phone image with responsive srcset for optimized delivery */}
          <motion.img
            src={appMockupHero}
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
              transform: "translateZ(20px)",
            }}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />

          {/* Reflection/shine effect */}
          <motion.div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, transparent 40%, hsl(0 0% 100% / 0.1) 50%, transparent 60%)",
              transform: "translateZ(25px)",
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : { backgroundPosition: ["200% 200%", "-200% -200%"] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 8, repeat: Infinity, ease: "linear" }
            }
          />
        </motion.div>

        {/* Floating accent elements - contained to prevent layout impact */}
        <motion.div
          className="absolute -top-8 -right-8 w-16 h-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--forge-cyan) / 0.3) 0%, transparent 70%)",
            transform: "translateZ(40px)",
            contain: "layout paint",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -10, 0], x: [0, 5, 0], scale: [1, 1.1, 1] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }
          aria-hidden="true"
        />

        <motion.div
          className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--forge-purple) / 0.3) 0%, transparent 70%)",
            transform: "translateZ(30px)",
            contain: "layout paint",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, 8, 0], x: [0, -5, 0], scale: [1, 1.15, 1] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
};

export default Hero3DPhone;
