import { describe, expect, it } from "vitest";
import { sanitizeEventProps } from "./analytics";

describe("sanitizeEventProps", () => {
  it("keeps only the whitelisted, non-personal properties", () => {
    const props = sanitizeEventProps({
      project_type: "ux-ui",
      locale: "es",
      channel: "email",
      name: "Ada",
      email: "ada@example.com",
      message: "hello",
    } as Record<string, string>);
    expect(props).toEqual({ project_type: "ux-ui", locale: "es", channel: "email" });
  });

  it("drops empty values", () => {
    expect(sanitizeEventProps({ locale: "en", project_type: "" })).toEqual({ locale: "en" });
  });
});
