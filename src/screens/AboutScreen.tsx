import AboutContent from "@/components/about/AboutContent";
import { getTranslator } from "@/i18n/dictionary";
import { localizedPath, type Locale } from "@/i18n/routes";

export default function AboutScreen({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <AboutContent
      content={{
        title: t("pages.about.title"),
        lead: t("pages.about.description"),
        paragraphs: [1, 2, 3, 4].map((n) => t(`pages.about.paragraph${n}`)),
        photoAlt: "Fran Sixto",
        greeting: t("pages.about.niceToMeet"),
        thankYou: t("pages.about.thankYou"),
        jobTitle: t("pages.about.jobTitle"),
        location: t("pages.about.location"),
        work: { href: localizedPath("projects", locale), label: t("pages.about.myWork") },
        resume: { href: "/cv-fran-sixto.pdf", label: t("pages.about.downloadResume") },
      }}
    />
  );
}
