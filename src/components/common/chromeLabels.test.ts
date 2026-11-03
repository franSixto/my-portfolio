import { describe, expect, it } from "vitest";
import { CHROME_LABELS } from "./chromeLabels";

describe("contact chooser copy", () => {
  it("offers WhatsApp and the form in both locales", () => {
    for (const locale of ["es", "en"] as const) {
      const c = CHROME_LABELS[locale].contactChooser;
      expect(c.panelLabel).not.toBe("");
      expect(c.whatsapp.label).toBe("WhatsApp");
      expect(c.whatsapp.hint).not.toBe("");
      expect(c.form.label).not.toBe("");
      expect(c.form.hint).not.toBe("");
    }
  });

  it("uses the agreed subtitles", () => {
    expect(CHROME_LABELS.es.contactChooser.whatsapp.hint).toBe("Respuesta más rápida");
    expect(CHROME_LABELS.es.contactChooser.form.label).toBe("Formulario");
    expect(CHROME_LABELS.es.contactChooser.form.hint).toBe("Contame tu proyecto con detalle");
    expect(CHROME_LABELS.en.contactChooser.whatsapp.hint).toBe("Fastest reply");
    expect(CHROME_LABELS.en.contactChooser.form.label).toBe("Contact form");
    expect(CHROME_LABELS.en.contactChooser.form.hint).toBe("Tell me about your project in detail");
  });
});
