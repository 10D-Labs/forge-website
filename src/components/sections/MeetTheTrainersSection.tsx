import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/animations";

const trainers = [
  {
    name: "Sergeant Stone",
    role: "Drill Instructor",
    description:
      "Intense, demanding, and pushes you hard. Stone doesn't care about your feelings — he cares about your results.",
    vibe: "Pain is weakness leaving",
    avatarUrl: "/trainers/sergeant-stone-drill-avatar.png",
  },
  {
    name: "Maya",
    role: "Gentle & Supportive",
    description:
      "Patient, encouraging, and always positive. Maya celebrates every win and helps you build confidence alongside strength.",
    vibe: "Warm encouragement, zero judgment",
    avatarUrl: "/trainers/maya-gentle-avatar.png",
  },
  {
    name: "Mike",
    role: "Casual & Friendly",
    description:
      "Relaxed and easy-going. Working out with Mike feels like training with your best friend who happens to know their stuff.",
    vibe: "Like a gym buddy",
    avatarUrl: "/trainers/mike-casual-avatar.png",
  },
  {
    name: "Reese",
    role: "Serious & Focused",
    description:
      "Professional and results-oriented. Reese keeps you focused on form and technique — quality over quantity, always.",
    vibe: "All business, all results",
    avatarUrl: "/trainers/reese-serious-avatar.png",
  },
];

const MeetTheTrainersSection = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-surface-1 relative overflow-hidden border-t border-border-subtle"
      aria-labelledby="trainers-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-mesh opacity-50" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.header
          className="max-w-2xl mb-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4"
          >
            Choose Your Coach
          </motion.p>
          <motion.h2
            id="trainers-heading"
            variants={fadeInUp}
            className="font-barlow-condensed text-h1 font-black uppercase mb-4"
          >
            Meet Your AI
            <span className="text-primary text-neon block">Training Team</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-text-secondary text-lg font-barlow">
            Different personalities for different motivations. Pick the coach that matches your
            style — or switch anytime.
          </motion.p>
        </motion.header>

        {/* Trainer Cards Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 angular-border-sm flex items-center justify-center transition-opacity ${
              canScrollLeft ? "opacity-100 hover:[&::before]:bg-primary/50" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 relative z-10" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 angular-border-sm flex items-center justify-center transition-opacity ${
              canScrollRight ? "opacity-100 hover:[&::before]:bg-primary/50" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 relative z-10" />
          </button>

          {/* Gradient fades */}
          <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface-1 to-transparent z-10 pointer-events-none transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0"}`} />
          <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface-1 to-transparent z-10 pointer-events-none transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0"}`} />

          <motion.div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto py-6 -my-6 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            onScroll={checkScroll}
          >
            {trainers.map((trainer) => (
              <motion.article
                key={trainer.name}
                variants={fadeInUp}
                whileHover={cardHover}
                className="relative p-6 angular-border card-neon transition-all duration-300 hover:[&::before]:bg-primary/50 flex-shrink-0 w-[300px] md:w-[340px]"
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 p-[1px]"
                    style={{
                      background: "hsl(24 100% 50% / 0.4)",
                      clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
                    }}
                  >
                    <img
                      src={trainer.avatarUrl}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                      style={{ clipPath: "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))" }}
                    />
                  </div>
                  <div>
                    <h3 className="font-barlow-condensed font-bold text-lg uppercase tracking-wide">{trainer.name}</h3>
                    <p className="text-sm text-text-tertiary font-barlow">{trainer.role}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary mb-4 leading-relaxed font-barlow">{trainer.description}</p>

                {/* Vibe tag */}
                <div
                  className="inline-flex items-center px-3 py-1.5 angular-border-sm [--angular-bg:hsl(var(--surface-2))] [--angular-border-color:hsl(var(--primary)/0.3)]"
                >
                  <span className="text-xs font-barlow-condensed font-semibold text-primary uppercase tracking-wide relative z-10">{trainer.vibe}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Coming soon note */}
        <motion.p
          className="text-center text-sm text-text-tertiary mt-8 font-barlow"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          More trainer personalities coming soon. Have a request?{" "}
          <a href="mailto:support@forgetrainer.ai" className="text-primary hover:underline">
            Let us know.
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default MeetTheTrainersSection;
