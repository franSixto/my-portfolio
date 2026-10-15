import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { liveRouteKeys, routes, SITE_URL } from "@/i18n/routes";

const serviceKeys = [
  "serviceUxUi",
  "serviceWebDevelopment",
  "serviceWebDesign",
  "serviceAiMvp",
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
});
