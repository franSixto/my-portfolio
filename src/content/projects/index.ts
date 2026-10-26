// Case studies: structured, typed, server-only content (es + en per case).
import type { Locale } from "@/i18n/routes";
import { apexAmerica } from "./apexAmerica";
import { autocityGrupoTagle } from "./autocityGrupoTagle";
import { bienestarSenior } from "./bienestarSenior";
import { consultoraPrisma } from "./consultoraPrisma";
import { deepCreekSolutions } from "./deepCreekSolutions";
import { ortopediaParaTi } from "./ortopediaParaTi";
import { rexia } from "./rexia";
import { viveroYvyra } from "./viveroYvyra";
import { officinaArtis } from "./officinaArtis";
import { sixtoVanGarret } from "./sixtoVanGarret";
import { startUniversity } from "./startUniversity";
import type { CaseCopy, CaseStudy } from "./types";

/** Display order of the projects list. */
export const CASE_STUDIES: readonly CaseStudy[] = [
  startUniversity,
  rexia,
  deepCreekSolutions,
  autocityGrupoTagle,
  bienestarSenior,
  ortopediaParaTi,
  consultoraPrisma,
  viveroYvyra,
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

/** Titles and slugs of the cases a study points to, ready to render as links. */
export function getRelatedCases(slug: string, locale: Locale): { slug: string; title: string }[] {
  const study = getCaseStudy(slug);
  return (study?.relatedCases ?? []).flatMap((related) => {
    const copy = getCaseCopy(related, locale);
    return copy ? [{ slug: related, title: copy.cardTitle }] : [];
  });
}

export type { CaseBlock, CaseCopy, CaseStudy } from "./types";
