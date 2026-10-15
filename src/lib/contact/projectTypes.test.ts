import { describe, expect, it } from "vitest";
import {
  PROJECT_TYPE_KEYS,
  contactHrefForService,
  projectTypeFromQuery,
} from "./projectTypes";

describe("projectTypeFromQuery", () => {
  it("maps the es and en query values to stable keys", () => {
    expect(projectTypeFromQuery("ux-ui")).toBe("ux-ui");
    expect(projectTypeFromQuery("diseno-web")).toBe("web-design");
    expect(projectTypeFromQuery("web-design")).toBe("web-design");
    expect(projectTypeFromQuery("desarrollo-web")).toBe("web-development");
    expect(projectTypeFromQuery("web-development")).toBe("web-development");
    expect(projectTypeFromQuery("mvp-ia")).toBe("ai-mvp");
    expect(projectTypeFromQuery("ai-mvp")).toBe("ai-mvp");
    expect(projectTypeFromQuery("otro")).toBe("other");
    expect(projectTypeFromQuery("other")).toBe("other");
  });

  it("is case-insensitive and ignores unknown or empty values", () => {
    expect(projectTypeFromQuery("UX-UI")).toBe("ux-ui");
    expect(projectTypeFromQuery("nope")).toBeUndefined();
    expect(projectTypeFromQuery("")).toBeUndefined();
    expect(projectTypeFromQuery(null)).toBeUndefined();
    expect(projectTypeFromQuery(undefined)).toBeUndefined();
    // Prototype keys must not leak through the lookup.
    expect(projectTypeFromQuery("constructor")).toBeUndefined();
    expect(projectTypeFromQuery("__proto__")).toBeUndefined();
  });

  it("covers every allowed project type", () => {
    for (const key of PROJECT_TYPE_KEYS) expect(projectTypeFromQuery(key)).toBe(key);
  });
});

describe("contactHrefForService", () => {
  it("links each service CTA to the contact page with the right param", () => {
    expect(contactHrefForService("serviceUxUi", "es")).toBe("/contacto?tipo=ux-ui");
    expect(contactHrefForService("serviceWebDesign", "es")).toBe("/contacto?tipo=diseno-web");
    expect(contactHrefForService("serviceWebDevelopment", "es")).toBe(
      "/contacto?tipo=desarrollo-web"
    );
    expect(contactHrefForService("serviceAiMvp", "es")).toBe("/contacto?tipo=mvp-ia");
    expect(contactHrefForService("serviceUxUi", "en")).toBe("/en/contact?type=ux-ui");
    expect(contactHrefForService("serviceWebDesign", "en")).toBe("/en/contact?type=web-design");
    expect(contactHrefForService("serviceWebDevelopment", "en")).toBe(
      "/en/contact?type=web-development"
    );
    expect(contactHrefForService("serviceAiMvp", "en")).toBe("/en/contact?type=ai-mvp");
  });

  it("produces hrefs that round-trip through projectTypeFromQuery", () => {
    for (const locale of ["es", "en"] as const)
      for (const key of ["serviceUxUi", "serviceWebDesign", "serviceWebDevelopment", "serviceAiMvp"] as const) {
        const value = new URL(contactHrefForService(key, locale), "https://x.test").searchParams.get(
          locale === "es" ? "tipo" : "type"
        );
        expect(projectTypeFromQuery(value)).toBeDefined();
      }
  });
});
