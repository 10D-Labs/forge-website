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

const FORMULAS: { name: string; note: string; calc: (w: number, r: number) => number }[] = [
  { name: "Epley", note: "The most widely used. Reliable at low reps.", calc: (w, r) => w * (1 + r / 30) },
  { name: "Brzycki", note: "Straight-line model. Lands at 10 reps = 75%.", calc: (w, r) => (w * 36) / (37 - r) },
  { name: "Lander", note: "Behind the NSCA reps-to-percent chart.", calc: (w, r) => (100 * w) / (101.3 - 2.67123 * r) },
  { name: "Lombardi", note: "Power curve. More conservative as reps climb.", calc: (w, r) => w * Math.pow(r, 0.1) },
  { name: "Mayhew", note: "From bench research. Often strong on bench.", calc: (w, r) => (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r)) },
  { name: "O'Conner", note: "The gentlest. The most conservative estimate.", calc: (w, r) => w * (1 + 0.025 * r) },
  { name: "Wathen", note: "Grades well in studies, especially on squat.", calc: (w, r) => (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r)) },
];

// Consensus % of 1RM per rep count (rounded landmarks).
const REP_TABLE: { reps: number; pct: number }[] = [
  { reps: 1, pct: 100 },
  { reps: 2, pct: 95 },
  { reps: 3, pct: 93 },
  { reps: 4, pct: 90 },
  { reps: 5, pct: 87 },
  { reps: 6, pct: 85 },
  { reps: 7, pct: 83 },
  { reps: 8, pct: 80 },
  { reps: 9, pct: 77 },
  { reps: 10, pct: 75 },
  { reps: 11, pct: 72 },
  { reps: 12, pct: 70 },
  { reps: 15, pct: 65 },
  { reps: 20, pct: 60 },
];

const RIR_OPTIONS = [
  { value: 0, label: "All out", note: "0 left" },
  { value: 1, label: "1 left", note: "" },
  { value: 2, label: "2 left", note: "" },
  { value: 3, label: "3 left", note: "" },
  { value: 4, label: "4+ left", note: "" },
];

const faqs = [
  {
    question: "What is a one-rep max?",
    answer:
      "Your one-rep max is the most weight you can lift once with good form. Programs prescribe working weights as percentages of it, so it anchors almost everything in strength training. Testing it for real is fatiguing and carries some risk, which is why most lifters estimate it from a heavier set of several reps instead.",
  },
  {
    question: "Which 1RM formula is the most accurate?",
    answer:
      "No single formula wins across the board. Validation studies find the best one shifts by exercise, sex, and rep range. Mayhew and Wathen tend to grade well on bench, Wathen on squat, and nearly every formula underestimates the deadlift. That is why this calculator headlines the average of all seven and shows you the spread.",
  },
  {
    question: "What if I didn't go all the way to failure?",
    answer:
      "Tell the calculator how many reps you had left. Every formula assumes the set ended at failure. Stop a set of 5 with 2 in reserve and your effort was worth 7 reps. The calculator adds your reps in reserve to your completed reps before running the math, which keeps the estimate honest.",
  },
  {
    question: "How many reps should I use for the best estimate?",
    answer:
      "Two to five. Accuracy is highest at low reps and softens past about ten, where muscular endurance starts to matter more than maximal strength. A heavy set of 3 to 5 taken close to failure gives the tightest estimate.",
  },
  {
    question: "How do I use the load chart?",
    answer:
      "Each row shows the weight you could lift for exactly that many reps, based on your estimated max. Programs written in percentages translate straight off the chart: 3 sets of 3 at 90% becomes a plate-loaded number. These rows are all-out efforts, so everyday working sets should sit a little below the chart value.",
  },
  {
    question: "Should I just test my real 1RM instead?",
    answer:
      "An estimate is safer and nearly as useful for most lifters. A true test needs a thorough warm-up, a spotter or safety bars, and experience bailing on a missed rep. Powerlifters peaking for a meet test under those conditions. Everyone else does fine estimating from a heavy set of 3 to 5 and re-checking every few weeks.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "1RM Calculator",
  url: "https://forgetrainer.ai/tools/1rm-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free one-rep max calculator using seven published formulas with reps-in-reserve support and a full load-per-rep chart.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState("225");
  const [reps, setReps] = useState(5);
  const [rir, setRir] = useState(0);
  const [unit, setUnit] = useState<Unit>("lb");

  const w = parseFloat(weight) || 0;
  const effectiveReps = reps + rir;
  const valid = w > 0 && effectiveReps >= 1 && effectiveReps <= 30;

  const estimates = valid
    ? effectiveReps === 1
      ? FORMULAS.map((f) => ({ name: f.name, note: f.note, value: w }))
      : FORMULAS.map((f) => ({ name: f.name, note: f.note, value: f.calc(w, effectiveReps) }))
    : [];
  const average = estimates.length
    ? estimates.reduce((s, e) => s + e.value, 0) / estimates.length
    : 0;
  const low = estimates.length ? Math.min(...estimates.map((e) => e.value)) : 0;
  const high = estimates.length ? Math.max(...estimates.map((e) => e.value)) : 0;

  const round = (n: number) => Math.round(n * 2) / 2;
  const fmt = (n: number) =>
    n % 1 === 0 ? n.toString() : n.toFixed(1);

  const convert = (n: number) => (unit === "lb" ? n / 2.20462 : n * 2.20462);

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
          { name: "1RM Calculator", url: "https://forgetrainer.ai/tools/1rm-calculator" },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        <ToolHero
          titleBefore="1RM"
          titleAccent="Calculator"
          description="Estimate your one-rep max from any set. Enter the weight, the reps, and how close to failure you went. See your max across seven proven formulas plus the right load for every rep count."
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

                {/* Weight */}
                <div className="mb-7">
                  <label
                    htmlFor="weight"
                    className="block font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3"
                  >
                    Weight lifted ({unit})
                  </label>
                  <input
                    id="weight"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Reps */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Reps completed
                  </legend>
                  <div className="grid grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25].map((n) => (
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

                {/* RIR */}
                <fieldset>
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    How close to failure?
                  </legend>
                  <div className="grid grid-cols-5 gap-2">
                    {RIR_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setRir(opt.value)}
                        aria-pressed={rir === opt.value}
                        className={`py-2.5 px-1 rounded-[10px] border text-center transition-colors ${
                          rir === opt.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        <span className="block font-barlow-condensed font-bold text-sm leading-tight">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-text-tertiary font-barlow mt-3 leading-relaxed">
                    Every formula assumes the set ended at failure. If you
                    stopped with reps in the tank, we add them back first.{" "}
                    {rir > 0 && valid && (
                      <>
                        Your {reps} reps with {rir} left counts as a{" "}
                        <strong className="text-foreground">{effectiveReps}-rep</strong> effort.
                      </>
                    )}
                  </p>
                </fieldset>
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your estimated one-rep max
                </p>

                {valid ? (
                  <>
                    <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                      <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                        {fmt(round(average))}
                      </span>
                      <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                        {unit} · average of 7 formulas
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow mt-1">
                        {fmt(round(convert(round(average))))} {unit === "lb" ? "kg" : "lb"} ·
                        spread {fmt(round(low))} to {fmt(round(high))} {unit}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {estimates.map((e) => (
                        <div
                          key={e.name}
                          className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle"
                        >
                          <div>
                            <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                              {e.name}
                            </span>
                            <span className="hidden sm:inline text-xs text-text-tertiary font-barlow ml-2">
                              {e.note}
                            </span>
                          </div>
                          <span className="font-barlow-condensed text-lg font-bold text-foreground">
                            {fmt(round(e.value))} {unit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-5 h-5 text-primary" aria-hidden="true" />
                        <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                          Read the spread
                        </span>
                      </div>
                      <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                        {high - low <= average * 0.05
                          ? "The formulas agree tightly, so you can trust this number. Log it and train off it."
                          : "The formulas disagree, which happens at higher reps. Re-test with a heavier set of 3 to 5 for a tighter answer."}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-barlow text-text-secondary">
                    Enter a weight and pick your reps to see your estimated max.
                  </p>
                )}
              </div>
            </div>

            {/* Load chart */}
            {valid && (
              <div className="max-w-5xl mx-auto mt-6 p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                <h2 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-2">
                  Load for every rep count
                </h2>
                <p className="text-sm text-text-tertiary font-barlow mb-5 leading-relaxed">
                  All-out efforts based on your estimated max of {fmt(round(average))} {unit}.
                  Everyday working sets should sit a little under these numbers.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {REP_TABLE.map((row) => (
                    <div
                      key={row.reps}
                      className={`text-center p-3 rounded-[10px] border ${
                        row.reps === 1
                          ? "border-primary/40 bg-primary/10"
                          : "border-border-subtle bg-surface-1"
                      }`}
                    >
                      <span className="block font-barlow-condensed text-xl font-black text-foreground">
                        {fmt(round((average * row.pct) / 100))}
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow uppercase tracking-wide mt-1">
                        {row.reps} rep{row.reps > 1 ? "s" : ""} · {row.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: seven published rep-to-max equations (Epley, Brzycki,
              Lander, Lombardi, Mayhew, O&apos;Conner, Wathen), computed exactly as
              written. The headline is the arithmetic mean and the spread runs
              from lowest to highest. A genuine single counts as a tested max.
              The load chart inverts the consensus reps-to-percentage
              relationship. Estimates hold best for compound barbell lifts in
              the 2 to 10 rep range. This is a planning tool. Never attempt a
              true max without a warm-up, a spotter or safety bars, and the
              experience to bail on a missed rep.
            </p>
          </div>
        </section>

        <ToolSection heading="Why we ask about" accent="reps in reserve">
          <p>
            Most online calculators silently assume every set went to absolute
            failure. Almost nobody trains that way. Stop a set with two reps
            left and those unused reps are real strength the formula never
            sees, so the estimate comes out low.
          </p>
          <p>
            The fix is simple arithmetic. Five reps with two left becomes a
            seven-rep effort before any formula runs. With Epley, 100 kg for 5
            to failure estimates 116.7 kg. The same 100 kg for 5 with two in
            reserve estimates 123.3 kg. Same set on paper, different max, and
            the second number sits closer to the truth if you honestly had two
            left.
          </p>
        </ToolSection>

        <ToolSection heading="How accurate is" accent="the estimate?">
          <p>
            Good within its limits. Low reps win: prediction is strongest from
            sets of 5 and fades as you move toward 10 and beyond, where
            endurance starts to dominate the set. Use a heavy set of 2 to 5
            when you can.
          </p>
          <p>
            The exercise matters more than the formula. These equations were
            built on squat, bench, and deadlift data, so treat the number as
            well calibrated for the big barbell lifts and rougher on machines
            and isolation work. An estimate can also track your strength
            faithfully over time while sitting a little high or low in absolute
            terms, especially on deadlift.
          </p>
        </ToolSection>

        <FAQSection
          title="One-Rep Max Questions"
          subtitle="Common questions about estimating and using your 1RM"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="1rm-calculator" />

        <ToolCTA
          headline="The app tracks this"
          headlineAccent="for you."
          subline="Forge logs every set, estimates your maxes as you go, and sets the next weight target before you touch the bar."
          utmContent="1rm-calculator"
        />
      </main>
    </div>
  );
}
