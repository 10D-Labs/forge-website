import { Dumbbell, MessageCircle, BarChart3, Users, ClipboardList, Library } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: ClipboardList,
    title: "Custom Workout Plans",
    description: "Personalized workouts tailored to your goals, fitness level, and schedule",
  },
  {
    icon: MessageCircle,
    title: "Chat With Your PT",
    description: "Ask questions about workouts, nutrition, form, or anything fitness-related anytime.",
  },
  {
    icon: Users,
    title: "Choose Your Trainer",
    description: "Pick from different PT personalities — from soft and supportive to drill instructor.",
  },
  {
    icon: Library,
    title: "Huge Exercise Library",
    description: "Access hundreds of exercises with detailed instructions and demonstrations.",
  },
  {
    icon: Dumbbell,
    title: "Smart Workout Log",
    description: "Track every set, rep, and weight. Your trainer adapts future workouts based on your progress.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Visualize your gains with detailed charts and insights on your fitness journey.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-forge-dark">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="text-gradient"> Train Smarter</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Forge combines cutting-edge AI with proven training principles to give you a personal trainer that's always
            available.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
