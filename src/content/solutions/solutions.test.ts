import { describe, expect, it } from "vitest";
import { locales, matchRoute, alternatePath, localizedPath, liveRouteKeys, routes } from "@/i18n/routes";
import { SITE_NAME } from "@/i18n/seo";
import { getCaseSlugs } from "@/content/projects";
import { SERVICE_ROUTE_KEYS } from "@/content/services/nav";
import { getServiceContent } from "@/content/services";
import { buildServiceJsonLd, getServiceMetadata } from "@/content/services/seo";
import {
  SOLUTION_NAV_LABELS,
  SOLUTION_PARENT,
  SOLUTION_ROUTE_KEYS,
  isSolutionRoute,
  solutionsForService,
} from "@/content/services/nav";
import { getSolutionContent, solutionContent } from "./index";

const keys = SOLUTION_ROUTE_KEYS;

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

const pageText = (key: (typeof keys)[number], locale: "es" | "en") =>
  collectStrings(getSolutionContent(key, locale)).join("\n");

const EXPECTED_SLUGS = {
  solutionEcommerce: ["/diseno-ecommerce", "/en/ecommerce-design"],
  solutionSaas: ["/diseno-saas-dashboard", "/en/saas-dashboard-design"],
  solutionDesignSystem: ["/design-system", "/en/design-system"],
  solutionLanding: ["/landing-page-sitio-web-empresas", "/en/landing-page-business-website"],
  solutionRedesign: ["/rediseno-sitio-web", "/en/website-redesign"],
  solutionBrandIdentity: ["/diseno-logo-identidad-de-marca", "/en/logo-brand-identity-design"],
  solutionSocialCampaigns: ["/diseno-redes-sociales-campanas", "/en/social-media-campaign-design"],
} as const;

const EXPECTED_PROOF = {
  solutionEcommerce: ["sixto-van-garret", "ortopedia-para-ti", "bienestar-senior", "vivero-yvyra"],
  solutionSaas: ["rexia", "deep-creek-solutions", "vivero-yvyra"],
  solutionDesignSystem: ["start-university", "deep-creek-solutions"],
  solutionLanding: ["consultora-prisma", "autocity-grupo-tagle"],
  solutionRedesign: ["autocity-grupo-tagle", "ortopedia-para-ti"],
  solutionBrandIdentity: ["apex-america"],
  solutionSocialCampaigns: ["apex-america"],
} as const;

describe("solution routes", () => {
  it("define the seven solution keys with localized slugs", () => {
    expect([...keys].sort()).toEqual(Object.keys(EXPECTED_SLUGS).sort());
    for (const key of keys) {
      expect([routes[key].es, routes[key].en]).toEqual(EXPECTED_SLUGS[key]);
      expect("pending" in routes[key]).toBe(false);
      expect(liveRouteKeys()).toContain(key);
    }
  });

  it("resolve in both locales and map to the other locale", () => {
    for (const key of keys) {
      expect(matchRoute(routes[key].es)).toEqual({ key, locale: "es", params: {} });
      expect(matchRoute(routes[key].en)).toEqual({ key, locale: "en", params: {} });
      expect(alternatePath(routes[key].es, "en")).toBe(routes[key].en);
      expect(alternatePath(routes[key].en, "es")).toBe(routes[key].es);
    }
  });

  it("are recognised by isSolutionRoute and have a parent service", () => {
    for (const key of keys) {
      expect(isSolutionRoute(key)).toBe(true);
      expect(SERVICE_ROUTE_KEYS).toContain(SOLUTION_PARENT[key]);
    }
    expect(isSolutionRoute("serviceUxUi")).toBe(false);
    expect(isSolutionRoute("home")).toBe(false);
  });

  it("lists children per parent service", () => {
    expect(solutionsForService("serviceUxUi")).toEqual([
      "solutionEcommerce",
      "solutionSaas",
      "solutionDesignSystem",
    ]);
    expect(solutionsForService("serviceWebDesign")).toEqual(["solutionLanding", "solutionRedesign"]);
    expect(solutionsForService("serviceWebDevelopment")).toEqual([]);
    expect(solutionsForService("serviceAiMvp")).toEqual([]);
    expect(solutionsForService("serviceGraphicDesign")).toEqual([
      "solutionBrandIdentity",
      "solutionSocialCampaigns",
    ]);
  });

  it("have nav labels in both locales", () => {
    for (const key of keys)
      for (const locale of locales) expect(SOLUTION_NAV_LABELS[locale][key].length).toBeGreaterThan(0);
  });
});

describe("solution content", () => {
  it("has es + en content for every solution", () => {
    expect(Object.keys(solutionContent).sort()).toEqual([...keys].sort());
    for (const key of keys)
      for (const locale of locales) expect(getSolutionContent(key, locale)).toBeDefined();
  });

  it("has unique titles, descriptions and H1s across solutions and services", () => {
    for (const locale of locales) {
      const all = [
        ...keys.map((k) => getSolutionContent(k, locale)),
        ...SERVICE_ROUTE_KEYS.map((k) => getServiceContent(k, locale)),
      ];
      for (const field of ["seoTitle", "seoDescription", "h1", "summary"] as const) {
        const values = all.flatMap((c) => {
          const value = (c as unknown as Record<string, unknown>)[field];
          return typeof value === "string" ? [value] : [];
        });
        expect(new Set(values).size, `${locale} ${field}`).toBe(values.length);
      }
    }
  });

  it("keeps title <= 60 (with site suffix) and description 80-155", () => {
    for (const key of keys)
      for (const locale of locales) {
        const c = getSolutionContent(key, locale);
        expect(`${c.seoTitle} | ${SITE_NAME}`.length, `${key} ${locale}`).toBeLessThanOrEqual(60);
        expect(c.seoDescription.length, `${key} ${locale}`).toBeLessThanOrEqual(155);
        expect(c.seoDescription.length, `${key} ${locale}`).toBeGreaterThan(80);
      }
  });

  it("uses the agreed proof cases, all of which exist", () => {
    const slugs = getCaseSlugs();
    for (const key of keys)
      for (const locale of locales) {
        const c = getSolutionContent(key, locale);
        expect(c.relatedProjectSlugs).toEqual(EXPECTED_PROOF[key]);
        for (const slug of c.relatedProjectSlugs) expect(slugs).toContain(slug);
      }
  });

  it("has 4-6 non-empty FAQs and a step-by-step process", () => {
    for (const key of keys)
      for (const locale of locales) {
        const c = getSolutionContent(key, locale);
        expect(c.faqs.length, `${key} ${locale}`).toBeGreaterThanOrEqual(4);
        expect(c.faqs.length, `${key} ${locale}`).toBeLessThanOrEqual(6);
        for (const f of c.faqs) {
          expect(f.question.length).toBeGreaterThan(5);
          expect(f.answer.length).toBeGreaterThan(10);
        }
        expect(c.sections.some((s) => s.kind === "steps")).toBe(true);
        expect(c.sections.length).toBeGreaterThanOrEqual(3);
      }
  });

  it("sells the work instead of disclaiming the cases", () => {
    for (const key of keys)
      for (const locale of locales)
        for (const s of getSolutionContent(key, locale).sections)
          expect(s.heading, `${key} ${locale}`).not.toMatch(/casos de esta p[áa]gina|cases on this page/i);
  });

  it("keeps es and en structurally identical", () => {
    for (const key of keys) {
      const es = getSolutionContent(key, "es");
      const en = getSolutionContent(key, "en");
      expect(es.sections.map((s) => s.kind)).toEqual(en.sections.map((s) => s.kind));
      es.sections.forEach((s, i) => {
        const other = en.sections[i];
        if (s.kind === "text" && other.kind === "text")
          expect(s.paragraphs.length).toBe(other.paragraphs.length);
        else if (s.kind !== "text" && other.kind !== "text")
          expect(s.items.length, `${key} section ${i}`).toBe(other.items.length);
      });
      expect(es.faqs.length).toBe(en.faqs.length);
      expect(es.relatedProjectSlugs).toEqual(en.relatedProjectSlugs);
      expect(es.relatedServices.map((r) => r.route)).toEqual(en.relatedServices.map((r) => r.route));
      expect(es.price?.amountUsd).toBe(en.price?.amountUsd);
    }
  });

  it("links to its parent service and only to live landing routes", () => {
    for (const key of keys)
      for (const locale of locales) {
        const routesLinked = getSolutionContent(key, locale).relatedServices.map((r) => r.route);
        expect(routesLinked).toContain(SOLUTION_PARENT[key]);
        expect(routesLinked).not.toContain(key);
        for (const r of routesLinked)
          expect([...SERVICE_ROUTE_KEYS, ...keys] as string[]).toContain(r);
      }
  });

  it("states no years of experience", () => {
    for (const key of keys)
      for (const locale of locales) {
        const text = pageText(key, locale);
        expect(text).not.toMatch(/\d+\s*\+?\s*(años|years)/i);
        expect(text).not.toMatch(/años de experiencia|years of experience|trayectoria de/i);
      }
  });

  it("has no hedging about building", () => {
    const HEDGES =
      /cuando hace falta|si hace falta|si (el proyecto )?lo (necesita|requiere)\b|cuando el proyecto lo (requiere|necesita)|if (the project|it) (needs|requires)|when (needed|required)|if needed|as needed/i;
    for (const key of keys)
      for (const locale of locales) expect(pageText(key, locale), `${key} ${locale}`).not.toMatch(HEDGES);
  });

  it("has no placeholders, timelines or hourly rates", () => {
    for (const key of keys)
      for (const locale of locales) {
        const text = pageText(key, locale);
        expect(text).not.toMatch(/\[?FALTA|\bTODO\b|lorem ipsum/);
        expect(text).not.toMatch(/\d+\s*(-|–|a|to)?\s*\d*\s*(semanas|meses|days|weeks|months|días)/i);
        expect(text).not.toMatch(/por hora|hourly|per hour/i);
      }
  });

  it("shows starting prices only on the standardized web pages", () => {
    const FLOORS: Partial<Record<(typeof keys)[number], number>> = { solutionLanding: 600, solutionRedesign: 1400 };
    for (const key of keys)
      for (const locale of locales) {
        const c = getSolutionContent(key, locale);
        const text = pageText(key, locale);
        if (FLOORS[key]) {
          expect(c.price?.amountUsd, key).toBe(FLOORS[key]);
          expect(c.price?.label).toMatch(/USD/);
          if (key === "solutionLanding") expect(text).toMatch(/USD 1[.,]200/);
          expect(text).not.toMatch(/USD 800/);
        } else {
          expect(c.price).toBeUndefined();
          expect(text).not.toMatch(/USD|\$\s?\d/);
        }
      }
  });

  it("uses voseo in es", () => {
    const TU_FORMS =
      /\b(tienes|puedes|quieres|buscas|eres|necesitas|sabes|haces|escribe|contáctame|cuéntame|siéntete|únete|tu equipo te)\b/i;
    for (const key of keys) {
      const hits = collectStrings(getSolutionContent(key, "es")).filter((t) => TU_FORMS.test(t));
      expect(hits, key).toEqual([]);
    }
  });
});

describe("graphic design reflects how the owner actually works", () => {
  const graphicTexts = (locale: "es" | "en") =>
    [
      collectStrings(getServiceContent("serviceGraphicDesign", locale)),
      collectStrings(getSolutionContent("solutionBrandIdentity", locale)),
      collectStrings(getSolutionContent("solutionSocialCampaigns", locale)),
    ]
      .flat()
      .join("\n");

  it("describes a digital, AI-assisted workflow, never handmade work", () => {
    for (const locale of locales)
      expect(graphicTexts(locale)).not.toMatch(/a mano|mi mano|artesanal|redibuj|by hand|my hands|handcraft|redrawn/i);
  });

  it("does not fix deliverables the client hasn't asked for", () => {
    for (const locale of locales)
      expect(graphicTexts(locale)).not.toMatch(/horizontal, vertical|monocrom|monochrome|dos o tres|two or three/i);
  });

  it("offers print management and calendar-based publishing", () => {
    const es = graphicTexts("es");
    const en = graphicTexts("en");
    expect(es).toMatch(/gesti[óo]n de (la )?impresi[óo]n/i);
    expect(es).toMatch(/calendario de publicaciones/i);
    expect(en).toMatch(/print management|manage the printing/i);
    expect(en).toMatch(/publishing calendar/i);
    expect(`${es}\n${en}`).not.toMatch(/quedan de tu lado|stay on your side/i);
  });
});

describe("claims stay inside what the case studies support", () => {
  const DEV_WORDS =
    /desarroll|implement|program|constru|\blanz|\blanc|publi|puesta (en l[ií]nea|online)|launch|built|build|develop|deploy|shipped|\blive\b/i;
  const DESIGN_ONLY = /ortopedia|bienestar/i;

  it("never pairs the design-only store cases with development language", () => {
    for (const key of keys)
      for (const locale of locales)
        for (const t of collectStrings(getSolutionContent(key, locale)))
          if (DESIGN_ONLY.test(t)) expect(t, `${key} ${locale}`).not.toMatch(DEV_WORDS);
  });

  it("offers store implementation on a platform or custom-built, backed by real cases", () => {
    for (const locale of locales) {
      const text = pageText("solutionEcommerce", locale);
      expect(text).toMatch(/Tienda Nube/);
      expect(text).toMatch(locale === "es" ? /desarrollo propio/i : /custom-built/i);
      expect(text).toMatch(locale === "es" ? /cat[áa]logo online sin pagos/i : /online catalog without payments/i);
      expect(text).not.toMatch(/resultados de ventas|sales results/i);
      expect(getSolutionContent("solutionEcommerce", locale).relatedProjectSlugs).toEqual([
        "sixto-van-garret",
        "ortopedia-para-ti",
        "bienestar-senior",
        "vivero-yvyra",
      ]);
    }
  });

  it("presents Vivero Yvyra as finished work", () => {
    for (const key of keys)
      for (const locale of locales)
        for (const t of collectStrings(getSolutionContent(key, locale)))
          if (/vivero|yvyr/i.test(t) && !/^[a-z-]+$/.test(t))
            expect(t, `${key} ${locale}`).not.toMatch(/en desarrollo|in development|en curso|in progress|no lo presento como terminado|don.t present it as finished/i);
  });

  it("keeps Rexia confidential and free of its stack", () => {
    for (const key of keys)
      for (const locale of locales) {
        const text = pageText(key, locale);
        expect(text).not.toMatch(/Angular|NestJS|Supabase|monorepo/i);
        for (const t of collectStrings(getSolutionContent(key, locale)))
          if (/rexia/i.test(t)) expect(t).not.toMatch(/Prisma|\bstack\b/i);
      }
  });

  it("does not use case names as credibility filler", () => {
    const NAMES = /Ortopedia|Bienestar Senior|Rexia|Deep Creek|Vivero|Start University|Prisma|Autocity|Tagle/gi;
    for (const key of keys)
      for (const locale of locales)
        for (const t of collectStrings(getSolutionContent(key, locale))) {
          const found = new Set((t.match(NAMES) ?? []).map((n) => n.toLowerCase()));
          expect(found.size, t).toBeLessThanOrEqual(2);
        }
  });
});

describe("pages are not doorway variants of each other", () => {
  function shingles(text: string, n = 5): Set<string> {
    const words = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean);
    const out = new Set<string>();
    for (let i = 0; i + n <= words.length; i++) out.add(words.slice(i, i + n).join(" "));
    return out;
  }

  it("shares few 5-word phrases with any other solution or service", () => {
    for (const locale of locales) {
      const pages = [
        // The price block is the parent service's by design, so it is left out.
        ...keys.map((k) => {
          const c = { ...getSolutionContent(k, locale), price: undefined };
          return [k, shingles(collectStrings(c).join("\n"))] as const;
        }),
        ...SERVICE_ROUTE_KEYS.map(
          (k) => {
            const c = { ...getServiceContent(k, locale), price: undefined };
            return [k, shingles(collectStrings(c).join("\n"))] as const;
          }
        ),
      ];
      for (const [a, sa] of pages) {
        if (!isSolutionRoute(a as never)) continue;
        for (const [b, sb] of pages) {
          if (a === b) continue;
          const shared = [...sa].filter((s) => sb.has(s)).length;
          expect(shared / sa.size, `${locale} ${a} vs ${b}`).toBeLessThan(0.1);
        }
      }
    }
  });
});

describe("structured data and metadata", () => {
  it("emits Service + FAQPage that match the visible content", () => {
    for (const key of keys)
      for (const locale of locales) {
        const graph = buildServiceJsonLd(key, locale)["@graph"];
        const service = graph.find((n) => n["@type"] === "Service")!;
        const faq = graph.find((n) => n["@type"] === "FAQPage")!;
        const c = getSolutionContent(key, locale);
        expect(service.url).toBe(`https://www.fransixto.com.ar${localizedPath(key, locale)}`);
        expect(service.name).toBe(c.h1);
        expect(service.provider).toEqual({ "@id": "https://www.fransixto.com.ar/#person" });
        expect(faq.mainEntity).toHaveLength(c.faqs.length);
        expect(Boolean(service.offers)).toBe(key === "solutionLanding" || key === "solutionRedesign");
      }
  });

  it("sets canonical + hreflang and a unique title per locale", () => {
    for (const key of keys) {
      const es = getServiceMetadata(key, "es");
      const en = getServiceMetadata(key, "en");
      expect(es.alternates?.canonical).toBe(`https://www.fransixto.com.ar${routes[key].es}`);
      expect(en.alternates?.canonical).toBe(`https://www.fransixto.com.ar${routes[key].en}`);
      expect(en.alternates?.languages).toMatchObject({
        es: `https://www.fransixto.com.ar${routes[key].es}`,
        en: `https://www.fransixto.com.ar${routes[key].en}`,
        "x-default": `https://www.fransixto.com.ar${routes[key].es}`,
      });
      expect(es.title).toBe(getSolutionContent(key, "es").seoTitle);
    }
  });
});

describe("graphic and brand design pages", () => {
  const graphicKeys = ["solutionBrandIdentity", "solutionSocialCampaigns"] as const;
  const allGraphic = ["serviceGraphicDesign", ...graphicKeys] as const;
  const textOf = (key: (typeof allGraphic)[number], locale: "es" | "en") =>
    key === "serviceGraphicDesign"
      ? collectStrings(getServiceContent(key, locale)).join("\n")
      : pageText(key, locale);

  it("hang from the graphic design service and preselect its contact type", () => {
    for (const key of graphicKeys) expect(SOLUTION_PARENT[key]).toBe("serviceGraphicDesign");
  });

  it("position AI as exploration and speed with a trained designer's criterion", () => {
    for (const key of allGraphic) {
      expect(textOf(key, "es"), key).toMatch(/criterio/i);
      expect(textOf(key, "en"), key).toMatch(/judg(e)?ment|criteria|eye|taste/i);
      for (const locale of locales)
        expect(textOf(key, locale), `${key} ${locale}`).not.toMatch(
          /la IA hace todo|AI does everything|barato|cheap|en minutos|in minutes|instant[áa]ne|instant logo/i
        );
    }
  });

  it("cites only the real training and the Apex America work as proof", () => {
    for (const key of allGraphic)
      for (const locale of locales) {
        const text = textOf(key, locale);
        expect(text, `${key} ${locale}`).not.toMatch(/deep creek branding|deep-creek-branding/i);
        expect(text, `${key} ${locale}`).not.toMatch(/Sixto Van Garret/i);
      }
    for (const locale of locales) {
      const text = textOf("serviceGraphicDesign", locale);
      expect(text).toMatch(/Apex/);
      expect(text).toMatch(locale === "es" ? /Diseño Gráfico y Publicitario/ : /Graphic and Advertising Design/);
    }
  });

  it("explains how the price is quoted without stating any", () => {
    for (const key of allGraphic)
      for (const locale of locales) {
        const text = textOf(key, locale);
        expect(text).toMatch(locale === "es" ? /30 minutos/ : /30-minute/);
        expect(text).not.toMatch(/USD|\$\s?\d/);
      }
  });
});
