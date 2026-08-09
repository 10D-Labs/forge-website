import Link from "next/link";
import { Check, ArrowRight, Calculator } from "lucide-react";
import { GlowOrbs } from "@/components/effects";
import { tools, type ToolEntry } from "@/content/tools";

interface ToolHeroProps {
  titleBefore: string;
  titleAccent: string;
  description: string;
}

export function ToolHero({ titleBefore, titleAccent, description }: ToolHeroProps) {
  return (
    <section
      className="relative py-14 md:py-20 bg-surface-0 overflow-hidden"
      aria-labelledby="tool-heading"
    >
      <GlowOrbs variant="hero" />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4">
            Free Tool
          </p>
          <h1
            id="tool-heading"
            className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none mb-6"
          >
            {titleBefore} <span className="text-primary text-neon">{titleAccent}</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary font-barlow max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

interface ToolSectionProps {
  heading: string;
  accent?: string;
  children: React.ReactNode;
}

export function ToolSection({ heading, accent, children }: ToolSectionProps) {
  return (
    <section className="py-14 md:py-20 bg-surface-0 border-t border-border-subtle">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-5">
            {heading} {accent && <span className="text-primary text-neon">{accent}</span>}
          </h2>
          <div className="space-y-4 text-text-secondary font-barlow leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ToolCTAProps {
  headline: string;
  headlineAccent: string;
  subline: string;
  utmContent: string;
}

export function ToolCTA({ headline, headlineAccent, subline, utmContent }: ToolCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-surface-1 border-t border-border-subtle relative overflow-hidden">
      <GlowOrbs variant="section" />
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-6">
            {headline} <span className="text-primary text-neon">{headlineAccent}</span>
          </h2>
          <p className="text-lg text-text-secondary font-barlow mb-8">{subline}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <a
              href={`https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?pt=128493451&ct=${utmContent}&mt=8`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Forge on the App Store"
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
              href={`https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=website&utm_medium=badge&utm_campaign=organic&utm_content=${utmContent}`}
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
              <span>7-day free trial</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>$59.99/year</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Cancel anytime</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function RelatedTools({ current }: { current: string }) {
  const others = tools.filter((t: ToolEntry) => t.slug !== current);
  return (
    <section className="py-14 md:py-20 bg-surface-1 border-t border-border-subtle">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-3">
            More free <span className="text-primary text-neon">lifting tools</span>
          </h2>
          <p className="text-text-secondary font-barlow mb-8">
            All free, all ungated, all built to work on your phone between sets.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group p-5 rounded-[20px] border border-border bg-surface-2 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="font-barlow-condensed text-xs font-bold uppercase tracking-wider text-primary">
                    Free tool
                  </span>
                </div>
                <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-1 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-text-tertiary font-barlow leading-snug">
                  {tool.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ToolCardLink({ tool }: { tool: ToolEntry }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group p-6 rounded-[20px] border border-border bg-surface-2 hover:border-primary/50 transition-colors flex flex-col"
    >
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="font-barlow-condensed text-xs font-bold uppercase tracking-wider text-primary">
          Free tool
        </span>
      </div>
      <h3 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-2 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>
      <p className="text-sm text-text-secondary font-barlow leading-relaxed mb-4 flex-1">
        {tool.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tool.keywords.map((k) => (
          <span
            key={k}
            className="px-2 py-1 rounded-[8px] bg-surface-1 border border-border-subtle text-xs text-text-tertiary font-barlow"
          >
            {k}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-1.5 font-barlow-condensed text-sm font-bold uppercase tracking-wider text-primary">
        Open tool
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
