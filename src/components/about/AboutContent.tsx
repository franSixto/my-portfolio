import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowRight, Download } from "@/components/ui/icons";
import { Prose } from "@/components/ui/Text";

export type AboutContentData = {
  title: string;
  lead: string;
  paragraphs: string[];
  photoAlt: string;
  greeting: string;
  thankYou: string;
  jobTitle: string;
  location: string;
  work: { href: string; label: string };
  resume: { href: string; label: string };
};

// Portrait set: one tall lead photo plus a supporting row.
const PHOTOS = {
  lead: { src: "/me4.webp", width: 960, height: 1580 },
  row: [
    { src: "/me1.webp", width: 624, height: 768 },
    { src: "/me2.webp", width: 432, height: 768 },
  ],
  wide: { src: "/me3.webp", width: 642, height: 351 },
};

export default function AboutContent({ content }: { content: AboutContentData }) {
  return (
    <>
      <PageHeader title={content.title} lead={content.lead} />
      <Container className="pb-20 md:pb-28">
        <div className="grid gap-14 border-t border-rule pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14">
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-28">
              <div className="relative col-span-2 aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-surface sm:col-span-1 sm:row-span-2 sm:aspect-auto lg:col-span-2 lg:row-span-1 lg:aspect-[4/5]">
                <Image
                  src={PHOTOS.lead.src}
                  alt={content.photoAlt}
                  fill
                  sizes="(min-width: 1360px) 520px, (min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              {PHOTOS.row.map((photo) => (
                <div
                  key={photo.src}
                  className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-surface"
                >
                  <Image
                    src={photo.src}
                    alt={content.photoAlt}
                    fill
                    sizes="(min-width: 1360px) 250px, (min-width: 1024px) 19vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Prose className="[&>p:first-child]:text-lead [&>p+p]:mt-6">
              {content.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Prose>

            <div className="relative mt-14 aspect-[642/351] overflow-hidden rounded-[var(--radius-media)] bg-surface">
              <Image
                src={PHOTOS.wide.src}
                alt={content.photoAlt}
                fill
                sizes="(min-width: 1360px) 620px, (min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-14 border-t border-rule pt-10">
              <p className="font-sans text-h3 font-semibold text-ink">{content.greeting}</p>
              <p className="mt-4 max-w-[56ch] font-serif text-body text-muted text-pretty">{content.thankYou}</p>
              <div className="mt-8 grid gap-1">
                <p className="font-sans text-[1.1875rem] font-semibold text-ink">Fran Sixto</p>
                <p className="text-ui text-muted">{content.jobTitle}</p>
                <p className="text-ui text-muted">{content.location}</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={content.work.href}>
                  {content.work.label}
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href={content.resume.href} variant="secondary" download>
                  {content.resume.label}
                  <Download />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
