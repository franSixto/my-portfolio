import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getCaseStudy } from "@/content/projects";
import { HOME_MOSAIC_SLUGS, TYPOGRAPHIC_COVER_SLUGS } from "./homeMosaic";

describe("home hero mosaic", () => {
  it("shows between four and six projects (lead tile first) without repeats", () => {
    expect(HOME_MOSAIC_SLUGS.length).toBeGreaterThanOrEqual(4);
    expect(HOME_MOSAIC_SLUGS.length).toBeLessThanOrEqual(6);
    expect(HOME_MOSAIC_SLUGS[0]).toBe("deep-creek-solutions");
    expect(new Set(HOME_MOSAIC_SLUGS).size).toBe(HOME_MOSAIC_SLUGS.length);
  });

  it("only references existing case studies whose image exists in public/", () => {
    for (const slug of HOME_MOSAIC_SLUGS) {
      const study = getCaseStudy(slug);
      expect(study, slug).not.toBeNull();
      expect(existsSync(join(process.cwd(), "public", study!.hero.src)), slug).toBe(true);
    }
  });

  it("never uses the typographic covers (only real screenshots of work)", () => {
    expect(TYPOGRAPHIC_COVER_SLUGS).toHaveLength(6);
    for (const slug of HOME_MOSAIC_SLUGS) expect(TYPOGRAPHIC_COVER_SLUGS).not.toContain(slug);
  });
});
