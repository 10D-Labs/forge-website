import { Check, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProblemSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);
  const { ref: problemRef, isVisible: problemVisible } = useScrollAnimation(0.1);
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollAnimation(0.1);

  const problems = [
    "Personal trainers cost $50-150+ per session",
    "Limited availability and scheduling conflicts",
    "Inconsistent quality and workout plans",
    "No 24/7 support when you have questions",
  ];

  const solutions = [
    "Unlimited AI training for one low monthly price",
    "Available 24/7, whenever you want to train",
    "Consistently optimized, science-backed workouts",
    "Instant answers to any fitness question",
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Problem With
            <span className="text-gradient"> Traditional Training</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Personal training is effective, but it's expensive and inconvenient. Forge changes that.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Problem Card */}
          <div
            ref={problemRef}
            className={`p-8 rounded-2xl bg-destructive/5 border border-destructive/20 transition-all duration-700 ease-out ${
              problemVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </span>
              Traditional Trainers
            </h3>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li
                  key={problem}
                  className={`flex items-start gap-3 text-muted-foreground transition-all duration-500 ease-out ${
                    problemVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: problemVisible ? `${index * 100 + 200}ms` : "0ms" }}
                >
                  <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div
            ref={solutionRef}
            className={`p-8 rounded-2xl bg-primary/5 border border-primary/20 transition-all duration-700 ease-out delay-150 ${
              solutionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </span>
              Forge AI Trainer
            </h3>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li
                  key={solution}
                  className={`flex items-start gap-3 text-muted-foreground transition-all duration-500 ease-out ${
                    solutionVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: solutionVisible ? `${index * 100 + 200}ms` : "0ms" }}
                >
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
