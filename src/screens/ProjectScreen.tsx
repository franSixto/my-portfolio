import { notFound } from "next/navigation";
import ProjectContent from "@/components/projects/ProjectContent";
import CtaBand from "@/components/ui/CtaBand";
import { PROJECTS_LABELS } from "@/content/projects/labels";
import { getCaseStudy, getRelatedCases } from "@/content/projects";
import { buildMetaItems } from "@/content/projects/meta";
import { CASE_SECTION_IDS } from "@/content/projects/types";
import { SITE_URL, absoluteUrl, localizedPath, type Locale } from "@/i18n/routes";
import { serializeJsonLd } from "@/i18n/seo";

/** CreativeWork structured data. Only properties the page can back up. */
function buildProjectJsonLd(slug: string, locale: Locale) {
  const study = getCaseStudy(slug);
  if (!study) return null;
  const copy = study[locale];
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: copy.h1,
    description: copy.seoDescription,
    url: absoluteUrl(localizedPath("project", locale, { slug })),
    image: absoluteUrl(study.hero.src),
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: locale,
  };
}

export default function ProjectScreen({ locale, slug }: { locale: Locale; slug: string }) {
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const copy = study[locale];
  const labels = PROJECTS_LABELS[locale];
  const jsonLd = buildProjectJsonLd(slug, locale);
  const relatedCases = getRelatedCases(slug, locale);

  const relatedLinks = [study.relatedService, study.secondaryService].flatMap((key, i) =>
    key
      ? [
          {
            href: localizedPath(key, locale),
            label: labels.serviceLink[key] ?? "",
            variant: i === 0 ? ("secondary" as const) : ("text" as const),
          },
        ]
      : []
  );

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ProjectContent
        title={copy.h1}
        lead={copy.cardSummary}
        crumbLabel={copy.cardTitle}
        hero={{ ...study.hero, alt: copy.heroAlt }}
        logo={study.logo && { ...study.logo, alt: copy.logoAlt ?? "" }}
        meta={buildMetaItems(copy.meta, locale, study.status)}
        links={(copy.links ?? []).map((link) => ({
          ...link,
          ariaLabel: `${link.label} ${labels.externalSuffix}`,
        }))}
        sections={CASE_SECTION_IDS.flatMap((id) => {
          const blocks = copy.sections[id];
          return blocks?.length ? [{ id, heading: labels.sections[id], blocks }] : [];
        })}
        gallery={
          study.gallery?.length
            ? {
                heading: labels.sections.gallery,
                images: study.gallery.map(({ alt, ...image }) => ({ ...image, alt: alt[locale] })),
              }
            : undefined
        }
        relatedCases={
          relatedCases.length
            ? {
                heading: labels.sections.relatedCases,
                links: relatedCases.map((item) => ({
                  href: localizedPath("project", locale, { slug: item.slug }),
                  label: item.title,
                })),
              }
            : undefined
        }
        related={{
          heading: labels.sections.relatedService,
          links: [
            ...relatedLinks,
            { href: localizedPath("projects", locale), label: labels.allProjects, variant: "text" },
          ],
        }}
      />
      <CtaBand
        id="project-cta"
        heading={labels.cta.heading}
        action={{ href: localizedPath("contact", locale), label: labels.cta.button }}
      />
    </article>
  );
}
