import type { Metadata } from "next";
import { getTranslator } from "./dictionary";
import {
  SITE_URL,
  absoluteUrl,
  buildAlternates,
  localizedPath,
  type Locale,
  type RouteKey,
  type RouteParams,
} from "./routes";

export const SITE_NAME = "Francisco Sixto";
export const PERSON_JOB_TITLE = "UX/UI & Product Designer";
// Only profile links that already exist in the codebase.
export const SAME_AS = ["https://www.linkedin.com/in/sixtofrancisco/"];

const OG_LOCALE: Record<Locale, string> = { es: "es_AR", en: "en_US" };
const OG_IMAGE = {
  url: "/meta-image.jpg",
  width: 1200,
  height: 630,
  alt: "Francisco Sixto Portfolio",
};

/** Defaults shared by every page of a locale (set in the root layout). */
export function buildRootMetadata(locale: Locale): Metadata {
  const t = getTranslator(locale);
  const description = t("home.hero.description");
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | ${t("home.hero.title")}`,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    openGraph: {
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      images: [OG_IMAGE.url],
    },
  };
}

type PageMetadataInput = {
  locale: Locale;
  route: RouteKey;
  params?: RouteParams;
  title: string;
  description: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
};

/**
 * Per-page metadata. Next shallow-merges `openGraph`, so the full OG object
 * (site name, locale, image) is repeated here instead of relying on the layout.
 */
export function buildPageMetadata({
  locale,
  route,
  params,
  title,
  description,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const alternates = buildAlternates(route, locale, params);
  return {
    title,
    description,
    alternates,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === "es" ? "en" : "es"],
      type,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata for the static pages whose copy lives in common.json. */
export function getStaticPageMetadata(
  route: "home" | "about" | "projects" | "contact",
  locale: Locale
): Metadata {
  const t = getTranslator(locale);
  const copy = {
    home: { title: t("home.hero.title"), description: t("home.hero.description") },
    about: { title: t("pages.about.title"), description: t("pages.about.description") },
    projects: { title: t("pages.projects.title"), description: t("pages.projects.description") },
    contact: { title: t("pages.contact.title"), description: t("pages.contact.description") },
  }[route];
  const metadata = buildPageMetadata({ locale, route, ...copy });
  // The root layout's title template does not apply to a page in the same
  // segment (home), so set the full title explicitly.
  return route === "home"
    ? { ...metadata, title: { absolute: `${copy.title} | ${SITE_NAME}` } }
    : metadata;
}

/** Person + WebSite structured data for the layout. */
export function buildSiteJsonLd(locale: Locale) {
  const homeUrl = absoluteUrl(localizedPath("home", locale));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: PERSON_JOB_TITLE,
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        name: SITE_NAME,
        url: homeUrl,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

/** Serialize JSON-LD safely for inline <script> (escape `<`). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
