"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  HelpCircle,
  Smartphone,
  DollarSign,
  Rewind,
  CalendarClock,
  Battery,
  LucideIcon,
} from "lucide-react";
import { GridBackground } from "@/components/effects";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface PainCardData {
  icon: LucideIcon;
  headline: string;
  body: string;
}

const painCards: PainCardData[] = [
  {
    icon: HelpCircle,
    headline: "You walk into the gym and have no idea what to do.",
    body: "So you do the same 3 exercises, wander around, and leave feeling like you wasted your time.",
  },
  {
    icon: Smartphone,
    headline: "You\u2019ve downloaded 5 fitness apps. None lasted.",
    body: "Because they gave you the same generic plan as everyone else and called it \u2018personalized.\u2019",
  },
  {
    icon: DollarSign,
    headline: "You looked up personal trainer prices and closed the tab.",
    body: "$100 per session. $400 per month. For most people, that\u2019s just not realistic.",
  },
  {
    icon: Rewind,
    headline: "You used to be in shape. You don\u2019t know what happened.",
    body: "Kids, work, stress, time. But the person you were is still in there.",
  },
  {
    icon: CalendarClock,
    headline: "You keep saying \u2018I\u2019ll start Monday.\u2019",
    body: "Not because you\u2019re lazy. Because nothing has worked well enough to make you want to keep going.",
  },
  {
    icon: Battery,
    headline: "Some days, just showing up feels impossible.",
    body: "And that\u2019s exactly when you need someone who gets it.",
  },
];

const PainCard = ({ card, index }: { card: PainCardData; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={cardHover}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative p-6 md:p-8 overflow-hidden",
        "rounded-[20px] border border-border bg-surface-2 card-neon",
        "transition-all duration-300"
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
            className="absolute inset-0 bg-primary/20 blur-xl rounded-[10px]"
            animate={{ scale: isHovered ? 1.3 : 1, opacity: isHovered ? 0.8 : 0.5 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative w-full h-full rounded-[10px] border border-primary/30 bg-surface-2 flex items-center justify-center" aria-hidden="true">
            <Icon className="w-7 h-7 text-primary relative z-10 icon-neon" />
          </div>
        </div>

        <p className="font-barlow font-semibold text-foreground mb-3 leading-snug">
          {card.headline}
        </p>
        <p className="text-sm text-text-secondary leading-relaxed font-barlow">
          {card.body}
        </p>
      </div>
    </motion.div>
  );
};

const PainMirrorSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="pain-mirror-heading"
    >
      {/* Background effects — grid + soft bottom-center glow */}
      <GridBackground fadeDirection="both" opacity={0.04} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.header
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4"
          >
            Sound Familiar?
          </motion.p>
          <motion.h2
            id="pain-mirror-heading"
            className="font-barlow-condensed text-h1 font-black uppercase mb-4"
            variants={fadeInUp}
          >
            The Stuff Nobody
            <span className="text-primary text-neon block">Talks About</span>
          </motion.h2>
        </motion.header>

        {/* Pain Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {painCards.map((card, index) => (
            <PainCard key={card.headline} card={card} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PainMirrorSection;
