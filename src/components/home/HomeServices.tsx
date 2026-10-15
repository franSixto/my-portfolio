import IndexLinks from "@/components/ui/IndexLinks";
import Section from "@/components/ui/Section";

export type HomeServicesContent = {
  heading: string;
  intro: string;
  capabilities: { title: string; description: string }[];
  pages: { href: string; title: string }[];
  pagesLabel: string;
};

export default function HomeServices({ content }: { content: HomeServicesContent }) {
  return (
    <Section id="services" heading={content.heading} intro={content.intro}>
      <IndexLinks items={content.pages} ariaLabel={content.pagesLabel} />
      <div className="mt-16 grid gap-x-8 gap-y-10 md:grid-cols-2">
        {content.capabilities.map((item) => (
          <div key={item.title}>
            <h3 className="font-sans text-[1.1875rem] font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 font-serif text-body text-muted text-pretty">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
