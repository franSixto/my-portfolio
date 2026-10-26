// Site-wide constants and locale-aware identity copy (server-only usage:
// metadata, JSON-LD and the footer). Client components get their strings
// from the dictionary instead.
import type { Locale } from "@/i18n/routes";

export const EMAIL = "franciscomsixto@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sixtofrancisco/";
export const GITHUB_URL = "https://github.com/franSixto";
export const CV_PATH: Record<Locale, string> = { es: "/cv-fran-sixto.pdf", en: "/cv-fran-sixto-en.pdf" };

export const SITE_META: Record<
  Locale,
  {
    description: string;
    ogAlt: string;
    jobTitle: string;
    personDescription: string;
    knowsAbout: string[];
  }
> = {
  es: {
    description:
      "Francisco Sixto, diseñador UX/UI y de producto. Diseño productos digitales, sitios web y MVPs con IA desde Córdoba, Argentina.",
    ogAlt: "Francisco Sixto, diseñador UX/UI y de producto",
    jobTitle: "Diseñador UX/UI y de producto",
    personDescription:
      "Diseñador UX/UI y de producto. Diseña productos SaaS, plataformas educativas y de salud, sitios web y prototipos o MVPs asistidos por IA.",
    knowsAbout: [
      "Diseño UX/UI",
      "Diseño de producto",
      "Design systems",
      "Diseño web",
      "React",
      "Next.js",
      "WordPress",
      "Prototipado asistido por IA",
    ],
  },
  en: {
    description:
      "Francisco Sixto, UX/UI and product designer. Digital products, websites and AI-assisted MVPs, from Córdoba, Argentina.",
    ogAlt: "Francisco Sixto, UX/UI and product designer",
    jobTitle: "UX/UI & Product Designer",
    personDescription:
      "UX/UI and product designer. Designs SaaS products, education and health platforms, websites, and AI-assisted prototypes and MVPs.",
    knowsAbout: [
      "UX/UI design",
      "Product design",
      "Design systems",
      "Web design",
      "React",
      "Next.js",
      "WordPress",
      "AI-assisted prototyping",
    ],
  },
};
