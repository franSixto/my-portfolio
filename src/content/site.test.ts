import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { CV_PATH } from "./site";
import { FOOTER } from "./footer";
import { aboutContent } from "./pages/about";
import { contactContent } from "./pages/contact";

describe("CV links", () => {
  it("serves one existing PDF per locale", () => {
    expect(CV_PATH.es).not.toBe(CV_PATH.en);
    for (const path of Object.values(CV_PATH))
      expect(existsSync(resolve(__dirname, "../../public", path.slice(1)))).toBe(true);
  });

  it("no longer warns English readers that the CV is in Spanish", () => {
    const labels = [FOOTER.en, aboutContent.en.cv, contactContent.en.channels.cv].flatMap((c) =>
      Object.values(c).filter((v): v is string => typeof v === "string")
    );
    for (const label of labels) expect(label).not.toMatch(/spanish/i);
  });
});
