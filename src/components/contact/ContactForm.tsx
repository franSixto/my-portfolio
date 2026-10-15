"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Label from "@/components/theme/Label";
import ErrorMessage from "@/components/theme/ErrorMessage";
import SubmitButton from "@/components/theme/SubmitButton";
import { RiCheckLine, RiMailSendLine } from "react-icons/ri";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useLanguage } from "@/contexts/LanguageContext";
import { buttonClasses } from "@/components/ui/ButtonLink";

const fieldClass =
  "block w-full rounded-[var(--radius-control)] border border-rule-strong bg-paper px-4 py-3 text-ui text-ink transition-colors hover:border-ink focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent aria-[invalid=true]:border-danger";


type FormData = {
  name: string;
  email: string;
  message: string;
  honeypot?: string; // Optional field for honeypot
};

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { t, localePath } = useLanguage();

  const onSubmit = async (data: FormData) => {
    if (!recaptchaToken) {
      alert(t('contact.form.recaptchaError'));
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error enviando el mensaje:", error);
    } finally {
      setIsSubmitting(false); // Cambia a "false" al finalizar el envío
    }
  };

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-title"
      aria-live="polite"
      aria-busy={isSubmitting}
      className="rounded-[var(--radius-media)] border border-rule bg-raised p-6 md:p-10"
    >
        <h2 id="contact-form-title" className="mb-8 font-sans text-h3 font-semibold text-ink">
          {t('contact.form.title')}
        </h2>
        {submitted ? (
          <div className="rounded-[var(--radius-control)] bg-accent-soft p-6">
            <RiCheckLine aria-hidden="true" className="size-8 text-accent" />
            <h3 className="mt-3 font-sans text-[1.1875rem] font-semibold text-ink">{t('contact.form.successTitle')}</h3>
            <p className="mt-1 text-ui text-muted">{t('contact.form.successMessage')}</p>
            <Link href={localePath('home')} className={buttonClasses({ variant: "secondary", className: "mt-6" })}>
              {t('common.backHome')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: "none" }}
                {...register("honeypot")}
              />
            </div>
            <div>
              <Label htmlFor="name" text={t('contact.form.name')} />
              <input
                id="name"
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name", { required: t('contact.form.nameRequired') })}
                className={fieldClass}
              />
              {errors.name && <ErrorMessage id="name-error" message={errors.name.message || ""} />}
            </div>

            <div>
              <Label htmlFor="email" text={t('contact.form.email')} />
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email", { 
                  required: t('contact.form.emailRequired'), 
                  pattern: { 
                    value: /^\S+@\S+$/, 
                    message: t('contact.form.emailInvalid') 
                  } 
                })}
                className={fieldClass}
              />
              {errors.email && <ErrorMessage id="email-error" message={errors.email.message || ""} />}
            </div>

            <div>
              <Label htmlFor="message" text={t('contact.form.message')} />
              <textarea
                id="message"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                {...register("message", { required: t('contact.form.messageRequired') })}
                className={`${fieldClass} min-h-40 py-3 leading-relaxed`}
                rows={6}
              ></textarea>
              {errors.message && <ErrorMessage id="message-error" message={errors.message.message || ""} />}
            </div>
            <div className="overflow-x-auto">
              <ReCAPTCHA
                sitekey="6LeC3lcrAAAAAGIC5fThStXnImx2Xn2Lv_ogQPUS"
                onChange={(token: string | null) => setRecaptchaToken(token)}
              />
            </div>
            <SubmitButton 
              isSubmitting={isSubmitting} 
              submittingText={t('contact.form.sending')} 
              defaultText={t('contact.form.send')} 
              Icon={RiMailSendLine} 
            />
          </form>
        )}
    </section>
  );
}
