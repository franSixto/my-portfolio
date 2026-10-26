import type { ContactData } from "./validate";

const PROJECT_TYPE_LABEL: Record<ContactData["projectType"], string> = {
  "ux-ui": "UX/UI y product design",
  "web-design": "Diseño web",
  "web-development": "Desarrollo web",
  "ai-mvp": "Prototipo o MVP con IA",
  "graphic-design": "Diseño gráfico y de marca",
  other: "Otro",
};

const LOCALE_LABEL: Record<ContactData["locale"], string> = { es: "Español", en: "Inglés" };

export type ContactEmail = {
  to: string;
  subject: string;
  replyTo: string;
  text: string;
  html: string;
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
    html: buildContactHtml(data, safeName),
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Site tokens (globals.css, light theme). Mail clients ignore web fonts and
// CSS variables, so everything is inline with system fallbacks.
const C = {
  page: "#eef1ef",
  paper: "#fbfbfa",
  ink: "#14201c",
  muted: "#4e5a55",
  rule: "#d5dbd7",
  accent: "#0b6b55",
};
// Single quotes: these go inside style="..." attributes.
const SANS = `'Helvetica Neue',Helvetica,Arial,sans-serif`;
const SERIF = `Georgia,'Times New Roman',serif`;

function buildContactHtml(data: ContactData, safeName: string): string {
  const name = escapeHtml(safeName);
  const email = escapeHtml(data.email);
  const type = escapeHtml(PROJECT_TYPE_LABEL[data.projectType]);
  const message = escapeHtml(data.message).replace(/\r?\n/g, "<br>");
  const firstName = escapeHtml(safeName.split(" ")[0] || safeName);
  const preview = escapeHtml(`${safeName} · ${PROJECT_TYPE_LABEL[data.projectType]} · ${data.message}`.slice(0, 140));
  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(
    "Re: tu consulta en fransixto.com.ar"
  )}`;

  const label = `font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${C.muted};`;
  const row = (title: string, value: string) => `
              <tr>
                <td style="padding:12px 0;border-top:1px solid ${C.rule};${label}width:140px;vertical-align:top;">${title}</td>
                <td style="padding:12px 0;border-top:1px solid ${C.rule};font-family:${SANS};font-size:15px;color:${C.ink};vertical-align:top;">${value}</td>
              </tr>`;

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Contacto web: ${name}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.paper};border:1px solid ${C.rule};">
        <tr>
          <td style="padding:28px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="${label}color:${C.accent};padding-bottom:14px;border-bottom:2px solid ${C.ink};">Contacto web</td>
                <td align="right" style="${label}padding-bottom:14px;border-bottom:2px solid ${C.ink};">fransixto.com.ar</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 8px;">
            <h1 style="margin:0;font-family:${SANS};font-size:28px;line-height:1.15;font-weight:700;letter-spacing:-.02em;color:${C.ink};">${name}</h1>
            <p style="margin:8px 0 0;font-family:${SANS};font-size:15px;font-weight:500;color:${C.accent};">${type}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${row(
              "Email",
              `<a href="${replyHref}" style="color:${C.ink};text-decoration:underline;text-decoration-color:${C.accent};">${email}</a>`
            )}${row("Idioma del sitio", LOCALE_LABEL[data.locale])}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 0;">
            <p style="margin:0 0 12px;padding-top:12px;border-top:1px solid ${C.rule};${label}">Mensaje</p>
            <div style="border-left:2px solid ${C.accent};padding:2px 0 2px 16px;font-family:${SERIF};font-size:17px;line-height:1.55;color:${C.ink};">${message}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:${C.accent};">
                  <a href="${replyHref}" style="display:inline-block;padding:13px 22px;font-family:${SANS};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">Responder a ${firstName} &rarr;</a>
                </td>
              </tr>
            </table>
            <p style="margin:16px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${C.muted};">También podés responder este mail directamente: la respuesta le llega a ${email}.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
