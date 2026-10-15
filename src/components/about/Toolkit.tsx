import cx from "classnames";
import Section from "@/components/ui/Section";

export type ToolkitContent = {
  heading: string;
  intro: string;
  groups: {
    id: string;
    title: string;
    items: { label: string; core: boolean }[];
    note?: string;
  }[];
};

/** Tools as a typographic index, grouped by area. Core items read stronger. */
export default function Toolkit({ content }: { content: ToolkitContent }) {
  return (
    <Section id="toolkit" heading={content.heading} intro={content.intro}>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {content.groups.map((group) => (
          <div key={group.id}>
            <h3 className="border-b border-rule pb-3 text-meta font-medium text-accent">{group.title}</h3>
            <ul className="mt-4 space-y-2 text-ui">
              {group.items.map((item) => (
                <li key={item.label} className={cx(item.core ? "font-medium text-ink" : "text-muted")}>
                  {item.label}
                </li>
              ))}
            </ul>
            {group.note && <p className="mt-4 text-meta text-muted text-pretty">{group.note}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}
