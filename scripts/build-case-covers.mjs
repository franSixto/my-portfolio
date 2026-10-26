// Generates the typographic cover of EVERY case study (one standard template, 1600x900).
// Usage: node scripts/build-case-covers.mjs   (writes public/projects/covers/<slug>.webp)
// Covers are the project's face in listings and headers; real screenshots live in each case's `gallery`.
// Keep COVERS in sync with src/content/projects (a test checks the slugs). Text comes from the case copy:
// title = card title before the colon, category = role / kind / service as the case states them.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const W = 1600;
const H = 900;
const PALETTES = {
  dark: { bg: "#14201c", ink: "#e9efec", muted: "#a3b1ab", accent: "#8addc1", rule: "#2c3833" },
  paper: { bg: "#f0f2ef", ink: "#14201c", muted: "#4e5a55", accent: "#0b6b55", rule: "#d5dbd7" },
  pine: { bg: "#12302a", ink: "#e9efec", muted: "#a9c2b8", accent: "#5fcba8", rule: "#25493f" },
};

// Abstract geometry only: no product UI, no client marks. One pattern per case,
// each a loose reference to the project (a test keeps them unique). Art stays in
// the right half, below the category line.
const line = (x1, y1, x2, y2, c, w = 3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;
const box = (x, y, w, h, c, sw = 3, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${c}" stroke-width="${sw}"/>`;
const ring = (cx, cy, r, c, sw = 3) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c}" stroke-width="${sw}"/>`;
const poly = (pts, c, sw = 3) => `<polygon points="${pts}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round"/>`;

const ART = {
  // Start University: one module repeated across many institutions.
  modules: (p) =>
    Array.from({ length: 12 }, (_, i) => {
      const x = 900 + (i % 4) * 150;
      const y = 200 + Math.floor(i / 4) * 120;
      const c = i === 6 ? p.accent : p.rule;
      return box(x, y, 120, 90, c, i === 6 ? 4 : 3) + line(x + 16, y + 26, x + 70, y + 26, c);
    }).join(""),
  // Deep Creek: two arches of pieces, a nod to the dental chart.
  arch: (p) =>
    Array.from({ length: 16 }, (_, i) => {
      const k = i % 8;
      const d = ((k - 3.5) / 3.5) ** 2;
      const y = i < 8 ? 200 + 70 * d : 470 - 70 * d;
      const c = i === 5 ? p.accent : p.rule;
      return box(930 + k * 70, y, 50, 70, c, i === 5 ? 4 : 3, 14);
    }).join(""),
  // Autocity: bars facing each other, the vehicle comparator.
  compare: (p) =>
    line(1200, 190, 1200, 560, p.rule) +
    [[220, 180], [160, 240], [250, 130], [120, 220], [190, 150]]
      .map(([l, r], i) => {
        const y = 210 + i * 70;
        return box(1200 - 12 - l, y, l, 36, p.rule) + box(1212, y, r, 36, i === 1 ? p.accent : p.rule, i === 1 ? 4 : 3);
      })
      .join(""),
  // Sixto Van Garret: a framed spotlight, the product as the protagonist.
  spotlight: (p) =>
    box(1000, 180, 400, 360, p.rule) +
    box(1070, 250, 260, 220, p.accent, 4) +
    poly("1460,180 1490,210 1460,240 1430,210", p.accent) +
    line(1000, 580, 1400, 580, p.rule),
  // Officina Artis: a room in perspective, the 3D gallery.
  gallery: (p) =>
    box(900, 180, 600, 380, p.rule) +
    box(1110, 300, 180, 120, p.rule) +
    line(900, 180, 1110, 300, p.rule) + line(1500, 180, 1290, 300, p.rule) +
    line(900, 560, 1110, 420, p.rule) + line(1500, 560, 1290, 420, p.rule) +
    poly("950,250 1050,300 1050,400 950,460", p.rule) +
    poly("1450,250 1350,300 1350,400 1450,460", p.rule) +
    box(1155, 330, 90, 60, p.accent, 4),
  // Apex America: wayfinding signs on a post.
  wayfinding: (p) =>
    line(1240, 190, 1240, 570, p.rule) +
    [200, 290, 380, 470]
      .map((y, i) => {
        const c = i === 1 ? p.accent : p.rule;
        const w = i === 1 ? 4 : 3;
        return i % 2
          ? poly(`1240,${y} 1040,${y} 1000,${y + 28} 1040,${y + 56} 1240,${y + 56}`, c, w)
          : poly(`1240,${y} 1440,${y} 1480,${y + 28} 1440,${y + 56} 1240,${y + 56}`, c, w);
      })
      .join(""),
  // Ortopedia Para Ti: a product grid, the store catalog.
  catalog: (p) =>
    Array.from({ length: 8 }, (_, i) => {
      const x = 900 + (i % 4) * 155;
      const y = 200 + Math.floor(i / 4) * 195;
      const c = i === 2 ? p.accent : p.rule;
      return box(x, y, 130, 170, c, i === 2 ? 4 : 3) + ring(x + 65, y + 60, 32, c) + line(x + 20, y + 118, x + 110, y + 118, c) + line(x + 20, y + 140, x + 80, y + 140, c);
    }).join(""),
  // Bienestar Senior: large, easy targets for older adults.
  targets: (p) =>
    [[1000, 290], [1200, 290], [1400, 290], [1000, 470], [1200, 470], [1400, 470]]
      .map(([x, y], i) => (i === 4 ? ring(x, y, 70, p.accent, 4) + `<circle cx="${x}" cy="${y}" r="18" fill="${p.accent}"/>` : ring(x, y, 70, p.rule)))
      .join(""),
  // Rexia: a decision diagram, the authorization flow.
  decision: (p) =>
    ring(930, 380, 22, p.rule) + line(952, 380, 1060, 380, p.rule) +
    poly("1110,330 1160,380 1110,430 1060,380", p.rule) +
    `<path d="M1160 380 H1210 V250 H1330" fill="none" stroke="${p.accent}" stroke-width="4"/>` +
    `<path d="M1160 380 H1210 V510 H1330" fill="none" stroke="${p.rule}" stroke-width="3"/>` +
    ring(1352, 250, 22, p.accent, 4) + line(1374, 250, 1420, 250, p.accent, 4) + box(1420, 222, 80, 56, p.accent, 4, 10) +
    ring(1352, 510, 22, p.rule) + line(1374, 510, 1420, 510, p.rule) + box(1420, 482, 80, 56, p.rule, 3, 10),
  // Consultora Prisma: a prism splitting light.
  prism: (p) =>
    poly("1150,190 1020,540 1280,540", p.rule) +
    line(880, 430, 1088, 372, p.rule, 4) +
    [250, 320, 390, 460].map((y, i) => line(1212, 372, 1510, y, i === 1 ? p.accent : p.rule, i === 1 ? 5 : 3)).join(""),
  // Vivero Yvyra: a leaf with its veins, the botanical catalog.
  leaf: (p) =>
    `<path d="M1000 540 C1000 330 1180 200 1460 190 C1450 450 1260 560 1000 540 Z" fill="none" stroke="${p.accent}" stroke-width="4"/>` +
    line(1000, 540, 1400, 240, p.rule) +
    [0.3, 0.5, 0.7]
      .map((t) => {
        const x = 1000 + 400 * t;
        const y = 540 - 300 * t;
        return line(x, y, x - 10, y - 120 + 60 * t, p.rule) + line(x, y, x + 120 - 40 * t, y + 30, p.rule);
      })
      .join(""),
};

const COVERS = [
  { slug: "start-university", title: ["Start", "University"], category: "UX/UI · Portal del estudiante · Sitios educativos", palette: "pine", art: "modules" },
  { slug: "deep-creek-solutions", title: ["Deep Creek", "Solutions"], category: "Product Design · UX/UI · SaaS de salud y estética", palette: "paper", art: "arch" },
  { slug: "autocity-grupo-tagle", title: ["Autocity y", "Grupo Tagle"], category: "Diseño web · Catálogo de autos · Sitios de marca", palette: "dark", art: "compare" },
  { slug: "sixto-van-garret", title: ["Sixto", "Van Garret"], category: "Diseño web · Tienda online en Tienda Nube", palette: "pine", art: "spotlight" },
  { slug: "officina-artis", title: ["Officina", "Artis"], category: "Concepto 3D · Desarrollo web · Proyecto propio", palette: "dark", art: "gallery" },
  { slug: "apex-america", title: ["Apex", "America"], category: "Comunicación interna · Señalética · Diseño", palette: "paper", art: "wayfinding" },
  { slug: "ortopedia-para-ti", title: ["Ortopedia", "Para Ti"], category: "UX/UI Design · Rediseño de e-commerce", palette: "paper", art: "catalog" },
  { slug: "bienestar-senior", title: ["Bienestar", "Senior"], category: "UX/UI Design · Rediseño de e-commerce", palette: "dark", art: "targets" },
  { slug: "rexia", title: ["Rexia"], category: "Product Design · UX/UI · SaaS de salud", palette: "pine", art: "decision" },
  { slug: "consultora-prisma", title: ["Consultora", "Prisma"], category: "Diseño web · Desarrollo web", palette: "paper", art: "prism" },
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
<text x="100" y="${Math.min(baseY + 70, 860)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" letter-spacing="2" fill="${p.muted}">FRANCISCO SIXTO</text>
</svg>`;
}

await mkdir(new URL("../public/projects/covers/", import.meta.url), { recursive: true });
for (const cover of COVERS) {
  const buf = await sharp(Buffer.from(svg(cover))).webp({ quality: 88 }).toBuffer();
  await writeFile(new URL(`../public/projects/covers/${cover.slug}.webp`, import.meta.url), buf);
  console.log(`wrote public/projects/covers/${cover.slug}.webp (${buf.length} bytes)`);
}
