import cx from "classnames";
import Image from "next/image";
import Link from "next/link";

export type ProjectTileData = {
  href: string;
  title: string;
  description?: string;
  meta?: string;
  image?: { src: string; alt: string };
};

/**
 * Image-led project entry. The whole tile is clickable through a stretched
 * title link, so there is one tab stop and one accessible name per project.
 */
export default function ProjectTile({
  project,
  sizes,
  priority = false,
  headingLevel = "h3",
  layout = "stacked",
  emphasis = "md",
  className,
}: {
  project: ProjectTileData;
  /** Must match the column width the tile occupies. */
  sizes: string;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  layout?: "stacked" | "side";
  emphasis?: "lg" | "md" | "sm";
  className?: string;
}) {
  const Title = headingLevel;
  const titleSize =
    emphasis === "lg" ? "text-[1.625rem] leading-[1.15] tracking-[-0.015em] md:text-[2rem]" : emphasis === "md" ? "text-h3 md:text-[1.625rem] md:leading-tight" : "text-h3";

  return (
    <article
      className={cx(
        "group relative",
        layout === "side" && "lg:grid lg:grid-cols-12 lg:items-end lg:gap-8",
        className
      )}
    >
      <div
        className={cx(
          "relative aspect-[16/9] overflow-hidden rounded-[var(--radius-media)] bg-surface",
          layout === "side" && "lg:col-span-8"
        )}
      >
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] group-has-[a:focus-visible]:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : null}
      </div>
      <div className={cx("mt-5", layout === "side" && "lg:col-span-4 lg:mt-0 lg:pb-2")}>
        {project.meta && <p className="mb-2 text-meta text-muted">{project.meta}</p>}
        <Title className={cx("font-sans font-semibold text-ink text-balance", titleSize)}>
          <Link
            href={project.href}
            className="decoration-accent decoration-2 underline-offset-[0.18em] outline-none after:absolute after:inset-0 group-hover:underline focus-visible:underline"
          >
            {project.title}
          </Link>
        </Title>
        {project.description && (
          <p
            className="mt-3 max-w-[60ch] text-ui text-muted text-pretty"
          >
            {project.description}
          </p>
        )}
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-[var(--radius-media)] outline-accent group-has-[a:focus-visible]:outline-2"
      />
    </article>
  );
}
