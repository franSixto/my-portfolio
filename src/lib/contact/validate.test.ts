import { describe, expect, it } from "vitest";
import {
  CONTACT_LIMITS,
  validateContactFields,
  validateContactPayload,
} from "./validate";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  projectType: "ux-ui",
  message: "I need a design system for my product.",
  locale: "en",
  recaptchaToken: "token",
  honeypot: "",
};

describe("validateContactFields", () => {
  it("accepts a valid payload and trims strings", () => {
    const result = validateContactFields({ ...valid, name: "  Ada  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.name).toBe("Ada");
  });

  it("flags every missing required field with its own code", () => {
    const result = validateContactFields({});
    expect(result.ok).toBe(false);
    if (!result.ok)
      expect(result.errors).toEqual({
        name: "name_required",
        email: "email_required",
        projectType: "project_type_required",
        message: "message_required",
      });
  });

  it("rejects malformed emails", () => {
    for (const email of ["nope", "a@b", "a b@c.com", "a@b..com", "@x.com", "a@x.c"]) {
      const result = validateContactFields({ ...valid, email });
      expect(result.ok, email).toBe(false);
      if (!result.ok) expect(result.errors.email, email).toBe("email_invalid");
    }
  });

  it("rejects header-injection attempts in name and email", () => {
    expect(validateContactFields({ ...valid, email: "a@b.com\nBcc: x@y.com" }).ok).toBe(false);
    const named = validateContactFields({ ...valid, name: "Ada\r\nBcc: x@y.com" });
    expect(named.ok).toBe(false);
  });

  it("enforces length limits", () => {
    const long = (n: number) => "a".repeat(n);
    const name = validateContactFields({ ...valid, name: long(CONTACT_LIMITS.name + 1) });
    expect(!name.ok && name.errors.name).toBe("name_too_long");
    const email = validateContactFields({
      ...valid,
      email: `${long(CONTACT_LIMITS.email)}@example.com`,
    });
    expect(!email.ok && email.errors.email).toBe("email_too_long");
    const msg = validateContactFields({ ...valid, message: long(CONTACT_LIMITS.message + 1) });
    expect(!msg.ok && msg.errors.message).toBe("message_too_long");
  });

  it("requires a minimum message length", () => {
    const result = validateContactFields({ ...valid, message: "hi" });
    expect(!result.ok && result.errors.message).toBe("message_too_short");
  });

  it("only accepts project types from the allow-list", () => {
    for (const projectType of ["ux-ui", "web-design", "web-development", "ai-mvp", "graphic-design", "other"])
      expect(validateContactFields({ ...valid, projectType }).ok, projectType).toBe(true);
    for (const projectType of ["hacking", "", "UX-UI", 3, null]) {
      const result = validateContactFields({ ...valid, projectType });
      expect(result.ok, String(projectType)).toBe(false);
    }
  });

  it("ignores non-string values instead of throwing", () => {
    const result = validateContactFields({ ...valid, name: 42, message: { a: 1 } });
    expect(result.ok).toBe(false);
  });
});

describe("validateContactPayload", () => {
  it("rejects anything that is not an object", () => {
    for (const body of [null, undefined, "x", 3, []]) {
      const result = validateContactPayload(body);
      expect(result).toEqual({ ok: false, status: 400, error: "invalid_payload" });
    }
  });

  it("rejects a filled honeypot before validating anything else", () => {
    const result = validateContactPayload({ ...valid, honeypot: "http://spam" });
    expect(result).toEqual({ ok: false, status: 400, error: "spam_detected" });
  });

  it("requires a reCAPTCHA token", () => {
    const result = validateContactPayload({ ...valid, recaptchaToken: "" });
    expect(result).toEqual({ ok: false, status: 400, error: "recaptcha_missing" });
  });

  it("returns field errors under a single validation_failed code", () => {
    const result = validateContactPayload({ ...valid, email: "nope" });
    expect(result).toEqual({
      ok: false,
      status: 400,
      error: "validation_failed",
      fields: { email: "email_invalid" },
    });
  });

  it("returns clean data, defaulting the locale to es", () => {
    const ok = validateContactPayload({ ...valid, locale: "fr" });
    expect(ok.ok).toBe(true);
    if (ok.ok) {
      expect(ok.data.locale).toBe("es");
      expect(ok.recaptchaToken).toBe("token");
    }
  });
});
