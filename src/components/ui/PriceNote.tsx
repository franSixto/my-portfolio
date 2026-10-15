import cx from "classnames";

/** Margin note with the starting price and how the final quote is set. */
export default function PriceNote({
  label,
  note,
  className,
}: {
  label: string;
  note: string;
  className?: string;
}) {
  return (
    <div className={cx("border-l-2 border-accent pl-5", className)}>
      <p className="font-sans text-h3 font-semibold text-ink">{label}</p>
      <p className="mt-2 text-meta text-muted text-pretty">{note}</p>
    </div>
  );
}
