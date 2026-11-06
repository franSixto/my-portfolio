import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GOOGLE_TAG_ID } from "@/content/site";
import GoogleTag from "@/components/GoogleTag";
import { googleTagSrc, googleTagInlineScript, gaConfigScript } from "./googleTag";

describe("Google tag id", () => {
  it("has the GTM-XXXX shape, since it is interpolated into HTML", () => {
    expect(GOOGLE_TAG_ID).toMatch(/^GTM-[A-Z0-9]+$/);
  });
});

describe("GoogleTag markup", () => {
  const html = renderToStaticMarkup(createElement(GoogleTag));

  it("renders the loader once, async, with the configured id", () => {
    expect(googleTagSrc(GOOGLE_TAG_ID)).toBe(`https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_ID}`);
    expect(html.match(/gtm\.js\?id=/g)).toHaveLength(1);
    expect(html).toContain(`<script async="" src="${googleTagSrc(GOOGLE_TAG_ID)}"></script>`);
  });

  it("defines dataLayer, gtag and gtag('js') exactly once", () => {
    expect(html.match(/window\.dataLayer = window\.dataLayer \|\| \[\]/g)).toHaveLength(1);
    expect(html.match(/function gtag\(\)/g)).toHaveLength(1);
    expect(html.match(/gtag\('js', new Date\(\)\)/g)).toHaveLength(1);
    expect(googleTagInlineScript()).toContain("gtag('js', new Date());");
  });

  it("adds no noscript or iframe and no config call", () => {
    expect(html).not.toMatch(/noscript|iframe|gtag\('config'/);
  });
});

describe("GA init", () => {
  it("only configures, never redefines dataLayer/gtag or calls gtag('js')", () => {
    const s = gaConfigScript("G-TEST123");
    expect(s).toContain("gtag('config', 'G-TEST123')");
    expect(s).not.toMatch(/dataLayer|function gtag|gtag\('js'/);
  });
});

describe("SiteShell", () => {
  const src = readFileSync(resolve(__dirname, "../components/layout/SiteShell.tsx"), "utf8");
  it("renders <GoogleTag /> once, as the first child of <head>", () => {
    expect(src.match(/<GoogleTag \/>/g)).toHaveLength(1);
    expect(src).toMatch(/<head>\s*<GoogleTag \/>/);
  });
});
