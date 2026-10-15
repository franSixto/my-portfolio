import cx from "classnames";
import ProjectTile, { type ProjectTileData } from "@/components/ui/ProjectTile";

// Asymmetric editorial placement on a 12-col grid. The first project is the
// lead (image + text side by side); the rest alternate wide/narrow with a
// vertical offset on the narrow one. Each slot declares its own `sizes`.
const SLOTS: { className: string; sizes: string; emphasis: "md" | "sm" }[] = [
  {
    className: "md:col-span-7",
    sizes: "(min-width: 1360px) 720px, (min-width: 768px) 56vw, 100vw",
    emphasis: "md",
  },
  {
    className: "md:col-span-5 md:mt-40",
    sizes: "(min-width: 1360px) 504px, (min-width: 768px) 40vw, 100vw",
    emphasis: "sm",
  },
  {
    className: "md:col-span-5 lg:col-start-2",
    sizes: "(min-width: 1360px) 504px, (min-width: 768px) 40vw, 100vw",
    emphasis: "sm",
  },
  {
    className: "md:col-span-7 lg:col-span-6 lg:col-start-7 md:mt-24",
    sizes: "(min-width: 1360px) 616px, (min-width: 768px) 56vw, 100vw",
    emphasis: "md",
  },
];

export default function ProjectList({
  projects,
  emptyLabel,
}: {
  projects: ProjectTileData[];
  emptyLabel: string;
}) {
  if (projects.length === 0) {
    return <p className="text-ui text-muted">{emptyLabel}</p>;
  }
  const [lead, ...rest] = projects;
  return (
    <div>
      <ProjectTile
        project={lead}
        headingLevel="h2"
        layout="side"
        emphasis="lg"
        priority
        sizes="(min-width: 1360px) 840px, (min-width: 1024px) 62vw, 100vw"
      />
      <ul className="mt-20 grid gap-16 md:grid-cols-12 md:gap-x-8 md:gap-y-24 lg:mt-28">
        {rest.map((project, i) => {
          const slot = SLOTS[i % SLOTS.length];
          return (
            <li key={project.href} className={cx(slot.className)}>
              <ProjectTile project={project} headingLevel="h2" emphasis={slot.emphasis} sizes={slot.sizes} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
