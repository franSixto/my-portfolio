import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import { CropMarks, MeasureLine } from "@/components/ui/Decor";
import Section from "@/components/ui/Section";
import { revealProps } from "@/lib/motion/reveal";

export type AboutTeaserContent = {
  heading: string;
  text: string;
  photoAlt: string;
  readMore: { href: string; label: string };
};

export default function AboutMeTeaser({ content }: { content: AboutTeaserContent }) {
  return (
    <Section id="about" heading={content.heading}>
      <div className="grid gap-10 md:grid-cols-8 md:gap-8">
        <div className="md:col-span-3">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-full w-full rounded-[var(--radius-media)] bg-accent-soft"
            />
            <CropMarks />
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-surface"
              {...revealProps("clip")}
            >
            <Image
              src="/fran-sixto.webp"
              alt={content.photoAlt}
              fill
              sizes="(min-width: 1360px) 290px, (min-width: 768px) 30vw, 100vw"
              className="object-cover object-[50%_20%]"
            />
            </div>
          </div>
          <MeasureLine className="mt-8 hidden md:block" />
        </div>
        <div className="font-serif text-body text-ink md:col-span-5">
          <p className="text-lead text-pretty">{content.text}</p>
          <ButtonLink href={content.readMore.href} variant="secondary" className="mt-10">
            {content.readMore.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
