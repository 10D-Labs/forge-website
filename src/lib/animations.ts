import type { Variants, Transition } from "framer-motion";

// Shared easing curves
export const easeOut = [0.25, 0.1, 0.25, 1] as const;
export const easeInOut = [0.4, 0, 0.2, 1] as const;

// Default transition
export const defaultTransition: Transition = {
  duration: 0.6,
  ease: easeOut,
};

// === FADE VARIANTS ===

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

// === SCALE VARIANTS ===

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const scaleInUp: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

// === CONTAINER VARIANTS (for staggered children) ===
// Optimized: Containers don't animate opacity themselves (children do)
// Reduced delays for faster perceived performance

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

// === CHILD VARIANTS (for use with stagger containers) ===

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

// === SPECIAL EFFECT VARIANTS ===

export const heroContent: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

export const heroImage: Variants = {
  hidden: { opacity: 0, x: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: easeOut,
      delay: 0.2,
    },
  },
};

export const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// === CARD HOVER EFFECTS ===

export const cardHover = {
  y: -4,
  transition: { duration: 0.3, ease: easeOut },
};

export const cardTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

// === SCROLL TRIGGER CONFIG ===

export const scrollTriggerConfig = {
  once: true,
  amount: 0.2 as const,
  margin: "-100px" as const,
};

export const scrollTriggerEarly = {
  once: true,
  amount: 0.1 as const,
  margin: "-50px" as const,
};

// === UTILITY FUNCTIONS ===

/**
 * Creates a custom delay variant for staggered animations
 */
export const createDelayedVariant = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
      delay,
    },
  },
});

/**
 * Creates stagger container with custom timing
 */
export const createStaggerContainer = (
  staggerDelay: number = 0.1,
  initialDelay: number = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});
