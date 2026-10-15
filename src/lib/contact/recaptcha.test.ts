import { describe, expect, it } from "vitest";
import { recaptchaFailure, verifyRecaptcha } from "./recaptcha";

describe("recaptchaFailure", () => {
  it("maps verdicts to API errors", () => {
    expect(recaptchaFailure("ok")).toBeNull();
    expect(recaptchaFailure("failed")).toEqual({ status: 400, error: "recaptcha_failed" });
    expect(recaptchaFailure("unavailable")).toEqual({ status: 502, error: "captcha_unavailable" });
  });

  it("reports a network failure as captcha_unavailable, not send_failed", async () => {
    const failing = (() => Promise.reject(new Error("network"))) as unknown as typeof fetch;
    const verdict = await verifyRecaptcha("token", "secret", "1.1.1.1", failing);
    expect(recaptchaFailure(verdict)?.error).toBe("captcha_unavailable");
  });
});
