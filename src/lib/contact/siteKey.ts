/**
 * Public reCAPTCHA site key (safe to ship to the browser). Set
 * NEXT_PUBLIC_RECAPTCHA_SITE_KEY in Vercel to rotate it; the fallback is the key
 * already used in production so a missing variable does not break the form.
 */
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeC3lcrAAAAAGIC5fThStXnImx2Xn2Lv_ogQPUS";
