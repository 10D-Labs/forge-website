import PageIntro from "@/components/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StructuredData from "@/components/StructuredData";
import { ToolCTA } from "@/components/tools/ToolParts";
import { competitors, GROUP_LABELS, type Competitor } from "@/content/compare";

export const metadata: Metadata = {
  title: "Forge vs the Competition - Honest Workout App Comparisons",
  description:
    "Honest head-to-head comparisons between Forge and every major workout app: Fitbod, Hevy, Strong, JEFIT, Boostcamp, Zing, Freeletics, Caliber, Ladder, JuggernautAI, RP Hypertrophy, and Dr. Muscle.",
  keywords: [
    "forge vs fitbod",
    "forge vs hevy",
    "best workout app",
    "ai personal trainer comparison",
    "workout app comparison",
  ],
  openGraph: {
    title: "Forge vs the Competition | Forge",
    description:
      "Honest head-to-head comparisons with every major workout app. We call the wins both ways.",
    url: "https://forgetrainer.ai/compare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge vs the Competition | Forge",
    description:
      "Honest head-to-head comparisons with every major workout app. We call the wins both ways.",
  },
  alternates: {
    canonical: "https://forgetrainer.ai/compare",
    types: {
      "text/markdown": "/markdown/compare.md",
    },
  },
};

const GROUP_ORDER: Competitor["group"][] = ["ai", "human", "tracker"];

export default function CompareHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Compare", url: "https://forgetrainer.ai/compare" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Forge vs the Competition: Honest Workout App Comparisons",
            url: "https://forgetrainer.ai/compare",
            numberOfItems: competitors.length,
            itemListElement: competitors.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `Forge vs ${c.name}`,
              url: `https://forgetrainer.ai/compare/${c.slug}`,
            })),
          }),
        }}
      />

      <main className="resource-page">
        <PageIntro eyebrow="Workout app comparisons" title="Find what fits" accent="the way you train." description="Compare coaching, features, and cost. See where Forge fits your needs and where another app may suit you better." id="compare-heading" />

        {/* Grouped comparison cards */}
        {GROUP_ORDER.map((group) => (
          <section
            key={group}
            className="py-12 md:py-16 bg-surface-1 border-t border-border-subtle odd:bg-surface-0"
          >
            <div className="site-width">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-barlow-condensed text-2xl md:text-3xl font-black uppercase mb-8">
                  {GROUP_LABELS[group]}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {competitors
                    .filter((c) => c.group === group)
                    .map((c) => (
                      <Link
                        key={c.slug}
                        href={`/compare/${c.slug}`}
                        className="resource-card group p-6 rounded-[20px] border border-border bg-surface-2 hover:border-primary/50 transition-colors flex flex-col"
                      >
                        <span className="font-barlow-condensed text-xs font-bold uppercase tracking-wider text-text-tertiary block mb-2">
                          {c.category}
                        </span>
                        <h3 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-2 group-hover:text-primary transition-colors">
                          Forge vs {c.name}
                        </h3>
                        <p className="text-sm text-text-secondary font-barlow leading-relaxed flex-1">
                          {c.hubTagline}
                        </p>
                        <span className="inline-flex items-center gap-1.5 font-barlow-condensed text-sm font-bold uppercase tracking-wider text-primary mt-4">
                          Read the comparison
                          <ArrowRight
                            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Method note */}
        <section className="py-14 md:py-20 bg-surface-0 border-t border-border-subtle">
          <div className="site-width">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-5">
                How we write <span className="text-primary text-neon">these</span>
              </h2>
              <div className="space-y-4 text-text-secondary font-barlow leading-relaxed">
                <p>
                  Every comparison starts from the competitor's own site, store
                  listings, and user reviews. Pricing gets verified against
                  their official pages, and anything we could not verify is
                  flagged on the page.
                </p>
                <p>
                  Each table has an honest winner on every row. Where the other
                  app is better, we say so and explain who should pick it.
                  Forge loses rows on price, watch apps, and exercise library
                  depth across this section. It wins the rows about coaching,
                  because coaching is what it was built to do.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ToolCTA
          headline="Stop comparing."
          headlineAccent="Start training."
          subline="Try Forge free for 7 days and put it up against whatever you use now. Three workouts will tell you more than thirty reviews."
          utmContent="compare-hub"
        />
      </main>
    </div>
  );
}
