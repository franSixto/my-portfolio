import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locales, matchRoute, routes } from "@/i18n/routes";
import { getCaseSlugs } from "@/content/projects";
import { SITE_NAME } from "@/i18n/seo";
import { SERVICE_ROUTE_KEYS, SERVICE_NAV_LABELS } from "./nav";
import { serviceContent, getServiceContent } from "./index";
import type { ServicePageContent } from "./types";

const keys = SERVICE_ROUTE_KEYS;

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

describe("service content", () => {
  it("has es + en content for every service route", () => {
    for (const key of keys) {
      for (const locale of locales) {
        expect(getServiceContent(key, locale)).toBeDefined();
      }
    }
    expect(Object.keys(serviceContent).sort()).toEqual([...keys].sort());
  });

  it("has nav labels in both locales", () => {
    for (const key of keys)
      for (const locale of locales)
        expect(SERVICE_NAV_LABELS[locale][key].length).toBeGreaterThan(0);
  });

  it("has unique titles and descriptions within each locale", () => {
    for (const locale of locales) {
      const all = keys.map((k) => getServiceContent(k, locale));
      expect(new Set(all.map((c) => c.seoTitle)).size).toBe(keys.length);
      expect(new Set(all.map((c) => c.seoDescription)).size).toBe(keys.length);
      expect(new Set(all.map((c) => c.h1)).size).toBe(keys.length);
    }
  });

  it("keeps title <= 60 (including the site suffix) and description <= 155", () => {
    for (const key of keys)
      for (const locale of locales) {
        const c = getServiceContent(key, locale);
        expect(`${c.seoTitle} | ${SITE_NAME}`.length).toBeLessThanOrEqual(60);
        expect(c.seoDescription.length).toBeLessThanOrEqual(155);
        expect(c.seoDescription.length).toBeGreaterThan(80);
      }
  });

  it("only references projects that exist", () => {
    const slugs = getCaseSlugs();
    for (const key of keys)
      for (const locale of locales) {
        const c = getServiceContent(key, locale);
        expect(c.relatedProjectSlugs.length).toBeGreaterThan(0);
        for (const slug of c.relatedProjectSlugs) expect(slugs).toContain(slug);
      }
  });

  it("shows a price only on webDesign, in USD", () => {
    for (const key of keys)
      for (const locale of locales) {
        const c: ServicePageContent = getServiceContent(key, locale);
        if (key === "serviceWebDesign") {
          expect(c.price?.amountUsd).toBeGreaterThan(0);
          expect(c.price?.label).toMatch(/USD/);
          expect(c.price?.note.length).toBeGreaterThan(10);
        } else {
          expect(c.price).toBeUndefined();
        }
      }
    expect(getServiceContent("serviceWebDesign", "es").price?.label).toBe("Desde USD 600");
    expect(getServiceContent("serviceWebDesign", "en").price?.label).toBe("From USD 600");
  });

  it("has no unresolved placeholders, hourly rates or timelines", () => {
    for (const key of keys)
      for (const locale of locales) {
        const text = collectStrings(getServiceContent(key, locale)).join("\n");
        expect(text).not.toMatch(/\[?FALTA/);
        expect(text).not.toMatch(/\bTODO\b|lorem ipsum/);
        expect(text).not.toMatch(/\d+\s*(-|–|a|to)?\s*\d*\s*(semanas|meses|days|weeks|months|días)/i);
        expect(text).not.toMatch(/por hora|hourly|per hour/i);
        // No prices outside the one allowed service
        if (key !== "serviceWebDesign")
          expect(text).not.toMatch(/USD|\$\s?\d/);
      }
  });

  it("renders FAQs with non-empty questions and answers", () => {
    for (const key of keys)
      for (const locale of locales)
        for (const f of getServiceContent(key, locale).faqs) {
          expect(f.question.length).toBeGreaterThan(5);
          expect(f.answer.length).toBeGreaterThan(10);
        }
  });

  it("does not list a fixed MVP stack", () => {
    for (const locale of locales) {
      const text = collectStrings(getServiceContent("serviceAiMvp", locale)).join("\n");
      expect(text).not.toMatch(/Next\.js|React|Supabase|Firebase|WordPress/);
    }
  });
});

describe("es voseo consistency", () => {
  const TU_FORMS =
    /\b(tienes|puedes|quieres|buscas|eres|necesitas|sabes|haces|escribe|contáctame|cuéntame|siéntete|únete)\b/i;

  it("has no tú forms in es service content", () => {
    for (const key of keys) {
      const hits = collectStrings(getServiceContent(key, "es")).filter((t) => TU_FORMS.test(t));
      expect(hits, key).toEqual([]);
    }
  });

  it("has no tú forms in es common.json", () => {
    const raw = readFileSync("public/locales/es/common.json", "utf8");
    expect(collectStrings(JSON.parse(raw)).filter((t) => TU_FORMS.test(t))).toEqual([]);
  });
});

describe("graphic design service", () => {
  it("has localized routes that resolve in both locales", () => {
    expect([routes.serviceGraphicDesign.es, routes.serviceGraphicDesign.en]).toEqual([
      "/diseno-grafico-marca-ia",
      "/en/ai-graphic-brand-design",
    ]);
    expect(matchRoute("/diseno-grafico-marca-ia")).toEqual({
      key: "serviceGraphicDesign",
      locale: "es",
      params: {},
    });
    expect(matchRoute("/en/ai-graphic-brand-design")?.key).toBe("serviceGraphicDesign");
  });

  it("is listed last and uses Apex America as its only proof case", () => {
    expect(keys[keys.length - 1]).toBe("serviceGraphicDesign");
    for (const locale of locales)
      expect(getServiceContent("serviceGraphicDesign", locale).relatedProjectSlugs).toEqual(["apex-america"]);
  });

  it("links to its solutions' sibling services and has 4-6 FAQs", () => {
    for (const locale of locales) {
      const c = getServiceContent("serviceGraphicDesign", locale);
      expect(c.faqs.length).toBeGreaterThanOrEqual(4);
      expect(c.faqs.length).toBeLessThanOrEqual(6);
      expect(c.sections.some((s) => s.kind === "steps")).toBe(true);
    }
  });
});
