import { describe, expect, it } from "vitest";
import { getCaseStudy } from "@/content/projects";
import { PROJECTS_LABELS } from "@/content/projects/labels";
import { toProjectTile } from "./toProjectTile";

describe("toProjectTile", () => {
  it("adds the status to the meta line when the work is not a finished, published site", () => {
    const tile = toProjectTile(getCaseStudy("ortopedia-para-ti")!, "es");
    expect(tile.meta).toContain(PROJECTS_LABELS.es.status["design-proposal"]);
    expect(toProjectTile(getCaseStudy("rexia")!, "en").meta).toContain(
      PROJECTS_LABELS.en.status["ongoing-confidential"]
    );
  });

  it("keeps the plain role for live or status-less cases", () => {
    const live = getCaseStudy("consultora-prisma")!;
    expect(toProjectTile(live, "es").meta).toBe(live.es.meta.role);
    for (const slug of ["start-university", "vivero-yvyra"]) {
      const plain = getCaseStudy(slug)!;
      expect(toProjectTile(plain, "es").meta).toBe(plain.es.meta.role);
    }
  });

  it("uses the typographic cover for every case, never a real screenshot", () => {
    for (const slug of ["start-university", "rexia"]) {
      const study = getCaseStudy(slug)!;
      expect(toProjectTile(study, "es").image).toEqual({ src: study.cover.src, alt: study.es.coverAlt });
      expect(toProjectTile(study, "en").image?.alt).toBe(study.en.coverAlt);
    }
  });
});
