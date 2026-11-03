import { describe, expect, it } from "vitest";
import { contactContent } from "@/content/pages/contact";
import { FOOTER } from "@/content/footer";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, whatsappUrl } from "./whatsapp";

describe("whatsappUrl", () => {
  it("uses the international number without a plus sign", () => {
    expect(WHATSAPP_NUMBER).toBe("5492302595456");
    expect(whatsappUrl("es")).toMatch(/^https:\/\/wa\.me\/5492302595456\?text=/);
  });

  it("encodes the locale's prefilled message", () => {
    for (const locale of ["es", "en"] as const) {
      const text = new URL(whatsappUrl(locale)).searchParams.get("text");
      expect(text).toBe(WHATSAPP_MESSAGE[locale]);
      expect(whatsappUrl(locale)).not.toMatch(/ /);
    }
    expect(WHATSAPP_MESSAGE.es).not.toBe(WHATSAPP_MESSAGE.en);
  });
});

describe("WhatsApp copy", () => {
  it("has a localized accessible name in the contact page and footer", () => {
    expect(contactContent.es.channels.whatsapp.ariaLabel).toMatch(/Escribime por WhatsApp/);
    expect(contactContent.en.channels.whatsapp.ariaLabel).toMatch(/Message me on WhatsApp/);
    expect(FOOTER.es.whatsappAria).toMatch(/Escribime por WhatsApp/);
    expect(FOOTER.en.whatsappAria).toMatch(/Message me on WhatsApp/);
  });
});
