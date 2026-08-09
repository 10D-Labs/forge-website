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
type Sex = "male" | "female";
type Mode = "total" | "sbd";

const COEFF: Record<Sex, { A: number; B: number; C: number; D: number; E: number }> = {
  male: {
    A: -307.75076,
    B: 24.0900756,
    C: -0.1918759221,
    D: 0.0007391293,
    E: -0.000001093,
  },
  female: {
    A: -57.96288,
    B: 13.6175032,
    C: -0.1126655495,
    D: 0.0005158568,
    E: -0.0000010706,
  },
};

function dotsScore(sex: Sex, bwKg: number, totalKg: number): number | null {
  const { A, B, C, D, E } = COEFF[sex];
  const x = bwKg;
  const denom = A + B * x + C * x * x + D * x ** 3 + E * x ** 4;
  if (denom <= 0 || !Number.isFinite(denom)) return null;
  const score = (totalKg * 500) / denom;
  return Number.isFinite(score) && score > 0 ? score : null;
}

const BANDS: { min: number; label: string; note: string }[] = [
  { min: 400, label: "Elite", note: "World-class territory" },
  { min: 350, label: "National level", note: "Competitive at national meets" },
  { min: 300, label: "Regional level", note: "Competitive at regional meets" },
  { min: 0, label: "Local level", note: "Solid gym strength" },
];

function bandFor(score: number) {
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];
}

const faqs = [
  {
    question: "What is a DOTS score?",
    answer:
      "A single number that adjusts your powerlifting total for bodyweight and sex, so a lightweight and a heavyweight can be compared on equal footing. Your total in kilograms gets multiplied by 500 and divided by a polynomial built from your bodyweight. Higher means stronger pound for pound.",
  },
  {
    question: "What DOTS score is considered good?",
    answer:
      "Under 300 you are around local meet level. From 300 to 350 you would be competitive at regional meets. Between 350 and 400 you are in national territory, and past 400 you are looking at elite company. These are rough guides, since the spread shifts with the equipment division and the federation.",
  },
  {
    question: "Why did DOTS replace Wilks?",
    answer:
      "Wilks was fit on older data and it showed. Certain bodyweights scored systematically high, and the men's and women's tables drifted out of alignment as women's lifting grew. DOTS refit the curve on a much larger modern dataset, which is why most federations moved over.",
  },
  {
    question: "Does gaining bodyweight change my score much?",
    answer:
      "A lot. The formula penalizes extra bodyweight, so gaining weight only helps your score when the added muscle drives your total up faster than the penalty climbs. That makes DOTS the honest test of whether a bulk is paying off in strength.",
  },
  {
    question: "Can I score a single lift with DOTS?",
    answer:
      "The math runs, but the meaning thins out. DOTS was fit on three-lift powerlifting totals, so a bench-only score compares you against full totals and reads low. Use the one-rep max or percentage tools for single lifts and save DOTS for your total.",
  },
  {
    question: "Do I need to compete to use this?",
    answer:
      "No. Gym lifts work fine as long as you are honest about squat depth and the bench pause. Treat the score as a way to track your own progress and to see how you stack up against lifters in other weight classes.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DOTS Calculator",
  url: "https://forgetrainer.ai/tools/dots-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free DOTS calculator for powerlifting. Score your total pound for pound and compare strength across weight classes and sexes.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

export default function DotsCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [unit, setUnit] = useState<Unit>("lb");
  const [mode, setMode] = useState<Mode>("total");
  const [bodyweight, setBodyweight] = useState("198");
  const [total, setTotal] = useState("1100");
  const [squat, setSquat] = useState("385");
  const [bench, setBench] = useState("265");
  const [deadlift, setDeadlift] = useState("450");

  const toKg = (v: number) => (unit === "lb" ? v / 2.20462 : v);
  const other = (kg: number) => (unit === "lb" ? kg * 2.20462 : kg / 2.20462);
  const otherUnit: Unit = unit === "lb" ? "kg" : "lb";

  const bwVal = parseFloat(bodyweight) || 0;
  const bwKg = toKg(bwVal);
  const liftVal =
    mode === "total"
      ? parseFloat(total) || 0
      : (parseFloat(squat) || 0) +
        (parseFloat(bench) || 0) +
        (parseFloat(deadlift) || 0);
  const totalKg = toKg(liftVal);

  const valid = bwVal > 0 && liftVal > 0;
  const score = valid ? dotsScore(sex, bwKg, totalKg) : null;
  const band = score !== null ? bandFor(score) : null;

  const numberInput = (
    id: string,
    label: string,
    value: string,
    set: (v: string) => void
  ) => (
    <div className="mb-5" key={id}>
      <label
        htmlFor={id}
        className="block font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3"
      >
        {label} ({unit})
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onChange={(e) => set(e.target.value)}
        className="w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
          {
            name: "DOTS Calculator",
            url: "https://forgetrainer.ai/tools/dots-calculator",
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
          titleBefore="DOTS"
          titleAccent="Calculator"
          description="Score your powerlifting total with the DOTS formula. Enter your bodyweight and your best squat, bench, and deadlift, and see how your strength compares across weight classes."
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

                {/* Sex toggle */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Sex
                  </legend>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                      ] as { value: Sex; label: string }[]
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSex(opt.value)}
                        aria-pressed={sex === opt.value}
                        className={`flex-1 py-3 rounded-[10px] border font-barlow-condensed font-bold text-lg uppercase transition-colors ${
                          sex === opt.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Bodyweight */}
                {numberInput("bodyweight", "Bodyweight", bodyweight, setBodyweight)}

                {/* Mode toggle */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Enter your lifts as
                  </legend>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: "total", label: "Total" },
                        { value: "sbd", label: "Squat + bench + deadlift" },
                      ] as { value: Mode; label: string }[]
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setMode(opt.value)}
                        aria-pressed={mode === opt.value}
                        className={`flex-1 py-3 px-2 rounded-[10px] border font-barlow-condensed font-bold text-lg uppercase transition-colors ${
                          mode === opt.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {mode === "total" ? (
                  numberInput("total", "Powerlifting total", total, setTotal)
                ) : (
                  <>
                    {numberInput("squat", "Squat", squat, setSquat)}
                    {numberInput("bench", "Bench", bench, setBench)}
                    {numberInput("deadlift", "Deadlift", deadlift, setDeadlift)}
                  </>
                )}
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your DOTS score
                </p>

                {score !== null && band ? (
                  <>
                    <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                      <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                        {score.toFixed(1)}
                      </span>
                      <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                        DOTS · {band.label}
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow mt-1">
                        {Math.round(totalKg * 10) / 10} kg total (
                        {Math.round(other(totalKg))} {otherUnit}) at{" "}
                        {Math.round(bwKg * 10) / 10} kg bodyweight (
                        {Math.round(other(bwKg))} {otherUnit})
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {BANDS.map((b) => (
                        <div
                          key={b.label}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-[10px] border ${
                            band.label === b.label
                              ? "border-primary/50 bg-primary/10"
                              : "border-border-subtle bg-surface-1"
                          }`}
                        >
                          <div>
                            <span
                              className={`font-barlow-condensed font-bold uppercase tracking-wide text-sm ${
                                band.label === b.label ? "text-primary" : ""
                              }`}
                            >
                              {b.label}
                            </span>
                            <span className="hidden sm:inline text-xs text-text-tertiary font-barlow ml-2">
                              {b.note}
                            </span>
                          </div>
                          <span className="font-barlow-condensed text-lg font-bold text-foreground">
                            {b.min === 0 ? "under 300" : `${b.min}+`}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-primary" aria-hidden="true" />
                        <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                          Chase the score
                        </span>
                      </div>
                      <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                        DOTS climbs when your total grows faster than your
                        bodyweight. Re-check after each training block to see
                        whether your work is paying off pound for pound.
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-barlow text-text-secondary">
                    {valid
                      ? "That combination lands outside the range the formula was built for. Check that your bodyweight and total use the same units."
                      : "Enter your bodyweight and your lifts to see your DOTS score."}
                  </p>
                )}
              </div>
            </div>

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: DOTS multiplies your total in kilograms by 500 and
              divides by a fourth-degree polynomial in bodyweight, with
              separate coefficient sets for men and women. Pounds convert at 1
              kg = 2.20462 lb before scoring. The bands here are rough guides
              drawn from where competitive totals tend to cluster, and they
              shift with equipment division and federation. DOTS was built for
              full power totals in the squat, bench press, and deadlift, so
              single-lift scores carry less meaning.
            </p>
          </div>
        </section>

        <ToolSection heading="What DOTS" accent="replaced">
          <p>
            Wilks held the job for two decades, and nearly every meet best
            lifter award ran on it. Over time the results showed it favored
            certain bodyweights and scored the sexes inconsistently, so
            federations started looking for a fix.
          </p>
          <p>
            DOTS arrived with a much larger modern dataset behind the curve and
            steadier behavior at very light and very heavy bodyweights. Most
            major federations now use it for best lifter awards, while Wilks
            survives mostly on old result sheets.
          </p>
        </ToolSection>

        <ToolSection heading="When pound for pound" accent="matters">
          <p>
            A 500 kg total means something different at 60 kg than it does at
            120 kg. Raw totals crown the biggest lifter. DOTS answers the
            harder question of who is strongest for their size, and that is the
            number that decides best lifter when champions from every class
            share the same room.
          </p>
          <p>
            It also gives you a fair target against yourself. Track the score
            across a bulk or a cut and you learn whether the scale change is
            buying strength, because the score climbs only when your total
            outruns the penalty on the extra bodyweight.
          </p>
        </ToolSection>

        <FAQSection
          title="DOTS Questions"
          subtitle="Common questions about pound-for-pound scoring"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="dots-calculator" />

        <ToolCTA
          headline="Build a total worth"
          headlineAccent="scoring."
          subline="Forge programs your squat, bench, and deadlift around your current strength and adjusts the plan as your numbers climb."
          utmContent="dots-calculator"
        />
      </main>
    </div>
  );
}
