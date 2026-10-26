import { describe, expect, it } from "vitest";
import { getCaseStudy } from "@/content/projects";
import { PROJECTS_LABELS } from "@/content/projects/labels";
import { toProjectTile } from "./toProjectTile";

describe("toProjectTile", () => {
  it("adds the status to the meta line when the work is not a finished, published site", () => {
    const tile = toProjectTile(getCaseStudy("ortopedia-para-ti")!, "es");
    expect(tile.meta).toContain(PROJECTS_LABELS.es.status["design-proposal"]);
    expect(toProjectTile(getCaseStudy("vivero-yvyra")!, "en").meta).toContain(
      PROJECTS_LABELS.en.status["in-development"]
    );
  });

  it("keeps the plain role for live or status-less cases", () => {
    const live = getCaseStudy("consultora-prisma")!;
    expect(toProjectTile(live, "es").meta).toBe(live.es.meta.role);
    const plain = getCaseStudy("start-university")!;
    expect(toProjectTile(plain, "es").meta).toBe(plain.es.meta.role);
  });
});
