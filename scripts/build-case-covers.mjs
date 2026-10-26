// Generates honest typographic covers for case studies that have no real screenshots yet.
// Usage: node scripts/build-case-covers.mjs   (writes public/projects/<slug>.webp, 1600x900)
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const W = 1600;
const H = 900;
const PALETTES = {
  dark: { bg: "#14201c", ink: "#e9efec", muted: "#a3b1ab", accent: "#8addc1", rule: "#2c3833" },
  paper: { bg: "#f0f2ef", ink: "#14201c", muted: "#4e5a55", accent: "#0b6b55", rule: "#d5dbd7" },
  pine: { bg: "#12302a", ink: "#e9efec", muted: "#a9c2b8", accent: "#5fcba8", rule: "#25493f" },
};

// Abstract geometry only: no product UI, no client marks.
const ART = {
  grid: (p) =>
    Array.from({ length: 7 }, (_, i) => `<line x1="${900 + i * 100}" y1="80" x2="${900 + i * 100}" y2="560" stroke="${p.rule}" stroke-width="2"/>`).join("") +
    Array.from({ length: 5 }, (_, i) => `<line x1="900" y1="${80 + i * 120}" x2="1500" y2="${80 + i * 120}" stroke="${p.rule}" stroke-width="2"/>`).join("") +
    `<rect x="1000" y="200" width="200" height="240" fill="none" stroke="${p.accent}" stroke-width="4"/>`,
  flow: (p) =>
    `<path d="M900 420 H1100 V240 H1300 V420 H1500" fill="none" stroke="${p.accent}" stroke-width="4"/>` +
    [900, 1100, 1300, 1500].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 240 : 420}" r="14" fill="${p.bg}" stroke="${p.accent}" stroke-width="4"/>`).join("") +
    `<line x1="900" y1="560" x2="1500" y2="560" stroke="${p.rule}" stroke-width="2"/>`,
  waves: (p) =>
    [0, 1, 2, 3, 4].map((i) => `<path d="M880 ${200 + i * 80} q 75 -60 150 0 t 150 0 t 150 0 t 150 0" fill="none" stroke="${i === 2 ? p.accent : p.rule}" stroke-width="${i === 2 ? 5 : 3}"/>`).join(""),
  rings: (p) =>
    [260, 200, 140, 80].map((r, i) => `<circle cx="1200" cy="320" r="${r}" fill="none" stroke="${i === 3 ? p.accent : p.rule}" stroke-width="${i === 3 ? 5 : 3}"/>`).join(""),
  steps: (p) =>
    [0, 1, 2, 3, 4].map((i) => `<rect x="${900 + i * 120}" y="${460 - i * 80}" width="100" height="${100 + i * 80}" fill="none" stroke="${i === 4 ? p.accent : p.rule}" stroke-width="${i === 4 ? 5 : 3}"/>`).join(""),
  leaf: (p) =>
    `<path d="M1200 560 C1200 340 1080 220 900 200 C920 400 1020 540 1200 560 Z" fill="none" stroke="${p.accent}" stroke-width="4"/>` +
    `<path d="M1200 560 C1200 340 1320 220 1500 200 C1480 400 1380 540 1200 560 Z" fill="none" stroke="${p.rule}" stroke-width="3"/>` +
    `<line x1="1200" y1="560" x2="1200" y2="300" stroke="${p.rule}" stroke-width="3"/>`,
};

const COVERS = [
  { slug: "ortopedia-para-ti", title: ["Ortopedia", "Para Ti"], category: "UX/UI Design · Rediseño de e-commerce", palette: "paper", art: "grid" },
  { slug: "bienestar-senior", title: ["Bienestar", "Senior"], category: "UX/UI Design · Rediseño de e-commerce", palette: "dark", art: "steps" },
  { slug: "rexia", title: ["Rexia"], category: "Product Design · UX/UI · SaaS de salud", palette: "pine", art: "flow" },
  { slug: "deep-creek-branding", title: ["Deep Creek", "branding y web"], category: "Branding · Diseño web · Identidad visual", palette: "dark", art: "waves" },
  { slug: "consultora-prisma", title: ["Consultora", "Prisma"], category: "Diseño web · Desarrollo web", palette: "paper", art: "rings" },
  { slug: "vivero-yvyra", title: ["Vivero", "Yvyrá"], category: "UX/UI · Desarrollo full-stack · CMS a medida", palette: "pine", art: "leaf" },
];

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function svg({ title, category, palette, art }) {
  const p = PALETTES[palette];
  const lines = title
    .map((t, i) => `<text x="100" y="${620 + i * 120}" font-family="Georgia, 'Times New Roman', serif" font-size="108" fill="${p.ink}">${esc(t)}</text>`)
    .join("");
  const baseY = 620 + (title.length - 1) * 120;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${p.bg}"/>
${ART[art](p)}
<line x1="100" y1="120" x2="140" y2="120" stroke="${p.accent}" stroke-width="5"/>
<text x="160" y="130" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" letter-spacing="2" fill="${p.muted}">${esc(category.toUpperCase())}</text>
${lines}
<text x="100" y="${Math.min(baseY + 70, 860)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" letter-spacing="2" fill="${p.muted}">PORTADA TIPOGRÁFICA · FRANCISCO SIXTO</text>
</svg>`;
}

for (const cover of COVERS) {
  const buf = await sharp(Buffer.from(svg(cover))).webp({ quality: 88 }).toBuffer();
  await writeFile(new URL(`../public/projects/${cover.slug}.webp`, import.meta.url), buf);
  console.log(`wrote public/projects/${cover.slug}.webp (${buf.length} bytes)`);
}
