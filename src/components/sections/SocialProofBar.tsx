import { motion } from "framer-motion";
import { Users, DollarSign, Zap } from "lucide-react";
import { fadeIn } from "@/lib/animations";

const SocialProofBar = () => {
  const stats = [
    {
      icon: Users,
      value: "15+",
      label: "on the waitlist",
    },
    {
      icon: DollarSign,
      value: "$4,000+",
      label: "in annual savings",
    },
    {
      icon: Zap,
      value: "24/7",
      label: "AI availability",
    },
  ];

  return (
    <section className="py-8 border-y border-border/20 bg-surface-1" aria-label="Key statistics">
      <div className="container">
        <motion.div
          className="flex items-center justify-center gap-4 sm:gap-8 md:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm sm:text-lg font-semibold text-foreground">{stat.value}</span>
                <span className="text-xs sm:text-sm text-muted-foreground block">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofBar;
