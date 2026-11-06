import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { FOOTER } from "@/content/footer";
import { NAV_ITEMS } from "@/components/common/navItems";
import {
  alternatePath,
  buildAlternates,
  indexableRouteKeys,
  liveRouteKeys,
  localizedPath,
  locales,
  matchRoute,
  routes,
  SITE_URL,
  type RouteDef,
} from "@/i18n/routes";
import { getStaticPageMetadata } from "@/i18n/seo";
import { thanksContent } from "./thanks";

const TU_FORMS =
  /\b(tienes|puedes|quieres|buscas|eres|necesitas|sabes|haces|escribe|contáctame|cuéntame|siéntete|únete)\b/i;
const text = (locale: (typeof locales)[number]) => JSON.stringify(thanksContent[locale]);

describe("thanks route", () => {
  it("maps to /gracias and /en/thanks, both ways, and switches language", () => {
    expect(localizedPath("thanks", "es")).toBe("/gracias");
    expect(localizedPath("thanks", "en")).toBe("/en/thanks");
    expect(matchRoute("/gracias")?.key).toBe("thanks");
    expect(matchRoute("/en/thanks")?.key).toBe("thanks");
    expect(alternatePath("/gracias", "en")).toBe("/en/thanks");
    expect(alternatePath("/en/thanks", "es")).toBe("/gracias");
  });

  it("is live (built) but unlisted: never offered to indexes", () => {
    expect((routes.thanks as RouteDef).unlisted).toBe(true);
    expect(liveRouteKeys()).toContain("thanks");
    expect(indexableRouteKeys()).not.toContain("thanks");
    expect(indexableRouteKeys()).toContain("privacy");
  });

  it("is absent from the sitemap in both locales", () => {
    const urls = sitemap().flatMap((e) => [e.url, ...Object.values(e.alternates?.languages ?? {})]).filter((u): u is string => typeof u === "string");
    expect(urls.filter((u) => /gracias|thanks/.test(u))).toEqual([]);
    expect(urls).toContain(`${SITE_URL}/privacidad`);
  });

  it("is not blocked in robots.txt, so Google can read the noindex", () => {
    const rules = robots().rules;
    const list = Array.isArray(rules) ? rules : [rules];
    for (const r of list) {
      const dis = ([] as string[]).concat(r.disallow ?? []);
      expect(dis.filter((d) => /gracias|thanks|^\/$/.test(d))).toEqual([]);
    }
  });

  it("is not linked from the header nav or the footer", () => {
    expect(NAV_ITEMS.map((i) => i.route)).not.toContain("thanks");
    expect(JSON.stringify(FOOTER)).not.toMatch(/gracias|thanks/);
  });
});

describe("thanks metadata", () => {
  it("is noindex,follow in both locales with consistent canonical/hreflang", () => {
    for (const locale of locales) {
      const m = getStaticPageMetadata("thanks", locale);
      expect(m.robots).toEqual({ index: false, follow: true });
      expect(m.alternates?.canonical).toBe(buildAlternates("thanks", locale).canonical);
      expect(Object.keys(m.alternates?.languages ?? {}).sort()).toEqual(["en", "es", "x-default"]);
    }
    expect(getStaticPageMetadata("thanks", "es").alternates?.canonical).toBe(`${SITE_URL}/gracias`);
    expect(getStaticPageMetadata("thanks", "en").alternates?.canonical).toBe(`${SITE_URL}/en/thanks`);
  });

  it("keeps other static pages indexable", () => {
    expect(getStaticPageMetadata("privacy", "es").robots).toBeUndefined();
  });
});

describe("thanks content", () => {
  it("exists in both locales with the same shape", () => {
    for (const l of locales) {
      expect(thanksContent[l].h1.length).toBeGreaterThan(0);
      expect(thanksContent[l].steps).toHaveLength(3);
      expect(thanksContent[l].whatsapp.label.length).toBeGreaterThan(0);
      expect(thanksContent[l].projectsCta.length).toBeGreaterThan(0);
    }
  });

  it("uses the agreed Spanish copy in voseo", () => {
    const c = thanksContent.es;
    expect(c.h1).toBe("¡Gracias! Ya recibí tu consulta.");
    expect(c.lead).toBe("Te respondo en menos de 24 horas.");
    expect(c.whatsapp.label).toBe("Escribime por WhatsApp");
    expect(c.projectsCta).toBe("Ver proyectos");
    expect(text("es")).not.toMatch(TU_FORMS);
  });

  it("has no prices, technology names or emoji", () => {
    for (const l of locales) {
      expect(text(l)).not.toMatch(/USD|\bARS\b|\$\s?\d|React|Next\.?js|Figma|TypeScript|WordPress/i);
      expect(text(l)).not.toMatch(/\p{Extended_Pictographic}/u);
    }
  });
});

describe("thanks screen tracking", () => {
  it("fires no event on load: only TrackedLink clicks", () => {
    const src = readFileSync("src/screens/ThanksScreen.tsx", "utf8");
    expect(src).not.toMatch(/trackEvent|contact_submit|"Lead"|fbq|gtag|useEffect/);
    expect(src).toMatch(/TrackedLink/);
    expect(src).toMatch(/placement="thanks"/);
    expect(src).not.toMatch(/Breadcrumbs/);
  });
});
