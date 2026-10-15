// Server-side UI dictionary loader. JSON is statically imported so it is bundled
// at build time (no runtime fs access, no relative fetch). Case studies live in
// src/content/projects.
import esCommon from "../../public/locales/es/common.json";
import enCommon from "../../public/locales/en/common.json";
import { defaultLocale, type Locale } from "./routes";
import { mergeWithFallback, translate, type TranslationData } from "./translate";

const common: Record<Locale, TranslationData> = {
  es: esCommon as TranslationData,
  en: enCommon as TranslationData,
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
