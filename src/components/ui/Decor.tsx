import cx from "classnames";
import { revealProps } from "@/lib/motion/reveal";

/** Four crop marks at the corners of the parent (which must be `relative`). Decorative. */
export function CropMarks({
  className,
  inset = "-0.75rem",
  tone = "accent",
}: {
  className?: string;
  inset?: string;
  tone?: "accent" | "band";
}) {
  const arm = cx("absolute h-4 w-4", tone === "band" ? "border-band-action" : "border-accent");
  return (
    <span
      aria-hidden="true"
      className={cx("pointer-events-none absolute", className)}
      style={{ inset }}
    >
      <span className={cx(arm, "left-0 top-0 border-l-2 border-t-2")} />
      <span className={cx(arm, "right-0 top-0 border-r-2 border-t-2")} />
      <span className={cx(arm, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span className={cx(arm, "bottom-0 right-0 border-b-2 border-r-2")} />
    </span>
  );
}

/** Dimension line with end ticks, like a measurement callout. Decorative. */
export function MeasureLine({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 240 12"
      preserveAspectRatio="none"
      className={cx("h-3 w-full text-accent", className)}
      {...revealProps("line", 1)}
    >
      <g stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none">
        <path d="M0.5 0v12M239.5 0v12" vectorEffect="non-scaling-stroke" />
        <path d="M0 6h240" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}
