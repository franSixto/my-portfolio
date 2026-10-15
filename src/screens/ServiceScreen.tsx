import Breadcrumbs from "@/components/common/Breadcrumbs";
import ServiceHero from "@/components/services/ServiceHero";
import {
  ContentSection,
  FaqList,
  LinkCards,
  PriceCallout,
} from "@/components/services/ServiceSections";
import ServiceCta from "@/components/services/ServiceCta";
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
    return project
      ? [
          {
            href: localizedPath("project", locale, { slug }),
            title: project.title,
            text: project.description,
          },
        ]
      : [];
  });

  const services = content.relatedServices.map((s) => ({
    href: localizedPath(s.route, locale),
    title: SERVICE_NAV_LABELS[locale][s.route as ServiceRouteKey],
    text: s.blurb,
  }));

  return (
    <div className="relative overflow-hidden dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildServiceJsonLd(route, locale)),
        }}
      />
      <div className="container px-6 mx-auto flex flex-col items-center pt-10">
        <Breadcrumbs />
        <ServiceHero title={content.h1} intro={content.intro} />
        <div className="w-full max-w-3xl space-y-12 pb-20">
          {content.price && <PriceCallout price={content.price} />}
          {content.sections.map((section, i) => (
            <ContentSection key={section.heading} section={section} id={`section-${i}`} />
          ))}
          <FaqList heading={ui.faq} faqs={content.faqs} />
          {projects.length > 0 && (
            <LinkCards heading={ui.relatedProjects} id="related-projects" items={projects} />
          )}
          <ServiceCta
            heading={content.cta.heading}
            button={content.cta.button}
            href={localizedPath("contact", locale)}
          />
          <LinkCards heading={ui.relatedServices} id="related-services" items={services} />
        </div>
      </div>
    </div>
  );
}
