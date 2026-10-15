import PageHeader from "@/components/ui/PageHeader";
import PriceNote from "@/components/ui/PriceNote";
import Section from "@/components/ui/Section";
import ProjectTile from "@/components/ui/ProjectTile";
import CtaBand from "@/components/ui/CtaBand";
import IndexLinks from "@/components/ui/IndexLinks";
import { ContentSection, FaqList } from "@/components/services/ServiceSections";
import { toProjectTile } from "@/components/projects/toProjectTile";
import { getServiceContent } from "@/content/services";
import { SERVICE_NAV_LABELS, type ServiceRouteKey } from "@/content/services/nav";
import { buildServiceJsonLd } from "@/content/services/seo";
import { SERVICE_UI } from "@/content/services/ui";
import { getProject } from "@/i18n/dictionary";
import { localizedPath, type Locale } from "@/i18n/routes";
import { serializeJsonLd } from "@/i18n/seo";

/** Server-rendered landing page shared by the four service routes. */
export default function ServiceScreen({
  route,
  locale,
}: {
  route: ServiceRouteKey;
  locale: Locale;
}) {
  const content = getServiceContent(route, locale);
  const ui = SERVICE_UI[locale];

  const projects = content.relatedProjectSlugs.flatMap((slug) => {
    const project = getProject(slug, locale);
    return project ? [toProjectTile(project, locale)] : [];
  });

  const services = content.relatedServices.map((s) => ({
    href: localizedPath(s.route, locale),
    title: SERVICE_NAV_LABELS[locale][s.route as ServiceRouteKey],
    text: s.blurb,
  }));

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildServiceJsonLd(route, locale)),
        }}
      />
      <PageHeader
        eyebrow={SERVICE_NAV_LABELS[locale][route]}
        title={content.h1}
        lead={content.intro}
        aside={content.price && <PriceNote label={content.price.label} note={content.price.note} />}
      />

      {content.sections.map((section, i) => (
        <ContentSection key={section.heading} section={section} id={`section-${i}`} />
      ))}

      <FaqList id="faq" heading={ui.faq} faqs={content.faqs} />

      {projects.length > 0 && (
        <Section id="related-projects" heading={ui.relatedProjects} layout="stacked" spacing="compact">
          <ul className="grid gap-12 md:grid-cols-2 md:gap-8">
            {projects.map((project) => (
              <li key={project.href}>
                <ProjectTile
                  project={project}
                  emphasis="sm"
                  sizes="(min-width: 1360px) 616px, (min-width: 768px) 46vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        id="service-cta"
        heading={content.cta.heading}
        action={{ href: localizedPath("contact", locale), label: content.cta.button }}
      />

      <Section id="related-services" heading={ui.relatedServices} spacing="compact">
        <IndexLinks items={services} />
      </Section>
    </article>
  );
}
