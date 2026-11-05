import type { Locale } from "@/i18n/routes";
import type { PageSeo } from "./types";

/**
 * Privacy policy copy. `{email}` is replaced at render time with the contact
 * address (EMAIL in src/content/site.ts) so the address lives in one place.
 */
export type PrivacySection = {
  heading: string;
  paragraphs: string[];
  items: string[];
};

export type PrivacyContent = {
  seo: PageSeo;
  h1: string;
  lead: string;
  updated: { label: string; text: string; iso: string };
  sections: PrivacySection[];
};

export const privacyContent: Record<Locale, PrivacyContent> = {
  es: {
    seo: {
      title: "Política de privacidad",
      description:
        "Qué datos personales recopila fransixto.com.ar, para qué se usan, con quién se comparten, cuánto tiempo se conservan y cómo ejercer tus derechos.",
    },
    h1: "Política de privacidad",
    lead: "Esta política explica qué datos personales se recopilan cuando visitás este sitio, completás el formulario de contacto o enviás tus datos a través de un anuncio de Google, y qué derechos tenés sobre ellos.",
    updated: { label: "Última actualización", text: "5 de noviembre de 2026", iso: "2026-11-05" },
    sections: [
      {
        heading: "Responsable del tratamiento",
        paragraphs: [
          "El responsable del tratamiento de los datos es Francisco Sixto, profesional independiente con domicilio en Córdoba, Argentina. Para cualquier consulta sobre esta política o sobre tus datos, podés escribir a {email}.",
        ],
        items: [],
      },
      {
        heading: "Datos que se recopilan",
        paragraphs: ["Según cómo te comuniques conmigo, se pueden recopilar los siguientes datos:"],
        items: [
          "Los datos que enviás en el formulario de contacto: nombre, email, tipo de proyecto (opcional) y mensaje.",
          "Los datos que enviás en un formulario de clientes potenciales de un anuncio de Google, limitados a los campos que ese formulario muestra (por ejemplo nombre, email o teléfono, según corresponda).",
          "Los datos que compartís si elegís escribirme por WhatsApp, email u otro canal.",
          "Datos técnicos y de uso del sitio, como la dirección IP, el navegador y las páginas visitadas, a través de los servicios descritos más abajo.",
        ],
      },
      {
        heading: "Formulario de contacto",
        paragraphs: [
          "Los datos del formulario se envían por email a mi casilla de Gmail (Google) mediante nodemailer. El sitio no los guarda en una base de datos. Una vez recibido el mensaje, queda en mi casilla de correo, donde lo conservo y respondo.",
          "Los nombres, emails y textos de los mensajes nunca se envían a las herramientas de analítica del sitio.",
        ],
        items: [],
      },
      {
        heading: "Formularios de clientes potenciales de Google Ads",
        paragraphs: [
          "Cuando completás un formulario de clientes potenciales dentro de un anuncio de Google, es Google quien recopila los datos que enviás y los pone a mi disposición. Los uso para responder tu consulta. Esto aplica a los campos que muestra ese formulario, por ejemplo nombre, email y teléfono, según corresponda.",
          "El tratamiento que Google hace de esos datos se rige por su propia política de privacidad.",
        ],
        items: [],
      },
      {
        heading: "WhatsApp",
        paragraphs: [
          "El sitio ofrece la opción de escribirme por WhatsApp. Si la elegís, la conversación se rige por la política de privacidad y los términos de WhatsApp (Meta), además de esta política en lo que respecta a los datos que me compartís.",
        ],
        items: [],
      },
      {
        heading: "Protección contra spam: Google reCAPTCHA",
        paragraphs: [
          "El formulario de contacto usa Google reCAPTCHA para evitar el envío automatizado de mensajes. Google procesa los datos necesarios para esa verificación conforme a su política de privacidad y sus condiciones de servicio.",
          "Al enviar el formulario, la dirección IP se usa de forma transitoria para limitar la cantidad de envíos por dirección y para la verificación de reCAPTCHA. El límite de envíos se lleva en memoria del servidor, no se guarda en una base de datos y se descarta al vencer la ventana de tiempo.",
        ],
        items: [],
      },
      {
        heading: "Hosting y analítica",
        paragraphs: [
          "El sitio está alojado en Vercel. Como cualquier servicio de hosting, puede procesar datos técnicos de cada visita, como la dirección IP, para entregar el sitio.",
          "Uso Vercel Analytics para obtener métricas agregadas de uso y eventos no personales, por ejemplo qué canal de contacto se utilizó. Nunca se envían nombres, emails ni textos de mensajes a la analítica.",
          "Cuando está habilitado, el sitio también usa Google Analytics para medir el uso del sitio, lo que puede implicar el uso de cookies.",
        ],
        items: [],
      },
      {
        heading: "Cookies y publicidad",
        paragraphs: [
          "Google Analytics y Google Ads pueden usar cookies o tecnologías similares para medir el uso del sitio y la efectividad de la publicidad. Podés bloquear o eliminar las cookies desde la configuración de tu navegador, y administrar la personalización de anuncios desde la Configuración de anuncios de Google. Si las bloqueás, algunas funciones de medición pueden dejar de funcionar, pero el sitio sigue siendo utilizable.",
        ],
        items: [],
      },
      {
        heading: "Finalidad del tratamiento",
        paragraphs: ["Uso los datos personales para:"],
        items: [
          "Responder tus consultas.",
          "Enviarte presupuestos o información sobre proyectos.",
          "Entender cómo se usa el sitio y mejorarlo.",
          "No vendo datos personales. No te envío mensajes de marketing más allá de tu consulta, salvo que lo aceptes.",
        ],
      },
      {
        heading: "Conservación",
        paragraphs: [
          "Conservo los datos solo durante el tiempo necesario para atender tu consulta y la eventual relación de trabajo que surja de ella, y durante el tiempo que la ley exija.",
        ],
        items: [],
      },
      {
        heading: "Tus derechos",
        paragraphs: [
          "De acuerdo con la Ley de Protección de los Datos Personales N.º 25.326 de Argentina, podés acceder a tus datos, rectificarlos, actualizarlos y solicitar su supresión escribiendo a {email}.",
          "La Agencia de Acceso a la Información Pública (AAIP), en su carácter de órgano de control de la Ley N.º 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.",
          "Si residís fuera de Argentina, la legislación de tu país puede reconocerte derechos similares, por ejemplo el Reglamento General de Protección de Datos (GDPR) de la Unión Europea. Podés escribirme y atenderé tu solicitud, aunque esta política no declara el cumplimiento integral de esa norma.",
        ],
        items: [],
      },
      {
        heading: "Transferencias internacionales",
        paragraphs: [
          "Los proveedores que intervienen en el sitio, como Google, Vercel y Meta (WhatsApp), pueden procesar datos fuera de Argentina, incluso en países con un nivel de protección distinto.",
        ],
        items: [],
      },
      {
        heading: "Menores de edad",
        paragraphs: [
          "Este sitio está dirigido a empresas y personas adultas. No recopilo conscientemente datos de menores de edad.",
        ],
        items: [],
      },
      {
        heading: "Cambios en esta política",
        paragraphs: [
          "Puedo actualizar esta política cuando cambie el funcionamiento del sitio o la normativa aplicable. La fecha de última actualización figura al comienzo de esta página.",
        ],
        items: [],
      },
    ],
  },
  en: {
    seo: {
      title: "Privacy policy",
      description:
        "What personal data fransixto.com.ar collects, why it is used, who it is shared with, how long it is kept and how to exercise your rights.",
    },
    h1: "Privacy policy",
    lead: "This policy explains what personal data is collected when you visit this site, fill in the contact form or submit your details through a Google ad, and what rights you have over it.",
    updated: { label: "Last updated", text: "5 November 2026", iso: "2026-11-05" },
    sections: [
      {
        heading: "Data controller",
        paragraphs: [
          "The data controller is Francisco Sixto, an independent professional based in Córdoba, Argentina. For any question about this policy or your data, write to {email}.",
        ],
        items: [],
      },
      {
        heading: "Data collected",
        paragraphs: ["Depending on how you get in touch, the following data may be collected:"],
        items: [
          "The data you submit in the contact form: name, email, project type (optional) and message.",
          "The data you submit in a lead form inside a Google ad, limited to the fields that form shows (for example name, email or phone, as applicable).",
          "The data you share if you choose to write to me through WhatsApp, email or another channel.",
          "Technical and usage data, such as IP address, browser and pages visited, through the services described below.",
        ],
      },
      {
        heading: "Contact form",
        paragraphs: [
          "The form data is sent by email to my Gmail inbox (Google) using nodemailer. The site does not store it in a database. Once received, the message stays in my mailbox, where I keep it and reply to it.",
          "Names, emails and message text are never sent to the site's analytics tools.",
        ],
        items: [],
      },
      {
        heading: "Google Ads lead forms",
        paragraphs: [
          "When you fill in a lead form inside a Google ad, Google collects the data you submit and makes it available to me. I use it to reply to your enquiry. This applies to the fields shown in that form, for example name, email and phone, as applicable.",
          "How Google processes that data is governed by its own privacy policy.",
        ],
        items: [],
      },
      {
        heading: "WhatsApp",
        paragraphs: [
          "The site offers the option to write to me through WhatsApp. If you choose it, the conversation is governed by the WhatsApp (Meta) privacy policy and terms, in addition to this policy for the data you share with me.",
        ],
        items: [],
      },
      {
        heading: "Spam protection: Google reCAPTCHA",
        paragraphs: [
          "The contact form uses Google reCAPTCHA to prevent automated submissions. Google processes the data needed for that check in line with its privacy policy and terms of service.",
          "When you submit the form, your IP address is used transiently to limit the number of submissions per address and for the reCAPTCHA verification. The submission limit is kept in server memory, is not stored in a database and is discarded when the time window expires.",
        ],
        items: [],
      },
      {
        heading: "Hosting and analytics",
        paragraphs: [
          "The site is hosted on Vercel. Like any hosting service, it may process technical data about each visit, such as the IP address, in order to deliver the site.",
          "I use Vercel Analytics to get aggregated usage metrics and non-personal events, for example which contact channel was used. Names, emails and message text are never sent to analytics.",
          "When enabled, the site also uses Google Analytics to measure site usage, which may involve the use of cookies.",
        ],
        items: [],
      },
      {
        heading: "Cookies and advertising",
        paragraphs: [
          "Google Analytics and Google Ads may use cookies or similar technologies to measure site usage and advertising performance. You can block or delete cookies in your browser settings, and manage ad personalisation in Google's Ads Settings. If you block them, some measurement features may stop working, but the site remains usable.",
        ],
        items: [],
      },
      {
        heading: "Purpose of processing",
        paragraphs: ["I use personal data to:"],
        items: [
          "Reply to your enquiries.",
          "Send you quotes or project information.",
          "Understand how the site is used and improve it.",
          "I do not sell personal data. I do not send marketing messages beyond your enquiry unless you agree to it.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "I keep data only as long as needed to handle your enquiry and any working relationship that results from it, and for as long as the law requires.",
        ],
        items: [],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Under Argentina's Personal Data Protection Law No. 25.326, you may access, rectify and update your data, and request its deletion, by writing to {email}.",
          "The Agencia de Acceso a la Información Pública (AAIP), as the supervisory authority under Law No. 25.326, has the power to handle complaints and claims regarding non-compliance with personal data protection rules.",
          "If you live outside Argentina, the law of your country may give you similar rights, for example the European Union's General Data Protection Regulation (GDPR). You can write to me and I will handle your request, although this policy does not claim full compliance with that regulation.",
        ],
        items: [],
      },
      {
        heading: "International transfers",
        paragraphs: [
          "The providers involved in the site, such as Google, Vercel and Meta (WhatsApp), may process data outside Argentina, including in countries with a different level of data protection.",
        ],
        items: [],
      },
      {
        heading: "Minors",
        paragraphs: [
          "This site is aimed at businesses and adults. I do not knowingly collect data from minors.",
        ],
        items: [],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "I may update this policy when the way the site works or the applicable rules change. The date of the last update appears at the top of this page.",
        ],
        items: [],
      },
    ],
  },
};
