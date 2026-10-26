import Hero from "@/components/home/Hero";
import HomeServices from "@/components/home/HomeServices";
import SelectedWork from "@/components/home/SelectedWork";
import AboutMeTeaser from "@/components/home/AboutMeTeaser";
import CtaBand from "@/components/ui/CtaBand";
import { NumberedList, TermList } from "@/components/ui/Lists";
import Section from "@/components/ui/Section";
import { toProjectTile } from "@/components/projects/toProjectTile";
import { FEATURED_PROJECT_SLUGS } from "@/content/featuredProjects";
import { homeContent } from "@/content/pages/home";
import { getCaseStudy } from "@/content/projects";
import { localizedPath, type Locale } from "@/i18n/routes";

// Server component: all copy is resolved here and passed down as props.
export default function HomeScreen({ locale }: { locale: Locale }) {
  const c = homeContent[locale];
  const path = (key: Parameters<typeof localizedPath>[0]) => localizedPath(key, locale);

  const projects = FEATURED_PROJECT_SLUGS.flatMap((slug) => {
    const study = getCaseStudy(slug);
    return study ? [toProjectTile(study, locale)] : [];
  });

  return (
    <>
      <Hero
        content={{
          eyebrow: c.hero.eyebrow,
          eyebrowShort: c.hero.eyebrowShort,
          title: c.hero.title,
          subtitle: c.hero.subtitle,
          primary: { href: path("contact"), label: c.hero.primary },
          secondary: { href: path("projects"), label: c.hero.secondary },
          needsHeading: c.hero.needsHeading,
          needs: c.hero.needs.map((n) => ({ href: path(n.route), label: n.label })),
        }}
      />
      <HomeServices
        content={{
          heading: c.services.heading,
          intro: c.services.intro,
          services: c.services.cards.map((card) => ({
            href: path(card.route),
            title: card.title,
            text: card.value,
            linkLabel: card.link,
          })),
          hub: { href: path("services"), label: c.services.hubLink },
        }}
      />
      <Section id="audience" heading={c.audience.heading} tone="surface">
        <TermList items={c.audience.items} />
        <p className="mt-8 text-ui text-muted max-w-[60ch] text-pretty">{c.audience.footnote}</p>
      </Section>
      <Section id="process" heading={c.process.heading} tone="accent">
        <NumberedList items={c.process.steps} />
        <p className="mt-10 max-w-[60ch] font-serif text-body text-muted text-pretty">{c.process.aiNote}</p>
      </Section>
      <SelectedWork
        content={{
          heading: c.work.heading,
          intro: c.work.intro,
          all: { href: path("projects"), label: c.work.all },
          projects,
        }}
      />
      <AboutMeTeaser
        content={{
          heading: c.about.heading,
          text: c.about.text,
          photoAlt: c.about.photoAlt,
          readMore: { href: path("about"), label: c.about.link },
        }}
      />
      <CtaBand
        id="contact-cta"
        heading={c.cta.heading}
        description={c.cta.text}
        action={{ href: path("contact"), label: c.cta.button }}
      />
    </>
  );
}
