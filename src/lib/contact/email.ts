import type { ContactData } from "./validate";

const PROJECT_TYPE_LABEL: Record<ContactData["projectType"], string> = {
  "ux-ui": "UX/UI y product design",
  "web-design": "Diseño web",
  "web-development": "Desarrollo web",
  "ai-mvp": "Prototipo o MVP con IA",
  other: "Otro",
};

export type ContactEmail = {
  to: string;
  subject: string;
  replyTo: string;
  text: string;
};

/** Builds the notification for the site owner. Pure, so it can be tested. */
export function buildContactEmail(data: ContactData, owner: string): ContactEmail {
  const safeName = data.name.replace(/[\r\n]+/g, " ");
  return {
    to: owner,
    subject: `Contacto web: ${PROJECT_TYPE_LABEL[data.projectType]} (${safeName})`,
    replyTo: data.email,
    text: [
      `Nombre: ${data.name}`,
      `Email: ${data.email}`,
      `Tipo de proyecto: ${PROJECT_TYPE_LABEL[data.projectType]} (${data.projectType})`,
      `Idioma del sitio: ${data.locale}`,
      "",
      data.message,
    ].join("\n"),
  };
}
