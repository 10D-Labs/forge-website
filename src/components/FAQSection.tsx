import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import StructuredData, { type FAQQuestion } from "./StructuredData";

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  questions: FAQQuestion[];
  includeSchema?: boolean;
}

const FAQSection = ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about personal training with Forge",
  questions,
  includeSchema = true,
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 bg-surface-0 border-t border-border-subtle"
      aria-labelledby="faq-heading"
    >
      {includeSchema && <StructuredData type="faq" questions={questions} />}

      <div className="container">
        <motion.header
          className="text-center max-w-2xl mx-auto mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            id="faq-heading"
            variants={fadeInUp}
            className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-4"
          >
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-primary text-neon">
              {title.split(" ").slice(-1)}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-text-secondary text-lg font-barlow"
          >
            {subtitle}
          </motion.p>
        </motion.header>

        <motion.div
          className="max-w-3xl mx-auto space-y-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {questions.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="angular-border [--angular-bg:hsl(var(--surface-2))] [--angular-border-color:hsl(var(--border))]"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 relative z-10"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-barlow-condensed text-lg font-semibold uppercase tracking-wide pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
              </button>

              {/* CLS-safe accordion using CSS Grid instead of JS height animation */}
              <div
                id={`faq-answer-${index}`}
                className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
                style={{
                  gridTemplateRows: openIndex === index ? "1fr" : "0fr",
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 relative z-10">
                    <p className="text-text-secondary font-barlow leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
