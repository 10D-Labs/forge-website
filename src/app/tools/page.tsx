import type { Metadata } from "next";
import { Dumbbell } from "lucide-react";
import { GlowOrbs } from "@/components/effects";
import StructuredData from "@/components/StructuredData";
import { ToolCardLink, ToolCTA } from "@/components/tools/ToolParts";
import { tools } from "@/content/tools";

export const metadata: Metadata = {
  title: "Free Workout Tools & Calculators for Lifters",
  description:
    "Free lifting calculators: 1RM, barbell plates, warm-up ramps, RPE, percentage charts, training volume, body fat, lean mass, DOTS, Wilks, and more. Ungated and built to use between sets.",
  keywords: [
    "workout calculators",
    "lifting tools",
    "1rm calculator",
    "barbell plate calculator",
    "rpe calculator",
    "free fitness tools",
  ],
  openGraph: {
    title: "Free Workout Tools & Calculators | Forge",
    description:
      "1RM, barbell plates, warm-up ramps, RPE, percentage charts, training volume, body composition, and powerlifting scores. Free and ungated.",
    url: "https://forgetrainer.ai/tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Workout Tools & Calculators | Forge",
    description:
      "1RM, barbell plates, warm-up ramps, RPE, percentage charts, training volume, body composition, and powerlifting scores. Free and ungated.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/tools",
    types: { "text/markdown": "/markdown/tools.md" },
  },
};

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Free Workout Tools & Calculators",
            url: "https://forgetrainer.ai/tools",
            numberOfItems: tools.length,
            itemListElement: tools.map((tool, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: tool.name,
              url: `https://forgetrainer.ai/tools/${tool.slug}`,
            })),
          }),
        }}
      />

      <main className="pt-20" role="main">
        {/* Hero */}
        <section
          className="relative py-14 md:py-20 bg-surface-0 overflow-hidden"
          aria-labelledby="tools-heading"
        >
          <GlowOrbs variant="hero" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4">
                Free for lifters
              </p>
              <h1
                id="tools-heading"
                className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none mb-6"
              >
                Tools for people who{" "}
                <span className="text-primary text-neon">train</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary font-barlow max-w-2xl mx-auto leading-relaxed">
                Plan your next set. Estimate your max. Build a warm-up.
              </p>
            </div>
          </div>
        </section>

        {/* Tool grid */}
        <section className="py-12 md:py-16 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-6xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCardLink key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* App bridge */}
        <section className="py-14 md:py-20 bg-surface-0 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Dumbbell className="w-6 h-6 text-primary" aria-hidden="true" />
                <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase">
                  The app does the{" "}
                  <span className="text-primary text-neon">rest</span>
                </h2>
              </div>
              <div className="space-y-4 text-text-secondary font-barlow leading-relaxed">
                <p>
                  These tools answer one question at a time. Forge answers the
                  one that matters every session: what should I do today, at
                  what weight, and how do I know it is working.
                </p>
                <p>
                  Your AI trainer builds the plan, adjusts it as you progress,
                  logs every set, and answers questions around the clock. You
                  lift. It handles the math you just did by hand.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ToolCTA
          headline="Stop calculating."
          headlineAccent="Start training."
          subline="Get a coach-built plan that adapts to you, for less than a month of a human trainer's single session."
          utmContent="tools-hub"
        />
      </main>
    </div>
  );
}
