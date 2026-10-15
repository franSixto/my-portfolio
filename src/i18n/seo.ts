import type { Metadata } from "next";
import { getTranslator } from "./dictionary";
import { serializeJsonLd } from "./jsonLd";
import {
  SITE_URL,
  absoluteUrl,
  buildAlternates,
  localizedPath,
  type Locale,
  type RouteKey,
  type RouteParams,
} from "./routes";
import { GITHUB_URL, LINKEDIN_URL, SITE_META } from "@/content/site";
import { aboutContent } from "@/content/pages/about";
import { contactContent } from "@/content/pages/contact";
import { homeContent } from "@/content/pages/home";
import { servicesHubContent } from "@/content/pages/servicesHub";

export { serializeJsonLd };

export const SITE_NAME = "Francisco Sixto";
export const SAME_AS = [LINKEDIN_URL, GITHUB_URL];

const OG_LOCALE: Record<Locale, string> = { es: "es_AR", en: "en_US" };

function ogImage(locale: Locale) {
  return {
    url: "/meta-image.jpg",
    width: 1200,
    height: 630,
    alt: SITE_META[locale].ogAlt,
  };
}

/** Defaults shared by every page of a locale (set in the root layout). */
export function buildRootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: homeContent[locale].seo.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_META[locale].description,
    openGraph: {
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
      images: [ogImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage(locale).url],
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
  /** Title already contains the site name: skip the layout's title template. */
  absoluteTitle?: boolean;
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
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const alternates = buildAlternates(route, locale, params);
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates,
    openGraph: {
      title: socialTitle,
      description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === "es" ? "en" : "es"],
      type,
      images: [ogImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage(locale).url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export type StaticPageRoute = "home" | "services" | "about" | "projects" | "contact";

/** Title + description of the static pages (copy lives in src/content/pages). */
export function getStaticPageSeo(
  route: StaticPageRoute,
  locale: Locale
): { title: string; description: string } {
  switch (route) {
    case "home":
      return homeContent[locale].seo;
    case "services":
      return servicesHubContent[locale].seo;
    case "about":
      return aboutContent[locale].seo;
    case "contact":
      return contactContent[locale].seo;
    case "projects": {
      // Still dictionary-backed until the case-study copy lands.
      const t = getTranslator(locale);
      return { title: t("pages.projects.title"), description: t("pages.projects.description") };
    }
  }
}

export function getStaticPageMetadata(route: StaticPageRoute, locale: Locale): Metadata {
  return buildPageMetadata({
    locale,
    route,
    ...getStaticPageSeo(route, locale),
    // The home title is written in full (it already carries the site name).
    absoluteTitle: route === "home",
  });
}

/** Person + WebSite structured data for the layout. */
export function buildSiteJsonLd(locale: Locale) {
  const homeUrl = absoluteUrl(localizedPath("home", locale));
  const meta = SITE_META[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: meta.jobTitle,
        description: meta.personDescription,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Córdoba",
          addressCountry: "AR",
        },
        knowsAbout: meta.knowsAbout,
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
