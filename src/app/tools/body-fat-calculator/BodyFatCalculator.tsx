"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";
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
type Method = "navy" | "quick";

interface Band {
  label: string;
  range: string;
  min: number;
  max: number;
}

const BANDS: Record<Sex, Band[]> = {
  male: [
    { label: "Essential fat", range: "2-5%", min: 2, max: 5 },
    { label: "Athletes", range: "6-13%", min: 5, max: 13 },
    { label: "Fitness", range: "14-17%", min: 13, max: 17 },
    { label: "Average", range: "18-24%", min: 17, max: 24 },
    { label: "Above average", range: "25%+", min: 24, max: 50 },
  ],
  female: [
    { label: "Essential fat", range: "10-13%", min: 10, max: 13 },
    { label: "Athletes", range: "14-20%", min: 13, max: 20 },
    { label: "Fitness", range: "21-24%", min: 20, max: 24 },
    { label: "Average", range: "25-31%", min: 24, max: 31 },
    { label: "Above average", range: "32%+", min: 31, max: 50 },
  ],
};

const BAND_SCALE = 50;

const faqs = [
  {
    question: "How accurate is the Navy tape method?",
    answer:
      "Within three to four percentage points of a DEXA scan for most people, as long as the tape work is careful. Tape placement is the main source of error. Measure at the same spots, under the same conditions, and the method tracks change well even when the absolute number sits a little high or low.",
  },
  {
    question: "Where exactly do I put the tape?",
    answer:
      "Men measure the waist horizontally at the navel and the neck just below the larynx. Women measure the waist at the narrowest point of the torso, the neck the same way, and the hips at the widest point. Keep the tape level and snug without digging in, and breathe out normally before reading it.",
  },
  {
    question: "Why does the quick estimate ask for my age?",
    answer:
      "The formula behind it, published by Deurenberg and colleagues, found that people carry more fat at the same BMI as they get older. Age corrects for that drift. The estimate is still rough, because BMI alone cannot see muscle. A muscular lifter will read high on BMI and get a body fat estimate that overshoots.",
  },
  {
    question: "What is a healthy body fat percentage?",
    answer:
      "The ACE chart puts the average band at 18 to 24 percent for men and 25 to 31 percent for women, with the fitness band a step below that. Essential fat, 2 to 5 percent for men and 10 to 13 for women, is the floor the body needs to function. Sitting at the essential floor year round comes with real hormonal costs, so treat it as a competition phase rather than a target.",
  },
  {
    question: "Which method should I use?",
    answer:
      "The Navy method, if you own a tape measure. It tracks your actual shape instead of inferring fat from height and weight. The quick estimate works for a rough figure when you have nothing to measure with. Whichever you pick, stay with it. Switching methods midway makes the trend impossible to read.",
  },
  {
    question: "How often should I re-measure?",
    answer:
      "Every two to four weeks. Fat loss for most people runs slow enough that weekly readings mostly show measurement noise. Measure in the morning before eating, at the same spots each time, and take each measurement twice to catch tape slips.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Body Fat Calculator",
  url: "https://forgetrainer.ai/tools/body-fat-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free body fat calculator with the US Navy tape method and a BMI-based quick estimate. Shows body fat percentage, fat mass, lean mass, and ACE category.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

export default function BodyFatCalculator() {
  const [unit, setUnit] = useState<Unit>("lb");
  const [method, setMethod] = useState<Method>("navy");
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState("70");
  const [weight, setWeight] = useState("180");
  const [waist, setWaist] = useState("34");
  const [neck, setNeck] = useState("15");
  const [hip, setHip] = useState("38");
  const [age, setAge] = useState("30");

  const h = parseFloat(height) || 0;
  const w = parseFloat(weight) || 0;
  const wa = parseFloat(waist) || 0;
  const nk = parseFloat(neck) || 0;
  const hp = parseFloat(hip) || 0;
  const a = parseFloat(age) || 0;

  const lengthLabel = unit === "lb" ? "in" : "cm";
  const weightLabel = unit === "lb" ? "lb" : "kg";
  const toIn = (v: number) => (unit === "lb" ? v : v / 2.54);
  const weightKg = unit === "lb" ? w / 2.20462 : w;
  const heightM = unit === "lb" ? (h * 2.54) / 100 : h / 100;
  const fromKg = (kg: number) => (unit === "lb" ? kg * 2.20462 : kg);

  let bf = 0;
  let error = "";

  if (method === "navy") {
    const hIn = toIn(h);
    const waIn = toIn(wa);
    const nkIn = toIn(nk);
    const hpIn = toIn(hp);
    if (hIn <= 0 || waIn <= 0 || nkIn <= 0) {
      error = "Enter your height, waist, and neck measurements.";
    } else if (sex === "female" && hpIn <= 0) {
      error = "Enter your hip measurement.";
    } else {
      const diff = sex === "male" ? waIn - nkIn : waIn + hpIn - nkIn;
      if (diff <= 0) {
        error =
          "These measurements cannot produce a result. Your waist needs to measure larger than your neck.";
      } else {
        bf =
          sex === "male"
            ? 86.01 * Math.log10(diff) - 70.041 * Math.log10(hIn) + 36.76
            : 163.205 * Math.log10(diff) - 97.684 * Math.log10(hIn) - 78.387;
      }
    }
  } else {
    if (h <= 0 || a <= 0) {
      error = "Enter your height and age.";
    } else {
      const bmi = weightKg / (heightM * heightM);
      bf = 1.2 * bmi + 0.23 * a - 10.8 * (sex === "male" ? 1 : 0) - 5.4;
    }
  }

  if (!error && w <= 0) {
    error = "Enter your body weight to see fat mass and lean mass.";
  } else if (!error && (bf < 2 || bf > 60)) {
    error =
      "These numbers land outside any plausible range. Double-check each entry.";
  }

  const fatMassKg = weightKg * (bf / 100);
  const leanMassKg = weightKg - fatMassKg;
  const bands = BANDS[sex];
  const bandIndex = bands.findIndex((b) => bf <= b.max);
  const currentBand = bandIndex >= 0 ? bands[bandIndex] : null;
  const markerPct = Math.min(Math.max(bf / BAND_SCALE, 0), 1) * 100;
  const fmt1 = (n: number) => n.toFixed(1);

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
          { name: "Body Fat Calculator", url: "https://forgetrainer.ai/tools/body-fat-calculator" },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        <ToolHero
          titleBefore="Body Fat"
          titleAccent="Calculator"
          description="Estimate your body fat percentage with a tape measure and the US Navy method, or run a quick estimate from height, weight, and age. See fat mass, lean mass, and where you land on the ACE chart."
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
                      onClick={() => setMethod("navy")}
                      aria-pressed={method === "navy"}
                      className={segBtn(method === "navy")}
                    >
                      Navy tape
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("quick")}
                      aria-pressed={method === "quick"}
                      className={segBtn(method === "quick")}
                    >
                      Quick estimate
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

                {/* Sex */}
                <fieldset className="mb-7">
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

                {/* Height */}
                <div className="mb-7">
                  <label htmlFor="bf-height" className={labelClass}>
                    Height ({lengthLabel})
                  </label>
                  <input
                    id="bf-height"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Weight */}
                <div className="mb-7">
                  <label htmlFor="bf-weight" className={labelClass}>
                    Body weight ({weightLabel})
                  </label>
                  <input
                    id="bf-weight"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {method === "navy" ? (
                  <>
                    {/* Waist */}
                    <div className="mb-7">
                      <label htmlFor="bf-waist" className={labelClass}>
                        Waist ({lengthLabel})
                      </label>
                      <input
                        id="bf-waist"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        className={inputClass}
                      />
                      <p className="text-xs text-text-tertiary font-barlow mt-2 leading-relaxed">
                        {sex === "male"
                          ? "Measure horizontally at the navel."
                          : "Measure at the narrowest point of your torso."}
                      </p>
                    </div>

                    {/* Neck */}
                    <div className="mb-7">
                      <label htmlFor="bf-neck" className={labelClass}>
                        Neck ({lengthLabel})
                      </label>
                      <input
                        id="bf-neck"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                        className={inputClass}
                      />
                      <p className="text-xs text-text-tertiary font-barlow mt-2 leading-relaxed">
                        Measure just below the larynx, tape level.
                      </p>
                    </div>

                    {/* Hip (women) */}
                    {sex === "female" && (
                      <div>
                        <label htmlFor="bf-hip" className={labelClass}>
                          Hip ({lengthLabel})
                        </label>
                        <input
                          id="bf-hip"
                          type="number"
                          inputMode="decimal"
                          min="0"
                          value={hip}
                          onChange={(e) => setHip(e.target.value)}
                          className={inputClass}
                        />
                        <p className="text-xs text-text-tertiary font-barlow mt-2 leading-relaxed">
                          Measure at the widest point.
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  /* Age */
                  <div>
                    <label htmlFor="bf-age" className={labelClass}>
                      Age (years)
                    </label>
                    <input
                      id="bf-age"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={inputClass}
                    />
                    <p className="text-xs text-text-tertiary font-barlow mt-2 leading-relaxed">
                      The quick formula adjusts for the fat most people gain
                      with age at the same BMI.
                    </p>
                  </div>
                )}
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your estimated body fat
                </p>

                {!error ? (
                  <>
                    <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                      <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                        {fmt1(bf)}%
                      </span>
                      <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                        {currentBand ? currentBand.label : ""} · ACE category
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow mt-1">
                        {method === "navy" ? "US Navy tape method" : "BMI-based quick estimate"}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle">
                        <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                          Fat mass
                        </span>
                        <span className="font-barlow-condensed text-lg font-bold text-foreground">
                          {fmt1(fromKg(fatMassKg))} {weightLabel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle">
                        <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                          Lean mass
                        </span>
                        <span className="font-barlow-condensed text-lg font-bold text-foreground">
                          {fmt1(fromKg(leanMassKg))} {weightLabel}
                        </span>
                      </div>
                    </div>

                    {/* Category band */}
                    <div className="mb-6">
                      <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                        Where you land
                      </p>
                      <div className="relative h-8" role="img" aria-label={`Body fat category: ${currentBand ? currentBand.label : "unknown"}`}>
                        {bands.map((b) => (
                          <div
                            key={b.label}
                            className={`absolute top-0 h-full border first:rounded-l-[8px] last:rounded-r-[8px] ${
                              currentBand && b.label === currentBand.label
                                ? "bg-primary/15 border-primary/40"
                                : "bg-surface-1 border-border-subtle"
                            }`}
                            style={{
                              left: `${(b.min / BAND_SCALE) * 100}%`,
                              width: `${((b.max - b.min) / BAND_SCALE) * 100}%`,
                            }}
                          />
                        ))}
                        <div
                          className="absolute -top-1 -bottom-1 w-[3px] rounded-full bg-primary"
                          style={{ left: `calc(${markerPct}% - 1px)` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                        {bands.map((b) => (
                          <span
                            key={b.label}
                            className={`text-xs font-barlow ${
                              currentBand && b.label === currentBand.label
                                ? "text-primary font-bold"
                                : "text-text-tertiary"
                            }`}
                          >
                            {b.label} {b.range}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <Ruler className="w-5 h-5 text-primary" aria-hidden="true" />
                        <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                          Track the trend
                        </span>
                      </div>
                      <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                        Any single reading carries a few points of error. Measure
                        the same way every couple of weeks and watch which
                        direction the number moves.
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-barlow text-text-secondary">{error}</p>
                )}
              </div>
            </div>

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: the Navy method applies the Hodgdon-Beckett
              logarithmic formulas. Men: 86.010 x log10(waist - neck) - 70.041
              x log10(height) + 36.76, all in inches. Women: 163.205 x
              log10(waist + hip - neck) - 97.684 x log10(height) - 78.387. The
              quick estimate uses the Deurenberg equation, 1.20 x BMI + 0.23 x
              age - 10.8 x sex - 5.4, with sex counted as 1 for men and 0 for
              women. Fat mass and lean mass split your entered body weight by
              the resulting percentage. Categories follow the ACE chart.
              Tape-based estimates carry three to four points of error even
              with careful measurement, so treat the output as a tracking
              tool. A DEXA scan gives the medical-grade number.
            </p>
          </div>
        </section>

        <ToolSection heading="How the Navy method" accent="works">
          <p>
            The US Navy needed a body fat test that fit in a duffel bag.
            Researchers found that a few circumference measurements, run
            through a log formula, tracked lab results closely enough for
            service standards. A tape measure became the whole kit.
          </p>
          <p>
            Men measure the waist at the navel and the neck just below the
            larynx. Women add a hip measurement at the widest point. Pull the
            tape snug and keep it level. Measure after a normal exhale. A
            sloppy waist reading swings the result by several points, so take
            each one twice.
          </p>
          <p>
            Done carefully, the method lands within three to four points of a
            DEXA scan for most people. That gap matters less than it looks.
            Measured the same way each time, the trend tells you whether fat is
            coming off.
          </p>
        </ToolSection>

        <ToolSection heading="What the number" accent="tells you">
          <p>
            Body fat percentage splits your weight into fat mass and everything
            else. Two people at the same weight can look completely different
            because that split differs. This is why the number beats BMI for
            anyone who trains.
          </p>
          <p>
            Every estimate carries error. Hydration, a recent meal, and tape
            placement each move the result by a point or two in either
            direction. Pick one method, measure under the same conditions every
            couple of weeks, and read the direction of the trend rather than
            any single reading.
          </p>
        </ToolSection>

        <FAQSection
          title="Body Fat Questions"
          subtitle="Common questions about measuring and using body fat percentage"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="body-fat-calculator" />

        <ToolCTA
          headline="Now move"
          headlineAccent="the number."
          subline="Forge builds your training plan, adjusts it as you log each session, and tracks every PR along the way. Start with a 7-day free trial."
          utmContent="body-fat-calculator"
        />
      </main>
    </div>
  );
}
