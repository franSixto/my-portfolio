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

  it("labels the graphic design project type in Spanish", () => {
    const mail = buildContactEmail({ ...data, projectType: "graphic-design" }, "owner@example.com");
    expect(mail.subject).toContain("Diseño gráfico y de marca");
    expect(mail.text).toContain("Diseño gráfico y de marca (graphic-design)");
    expect(mail.html).toContain("Diseño gráfico y de marca");
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

describe("buildContactEmail html", () => {
  it("renders every submitted field", () => {
    const { html } = buildContactEmail(data, "owner@example.com");
    expect(html).toContain("Ada Lovelace");
    expect(html).toContain("ada@example.com");
    expect(html).toContain("Diseño web");
    expect(html).toContain("Line one.<br>Line two.");
  });

  it("escapes everything the visitor typed", () => {
    const { html } = buildContactEmail(
      {
        ...data,
        name: `<img src=x onerror="alert(1)">`,
        message: `<a href="https://evil.test">click</a> & <script>x</script>`,
      },
      "owner@example.com"
    );
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain(`<a href="https://evil.test"`);
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&amp;");
    expect(html).toContain("&quot;");
  });

  it("offers a reply link to the visitor with an encoded address", () => {
    const { html } = buildContactEmail({ ...data, email: "ada+site@example.com" }, "owner@example.com");
    expect(html).toContain('href="mailto:ada%2Bsite%40example.com?subject=');
  });

  it("never breaks out of a style attribute", () => {
    const { html } = buildContactEmail(data, "owner@example.com");
    for (const [, style] of html.matchAll(/style="([^"]*)"/g)) {
      expect(style.endsWith(";") || style.endsWith(")")).toBe(true);
    }
  });

  it("is a complete document with a preheader", () => {
    const { html } = buildContactEmail(data, "owner@example.com");
    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain('lang="es"');
    expect(html).toMatch(/display:none[^>]*>[^<]*Ada Lovelace/);
  });
});
