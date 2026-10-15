import type { ServiceRouteKey } from "@/content/services/nav";
import type { Locale } from "@/i18n/routes";

/** Long-form content is data, not Markdown: the layout decides how each block looks. */
export type CaseBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

/** Fixed section order of a case study. Headings live in `labels.ts`. */
export const CASE_SECTION_IDS = [
  "context",
  "challenge",
  "role",
  "constraints",
  "process",
  "decisions",
  "solution",
  "tools",
  "delivered",
] as const;
export type CaseSectionId = (typeof CASE_SECTION_IDS)[number];
export type CaseSections = Record<CaseSectionId, CaseBlock[]>;

export type CaseImage = { src: string; width: number; height: number };

/** Only facts the approved copy states. Each field is shown in the sidebar when set. */
export type CaseMeta = {
  role: string;
  years?: string;
  since?: string;
  market?: string;
  location?: string;
  platform?: string;
  kind?: string;
  service?: string;
};

export type CaseLink = {
  label: string;
  href: string;
  /** Short caveat shown under the link. */
  note?: string;
};

export type CaseCopy = {
  cardTitle: string;
  cardSummary: string;
  /** Without the " | Francisco Sixto" suffix (added by the title template). */
  seoTitle: string;
  seoDescription: string;
  h1: string;
  heroAlt: string;
  logoAlt?: string;
  meta: CaseMeta;
  links?: CaseLink[];
  sections: CaseSections;
};

export type CaseStudy = {
  slug: string;
  hero: CaseImage;
  logo?: CaseImage;
  /** Service route the case supports, or "about" when there is none. */
  relatedService: ServiceRouteKey | "about";
  secondaryService?: ServiceRouteKey;
} & Record<Locale, CaseCopy>;
