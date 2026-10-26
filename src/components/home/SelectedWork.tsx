import ButtonLink from "@/components/ui/ButtonLink";
import ProjectTile, { type ProjectTileData } from "@/components/ui/ProjectTile";
import Section from "@/components/ui/Section";
import { ArrowRight } from "@/components/ui/icons";

export type SelectedWorkContent = {
  heading: string;
  intro: string;
  all: { href: string; label: string };
  projects: ProjectTileData[];
};

/** Home: one lead case study wide, two following in an offset pair. */
export default function SelectedWork({ content }: { content: SelectedWorkContent }) {
  const [lead, ...rest] = content.projects;
  if (!lead) return null;
  return (
    <Section
      id="work"
      heading={content.heading}
      intro={content.intro}
      layout="stacked"
      tone="surface"
      revealContent={false}
      action={
        <ButtonLink href={content.all.href} variant="secondary">
          {content.all.label}
          <ArrowRight />
        </ButtonLink>
      }
    >
      <ProjectTile
        project={lead}
        layout="side"
        emphasis="lg"
        sizes="(min-width: 1360px) 840px, (min-width: 1024px) 62vw, 100vw"
      />
      <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-8 lg:mt-24">
        {rest.slice(0, 2).map((project, i) => (
          <ProjectTile
            key={project.href}
            project={project}
            emphasis="md"
            className={i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"}
            sizes={
              i === 0
                ? "(min-width: 1360px) 720px, (min-width: 768px) 56vw, 100vw"
                : "(min-width: 1360px) 504px, (min-width: 768px) 40vw, 100vw"
            }
          />
        ))}
      </div>
    </Section>
  );
}
