import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/animations";
import { TRAINER_CAROUSEL, SCROLL_AMOUNTS } from "@/lib/constants";
import { trainers } from "@/content/trainers";

const MeetTheTrainersSection = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > TRAINER_CAROUSEL.scrollThreshold);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - TRAINER_CAROUSEL.scrollThreshold);

      // Calculate active card index for pagination dots
      const isMobile = window.innerWidth < TRAINER_CAROUSEL.mobileBreakpoint;
      const cardWidth = isMobile ? TRAINER_CAROUSEL.cardWidthMobile : TRAINER_CAROUSEL.cardWidthDesktop;
      const index = Math.round(scrollLeft / (cardWidth + TRAINER_CAROUSEL.gap));
      setActiveIndex(Math.min(index, trainers.length - 1));
    }
  };

  // Check scroll position on mount and window resize
  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < TRAINER_CAROUSEL.mobileBreakpoint;
      const cardWidth = isMobile ? TRAINER_CAROUSEL.cardWidthMobile : TRAINER_CAROUSEL.cardWidthDesktop;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + TRAINER_CAROUSEL.gap),
        behavior: "smooth",
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < TRAINER_CAROUSEL.mobileBreakpoint;
      const scrollAmount = isMobile ? SCROLL_AMOUNTS.mobile : SCROLL_AMOUNTS.desktop;
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
            style, and switch anytime.
          </motion.p>
        </motion.header>

        {/* Trainer Cards Carousel */}
        <div className="relative">
          {/* Navigation Arrows - desktop only */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 angular-border-sm items-center justify-center hover:[&::before]:bg-primary/50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 relative z-10" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 angular-border-sm items-center justify-center hover:[&::before]:bg-primary/50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 relative z-10" />
            </button>
          )}

          <motion.div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto py-6 -my-6 px-[calc(50vw-140px)] md:px-0 scrollbar-hide snap-x snap-mandatory"
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
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-center"
              >
                <Link
                  to={`/trainers/${trainer.slug}`}
                  className="block relative p-6 angular-border card-neon transition-all duration-300 hover:[&::before]:bg-primary/50 h-full"
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
                        loading="lazy"
                        width="56"
                        height="56"
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
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {/* Pagination dots - mobile only */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {trainers.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-primary w-6"
                    : "bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to trainer ${index + 1}`}
              />
            ))}
          </div>
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
