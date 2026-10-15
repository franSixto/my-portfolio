const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export type RecaptchaVerdict = "ok" | "failed" | "unavailable";

/**
 * Server-side verification. The body is built with URLSearchParams so the
 * secret and the token are always encoded. Never log either of them.
 */
export async function verifyRecaptcha(
  token: string,
  secret: string | undefined,
  remoteIp?: string,
  fetchImpl: typeof fetch = fetch
): Promise<RecaptchaVerdict> {
  if (!secret) return "unavailable";
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);
  try {
    const res = await fetchImpl(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return "unavailable";
    const data = (await res.json()) as { success?: boolean };
    return data.success === true ? "ok" : "failed";
  } catch {
    return "unavailable";
  }
}

/** Maps a non-ok verdict to the API error response (null when verified). */
export function recaptchaFailure(
  verdict: RecaptchaVerdict
): { status: 400 | 502; error: "recaptcha_failed" | "captcha_unavailable" } | null {
  if (verdict === "failed") return { status: 400, error: "recaptcha_failed" };
  if (verdict === "unavailable") return { status: 502, error: "captcha_unavailable" };
  return null;
}
