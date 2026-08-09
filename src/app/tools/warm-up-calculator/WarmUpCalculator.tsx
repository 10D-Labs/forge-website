"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import {
  ToolHero,
  ToolSection,
  ToolCTA,
  RelatedTools,
} from "@/components/tools/ToolParts";

type Unit = "lb" | "kg";
type Kind = "barbell" | "accessory";

interface RampStep {
  label: string;
  weight: number;
  reps: number;
}

const faqs = [
  {
    question: "How long should a warm-up take?",
    answer:
      "Five to ten minutes for the lift itself. Each ramp set takes under a minute to perform, and you only need enough rest between sets to change the plates. Add a few minutes of easy movement before the first set if you train early in the morning or walk in cold.",
  },
  {
    question: "Should I stretch before lifting?",
    answer:
      "Keep long static stretches for after the session. Holding stretches before lifting can trim a little strength off the work that follows. The ramp sets themselves cover your mobility before the lift, since every rep runs the full range of motion under light load.",
  },
  {
    question: "Do warm-up sets count as training volume?",
    answer:
      "For growth purposes, count them as zero. A set only drives growth when it comes within about four reps of failure, and nothing in a proper ramp gets close. Warm-up sets still add fatigue if you pile on reps, which is why the ramp cuts reps as the weight climbs.",
  },
  {
    question: "What if my working weight is light?",
    answer:
      "When the working weight sits under 135 lb or 60 kg, the calculator starts at 40% and skips the empty bar, because the bar alone is already most of the way there. It also drops any step that lands within a few pounds of the previous one. Two or three sets is a complete warm-up at lighter loads.",
  },
  {
    question: "Do machines and accessories need the same ramp?",
    answer:
      "They need fewer rungs, since the loads are lighter and the balance demand is lower. Switch the tool to accessory mode and it drops the empty-bar step and trims the ramp to three sets. The shape stays familiar: start around 40% and climb.",
  },
  {
    question: "Can I shorten the ramp when I'm in a hurry?",
    answer:
      "Trim a middle step or two and keep the first light set and the final heavy single. Those two bookends do most of the work. Skip the final single and your first work set quietly becomes the warm-up.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Warm-Up Calculator",
  url: "https://forgetrainer.ai/tools/warm-up-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free warm-up calculator that builds a ramp of warm-up sets with exact loads and reps from the empty bar to your working weight.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

function buildRamp(working: number, unit: Unit, kind: Kind): RampStep[] {
  const step = unit === "lb" ? 5 : 2.5;
  const near = unit === "lb" ? 10 : 5;
  const barWeight = unit === "lb" ? 45 : 20;
  const steps: RampStep[] = [];

  const push = (label: string, weight: number, reps: number) => {
    if (steps.some((s) => Math.abs(s.weight - weight) <= near)) return;
    steps.push({ label, weight, reps });
  };

  if (kind === "barbell") {
    const minForBar = unit === "lb" ? 135 : 60;
    if (working >= minForBar) {
      steps.push({ label: "Empty bar", weight: barWeight, reps: 10 });
    }
    const pcts: [number, number][] = [
      [0.4, 8],
      [0.55, 5],
      [0.7, 3],
      [0.82, 2],
      [0.92, 1],
    ];
    for (const [pct, reps] of pcts) {
      const w = roundTo(working * pct, step);
      if (working >= minForBar && w <= barWeight) continue;
      push(`${Math.round(pct * 100)}% of working weight`, w, reps);
    }
  } else {
    const pcts: [number, number][] = [
      [0.4, 10],
      [0.6, 6],
      [0.8, 3],
    ];
    for (const [pct, reps] of pcts) {
      push(`${Math.round(pct * 100)}% of working weight`, roundTo(working * pct, step), reps);
    }
  }

  return steps.filter((s) => s.weight > 0 && s.weight < working);
}

export default function WarmUpCalculator() {
  const [weight, setWeight] = useState("225");
  const [unit, setUnit] = useState<Unit>("lb");
  const [kind, setKind] = useState<Kind>("barbell");

  const w = parseFloat(weight) || 0;
  const valid = w > 0;
  const steps = valid ? buildRamp(w, unit, kind) : [];

  const fmt = (n: number) => (n % 1 === 0 ? n.toString() : n.toFixed(1));

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
          { name: "Warm-Up Calculator", url: "https://forgetrainer.ai/tools/warm-up-calculator" },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        <ToolHero
          titleBefore="Warm-Up"
          titleAccent="Calculator"
          description="Enter your working weight. Get the exact warm-up sets, reps, and loads that carry you from the empty bar to your first work set."
        />

        {/* Calculator */}
        <section className="py-10 md:py-14 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
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

                {/* Exercise kind */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Exercise type
                  </legend>
                  <div className="flex gap-2">
                    {(
                      [
                        ["barbell", "Barbell compound"],
                        ["accessory", "Accessory or machine"],
                      ] as [Kind, string][]
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setKind(value)}
                        aria-pressed={kind === value}
                        className={`flex-1 py-3 px-2 rounded-[10px] border font-barlow-condensed font-bold text-base uppercase transition-colors ${
                          kind === value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Working weight */}
                <div>
                  <label
                    htmlFor="working-weight"
                    className="block font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3"
                  >
                    Working weight ({unit})
                  </label>
                  <input
                    id="working-weight"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                  <p className="text-xs text-text-tertiary font-barlow mt-3 leading-relaxed">
                    The weight of your first work set.{" "}
                    {kind === "barbell"
                      ? "Includes the bar."
                      : "For machines, the number on the stack."}
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your warm-up ramp
                </p>

                {valid && steps.length > 0 ? (
                  <>
                    <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                      <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                        {steps.length}
                      </span>
                      <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                        warm-up set{steps.length > 1 ? "s" : ""}
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow mt-1">
                        then work sets at {fmt(w)} {unit}
                      </span>
                    </div>

                    {/* Stepper */}
                    <ol className="space-y-2 mb-5 list-none">
                      {steps.map((s, i) => (
                        <li
                          key={`${s.weight}-${s.reps}`}
                          className="flex items-center gap-4 px-4 py-3 rounded-[10px] bg-surface-1 border border-border-subtle"
                        >
                          <span className="w-8 h-8 shrink-0 rounded-full border border-primary/40 text-primary flex items-center justify-center font-barlow-condensed font-bold">
                            {i + 1}
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block font-barlow-condensed text-xl font-bold text-foreground leading-tight">
                              {fmt(s.weight)} {unit}
                            </span>
                            <span className="block text-xs text-text-tertiary font-barlow">
                              {s.label}
                            </span>
                          </span>
                          <span className="font-barlow-condensed text-lg font-bold text-text-secondary">
                            x {s.reps}
                          </span>
                        </li>
                      ))}
                      <li className="flex items-center gap-4 px-4 py-3 rounded-[10px] bg-primary/10 border border-primary/40">
                        <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-background flex items-center justify-center">
                          <Flame className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-barlow-condensed text-xl font-bold text-primary leading-tight">
                            {fmt(w)} {unit}
                          </span>
                          <span className="block text-xs text-text-tertiary font-barlow">
                            Work sets
                          </span>
                        </span>
                        <span className="font-barlow-condensed text-lg font-bold text-primary uppercase">
                          Go
                        </span>
                      </li>
                    </ol>

                    <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                      <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                        Rest only as long as plate changes take between warm-up
                        sets. Take a full two to three minutes before the first
                        work set.
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-barlow text-text-secondary">
                    Enter a working weight to build your ramp. Very light
                    weights warm up fine with one or two quick sets.
                  </p>
                )}
              </div>
            </div>

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: the barbell ramp runs empty bar x10, 40% x8, 55% x5,
              70% x3, 82% x2, 92% x1, with the empty bar at 45 lb or 20 kg.
              Working weights under 135 lb or 60 kg start at 40%. The accessory
              ramp runs 40% x10, 60% x6, 80% x3. Loads round to the nearest 5
              lb or 2.5 kg, and any step landing within 10 lb or 5 kg of the
              previous one is dropped. These percentages are coaching
              landmarks, so treat the ramp as a starting template and adjust by
              feel.
            </p>
          </div>
        </section>

        <ToolSection heading="Why ramping beats" accent="static stretching">
          <p>
            A warm-up has one job: get blood into the muscles and rehearse the
            movement you are about to load. Ramp sets do both at once. Every
            set is a lighter practice rep of the real lift, so by the time the
            working weight is on the bar your body has already run the movement
            several times that day.
          </p>
          <p>
            Long static stretches before lifting work against that goal.
            Holding a stretch for 30 seconds or more temporarily reduces how
            much force the muscle can produce, and studies on pre-lift
            stretching keep finding small strength drops in the session that
            follows. Save the long holds for after training. Before the lift,
            move through the pattern with a light bar.
          </p>
        </ToolSection>

        <ToolSection heading="How many sets" accent="heavy days need">
          <p>
            The heavier the work set, the more rungs the ladder needs. A 135 lb
            squat can be ready in two or three sets. A 315 lb squat wants five
            or six, because jumping straight from 135 to 315 shocks the system
            and the first work set ends up feeling like another warm-up.
          </p>
          <p>
            Cut reps as the load climbs. Early sets grease the groove with 8 to
            10 easy reps. The last warm-up set is a single around 90%, enough
            to feel heavy weight in your hands while leaving your strength
            untouched. If a warm-up set ever feels like work, it sat too close
            to the top weight.
          </p>
        </ToolSection>

        <FAQSection
          title="Warm-Up Questions"
          subtitle="Common questions about warming up for lifting"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="warm-up-calculator" />

        <ToolCTA
          headline="Your warm-up, planned"
          headlineAccent="every session."
          subline="Forge builds each session around your numbers and logs every set, so the ramp and the work weights are already waiting when you walk in."
          utmContent="warm-up-calculator"
        />
      </main>
    </div>
  );
}
