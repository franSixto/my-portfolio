import Image from "next/image";
import type { ReactNode } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { NumberedList, RuleList } from "@/components/ui/Lists";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { Inline } from "@/components/ui/Text";
import type { CaseBlock } from "@/content/projects/types";
import { revealProps } from "@/lib/motion/reveal";

export type ProjectContentProps = {
  title: string;
  lead: string;
  crumbLabel: string;
  cover: { src: string; width: number; height: number; alt: string };
  logo?: { src: string; width: number; height: number; alt: string };
  meta: { label: string; value: string }[];
  links: { label: string; href: string; ariaLabel: string; note?: string }[];
  sections: { id: string; heading: string; blocks: CaseBlock[] }[];
  gallery?: { heading: string; images: { src: string; width: number; height: number; alt: string }[] };
  relatedCases?: { heading: string; links: { href: string; label: string }[] };
  related: {
    heading: string;
    links: { href: string; label: string; variant: "secondary" | "text" }[];
  };
};

function Blocks({ blocks }: { blocks: CaseBlock[] }): ReactNode {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "p":
        return (
          <p key={i} className="mt-5 first:mt-0">
            <Inline text={block.text} />
          </p>
        );
      case "ul":
        return <RuleList key={i} items={block.items} className={i > 0 ? "mt-5" : undefined} />;
      case "ol":
        return <NumberedList key={i} items={block.items} className={i > 0 ? "mt-5" : undefined} />;
    }
  });
}

/** Server component: the case study is rendered into the initial HTML. */
export default function ProjectContent({
  title,
  lead,
  crumbLabel,
  cover,
  logo,
  meta,
  links,
  sections,
  gallery,
  relatedCases,
  related,
}: ProjectContentProps) {
  return (
    <>
      <PageHeader title={title} lead={lead} crumbLabel={crumbLabel} titleSize="h1-long" />

      <Container>
        <div className="overflow-hidden rounded-[var(--radius-media)] bg-surface">
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            priority
            sizes="(min-width: 1360px) 1264px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
            className="h-auto w-full"
          />
        </div>
      </Container>

      <Container className="pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-3" {...revealProps("fade", 1)}>
            <div className="space-y-8 lg:sticky lg:top-28">
              {logo && (
                <div className="flex h-14 w-44 items-center justify-center rounded-[var(--radius-control)] bg-white p-3 ring-1 ring-rule">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    sizes="160px"
                    className="max-h-full w-auto max-w-full object-contain"
                  />
                </div>
              )}
              <div>
                <div aria-hidden="true" className="h-px bg-rule" {...revealProps("line", 2)} />
                <dl className="space-y-5 pt-5">
                  {meta.map((item) => (
                    <div key={item.label}>
                      <dt className="text-meta text-muted">{item.label}</dt>
                      <dd className="mt-1 text-pretty text-ui font-medium text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {links.length > 0 && (
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <ButtonLink href={link.href} external variant="secondary" ariaLabel={link.ariaLabel}>
                        {link.label}
                        <ArrowUpRight />
                      </ButtonLink>
                      {link.note && <p className="mt-2 text-meta text-muted">{link.note}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>

          <div className="max-w-[68ch] text-pretty font-serif text-body text-ink lg:col-span-7 lg:col-start-5">
            {sections.map((section) => (
              <section
                key={section.id}
                aria-labelledby={`case-${section.id}`}
                className="mt-14 first:mt-0"
                {...revealProps("up")}
              >
                <Heading as="h2" size="h3" id={`case-${section.id}`}>
                  {section.heading}
                </Heading>
                <div className="mt-5">
                  <Blocks blocks={section.blocks} />
                </div>
              </section>
            ))}

            {gallery && (
              <section aria-labelledby="case-gallery" className="mt-14" {...revealProps("up")}>
                <Heading as="h2" size="h3" id="case-gallery">
                  {gallery.heading}
                </Heading>
                <ul className="mt-5 space-y-6">
                  {gallery.images.map((image) => (
                    <li key={image.src} className="overflow-hidden rounded-[var(--radius-media)] bg-surface">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 68ch, calc(100vw - 2.5rem)"
                        className="h-auto w-full"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {relatedCases && (
              <section aria-labelledby="case-related-cases" className="mt-14" {...revealProps("up")}>
                <Heading as="h2" size="h3" id="case-related-cases">
                  {relatedCases.heading}
                </Heading>
                <ul className="mt-5 space-y-3">
                  {relatedCases.links.map((link) => (
                    <li key={link.href}>
                      <ButtonLink href={link.href} variant="text">
                        {link.label}
                      </ButtonLink>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="case-related-service" className="mt-14" {...revealProps("up")}>
              <Heading as="h2" size="h3" id="case-related-service">
                {related.heading}
              </Heading>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
                {related.links.map((link) => (
                  <ButtonLink key={link.href} href={link.href} variant={link.variant}>
                    {link.label}
                    {link.variant === "secondary" && <ArrowRight />}
                  </ButtonLink>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </>
  );
}
