import cx from "classnames";
import type { ReactNode } from "react";

/** Renders `code` spans written with backticks; everything else stays plain text. */
export function Inline({ text }: { text: string }) {
  const parts = text.split("`");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="rounded bg-surface px-1.5 py-0.5 font-sans text-[0.9em]">
            {part}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
}

/** Serif intro paragraph under a page or section title. */
export function Lead({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cx("font-serif text-lead text-ink/90 max-w-[60ch] text-pretty", className)}>
      {children}
    </p>
  );
}

/** Long-form reading text (serif, 68ch measure). */
export function Prose({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cx(
        "font-serif text-body text-ink max-w-[68ch] [&>p+p]:mt-5 text-pretty",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Small sentence-case label that names the category of what follows. */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cx("text-meta font-medium text-accent", className)}>{children}</p>;
}

/** Thin separator. Decorative: hidden from assistive tech. */
export function Rule({ className }: { className?: string }) {
  return <hr aria-hidden="true" className={cx("h-px border-0 bg-rule", className)} />;
}

export function Tag({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-rule px-2.5 py-0.5 text-meta text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
