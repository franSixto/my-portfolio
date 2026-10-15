import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FOOTER } from "@/content/footer";
import { FEATURED_PROJECT_SLUGS } from "@/content/featuredProjects";
import { SITE_META } from "@/content/site";
import { TOOLKIT } from "@/content/toolkit";
import { getStaticPageMetadata, getStaticPageSeo, SITE_NAME, buildSiteJsonLd } from "@/i18n/seo";
import { getCaseSlugs } from "@/content/projects";
import { locales } from "@/i18n/routes";
import { aboutContent } from "./about";
import { contactContent } from "./contact";
import { homeContent } from "./home";
import { projectsContent } from "./projects";
import { servicesHubContent } from "./servicesHub";

const modules = {
  home: homeContent,
  servicesHub: servicesHubContent,
  about: aboutContent,
  contact: contactContent,
  projects: projectsContent,
  footer: FOOTER,
  siteMeta: SITE_META,
} as const;

const TU_FORMS =
  /\b(tienes|puedes|quieres|buscas|eres|necesitas|sabes|haces|escribe|contáctame|cuéntame|siéntete|únete)\b/i;
const EMOJI = /(?![©®])\p{Extended_Pictographic}/u;

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (typeof value === "function") out.push(String(value(2025)));
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

/** Sorted dotted key paths, ignoring array contents' values. */
function shape(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return [`${prefix}[${value.length}]`, ...(value[0] ? shape(value[0], `${prefix}[]`) : [])];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => shape(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

describe("content modules", () => {
  it("provide both locales with the same structure", () => {
    for (const [name, mod] of Object.entries(modules)) {
      for (const locale of locales) expect(mod[locale], `${name}.${locale}`).toBeDefined();
      // Same keys; array lengths are allowed to differ only where the copy does not mandate them.
      const keys = (l: (typeof locales)[number]) =>
        shape(mod[l]).map((k) => k.replace(/\[\d+\]/g, "[]"));
      expect(keys("en"), name).toEqual(keys("es"));
      for (const locale of locales) {
        const strings = collectStrings(mod[locale]);
        expect(strings.length, `${name}.${locale}`).toBeGreaterThan(0);
        expect(strings.every((s) => s.trim().length > 0), `${name}.${locale} empty string`).toBe(true);
      }
    }
  });

  it("has equal list sizes in es and en", () => {
    for (const [name, mod] of Object.entries(modules)) {
      expect(shape(mod.en).filter((k) => /\[\d+\]/.test(k)), name).toEqual(
        shape(mod.es).filter((k) => /\[\d+\]/.test(k))
      );
    }
  });

  it("has no emoji", () => {
    for (const [name, mod] of Object.entries(modules))
      for (const locale of locales)
        expect(collectStrings(mod[locale]).filter((s) => EMOJI.test(s)), `${name}.${locale}`).toEqual([]);
  });

  it("has no leaked English chrome in es nor Spanish in en seo", () => {
    expect(collectStrings(modules.contact.es).join(" ")).not.toMatch(/Connect with me/);
    expect(collectStrings(modules.home.en).join(" ")).not.toMatch(/Contame|Ver proyectos/);
  });
});

describe("es voseo consistency (content modules)", () => {
  it("has no tú forms in the new es content", () => {
    for (const [name, mod] of Object.entries(modules)) {
      const hits = collectStrings(mod.es).filter((s) => TU_FORMS.test(s));
      expect(hits, name).toEqual([]);
    }
  });

  it("has no tú forms in the es dictionary", () => {
    const raw = JSON.parse(readFileSync("public/locales/es/common.json", "utf8"));
    expect(collectStrings(raw).filter((s) => TU_FORMS.test(s))).toEqual([]);
  });
});

describe("static page SEO", () => {
  const routes = ["home", "services", "about", "projects", "contact"] as const;

  it("keeps titles <= 60 (with the site suffix where the template applies) and descriptions <= 155", () => {
    for (const route of routes)
      for (const locale of locales) {
        const { title, description } = getStaticPageSeo(route, locale);
        const full = route === "home" ? title : `${title} | ${SITE_NAME}`;
        expect(full.length, `${route}.${locale} title`).toBeLessThanOrEqual(60);
        expect(description.length, `${route}.${locale} description`).toBeLessThanOrEqual(155);
        expect(description.length).toBeGreaterThan(80);
      }
    for (const locale of locales)
      expect(SITE_META[locale].description.length).toBeLessThanOrEqual(155);
  });

  it("has unique titles and descriptions per locale", () => {
    for (const locale of locales) {
      const all = routes.map((r) => getStaticPageSeo(r, locale));
      expect(new Set(all.map((s) => s.title)).size).toBe(routes.length);
      expect(new Set(all.map((s) => s.description)).size).toBe(routes.length);
    }
  });

  it("sets an absolute title only for home, with canonical + 3 hreflang everywhere", () => {
    expect(getStaticPageMetadata("home", "es").title).toEqual({
      absolute: homeContent.es.seo.title,
    });
    expect(getStaticPageMetadata("services", "es").title).toBe(servicesHubContent.es.seo.title);
    const m = getStaticPageMetadata("services", "en");
    expect(m.alternates?.canonical).toBe("https://www.fransixto.com.ar/en/services");
    expect(Object.keys(m.alternates?.languages ?? {}).sort()).toEqual(["en", "es", "x-default"]);
  });
});

describe("hub and home content", () => {
  it("links the hub to the four services in both locales", () => {
    for (const locale of locales) {
      expect(servicesHubContent[locale].start.items.map((i) => i.route)).toEqual([
        "serviceUxUi",
        "serviceWebDesign",
        "serviceWebDevelopment",
        "serviceAiMvp",
      ]);
      expect(homeContent[locale].services.cards).toHaveLength(4);
      expect(servicesHubContent[locale].compare.rows).toHaveLength(4);
    }
  });

  it("shows no prices outside the service pages", () => {
    for (const mod of [homeContent, servicesHubContent, aboutContent, contactContent])
      for (const locale of locales)
        expect(collectStrings(mod[locale]).join("\n")).not.toMatch(/USD|\$\s?\d/);
  });

  it("features only projects that exist", () => {
    const slugs = getCaseSlugs();
    for (const slug of FEATURED_PROJECT_SLUGS) expect(slugs).toContain(slug);
  });
});

describe("Person JSON-LD", () => {
  it("is locale-aware and lists LinkedIn + GitHub", () => {
    const person = (l: "es" | "en") =>
      buildSiteJsonLd(l)["@graph"].find((n) => n["@type"] === "Person") as Record<string, unknown>;
    expect(person("es").jobTitle).toBe("Diseñador UX/UI y de producto");
    expect(person("en").jobTitle).toBe("UX/UI & Product Designer");
    expect(person("es").description).not.toBe(person("en").description);
    expect(person("en").sameAs).toEqual([
      "https://www.linkedin.com/in/sixtofrancisco/",
      "https://github.com/franSixto",
    ]);
    expect(person("en").email).toBeUndefined();
  });
});

describe("toolkit", () => {
  const dropped = [
    "AWS", "MongoDB", "PostgreSQL", "MySQL", "Firebase", "Linux", "Ubuntu", "Red Hat",
    "Sketch", "InVision", "Trello", "Confluence", "Slack", "Yarn", "NPM", "Postman",
    "Chrome DevTools", "CI/CD", "Scrum", "VS Code", "VSCode",
  ];

  it("has six categories and none of the dropped tools", () => {
    expect(TOOLKIT).toHaveLength(6);
    const labels = TOOLKIT.flatMap((c) => c.items.flatMap((i) => [i.es, i.en]));
    for (const tool of dropped) {
      const re = new RegExp(`(^|[^A-Za-z])${tool.replace(/[/.]/g, "\\$&")}([^A-Za-z]|$)`);
      expect(labels.filter((l) => re.test(l)), tool).toEqual([]);
    }
  });

  it("has es + en labels and 3 to 5 core items per category", () => {
    for (const category of TOOLKIT) {
      expect(category.title.es && category.title.en).toBeTruthy();
      for (const item of category.items) expect(item.es && item.en).toBeTruthy();
      const core = category.items.filter((i) => i.core).length;
      expect(core, category.id).toBeGreaterThanOrEqual(3);
      expect(core, category.id).toBeLessThanOrEqual(5);
    }
  });
});
