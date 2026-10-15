// Toolkit shown on the About page: 6 categories, only tools with evidence in
// the CV, the case studies or this repository (see site-copy.md, section 4).
// `core` items are emphasized. Server-only module.
import type { Locale } from "@/i18n/routes";

export type ToolkitItem = { es: string; en: string; core?: true };
export type ToolkitCategory = {
  id: string;
  title: { es: string; en: string };
  items: ToolkitItem[];
  note?: { es: string; en: string };
};

export const TOOLKIT: ToolkitCategory[] = [
  {
    id: "product",
    title: { es: "Diseño de producto y prototipado", en: "Product design and prototyping" },
    items: [
      { es: "Figma", en: "Figma", core: true },
      { es: "Design systems", en: "Design systems", core: true },
      { es: "Wireframes y prototipos interactivos", en: "Wireframing and interactive prototypes", core: true },
      { es: "User research y pruebas de usabilidad", en: "User research and usability testing", core: true },
      { es: "Diseño de producto digital", en: "Digital product design" },
      { es: "Flujos de usuario y arquitectura de información", en: "User flows and information architecture" },
      { es: "Diseño responsive", en: "Responsive design" },
      { es: "Miro / FigJam", en: "Miro / FigJam" },
      { es: "Adobe XD", en: "Adobe XD" },
    ],
  },
  {
    id: "graphic",
    title: { es: "Diseño gráfico y multimedia", en: "Graphic and multimedia design" },
    items: [
      { es: "Adobe Creative Suite", en: "Adobe Creative Suite", core: true },
      { es: "Photoshop", en: "Photoshop", core: true },
      { es: "Illustrator", en: "Illustrator", core: true },
      { es: "InDesign", en: "InDesign" },
      { es: "Señalética y piezas de comunicación", en: "Signage and communication design" },
      { es: "Blender (3D)", en: "Blender (3D)" },
    ],
  },
  {
    id: "web",
    title: { es: "Desarrollo web", en: "Web development" },
    items: [
      { es: "React", en: "React", core: true },
      { es: "Next.js", en: "Next.js", core: true },
      { es: "TypeScript", en: "TypeScript", core: true },
      { es: "WordPress", en: "WordPress", core: true },
      { es: "Tailwind CSS", en: "Tailwind CSS" },
      { es: "HTML y CSS", en: "HTML & CSS" },
      { es: "JavaScript", en: "JavaScript" },
      { es: "Bootstrap", en: "Bootstrap" },
      { es: "Three.js / WebGL", en: "Three.js / WebGL" },
      { es: "Framer Motion", en: "Framer Motion" },
      { es: "Vitest", en: "Vitest" },
      { es: "Tienda Nube", en: "Tienda Nube" },
    ],
  },
  {
    id: "backend",
    title: { es: "Backend, datos e integraciones", en: "Backend, data and integrations" },
    items: [
      { es: "Vercel (deploy, Analytics, Speed Insights)", en: "Vercel (deploy, Analytics, Speed Insights)", core: true },
      { es: "Next.js Route Handlers (APIs)", en: "Next.js Route Handlers (APIs)", core: true },
      { es: "Git y GitHub", en: "Git & GitHub", core: true },
      { es: "Envío de emails con Nodemailer", en: "Email delivery with Nodemailer" },
      { es: "reCAPTCHA", en: "reCAPTCHA" },
      { es: "SEO técnico: sitemap, hreflang, datos estructurados", en: "Technical SEO: sitemap, hreflang, structured data" },
      { es: "Sitios sobre .NET Core (implementación front-end)", en: ".NET Core sites (front-end implementation)" },
    ],
  },
  {
    id: "ai",
    title: { es: "IA aplicada al diseño y desarrollo", en: "AI applied to design and development" },
    items: [
      { es: "Workflows de diseño asistidos por IA", en: "AI-assisted design workflows", core: true },
      { es: "IA generativa aplicada al diseño", en: "Generative AI applied to design", core: true },
      { es: "Desarrollo asistido por LLMs", en: "LLM-assisted development", core: true },
      { es: "Claude Code", en: "Claude Code", core: true },
    ],
    note: {
      es: "Uso IA para acelerar, no para decidir. Reviso lo que entrego y respondo por ello.",
      en: "I use AI to move faster, not to decide. I review what I deliver and I'm accountable for it.",
    },
  },
  {
    id: "collab",
    title: { es: "Colaboración y gestión", en: "Collaboration and management" },
    items: [
      { es: "Liderazgo de equipos de diseño", en: "Design team leadership", core: true },
      { es: "Trabajo con desarrollo, marketing y negocio", en: "Working with engineering, marketing and business", core: true },
      { es: "Jira", en: "Jira", core: true },
      { es: "Design Sprint", en: "Design Sprint", core: true },
      { es: "Notion", en: "Notion" },
      { es: "Metodologías ágiles", en: "Agile methods" },
      { es: "SourceTree", en: "SourceTree" },
    ],
  },
];

export type LocalizedToolkitCategory = {
  id: string;
  title: string;
  items: { label: string; core: boolean }[];
  note?: string;
};

export function getToolkit(locale: Locale): LocalizedToolkitCategory[] {
  return TOOLKIT.map((category) => ({
    id: category.id,
    title: category.title[locale],
    items: category.items.map((item) => ({ label: item[locale], core: item.core === true })),
    note: category.note?.[locale],
  }));
}
