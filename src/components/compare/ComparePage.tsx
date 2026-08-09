import Link from "next/link";
import { Check, Scale, Trophy, ArrowRight } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { GlowOrbs } from "@/components/effects";
import { ToolCTA } from "@/components/tools/ToolParts";
import {
  competitors,
  FORGE_PRICING,
  FORGE_PRICING_NOTE,
  type Competitor,
} from "@/content/compare";

function WinnerBadge({ winner }: { winner: "forge" | "them" | "tie" }) {
  if (winner === "forge") {
    return (
      <span className="inline-block px-2 py-0.5 rounded-[8px] bg-primary/15 border border-primary/30 text-primary font-barlow-condensed text-xs font-bold uppercase tracking-wider">
        Forge
      </span>
    );
  }
  if (winner === "them") {
    return (
      <span className="inline-block px-2 py-0.5 rounded-[8px] bg-surface-1 border border-border text-text-secondary font-barlow-condensed text-xs font-bold uppercase tracking-wider">
        Them
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 rounded-[8px] bg-surface-1 border border-border-subtle text-text-tertiary font-barlow-condensed text-xs font-bold uppercase tracking-wider">
      Tie
    </span>
  );
}

export default function ComparePage({ competitor }: { competitor: Competitor }) {
  const others = competitors.filter((c) => c.slug !== competitor.slug);
  const forgeWinCount = competitor.rows.filter((r) => r.winner === "forge").length;
  const theirWinCount = competitor.rows.filter((r) => r.winner === "them").length;

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Compare", url: "https://forgetrainer.ai/compare" },
          {
            name: `Forge vs ${competitor.name}`,
            url: `https://forgetrainer.ai/compare/${competitor.slug}`,
          },
        ]}
      />
      <StructuredData type="faq" questions={competitor.faqs} />

      <main className="pt-20" role="main">
        {/* Hero */}
        <section
          className="relative py-14 md:py-20 bg-surface-0 overflow-hidden"
          aria-labelledby="compare-heading"
        >
          <GlowOrbs variant="hero" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4">
                The honest comparison · 2026
              </p>
              <h1
                id="compare-heading"
                className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none mb-6"
              >
                Forge vs{" "}
                <span className="text-primary text-neon">{competitor.name}</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary font-barlow max-w-2xl mx-auto leading-relaxed">
                {competitor.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="py-14 md:py-20 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-5">
                <Scale className="w-6 h-6 text-primary" aria-hidden="true" />
                <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase">
                  The short <span className="text-primary text-neon">version</span>
                </h2>
              </div>
              <div className="space-y-4 text-text-secondary font-barlow leading-relaxed">
                {competitor.verdict.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-14 md:py-20 bg-surface-0 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-3">
                Every row, <span className="text-primary text-neon">called honestly</span>
              </h2>
              <p className="text-text-secondary font-barlow mb-8 leading-relaxed">
                Forge takes {forgeWinCount}. {competitor.name} takes {theirWinCount}.
                The rest are even. Read the rows {competitor.name} wins before you
                read ours.
              </p>

              {/* Header row */}
              <div className="hidden md:grid grid-cols-[1fr_1.2fr_1.2fr_4.5rem] gap-4 px-5 pb-3 border-b border-border">
                <span className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary">
                  Dimension
                </span>
                <span className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary">
                  {competitor.name}
                </span>
                <span className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-primary">
                  Forge
                </span>
                <span className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary">
                  Winner
                </span>
              </div>

              <div className="space-y-3 md:space-y-0 md:divide-y md:divide-border-subtle">
                {competitor.rows.map((row) => (
                  <div
                    key={row.dimension}
                    className="relative flex flex-col gap-3 p-4 rounded-[14px] border border-border bg-surface-2 md:grid md:grid-cols-[1fr_1.2fr_1.2fr_4.5rem] md:gap-4 md:px-5 md:py-4 md:items-center md:rounded-none md:border-0 md:bg-transparent"
                  >
                    <span className="font-barlow-condensed text-base font-bold uppercase tracking-wide pr-20 md:pr-0">
                      {row.dimension}
                    </span>
                    <span className="text-sm text-text-secondary font-barlow leading-snug">
                      <span className="md:hidden font-barlow-condensed text-xs font-bold uppercase tracking-wider text-text-tertiary block mb-0.5">
                        {competitor.name}
                      </span>
                      {row.them}
                    </span>
                    <span className="text-sm text-foreground font-barlow leading-snug">
                      <span className="md:hidden font-barlow-condensed text-xs font-bold uppercase tracking-wider text-primary block mb-0.5">
                        Forge
                      </span>
                      {row.forge}
                    </span>
                    <span className="absolute right-4 top-4 md:static md:justify-self-end">
                      <WinnerBadge winner={row.winner} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Where they win */}
        <section className="py-14 md:py-20 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-3">
                Where {competitor.name}{" "}
                <span className="text-primary text-neon">wins</span>
              </h2>
              <p className="text-text-secondary font-barlow mb-8 leading-relaxed max-w-3xl">
                Credit where it is due. These are the rows {competitor.name} takes,
                stated plainly.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {competitor.theirWins.map((win) => (
                  <div
                    key={win.title}
                    className="p-6 rounded-[20px] border border-border bg-surface-2"
                  >
                    <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-2">
                      {win.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-barlow leading-relaxed">
                      {win.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Where Forge wins */}
        <section className="py-14 md:py-20 bg-surface-0 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-primary" aria-hidden="true" />
                <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase">
                  Where Forge <span className="text-primary text-neon">wins</span>
                </h2>
              </div>
              <p className="text-text-secondary font-barlow mb-8 leading-relaxed max-w-3xl">
                The other side of the ledger.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {competitor.forgeWins.map((win) => (
                  <div
                    key={win.title}
                    className="p-6 rounded-[20px] border border-primary/30 bg-primary/5"
                  >
                    <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-2 text-primary">
                      {win.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-barlow leading-relaxed">
                      {win.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-14 md:py-20 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-8">
                What each one <span className="text-primary text-neon">costs</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-5">
                    {competitor.name}
                  </h3>
                  <ul className="space-y-3 list-none mb-5">
                    {competitor.theirPricing.map((line) => (
                      <li
                        key={line.label}
                        className="flex items-center justify-between font-barlow"
                      >
                        <span className="text-text-secondary">{line.label}</span>
                        <span className="font-barlow-condensed text-xl font-bold">
                          {line.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-text-tertiary font-barlow leading-relaxed">
                    {competitor.theirPricingNote}
                  </p>
                </div>
                <div className="p-6 md:p-8 rounded-[20px] border border-primary/40 bg-primary/5">
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-5 text-primary">
                    Forge
                  </h3>
                  <ul className="space-y-3 list-none mb-5">
                    {FORGE_PRICING.map((line) => (
                      <li
                        key={line.label}
                        className="flex items-center justify-between font-barlow"
                      >
                        <span className="text-text-secondary">{line.label}</span>
                        <span className="font-barlow-condensed text-xl font-bold">
                          {line.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-text-tertiary font-barlow leading-relaxed">
                    {FORGE_PRICING_NOTE}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who should pick which */}
        <section className="py-14 md:py-20 bg-surface-0 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-8">
                Which one is <span className="text-primary text-neon">right for you</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                  <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-4">
                    Pick {competitor.name} if
                  </h3>
                  <ul className="space-y-3 list-none">
                    {competitor.whoShouldPickThem.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 font-barlow text-text-secondary">
                        <Check className="w-4 h-4 text-text-tertiary mt-1 flex-shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 md:p-8 rounded-[20px] border border-primary/40 bg-primary/5">
                  <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-4 text-primary">
                    Pick Forge if
                  </h3>
                  <ul className="space-y-3 list-none">
                    {competitor.whoShouldPickForge.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 font-barlow text-text-secondary">
                        <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQSection
          title={`Forge vs ${competitor.name} Questions`}
          subtitle={`Straight answers about switching between Forge and ${competitor.name}`}
          questions={competitor.faqs}
          includeSchema={false}
        />

        {/* Other comparisons */}
        <section className="py-14 md:py-20 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-8">
                More <span className="text-primary text-neon">comparisons</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="group p-5 rounded-[20px] border border-border bg-surface-2 hover:border-primary/50 transition-colors"
                  >
                    <span className="font-barlow-condensed text-xs font-bold uppercase tracking-wider text-text-tertiary block mb-1">
                      {c.category}
                    </span>
                    <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-1 group-hover:text-primary transition-colors">
                      Forge vs {c.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 font-barlow-condensed text-sm font-bold uppercase tracking-wider text-primary mt-2">
                      Read it
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ToolCTA
          headline="Reading is done."
          headlineAccent="Go train."
          subline="Start the 7-day free trial, run three workouts with your AI trainer, and compare the experience against anything on this page."
          utmContent={`compare-${competitor.slug}`}
        />
      </main>
    </div>
  );
}
