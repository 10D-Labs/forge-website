import type { Competitor } from "./types";
import fitbod from "./fitbod";
import zing from "./zing";
import freeletics from "./freeletics";
import juggernautai from "./juggernautai";
import rpHypertrophy from "./rp-hypertrophy";
import drMuscle from "./dr-muscle";
import caliber from "./caliber";
import ladder from "./ladder";
import hevy from "./hevy";
import strong from "./strong";
import jefit from "./jefit";
import boostcamp from "./boostcamp";

export const competitors: Competitor[] = [
  fitbod,
  zing,
  freeletics,
  juggernautai,
  rpHypertrophy,
  drMuscle,
  caliber,
  ladder,
  hevy,
  strong,
  jefit,
  boostcamp,
];

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}

export * from "./types";
