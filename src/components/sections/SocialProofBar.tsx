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
      label: "saved per year",
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
          className="flex items-center justify-center gap-8 md:gap-16 flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground block">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofBar;
