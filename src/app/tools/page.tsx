import PageIntro from "@/components/PageIntro";
import type { Metadata } from "next";
import { Dumbbell } from "lucide-react";
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

      <main className="resource-page">
        <PageIntro eyebrow="Free workout tools" title="Know your numbers." accent="Plan your next set." description="Estimate your max, load the bar, or plan your warm-up. Free calculators you can use between sets." id="tools-heading" />

        {/* Tool grid */}
        <section className="py-12 md:py-16 bg-surface-1 border-t border-border-subtle">
          <div className="site-width">
            <div className="max-w-6xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCardLink key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* App bridge */}
        <section className="py-14 md:py-20 bg-surface-0 border-t border-border-subtle">
          <div className="site-width">
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
