"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import {
  ToolHero,
  ToolSection,
  ToolCTA,
  RelatedTools,
} from "@/components/tools/ToolParts";

type Unit = "lb" | "kg";
type Mode = "forward" | "reverse";
type BarMode = "men" | "women" | "custom";

const PLATES: Record<Unit, number[]> = {
  lb: [45, 35, 25, 10, 5, 2.5],
  kg: [25, 20, 15, 10, 5, 2.5, 1.25],
};

const BAR_PRESETS: Record<Exclude<BarMode, "custom">, Record<Unit, number>> = {
  men: { lb: 45, kg: 20 },
  women: { lb: 35, kg: 15 },
};

const KG_PER_LB = 1 / 2.20462;

const faqs = [
  {
    question: "How do I read the plate list?",
    answer:
      "Plates are listed heaviest first, which is the order they go on the bar. The biggest plate slides on first and sits closest to the center, then each smaller plate follows, and the smallest plate ends up on the outside. The bar graphic shows the same layout, so you can glance at your phone and load exactly what you see.",
  },
  {
    question: "Why can't I hit my exact target weight?",
    answer:
      "Plates come in fixed sizes, so a bar can only be loaded to certain totals. With a standard plate set the smallest jump you can make is 2.5 kg or 5 lb, and some numbers in between simply have no combination. When your target lands on one of those numbers, the calculator shows the nearest loadable totals above and below it. Tap either chip to load that weight instead.",
  },
  {
    question: "Do the bar and collars count toward the weight?",
    answer:
      "Yes. Everything that leaves the floor counts. A men's Olympic bar adds 20 kg or 45 lb before any plates go on, and a women's bar adds 15 kg or 35 lb. Competition collars add about 2.5 per side. Turn the collars toggle on when you use them so the math stays honest.",
  },
  {
    question: "What if my gym's bar weighs something different?",
    answer:
      "Pick the custom option and type in whatever your bar weighs. Fixed bars, safety squat bars, trap bars, and Smith machines all differ from the Olympic standard, and Smith machines in particular vary wildly between brands. Check the placard on the machine or ask the staff, then enter that number once.",
  },
  {
    question: "Why do the plates look different at another gym?",
    answer:
      "Gyms stock either kilogram plates or pound plates, and the two systems build different bars. A two-plate bench is 225 lb on a pound bar and 100 kg, about 220 lb, on a kilo bar. The totals drift further apart as you add plates. Switch the unit toggle to match the plates in front of you rather than converting in your head.",
  },
  {
    question: "Does the order of plates on the bar matter?",
    answer:
      "Load the heaviest plates on the inside every time. The big plates carry the load best against the sleeve, and the small change plates stay secure on the outside. Mixing the order makes the bar awkward to strip and can let small plates slide under loose collars.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Barbell Plate Calculator",
  url: "https://forgetrainer.ai/tools/barbell-plate-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description:
    "Free barbell plate calculator. Enter a target weight to get plates per side with a visual loaded bar, or tap plates to count a total. kg and lb.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Forge", url: "https://forgetrainer.ai" },
};

// Unbounded knapsack reachability in units of `step`, up to `max`.
function reachableSums(plates: number[], step: number, max: number): boolean[] {
  const n = Math.max(0, Math.floor(max / step));
  const reach: boolean[] = new Array(n + 1).fill(false);
  reach[0] = true;
  const counts = plates.map((p) => Math.round(p / step));
  for (let s = 0; s <= n; s++) {
    if (!reach[s]) continue;
    for (const c of counts) {
      if (s + c <= n) reach[s + c] = true;
    }
  }
  return reach;
}

// Greedy largest-first fill. Gives the fewest plates for standard plate sets.
function greedyFill(
  plates: number[],
  perSide: number
): { plate: number; count: number }[] {
  const out: { plate: number; count: number }[] = [];
  let rem = perSide;
  for (const p of plates) {
    const c = Math.floor((rem + 1e-9) / p);
    if (c > 0) {
      out.push({ plate: p, count: c });
      rem -= c * p;
    }
  }
  return out;
}

function LoadedBar({
  plates,
  barWeight,
  collars,
  unit,
}: {
  plates: { plate: number; count: number }[];
  barWeight: number;
  collars: boolean;
  unit: Unit;
}) {
  const maxPlate = PLATES[unit][0];
  const expanded = plates.flatMap(({ plate, count }) =>
    Array.from({ length: count }, () => plate)
  );
  const left = [...expanded].reverse();

  const block = (plate: number, key: string) => {
    const ratio = plate / maxPlate;
    const w = 10 + ratio * 26;
    const h = 30 + ratio * 46;
    const opacity = 0.25 + ratio * 0.75;
    return (
      <div key={key} className="flex flex-col items-center gap-1">
        <div
          className="rounded-[4px] border border-primary/40"
          style={{
            width: `${w}px`,
            height: `${h}px`,
            backgroundColor: `rgba(255, 102, 0, ${opacity})`,
          }}
          aria-hidden="true"
        />
        <span className="text-[10px] font-barlow text-text-tertiary leading-none">
          {plate}
        </span>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto py-2">
      <div className="flex items-end justify-center gap-[3px] min-w-max px-2">
        <div className="flex items-end gap-[3px]">
          {left.map((p, i) => block(p, `l-${i}`))}
        </div>
        {collars && (
          <div className="flex flex-col items-center gap-1">
            <div className="w-[6px] h-[26px] rounded-[2px] bg-text-tertiary/60" aria-hidden="true" />
            <span className="text-[10px] font-barlow text-text-tertiary leading-none">2.5</span>
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <div className="w-20 md:w-28 h-[10px] rounded-full bg-text-tertiary/40" aria-hidden="true" />
          <span className="text-[10px] font-barlow text-text-tertiary leading-none">
            bar {barWeight} {unit}
          </span>
        </div>
        {collars && (
          <div className="flex flex-col items-center gap-1">
            <div className="w-[6px] h-[26px] rounded-[2px] bg-text-tertiary/60" aria-hidden="true" />
            <span className="text-[10px] font-barlow text-text-tertiary leading-none">2.5</span>
          </div>
        )}
        <div className="flex items-end gap-[3px]">
          {expanded.map((p, i) => block(p, `r-${i}`))}
        </div>
      </div>
      <p className="sr-only">
        Loaded bar with {expanded.length} plates per side.
      </p>
    </div>
  );
}

export default function BarbellPlateCalculator() {
  const [mode, setMode] = useState<Mode>("forward");
  const [unit, setUnit] = useState<Unit>("lb");
  const [target, setTarget] = useState("225");
  const [barMode, setBarMode] = useState<BarMode>("men");
  const [customBar, setCustomBar] = useState("35");
  const [collars, setCollars] = useState(false);
  const [counts, setCounts] = useState<number[]>(() => PLATES.lb.map(() => 0));

  const plates = PLATES[unit];
  const step = unit === "lb" ? 2.5 : 1.25;
  const barWeight =
    barMode === "custom"
      ? parseFloat(customBar) || 0
      : BAR_PRESETS[barMode][unit];
  const collarEach = collars ? 2.5 : 0;
  const floorWeight = barWeight + 2 * collarEach;

  const fmt = (n: number) => (n % 1 === 0 ? n.toString() : n.toFixed(2).replace(/0+$/, "").replace(/\.$/, ""));
  const convert = (n: number) => (unit === "lb" ? n * KG_PER_LB : n / KG_PER_LB);

  // Forward mode
  const targetNum = parseFloat(target) || 0;
  const tooLight = targetNum > 0 && targetNum < floorWeight;
  const perSideTarget = (targetNum - floorWeight) / 2;
  const reach = reachableSums(plates, step, Math.max(perSideTarget, 0) + plates[0] + step);
  const toIdx = (s: number) => Math.round(s / step);

  let underSum = 0;
  if (!tooLight && targetNum > 0) {
    for (let i = Math.min(toIdx(perSideTarget), reach.length - 1); i >= 0; i--) {
      if (reach[i]) {
        underSum = i * step;
        break;
      }
    }
  }
  let overSum: number | null = null;
  if (!tooLight && targetNum > 0) {
    for (let i = Math.max(0, Math.ceil(perSideTarget / step - 1e-9)); i < reach.length; i++) {
      if (reach[i]) {
        overSum = i * step;
        break;
      }
    }
  }
  const exact = !tooLight && targetNum > 0 && Math.abs(underSum - perSideTarget) < 1e-9;
  const breakdown = greedyFill(plates, underSum);
  const loadedTotal = floorWeight + 2 * underSum;
  const overTotal = overSum !== null ? floorWeight + 2 * overSum : null;

  // Reverse mode
  const reversePerSide = counts.reduce((s, c, i) => s + c * (plates[i] ?? 0), 0);
  const reverseTotal = floorWeight + 2 * reversePerSide;

  const addPlate = (i: number) =>
    setCounts((prev) => prev.map((c, j) => (j === i ? c + 1 : c)));
  const resetPlates = () => setCounts(plates.map(() => 0));

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Tools", url: "https://forgetrainer.ai/tools" },
          { name: "Barbell Plate Calculator", url: "https://forgetrainer.ai/tools/barbell-plate-calculator" },
        ]}
      />
      <StructuredData type="faq" questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="pt-20" role="main">
        <ToolHero
          titleBefore="Barbell Plate"
          titleAccent="Calculator"
          description="Type any target weight and see exactly which plates to load per side, with a picture of the finished bar. Flip to count mode and tap the plates already on the bar to get the total."
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
                    Mode
                  </legend>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: "forward", label: "Load a target" },
                        { value: "reverse", label: "Count the bar" },
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
                        onClick={() => {
                          setUnit(u);
                          setCounts(PLATES[u].map(() => 0));
                        }}
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

                {mode === "forward" && (
                  <div className="mb-7">
                    <label
                      htmlFor="target"
                      className="block font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3"
                    >
                      Target weight ({unit})
                    </label>
                    <input
                      id="target"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                )}

                {/* Bar */}
                <fieldset className="mb-7">
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Bar
                  </legend>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { value: "men", label: `Men's ${BAR_PRESETS.men[unit]}` },
                        { value: "women", label: `Women's ${BAR_PRESETS.women[unit]}` },
                        { value: "custom", label: "Custom" },
                      ] as { value: BarMode; label: string }[]
                    ).map((b) => (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => setBarMode(b.value)}
                        aria-pressed={barMode === b.value}
                        className={`py-2.5 px-1 rounded-[10px] border font-barlow-condensed font-bold text-sm transition-colors ${
                          barMode === b.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                  {barMode === "custom" && (
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={customBar}
                      onChange={(e) => setCustomBar(e.target.value)}
                      aria-label={`Custom bar weight in ${unit}`}
                      className="mt-3 w-full px-4 py-3 rounded-[10px] border border-border bg-surface-1 font-barlow-condensed text-2xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  )}
                </fieldset>

                {/* Collars */}
                <fieldset>
                  <legend className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-3">
                    Collars
                  </legend>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: false, label: "No collars" },
                        { value: true, label: "+2.5 per side" },
                      ] as { value: boolean; label: string }[]
                    ).map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => setCollars(c.value)}
                        aria-pressed={collars === c.value}
                        className={`flex-1 py-3 rounded-[10px] border font-barlow-condensed font-bold text-lg uppercase transition-colors ${
                          collars === c.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-1 text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Results */}
              <div className="p-6 md:p-8 rounded-[20px] border border-border bg-surface-2 flex flex-col">
                {mode === "forward" ? (
                  <>
                    <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                      Plates per side
                    </p>
                    {tooLight ? (
                      <div className="rounded-[14px] border border-border bg-surface-1 p-5">
                        <p className="font-barlow text-text-secondary text-sm leading-relaxed">
                          Your target is lighter than the bar
                          {collars ? " and collars" : ""} alone. The bar
                          {collars ? " plus collars" : ""} already weighs{" "}
                          <strong className="text-foreground">
                            {fmt(floorWeight)} {unit}
                          </strong>
                          , so there is nothing to load. Raise the target or
                          pick a lighter bar.
                        </p>
                      </div>
                    ) : targetNum > 0 ? (
                      <>
                        <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                          <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                            {fmt(loadedTotal)}
                          </span>
                          <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                            {unit} loaded{exact ? " · exact match" : " · closest loadable"}
                          </span>
                          <span className="block text-xs text-text-tertiary font-barlow mt-1">
                            {fmt(convert(loadedTotal))} {unit === "lb" ? "kg" : "lb"} · bar {fmt(barWeight)} {collars ? "+ collars" : ""}
                          </span>
                        </div>

                        {!exact && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            <button
                              type="button"
                              onClick={() => setTarget(fmt(loadedTotal))}
                              className="px-3 py-2 rounded-[10px] border border-border bg-surface-1 text-text-secondary hover:border-primary/50 font-barlow text-sm transition-colors"
                            >
                              Closest under: <strong className="text-foreground">{fmt(loadedTotal)} {unit}</strong>
                            </button>
                            {overTotal !== null && Math.abs(overTotal - targetNum) > 1e-9 && (
                              <button
                                type="button"
                                onClick={() => setTarget(fmt(overTotal))}
                                className="px-3 py-2 rounded-[10px] border border-border bg-surface-1 text-text-secondary hover:border-primary/50 font-barlow text-sm transition-colors"
                              >
                                Closest over: <strong className="text-foreground">{fmt(overTotal)} {unit}</strong>
                              </button>
                            )}
                          </div>
                        )}

                        <div className="space-y-2 mb-6">
                          {breakdown.length === 0 ? (
                            <p className="font-barlow text-text-secondary text-sm">
                              Empty bar. Add plates once your target clears{" "}
                              {fmt(floorWeight + 2 * plates[plates.length - 1])} {unit}.
                            </p>
                          ) : (
                            breakdown.map((b) => (
                              <div
                                key={b.plate}
                                className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-surface-1 border border-border-subtle"
                              >
                                <span className="font-barlow-condensed font-bold uppercase tracking-wide text-sm">
                                  {fmt(b.plate)} {unit} plate
                                </span>
                                <span className="font-barlow-condensed text-lg font-bold text-foreground">
                                  ×{b.count} per side
                                </span>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="rounded-[14px] border border-primary/30 bg-primary/5 p-4 mt-auto">
                          <LoadedBar
                            plates={breakdown}
                            barWeight={barWeight}
                            collars={collars}
                            unit={unit}
                          />
                          <p className="text-xs text-text-tertiary font-barlow text-center mt-2">
                            Load heaviest first, working out to the smallest plate.
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="font-barlow text-text-secondary">
                        Enter a target weight to see the plates.
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="font-barlow-condensed text-sm font-bold uppercase tracking-wide text-text-tertiary mb-4">
                      Tap each plate on the bar
                    </p>
                    <div className="text-center p-5 rounded-[14px] bg-surface-1 border border-primary/30 mb-5">
                      <span className="block font-barlow-condensed text-5xl md:text-6xl font-black text-primary">
                        {fmt(reverseTotal)}
                      </span>
                      <span className="block text-sm text-text-tertiary font-barlow uppercase tracking-wide mt-2">
                        {unit} total
                      </span>
                      <span className="block text-xs text-text-tertiary font-barlow mt-1">
                        {fmt(convert(reverseTotal))} {unit === "lb" ? "kg" : "lb"} · includes bar {fmt(barWeight)} {collars ? "and collars" : ""}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {plates.map((p, i) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => addPlate(i)}
                          className="relative py-3 rounded-[10px] border border-border bg-surface-1 text-text-secondary hover:border-primary/50 font-barlow-condensed font-bold text-lg transition-colors"
                        >
                          {fmt(p)}
                          <span className="block text-[10px] font-barlow font-normal uppercase tracking-wide text-text-tertiary">
                            per side
                          </span>
                          {counts[i] > 0 && (
                            <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-primary text-background text-xs font-barlow font-bold flex items-center justify-center">
                              {counts[i]}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={resetPlates}
                      className="inline-flex items-center justify-center gap-2 py-3 rounded-[10px] border border-border bg-surface-1 text-text-secondary hover:border-primary/50 font-barlow-condensed font-bold uppercase tracking-wide transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      Reset plates
                    </button>
                  </>
                )}
              </div>
            </div>

            <p className="max-w-5xl mx-auto text-sm text-text-tertiary font-barlow mt-5 leading-relaxed">
              Methodology: plates per side equals your target minus the bar and
              collars, divided by two, then filled heaviest first from the
              standard plate set (45, 35, 25, 10, 5, 2.5 lb or 25, 20, 15, 10,
              5, 2.5, 1.25 kg). Largest-first loading uses the fewest plates
              for these sets. Collars add 2.5 per side when switched on.
              Conversion uses 1 kg = 2.20462 lb. Some targets have no exact
              plate combination, so the calculator checks every loadable total
              and offers the nearest options above and below.
            </p>
          </div>
        </section>

        <ToolSection heading="Why everyone miscounts" accent="at the bar">
          <p>
            Plate math fails because the total hides three separate numbers.
            The bar contributes its own weight before a single plate goes on.
            Each side of the bar then carries half of whatever remains. When a
            coach calls out 285, your head has to subtract 45, split 240 in
            two, and translate 120 per side into plates, all while you catch
            your breath between sets.
          </p>
          <p>
            Experienced lifters skip the arithmetic entirely. They memorize a
            handful of anchor loads and count plates instead of pounds. Two
            plates a side on a pound bar is 225. Three plates is 315. Add a 25
            to three plates and you have 365. Learning five or six of these
            anchors covers most working weights, and this calculator fills in
            everything between them.
          </p>
        </ToolSection>

        <ToolSection heading="Kilos and pounds build" accent="different bars">
          <p>
            A kilogram plate set and a pound plate set produce different
            numbers for the same visual load. Two red plates a side reads as
            225 lb on an American bar and 100 kg, roughly 220 lb, on a
            competition kilo bar. The gap widens as the bar gets heavier, so
            four plates a side means 405 lb in one gym and 180 kg, about 397
            lb, in another.
          </p>
          <p>
            Powerlifting federations compete in kilos, which is why meet
            attempts often look like odd numbers to pound-trained lifters.
            When you move between gyms or follow a program written in the
            other system, convert the total first and load from the plate set
            in front of you. Loading 100 kg worth of pound plates lands you at
            220.5 lb, and chasing round numbers in the wrong unit adds weight
            you never planned to lift.
          </p>
        </ToolSection>

        <FAQSection
          title="Plate Math Questions"
          subtitle="Common questions about loading the bar"
          questions={faqs}
          includeSchema={false}
        />

        <RelatedTools current="barbell-plate-calculator" />

        <ToolCTA
          headline="Forge keeps the bar math"
          headlineAccent="ready for you."
          subline="Log a lift in Forge and the app tracks every set, remembers your plates, and queues up the next weight before you walk back to the rack."
          utmContent="barbell-plate-calculator"
        />
      </main>
    </div>
  );
}
