"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { RiCheckLine, RiMailSendLine } from "react-icons/ri";
import ErrorMessage from "@/components/theme/ErrorMessage";
import Label from "@/components/theme/Label";
import SubmitButton from "@/components/theme/SubmitButton";
import type { ContactFormCopy } from "@/content/pages/contact";
import type { Locale } from "@/i18n/routes";
import { trackEvent } from "@/lib/analytics";
import {
  PROJECT_TYPE_KEYS,
  PROJECT_TYPE_PARAM,
  projectTypeFromQuery,
  type ProjectTypeKey,
} from "@/lib/contact/projectTypes";
import { RECAPTCHA_SITE_KEY } from "@/lib/contact/siteKey";
import { validateContactFields, type FieldErrorCode } from "@/lib/contact/validate";

const fieldClass =
  "block w-full rounded-[var(--radius-control)] border border-rule-strong bg-paper px-4 py-3 text-ui text-ink transition-colors hover:border-ink focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent aria-[invalid=true]:border-danger";
const helpClass = "mt-2 text-meta text-muted";

type FormValues = {
  name: string;
  email: string;
  projectType: ProjectTypeKey | "";
  message: string;
  honeypot: string;
  recaptchaToken: string;
};

type Status = "idle" | "submitting" | "success" | "error";

// Same validator as the API route: the browser and the server cannot disagree.
const resolver: Resolver<FormValues> = async (values) => {
  const errors: FieldErrors<FormValues> = {};
  const result = validateContactFields(values);
  if (!result.ok) {
    for (const [field, code] of Object.entries(result.errors)) {
      errors[field as keyof FormValues] = { type: code };
    }
  }
  if (!values.recaptchaToken) errors.recaptchaToken = { type: "recaptcha_required" };
  return Object.keys(errors).length > 0 ? { values: {}, errors } : { values, errors: {} };
};

function describedBy(...ids: (string | false | undefined)[]) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export default function ContactForm({ copy, locale }: { copy: ContactFormCopy; locale: Locale }) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver,
    defaultValues: { name: "", email: "", projectType: "", message: "", honeypot: "", recaptchaToken: "" },
  });
  const [status, setStatus] = useState<Status>("idle");
  const [captchaUnavailable, setCaptchaUnavailable] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const recaptchaBoxRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Preselect the project type when linked from a service page CTA.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = projectTypeFromQuery(
      params.get(PROJECT_TYPE_PARAM[locale]) ?? params.get(PROJECT_TYPE_PARAM[locale === "es" ? "en" : "es"])
    );
    if (requested && !getValues("projectType")) setValue("projectType", requested);
  }, [getValues, locale, setValue]);

  const fieldError = (name: keyof FormValues) => {
    const type = errors[name]?.type as FieldErrorCode | "recaptcha_required" | undefined;
    if (!type) return undefined;
    return type === "recaptcha_required" ? copy.recaptchaError : copy.errors[type];
  };

  const resetRecaptcha = () => {
    recaptchaRef.current?.reset();
    setValue("recaptchaToken", "");
  };

  const onInvalid = (invalid: FieldErrors<FormValues>) => {
    // RHF already focuses the first invalid input; the widget is not an input.
    const onlyRecaptcha = Object.keys(invalid).every((key) => key === "recaptchaToken");
    if (onlyRecaptcha) recaptchaBoxRef.current?.focus();
  };

  const onValid = async (values: FormValues) => {
    setStatus("submitting");
    setCaptchaUnavailable(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data: { error?: string; fields?: Record<string, FieldErrorCode> } | null = await response
        .json()
        .catch(() => null);

      if (response.ok) {
        trackEvent("contact_submit", { project_type: values.projectType, locale });
        setStatus("success");
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      // The token is single-use: always ask for a fresh check after a failed attempt.
      resetRecaptcha();

      if (data?.error === "validation_failed" && data.fields) {
        const entries = Object.entries(data.fields) as [keyof FormValues, FieldErrorCode][];
        for (const [field, code] of entries) setError(field, { type: code });
        setStatus("idle");
        if (entries[0]) setFocus(entries[0][0]);
        return;
      }
      setCaptchaUnavailable(data?.error === "captcha_unavailable");
      setStatus("error");
    } catch {
      resetRecaptcha();
      setStatus("error");
    }
  };

  const submitting = status === "submitting";
  const done = status === "success";

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-title"
      className="rounded-[var(--radius-media)] border border-rule bg-raised p-6 md:p-10"
    >
      <h2 id="contact-form-title" className="mb-8 font-sans text-h3 font-semibold text-ink">
        {copy.heading}
      </h2>

      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        noValidate
        aria-label={copy.ariaLabel}
        aria-busy={submitting}
        className="space-y-6"
      >
        <div hidden={done} className="space-y-6">
          {/* Honeypot: invisible to people, tempting to bots. */}
          <div aria-hidden="true" style={{ display: "none" }}>
            <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
          </div>

          <div>
            <Label htmlFor="name" text={copy.name.label} />
            <input
              id="name"
              autoComplete="name"
              placeholder={copy.name.placeholder}
              aria-required="true"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy(errors.name && "name-error")}
              className={fieldClass}
              {...register("name")}
            />
            {errors.name && <ErrorMessage id="name-error" message={fieldError("name") ?? ""} />}
          </div>

          <div>
            <Label htmlFor="email" text={copy.email.label} />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={copy.email.placeholder}
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email-help", errors.email && "email-error")}
              className={fieldClass}
              {...register("email")}
            />
            <p id="email-help" className={helpClass}>
              {copy.email.help}
            </p>
            {errors.email && <ErrorMessage id="email-error" message={fieldError("email") ?? ""} />}
          </div>

          <div>
            <Label htmlFor="projectType" text={copy.projectType.label} />
            <select
              id="projectType"
              aria-required="true"
              aria-invalid={errors.projectType ? true : undefined}
              aria-describedby={describedBy(errors.projectType && "projectType-error")}
              className={fieldClass}
              {...register("projectType")}
            >
              <option value="">{copy.projectType.placeholder}</option>
              {PROJECT_TYPE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {copy.projectType.options[key]}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <ErrorMessage id="projectType-error" message={fieldError("projectType") ?? ""} />
            )}
          </div>

          <div>
            <Label htmlFor="message" text={copy.message.label} />
            <textarea
              id="message"
              rows={6}
              placeholder={copy.message.placeholder}
              aria-required="true"
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy("message-help", errors.message && "message-error")}
              className={`${fieldClass} min-h-40 py-3 leading-relaxed`}
              {...register("message")}
            />
            <p id="message-help" className={helpClass}>
              {copy.message.help}
            </p>
            {errors.message && <ErrorMessage id="message-error" message={fieldError("message") ?? ""} />}
          </div>

          <div>
            <div
              ref={recaptchaBoxRef}
              tabIndex={-1}
              aria-describedby={describedBy("recaptcha-notice", errors.recaptchaToken && "recaptcha-error")}
              className="overflow-x-auto outline-none focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                hl={locale}
                onChange={(token: string | null) =>
                  setValue("recaptchaToken", token ?? "", { shouldValidate: isSubmitted })
                }
                onExpired={() => setValue("recaptchaToken", "")}
              />
            </div>
            <p id="recaptcha-notice" className={helpClass}>
              {copy.spamNotice}
            </p>
            {errors.recaptchaToken && (
              <ErrorMessage id="recaptcha-error" message={fieldError("recaptchaToken") ?? ""} />
            )}
          </div>
        </div>

        {/* Always in the DOM so assistive tech announces what gets injected. */}
        <div ref={statusRef} role="status" aria-live="polite" tabIndex={-1} className="outline-none">
          {status === "success" && (
            <div className="rounded-[var(--radius-control)] bg-accent-soft p-6">
              <RiCheckLine aria-hidden="true" className="size-8 text-accent" />
              <p className="mt-3 font-sans text-[1.1875rem] font-semibold text-ink">{copy.success.title}</p>
              <p className="mt-1 text-ui text-muted">{copy.success.text}</p>
            </div>
          )}
          {status === "error" && (
            <p className="rounded-[var(--radius-control)] border border-danger p-4 text-ui font-medium text-danger text-pretty">
              {captchaUnavailable ? copy.captchaUnavailable : copy.failure}
            </p>
          )}
        </div>

        {!done && (
          <SubmitButton
            isSubmitting={submitting}
            submittingText={copy.submitting}
            defaultText={copy.submit}
            Icon={RiMailSendLine}
          />
        )}
      </form>
    </section>
  );
}
