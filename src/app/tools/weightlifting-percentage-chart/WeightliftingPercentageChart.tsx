"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import {
  ToolHero,
  ToolSection,
  ToolCTA,
  RelatedTools,
} from "@/components/tools/ToolParts";

type Unit = "lb" | "kg";
type Mode = "single" | "bigfour";

const PERCENTS = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30];

const REPS_BY_PCT: Record<number, string> = {
  100: "1",
  95: "2",
  90: "3-4",
  85: "5-6",
  80: "7-8",
  75: "8-10",
  70: "10-12",
  65: "12-15",
  60: "15-20",
  55: "20+",
  50: "20+",
  45: "25+",
  40: "25+",
  35: "30+",
  30: "30+",
};

function zoneFor(pct: number): string {
  if (pct >= 90) return "Max strength";
  if (pct >= 80) return "Strength";
  if (pct >= 70) return "Strength + size";
  if (pct >= 60) return "Size";
  return "Endurance";
}

const LIFTS = [
  { key: "squat", label: "Squat" },
  { key: "bench", label: "Bench" },
  { key: "deadlift", label: "Deadlift" },
  { key: "ohp", label: "Overhead press" },
] as const;

type LiftKey = (typeof LIFTS)[number]["key"];

const faqs = [
  {
    question: "Where do these percentages come from?",
    answer:
      "The reps column follows the consensus relationship between percentage of one-rep max and reps to failure, the same landmarks behind the charts strength coaches have used for decades. Your 85% load should cost most lifters 5 or 6 all-out reps. The zones describe the adaptation each intensity drives best, drawn from standard exercise science practice.",
  },
  {
    question: "Why are the rep counts given as ranges?",
    answer:
      "Because lifters differ. Muscle fiber mix, training age, and the lift itself all shift how many reps you can squeeze from a given percentage. One lifter grinds out 3 reps at 90% while another manages 5. Use the ranges as a sanity check for your own bar, and pay attention to where you personally land over a few weeks of training.",
  },
  {
    question: "Which zone should I train in to build muscle?",
    answer:
      "Most growth work lives between 60% and 80%, where sets can run long enough to accumulate real volume while the weight stays heavy enough to demand effort. Take those sets within a few reps of failure and the muscle gets the message. Heavier strength work above 85% still builds muscle, it just costs more recovery per set, so programs sprinkle it in rather than lean on it.",
  },
  {
    question: "Should every lift use the same percentages?",
    answer:
      "The chart calibrates best for the squat and bench. Deadlifts usually produce fewer reps at a given percentage because each rep starts from a dead stop with no stretch to help you. Overhead pressing fades fast above 85% since the smaller musculature has less reserve. Expect those two lifts to sit a rep or two under the chart values.",
  },
  {
    question: "How often should I update my max?",
    answer:
      "Every four to eight weeks for most lifters. Your chart is only as good as the max behind it, and a max from three months ago quietly makes every row too light. You can estimate a fresh max from any hard set of 3 to 5 reps with our 1RM calculator, which saves you a fatiguing true test.",
  },
  {
    question: "What if my program uses RPE instead of percentages?",
    answer:
      "RPE and percentages describe the same thing from opposite directions. A percentage tells you the weight and implies the effort, while RPE tells you the effort and lets the weight follow. Many programs blend them, prescribing a top set by RPE and back-off work by percentage. Our RPE calculator converts between the two systems.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Weightlifting Percentage Chart",
  url: "https://forgetrainer.ai/tools/weightlifting-percentage-chart",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free weightlifting percentage chart. Turn a one-rep max into working weights from 100% to 30% with reps and training zones, for one lift or the big four.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

export default function WeightliftingPercentageChart() {
  const [mode, setMode] = useState<Mode>("single");
  const [unit, setUnit] = useState<Unit>("lb");
  const [max, setMax] = useState("315");
  const [maxes, setMaxes] = useState<Record<LiftKey, string>>({
    squat: "315",
    bench: "225",
    deadlift: "405",
    ohp: "135",
  });

  const roundStep = unit === "lb" ? 5 : 2.5;
  const roundLoad = (w: number) => Math.round(w / roundStep) * roundStep;
  const fmt = (n: number) => (n % 1 === 0 ? n.toString() : n.toFixed(1));
  const convert = (n: number) => (unit === "lb" ? n / 2.20462 : n * 2.20462);

  const singleMax = parseFloat(max) || 0;
  const liftMaxes = LIFTS.map((l) => ({
    ...l,
    value: parseFloat(maxes[l.key]) || 0,
  }));
  const valid = mode === "single" ? singleMax > 0 : liftMaxes.every((l) => l.value > 0);
  const bigFourTotal = liftMaxes.reduce((s, l) => s + l.value, 0);

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
          { name: "Weightlifting Percentage Chart", url: "https://forgetrainer.ai/tools/weightlifting-percentage-chart" },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        <ToolHero
          titleBefore="Weightlifting Percentage"
          titleAccent="Chart"
          description="Enter your one-rep max and get every working weight from 100% down to 30%, with the reps and training zone for each row. Run one lift or all four big lifts at once."
        />

        {/* Calculator */}
        <section className="py-10 md:py-14 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                {/* Mode toggle */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Lifts
                  </legend>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: "single", label: "One lift" },
                        { value: "bigfour", label: "Big four" },
                      ] as { value: Mode; label: string }[]
                    ).map((m) => (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => setMode(m.value)}
                        aria-pressed={mode === m.value}
                        className={`flex-1 py-3 rounded-[10px] border font-barlow-condensed font-bold text-lg uppercase transition-colors ${
                          mode === m.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Unit toggle */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Units
                  </legend>
                  <div className="flex gap-2">
                    {(["lb", "kg"] as Unit[]).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUnit(u)}
                        aria-pressed={unit === u}
                        className={`flex-1 py-3 rounded-[10px] border font-barlow-condensed font-bold text-lg uppercase transition-colors ${
                          unit === u
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {mode === "single" ? (
                  <div>
                    <label
                      htmlFor="one-rm"
                      className="block font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3"
                    >
                      Your one-rep max ({unit})
                    </label>
                    <input
                      id="one-rm"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                      className="w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {LIFTS.map((l) => (
                      <div key={l.key}>
                        <label
                          htmlFor={`max-${l.key}`}
                          className="block font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3"
                        >
                          {l.label} ({unit})
                        </label>
                        <input
                          id={`max-${l.key}`}
                          type="number"
                          inputMode="decimal"
                          min="0"
                          value={maxes[l.key]}
                          onChange={(e) =>
                            setMaxes((prev) => ({ ...prev, [l.key]: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  {mode === "single" ? "Your training max" : "Your big four"}
                </p>

                {valid ? (
                  <>
                    <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                      <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                        {mode === "single" ? fmt(singleMax) : fmt(bigFourTotal)}
                      </span>
                      <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                        {unit} · {mode === "single" ? "one-rep max" : "combined total"}
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow mt-1">
                        {mode === "single"
                          ? `${fmt(convert(singleMax))} ${unit === "lb" ? "kg" : "lb"}`
                          : `${fmt(convert(bigFourTotal))} ${unit === "lb" ? "kg" : "lb"} across the four lifts`}
                      </span>
                    </div>

                    {mode === "single" ? (
                      <div className="space-y-2 mb-6">
                        {[90, 80, 70, 60].map((pct) => (
                          <div
                            key={pct}
                            className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle"
                          >
                            <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                              {pct}% · {zoneFor(pct)}
                            </span>
                            <span className="font-barlow-condensed text-lg font-bold text-foreground">
                              {fmt(roundLoad((singleMax * pct) / 100))} {unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2 mb-6">
                        {liftMaxes.map((l) => (
                          <div
                            key={l.key}
                            className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle"
                          >
                            <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                              {l.label}
                            </span>
                            <span className="font-barlow-condensed text-lg font-bold text-foreground">
                              {fmt(l.value)} {unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
                        <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                          Keep the max fresh
                        </span>
                      </div>
                      <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                        Every row below scales off the number you entered. When
                        your training moves, come back and update it, or the
                        chart quietly drifts away from your real strength.
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-barlow text-text-secondary">
                    Enter your {mode === "single" ? "one-rep max" : "four maxes"} to build the chart.
                  </p>
                )}
              </div>
            </div>

            {/* Percentage table */}
            {valid && (
              <div className="max-w-5xl mx-auto mt-6 p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                <h2 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-2">
                  Loads from 100% to 30%
                </h2>
                <p className="text-sm text-text-tertiary font-barlow mb-5 leading-relaxed">
                  Rounded to the nearest {unit === "lb" ? "5 lb" : "2.5 kg"}. The reps
                  column shows what an all-out set at that percentage usually costs.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[560px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-2.5 pr-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary">
                          %
                        </th>
                        <th className="py-2.5 pr-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary">
                          Reps
                        </th>
                        <th className="py-2.5 pr-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary">
                          Zone
                        </th>
                        {mode === "single" ? (
                          <th className="py-2.5 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary text-right">
                            Load ({unit})
                          </th>
                        ) : (
                          LIFTS.map((l) => (
                            <th
                              key={l.key}
                              className="py-2.5 pl-4 font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary text-right"
                            >
                              {l.label}
                            </th>
                          ))
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {PERCENTS.map((pct) => (
                        <tr
                          key={pct}
                          className={`border-b border-border-subtle ${
                            pct === 100 ? "bg-primary/5" : ""
                          }`}
                        >
                          <td className="py-2.5 pr-4 font-barlow-condensed text-lg font-bold text-foreground">
                            {pct}%
                          </td>
                          <td className="py-2.5 pr-4 font-barlow text-sm text-text-secondary">
                            {REPS_BY_PCT[pct]}
                          </td>
                          <td className="py-2.5 pr-4 font-barlow text-sm text-text-secondary">
                            {zoneFor(pct)}
                          </td>
                          {mode === "single" ? (
                            <td className="py-2.5 font-barlow-condensed text-lg font-bold text-foreground text-right">
                              {fmt(roundLoad((singleMax * pct) / 100))}
                            </td>
                          ) : (
                            liftMaxes.map((l) => (
                              <td
                                key={l.key}
                                className="py-2.5 pl-4 font-barlow-condensed text-lg font-bold text-foreground text-right"
                              >
                                {fmt(roundLoad((l.value * pct) / 100))}
                              </td>
                            ))
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: each load is your entered max multiplied by the row
              percentage and rounded to the nearest 5 lb or 2.5 kg. The reps
              column uses widely accepted landmarks, with 100% as a true
              single, 85% costing about 5 to 6 reps, and 70% costing about 10
              to 12. Zones follow standard coaching practice for the dominant
              adaptation at each intensity. Real rep performance varies by
              lift and by lifter, so treat the reps and zones as guides and
              adjust by what the bar gives you.
            </p>
          </div>
        </section>

        <ToolSection heading="What each zone" accent="trains">
          <p>
            Work above 90% is practice at producing maximum force. The sets are
            short, the rest periods are long, and the adaptation lives mostly
            in your nervous system recruiting more muscle at once. Drop into
            the 80 to 85% range and the sets stretch to 5 to 8 reps, which
            still builds serious strength while adding enough volume to grow
            the muscle doing the work.
          </p>
          <p>
            Between 60 and 75% the weight stays meaningful and the reps climb
            into double digits, the territory where most muscle building
            happens. Below 60% the load gets light enough that sets run past
            15 or 20 reps, and the training effect shifts toward work capacity
            and local endurance. Most productive programs spend the week
            moving through several of these zones rather than camping in one.
          </p>
        </ToolSection>

        <ToolSection heading="Percentages age faster" accent="than you think">
          <p>
            A percentage chart is a snapshot of one day. Strength you tested
            eight weeks ago has already moved if your training is working, so
            every row computed from that old max quietly underloads you. The
            reverse happens after a layoff or a hard diet, where the chart
            overreaches and grinds your sets to a halt.
          </p>
          <p>
            Refresh the max behind the chart on a regular rhythm, monthly for
            newer lifters who gain fast, and every couple of months once
            progress slows. A heavy set of 3 to 5 gives you a fresh estimate
            without the cost of a true max attempt. Between updates, let bar
            speed and reps in reserve tell you whether the printed numbers
            still match reality.
          </p>
        </ToolSection>

        <FAQSection
          title="Percentage Chart Questions"
          subtitle="Common questions about training off your max"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="weightlifting-percentage-chart" />

        <ToolCTA
          headline="Your program,"
          headlineAccent="auto-calculated."
          subline="Forge builds your plan, sets every working weight from your current strength, and adjusts the numbers as your maxes move. Try it free for 7 days."
          utmContent="weightlifting-percentage-chart"
        />
      </main>
    </div>
  );
}
