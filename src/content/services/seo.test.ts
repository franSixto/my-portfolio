import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/i18n/routes";
import { getServiceContent } from "./index";
import { buildServiceJsonLd, getServiceMetadata } from "./seo";

describe("buildServiceJsonLd", () => {
  it("emits a Service that references the Person @id, plus FAQPage", () => {
    const graph = buildServiceJsonLd("serviceWebDesign", "es")["@graph"];
    const service = graph.find((n) => n["@type"] === "Service")!;
    expect(service.provider).toEqual({ "@id": `${SITE_URL}/#person` });
    expect(service.url).toBe(`${SITE_URL}/diseno-web`);
    expect(service.areaServed).toEqual([
      { "@type": "Country", name: "Argentina" },
      { "@type": "Place", name: "Latinoamérica" },
    ]);
    const faq = graph.find((n) => n["@type"] === "FAQPage")!;
    expect(faq.mainEntity).toHaveLength(
      getServiceContent("serviceWebDesign", "es").faqs.length
    );
  });

  it("never emits offers or Offer nodes, and is worldwide in en", () => {
    const json = JSON.stringify(buildServiceJsonLd("serviceWebDesign", "es"));
    expect(json).not.toMatch(/"offers"|"Offer"|PriceSpecification/);
    const service = buildServiceJsonLd("serviceUxUi", "en")["@graph"].find(
      (n) => n["@type"] === "Service"
    )!;
    expect(service.offers).toBeUndefined();
    expect(service.areaServed).toEqual([{ "@type": "Place", name: "Worldwide" }]);
  });
});

describe("getServiceMetadata", () => {
  it("sets canonical + hreflang for the service route", () => {
    const m = getServiceMetadata("serviceAiMvp", "en");
    expect(m.alternates?.canonical).toBe(`${SITE_URL}/en/ai-mvp-development`);
    expect(m.alternates?.languages).toMatchObject({
      es: `${SITE_URL}/desarrollo-mvp-ia`,
      "x-default": `${SITE_URL}/desarrollo-mvp-ia`,
    });
  });
});
