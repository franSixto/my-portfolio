import Image from "next/image";
import Toolkit, { type ToolkitContent } from "@/components/about/Toolkit";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { CropMarks, MeasureLine } from "@/components/ui/Decor";
import CtaBand from "@/components/ui/CtaBand";
import { TermList } from "@/components/ui/Lists";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { Download } from "@/components/ui/icons";
import { Prose } from "@/components/ui/Text";
import { revealProps } from "@/lib/motion/reveal";

export type AboutContentData = {
  title: string;
  tagline: string;
  location: string;
  intro: string[];
  photoAlt: string;
  background: {
    heading: string;
    timeline: { years: string; role: string; where: string; summary: string }[];
    educationLabel: string;
    education: string[];
    coursesLabel: string;
    courses: string[];
  };
  principles: { heading: string; items: { title: string; text: string }[] };
  toolkit: ToolkitContent;
  outside: string;
  cv: { href: string; label: string; ariaLabel: string };
  cta: {
    heading: string;
    text: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
};

const PORTRAIT = { src: "/fran-sixto.webp", width: 768, height: 1365 };

export default function AboutContent({ content }: { content: AboutContentData }) {
  const { background } = content;
  return (
    <>
      <PageHeader title={content.title} lead={content.tagline}>
        <p className="mt-4 text-ui text-muted">{content.location}</p>
      </PageHeader>
      <Container className="pb-20 md:pb-28">
        <div className="grid gap-14 border-t border-rule pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14">
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:sticky lg:top-28 lg:max-w-none">
              <CropMarks />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-surface">
                <Image
                  src={PORTRAIT.src}
                  alt={content.photoAlt}
                  fill
                  priority
                  sizes="(min-width: 1360px) 520px, (min-width: 1024px) 38vw, 448px"
                  className="object-cover object-[50%_20%]"
                />
              </div>
              <MeasureLine className="mt-6" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Prose className="[&>p:first-child]:text-lead [&>p+p]:mt-6">
              {content.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Prose>
          </div>
        </div>
      </Container>

      <Section id="background" heading={background.heading} spacing="compact">
        <ol className="border-b border-rule">
          {background.timeline.map((row) => (
            <li
              key={`${row.years}-${row.where}`}
              className="grid gap-1 border-t border-rule py-5 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-6 md:py-6 md:first:pt-0"
            >
              <p className="font-sans text-ui font-semibold tabular-nums text-accent md:col-span-3">{row.years}</p>
              <p className="md:col-span-4">
                <span className="block font-sans text-[1.1875rem] font-semibold text-ink">{row.role}</span>
                <span className="block text-ui text-muted">{row.where}</span>
              </p>
              <p className="font-serif text-body text-ink text-pretty md:col-span-5">{row.summary}</p>
            </li>
          ))}
        </ol>
        <dl className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <dt className="text-meta font-medium text-accent">{background.educationLabel}</dt>
            <dd className="mt-3">
              <ul className="space-y-2 text-ui text-muted">
                {background.education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="text-meta font-medium text-accent">{background.coursesLabel}</dt>
            <dd className="mt-3">
              <ul className="space-y-2 text-ui text-muted">
                {background.courses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Section>

      <Section id="principles" heading={content.principles.heading} spacing="compact">
        <TermList items={content.principles.items} />
      </Section>

      <Toolkit content={content.toolkit} />

      <Container className="pb-8">
        <div
          className="flex flex-col gap-6 border-t border-rule pt-8 md:flex-row md:items-center md:justify-between"
          {...revealProps("up")}
        >
          <p className="max-w-[60ch] font-serif text-body text-muted text-pretty">{content.outside}</p>
          <ButtonLink
            href={content.cv.href}
            variant="secondary"
            download
            ariaLabel={content.cv.ariaLabel}
            className="shrink-0"
          >
            {content.cv.label}
            <Download />
          </ButtonLink>
        </div>
      </Container>

      <CtaBand
        id="about-cta"
        heading={content.cta.heading}
        description={content.cta.text}
        action={content.cta.primary}
        secondary={content.cta.secondary}
      />
    </>
  );
}
