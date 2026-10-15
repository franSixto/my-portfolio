import Section from "@/components/ui/Section";

export type ToolkitContent = {
  heading: string;
  intro: string;
  groups: { title: string; tools: string[] }[];
};

/** Tools as a typographic index, grouped by discipline. No logo soup. */
export default function Toolkit({ content }: { content: ToolkitContent }) {
  return (
    <Section id="toolkit" heading={content.heading} intro={content.intro}>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {content.groups.map((group) => (
          <div key={group.title}>
            <h3 className="border-b border-rule pb-3 text-meta font-medium text-accent">{group.title}</h3>
            <ul className="mt-4 space-y-2 text-ui text-ink">
              {group.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
