"use client";

import { useState } from "react";
import { Minus, Plus, TrendingUp } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import {
  ToolHero,
  ToolSection,
  ToolCTA,
  RelatedTools,
} from "@/components/tools/ToolParts";

type ZoneKey = "floor" | "minimum" | "productive" | "high" | "past";

const MUSCLES: { key: string; label: string; def: number }[] = [
  { key: "chest", label: "Chest", def: 10 },
  { key: "back", label: "Back", def: 12 },
  { key: "quads", label: "Quads", def: 8 },
  { key: "hams", label: "Hamstrings & glutes", def: 6 },
  { key: "delts", label: "Side delts", def: 10 },
  { key: "biceps", label: "Biceps", def: 6 },
  { key: "triceps", label: "Triceps", def: 6 },
  { key: "calves", label: "Calves", def: 4 },
  { key: "abs", label: "Abs", def: 3 },
];

function zoneFor(sets: number): { key: ZoneKey; label: string } {
  if (sets <= 5) return { key: "floor", label: "Below the growth floor" };
  if (sets <= 9) return { key: "minimum", label: "Minimum effective" };
  if (sets <= 19) return { key: "productive", label: "Productive range" };
  if (sets <= 24) return { key: "high", label: "High, watch recovery" };
  return { key: "past", label: "Likely past recoverable" };
}

const CHIP_CLASSES: Record<ZoneKey, string> = {
  floor: "border-red-500/40 bg-red-500/10 text-red-400",
  minimum: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  productive: "border-primary/50 bg-primary/10 text-primary",
  high: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  past: "border-red-500/40 bg-red-500/10 text-red-400",
};

const faqs = [
  {
    question: "What counts as a hard set?",
    answer:
      "A working set you stop within about four reps of failure. That is where the growth signal lives. Warm-ups, ramping sets, and easy technique work stay out of the count. If you finish a set and could immediately repeat it for the same reps, it was too easy to include.",
  },
  {
    question: "Should every muscle land in the productive range?",
    answer:
      "Only if you recover from it. Ten to nineteen hard sets per week suits most lifters on most muscles, but biceps and triceps already collect volume from pressing and pulling. Direct arm work stacked on heavy compounds climbs fast, so six to ten direct sets is often plenty for arms.",
  },
  {
    question: "I am below the floor on several muscles. Where do I start?",
    answer:
      "Pick the two muscles you care about most and bring them to six to ten sets. Adding sets everywhere at once spikes fatigue and hides which change worked. Give any adjustment four to six weeks before you judge it, because growth is slow and first-week soreness lies to you.",
  },
  {
    question: "Do compound lifts count toward multiple muscles?",
    answer:
      "Yes. Bench presses count for chest and triceps, rows count for back and biceps, squats count for quads and glutes. That is why your weekly totals here add up much faster than the number of exercises in your program suggests.",
  },
  {
    question: "My sets are high and I stopped growing. What now?",
    answer:
      "Cut first. Drop each muscle by roughly a third for one to two weeks, then rebuild toward the productive range. Lingering fatigue masks progress, and a short deload often reveals more strength than another hard week. If growth still stalls, check your sleep and your effort per set before adding more work.",
  },
  {
    question: "How fast should I add sets?",
    answer:
      "One or two sets per muscle per week at most. Jumping from eight sets to sixteen in one step mostly buys soreness. A slow ramp lets you find the most volume you can recover from instead of guessing.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Training Volume Calculator",
  url: "https://forgetrainer.ai/tools/training-volume-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free training volume calculator. Enter weekly hard sets per muscle group and see which muscles are undertrained, productive, or past recoverable.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

export default function TrainingVolumeCalculator() {
  const [sets, setSets] = useState<Record<string, number>>(() =>
    Object.fromEntries(MUSCLES.map((m) => [m.key, m.def]))
  );

  const bump = (key: string, delta: number) =>
    setSets((prev) => ({
      ...prev,
      [key]: Math.min(30, Math.max(0, prev[key] + delta)),
    }));

  const total = MUSCLES.reduce((s, m) => s + sets[m.key], 0);
  const productive = MUSCLES.filter((m) => {
    const z = zoneFor(sets[m.key]).key;
    return z === "productive";
  });
  const undertrained = MUSCLES.filter(
    (m) => zoneFor(sets[m.key]).key === "floor"
  ).map((m) => m.label);
  const overdone = MUSCLES.filter(
    (m) => zoneFor(sets[m.key]).key === "past"
  ).map((m) => m.label);

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
          {
            name: "Training Volume Calculator",
            url: "https://forgetrainer.ai/tools/training-volume-calculator",
          },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        <ToolHero
          titleBefore="Training Volume"
          titleAccent="Calculator"
          description="Count your weekly hard sets for each muscle group and see where you stand. Find the muscles sitting under the growth floor and the ones drifting past what you can recover from."
        />

        {/* Calculator */}
        <section className="py-10 md:py-14 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-1">
                  Weekly hard sets per muscle
                </p>
                <p className="text-xs text-text-tertiary font-barlow mb-5 leading-relaxed">
                  Working sets taken within about four reps of failure.
                  Warm-ups stay out of the count.
                </p>
                <div className="divide-y divide-border-subtle">
                  {MUSCLES.map((m) => (
                    <div
                      key={m.key}
                      className="flex items-center justify-between gap-3 py-2.5"
                    >
                      <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                        {m.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => bump(m.key, -1)}
                          disabled={sets[m.key] <= 0}
                          aria-label={`Decrease ${m.label} sets`}
                          className="w-9 h-9 rounded-[10px] border border-border bg-surface-1 text-text-secondary hover:border-primary/50 transition-colors flex items-center justify-center disabled:opacity-40"
                        >
                          <Minus className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <span className="font-barlow-condensed text-2xl font-bold w-9 text-center text-foreground">
                          {sets[m.key]}
                        </span>
                        <button
                          type="button"
                          onClick={() => bump(m.key, 1)}
                          disabled={sets[m.key] >= 30}
                          aria-label={`Increase ${m.label} sets`}
                          className="w-9 h-9 rounded-[10px] border border-border bg-surface-1 text-text-secondary hover:border-primary/50 transition-colors flex items-center justify-center disabled:opacity-40"
                        >
                          <Plus className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your volume map
                </p>

                <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                  <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                    {productive.length} of {MUSCLES.length}
                  </span>
                  <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                    muscles in the productive range
                  </span>
                  <span className="block text-xs text-text-tertiary font-barlow mt-1">
                    {total} weekly hard sets in total
                  </span>
                </div>

                <div className="space-y-2 mb-5">
                  {MUSCLES.map((m) => {
                    const zone = zoneFor(sets[m.key]);
                    return (
                      <div
                        key={m.key}
                        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle"
                      >
                        <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                          {m.label}
                          <span className="text-text-tertiary font-normal ml-2">
                            {sets[m.key]} sets
                          </span>
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-[8px] border text-xs font-barlow font-bold whitespace-nowrap ${CHIP_CLASSES[zone.key]}`}
                        >
                          {zone.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
                    <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                      Where to act
                    </span>
                  </div>
                  <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                    {undertrained.length > 0
                      ? `Under the growth floor: ${undertrained.join(
                          ", "
                        )}. Add sets there first, one or two per week.`
                      : "Every muscle reaches at least the minimum effective range."}
                    {overdone.length > 0 &&
                      ` Past the recoverable range: ${overdone.join(
                        ", "
                      )}. Pull those back before they stall the rest of your training.`}
                  </p>
                </div>
              </div>
            </div>

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: a hard set is a working set stopped within roughly
              four reps of failure, so warm-ups and easy backoff work stay out
              of the count. The zones come from the volume landmarks common in
              hypertrophy research: under six weekly sets rarely drives growth,
              six to nine maintains and slowly builds, ten to nineteen is where
              most lifters grow best, twenty to twenty four demands close
              attention to recovery, and past twenty five the added work
              usually outpaces what you can bounce back from. These are
              population heuristics. Sleep, training age, and how close to
              failure you honestly go all shift where your personal ranges
              land.
            </p>
          </div>
        </section>

        <ToolSection heading="What counts as" accent="a hard set">
          <p>
            A hard set ends when you have roughly four or fewer good reps left.
            Anything easier is practice. Warm-up sets and the sets you coast
            through while resting between messages do nothing for growth, so
            they stay out of your count here.
          </p>
          <p>
            Count a set toward every muscle that works hard in it. Bench press
            sets feed your chest and your triceps. Rows feed your back and your
            biceps. Indirect volume counts in full, which is why arms often
            need fewer isolation sets than people expect.
          </p>
        </ToolSection>

        <ToolSection heading="Why more sets" accent="stop helping">
          <p>
            Muscle growth responds to hard work up to a point. Past that point
            each extra set adds fatigue faster than it adds stimulus. Your
            performance slides and the weights on the bar stall even though the
            effort keeps climbing.
          </p>
          <p>
            Recovery is the budget every set draws from, and sleep plus
            day-to-day stress decide the size of that budget week to week. When
            a muscle sits above twenty sets and progress stalls, cutting volume
            for a week often restarts growth faster than pushing harder.
          </p>
        </ToolSection>

        <FAQSection
          title="Training Volume Questions"
          subtitle="Common questions about weekly sets and recovery"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="training-volume-calculator" />

        <ToolCTA
          headline="Stop counting sets"
          headlineAccent="in your head."
          subline="Forge logs every set, tracks weekly volume per muscle as you train, and adjusts your plan when recovery slips."
          utmContent="training-volume-calculator"
        />
      </main>
    </div>
  );
}
