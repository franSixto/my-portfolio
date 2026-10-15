import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowUpRight } from "@/components/ui/icons";
import { splitProjectMeta } from "@/lib/projectMeta";
import type { Project } from "@/types/project";

interface ProjectContentProps {
  project: Project;
  noDetailedContentLabel: string;
  liveProjectLabel: string;
}

// Long-form case study typography (serif body, sans headings).
const markdownComponents: Components = {
  p: (props) => <p className="mt-5 first:mt-0" {...props} />,
  h1: (props) => <h2 className="mt-14 font-sans text-h3 font-semibold text-ink first:mt-0" {...props} />,
  h2: (props) => <h2 className="mt-14 font-sans text-h3 font-semibold text-ink first:mt-0" {...props} />,
  h3: (props) => <h3 className="mt-12 font-sans text-[1.1875rem] font-semibold text-ink first:mt-0" {...props} />,
  ul: (props) => <ul className="mt-5 space-y-3 pl-5 marker:text-accent list-disc" {...props} />,
  ol: (props) => <ol className="mt-5 space-y-3 pl-5 marker:font-sans marker:text-accent list-decimal" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  code: (props) => <code className="rounded bg-surface px-1.5 py-0.5 font-sans text-[0.9em]" {...props} />,
  pre: (props) => <pre className="mt-5 overflow-x-auto rounded-[var(--radius-control)] bg-surface p-4" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-8 border-l-2 border-accent pl-5 text-lead text-ink" {...props} />
  ),
  a: (props) => (
    <a className="text-accent underline underline-offset-[0.2em] hover:text-accent-strong" {...props} />
  ),
  hr: () => <hr aria-hidden="true" className="my-12 h-px border-0 bg-rule" />,
};

// Server component: the project body is rendered into the initial HTML.
export default function ProjectContent({
  project,
  noDetailedContentLabel,
  liveProjectLabel,
}: ProjectContentProps) {
  const { title, description, imageUrl, imageAlt, logoUrl, logoAlt, liveUrl } = project;
  const markdown = typeof project.longDescription === "string" ? project.longDescription : "";
  const { meta, body } = splitProjectMeta(markdown);
  const hasImage = Boolean(imageUrl && imageUrl !== "/default-image.webp");
  const hasLogo = Boolean(logoUrl && logoUrl !== "/default-logo.png");

  return (
    <article>
      <PageHeader title={title} lead={description} crumbLabel={title} titleSize="h1-long" />

      {hasImage && (
        <Container>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-media)] bg-surface">
            <Image
              src={imageUrl!}
              alt={imageAlt || title}
              fill
              priority
              sizes="(min-width: 1360px) 1264px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
              className="object-cover"
            />
          </div>
        </Container>
      )}

      <Container className="pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {(meta.length > 0 || hasLogo || liveUrl) && (
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28 space-y-8">
                {hasLogo && (
                  <div className="relative h-14 w-44 rounded-[var(--radius-control)] bg-white p-2 ring-1 ring-rule">
                    <Image
                      src={logoUrl!}
                      alt={logoAlt || ""}
                      fill
                      sizes="176px"
                      className="object-contain p-2"
                    />
                  </div>
                )}
                {meta.length > 0 && (
                  <dl className="space-y-5 border-t border-rule pt-5">
                    {meta.map((item) => (
                      <div key={item.label}>
                        <dt className="text-meta text-muted">{item.label}</dt>
                        <dd className="mt-1 text-ui font-medium text-ink text-pretty">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {liveUrl && (
                  <ButtonLink href={liveUrl} external variant="secondary">
                    {liveProjectLabel}
                    <ArrowUpRight />
                  </ButtonLink>
                )}
              </div>
            </aside>
          )}

          <div className="font-serif text-body text-ink max-w-[68ch] text-pretty lg:col-span-7 lg:col-start-5">
            {body ? (
              <ReactMarkdown components={markdownComponents}>{body}</ReactMarkdown>
            ) : (
              <p className="text-muted">{noDetailedContentLabel}</p>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
