import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import StoreLinks from "@/components/home/StoreLinks";
import { pricing, pricingSummary } from "@/content/pricing";
import { tools, type ToolEntry } from "@/content/tools";

interface ToolHeroProps {
  titleBefore: string;
  titleAccent: string;
  description: string;
}

export function ToolHero({ titleBefore, titleAccent, description }: ToolHeroProps) {
  return <PageIntro eyebrow="Free workout calculator" title={titleBefore} accent={titleAccent} description={description} id="tool-heading" />;
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
  return <section className="resource-cta section-space">
    <div className="site-width resource-cta-grid">
      <div><p className="eyebrow"><span className="status-dot" /> Your next workout</p><h2>{headline}<br /><span>{headlineAccent}</span></h2><p className="resource-cta-description">{subline}</p></div>
      <div className="resource-cta-download"><p>{pricing.trialDays}-day free trial.</p><StoreLinks placement={utmContent} /><small>{pricingSummary}</small></div>
    </div>
  </section>;
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
                className="resource-card group p-5 rounded-[20px] border border-border bg-surface-2 hover:border-primary/50 transition-colors"
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
      className="resource-card group p-6 rounded-[20px] border border-border bg-surface-2 hover:border-primary/50 transition-colors flex flex-col"
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
