import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import appMockupHero from "@/assets/app-mockup-hero-new.webp";

// Blur placeholder for loading
const PLACEHOLDER_BLUR =
  "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoQABwAPm0qkEWkIqGYBABABsS0AAAMvuP4APy9gAD++Pb/rX/lP/N/8X/if+r/6L/q/+q/5//s/93/1P/af9V/6IAA";

interface Hero3DPhoneProps {
  className?: string;
}

const Hero3DPhone = ({ className }: Hero3DPhoneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Mouse position values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural movement
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isTouchDevice) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -0.5 to 0.5
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
      style={{ perspective: 1000 }}
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
        {/* Glow behind phone */}
        <motion.div
          className="absolute inset-0 -z-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            transform: "translateZ(-50px) scale(1.3)",
          }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Phone frame wrapper */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Blur placeholder */}
          <img
            src={PLACEHOLDER_BLUR}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full rounded-[2.5rem] object-cover blur-md scale-105 transition-opacity duration-500 ${
              imageLoaded ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Main phone image */}
          <motion.img
            src={appMockupHero}
            alt="Forge App interface showing personalized AI fitness trainer with custom workout plans, progress tracking, and real-time guidance"
            className={`w-72 md:w-80 lg:w-96 rounded-[2.5rem] transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
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
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Reflection/shine effect */}
          <motion.div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, transparent 40%, hsl(0 0% 100% / 0.1) 50%, transparent 60%)",
              transform: "translateZ(25px)",
            }}
            animate={{
              backgroundPosition: ["200% 200%", "-200% -200%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Floating accent elements */}
        <motion.div
          className="absolute -top-8 -right-8 w-16 h-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--forge-cyan) / 0.3) 0%, transparent 70%)",
            transform: "translateZ(40px)",
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--forge-purple) / 0.3) 0%, transparent 70%)",
            transform: "translateZ(30px)",
          }}
          animate={{
            y: [0, 8, 0],
            x: [0, -5, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero3DPhone;
