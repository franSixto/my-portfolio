import { isProjectTypeKey, type ProjectTypeKey } from "./projectTypes";

/** Shared by the form (client) and the API route (server): one source of truth. */
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  message: 5000,
} as const;

export type ContactField = "name" | "email" | "projectType" | "message";

export type FieldErrorCode =
  | "name_required"
  | "name_too_long"
  | "name_invalid"
  | "email_required"
  | "email_invalid"
  | "email_too_long"
  | "project_type_required"
  | "project_type_invalid"
  | "message_required"
  | "message_too_short"
  | "message_too_long";

export type ContactData = {
  name: string;
  email: string;
  projectType: ProjectTypeKey;
  message: string;
  locale: "es" | "en";
};

export type FieldErrors = Partial<Record<ContactField, FieldErrorCode>>;

// Practical check, not RFC 5322: one @, a dotted domain, a 2+ letter TLD, no spaces.
const EMAIL = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[^\s@.]{2,}$/;
const LINE_BREAK = /[\r\n]/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Field-level validation. Returns every error at once so a form can show them all. */
export function validateContactFields(
  input: Record<string, unknown>
): { ok: true; data: ContactData } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = text(input.name);
  const email = text(input.email);
  const message = text(input.message);
  const projectType = typeof input.projectType === "string" ? input.projectType : "";

  if (!name) errors.name = "name_required";
  else if (name.length > CONTACT_LIMITS.name) errors.name = "name_too_long";
  else if (LINE_BREAK.test(name)) errors.name = "name_invalid";

  if (!email) errors.email = "email_required";
  else if (email.length > CONTACT_LIMITS.email) errors.email = "email_too_long";
  else if (!EMAIL.test(email)) errors.email = "email_invalid";

  if (!projectType) errors.projectType = "project_type_required";
  else if (!isProjectTypeKey(projectType)) errors.projectType = "project_type_invalid";

  if (!message) errors.message = "message_required";
  else if (message.length < CONTACT_LIMITS.messageMin) errors.message = "message_too_short";
  else if (message.length > CONTACT_LIMITS.message) errors.message = "message_too_long";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      projectType: projectType as ProjectTypeKey,
      message,
      locale: input.locale === "en" ? "en" : "es",
    },
  };
}

export type RejectionCode = "invalid_payload" | "spam_detected" | "recaptcha_missing" | "validation_failed";

export type ContactPayloadResult =
  | { ok: true; data: ContactData; recaptchaToken: string }
  | { ok: false; status: 400; error: Exclude<RejectionCode, "validation_failed"> }
  | { ok: false; status: 400; error: "validation_failed"; fields: FieldErrors };

/** Full request-body validation for the API route. Pure: no I/O. */
export function validateContactPayload(body: unknown): ContactPayloadResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, status: 400, error: "invalid_payload" };
  }
  const input = body as Record<string, unknown>;

  // Honeypot: real users never see this field.
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") {
    return { ok: false, status: 400, error: "spam_detected" };
  }

  const token = typeof input.recaptchaToken === "string" ? input.recaptchaToken.trim() : "";
  if (!token) return { ok: false, status: 400, error: "recaptcha_missing" };

  const fields = validateContactFields(input);
  if (!fields.ok) return { ok: false, status: 400, error: "validation_failed", fields: fields.errors };

  return { ok: true, data: fields.data, recaptchaToken: token };
}
