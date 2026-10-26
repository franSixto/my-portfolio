import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { getCaseSlugs } from "@/content/projects";
import { LEGACY_PROJECT_SLUGS } from "@/i18n/redirects";
import { SOLUTION_ROUTE_KEYS } from "@/content/services/nav";
import { liveRouteKeys, routes, SITE_URL } from "@/i18n/routes";

const serviceKeys = [
  "serviceUxUi",
  "serviceWebDevelopment",
  "serviceWebDesign",
  "serviceAiMvp",
  "serviceGraphicDesign",
] as const;

describe("service routes", () => {
  it("are no longer pending", () => {
    for (const key of serviceKeys) {
      expect("pending" in routes[key]).toBe(false);
      expect(liveRouteKeys()).toContain(key);
    }
  });
});

describe("sitemap", () => {
  const entries = sitemap();

  it("lists every solution page in both locales with hreflang alternates", () => {
    for (const key of SOLUTION_ROUTE_KEYS) {
      for (const locale of ["es", "en"] as const) {
        const url = `${SITE_URL}${routes[key][locale]}`;
        const entry = entries.find((e) => e.url === url);
        expect(entry, url).toBeDefined();
        expect(entry?.alternates?.languages).toMatchObject({
          es: `${SITE_URL}${routes[key].es}`,
          en: `${SITE_URL}${routes[key].en}`,
          "x-default": `${SITE_URL}${routes[key].es}`,
        });
      }
    }
  });

  it("lists the services hub in both locales with hreflang alternates", () => {
    expect("pending" in routes.services).toBe(false);
    for (const locale of ["es", "en"] as const) {
      const entry = entries.find((e) => e.url === `${SITE_URL}${routes.services[locale]}`);
      expect(entry, locale).toBeDefined();
      expect(entry?.alternates?.languages).toMatchObject({
        es: `${SITE_URL}/servicios`,
        en: `${SITE_URL}/en/services`,
        "x-default": `${SITE_URL}/servicios`,
      });
    }
  });

  it("lists every service in both locales with hreflang alternates", () => {
    for (const key of serviceKeys) {
      for (const locale of ["es", "en"] as const) {
        const url = `${SITE_URL}${routes[key][locale]}`;
        const entry = entries.find((e) => e.url === url);
        expect(entry, url).toBeDefined();
        expect(entry?.alternates?.languages).toMatchObject({
          es: `${SITE_URL}${routes[key].es}`,
          en: `${SITE_URL}${routes[key].en}`,
          "x-default": `${SITE_URL}${routes[key].es}`,
        });
      }
    }
  });

  it("lists every case study in both locales and none of the retired slugs", () => {
    const urls = entries.map((e) => e.url);
    for (const slug of getCaseSlugs())
      for (const base of [`${SITE_URL}/proyectos`, `${SITE_URL}/en/projects`])
        expect(urls, `${base}/${slug}`).toContain(`${base}/${slug}`);
    for (const old of Object.keys(LEGACY_PROJECT_SLUGS))
      expect(urls.filter((u) => u.includes(old)), old).toEqual([]);
  });
});
