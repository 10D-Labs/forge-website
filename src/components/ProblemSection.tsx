import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const problems = [
    "Costs $300-500+ per month",
    "Limited to scheduled sessions",
    "Same playbook for most clients",
    "No support outside gym hours",
    "Forgets your history and injuries",
    "Everyone sees you have a trainer",
  ];

  const solutions = [
    "Fraction of the cost, same results",
    "Available 24/7, whenever you need it",
    "Truly personalized to you",
    "Instant answers, anytime",
    "Remembers everything about you",
    "Private — just you and your phone",
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="problem-heading"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-radial-hero opacity-30" />

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
            The Better Way
          </motion.p>
          <motion.h2
            id="problem-heading"
            className="font-barlow-condensed text-h1 font-black uppercase mb-4"
            variants={fadeInUp}
          >
            The Problem With
            <span className="text-primary text-neon block">Traditional Training</span>
          </motion.h2>
          <motion.p className="text-text-secondary text-lg font-barlow" variants={fadeInUp}>
            Personal training works, but it's expensive and inconvenient.
            <br />
            Forge changes that.
          </motion.p>
        </motion.header>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Problem Card */}
          <motion.article
            className="relative p-8 angular-border [--angular-bg:hsl(var(--surface-0))] [--angular-border-color:hsl(var(--destructive)/0.3)] overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-labelledby="traditional-trainers-heading"
          >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-destructive/5 rounded-full blur-3xl" aria-hidden="true" />

            <h3
              id="traditional-trainers-heading"
              className="relative z-10 font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0" aria-hidden="true">
                <X className="w-5 h-5 text-destructive" />
              </span>
              Traditional Trainers
            </h3>

            <ul className="space-y-4 relative z-10" aria-label="Problems with traditional trainers">
              {problems.map((problem, index) => (
                <motion.li
                  key={problem}
                  className="flex items-center gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <span className="w-10 flex items-center justify-center shrink-0" aria-hidden="true">
                    <X className="w-5 h-5 text-destructive" />
                  </span>
                  <span>{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>

          {/* Solution Card */}
          <motion.article
            className="relative p-8 angular-border card-neon [--angular-bg:hsl(var(--surface-0))] [--angular-border-color:hsl(var(--primary)/0.3)] overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            aria-labelledby="forge-trainers-heading"
          >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />

            <h3
              id="forge-trainers-heading"
              className="relative z-10 font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0" aria-hidden="true">
                <Check className="w-5 h-5 text-primary" />
              </span>
              Forge AI Trainers
            </h3>

            <ul className="space-y-4 relative z-10" aria-label="Benefits of Forge AI trainers">
              {solutions.map((solution, index) => (
                <motion.li
                  key={solution}
                  className="flex items-center gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="w-10 flex items-center justify-center shrink-0" aria-hidden="true">
                    <Check className="w-5 h-5 text-primary" />
                  </span>
                  <span>{solution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
