"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

// Tilts its children toward the mouse, springing back on leave. Off for touch and reduced motion.
export default function HeroTilt({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), spring);

  return (
    <div
      className="hero-tilt"
      onPointerMove={(e) => {
        if (reduceMotion || e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div className="hero-tilt-inner" style={{ rotateX, rotateY }}>{children}</motion.div>
    </div>
  );
}
