import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FEATURED_PROJECT_SLUGS } from "@/content/featuredProjects";
import { serviceContent } from "@/content/services";
import { SITE_NAME } from "@/i18n/seo";
import { locales, routes } from "@/i18n/routes";
import { CASE_STUDIES, getCaseCopy, getCaseSlugs, getCaseStudy, getRelatedCases } from "./index";
import { CASE_SECTION_IDS, OPTIONAL_SECTION_IDS } from "./types";
import { buildMetaItems } from "./meta";
import { PROJECTS_LABELS } from "./labels";

const EXPECTED_ORDER = [
  "start-university",
  "rexia",
  "deep-creek-solutions",
  "autocity-grupo-tagle",
  "bienestar-senior",
  "ortopedia-para-ti",
  "consultora-prisma",
  "vivero-yvyra",
  "deep-creek-branding",
  "portfolio-fransixto",
  "sixto-van-garret",
  "officina-artis",
  "apex-america",
];

const TU_FORMS =
  /\b(tienes|puedes|quieres|buscas|eres|necesitas|sabes|haces|escribe|contáctame|cuéntame|siéntete|únete)\b/i;
const EMOJI = /(?![©®])\p{Extended_Pictographic}/u;
const UNPUBLISHABLE = /MATERIAL PENDIENTE|FALTA|\bTODO\b|[Ll]orem ipsum|⚠|\bCONF\b/;
const REMOVED_CLAIMS =
  /aument[ée] las conversiones|aumento de la generaci[óo]n de leads|compromiso de los empleados|f[uú]nd[ée] y|alto impacto|vanguardia|I increased conversions|founded and led/i;

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

describe("case studies registry", () => {
  it("lists the thirteen cases in the approved order with unique slugs", () => {
    expect(getCaseSlugs()).toEqual(EXPECTED_ORDER);
    expect(new Set(getCaseSlugs()).size).toBe(CASE_STUDIES.length);
  });

  it("has es and en copy for every case", () => {
    for (const study of CASE_STUDIES)
      for (const locale of locales) {
        const copy = getCaseCopy(study.slug, locale);
        expect(copy, `${study.slug}.${locale}`).toBeDefined();
        expect(getCaseStudy(study.slug)?.slug).toBe(study.slug);
      }
    expect(getCaseStudy("nope")).toBeNull();
    expect(getCaseCopy("nope", "es")).toBeNull();
  });

  it("does not resolve the retired slugs", () => {
    for (const old of [
      "experience-at-startu",
      "experience-at-deep-creek",
      "experience-at-autocity",
      "experience-at-sixto-van-garret",
      "experience-at-apex",
    ])
      expect(getCaseStudy(old)).toBeNull();
  });

  it("fills every section in both locales, with matching shapes", () => {
    for (const study of CASE_STUDIES)
      for (const id of CASE_SECTION_IDS) {
        const es = study.es.sections[id] ?? [];
        const en = study.en.sections[id] ?? [];
        if ((OPTIONAL_SECTION_IDS as readonly string[]).includes(id) && es.length === 0) {
          expect(en.length, `${study.slug}.${id} optional parity`).toBe(0);
          continue;
        }
        expect(es.length, `${study.slug}.es.${id}`).toBeGreaterThan(0);
        expect(en.map((b) => b.type), `${study.slug}.${id}`).toEqual(es.map((b) => b.type));
        for (const [i, block] of es.entries()) {
          const other = en[i];
          if (block.type !== "p" && other.type !== "p")
            expect(other.items.length, `${study.slug}.${id}[${i}]`).toBe(block.items.length);
        }
      }
  });
});

describe("case studies SEO", () => {
  it("keeps titles <= 60 with the site suffix and descriptions <= 155", () => {
    for (const study of CASE_STUDIES)
      for (const locale of locales) {
        const c = study[locale];
        expect(`${c.seoTitle} | ${SITE_NAME}`.length, `${study.slug}.${locale} title`).toBeLessThanOrEqual(60);
        expect(c.seoDescription.length, `${study.slug}.${locale} description`).toBeLessThanOrEqual(155);
        expect(c.seoDescription.length).toBeGreaterThan(80);
        expect(c.cardTitle.length, `${study.slug}.${locale} cardTitle`).toBeLessThanOrEqual(60);
        expect(c.cardSummary.length, `${study.slug}.${locale} cardSummary`).toBeLessThanOrEqual(160);
        expect(c.h1.length).toBeGreaterThan(10);
      }
  });

  it("has unique titles, descriptions and h1 per locale", () => {
    for (const locale of locales) {
      const all = CASE_STUDIES.map((s) => s[locale]);
      for (const field of ["seoTitle", "seoDescription", "h1", "cardTitle"] as const)
        expect(new Set(all.map((c) => c[field])).size, `${locale}.${field}`).toBe(all.length);
    }
  });
});

describe("case studies copy hygiene", () => {
  const everything = CASE_STUDIES.flatMap((s) => [
    ...collectStrings(s.es).map((text) => ({ text, where: `${s.slug}.es` })),
    ...collectStrings(s.en).map((text) => ({ text, where: `${s.slug}.en` })),
  ]);

  it("contains no owner placeholders, confidentiality markers or emoji", () => {
    expect(everything.filter(({ text }) => UNPUBLISHABLE.test(text) || EMOJI.test(text))).toEqual([]);
    for (const labels of Object.values(PROJECTS_LABELS))
      expect(collectStrings(labels).filter((t) => UNPUBLISHABLE.test(t))).toEqual([]);
  });

  it("does not bring back the unverifiable claims that were removed", () => {
    expect(everything.filter(({ text }) => REMOVED_CLAIMS.test(text))).toEqual([]);
  });

  it("uses voseo in the Spanish copy", () => {
    const hits = CASE_STUDIES.flatMap((s) => collectStrings(s.es)).filter((t) => TU_FORMS.test(t));
    expect(hits).toEqual([]);
    expect(collectStrings(PROJECTS_LABELS.es).filter((t) => TU_FORMS.test(t))).toEqual([]);
  });

  it("does not show the unused Red Sanitaria logo or the partner universities", () => {
    for (const s of CASE_STUDIES) expect(s.logo?.src ?? "").not.toMatch(/red-sanitaria/);
  });
});

describe("case studies assets and links", () => {
  it("uses existing images with explicit dimensions and meaningful alt text", () => {
    for (const study of CASE_STUDIES) {
      expect(existsSync(`public${study.hero.src}`), study.hero.src).toBe(true);
      expect(study.hero.width).toBeGreaterThan(0);
      expect(study.hero.height).toBeGreaterThan(0);
      if (study.logo) {
        expect(existsSync(`public${study.logo.src}`), study.logo.src).toBe(true);
        expect(study.logo.width).toBeGreaterThan(0);
        expect(study.logo.height).toBeGreaterThan(0);
      }
      for (const locale of locales) {
        expect(study[locale].heroAlt.length).toBeGreaterThan(10);
        if (study.logo) expect(study[locale].logoAlt?.length).toBeGreaterThan(3);
      }
    }
  });

  it("points related services at real routes", () => {
    for (const study of CASE_STUDIES) {
      expect(Object.keys(routes)).toContain(study.relatedService);
      if (study.secondaryService) expect(Object.keys(routes)).toContain(study.secondaryService);
    }
  });

  it("only links to https URLs", () => {
    for (const study of CASE_STUDIES)
      for (const locale of locales)
        for (const link of study[locale].links ?? []) expect(link.href).toMatch(/^https:\/\//);
  });
});

describe("references to case studies", () => {
  it("features only cases that exist", () => {
    for (const slug of FEATURED_PROJECT_SLUGS) expect(getCaseSlugs()).toContain(slug);
    expect([...FEATURED_PROJECT_SLUGS]).toEqual([
      "start-university",
      "deep-creek-solutions",
      "autocity-grupo-tagle",
    ]);
  });

  it("relates every service to cases that exist, as recommended", () => {
    const related = (key: keyof typeof serviceContent) => serviceContent[key].es.relatedProjectSlugs;
    expect(related("serviceUxUi")).toEqual(["start-university", "deep-creek-solutions", "autocity-grupo-tagle"]);
    expect(related("serviceWebDesign")).toEqual(["autocity-grupo-tagle", "sixto-van-garret", "start-university"]);
    expect(related("serviceWebDevelopment")).toEqual(["portfolio-fransixto", "start-university", "officina-artis"]);
    expect(related("serviceAiMvp")).toEqual(["portfolio-fransixto", "deep-creek-solutions"]);
    for (const content of Object.values(serviceContent))
      for (const locale of locales)
        expect(content[locale].relatedProjectSlugs).toEqual(content.es.relatedProjectSlugs);
  });
});

const NEW_SLUGS = [
  "ortopedia-para-ti",
  "bienestar-senior",
  "rexia",
  "deep-creek-branding",
  "consultora-prisma",
  "vivero-yvyra",
];
const DESIGN_ONLY = ["ortopedia-para-ti", "bienestar-senior", "rexia"];
const NOT_LIVE = ["ortopedia-para-ti", "bienestar-senior", "vivero-yvyra", "deep-creek-branding", "rexia"];
const IMPLEMENTATION_ES = /\b(desarroll[ée]|implement[ée]|program[ée]|codifiqu[ée]|constru[ií])\b/i;
const IMPLEMENTATION_EN = /\bI (built|developed|implemented|coded|programmed|engineered)\b/i;
const LIVE_CLAIMS = /\b(lanzad[oa]s?|en producci[óo]n|launched|went live|is live|ya est[áa] en l[íi]nea)\b/i;

describe("new case studies", () => {
  it("registers the six cases with the requested slugs", () => {
    for (const slug of NEW_SLUGS) expect(getCaseSlugs()).toContain(slug);
  });

  it("declares a status for the cases whose state needs to be explicit", () => {
    expect(getCaseStudy("ortopedia-para-ti")?.status).toBe("design-proposal");
    expect(getCaseStudy("bienestar-senior")?.status).toBe("design-proposal");
    expect(getCaseStudy("rexia")?.status).toBe("ongoing-confidential");
    expect(getCaseStudy("vivero-yvyra")?.status).toBe("in-development");
    expect(getCaseStudy("deep-creek-branding")?.status).toBe("in-progress");
    expect(getCaseStudy("consultora-prisma")?.status).toBe("live");
  });

  it("shows the status in the sidebar, localized", () => {
    const study = getCaseStudy("rexia")!;
    const es = buildMetaItems(study.es.meta, "es", study.status);
    const en = buildMetaItems(study.en.meta, "en", study.status);
    expect(es.at(-1)).toEqual({ label: "Estado", value: PROJECTS_LABELS.es.status["ongoing-confidential"] });
    expect(en.at(-1)).toEqual({ label: "Status", value: PROJECTS_LABELS.en.status["ongoing-confidential"] });
    expect(buildMetaItems(study.es.meta, "es").some((i) => i.label === "Estado")).toBe(false);
  });

  it("keeps design-only cases free of implementation claims", () => {
    for (const slug of DESIGN_ONLY) {
      const study = getCaseStudy(slug)!;
      for (const t of collectStrings(study.es)) expect(t, `${slug}.es`).not.toMatch(IMPLEMENTATION_ES);
      for (const t of collectStrings(study.en)) expect(t, `${slug}.en`).not.toMatch(IMPLEMENTATION_EN);
    }
  });

  it("does not claim launches for proposals, in-development or in-progress work", () => {
    for (const slug of NOT_LIVE) {
      const study = getCaseStudy(slug)!;
      for (const t of [...collectStrings(study.es), ...collectStrings(study.en)])
        expect(t, slug).not.toMatch(LIVE_CLAIMS);
    }
  });

  it("uses typographic covers with honest alt text", () => {
    for (const slug of NEW_SLUGS) {
      const study = getCaseStudy(slug)!;
      expect(study.hero.src).toBe(`/projects/${slug}.webp`);
      expect(study.es.heroAlt).toMatch(/tipogr[áa]fica/i);
      expect(study.en.heroAlt).toMatch(/typographic/i);
    }
  });

  it("resolves related cases to existing, distinct slugs, in both directions for the Deep Creek pair", () => {
    for (const study of CASE_STUDIES)
      for (const slug of study.relatedCases ?? []) {
        expect(getCaseSlugs(), `${study.slug} -> ${slug}`).toContain(slug);
        expect(slug).not.toBe(study.slug);
      }
    expect(getCaseStudy("deep-creek-branding")?.relatedCases).toContain("deep-creek-solutions");
    expect(getCaseStudy("deep-creek-solutions")?.relatedCases).toContain("deep-creek-branding");
    const links = getRelatedCases("deep-creek-branding", "es");
    expect(links[0]).toEqual({ slug: "deep-creek-solutions", title: getCaseCopy("deep-creek-solutions", "es")!.cardTitle });
    expect(getRelatedCases("nope", "es")).toEqual([]);
    expect(getRelatedCases("start-university", "es")).toEqual([]);
  });

  it("requires alt text in both locales for every gallery image", () => {
    for (const study of CASE_STUDIES)
      for (const img of study.gallery ?? []) {
        expect(existsSync(`public${img.src}`), img.src).toBe(true);
        expect(img.width).toBeGreaterThan(0);
        expect(img.height).toBeGreaterThan(0);
        for (const locale of locales) expect(img.alt[locale].length, `${study.slug}.${locale}`).toBeGreaterThan(10);
      }
  });

  it("links the live store of the redesign cases as the current site, not as the redesign", () => {
    for (const slug of ["ortopedia-para-ti", "bienestar-senior"]) {
      const study = getCaseStudy(slug)!;
      for (const locale of locales) {
        expect(study[locale].links?.length).toBe(1);
        expect(study[locale].links?.[0].note?.length).toBeGreaterThan(20);
      }
    }
    expect(getCaseStudy("ortopedia-para-ti")?.es.links?.[0].href).toBe("https://ortopediaparati.com/");
    expect(getCaseStudy("bienestar-senior")?.es.links?.[0].href).toBe("https://www.bienestarsenior.com/");
    expect(getCaseStudy("consultora-prisma")?.es.links?.[0].href).toBe("https://www.consultoraprisma.com.ar/");
    expect(getCaseStudy("vivero-yvyra")?.es.links ?? []).toEqual([]);
    expect(getCaseStudy("rexia")?.es.links ?? []).toEqual([]);
  });

  it("keeps Rexia separate from the Deep Creek and Red Sanitaria work", () => {
    const rexia = getCaseStudy("rexia")!;
    expect(rexia.relatedCases ?? []).not.toContain("deep-creek-solutions");
    for (const t of [...collectStrings(rexia.es), ...collectStrings(rexia.en)])
      expect(t).not.toMatch(/Deep Creek|Red Sanitaria|Retia/i);
  });
});
