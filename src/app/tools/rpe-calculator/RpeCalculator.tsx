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

// Reactive Training Systems chart. Each array holds reps 1 through 12 in order.
const RTS: Record<number, number[]> = {
  10: [100, 95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0],
  9.5: [97.8, 93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7],
  9: [95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3],
  8.5: [93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0],
  8: [92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6],
  7.5: [90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0, 61.3],
  7: [89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6, 59.9],
  6.5: [87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0, 61.3, 58.5],
};

const RPE_OPTIONS: { value: number; note: string }[] = [
  { value: 10, note: "0 left" },
  { value: 9.5, note: "0-1 left" },
  { value: 9, note: "1 left" },
  { value: 8.5, note: "1-2 left" },
  { value: 8, note: "2 left" },
  { value: 7.5, note: "2-3 left" },
  { value: 7, note: "3 left" },
  { value: 6.5, note: "3-4 left" },
];

const RIR_TEXT: Record<number, string> = {
  10: "0 reps in reserve. A true maximal set.",
  9.5: "0 to 1 reps in reserve.",
  9: "1 rep in reserve.",
  8.5: "1 to 2 reps in reserve.",
  8: "2 reps in reserve.",
  7.5: "2 to 3 reps in reserve.",
  7: "3 reps in reserve.",
  6.5: "3 to 4 reps in reserve.",
};

// Chart columns in the order shown, easiest effort first.
const CHART_RPE = [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

const faqs = [
  {
    question: "What does RPE stand for?",
    answer:
      "Rate of perceived exertion. In lifting it runs from 6 to 10 and describes how close a set came to failure. RPE 10 is a maximal set. Each half point below 10 adds roughly half a rep you could have completed with good form.",
  },
  {
    question: "How do I judge my RPE during a set?",
    answer:
      "Ask yourself one thing as you rack the bar: how many clean reps were left? With practice your answer gets accurate within about one rep. Filming your sets helps early on, because bar speed on the last rep gives the answer away.",
  },
  {
    question: "What is RIR and how does it relate to RPE?",
    answer:
      "RIR means reps in reserve, the literal count of reps left in the tank. It is RPE flipped around: 2 RIR and RPE 8 describe the same set. Many lifters find counting reps up easier than rating effort down, so this calculator shows both for every target.",
  },
  {
    question: "Why does the calculator need my estimated 1RM?",
    answer:
      "The RPE chart links effort and reps to a percentage of your max. Multiply your estimated max by that percentage and you get the weight that should land you at the target effort on a typical day. If you have no max estimate yet, our 1RM calculator will get you one from any recent hard set.",
  },
  {
    question: "Can beginners use RPE?",
    answer:
      "Yes, with one adjustment. Newer lifters misjudge their reps in reserve by a rep or two, so an intended RPE 8 might come out closer to a 7. That error shrinks fast with practice. Keep targets at RPE 8 or below for your first couple of months and the worst outcome is a slightly easy set.",
  },
  {
    question: "Should every set go to RPE 10?",
    answer:
      "Save maximal sets for rare tests. Most productive training lives between RPE 6.5 and 9, where the effort stays high enough to drive progress and low enough to repeat across a full week. Living at RPE 10 burns recovery that the rest of your program needs.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "RPE Calculator",
  url: "https://forgetrainer.ai/tools/rpe-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free RPE calculator that turns an estimated max, target reps, and target RPE into a working weight, with the full RPE chart and reps in reserve.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

export default function RpeCalculator() {
  const [max, setMax] = useState("315");
  const [reps, setReps] = useState(5);
  const [rpe, setRpe] = useState(8);
  const [unit, setUnit] = useState<Unit>("lb");

  const e1rm = parseFloat(max) || 0;
  const valid = e1rm > 0;

  const step = unit === "lb" ? 5 : 2.5;
  const roundTo = (n: number) => Math.round(n / step) * step;
  const fmt = (n: number) => (n % 1 === 0 ? n.toString() : n.toFixed(1));

  const pct = RTS[rpe][reps - 1];
  const target = valid ? roundTo((e1rm * pct) / 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
          { name: "RPE Calculator", url: "https://forgetrainer.ai/tools/rpe-calculator" },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        <ToolHero
          titleBefore="RPE"
          titleAccent="Calculator"
          description="Pick a rep count and an effort level. Get the exact working weight, plus the full RPE chart so you can plan any set from your estimated max."
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

                {/* Estimated max */}
                <div className="mb-7">
                  <label
                    htmlFor="e1rm"
                    className="block font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3"
                  >
                    Estimated 1RM ({unit})
                  </label>
                  <input
                    id="e1rm"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    className="w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Target reps */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Target reps
                  </legend>
                  <div className="grid grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setReps(n)}
                        aria-pressed={reps === n}
                        className={`py-2.5 rounded-[10px] border font-barlow-condensed font-bold transition-colors ${
                          reps === n
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Target RPE */}
                <fieldset>
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Target RPE
                  </legend>
                  <div className="grid grid-cols-4 gap-2">
                    {RPE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setRpe(opt.value)}
                        aria-pressed={rpe === opt.value}
                        className={`py-2.5 px-1 rounded-[10px] border text-center transition-colors ${
                          rpe === opt.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        <span className="block font-barlow-condensed font-bold text-base leading-tight">
                          {opt.value}
                        </span>
                        <span className="block text-[10px] font-barlow leading-tight opacity-80">
                          {opt.note}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-text-tertiary font-barlow mt-3 leading-relaxed">
                    RPE answers one question: how many more reps could you have
                    done? RPE 9 means one rep was left in the tank.
                  </p>
                </fieldset>
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your target working weight
                </p>

                {valid ? (
                  <>
                    <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                      <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                        {fmt(target)}
                      </span>
                      <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                        {unit} · {reps} rep{reps > 1 ? "s" : ""} at RPE {rpe}
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow mt-1">
                        {pct}% of {fmt(e1rm)} {unit} · {RIR_TEXT[rpe]}
                      </span>
                    </div>

                    <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-5 h-5 text-primary" aria-hidden="true" />
                        <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                          Read the day
                        </span>
                      </div>
                      <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                        If {fmt(target)} {unit} moves faster than expected,
                        your max estimate may be due for an update. If it
                        grinds, take the win at RPE {rpe} and stop there.
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-barlow text-text-secondary">
                    Enter your estimated max to see the target weight.
                  </p>
                )}
              </div>
            </div>

            {/* Full chart */}
            {valid && (
              <div className="max-w-5xl mx-auto mt-6 p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                <h2 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-2">
                  The full RPE chart
                </h2>
                <p className="text-sm text-text-tertiary font-barlow mb-5 leading-relaxed">
                  Every weight below is a percentage of your {fmt(e1rm)} {unit}{" "}
                  max, rounded to the nearest {step} {unit}. Your current
                  target is highlighted.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse min-w-[560px]">
                    <thead>
                      <tr>
                        <th className="p-2 text-left font-barlow-condensed text-xs font-bold uppercase tracking-wide text-text-tertiary">
                          Reps
                        </th>
                        {CHART_RPE.map((r) => (
                          <th
                            key={r}
                            className={`p-2 font-barlow-condensed text-xs font-bold uppercase tracking-wide ${
                              r === rpe ? "text-primary" : "text-text-tertiary"
                            }`}
                          >
                            RPE {r}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <tr
                          key={n}
                          className={n === reps ? "bg-primary/5" : undefined}
                        >
                          <td
                            className={`p-2 text-left font-barlow-condensed font-bold ${
                              n === reps ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {n}
                          </td>
                          {CHART_RPE.map((r) => {
                            const cell = roundTo((e1rm * RTS[r][n - 1]) / 100);
                            const active = n === reps && r === rpe;
                            return (
                              <td
                                key={r}
                                className={`p-2 font-barlow-condensed font-bold ${
                                  active
                                    ? "rounded-[8px] bg-primary/10 border border-primary/40 text-primary"
                                    : "border border-border-subtle text-text-secondary"
                                }`}
                              >
                                {fmt(cell)}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: working weight equals your estimated 1RM times the
              percentage for the chosen reps and RPE, taken from the Reactive
              Training Systems chart, rounded to the nearest 5 lb or 2.5 kg.
              The chart assumes a typical strength curve on barbell compounds
              and loses precision past 12 reps and on isolation work.
              Reps-in-reserve ranges follow the usual convention where RPE 10
              leaves zero reps and each half point down adds about half a rep
              of cushion.
            </p>
          </div>
        </section>

        <ToolSection heading="RPE in" accent="plain language">
          <p>
            RPE stands for rate of perceived exertion. On a set it answers one
            question: how many more reps could you have done before your form
            broke? An RPE 9 set means one rep was left. An RPE 8 set means two
            were left. At RPE 10 the bar was staying down on the next attempt.
          </p>
          <p>
            Coaches like the scale because it adjusts to the day. Poor sleep or
            a hard week makes the same weight feel heavier, and a plan written
            in fixed percentages has no way to hear that. RPE lets the load
            move with your readiness while the effort stays on target.
          </p>
        </ToolSection>

        <ToolSection heading="How to use" accent="the chart">
          <p>
            Start with your estimated max from a recent hard set. Pick the reps
            your program calls for and the effort it asks for, then read the
            weight where they meet. A plan that says 4 reps at RPE 8 turns into
            a number you can load.
          </p>
          <p>
            Expect that number to drift between sessions, and let it. Strength
            moves with sleep and stress, and RPE is built to follow. If the
            chart weight feels wrong two sessions in a row, your estimated max
            has gone stale and is worth re-testing.
          </p>
        </ToolSection>

        <FAQSection
          title="RPE Questions"
          subtitle="Common questions about rating effort and using the chart"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="rpe-calculator" />

        <ToolCTA
          headline="Your effort, tracked"
          headlineAccent="every set."
          subline="Forge logs every set and adjusts the plan to how you are performing, so the right weight is already on the screen when you step up to the bar."
          utmContent="rpe-calculator"
        />
      </main>
    </div>
  );
}
