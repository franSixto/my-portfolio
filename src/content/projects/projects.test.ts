import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// WebP VP8 dimensions straight from the file header (lossy "VP8 " chunk), no image lib needed in tests.
function sharpSizeOf(path: string): { w: number; h: number } {
  const b = readFileSync(path);
  const fourcc = b.toString("ascii", 12, 16);
  if (fourcc === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  if (fourcc === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  throw new Error(`Unsupported WebP chunk ${fourcc}`);
}
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
  "business-a-day",
  "deep-creek-solutions",
  "autocity-grupo-tagle",
  "bienestar-senior",
  "ortopedia-para-ti",
  "consultora-prisma",
  "vivero-yvyra",
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
  it("lists the twelve cases in the approved order with unique slugs", () => {
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
      expect(existsSync(`public${study.cover.src}`), study.cover.src).toBe(true);
      expect(study.cover.width).toBeGreaterThan(0);
      expect(study.cover.height).toBeGreaterThan(0);
      if (study.logo) {
        expect(existsSync(`public${study.logo.src}`), study.logo.src).toBe(true);
        expect(study.logo.width).toBeGreaterThan(0);
        expect(study.logo.height).toBeGreaterThan(0);
      }
      for (const locale of locales) {
        expect(study[locale].coverAlt.length).toBeGreaterThan(10);
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

  it("has a non-empty related-service link label for every service a case points at", () => {
    for (const study of CASE_STUDIES) {
      for (const key of [study.relatedService, study.secondaryService]) {
        if (!key) continue;
        for (const labels of Object.values(PROJECTS_LABELS)) {
          expect(labels.serviceLink[key], `${study.slug} -> ${key}`).toBeTruthy();
        }
      }
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
    expect(related("serviceWebDevelopment")).toEqual(["start-university", "officina-artis", "consultora-prisma"]);
    expect(related("serviceAiMvp")).toEqual(["deep-creek-solutions", "business-a-day"]);
    for (const content of Object.values(serviceContent))
      for (const locale of locales)
        expect(content[locale].relatedProjectSlugs).toEqual(content.es.relatedProjectSlugs);
  });
});

const NEW_SLUGS = [
  "ortopedia-para-ti",
  "bienestar-senior",
  "rexia",
  "consultora-prisma",
  "vivero-yvyra",
];
const DESIGN_ONLY = ["rexia"];
const NOT_LIVE = ["rexia"];
const IMPLEMENTATION_ES = /\b(desarroll[ée]|implement[ée]|program[ée]|codifiqu[ée]|constru[ií])\b/i;
const IMPLEMENTATION_EN = /\bI (built|developed|implemented|coded|programmed|engineered)\b/i;
const LIVE_CLAIMS = /\b(lanzad[oa]s?|en producci[óo]n|launched|went live|is live|ya est[áa] en l[íi]nea)\b/i;

describe("new case studies", () => {
  it("registers the new cases with the requested slugs", () => {
    for (const slug of NEW_SLUGS) expect(getCaseSlugs()).toContain(slug);
  });

  it("declares a status for the cases whose state needs to be explicit", () => {
    expect(getCaseStudy("ortopedia-para-ti")?.status).toBe("live");
    expect(getCaseStudy("bienestar-senior")?.status).toBe("live");
    expect(getCaseStudy("rexia")?.status).toBe("ongoing-confidential");
    expect(getCaseStudy("vivero-yvyra")?.status).toBe("live");
    const vivero = getCaseStudy("vivero-yvyra")!;
    for (const t of [...collectStrings(vivero.es), ...collectStrings(vivero.en)])
      expect(t).not.toMatch(/en desarrollo|in development|no un n[úu]mero|not a number|evaluad|evaluate/i);
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

  it("gives every case a generated typographic cover with honest alt text", () => {
    for (const study of CASE_STUDIES) {
      expect(study.cover, study.slug).toEqual({ src: `/projects/covers/${study.slug}.webp`, width: 1600, height: 900 });
      expect(study.es.coverAlt, `${study.slug}.es`).toMatch(/^Portada tipogr[áa]fica/i);
      expect(study.en.coverAlt, `${study.slug}.en`).toMatch(/^Typographic cover/i);
    }
    expect(new Set(CASE_STUDIES.map((s) => s.cover.src)).size).toBe(CASE_STUDIES.length);
  });

  it("keeps the cover generator in sync with the registry", () => {
    const script = readFileSync("scripts/build-case-covers.mjs", "utf8");
    const slugs = [...script.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);
    expect([...slugs].sort()).toEqual([...getCaseSlugs()].sort());
  });

  it("gives every cover its own pattern, all of them defined", () => {
    const script = readFileSync("scripts/build-case-covers.mjs", "utf8");
    const arts = [...script.matchAll(/art: "([a-z-]+)"/g)].map((m) => m[1]);
    expect(arts).toHaveLength(getCaseSlugs().length);
    expect(new Set(arts).size).toBe(arts.length);
    for (const art of arts) expect(script, art).toMatch(new RegExp(`\\n  "?${art}"?: \\(p\\) =>`));
    expect(script).not.toMatch(/PORTADA TIPOGR/);
  });

  it("never presents a generated cover as a real image, and keeps real images apart", () => {
    for (const study of CASE_STUDIES)
      for (const img of study.gallery ?? []) {
        expect(img.src, study.slug).not.toMatch(/\/projects\/covers\//);
        expect(img.src, study.slug).not.toBe(study.cover.src);
      }
  });

  it("still references every real image the cases used before covers existed", () => {
    const PREVIOUS_REAL_HEROES: Record<string, string> = {
      "start-university": "/projects/websites-startu-small.webp",
      "deep-creek-solutions": "/projects/deep-creek-solutions.webp",
      "autocity-grupo-tagle": "/projects/autocity-grupo-tagle.webp",
      "sixto-van-garret": "/projects/sixto-van-garret.webp",
      "officina-artis": "/projects/officina-artis.webp",
      "apex-america": "/projects/apex-projects.webp",
    };
    for (const [slug, src] of Object.entries(PREVIOUS_REAL_HEROES))
      expect(getCaseStudy(slug)?.gallery?.map((g) => g.src), slug).toContain(src);
  });

  it("resolves related cases to existing, distinct slugs", () => {
    for (const study of CASE_STUDIES)
      for (const slug of study.relatedCases ?? []) {
        expect(getCaseSlugs(), `${study.slug} -> ${slug}`).toContain(slug);
        expect(slug).not.toBe(study.slug);
      }
    const links = getRelatedCases("vivero-yvyra", "es");
    expect(links[0]).toEqual({ slug: "consultora-prisma", title: getCaseCopy("consultora-prisma", "es")!.cardTitle });
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

  it("opens the gallery of each published client site with a device mockup of its real site", () => {
    const MOCKUPS: Record<string, string[]> = {
      "vivero-yvyra": ["vivero-yvyra"],
      "consultora-prisma": ["consultora-prisma"],
      "ortopedia-para-ti": ["ortopedia-para-ti"],
      "bienestar-senior": ["bienestar-senior"],
      rexia: ["rexia", "retia"],
      "business-a-day": ["business-a-day"],
    };
    for (const [slug, names] of Object.entries(MOCKUPS)) {
      const gallery = getCaseStudy(slug)?.gallery ?? [];
      expect(gallery.length, slug).toBeGreaterThanOrEqual(names.length);
      names.forEach((name, i) => {
        const img = gallery[i];
        expect(img.src, slug).toBe(`/projects/mockups/${name}.webp`);
        expect(existsSync(`public${img.src}`), img.src).toBe(true);
        const meta = sharpSizeOf(`public${img.src}`);
        expect({ w: img.width, h: img.height }, img.src).toEqual(meta);
        for (const locale of locales) expect(img.alt[locale].length, `${slug}.${locale}`).toBeGreaterThan(20);
      });
    }
  });

  it("links the published sites of the live cases", () => {
    const hrefs: Record<string, string> = {
      "ortopedia-para-ti": "https://ortopediaparati.com",
      "bienestar-senior": "https://www.bienestarsenior.com",
      "vivero-yvyra": "https://www.viveroyvyra.com.ar",
      "business-a-day": "https://www.businessaday.com",
    };
    for (const [slug, href] of Object.entries(hrefs)) {
      const study = getCaseStudy(slug)!;
      for (const locale of locales) {
        expect(study[locale].links?.length, `${slug}.${locale}`).toBe(1);
        expect(study[locale].links?.[0].href).toMatch(new RegExp(`^${href}/?$`));
        expect(study[locale].links?.[0].note).toBeUndefined();
      }
      expect(study.es.links?.[0].label).toBe("Visitar el sitio");
      expect(study.en.links?.[0].label).toBe("Visit the site");
    }
    expect(getCaseStudy("consultora-prisma")?.es.links?.[0].href).toBe("https://www.consultoraprisma.com.ar/");
  });

  it("presents Ortopedia Para Ti and Bienestar Senior as implemented and published redesigns", () => {
    for (const slug of ["ortopedia-para-ti", "bienestar-senior"]) {
      const study = getCaseStudy(slug)!;
      expect(study.es.meta.role).toBe(slug === "bienestar-senior" ? "Rediseño UX/UI en Figma" : "Diseño UX/UI");
      expect(study.en.meta.role).toBe(slug === "bienestar-senior" ? "UX/UI redesign in Figma" : "UX/UI design");
      for (const t of collectStrings(study.es))
        expect(t, `${slug}.es`).not.toMatch(/propuesta|sin implementaci|no formó parte|no un sitio publicado|sin programaci/i);
      for (const t of collectStrings(study.en))
        expect(t, `${slug}.en`).not.toMatch(/proposal|no implementation|not part of my work|not a published site|no coding/i);
      expect(study.es.sections.delivered.some((b) => b.type === "p" && /implementado y publicado/.test(b.text))).toBe(true);
      expect(study.en.sections.delivered.some((b) => b.type === "p" && /implemented and published/.test(b.text))).toBe(true);
    }
  });

  it("states Vivero Yvyra is published, without reported results", () => {
    const vivero = getCaseStudy("vivero-yvyra")!;
    const es = vivero.es.sections.delivered.at(-1);
    const en = vivero.en.sections.delivered.at(-1);
    expect(es?.type === "p" && es.text).toMatch(/publicado/);
    expect(en?.type === "p" && en.text).toMatch(/published/);
  });

  it("links Rexia and Retia websites and mentions branding and website in the role", () => {
    const rexia = getCaseStudy("rexia")!;
    expect(rexia.es.meta.role).toBe("Diseñador de producto, branding y sitio web");
    expect(rexia.en.meta.role).toBe("Product designer, branding and website");
    for (const locale of locales) {
      expect(rexia[locale].links?.map((l) => l.href)).toEqual(["https://rexia.ar/", "https://retia.ar/"]);
      expect(rexia[locale].links?.[0].note).toBeUndefined();
      expect(rexia[locale].links?.[1].note?.length).toBeGreaterThan(10);
    }
    expect(rexia.es.links?.map((l) => l.label)).toEqual(["Visitar rexia.ar", "Visitar retia.ar"]);
    expect(rexia.en.links?.map((l) => l.label)).toEqual(["Visit rexia.ar", "Visit retia.ar"]);
    expect(rexia.secondaryService).toBe("serviceGraphicDesign");
  });

  it("keeps Rexia separate from the Deep Creek and Red Sanitaria work", () => {
    const rexia = getCaseStudy("rexia")!;
    expect(rexia.relatedCases ?? []).not.toContain("deep-creek-solutions");
    for (const t of [...collectStrings(rexia.es), ...collectStrings(rexia.en)])
      expect(t).not.toMatch(/Deep Creek|Red Sanitaria/i);
  });
});

describe("Business a Day case", () => {
  const study = () => getCaseStudy("business-a-day")!;

  it("is a live own product sitting right after Rexia", () => {
    expect(getCaseSlugs().indexOf("business-a-day")).toBe(getCaseSlugs().indexOf("rexia") + 1);
    expect(study().status).toBe("live");
    expect(study().relatedService).toBe("serviceAiMvp");
    expect(study().es.meta.role).toBe("Producto, diseño UX/UI y desarrollo");
    expect(study().en.meta.role).toBe("Product, UX/UI design and development");
    expect(study().es.meta.years).toBeUndefined();
    expect(study().es.meta.since).toBeUndefined();
  });

  it("states honestly that the daily idea is generated on demand", () => {
    const es = collectStrings(study().es.sections).join("\n");
    const en = collectStrings(study().en.sections).join("\n");
    expect(es).toMatch(/a demanda/);
    expect(en).toMatch(/on demand/);
    expect(es).toMatch(/No se informan métricas de uso/);
    expect(en).toMatch(/No usage metrics are reported/);
  });

  it("does not name the AI model, database or auth provider", () => {
    for (const t of [...collectStrings(study().es), ...collectStrings(study().en)])
      expect(t).not.toMatch(/OpenAI|Gemini|Supabase|Firebase|Postgres|Prisma|Clerk|Auth0|NextAuth/);
  });
});
