import { LucideIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <article
      ref={ref}
      className={`group relative p-6 md:p-8 rounded-2xl card-gradient border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
        transitionProperty: "opacity, transform, border-color",
        transitionDuration: "500ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      itemScope
      itemType="https://schema.org/Thing"
    >
      {/* Background decorative icon */}
      <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300" aria-hidden="true">
        <Icon className="w-32 h-32 text-primary" strokeWidth={1} />
      </div>
      
      {/* Main icon with glow effect */}
      <div 
        className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300 shadow-lg shadow-primary/10 group-hover:shadow-primary/20"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        <Icon className="w-7 h-7 text-primary relative z-10" strokeWidth={1.5} />
      </div>
      
      <h3 className="text-lg font-semibold mb-2 relative z-10" itemProp="name">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed relative z-10" itemProp="description">
        {description}
      </p>
    </article>
  );
};

export default FeatureCard;
