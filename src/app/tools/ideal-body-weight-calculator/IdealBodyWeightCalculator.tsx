"use client";

import { useState } from "react";
import Link from "next/link";
import { Ruler } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import {
  ToolHero,
  ToolSection,
  ToolCTA,
  RelatedTools,
} from "@/components/tools/ToolParts";

type Sex = "men" | "women";
type HeightUnit = "ftin" | "cm";

const FORMULAS: {
  name: string;
  year: string;
  calc: (sex: Sex, inchesOver5Ft: number) => number;
}[] = [
  { name: "Devine", year: "1974", calc: (s, i) => (s === "men" ? 50 : 45.5) + 2.3 * i },
  { name: "Robinson", year: "1983", calc: (s, i) => (s === "men" ? 52 : 49) + (s === "men" ? 1.9 : 1.7) * i },
  { name: "Miller", year: "1983", calc: (s, i) => (s === "men" ? 56.2 : 53.1) + (s === "men" ? 1.41 : 1.36) * i },
  { name: "Hamwi", year: "1964", calc: (s, i) => (s === "men" ? 48 : 45.5) + (s === "men" ? 2.7 : 2.2) * i },
];

const KG_PER_LB = 2.20462;

const faqs = [
  {
    question: "What is ideal body weight?",
    answer:
      "Ideal body weight is a statistical estimate of a typical weight for your height and sex. The four formulas here were published between 1964 and 1983, each fitting a simple line to a reference population. They answer one narrow question: what does an average, mostly untrained adult of your height tend to weigh.",
  },
  {
    question: "Which formula should I trust?",
    answer:
      "None of them alone. Devine became the most cited because hospitals adopted it for medication dosing, which says more about convenience than accuracy. The four formulas usually land within a few pounds of each other, so their average is the most useful single number on this page.",
  },
  {
    question: "I lift. Why does my number look so low?",
    answer:
      "Muscle is the reason. A lifter carrying 15 to 20 lb more muscle than the reference population will sit above every formula while being leaner and healthier than the estimate assumes. These formulas see your height and sex. Your body composition never enters the math.",
  },
  {
    question: "What should I use instead?",
    answer:
      "Body composition. Our body fat calculator estimates your fat percentage from tape measurements, and the lean body mass calculator turns that into the weight of your muscle, bone, and water. Those numbers respond to training. A height-based formula stays frozen while you change.",
  },
  {
    question: "Do the formulas work if I am under 5 feet tall?",
    answer:
      "They still compute, since each formula subtracts its per-inch amount below the 5-foot base. The error grows quickly down there because the original data barely covered those heights, so treat the output as a rough sketch.",
  },
  {
    question: "What about frame size?",
    answer:
      "Frame size is real. Wider wrists and ankles usually come with more bone and muscle at the same height. The classic convention adjusts the estimate by about 10 percent up for a large frame and 10 percent down for a small one, which is the range shown under the headline.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ideal Body Weight Calculator",
  url: "https://forgetrainer.ai/tools/ideal-body-weight-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free ideal body weight calculator comparing the Devine, Robinson, Miller, and Hamwi formulas side by side.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

export default function IdealBodyWeightCalculator() {
  const [sex, setSex] = useState<Sex>("men");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("ftin");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("10");
  const [cm, setCm] = useState("178");

  const feetN = parseFloat(feet) || 0;
  const inchesN = parseFloat(inches) || 0;
  const cmN = parseFloat(cm) || 0;
  const totalInches = heightUnit === "ftin" ? feetN * 12 + inchesN : cmN / 2.54;
  const inchesOver5Ft = totalInches - 60;
  const valid = totalInches >= 48 && totalInches <= 96;

  const results = valid
    ? FORMULAS.map((f) => ({ name: f.name, year: f.year, kg: f.calc(sex, inchesOver5Ft) }))
    : [];
  const averageKg = results.length
    ? results.reduce((s, r) => s + r.kg, 0) / results.length
    : 0;

  const toLb = (kg: number) => kg * KG_PER_LB;
  const round1 = (n: number) => Math.round(n * 10) / 10;

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
          {
            name: "Ideal Body Weight Calculator",
            url: "https://forgetrainer.ai/tools/ideal-body-weight-calculator",
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
          titleBefore="Ideal Body Weight"
          titleAccent="Calculator"
          description="Four classic formulas, one honest answer. Enter your height to see Devine, Robinson, Miller, and Hamwi side by side, plus their average and a frame-size range."
        />

        {/* Calculator */}
        <section className="py-10 md:py-14 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
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
                </fieldset>

                {/* Height unit toggle */}
                <fieldset className="mb-7">
                  <legend className={legendClass}>Height units</legend>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: "ftin", label: "ft + in" },
                        { value: "cm", label: "cm" },
                      ] as { value: HeightUnit; label: string }[]
                    ).map((u) => (
                      <button
                        key={u.value}
                        type="button"
                        onClick={() => setHeightUnit(u.value)}
                        aria-pressed={heightUnit === u.value}
                        className={`flex-1 py-3 rounded-[10px] border font-barlow-condensed font-bold text-lg uppercase transition-colors ${
                          heightUnit === u.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Height */}
                {heightUnit === "ftin" ? (
                  <div className="grid grid-cols-2 gap-3 mb-7">
                    <div>
                      <label htmlFor="feet" className={labelClass}>
                        Feet
                      </label>
                      <input
                        id="feet"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="inches" className={labelClass}>
                        Inches
                      </label>
                      <input
                        id="inches"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-7">
                    <label htmlFor="cm" className={labelClass}>
                      Height (cm)
                    </label>
                    <input
                      id="cm"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={cm}
                      onChange={(e) => setCm(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}

                <p className="text-xs text-text-tertiary font-barlow leading-relaxed">
                  The formulas start from a base weight at 5 feet and add a
                  fixed amount per inch above it. Heights under 5 feet still
                  compute, with less accuracy.
                </p>
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your ideal body weight
                </p>

                {valid ? (
                  <>
                    <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                      <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                        {Math.round(toLb(averageKg))}
                      </span>
                      <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                        lb · average of 4 formulas
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow mt-1">
                        {round1(averageKg)} kg · frame range {Math.round(toLb(averageKg * 0.9))} to{" "}
                        {Math.round(toLb(averageKg * 1.1))} lb
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {results.map((r) => (
                        <div
                          key={r.name}
                          className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle"
                        >
                          <div>
                            <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                              {r.name}
                            </span>
                            <span className="hidden sm:inline text-xs text-text-tertiary font-barlow ml-2">
                              {r.year}
                            </span>
                          </div>
                          <span className="font-barlow-condensed text-lg font-bold text-foreground">
                            {Math.round(toLb(r.kg))} lb · {round1(r.kg)} kg
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <Ruler className="w-5 h-5 text-primary" aria-hidden="true" />
                        <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                          Lifting changes this
                        </span>
                      </div>
                      <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                        These formulas assume an average, untrained body. If
                        you carry extra muscle, the{" "}
                        <Link
                          href="/tools/body-fat-calculator"
                          className="text-primary underline underline-offset-2"
                        >
                          body fat calculator
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/tools/lean-body-mass-calculator"
                          className="text-primary underline underline-offset-2"
                        >
                          lean body mass calculator
                        </Link>{" "}
                        will tell you far more.
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-barlow text-text-secondary">
                    Enter a height between 4 and 8 feet (122 to 244 cm) to see
                    the four formulas.
                  </p>
                )}
              </div>
            </div>

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: Devine, Robinson, Miller, and Hamwi, each computed
              exactly as published. Your height converts to inches over 5
              feet, the formulas return kilograms, and pounds convert at 1 kg
              = 2.20462 lb. The headline is the arithmetic mean of the four.
              The frame range applies the classic 10 percent adjustment up or
              down. Heights under 5 feet extrapolate below the original data.
              These formulas estimate dosing weight for average adults.
              Lifters should track body composition instead.
            </p>
          </div>
        </section>

        <ToolSection heading="Where these formulas" accent="came from">
          <p>
            Devine published his equation in 1974 to help doctors dose
            gentamicin, an antibiotic where the wrong weight estimate meant
            the wrong dose. Hospitals needed a fast way to get a weight from a
            height chart, and the formula spread through medical protocols
            from there. Robinson, Miller, and Hamwi each refit the same idea
            on their own data over the following decade.
          </p>
          <p>
            That origin explains the shape. Every formula is a base weight at
            5 feet plus a fixed number of kilograms per inch. The reference
            populations were average adults, and the design goal was dosing
            safety. Physique had no seat at the table.
          </p>
        </ToolSection>

        <ToolSection heading="Why lifters outgrow" accent="the number">
          <p>
            A few years of serious training adds 15 to 20 lb of muscle for
            many men, and a meaningful share of that for women. The formulas
            have no term for muscle. They will happily tell a lean, strong
            lifter to lose weight.
          </p>
          <p>
            If you train, anchor on composition instead. Measure your waist,
            run the body fat calculator, and track your lean mass over time.
            Those numbers move when your training works, which a height chart
            can never show you.
          </p>
        </ToolSection>

        <FAQSection
          title="Ideal Body Weight Questions"
          subtitle="Common questions about the classic formulas and their limits"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="ideal-body-weight-calculator" />

        <ToolCTA
          headline="Train for a number"
          headlineAccent="that moves."
          subline="Forge logs your sets, tracks your PRs, and adapts your plan as you get stronger. Start with a 7-day free trial."
          utmContent="ideal-body-weight-calculator"
        />
      </main>
    </div>
  );
}
