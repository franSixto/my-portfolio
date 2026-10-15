import type { Locale } from "@/i18n/routes";
import { CONTACT_LIMITS, type FieldErrorCode } from "@/lib/contact/validate";
import type { ProjectTypeKey } from "@/lib/contact/projectTypes";
import type { PageSeo } from "./types";

export type ContactFormCopy = {
  heading: string;
  ariaLabel: string;
  name: { label: string; placeholder: string };
  email: { label: string; placeholder: string; help: string };
  projectType: { label: string; placeholder: string; options: Record<ProjectTypeKey, string> };
  message: { label: string; placeholder: string; help: string };
  /** Field errors by validation code (the same codes the API returns). */
  errors: Record<FieldErrorCode, string>;
  recaptchaError: string;
  /** Shown when the server could not verify the captcha (502 captcha_unavailable). */
  captchaUnavailable: string;
  spamNotice: string;
  submit: string;
  submitting: string;
  success: { title: string; text: string };
  failure: string;
};

export type ContactContent = {
  seo: PageSeo;
  h1: string;
  intro: string;
  include: { heading: string; items: string[] };
  next: { heading: string; steps: string[] };
  /** Heading above the form is `form.heading`. */
  form: ContactFormCopy;
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
    form: {
      heading: "Escribime",
      ariaLabel: "Formulario de contacto",
      name: { label: "Nombre", placeholder: "Tu nombre" },
      email: { label: "Email", placeholder: "tu@empresa.com", help: "Te respondo a esta dirección." },
      projectType: {
        label: "Tipo de proyecto",
        placeholder: "Elegí una opción",
        options: {
          "ux-ui": "UX/UI y product design",
          "web-design": "Diseño web",
          "web-development": "Desarrollo web",
          "ai-mvp": "Prototipo o MVP con IA",
          other: "Otro",
        },
      },
      message: {
        label: "Mensaje",
        placeholder: "Contame qué querés hacer, qué existe hoy y qué te gustaría lograr.",
        help: "Con algunas líneas alcanza.",
      },
      errors: {
        name_required: "Escribí tu nombre.",
        name_too_long: `Usá un nombre más corto (hasta ${CONTACT_LIMITS.name} caracteres).`,
        name_invalid: "Revisá tu nombre: no puede tener saltos de línea.",
        email_required: "Escribí tu email.",
        email_invalid: "Revisá el email: parece que tiene un error.",
        email_too_long: "Revisá el email: parece que tiene un error.",
        project_type_required: "Elegí el tipo de proyecto.",
        project_type_invalid: "Elegí el tipo de proyecto.",
        message_required: "Escribí tu mensaje.",
        message_too_short: "Contame un poco más para poder ayudarte.",
        message_too_long: `El mensaje es muy largo: el máximo es de ${CONTACT_LIMITS.message} caracteres.`,
      },
      recaptchaError: "Completá la verificación de reCAPTCHA.",
      captchaUnavailable:
        "No pudimos verificar el captcha. Probá de nuevo en unos minutos o escribime por email.",
      spamNotice: "Este formulario usa reCAPTCHA para evitar spam.",
      submit: "Enviar mensaje",
      submitting: "Enviando…",
      success: { title: "¡Gracias! Recibí tu mensaje.", text: "Te respondo personalmente por email." },
      failure:
        "No se pudo enviar el mensaje. Probá de nuevo o escribime directamente a franciscomsixto@gmail.com.",
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
    form: {
      heading: "Write to me",
      ariaLabel: "Contact form",
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@company.com", help: "I'll reply to this address." },
      projectType: {
        label: "Project type",
        placeholder: "Choose an option",
        options: {
          "ux-ui": "UX/UI and product design",
          "web-design": "Web design",
          "web-development": "Web development",
          "ai-mvp": "AI-assisted prototype or MVP",
          other: "Other",
        },
      },
      message: {
        label: "Message",
        placeholder: "Tell me what you want to build, what exists today and what you'd like to achieve.",
        help: "A few lines are enough.",
      },
      errors: {
        name_required: "Please enter your name.",
        name_too_long: `Please use a shorter name (up to ${CONTACT_LIMITS.name} characters).`,
        name_invalid: "Please check your name: it can't contain line breaks.",
        email_required: "Please enter your email.",
        email_invalid: "That email doesn't look right. Please check it.",
        email_too_long: "That email doesn't look right. Please check it.",
        project_type_required: "Please choose a project type.",
        project_type_invalid: "Please choose a project type.",
        message_required: "Please write a message.",
        message_too_short: "Tell me a bit more so I can help.",
        message_too_long: `That message is too long: the limit is ${CONTACT_LIMITS.message} characters.`,
      },
      recaptchaError: "Please complete the reCAPTCHA check.",
      captchaUnavailable:
        "We couldn't verify the captcha. Please try again in a few minutes or email me.",
      spamNotice: "This form uses reCAPTCHA to prevent spam.",
      submit: "Send message",
      submitting: "Sending…",
      success: { title: "Thanks! I got your message.", text: "I'll reply personally by email." },
      failure:
        "The message couldn't be sent. Please try again or email me directly at franciscomsixto@gmail.com.",
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
