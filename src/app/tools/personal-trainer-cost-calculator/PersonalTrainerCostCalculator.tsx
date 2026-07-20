"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, TrendingDown } from "lucide-react";
import { GlowOrbs } from "@/components/effects";
import { trackAppStoreClick } from "@/lib/tracking";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";

const TRAINER_TYPES = {
  commercial: { label: "Commercial gym trainer", base: 55, range: "$40-100" },
  independent: { label: "Independent trainer", base: 100, range: "$60-150" },
  boutique: { label: "Boutique studio", base: 130, range: "$100-160" },
} as const;
type TrainerKey = keyof typeof TRAINER_TYPES;

const CITY_TIERS = {
  major: { label: "Major metro", note: "NYC, LA, SF", mult: 1.4 },
  mid: { label: "Mid-size city", note: "Denver, Austin", mult: 1.0 },
  small: { label: "Small town / rural", note: "", mult: 0.7 },
} as const;
type CityKey = keyof typeof CITY_TIERS;

const FORGE_YEAR = 59.99;
const WEEKS_PER_MONTH = 4;

const faqs = [
  {
    question: "How much does a personal trainer cost on average?",
    answer:
      "In 2026, a personal trainer costs $40 to $100 per session at most gyms, with a national average of $55 per hour. Training twice a week works out to roughly $440 to $800 per month. Independent and boutique trainers charge more, and major cities push rates higher.",
  },
  {
    question: "How does this calculator estimate the cost?",
    answer:
      "It starts from typical 2026 US per-session rates for each trainer type, adjusts for your city (major metros run higher, small towns lower), applies a package discount if you choose one, then multiplies by your sessions per week across four weeks a month. Figures are estimates based on published pricing ranges, not quotes.",
  },
  {
    question: "Why is an AI personal trainer so much cheaper?",
    answer:
      "A human trainer charges for their time every session. Software does not. Forge delivers personalized, adaptive programming for $59.99 a year, about $5 a month, compared with $5,000 or more a year for twice-weekly in-person training. You give up hands-on form correction, but you keep the programming, tracking, and 24/7 guidance.",
  },
  {
    question: "Does a cheaper trainer mean lower quality?",
    answer:
      "Not usually. Price mostly reflects location and setting rather than skill. A $150 trainer in Manhattan is not automatically better than a $60 trainer in a smaller city. Credentials, experience, and how well they fit your goals matter far more than the rate.",
  },
  {
    question: "What does Forge cost?",
    answer:
      "Forge is $59.99 a year, which works out to about $5 a month, with a free trial. That is personalized AI coaching, adaptive programming, progress tracking, and four trainer styles, for a small fraction of what a human trainer costs.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Personal Trainer Cost Calculator",
  url: "https://forgetrainer.ai/tools/personal-trainer-cost-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  description:
    "Free calculator that estimates what a personal trainer costs per session, month, and year by trainer type and city, and compares it with an AI trainer.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: {
    "@type": "Organization",
    name: "Forge",
    url: "https://forgetrainer.ai",
  },
};

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function PersonalTrainerCostCalculator() {
  const [sessions, setSessions] = useState(2);
  const [trainer, setTrainer] = useState<TrainerKey>("commercial");
  const [city, setCity] = useState<CityKey>("mid");
  const [usePackage, setUsePackage] = useState(false);

  const perSession =
    TRAINER_TYPES[trainer].base * CITY_TIERS[city].mult * (usePackage ? 0.85 : 1);
  const perMonth = perSession * sessions * WEEKS_PER_MONTH;
  const perYear = perMonth * 12;
  const savingsYear = Math.max(0, perYear - FORGE_YEAR);
  const savingsPct = perYear > 0 ? Math.round((savingsYear / perYear) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          {
            name: "Personal Trainer Cost Calculator",
            url: "https://forgetrainer.ai/tools/personal-trainer-cost-calculator",
          },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        {/* Hero */}
        <section
          className="relative py-14 md:py-20 bg-surface-0 overflow-hidden"
          aria-labelledby="calc-heading"
        >
          <GlowOrbs variant="hero" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4">
                Free Tool
              </p>
              <h1
                id="calc-heading"
                className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none mb-6"
              >
                Personal Trainer{" "}
                <span className="text-primary text-neon">Cost Calculator</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary font-barlow max-w-2xl mx-auto leading-relaxed">
                See what a personal trainer really costs per session, month, and year, then find
                out how much you would save with an AI trainer.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-10 md:py-14 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2">
                {/* Sessions per week */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Sessions per week
                  </legend>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setSessions(n)}
                        aria-pressed={sessions === n}
                        className={`flex-1 py-3 rounded-[10px] border font-barlow-condensed font-bold text-lg transition-colors ${
                          sessions === n
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Trainer type */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Trainer type
                  </legend>
                  <div className="grid gap-2">
                    {(Object.keys(TRAINER_TYPES) as TrainerKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTrainer(key)}
                        aria-pressed={trainer === key}
                        className={`flex items-center justify-between px-4 py-3 rounded-[10px] border font-barlow transition-colors ${
                          trainer === key
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        <span className="font-semibold">{TRAINER_TYPES[key].label}</span>
                        <span className="text-sm text-text-tertiary">
                          {TRAINER_TYPES[key].range}/session
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* City tier */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Where you live
                  </legend>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(CITY_TIERS) as CityKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCity(key)}
                        aria-pressed={city === key}
                        className={`px-3 py-3 rounded-[10px] border text-center transition-colors ${
                          city === key
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        <span className="block font-barlow font-semibold text-sm leading-tight">
                          {CITY_TIERS[key].label}
                        </span>
                        {CITY_TIERS[key].note && (
                          <span className="block text-xs text-text-tertiary mt-1">
                            {CITY_TIERS[key].note}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Toggles */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer font-barlow text-text-secondary">
                    <input
                      type="checkbox"
                      checked={usePackage}
                      onChange={(e) => setUsePackage(e.target.checked)}
                      className="w-5 h-5 rounded border-border accent-primary"
                    />
                    Buy sessions in a package (save about 15%)
                  </label>
                </div>
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                  Your estimated cost
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 rounded-[10px] bg-surface-1 border border-border-subtle">
                    <span className="block font-barlow-condensed text-2xl md:text-3xl font-black text-foreground">
                      {money(perSession)}
                    </span>
                    <span className="block text-xs text-text-tertiary font-barlow uppercase tracking-wide mt-1">
                      per session
                    </span>
                  </div>
                  <div className="text-center p-3 rounded-[10px] bg-surface-1 border border-border-subtle">
                    <span className="block font-barlow-condensed text-2xl md:text-3xl font-black text-foreground">
                      {money(perMonth)}
                    </span>
                    <span className="block text-xs text-text-tertiary font-barlow uppercase tracking-wide mt-1">
                      per month
                    </span>
                  </div>
                  <div className="text-center p-3 rounded-[10px] bg-surface-1 border border-border-subtle">
                    <span className="block font-barlow-condensed text-2xl md:text-3xl font-black text-primary">
                      {money(perYear)}
                    </span>
                    <span className="block text-xs text-text-tertiary font-barlow uppercase tracking-wide mt-1">
                      per year
                    </span>
                  </div>
                </div>

                {/* Forge comparison */}
                <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-5 mt-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-5 h-5 text-primary" />
                    <span className="font-barlow-condensed text-lg font-bold uppercase tracking-wide">
                      With Forge
                    </span>
                  </div>
                  <p className="font-barlow text-text-secondary mb-1">
                    Forge costs{" "}
                    <strong className="text-foreground">$59.99/year (about $5/month)</strong>.
                  </p>
                  {savingsYear > 0 ? (
                    <p className="font-barlow text-text-secondary mb-4">
                      You would save{" "}
                      <strong className="text-primary">
                        {money(savingsYear)} a year ({savingsPct}%)
                      </strong>{" "}
                      versus a human trainer.
                    </p>
                  ) : (
                    <p className="font-barlow text-text-secondary mb-4">
                      Personalized coaching for a fraction of an in-person trainer.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?pt=128493451&ct=cost-calculator&mt=8"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Download Forge on the App Store"
                      onClick={trackAppStoreClick}
                    >
                      <img
                        src="/app-store-badge.svg"
                        alt="Download on the App Store"
                        width={135}
                        height={45}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=website&utm_medium=badge&utm_campaign=organic&utm_content=cost-calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Get Forge on Google Play"
                    >
                      <img
                        src="/google-play-badge.svg"
                        alt="Get it on Google Play"
                        width={150}
                        height={58}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Methodology */}
            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              How we calculate this: estimates use typical 2026 US per-session rates by trainer
              type, adjusted for city (major metros run higher, small towns lower), a 15% package
              discount when selected, and four weeks per month. The national average is about $55
              per hour. These are estimates from published pricing ranges, not quotes. See the full{" "}
              <Link
                href="/blog/how-much-does-personal-trainer-cost"
                className="text-primary hover:underline"
              >
                2026 personal trainer cost guide
              </Link>{" "}
              for the detailed breakdown.
            </p>
          </div>
        </section>

        {/* Context */}
        <section className="py-14 md:py-20 bg-surface-0 border-t border-border-subtle">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-5">
                What drives personal{" "}
                <span className="text-primary text-neon">trainer cost</span>
              </h2>
              <p className="text-text-secondary font-barlow leading-relaxed mb-4">
                Personal trainer prices swing widely. Location matters most: the same trainer who
                charges $60 in a smaller city can charge $150 in Manhattan. Setting comes next, from
                budget commercial gyms up to boutique studios like Equinox. Experience, session
                length, and whether you buy single sessions or a package all move the number too.
              </p>
              <p className="text-text-secondary font-barlow leading-relaxed mb-4">
                For most people, twice-weekly training at the national average runs about $440 a
                month, or over $5,000 a year. That ongoing cost is why so many people start
                personal training and quit within a few months.
              </p>
              <p className="text-text-secondary font-barlow leading-relaxed">
                An AI trainer closes most of that gap for a fraction of the price. You lose hands-on
                form correction, but you keep personalized programming, progress tracking, and
                round-the-clock guidance.{" "}
                <Link
                  href="/blog/ai-vs-traditional-personal-trainers"
                  className="text-primary hover:underline"
                >
                  See how AI trainers compare to human ones
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title="Personal Trainer Cost Questions"
          subtitle="Common questions about what a personal trainer costs and how to save"
          questions={faqs}
        />

        {/* Bottom CTA */}
        <section className="py-16 md:py-24 bg-surface-1 border-t border-border-subtle relative overflow-hidden">
          <GlowOrbs variant="section" />
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-6">
                Skip the{" "}
                <span className="text-primary text-neon">$5,000 bill</span>
              </h2>
              <p className="text-lg text-text-secondary font-barlow mb-8">
                Get personalized coaching, adaptive programming, and 24/7 guidance for $5 a month.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <a
                  href="https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?pt=128493451&ct=calculator-bottom&mt=8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Forge on the App Store"
                  onClick={trackAppStoreClick}
                >
                  <img
                    src="/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={140}
                    height={47}
                    className="hover:opacity-80 transition-opacity"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=website&utm_medium=badge&utm_campaign=organic&utm_content=calculator-bottom"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get Forge on Google Play"
                >
                  <img
                    src="/google-play-badge.svg"
                    alt="Get it on Google Play"
                    width={155}
                    height={60}
                    className="hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
              <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary font-barlow list-none">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Free trial</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>$5/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Cancel anytime</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
