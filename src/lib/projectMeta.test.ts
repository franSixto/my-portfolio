import { describe, expect, it } from "vitest";
import { splitProjectMeta } from "./projectMeta";
import esProjects from "../../public/locales/es/projects.json";
import enProjects from "../../public/locales/en/projects.json";

describe("splitProjectMeta", () => {
  it("extracts the leading **Label**: value lines and drops the separator", () => {
    const md = "👉 **Role**: Lead designer\n📅 **Dates**: 2019 – 2020\n\n---\n\nBody text";
    const { meta, body } = splitProjectMeta(md);
    expect(meta).toEqual([
      { label: "Role", value: "Lead designer" },
      { label: "Dates", value: "2019 – 2020" },
    ]);
    expect(body.trim()).toBe("Body text");
  });

  it("returns no meta when the text does not start with meta lines", () => {
    const md = "Intro with **bold** words.\n\n### Goal\nText";
    const { meta, body } = splitProjectMeta(md);
    expect(meta).toEqual([]);
    expect(body).toContain("Intro with **bold** words.");
  });

  it("turns emoji-prefixed bold lines into level-3 headings without the emoji", () => {
    const { body } = splitProjectMeta("🎨 **What I did**\n\n- item\n\n### 🎯 Goal\nText");
    expect(body).toContain("### What I did");
    expect(body).toContain("### Goal");
    expect(body).not.toMatch(/🎨|🎯/u);
  });

  it("keeps inline bold inside regular paragraphs untouched", () => {
    const { body } = splitProjectMeta("- Created **signage systems** for sites.");
    expect(body).toBe("- Created **signage systems** for sites.");
  });

  it("finds a role for every project that has a preamble, in both locales", () => {
    for (const list of [esProjects, enProjects]) {
      for (const project of list) {
        const { meta, body } = splitProjectMeta(String(project.longDescription ?? ""));
        if (meta.length > 0) {
          expect(meta[0].value.length).toBeGreaterThan(0);
          expect(body.startsWith("---")).toBe(false);
        }
      }
    }
  });

  it("handles empty input", () => {
    expect(splitProjectMeta("")).toEqual({ meta: [], body: "" });
  });
});
