// Server-side data loaders. JSON is statically imported so it is bundled at
// build time (no runtime fs access, no relative fetch).
import esCommon from "../../public/locales/es/common.json";
import enCommon from "../../public/locales/en/common.json";
import esProjects from "../../public/locales/es/projects.json";
import enProjects from "../../public/locales/en/projects.json";
import type { Project } from "@/types/project";
import { defaultLocale, type Locale } from "./routes";
import { mergeWithFallback, translate, type TranslationData } from "./translate";

const common: Record<Locale, TranslationData> = {
  es: esCommon as TranslationData,
  en: enCommon as TranslationData,
};

const projects: Record<Locale, Project[]> = {
  es: esProjects as Project[],
  en: enProjects as Project[],
};

/** Full dictionary for a locale, with gaps filled from the default locale. */
export function getDictionary(locale: Locale): TranslationData {
  return locale === defaultLocale
    ? common[defaultLocale]
    : mergeWithFallback(common[locale], common[defaultLocale]);
}

export function getTranslator(locale: Locale) {
  const dictionary = getDictionary(locale);
  return (key: string) => translate(dictionary, key);
}

export function getProjects(locale: Locale): Project[] {
  const list = projects[locale];
  return list && list.length > 0 ? list : projects[defaultLocale];
}

export function getProject(slug: string, locale: Locale): Project | null {
  return (
    getProjects(locale).find((p) => p.slug === slug) ?? null
  );
}

export function getProjectSlugs(): string[] {
  return projects[defaultLocale].map((p) => p.slug ?? p.id);
}
