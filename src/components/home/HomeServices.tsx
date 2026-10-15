import ButtonLink from "@/components/ui/ButtonLink";
import IndexLinks from "@/components/ui/IndexLinks";
import Section from "@/components/ui/Section";
import { ArrowRight } from "@/components/ui/icons";

export type HomeServicesContent = {
  heading: string;
  intro: string;
  services: { href: string; title: string; text: string; linkLabel: string }[];
  hub: { href: string; label: string };
};

export default function HomeServices({ content }: { content: HomeServicesContent }) {
  return (
    <Section id="services" heading={content.heading} intro={content.intro}>
      <IndexLinks items={content.services} />
      <ButtonLink href={content.hub.href} variant="text" className="mt-10">
        {content.hub.label}
        <ArrowRight />
      </ButtonLink>
    </Section>
  );
}
