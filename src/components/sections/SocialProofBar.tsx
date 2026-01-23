import { Users, DollarSign, Zap } from "lucide-react";

// CSS-only social proof bar - no Framer Motion to keep initial bundle small
const SocialProofBar = () => {
  const stats = [
    {
      icon: Users,
      value: "4",
      label: "AI trainer personalities",
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
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-16 animate-fade-in">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left animate-fade-in-up"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm sm:text-lg font-semibold text-foreground">{stat.value}</span>
                <span className="text-xs sm:text-sm text-muted-foreground block">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
