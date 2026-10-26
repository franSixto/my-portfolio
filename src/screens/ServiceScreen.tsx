import PageHeader from "@/components/ui/PageHeader";
import PriceNote from "@/components/ui/PriceNote";
import Section from "@/components/ui/Section";
import ProjectTile from "@/components/ui/ProjectTile";
import CtaBand from "@/components/ui/CtaBand";
import IndexLinks from "@/components/ui/IndexLinks";
import { ContentSection, FaqList } from "@/components/services/ServiceSections";
import { toProjectTile } from "@/components/projects/toProjectTile";
import { getLandingContent, getSolutionContent } from "@/content/solutions";
import {
  SOLUTION_PARENT,
  isSolutionRoute,
  landingNavLabel,
  solutionsForService,
  type LandingRouteKey,
} from "@/content/services/nav";
import { buildServiceJsonLd } from "@/content/services/seo";
import { SERVICE_UI, SOLUTION_UI } from "@/content/services/ui";
import { getCaseStudy } from "@/content/projects";
import { contactHrefForService, contactHrefForSolution } from "@/lib/contact/projectTypes";
import { localizedPath, type Locale } from "@/i18n/routes";
import { serializeJsonLd } from "@/i18n/seo";

/** Server-rendered landing page shared by the service and solution routes. */
export default function ServiceScreen({
  route,
  locale,
}: {
  route: LandingRouteKey;
  locale: Locale;
}) {
  const content = getLandingContent(route, locale);
  const ui = SERVICE_UI[locale];
  const solution = isSolutionRoute(route);

  const projects = content.relatedProjectSlugs.flatMap((slug) => {
    const study = getCaseStudy(slug);
    return study ? [toProjectTile(study, locale)] : [];
  });

  const services = content.relatedServices.map((s) => ({
    href: localizedPath(s.route, locale),
    title: landingNavLabel(s.route as LandingRouteKey, locale),
    text: s.blurb,
  }));

  // Service pages index the solution pages that hang from them.
  const solutions = solution
    ? []
    : solutionsForService(route).map((key) => ({
        href: localizedPath(key, locale),
        title: landingNavLabel(key, locale),
        text: getSolutionContent(key, locale).summary,
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
        eyebrow={landingNavLabel(solution ? SOLUTION_PARENT[route] : route, locale)}
        title={content.h1}
        lead={content.intro}
        aside={content.price && <PriceNote label={content.price.label} note={content.price.note} />}
      />

      {content.sections.map((section, i) => (
        <ContentSection key={section.heading} section={section} id={`section-${i}`} />
      ))}

      {solutions.length > 0 && (
        <Section
          id="by-project-type"
          heading={SOLUTION_UI[locale].byType}
          intro={SOLUTION_UI[locale].byTypeIntro}
          spacing="compact"
        >
          <IndexLinks items={solutions} />
        </Section>
      )}

      <FaqList id="faq" heading={ui.faq} faqs={content.faqs} />

      {projects.length > 0 && (
        <Section id="related-projects" heading={ui.relatedProjects} layout="stacked" spacing="compact" revealContent={false}>
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
        action={{
          href: solution ? contactHrefForSolution(route, locale) : contactHrefForService(route, locale),
          label: content.cta.button,
        }}
      />

      <Section
        id="related-services"
        heading={solution ? SOLUTION_UI[locale].related : ui.relatedServices}
        spacing="compact"
      >
        <IndexLinks items={services} />
      </Section>
    </article>
  );
}
