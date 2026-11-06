import { describe, expect, it } from "vitest";
import { buildAlternates, liveRouteKeys, localizedPath, locales, matchRoute } from "@/i18n/routes";
import { EMAIL } from "@/content/site";
import { FOOTER } from "@/content/footer";
import { contactContent } from "./contact";
import { privacyContent } from "./privacy";
import { getStaticPageMetadata } from "@/i18n/seo";

const allText = (locale: (typeof locales)[number]) => JSON.stringify(privacyContent[locale]);

describe("privacy route", () => {
  it("maps to /privacidad and /en/privacy and is live", () => {
    expect(localizedPath("privacy", "es")).toBe("/privacidad");
    expect(localizedPath("privacy", "en")).toBe("/en/privacy");
    expect(matchRoute("/privacidad")?.key).toBe("privacy");
    expect(matchRoute("/en/privacy")?.key).toBe("privacy");
    expect(liveRouteKeys()).toContain("privacy");
  });

  it("has canonical and hreflang alternates, and is indexable", () => {
    expect(buildAlternates("privacy", "es").canonical).toBe("https://www.fransixto.com.ar/privacidad");
    const m = getStaticPageMetadata("privacy", "en");
    expect(m.alternates?.canonical).toBe("https://www.fransixto.com.ar/en/privacy");
    expect(m.robots).toBeUndefined();
  });
});

describe("privacy content", () => {
  it("has both locales, a dated update and non-empty sections", () => {
    for (const locale of locales) {
      const c = privacyContent[locale];
      expect(c.h1.length).toBeGreaterThan(0);
      expect(c.updated.iso).toBe("2026-11-05");
      expect(c.sections.length).toBeGreaterThanOrEqual(10);
      for (const s of c.sections) {
        expect(s.heading.length).toBeGreaterThan(0);
        expect(s.paragraphs.length + s.items.length).toBeGreaterThan(0);
      }
    }
    expect(privacyContent.es.sections).toHaveLength(privacyContent.en.sections.length);
  });

  it("states the verified facts in both languages", () => {
    for (const locale of locales) {
      const t = allText(locale);
      for (const needle of [
        "Francisco Sixto", "Córdoba", "25.326", "AAIP", "reCAPTCHA", "WhatsApp",
        "Vercel", "Google Analytics", "Google Ads", "Gmail", "nodemailer",
      ]) expect(t, `${locale} ${needle}`).toContain(needle);
      expect(t).not.toContain(EMAIL); // the address is injected at render time, not hardcoded
    }
  });

  it("uses an email placeholder in the rights section instead of a literal address", () => {
    for (const locale of locales) expect(allText(locale)).toContain("{email}");
  });

  it("does not claim certifications, DPO, registrations or GDPR compliance", () => {
    for (const locale of locales)
      expect(allText(locale)).not.toMatch(/ISO ?27001|SOC ?2|certificad|certified|DPO|delegado de protecci|data protection officer|cumplimos con el RGPD|GDPR[- ]compliant|fully compliant/i);
  });
});

describe("privacy links", () => {
  it("is linked from the footer and the contact note in both locales", () => {
    for (const locale of locales) {
      expect(FOOTER[locale].privacyLabel.length).toBeGreaterThan(0);
      expect(contactContent[locale].privacyLinkLabel.length).toBeGreaterThan(0);
    }
  });

  it("keeps the contact note consistent with the policy (no list, no sale)", () => {
    expect(contactContent.es.privacyNote).toMatch(/responderte/);
    expect(contactContent.en.privacyNote).toMatch(/reply/);
    for (const locale of locales) expect(contactContent[locale].privacyNote).not.toMatch(/no los comparto|don't share them/i);
  });
});

describe("privacy Meta Pixel disclosure", () => {
  it("names the Meta Pixel and Meta Platforms in both languages", () => {
    for (const locale of locales) {
      const t = allText(locale);
      expect(t, locale).toContain("Meta Pixel");
      expect(t, locale).toContain("Meta Platforms");
    }
  });

  it("covers purposes, no personal data sent and how to manage it", () => {
    expect(allText("es")).toMatch(/audiencias/);
    expect(allText("es")).toMatch(/preferencias de anuncios de Meta/i);
    expect(allText("es")).toMatch(/nombres, emails ni (el )?contenido de los mensajes/);
    expect(allText("en")).toMatch(/audiences/);
    expect(allText("en")).toMatch(/Meta ad preferences/i);
    expect(allText("en")).toMatch(/names, emails or message contents/);
  });

  it("mentions Meta Platforms in the international transfers section", () => {
    for (const locale of locales) {
      const s = privacyContent[locale].sections.find((x) => /transfer|Transferencias/i.test(x.heading));
      expect(JSON.stringify(s), locale).toContain("Meta Platforms");
    }
  });
});
