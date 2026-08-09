"use client";

import { useState } from "react";
import { Dumbbell } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import {
  ToolHero,
  ToolSection,
  ToolCTA,
  RelatedTools,
} from "@/components/tools/ToolParts";

type Unit = "lb" | "kg";
type Sex = "male" | "female";
type Method = "bodyfat" | "formulas";

const faqs = [
  {
    question: "What is lean body mass?",
    answer:
      "Your weight with the fat removed. Muscle makes up most of it, along with bone, organs, water, and skin. When lifters talk about getting bigger, lean body mass is the number they mean. Scale weight alone hides how much of you is working tissue.",
  },
  {
    question: "Which formula should I trust?",
    answer:
      "Boer is the most cited in clinical work and holds up well across body types. Hume lands close for most people. James was derived at moderate body fat levels and drifts when body fat runs high. This calculator averages all three, which smooths out the weakest assumptions of each one.",
  },
  {
    question: "What is FFMI?",
    answer:
      "The fat-free mass index divides your lean mass in kilograms by your height in meters squared, so tall and short lifters can compare muscle mass fairly. A 1995 study of elite bodybuilders put 25 as the rough ceiling for drug-free men, with most trained men landing between 18 and 20. The normalized version adjusts the score for heights far from 1.8 meters.",
  },
  {
    question: "Why does my lean mass drop when I diet?",
    answer:
      "Some of that drop is water and glycogen leaving the muscles, and it comes back when you eat more. Real muscle loss happens when the deficit runs steep or protein runs low. Keeping protein high and training hard through a cut holds onto most of your lean mass.",
  },
  {
    question: "How do I increase lean body mass?",
    answer:
      "Progressive overload with enough protein to support it. Most lifters add lean mass slowly after the beginner phase, a few pounds a year with consistent training. Programs that raise the weight or the reps week after week are what drive the gain.",
  },
  {
    question: "Is lean body mass the same as muscle mass?",
    answer:
      "Muscle is the largest piece of lean body mass, sitting alongside bone, organs, and water. Skeletal muscle alone usually runs around half of total lean mass. When a formula estimates lean body mass, only part of the answer is contractile muscle tissue.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lean Body Mass Calculator",
  url: "https://forgetrainer.ai/tools/lean-body-mass-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free lean body mass calculator. Estimate LBM from body fat percentage or with the Boer, Hume, and James formulas, plus fat mass and FFMI.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

export default function LeanBodyMassCalculator() {
  const [unit, setUnit] = useState<Unit>("lb");
  const [method, setMethod] = useState<Method>("bodyfat");
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState("180");
  const [height, setHeight] = useState("70");
  const [bodyFat, setBodyFat] = useState("18");

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const bfPct = parseFloat(bodyFat) || 0;

  const weightLabel = unit === "lb" ? "lb" : "kg";
  const lengthLabel = unit === "lb" ? "in" : "cm";
  const weightKg = unit === "lb" ? w / 2.20462 : w;
  const heightCm = unit === "lb" ? h * 2.54 : h;
  const heightM = heightCm / 100;
  const fromKg = (kg: number) => (unit === "lb" ? kg * 2.20462 : kg);
  const fmt1 = (n: number) => n.toFixed(1);

  let error = "";
  if (w <= 0) error = "Enter your body weight.";
  else if (h <= 0) error = "Enter your height. Your FFMI needs it.";
  else if (method === "bodyfat" && (bfPct < 2 || bfPct > 60)) {
    error = "Body fat percentage usually sits between 2 and 60. Check your entry.";
  }

  const boer =
    sex === "male"
      ? 0.407 * weightKg + 0.267 * heightCm - 19.2
      : 0.252 * weightKg + 0.473 * heightCm - 48.3;
  const hume =
    sex === "male"
      ? 0.3281 * weightKg + 0.33929 * heightCm - 29.5336
      : 0.29569 * weightKg + 0.41813 * heightCm - 43.2933;
  const james =
    sex === "male"
      ? 1.1 * weightKg - 128 * Math.pow(weightKg / heightCm, 2)
      : 1.07 * weightKg - 148 * Math.pow(weightKg / heightCm, 2);
  const formulaAvg = (boer + hume + james) / 3;

  const lbmKg = method === "bodyfat" ? weightKg * (1 - bfPct / 100) : formulaAvg;

  if (!error && (lbmKg <= 0 || lbmKg >= weightKg)) {
    error =
      "These numbers give an impossible result. Check your weight, height, and body fat entries.";
  }

  const fatKg = weightKg - lbmKg;
  const ffmi = heightM > 0 ? lbmKg / (heightM * heightM) : 0;
  const normFfmi = ffmi + 6.1 * (1.8 - heightM);

  const ffmiContext =
    ffmi < 18
      ? "This range covers most untrained and lightly trained builds. Consistent lifting moves it."
      : ffmi < 20
      ? "Typical for a man with real training time behind him. Most gym regulars land here."
      : ffmi < 22
      ? "Well past the average lifter. This much lean mass takes years of consistent training."
      : ffmi < 25
      ? "Advanced territory, near the range elite natural bodybuilders measured in studies."
      : "Above 25, the ceiling often cited for drug-free athletes. Check your inputs, especially body fat.";

  const inputClass =
    "w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors";
  const labelClass =
    "block font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3";
  const legendClass =
    "font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3";
  const segBtn = (active: boolean) =>
    `flex-1 py-3 rounded-[10px] border font-barlow-condensed font-bold text-lg uppercase transition-colors ${
      active
        ? "border-primary bg-primary/10 text-primary"
        : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
          { name: "Lean Body Mass Calculator", url: "https://forgetrainer.ai/tools/lean-body-mass-calculator" },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        <ToolHero
          titleBefore="Lean Body Mass"
          titleAccent="Calculator"
          description="Find your lean body mass from your body fat percentage, or estimate it with the Boer, Hume, and James formulas. See your fat mass and FFMI with honest context."
        />

        {/* Calculator */}
        <section className="py-10 md:py-14 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                {/* Method toggle */}
                <fieldset className="mb-7">
                  <legend className={legendClass}>Method</legend>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMethod("bodyfat")}
                      aria-pressed={method === "bodyfat"}
                      className={segBtn(method === "bodyfat")}
                    >
                      From body fat
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("formulas")}
                      aria-pressed={method === "formulas"}
                      className={segBtn(method === "formulas")}
                    >
                      From formulas
                    </button>
                  </div>
                </fieldset>

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
                        className={segBtn(unit === u)}
                      >
                        {u === "lb" ? "lb / in" : "kg / cm"}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Weight */}
                <div className="mb-7">
                  <label htmlFor="lbm-weight" className={labelClass}>
                    Body weight ({weightLabel})
                  </label>
                  <input
                    id="lbm-weight"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Height */}
                <div className="mb-7">
                  <label htmlFor="lbm-height" className={labelClass}>
                    Height ({lengthLabel})
                  </label>
                  <input
                    id="lbm-height"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-xs text-text-tertiary font-barlow mt-2 leading-relaxed">
                    Used for the formulas and your FFMI.
                  </p>
                </div>

                {method === "bodyfat" ? (
                  /* Body fat */
                  <div>
                    <label htmlFor="lbm-bf" className={labelClass}>
                      Body fat percentage (%)
                    </label>
                    <input
                      id="lbm-bf"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={bodyFat}
                      onChange={(e) => setBodyFat(e.target.value)}
                      className={inputClass}
                    />
                    <p className="text-xs text-text-tertiary font-barlow mt-2 leading-relaxed">
                      No number handy? Run our body fat calculator first, or
                      switch to the formula method.
                    </p>
                  </div>
                ) : (
                  /* Sex */
                  <fieldset>
                    <legend className={legendClass}>Sex</legend>
                    <div className="flex gap-2">
                      {(["male", "female"] as Sex[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSex(s)}
                          aria-pressed={sex === s}
                          className={segBtn(sex === s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your lean body mass
                </p>

                {!error ? (
                  <>
                    <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                      <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                        {fmt1(fromKg(lbmKg))}
                      </span>
                      <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                        {weightLabel} of lean mass
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow mt-1">
                        {method === "bodyfat"
                          ? `weight minus ${fmt1(bfPct)}% body fat`
                          : "average of the Boer, Hume, and James formulas"}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle">
                        <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                          Fat mass
                        </span>
                        <span className="font-barlow-condensed text-lg font-bold text-foreground">
                          {fmt1(fromKg(fatKg))} {weightLabel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle">
                        <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                          FFMI
                        </span>
                        <span className="font-barlow-condensed text-lg font-bold text-foreground">
                          {fmt1(ffmi)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle">
                        <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                          Normalized FFMI
                        </span>
                        <span className="font-barlow-condensed text-lg font-bold text-foreground">
                          {fmt1(normFfmi)}
                        </span>
                      </div>
                    </div>

                    {method === "formulas" && (
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {[
                          { name: "Boer", value: boer },
                          { name: "Hume", value: hume },
                          { name: "James", value: james },
                        ].map((f) => (
                          <div
                            key={f.name}
                            className="text-center p-3 rounded-[10px] border border-border-subtle bg-surface-1"
                          >
                            <span className="block font-barlow-condensed text-lg font-black text-foreground">
                              {fmt1(fromKg(f.value))}
                            </span>
                            <span className="block text-xs text-text-tertiary font-barlow uppercase tracking-wide mt-1">
                              {f.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <Dumbbell className="w-5 h-5 text-primary" aria-hidden="true" />
                        <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                          Read your FFMI
                        </span>
                      </div>
                      <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                        {ffmiContext}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-barlow text-text-secondary">{error}</p>
                )}
              </div>
            </div>

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: the body-fat method multiplies your weight by one
              minus your body fat fraction. The formula method runs Boer,
              Hume, and James exactly as published, with weight in kilograms
              and height in centimeters, and averages the three. FFMI divides
              lean mass in kilograms by height in meters squared. The
              normalized score adds 6.1 times the difference between 1.8
              meters and your height. James was derived at moderate body fat
              levels and drifts when body fat runs high. All three formulas
              were fit on general populations, so treat every output as an
              estimate and use your own trend over time for decisions.
            </p>
          </div>
        </section>

        <ToolSection heading="What lean body mass" accent="counts">
          <p>
            Lean body mass is your weight with the fat removed. Muscle makes
            up most of it, alongside bone, organs, water, and skin. When
            lifters say they want to get bigger, this is the number they mean.
          </p>
          <p>
            The figure also sets the floor for your metabolism and shows how
            much working tissue you carry. Two people at 180 lb with different
            body fat percentages hold different amounts of muscle and different
            FFMI scores. Scale weight alone hides all of that.
          </p>
        </ToolSection>

        <ToolSection heading="FFMI, with" accent="honest context">
          <p>
            The fat-free mass index divides lean mass by height squared, so
            tall and short lifters can compare muscle mass fairly. A 1995
            study of elite male bodybuilders put 25 as the rough ceiling for
            drug-free athletes. Most trained men land between 18 and 20.
          </p>
          <p>
            The normalized version adjusts for heights far from 1.8 meters.
            Read both scores as estimates built on population data. A reading
            near 22 with years of consistent training behind it is a serious
            amount of muscle, whatever the ceiling debate says.
          </p>
        </ToolSection>

        <FAQSection
          title="Lean Body Mass Questions"
          subtitle="Common questions about lean mass, formulas, and FFMI"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="lean-body-mass-calculator" />

        <ToolCTA
          headline="Put that mass"
          headlineAccent="to work."
          subline="Forge programs your training, adapts the plan as you log, and keeps your PR history in one place. Try it free for 7 days."
          utmContent="lean-body-mass-calculator"
        />
      </main>
    </div>
  );
}
