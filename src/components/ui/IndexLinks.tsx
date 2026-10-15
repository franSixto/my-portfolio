import Link from "next/link";
import { ArrowUpRight } from "./icons";

/** Large linked rows: an index of destinations (services, related pages). */
export default function IndexLinks({
  items,
  ariaLabel,
  headingLevel = "h3",
}: {
  items: {
    href: string;
    title: string;
    text?: string;
    /** Visual call-to-action text (decorative; the title remains the link name). */
    linkLabel?: string;
  }[];
  ariaLabel?: string;
  headingLevel?: "h3" | "h4" | "p";
}) {
  const Title = headingLevel;
  const list = (
    <ul className="border-b border-rule">
      {items.map((item) => (
        <li key={item.href} className="group relative border-t border-rule first:border-t-0 [&:first-child>div]:pt-0">
          <div className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8">
            <Title className="font-sans text-h3 font-semibold text-ink md:col-span-5">
              <Link
                href={item.href}
                className="outline-none after:absolute after:inset-0 group-hover:text-accent focus-visible:text-accent"
              >
                {item.title}
              </Link>
            </Title>
            {(item.text || item.linkLabel) && (
              <div className="md:col-span-6">
                {item.text && <p className="text-ui text-muted text-pretty">{item.text}</p>}
                {item.linkLabel && (
                  <p aria-hidden="true" className="mt-3 text-ui font-medium text-accent">
                    {item.linkLabel}
                  </p>
                )}
              </div>
            )}
            <span
              aria-hidden="true"
              className="hidden justify-self-end text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transition-none md:col-span-1 md:block"
            >
              <ArrowUpRight className="size-6" />
            </span>
          </div>
          {/* Focus ring for the stretched link */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-sm outline-accent outline-offset-2 group-has-[a:focus-visible]:outline-2"
          />
        </li>
      ))}
    </ul>
  );
  return ariaLabel ? <nav aria-label={ariaLabel}>{list}</nav> : list;
}
