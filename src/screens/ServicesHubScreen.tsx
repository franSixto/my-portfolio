import ComparisonTable from "@/components/services/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import IndexLinks from "@/components/ui/IndexLinks";
import { TermList } from "@/components/ui/Lists";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { servicesHubContent } from "@/content/pages/servicesHub";
import { SOLUTION_ROUTE_KEYS, landingNavLabel } from "@/content/services/nav";
import { SOLUTION_UI } from "@/content/services/ui";
import { getSolutionContent } from "@/content/solutions";
import { localizedPath, type Locale } from "@/i18n/routes";

/** Server-rendered "which service do I need" page. */
export default function ServicesHubScreen({ locale }: { locale: Locale }) {
  const c = servicesHubContent[locale];

  return (
    <>
      <PageHeader title={c.h1} lead={c.intro} />
      <Section id="start" heading={c.start.heading} spacing="compact">
        <IndexLinks
          items={c.start.items.map((item) => ({
            href: localizedPath(item.route, locale),
            title: item.title,
            text: item.choose,
            linkLabel: item.link,
          }))}
        />
      </Section>
      <Section
        id="by-project-type"
        heading={SOLUTION_UI[locale].byType}
        intro={SOLUTION_UI[locale].byTypeIntro}
        spacing="compact"
      >
        <IndexLinks
          items={SOLUTION_ROUTE_KEYS.map((key) => ({
            href: localizedPath(key, locale),
            title: landingNavLabel(key, locale),
            text: getSolutionContent(key, locale).summary,
          }))}
        />
      </Section>
      <Section id="compare" heading={c.compare.heading} layout="stacked" spacing="compact">
        <ComparisonTable caption={c.compare.caption} columns={c.compare.columns} rows={c.compare.rows} />
      </Section>
      <Section id="combine" heading={c.combine.heading} spacing="compact">
        <TermList items={c.combine.items} colon />
      </Section>
      <CtaBand
        id="services-cta"
        heading={c.cta.heading}
        description={c.cta.text}
        action={{ href: localizedPath("contact", locale), label: c.cta.button }}
      />
    </>
  );
}
