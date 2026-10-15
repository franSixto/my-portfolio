import { describe, expect, it } from "vitest";
import { mergeWithFallback, translate } from "./translate";
import { getDictionary, getProject, getProjects } from "./dictionary";

describe("mergeWithFallback", () => {
  it("fills missing keys from the fallback, deeply", () => {
    const fallback = { a: "es-a", b: { c: "es-c", d: "es-d" } };
    const primary = { b: { c: "en-c" } };
    expect(mergeWithFallback(primary, fallback)).toEqual({
      a: "es-a",
      b: { c: "en-c", d: "es-d" },
    });
  });

  it("does not mutate inputs", () => {
    const fallback = { a: "x" };
    const primary = {};
    mergeWithFallback(primary, fallback);
    expect(primary).toEqual({});
  });
});

describe("translate", () => {
  const dict = { a: { b: "hello" }, n: 3 };
  it("resolves dot notation", () => {
    expect(translate(dict, "a.b")).toBe("hello");
  });
  it("returns the key in development and empty string in production for missing keys", () => {
    expect(translate(dict, "a.x", { isProduction: false })).toBe("a.x");
    expect(translate(dict, "a.x", { isProduction: true })).toBe("");
  });
  it("treats non-string leaves as missing", () => {
    expect(translate(dict, "a", { isProduction: true })).toBe("");
    expect(translate(dict, "n", { isProduction: true })).toBe("");
  });
});

describe("getDictionary", () => {
  it("returns real strings for both locales", () => {
    expect(translate(getDictionary("es"), "navigation.about")).toBe("Acerca de");
    expect(translate(getDictionary("en"), "navigation.about")).toBe("About");
  });
  it("has projects.noImage in both locales", () => {
    expect(translate(getDictionary("es"), "projects.noImage")).toBe("Sin imagen");
    expect(translate(getDictionary("en"), "projects.noImage")).toBe("No image");
  });
});

describe("getProjects", () => {
  it("returns the same slugs in both locales", () => {
    const es = getProjects("es").map((p) => p.slug);
    const en = getProjects("en").map((p) => p.slug);
    expect(es.length).toBe(6);
    expect(en).toEqual(es);
  });
});

describe("getProject", () => {
  it("matches by slug", () => {
    expect(getProject("officina-artis", "es")?.slug).toBe("officina-artis");
  });
  it("does not match by id when it differs from the slug", () => {
    const differing = getProjects("es").find((p) => p.id !== p.slug);
    if (differing) expect(getProject(differing.id, "es")).toBeNull();
    expect(getProject("nope", "en")).toBeNull();
  });
});

describe("notFound strings", () => {
  it("exist in both locales", () => {
    for (const l of ["es", "en"] as const) {
      for (const k of ["title", "description", "backHome"]) {
        expect(translate(getDictionary(l), `notFound.${k}`, { isProduction: true })).not.toBe("");
      }
    }
  });
});
