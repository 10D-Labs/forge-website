"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import {
  ToolHero,
  ToolSection,
  ToolCTA,
  RelatedTools,
} from "@/components/tools/ToolParts";

type Unit = "lb" | "kg";
type Sex = "men" | "women";
type Mode = "total" | "sbd";

type Coef = { a: number; b: number; c: number; d: number; e: number; f: number };

const ORIGINAL_WILKS: Record<Sex, Coef> = {
  men: {
    a: -216.0475144,
    b: 16.2606339,
    c: -0.002388645,
    d: -0.00113732,
    e: 0.00000701863,
    f: -0.00000001291,
  },
  women: {
    a: 594.31747775582,
    b: -27.23842536447,
    c: 0.82112226871,
    d: -0.00930733913,
    e: 0.00004731582,
    f: -0.00000009054,
  },
};

const WILKS_2020: Record<Sex, Coef> = {
  men: {
    a: 47.4617885411949,
    b: 8.47206137941125,
    c: 0.0736941034626099,
    d: -0.00139583381094385,
    e: 0.00000707665973070743,
    f: -0.0000000120804336482315,
  },
  women: {
    a: -125.425539779509,
    b: 13.7121941940668,
    c: -0.0330725063103409,
    d: -0.0010504000506583,
    e: 0.00000938773881462799,
    f: -0.000000023334613884954,
  },
};

function wilksScore(totalKg: number, bwKg: number, coef: Coef, multiplier: number) {
  const x = bwKg;
  const denom =
    coef.a +
    coef.b * x +
    coef.c * x ** 2 +
    coef.d * x ** 3 +
    coef.e * x ** 4 +
    coef.f * x ** 5;
  if (denom <= 0) return null;
  return (totalKg * multiplier) / denom;
}

const faqs = [
  {
    question: "What is a Wilks score?",
    answer:
      "A Wilks score converts your powerlifting total into a number you can compare across bodyweights. A 70 kg lifter and a 120 kg lifter post very different totals, and raw numbers say little about who is stronger for their size. The formula scales your total by a bodyweight-based coefficient so both lifters land on the same scale.",
  },
  {
    question: "Why are there two Wilks formulas?",
    answer:
      "The original coefficients were published in the 1990s using the meet data available at the time. The IPF commissioned an update fit on modern competition results, and the 2020 version replaced the original because it treats extremely light and heavy bodyweights more fairly. This calculator shows both so you can compare against older posts and meet recaps.",
  },
  {
    question: "Which score should I use?",
    answer:
      "Use the 2020 score for anything current. That is the version the IPF adopted. The original still floats around old forum threads and archived results, so it helps to know both numbers when you read them.",
  },
  {
    question: "Can I run it for a single lift?",
    answer:
      "You can enter only a bench press or only a deadlift and the math will run. The score was designed around full power totals, though, and single-lift scores are harder to interpret because so few published comparisons exist.",
  },
  {
    question: "What is a good Wilks score?",
    answer:
      "Rough guides for the original formula put a typical gym lifter under 300, a competitive local lifter in the low 300s, and national-level lifters above 400. The 2020 version sits on a different scale, so compare within one version at a time. Drug testing, equipment, and age all shift what a good score looks like, so treat the bands as loose orientation.",
  },
  {
    question: "How does Wilks compare to DOTS?",
    answer:
      "Both convert a total into a pound-for-pound score. DOTS is newer, draws on a larger modern dataset, and many federations outside the IPF have adopted it. Our DOTS calculator runs the same inputs if you want both numbers.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Wilks Calculator",
  url: "https://forgetrainer.ai/tools/wilks-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free Wilks calculator showing the original and 2020 formulas side by side from your bodyweight and powerlifting total.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

export default function WilksCalculator() {
  const [unit, setUnit] = useState<Unit>("lb");
  const [sex, setSex] = useState<Sex>("men");
  const [mode, setMode] = useState<Mode>("total");
  const [bodyweight, setBodyweight] = useState("180");
  const [total, setTotal] = useState("1000");
  const [squat, setSquat] = useState("365");
  const [bench, setBench] = useState("245");
  const [deadlift, setDeadlift] = useState("405");

  const toKg = (v: number) => (unit === "lb" ? v / 2.20462 : v);
  const otherUnit = (v: number) => (unit === "lb" ? v / 2.20462 : v * 2.20462);

  const bwInput = parseFloat(bodyweight) || 0;
  const bwKg = toKg(bwInput);
  const squatN = parseFloat(squat) || 0;
  const benchN = parseFloat(bench) || 0;
  const deadliftN = parseFloat(deadlift) || 0;
  const totalInUnit = mode === "total" ? parseFloat(total) || 0 : squatN + benchN + deadliftN;
  const totalKg = toKg(totalInUnit);

  const bwInRange = bwKg >= 40 && bwKg <= 205;
  const valid = bwInRange && totalKg > 0;

  const original = valid ? wilksScore(totalKg, bwKg, ORIGINAL_WILKS[sex], 500) : null;
  const updated = valid ? wilksScore(totalKg, bwKg, WILKS_2020[sex], 600) : null;

  const inputClass =
    "w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors";
  const labelClass =
    "block font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3";
  const legendClass =
    "font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3";

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
          { name: "Wilks Calculator", url: "https://forgetrainer.ai/tools/wilks-calculator" },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        <ToolHero
          titleBefore="Wilks"
          titleAccent="Calculator"
          description="The classic pound-for-pound score for powerlifters. Enter your bodyweight and your total to see the original Wilks score and the 2020 update side by side."
        />

        {/* Calculator */}
        <section className="py-10 md:py-14 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                {/* Unit toggle */}
                <fieldset className="mb-7">
                  <legend className={legendClass}>Units</legend>
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

                {/* Sex toggle */}
                <fieldset className="mb-7">
                  <legend className={legendClass}>Sex</legend>
                  <div className="flex gap-2">
                    {(["men", "women"] as Sex[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSex(s)}
                        aria-pressed={sex === s}
                        className={`flex-1 py-3 rounded-[10px] border font-barlow-condensed font-bold text-lg uppercase transition-colors ${
                          sex === s
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-text-tertiary font-barlow mt-3 leading-relaxed">
                    Each sex has its own published coefficients.
                  </p>
                </fieldset>

                {/* Bodyweight */}
                <div className="mb-7">
                  <label htmlFor="bodyweight" className={labelClass}>
                    Bodyweight ({unit})
                  </label>
                  <input
                    id="bodyweight"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={bodyweight}
                    onChange={(e) => setBodyweight(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Mode toggle */}
                <fieldset className="mb-7">
                  <legend className={legendClass}>Enter</legend>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: "total", label: "My total" },
                        { value: "sbd", label: "Squat + bench + deadlift" },
                      ] as { value: Mode; label: string }[]
                    ).map((m) => (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => setMode(m.value)}
                        aria-pressed={mode === m.value}
                        className={`flex-1 py-3 px-2 rounded-[10px] border font-barlow-condensed font-bold text-lg uppercase transition-colors ${
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

                {mode === "total" ? (
                  <div>
                    <label htmlFor="total" className={labelClass}>
                      Powerlifting total ({unit})
                    </label>
                    <input
                      id="total"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="squat" className={labelClass}>
                        Squat
                      </label>
                      <input
                        id="squat"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        value={squat}
                        onChange={(e) => setSquat(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="bench" className={labelClass}>
                        Bench
                      </label>
                      <input
                        id="bench"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        value={bench}
                        onChange={(e) => setBench(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="deadlift" className={labelClass}>
                        Deadlift
                      </label>
                      <input
                        id="deadlift"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        value={deadlift}
                        onChange={(e) => setDeadlift(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your Wilks scores
                </p>

                {valid && original !== null && updated !== null ? (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-border-subtle">
                        <span className="block font-barlow-condensed text-4xl md:text-5xl font-black text-foreground">
                          {original.toFixed(2)}
                        </span>
                        <span className="block text-xs text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                          Original Wilks
                        </span>
                      </div>
                      <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30">
                        <span className="block font-barlow-condensed text-4xl md:text-5xl font-black text-primary">
                          {updated.toFixed(2)}
                        </span>
                        <span className="block text-xs text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                          Wilks 2020 · current standard
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle">
                        <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                          Total
                        </span>
                        <span className="font-barlow-condensed text-lg font-bold text-foreground">
                          {Math.round(totalInUnit)} {unit} · {Math.round(otherUnit(totalInUnit))}{" "}
                          {unit === "lb" ? "kg" : "lb"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle">
                        <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                          Bodyweight
                        </span>
                        <span className="font-barlow-condensed text-lg font-bold text-foreground">
                          {Math.round(bwInput)} {unit} · {Math.round(otherUnit(bwInput))}{" "}
                          {unit === "lb" ? "kg" : "lb"}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-primary" aria-hidden="true" />
                        <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                          Why two scores
                        </span>
                      </div>
                      <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                        The IPF adopted the 2020 version because the original
                        formula scored lifters at the light and heavy extremes
                        of the bodyweight range unfairly.
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-barlow text-text-secondary">
                    {bwInput > 0 && !bwInRange
                      ? "The Wilks curve is calibrated for bodyweights between roughly 40 and 205 kg. Your entry falls outside that range, so the score would be an unreliable extrapolation."
                      : "Enter your bodyweight and total to see both Wilks scores."}
                  </p>
                )}
              </div>
            </div>

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: original Wilks score equals total in kg times 500,
              divided by a fifth-degree polynomial of bodyweight in kg using
              the published coefficients for each sex. The 2020 revision keeps
              the same shape, swaps in newly fit coefficients, and multiplies
              by 600. Pounds convert at 1 kg = 2.20462 lb before any math
              runs. Bodyweights outside roughly 40 to 205 kg extrapolate the
              fitted curve, and scores there can misbehave. A Wilks score
              compares totals at one point in time. It says nothing about what
              you will lift next year.
            </p>
          </div>
        </section>

        <ToolSection heading="How the formula" accent="scores strength">
          <p>
            Your bodyweight feeds into a fifth-degree polynomial built from
            competition results. That polynomial produces a coefficient, and
            your total gets scaled by it. Lighter lifters receive a bigger
            multiplier, which credits them for moving more weight relative to
            their size.
          </p>
          <p>
            The curve was fit on real meet totals across the weight classes.
            That grounding in actual results is why the score holds up well
            inside the normal range of powerlifting bodyweights. Step outside
            the fitted range and the polynomial extrapolates, which can spit
            out scores that make little sense.
          </p>
        </ToolSection>

        <ToolSection heading="Why the IPF" accent="updated it">
          <p>
            The original coefficients came from data collected decades ago,
            and the lifting population changed. Lifters at the extremes of the
            bodyweight range kept landing scores that felt off next to the
            middle classes. The 2020 revision refit the same polynomial shape
            on modern results and raised the multiplier from 500 to 600.
          </p>
          <p>
            Every pound-for-pound system compresses a lot of information into
            one number. Use the score to place yourself among lifters your
            size, then get back to adding weight to the bar. That part of the
            job belongs to training, and the formula has no opinion on it.
          </p>
        </ToolSection>

        <FAQSection
          title="Wilks Score Questions"
          subtitle="Common questions about the Wilks formula and what your score means"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="wilks-calculator" />

        <ToolCTA
          headline="Your total grows"
          headlineAccent="one set at a time."
          subline="Forge builds your plan, logs every set, and tracks your PRs so the next total takes care of itself."
          utmContent="wilks-calculator"
        />
      </main>
    </div>
  );
}
