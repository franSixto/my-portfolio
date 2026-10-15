import type { Metadata } from "next";
import { SITE_URL, absoluteUrl, localizedPath, type Locale } from "@/i18n/routes";
import { SITE_NAME, buildPageMetadata } from "@/i18n/seo";
import { getServiceContent } from "./index";
import type { ServiceRouteKey } from "./nav";

export function getServiceMetadata(key: ServiceRouteKey, locale: Locale): Metadata {
  const c = getServiceContent(key, locale);
  return buildPageMetadata({
    locale,
    route: key,
    title: c.seoTitle,
    description: c.seoDescription,
  });
}

const AREA_SERVED: Record<Locale, { "@type": string; name: string }[]> = {
  es: [
    { "@type": "Country", name: "Argentina" },
    { "@type": "Place", name: "Latinoamérica" },
  ],
  en: [{ "@type": "Place", name: "Worldwide" }],
};

type JsonLdNode = Record<string, unknown> & { "@type": string };

/** Service (+ FAQPage, since FAQs are rendered visibly) for a service page. */
export function buildServiceJsonLd(key: ServiceRouteKey, locale: Locale) {
  const c = getServiceContent(key, locale);
  const url = absoluteUrl(localizedPath(key, locale));

  const service: JsonLdNode = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: c.h1,
    serviceType: c.serviceType,
    description: c.seoDescription,
    url,
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: AREA_SERVED[locale],
  };
  if (c.price) {
    service.offers = {
      "@type": "Offer",
      url,
      description: c.price.label,
      price: String(c.price.amountUsd),
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: c.price.amountUsd,
      },
    };
  }

  const nodes: JsonLdNode[] = [service];
  if (c.faqs.length > 0) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      name: `${SITE_NAME}: ${c.seoTitle}`,
      inLanguage: locale,
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": nodes };
}
