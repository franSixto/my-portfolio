import { describe, expect, it } from "vitest";
import { buttonClasses, type ButtonVariant } from "./ButtonLink";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "inverse", "text"];

describe("buttonClasses", () => {
  it("never forbids wrapping, so long labels cannot push a layout wider than a narrow phone", () => {
    for (const variant of VARIANTS) {
      const classes = buttonClasses({ variant }).split(/\s+/);
      expect(classes, variant).not.toContain("whitespace-nowrap");
      expect(classes, variant).toContain("max-w-full");
    }
  });

  it("uses a minimum height instead of a fixed one for boxed buttons, so a wrapped label grows the button", () => {
    for (const variant of ["primary", "secondary", "inverse"] as const) {
      const classes = buttonClasses({ variant }).split(/\s+/);
      expect(classes.some((c) => /^h-\d+$/.test(c)), variant).toBe(false);
      expect(classes.some((c) => /^min-h-\d+$/.test(c)), variant).toBe(true);
    }
  });
});
