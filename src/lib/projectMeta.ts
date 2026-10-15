// Presentation helpers for project case studies stored as Markdown.
// The copy itself is not changed: only its structure is read for layout.

export type ProjectMetaItem = { label: string; value: string };

const EMOJI = String.raw`(?:\p{Extended_Pictographic}️?‍?)+`;
// "👉 **Role**: Lead designer" (colon outside or inside the bold run)
const META_LINE = new RegExp(String.raw`^\s*(?:${EMOJI}\s*)?\*\*([^*]+?):?\*\*\s*:?\s+(.+?)\s*$`, "u");
// "🎨 **What I did**" on its own line -> heading
const EMOJI_BOLD_LINE = new RegExp(String.raw`^\s*${EMOJI}\s*\*\*([^*]+)\*\*\s*$`, "u");
// "### 🎯 Goal" -> "### Goal"
const EMOJI_HEADING = new RegExp(String.raw`^(#{1,6})\s*${EMOJI}\s*`, "u");

function normalizeHeadings(markdown: string): string {
  return markdown
    .split("\n")
    .map((line) => {
      const bold = line.match(EMOJI_BOLD_LINE);
      if (bold) return `### ${bold[1].trim()}`;
      return line.replace(EMOJI_HEADING, "$1 ");
    })
    .join("\n");
}

/**
 * Splits the leading "**Label**: value" lines of a case study into a meta list
 * (shown in the sidebar) and returns the remaining body with emoji-led
 * pseudo-headings turned into real headings.
 */
export function splitProjectMeta(markdown: string): { meta: ProjectMetaItem[]; body: string } {
  if (!markdown) return { meta: [], body: "" };
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const meta: ProjectMetaItem[] = [];
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  while (i < lines.length) {
    const match = lines[i].match(META_LINE);
    if (!match) break;
    meta.push({ label: match[1].trim(), value: match[2].trim() });
    i++;
  }
  if (meta.length === 0) return { meta, body: normalizeHeadings(markdown) };
  while (i < lines.length && lines[i].trim() === "") i++;
  if (lines[i]?.trim() === "---") i++;
  return { meta, body: normalizeHeadings(lines.slice(i).join("\n").trim()) };
}
