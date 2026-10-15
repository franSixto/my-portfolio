import { describe, expect, it } from "vitest";
import { mergeWithFallback, translate } from "./translate";
import { getDictionary } from "./dictionary";

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
    expect(translate(getDictionary("es"), "navigation.about")).toBe("Sobre mí");
    expect(translate(getDictionary("en"), "navigation.about")).toBe("About");
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
