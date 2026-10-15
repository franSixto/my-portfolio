import cx from "classnames";

/** Ordered process. Only for content that really is a sequence. */
export function NumberedList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ol className={cx("border-b border-rule", className)}>
      {items.map((item, i) => (
        <li
          key={item}
          className="grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] items-baseline gap-4 border-t border-rule py-5 first:border-t-0 first:pt-0 md:py-6 md:first:pt-0"
        >
          <span
            aria-hidden="true"
            className="font-sans text-h3 font-semibold tabular-nums text-accent"
          >
            {i + 1}
          </span>
          <span className="font-serif text-body text-ink text-pretty">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Unordered list with a rule between items (deliverables, problems...). */
export function RuleList({
  items,
  columns = 1,
  className,
}: {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul className={cx(columns === 2 && "md:grid md:grid-cols-2 md:gap-x-8", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="relative border-t border-rule py-4 pl-6 first:border-t-0 first:pt-0 first:before:top-[0.6rem] font-serif text-body text-ink text-pretty before:absolute before:left-0 before:top-[1.6rem] before:h-[2px] before:w-3 before:bg-accent"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
