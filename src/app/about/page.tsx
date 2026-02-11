import type { Metadata } from "next";
import Image from "next/image";
import { Users, Zap, TrendingUp } from "lucide-react";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About Forge - Our Mission to Make Fitness Accessible",
  description:
    "Learn about Forge's mission to make personal training accessible to everyone through AI. Meet the team behind your AI fitness trainer.",
  keywords: [
    "Forge AI founders",
    "fitness accessibility mission",
    "affordable personal training solution",
    "AI fitness startup",
    "democratizing fitness coaching",
    "fitness tech company",
  ],
  openGraph: {
    title: "About Forge - Our Mission to Make Fitness Accessible",
    description:
      "Learn about Forge's mission to make personal training accessible to everyone through AI.",
    url: "https://forgetrainer.ai/about",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/about",
    types: {
      "text/markdown": "/markdown/about.md",
    },
  },
};

const founders = [
  {
    name: "Jake",
    role: "Founder",
    image: "/founder-jake.webp",
    bio: "After working with a personal trainer and experiencing how much it transformed his fitness, confidence, and daily life, Jake founded Forge to make that same impact accessible to everyone through AI.",
  },
  {
    name: "Zachary",
    role: "Co-Founder",
    image: "/founder-zachary.webp",
    bio: "After discovering how much stronger and more confident he felt once he committed to fitness, Zachary wants to help others experience the same transformation. He brings his marketing expertise and passion for health to build Forge.",
  },
];

const values = [
  {
    icon: Users,
    title: "Accessibility",
    description:
      "A personal trainer in everyone's pocket, regardless of location or time.",
  },
  {
    icon: Zap,
    title: "Simplicity",
    description:
      "No confusion, no excuses. Just show up and your trainer handles the rest.",
  },
  {
    icon: TrendingUp,
    title: "Transformation",
    description:
      "It starts in the gym, but the confidence you build changes everything.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "About Us", url: "https://forgetrainer.ai/about" },
        ]}
      />

      <main
        className="pt-20"
        role="main"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        {/* Hero Section */}
        <section
          className="py-10 md:py-12 bg-surface-0 relative overflow-hidden"
          aria-labelledby="about-heading"
        >
          <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4">
                About Us
              </p>
              <h1
                id="about-heading"
                className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6"
                itemProp="name"
              >
                Everyone Deserves A{" "}
                <span className="text-primary text-neon">Trainer</span>
              </h1>
              <p
                className="text-lg md:text-xl text-text-secondary leading-relaxed font-barlow"
                itemProp="description"
              >
                Personal training has always been a luxury for the few. We're
                changing that.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section
          className="py-10 md:py-12 bg-surface-1 border-t border-border-subtle"
          aria-labelledby="story-heading"
        >
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2
                id="story-heading"
                className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-8 text-center"
              >
                The <span className="text-primary text-neon">Story</span>
              </h2>

              <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-barlow">
                <p>
                  Jake started working with a personal trainer and everything
                  changed. Better workouts, faster progress, and the confidence
                  that comes from knowing exactly what to do every time he walked
                  into the gym.
                </p>
                <p>
                  The problem? It cost a fortune. Most people can't afford
                  $300-500/month for that kind of guidance. But with AI, almost
                  everyone can get those same benefits for a fraction of the cost.
                </p>
                <p>
                  So we built Forge — an AI trainer that adapts to your
                  personality, creates custom workouts based on your goals and
                  schedule, and keeps you accountable. No more guesswork. No more
                  wasted sessions. Just a trainer in your corner, ready whenever
                  you are.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section
          className="py-10 md:py-12 bg-surface-0 border-t border-border-subtle"
          aria-labelledby="team-heading"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <div className="container">
            <h2
              id="team-heading"
              className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-12 text-center"
            >
              Meet The <span className="text-primary text-neon">Brothers</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {founders.map((founder) => (
                <article
                  key={founder.name}
                  className="p-8 rounded-[20px] border border-primary/25 bg-surface-2 text-center"
                  itemScope
                  itemType="https://schema.org/Person"
                  itemProp="employee"
                >
                  <div
                    className="w-32 h-32 mx-auto mb-6 p-[1px] rounded-[20px]"
                    style={{
                      background: "hsl(24 100% 50% / 0.4)",
                    }}
                  >
                    <Image
                      src={founder.image}
                      alt={`${founder.name} - ${founder.role} at Forge AI Fitness`}
                      className="w-full h-full object-cover rounded-[19px]"
                      width={128}
                      height={128}
                      itemProp="image"
                    />
                  </div>
                  <h3
                    className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-1 relative z-10"
                    itemProp="name"
                  >
                    {founder.name}
                  </h3>
                  <p
                    className="text-primary text-sm font-medium mb-4 relative z-10 font-barlow"
                    itemProp="jobTitle"
                  >
                    {founder.role}
                  </p>
                  <p
                    className="text-text-secondary text-sm leading-relaxed relative z-10 font-barlow"
                    itemProp="description"
                  >
                    {founder.bio}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          className="py-10 md:py-12 bg-surface-1 border-t border-border-subtle"
          aria-labelledby="values-heading"
        >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                id="values-heading"
                className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-12"
              >
                What We <span className="text-primary text-neon">Stand For</span>
              </h2>

              <div
                className="grid sm:grid-cols-3 gap-8"
                role="list"
                aria-label="Company values"
              >
                {values.map((value) => (
                  <article key={value.title} role="listitem">
                    <div
                      className="w-14 h-14 mx-auto mb-4 rounded-[10px] border border-primary/30 bg-surface-2 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <value.icon className="w-7 h-7 text-primary relative z-10 icon-neon" />
                    </div>
                    <h3 className="font-barlow-condensed font-bold uppercase tracking-wide mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary text-sm font-barlow">
                      {value.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
