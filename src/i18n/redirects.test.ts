import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { getCaseSlugs } from "@/content/projects";
import { LEGACY_PROJECT_SLUGS, REMOVED_PROJECT_SLUGS, buildRedirects } from "./redirects";

const OLD_TO_NEW = {
  "experience-at-startu": "start-university",
  "experience-at-deep-creek": "deep-creek-solutions",
  "experience-at-autocity": "autocity-grupo-tagle",
  "experience-at-sixto-van-garret": "sixto-van-garret",
  "experience-at-apex": "apex-america",
} as const;

const rules = buildRedirects();
const find = (source: string) => rules.find((r) => r.source === source);

describe("legacy project slug map", () => {
  it("maps every old slug to a case that exists", () => {
    expect(LEGACY_PROJECT_SLUGS).toEqual(OLD_TO_NEW);
    for (const target of Object.values(LEGACY_PROJECT_SLUGS)) expect(getCaseSlugs()).toContain(target);
    for (const old of Object.keys(LEGACY_PROJECT_SLUGS)) expect(getCaseSlugs()).not.toContain(old);
  });
});

describe("redirects", () => {
  it("redirects each old slug permanently and directly in es, en and legacy form", () => {
    for (const [old, next] of Object.entries(OLD_TO_NEW)) {
      expect(find(`/proyectos/${old}`), `es ${old}`).toEqual({
        source: `/proyectos/${old}`,
        destination: `/proyectos/${next}`,
        permanent: true,
      });
      expect(find(`/en/projects/${old}`), `en ${old}`).toEqual({
        source: `/en/projects/${old}`,
        destination: `/en/projects/${next}`,
        permanent: true,
      });
      expect(find(`/projects/${old}`), `legacy ${old}`).toEqual({
        source: `/projects/${old}`,
        destination: `/proyectos/${next}`,
        permanent: true,
      });
    }
  });

  it("sends removed case studies to the projects list instead of a 404", () => {
    for (const slug of REMOVED_PROJECT_SLUGS) {
      expect(getCaseSlugs()).not.toContain(slug);
      expect(find(`/proyectos/${slug}`)?.destination, `es ${slug}`).toBe("/proyectos");
      expect(find(`/en/projects/${slug}`)?.destination, `en ${slug}`).toBe("/en/projects");
    }
    expect(REMOVED_PROJECT_SLUGS).toEqual(["portfolio-fransixto", "deep-creek-branding"]);
  });

  it("never chains: no destination is another rule's source", () => {
    const sources = new Set(rules.map((r) => r.source));
    for (const rule of rules) expect(sources.has(rule.destination), rule.source).toBe(false);
  });

  it("puts the specific legacy rules before the generic /projects/:slug rule", () => {
    const generic = rules.findIndex((r) => r.source === "/projects/:slug([^./]+)");
    expect(generic).toBeGreaterThan(-1);
    for (const old of Object.keys(OLD_TO_NEW))
      expect(rules.findIndex((r) => r.source === `/projects/${old}`)).toBeLessThan(generic);
    expect(rules[generic].destination).toBe("/proyectos/:slug");
  });

  it("keeps the generic rule away from image files and the other legacy redirects", () => {
    const generic = new RegExp(`^/projects/([^./]+)$`);
    expect(generic.test("/projects/officina-artis.webp")).toBe(false);
    expect(generic.test("/projects/officina-artis")).toBe(true);
    expect(find("/about")?.destination).toBe("/sobre-mi");
    expect(find("/projects")?.destination).toBe("/proyectos");
    expect(find("/contact")?.destination).toBe("/contacto");
    expect(find("/blog")).toEqual({ source: "/blog", destination: "/", permanent: false });
  });

  it("is what next.config.ts serves", async () => {
    expect(await nextConfig.redirects?.()).toEqual(rules);
  });
});
