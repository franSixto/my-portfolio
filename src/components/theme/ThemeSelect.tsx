"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import cx from "classnames";
import { Moon, Sun } from "@/components/ui/icons";

export type ThemeLabels = { toDark: string; toLight: string };

export default function ThemeSelect({ labels, className }: { labels: ThemeLabels; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const classes = cx(
    "inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] text-muted hover:bg-surface hover:text-ink",
    className
  );

  // Same box before mount, so there is no layout shift.
  if (!mounted) return <span className={classes} aria-hidden="true" />;

  const isDark = resolvedTheme === "dark";
  const label = isDark ? labels.toLight : labels.toDark;
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cx(classes, "cursor-pointer")}
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
