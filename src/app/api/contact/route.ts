import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildContactEmail } from "@/lib/contact/email";
import { createRateLimiter, getClientIp } from "@/lib/contact/rateLimit";
import { verifyRecaptcha } from "@/lib/contact/recaptcha";
import { validateContactPayload } from "@/lib/contact/validate";

export const runtime = "nodejs";

// 5 submissions per 10 minutes per IP. Best-effort: serverless instances do not
// share memory (see rateLimit.ts).
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

type ErrorCode =
  | "invalid_json"
  | "invalid_payload"
  | "spam_detected"
  | "recaptcha_missing"
  | "recaptcha_failed"
  | "validation_failed"
  | "rate_limited"
  | "send_failed"
  | "server_misconfigured";

function fail(status: number, error: ErrorCode, extra: Record<string, unknown> = {}, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers });
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);

  const rate = limiter.check(ip);
  if (!rate.allowed) {
    return fail(429, "rate_limited", {}, { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "invalid_json");
  }

  const parsed = validateContactPayload(body);
  if (!parsed.ok) {
    return "fields" in parsed
      ? fail(parsed.status, parsed.error, { fields: parsed.fields })
      : fail(parsed.status, parsed.error);
  }

  const { EMAIL_USER, EMAIL_PASS, RECAPTCHA_SECRET_KEY } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS || !RECAPTCHA_SECRET_KEY) {
    // Name the missing setting only: never print the values.
    console.error("Contact API is not configured: missing environment variables.");
    return fail(500, "server_misconfigured");
  }

  const verdict = await verifyRecaptcha(parsed.recaptchaToken, RECAPTCHA_SECRET_KEY, ip);
  if (verdict === "failed") return fail(400, "recaptcha_failed");
  if (verdict === "unavailable") return fail(502, "send_failed");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });
    const mail = buildContactEmail(parsed.data, EMAIL_USER);
    await transporter.sendMail({ from: `"Contacto Web" <${EMAIL_USER}>`, ...mail });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    // Log the failure class only: the error can carry message content.
    console.error("Contact email failed:", error instanceof Error ? error.name : "unknown error");
    return fail(502, "send_failed");
  }
}
