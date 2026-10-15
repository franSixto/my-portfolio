// Case studies: structured, typed, server-only content (es + en per case).
import type { Locale } from "@/i18n/routes";
import { apexAmerica } from "./apexAmerica";
import { autocityGrupoTagle } from "./autocityGrupoTagle";
import { deepCreekSolutions } from "./deepCreekSolutions";
import { officinaArtis } from "./officinaArtis";
import { portfolioFransixto } from "./portfolioFransixto";
import { sixtoVanGarret } from "./sixtoVanGarret";
import { startUniversity } from "./startUniversity";
import type { CaseCopy, CaseStudy } from "./types";

/** Display order of the projects list. */
export const CASE_STUDIES: readonly CaseStudy[] = [
  startUniversity,
  deepCreekSolutions,
  autocityGrupoTagle,
  portfolioFransixto,
  sixtoVanGarret,
  officinaArtis,
  apexAmerica,
];

export function getCaseSlugs(): string[] {
  return CASE_STUDIES.map((study) => study.slug);
}

export function getCaseStudy(slug: string): CaseStudy | null {
  return CASE_STUDIES.find((study) => study.slug === slug) ?? null;
}

export function getCaseCopy(slug: string, locale: Locale): CaseCopy | null {
  return getCaseStudy(slug)?.[locale] ?? null;
}

export type { CaseBlock, CaseCopy, CaseStudy } from "./types";
