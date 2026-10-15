import { describe, expect, it } from "vitest";
import { buildContactEmail } from "./email";

const data = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  projectType: "web-design" as const,
  message: "Line one.\nLine two.",
  locale: "es" as const,
};

describe("buildContactEmail", () => {
  it("puts the project type in the subject and the sender in reply-to", () => {
    const mail = buildContactEmail(data, "owner@example.com");
    expect(mail.subject).toContain("Diseño web");
    expect(mail.replyTo).toBe("ada@example.com");
    expect(mail.to).toBe("owner@example.com");
  });

  it("never lets line breaks reach the subject", () => {
    const mail = buildContactEmail({ ...data, name: "Ada\r\nBcc: x@y.com" }, "owner@example.com");
    expect(mail.subject).not.toMatch(/[\r\n]/);
  });

  it("includes all the submitted fields in the body", () => {
    const mail = buildContactEmail(data, "owner@example.com");
    expect(mail.text).toContain("Ada Lovelace");
    expect(mail.text).toContain("ada@example.com");
    expect(mail.text).toContain("Line one.\nLine two.");
    expect(mail.text).toContain("web-design");
  });
});
