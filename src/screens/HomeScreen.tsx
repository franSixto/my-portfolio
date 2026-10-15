import Hero from "@/components/home/Hero";
import HomeServices from "@/components/home/HomeServices";
import SelectedWork from "@/components/home/SelectedWork";
import AboutMeTeaser from "@/components/home/AboutMeTeaser";
import Toolkit from "@/components/home/Toolkit";
import CtaBand from "@/components/ui/CtaBand";
import { toProjectTile } from "@/components/projects/toProjectTile";
import { SERVICE_NAV_LABELS, SERVICE_ROUTE_KEYS } from "@/content/services/nav";
import { TOOL_GROUPS } from "@/content/tools";
import { getProjects, getTranslator } from "@/i18n/dictionary";
import { localizedPath, type Locale } from "@/i18n/routes";

// Server component: all copy is resolved here and passed down as props.
export default function HomeScreen({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const path = (key: Parameters<typeof localizedPath>[0]) => localizedPath(key, locale);

  return (
    <>
      <Hero
        content={{
          tagline: t("home.hero.tagline"),
          title: t("home.hero.title"),
          description: t("home.hero.description"),
          note: t("pages.about.location"),
          primary: { href: path("projects"), label: t("home.hero.myWork") },
          secondary: { href: "/cv-fran-sixto.pdf", label: t("home.hero.resume") },
        }}
      />
      <HomeServices
        content={{
          heading: t("home.services.title"),
          intro: t("home.services.description"),
          pagesLabel: t("navigation.servicesAriaLabel"),
          pages: SERVICE_ROUTE_KEYS.map((key) => ({
            href: path(key),
            title: SERVICE_NAV_LABELS[locale][key],
          })),
          capabilities: (["uxui", "frontend", "teamLeadership", "optimization"] as const).map((key) => ({
            title: t(`home.services.${key}.title`),
            description: t(`home.services.${key}.description`),
          })),
        }}
      />
      <SelectedWork
        content={{
          heading: t("pages.projects.title"),
          intro: t("pages.projects.description"),
          all: { href: path("projects"), label: t("home.hero.myWork") },
          projects: getProjects(locale)
            .slice(0, 3)
            .map((project) => toProjectTile(project, locale)),
        }}
      />
      <AboutMeTeaser
        content={{
          heading: t("home.aboutTeaser.title"),
          intro: t("home.aboutTeaser.description"),
          photoAlt: t("home.aboutTeaser.altText"),
          birthPlace: t("home.aboutTeaser.birthPlace"),
          birthDescription: t("home.aboutTeaser.birthDescription"),
          sportsText: t("home.aboutTeaser.sportsText"),
          riverPlate: t("home.aboutTeaser.riverPlate"),
          readMore: { href: path("about"), label: t("home.aboutTeaser.readMore") },
        }}
      />
      <Toolkit
        content={{
          heading: t("home.highlights.title"),
          intro: t("home.highlights.description"),
          groups: TOOL_GROUPS.map((group) => ({
            title: t(`home.highlights.categories.${group.categoryKey}.title`),
            tools: group.tools,
          })),
        }}
      />
      <CtaBand
        id="contact-cta"
        heading={t("pages.contact.cta.title")}
        description={t("pages.contact.cta.description")}
        action={{ href: path("contact"), label: t("pages.contact.cta.button") }}
      />
    </>
  );
}
