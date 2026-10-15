import type { Locale } from "@/i18n/routes";
import type { PageSeo } from "./types";

export type ContactContent = {
  seo: PageSeo;
  h1: string;
  intro: string;
  include: { heading: string; items: string[] };
  next: { heading: string; steps: string[] };
  /** Shown under the form. */
  privacyNote: string;
  channels: {
    heading: string;
    email: { label: string; ariaLabel: string };
    linkedin: { label: string; ariaLabel: string };
    github: { label: string; ariaLabel: string };
    cv: { label: string; ariaLabel: string };
  };
};

export const contactContent: Record<Locale, ContactContent> = {
  es: {
    seo: {
      title: "Contacto: diseño UX/UI, web y MVPs",
      description:
        "Contame sobre tu producto, tu sitio o tu idea. Diseño UX/UI y de producto, diseño y desarrollo web y MVPs con IA. Te respondo personalmente.",
    },
    h1: "Contacto",
    intro:
      "Contame en qué estás trabajando y qué necesitás resolver. No hace falta tenerlo todo definido.",
    include: {
      heading: "Para arrancar mejor, contame",
      items: [
        "Qué hace tu empresa o tu producto, y para quién.",
        "Qué querés resolver: un producto para ordenar, un sitio nuevo, una implementación o una idea para validar.",
        "Qué existe hoy: sitio, diseño, prototipo o solo la idea.",
        "Si hay una fecha o un presupuesto de referencia.",
      ],
    },
    next: {
      heading: "Qué pasa después",
      steps: [
        "Leo tu mensaje y te respondo personalmente por email.",
        "Si tiene sentido, coordinamos una charla para entender el proyecto.",
        "Te mando una propuesta con alcance y etapas.",
      ],
    },
    privacyNote:
      "Uso tus datos solo para responderte. No los comparto ni te sumo a ninguna lista.",
    channels: {
      heading: "También podés escribirme por",
      email: { label: "Email", ariaLabel: "Escribir un email a Francisco Sixto" },
      linkedin: {
        label: "LinkedIn",
        ariaLabel: "Perfil de LinkedIn de Francisco Sixto (se abre en una pestaña nueva)",
      },
      github: {
        label: "GitHub",
        ariaLabel: "Perfil de GitHub de Francisco Sixto (se abre en una pestaña nueva)",
      },
      cv: {
        label: "Descargar CV (PDF)",
        ariaLabel: "Descargar el CV de Francisco Sixto en PDF",
      },
    },
  },
  en: {
    seo: {
      title: "Contact: UX/UI, Web Design & MVPs",
      description:
        "Tell me about your product, website or idea. UX/UI and product design, web design and development, and AI-assisted MVPs. I'll reply personally.",
    },
    h1: "Contact",
    intro:
      "Tell me what you're working on and what you need to solve. It doesn't have to be fully defined.",
    include: {
      heading: "To get started, tell me",
      items: [
        "What your company or product does, and who it's for.",
        "What you want to solve: a product to untangle, a new website, an implementation or an idea to validate.",
        "What exists today: a website, a design, a prototype or just the idea.",
        "Any target date or reference budget.",
      ],
    },
    next: {
      heading: "What happens next",
      steps: [
        "I read your message and reply personally by email.",
        "If it makes sense, we set up a call to understand the project.",
        "I send you a proposal with scope and phases.",
      ],
    },
    privacyNote:
      "I only use your details to reply to you. I don't share them or add you to any list.",
    channels: {
      heading: "You can also reach me via",
      email: { label: "Email", ariaLabel: "Email Francisco Sixto" },
      linkedin: {
        label: "LinkedIn",
        ariaLabel: "Francisco Sixto on LinkedIn (opens in a new tab)",
      },
      github: {
        label: "GitHub",
        ariaLabel: "Francisco Sixto on GitHub (opens in a new tab)",
      },
      cv: {
        label: "Download CV (PDF, Spanish)",
        ariaLabel: "Download Francisco Sixto's CV as a PDF (in Spanish)",
      },
    },
  },
};
