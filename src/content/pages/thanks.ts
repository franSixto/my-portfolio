import type { Locale } from "@/i18n/routes";
import type { PageSeo } from "./types";

/** Post-submission page (noindex). Shown after the Google Ads lead form. */
export type ThanksContent = {
  seo: PageSeo;
  h1: string;
  lead: string;
  stepsHeading: string;
  steps: string[];
  whatsapp: { label: string; hint: string; ariaLabel: string };
  projectsCta: string;
};

export const thanksContent: Record<Locale, ThanksContent> = {
  es: {
    seo: {
      title: "Gracias por tu consulta",
      description: "Recibí tu consulta y te respondo en menos de 24 horas.",
    },
    h1: "¡Gracias! Ya recibí tu consulta.",
    lead: "Te respondo en menos de 24 horas.",
    stepsHeading: "Qué pasa ahora",
    steps: [
      "Reviso lo que me contaste.",
      "Te escribo para entender mejor tu proyecto.",
      "Si encaramos, te paso una propuesta clara.",
    ],
    whatsapp: {
      label: "Escribime por WhatsApp",
      hint: "Si es urgente, es la vía más rápida.",
      ariaLabel: "Escribime por WhatsApp (se abre en una pestaña nueva)",
    },
    projectsCta: "Ver proyectos",
  },
  en: {
    seo: {
      title: "Thanks for your inquiry",
      description: "I received your inquiry and I will reply within 24 hours.",
    },
    h1: "Thank you! I got your inquiry.",
    lead: "I will reply within 24 hours.",
    stepsHeading: "What happens next",
    steps: [
      "I review what you told me.",
      "I write to you to understand your project better.",
      "If we move forward, I send you a clear proposal.",
    ],
    whatsapp: {
      label: "Message me on WhatsApp",
      hint: "If it is urgent, this is the fastest way.",
      ariaLabel: "Message me on WhatsApp (opens in a new tab)",
    },
    projectsCta: "View projects",
  },
};
