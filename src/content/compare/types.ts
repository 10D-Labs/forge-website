export interface ComparisonRow {
  dimension: string;
  forge: string;
  them: string;
  winner: "forge" | "them" | "tie";
}

export interface ComparisonPoint {
  title: string;
  body: string;
}

export interface PriceLine {
  label: string;
  value: string;
}

export interface Competitor {
  slug: string;
  name: string;
  /** Short category label shown on the hub card, e.g. "AI workout generator" */
  category: string;
  /** Hub grouping: which section of /compare this belongs to */
  group: "ai" | "human" | "tracker";
  /** One-liner for the hub card */
  hubTagline: string;
  /** Shown under the "Forge vs X" H1 */
  heroSubtitle: string;
  /** The verdict section, 2-4 paragraphs */
  verdict: string[];
  rows: ComparisonRow[];
  theirWins: ComparisonPoint[];
  forgeWins: ComparisonPoint[];
  theirPricing: PriceLine[];
  theirPricingNote: string;
  whoShouldPickThem: string[];
  whoShouldPickForge: string[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const GROUP_LABELS: Record<Competitor["group"], string> = {
  ai: "AI coaching apps",
  human: "Human coaching apps",
  tracker: "Workout trackers",
};

export const FORGE_PRICING: PriceLine[] = [
  { label: "Weekly", value: "$6.99" },
  { label: "Monthly", value: "$19.99" },
  { label: "Yearly", value: "$59.99" },
];

export const FORGE_PRICING_NOTE =
  "7-day free trial on the yearly plan. Cancel anytime. Every plan includes all four trainers, adaptive programming, logging, and 24/7 chat.";
