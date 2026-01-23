"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Dumbbell,
  MessageCircle,
  Bell,
  Users,
  ClipboardList,
  Library,
  LucideIcon,
} from "lucide-react";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: "Choose Your Trainer",
    description:
      "Pick from different trainer personalities like gentle cheerleader, drill instructor, gym buddy, or focused coach.",
  },
  {
    icon: ClipboardList,
    title: "Custom Workout Plans",
    description:
      "Every exercise tells you exactly what weight to use and how many reps. 30 minutes or 60. Zero decisions required.",
  },
  {
    icon: MessageCircle,
    title: "Chat With Your Trainer",
    description:
      "Ask questions about workouts, nutrition, form, or anything fitness-related. Get instant answers, available 24/7.",
  },
  {
    icon: Library,
    title: "Huge Exercise Library",
    description:
      "Access hundreds of exercises with step-by-step instructions, form cues, and common mistakes, so you get it right every time.",
  },
  {
    icon: Dumbbell,
    title: "Smart Workout Log",
    description:
      "Track every set, rep, and weight. See graphs of your strength gains and celebrate PRs. Actual proof you're improving.",
  },
  {
    icon: Bell,
    title: "Built-In Accountability",
    description:
      "Miss a workout? Your trainer notices — not to shame you, but to help you get back. On your hardest days, showing up is enough.",
  },
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.article
      variants={fadeInUp}
      custom={index}
      whileHover={cardHover}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative p-6 md:p-8 overflow-hidden",
        "angular-border card-neon",
        "transition-all duration-300",
        "hover:[&::before]:bg-primary/50"
      )}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Decorative background icon */}
      <motion.div
        className="absolute -bottom-8 -right-8 opacity-[0.03]"
        animate={{ opacity: isHovered ? 0.06 : 0.03 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        <Icon className="w-40 h-40" strokeWidth={1} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="relative w-14 h-14 mb-6">
          <motion.div
            className="absolute inset-0 bg-primary/20 blur-xl"
            animate={{ scale: isHovered ? 1.3 : 1, opacity: isHovered ? 0.8 : 0.5 }}
            transition={{ duration: 0.3 }}
            style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
          />
          <div className="relative w-full h-full angular-border-sm [--angular-bg:hsl(var(--surface-2))] [--angular-border-color:hsl(var(--primary)/0.3)] flex items-center justify-center" aria-hidden="true">
            <Icon className="w-7 h-7 text-primary relative z-10 icon-neon" />
          </div>
        </div>

        <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-3 text-foreground" itemProp="name">
          {feature.title}
        </h3>

        <p className="text-text-secondary leading-relaxed font-barlow" itemProp="description">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-16 md:py-24 bg-surface-0 border-t border-border-subtle"
      aria-labelledby="features-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="container">
        {/* Header */}
        <motion.header
          className="max-w-2xl mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4"
          >
            Features
          </motion.p>
          <motion.h2
            id="features-heading"
            className="font-barlow-condensed text-h1 font-black uppercase mb-4"
            variants={fadeInUp}
            itemProp="name"
          >
            Everything You Need
            <span className="text-primary text-neon block">To Train Smarter</span>
          </motion.h2>
          <motion.p
            className="text-text-secondary text-lg font-barlow"
            variants={fadeInUp}
            itemProp="description"
          >
            Forge combines cutting-edge AI with exercise science to give you an elite personal
            trainer that's always available.
          </motion.p>
        </motion.header>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          role="list"
          aria-label="Forge features list"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              role="listitem"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              <FeatureCard feature={feature} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
