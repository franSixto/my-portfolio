import { describe, expect, it } from "vitest";
import {
  alternatePath,
  buildAlternates,
  localeFromPathname,
  localizedPath,
  matchRoute,
  SITE_URL,
} from "./routes";

describe("localizedPath", () => {
  it("keeps Spanish unprefixed and English under /en", () => {
    expect(localizedPath("home", "es")).toBe("/");
    expect(localizedPath("home", "en")).toBe("/en");
    expect(localizedPath("about", "es")).toBe("/sobre-mi");
    expect(localizedPath("about", "en")).toBe("/en/about");
    expect(localizedPath("projects", "es")).toBe("/proyectos");
    expect(localizedPath("contact", "en")).toBe("/en/contact");
  });

  it("fills dynamic params", () => {
    expect(localizedPath("project", "es", { slug: "officina-artis" })).toBe(
      "/proyectos/officina-artis"
    );
    expect(localizedPath("project", "en", { slug: "officina-artis" })).toBe(
      "/en/projects/officina-artis"
    );
  });

  it("throws when a param is missing", () => {
    expect(() => localizedPath("project", "es")).toThrow(/slug/);
  });
});

describe("matchRoute / localeFromPathname", () => {
  it("matches static and dynamic paths in both locales", () => {
    expect(matchRoute("/")).toEqual({ key: "home", locale: "es", params: {} });
    expect(matchRoute("/en")).toEqual({ key: "home", locale: "en", params: {} });
    expect(matchRoute("/en/projects/x")).toEqual({
      key: "project",
      locale: "en",
      params: { slug: "x" },
    });
    expect(matchRoute("/proyectos/")?.key).toBe("projects");
    expect(matchRoute("/nope")).toBeNull();
  });

  it("detects locale from the pathname", () => {
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/about")).toBe("en");
    expect(localeFromPathname("/english")).toBe("es");
    expect(localeFromPathname("/sobre-mi")).toBe("es");
  });
});

describe("alternatePath", () => {
  it("swaps root and /en", () => {
    expect(alternatePath("/", "en")).toBe("/en");
    expect(alternatePath("/en", "es")).toBe("/");
  });

  it("translates slugs", () => {
    expect(alternatePath("/sobre-mi", "en")).toBe("/en/about");
    expect(alternatePath("/en/projects", "es")).toBe("/proyectos");
    expect(alternatePath("/en/contact", "es")).toBe("/contacto");
  });

  it("preserves dynamic params", () => {
    expect(alternatePath("/proyectos/experience-at-apex", "en")).toBe(
      "/en/projects/experience-at-apex"
    );
    expect(alternatePath("/en/projects/officina-artis", "es")).toBe(
      "/proyectos/officina-artis"
    );
  });

  it("is idempotent for the same locale and tolerant of trailing slashes", () => {
    expect(alternatePath("/sobre-mi/", "es")).toBe("/sobre-mi");
  });

  it("falls back to the target home for unknown paths", () => {
    expect(alternatePath("/unknown", "en")).toBe("/en");
    expect(alternatePath("/en/unknown", "es")).toBe("/");
  });
});

describe("buildAlternates", () => {
  it("builds absolute canonical + hreflang with x-default -> es", () => {
    expect(buildAlternates("about", "en")).toEqual({
      canonical: `${SITE_URL}/en/about`,
      languages: {
        es: `${SITE_URL}/sobre-mi`,
        en: `${SITE_URL}/en/about`,
        "x-default": `${SITE_URL}/sobre-mi`,
      },
    });
  });

  it("canonical follows the current locale and handles params", () => {
    const a = buildAlternates("project", "es", { slug: "officina-artis" });
    expect(a.canonical).toBe(`${SITE_URL}/proyectos/officina-artis`);
    expect(a.languages.en).toBe(`${SITE_URL}/en/projects/officina-artis`);
  });

  it("uses the canonical host", () => {
    expect(SITE_URL).toBe("https://www.fransixto.com.ar");
    expect(buildAlternates("home", "es").canonical).toBe(`${SITE_URL}/`);
  });
});
