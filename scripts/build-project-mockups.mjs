// Builds the device mockups (browser window + phone) of the published client sites.
// Usage: npm run mockups:build [-- slug ...]   (needs system Chrome and network access)
//   1. Captures REAL above-the-fold screenshots of each live site with puppeteer-core + system Chrome
//      into design/mockups/raw/ (untracked, never served).
//   2. Composes a 1600x1000 WebP per site with sharp into public/projects/mockups/<slug>.webp.
// Only public marketing sites belong here. Never capture product UIs, logins or anything confidential.
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RAW_DIR = resolve(root, "design/mockups/raw");
const OUT_DIR = resolve(root, "public/projects/mockups");

// slug = output file name. Keep in sync with the gallery[0] of each case in src/content/projects.
const SITES = [
  { slug: "vivero-yvyra", url: "https://www.viveroyvyra.com.ar/", domain: "viveroyvyra.com.ar" },
  { slug: "consultora-prisma", url: "https://www.consultoraprisma.com.ar/", domain: "consultoraprisma.com.ar" },
  { slug: "ortopedia-para-ti", url: "https://ortopediaparati.com/", domain: "ortopediaparati.com" },
  { slug: "bienestar-senior", url: "https://www.bienestarsenior.com/", domain: "bienestarsenior.com" },
  { slug: "rexia", url: "https://rexia.ar/", domain: "rexia.ar", waitFor: "div.transition-all.duration-500.translate-y-3" },
  { slug: "business-a-day", url: "https://www.businessaday.com/", domain: "businessaday.com" },
  { slug: "retia", url: "https://retia.ar/", domain: "retia.ar" },
];

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const MOBILE_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";

// Distractions that would pollute a portfolio shot: cookie banners, chat widgets, popups.
const HIDE_CSS = `
*, *::before, *::after { animation-delay: -1ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition: none !important; scroll-behavior: auto !important; }
[id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="consent" i], [id*="gdpr" i], [class*="gdpr" i],
[id*="cmplz" i], [class*="cmplz" i], #onetrust-consent-sdk, #CybotCookiebotDialog,
.joinchat, [class*="whatsapp" i], [id*="whatsapp" i], [class*="wa-float" i], [class*="wapp" i], a[href*="wa.me"][class*="float" i],
[class*="tawk" i], iframe[src*="tawk" i], #tidio-chat, #hubspot-messages-iframe-container, .intercom-lightweight-app, #intercom-container,
[id*="crisp" i], .crisp-client, [class*="chat-widget" i], [id*="chat-widget" i], [class*="newsletter-popup" i], [class*="popup" i][class*="modal" i],
[class*="back-to-top" i], [class*="scroll-top" i], [class*="scrolltop" i] { display: none !important; }
`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const chrome = candidates.find((p) => existsSync(p));
  if (!chrome) throw new Error("Chrome not found. Set CHROME_PATH.");
  return chrome;
}

async function capture(browser, url, file, viewport, userAgent, waitFor) {
  const page = await browser.newPage();
  try {
    if (userAgent) await page.setUserAgent(userAgent);
    await page.setViewport(viewport);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await page.addStyleTag({ content: HIDE_CSS });
    await page.evaluate(() => document.fonts.ready);
    // Nudge scroll-triggered content (lazy images, reveal-on-scroll), then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y <= 1200; y += 300) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await sleep(1800);
    // Anything fixed/sticky that sits in the lower half of the viewport is a floating widget
    // (chat bubble, trust badge, cookie bar, WhatsApp button), never page content. Headers stay.
    const hideFloating = () =>
      page.evaluate(() => {
        const vh = window.innerHeight;
        for (const el of document.querySelectorAll("body *")) {
          const cs = getComputedStyle(el);
          if (cs.position !== "fixed") continue;
          const r = el.getBoundingClientRect();
          if (r.top > vh * 0.45) el.style.setProperty("display", "none", "important");
        }
      });
    await hideFloating();
    await sleep(600);
    await hideFloating();
    // Looping JS-driven hero (rexia): its list items fade in one by one, then reset. Wait for the full
    // state (every item revealed, i.e. none left with opacity-0) right before shooting.
    if (waitFor) {
      await page.waitForFunction(
        (sel) => {
          const items = [...document.querySelectorAll("div.transition-all.duration-500")].filter((d) => d.className.includes("items-start"));
          return items.length > 0 && items.every((d) => getComputedStyle(d).opacity === "1");
        },
        { timeout: 40000, polling: 100 },
        waitFor,
      );
    }
    await page.screenshot({ path: file, type: "png", clip: { x: 0, y: 0, width: viewport.width, height: viewport.height } });
  } finally {
    await page.close();
  }
}

// Composition (canvas 1600x1000, same editorial palette as the site tokens).
const W = 1600;
const H = 1000;
const BG = "#f0f2ef";
const INK = "#14201c";
const BR = { x: 100, y: 80, w: 1160, bar: 48, ch: 725, r: 16 }; // browser window; content is 16:10
const PH = { x: 1170, y: 244, bezel: 12, top: 40, sw: 306, sh: 634, r: 46, sr: 8 }; // phone; thick top bezel holds the camera, screen sits below it

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function backgroundSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><radialGradient id="g" cx="30%" cy="20%" r="90%"><stop offset="0" stop-color="#f7f8f6"/><stop offset="1" stop-color="${BG}"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/></svg>`;
}

function browserFrameSvg(domain) {
  const { x, y, w, bar, ch, r } = BR;
  const h = bar + ch;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><filter id="s" x="-10%" y="-10%" width="120%" height="130%"><feGaussianBlur stdDeviation="26"/></filter></defs>
  <rect x="${x + 10}" y="${y + 34}" width="${w - 20}" height="${h}" rx="${r}" fill="#14201c" opacity="0.22" filter="url(#s)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#ffffff" stroke="#c9d1cd" stroke-width="1.5"/>
  <path d="M${x} ${y + bar} V${y + r} a${r} ${r} 0 0 1 ${r} -${r} H${x + w - r} a${r} ${r} 0 0 1 ${r} ${r} V${y + bar} Z" fill="#e6eae7"/>
  <line x1="${x}" y1="${y + bar}" x2="${x + w}" y2="${y + bar}" stroke="#c9d1cd" stroke-width="1.5"/>
  <circle cx="${x + 28}" cy="${y + bar / 2}" r="6.5" fill="#b9c2be"/><circle cx="${x + 50}" cy="${y + bar / 2}" r="6.5" fill="#b9c2be"/><circle cx="${x + 72}" cy="${y + bar / 2}" r="6.5" fill="#b9c2be"/>
  <rect x="${x + w / 2 - 190}" y="${y + 10}" width="380" height="${bar - 20}" rx="${(bar - 20) / 2}" fill="#fbfbfa" stroke="#d5dbd7"/>
  <text x="${x + w / 2}" y="${y + bar / 2 + 5.5}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" fill="#4e5a55">${esc(domain)}</text>
  </svg>`;
}

function phoneFrameSvg() {
  const { x, y, bezel, top, sw, sh, r } = PH;
  const w = sw + bezel * 2;
  const h = sh + top + bezel;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><filter id="s" x="-30%" y="-20%" width="160%" height="150%"><feGaussianBlur stdDeviation="22"/></filter></defs>
  <rect x="${x - 6}" y="${y + 26}" width="${w + 12}" height="${h}" rx="${r + 4}" fill="#14201c" opacity="0.34" filter="url(#s)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r + bezel}" fill="${INK}"/>
  <rect x="${x + 1.5}" y="${y + 1.5}" width="${w - 3}" height="${h - 3}" rx="${r + bezel - 1.5}" fill="none" stroke="#3a4a44" stroke-width="1.5"/>
  </svg>`;
}

function phoneCameraSvg() {
  const { x, y, bezel, top, sw } = PH;
  const cx = x + bezel + sw / 2;
  const cy = y + top / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect x="${cx - 26}" y="${cy - 3}" width="52" height="6" rx="3" fill="#2a3732"/><circle cx="${cx + 38}" cy="${cy}" r="5.5" fill="#0b1210"/><circle cx="${cx + 39.5}" cy="${cy - 1.5}" r="1.6" fill="#2d3d37"/></svg>`;
}

const maskSvg = (w, h, path) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><path d="${path}" fill="#fff"/></svg>`);

async function fitted(file, w, h, path) {
  const base = await sharp(file).resize(w, h, { fit: "cover", position: "top", kernel: "lanczos3" }).png().toBuffer();
  return sharp(base).composite([{ input: maskSvg(w, h, path), blend: "dest-in" }]).png().toBuffer();
}

async function compose(site) {
  const { x, y, w, bar, ch, r } = BR;
  // Browser content: square top (under the bar), rounded bottom corners.
  const desk = await fitted(
    resolve(RAW_DIR, `${site.slug}-desktop.png`),
    w - 3,
    ch - 1,
    `M0 0 H${w - 3} V${ch - 1 - r} a${r} ${r} 0 0 1 -${r} ${r} H${r} a${r} ${r} 0 0 1 -${r} -${r} Z`,
  );
  const { sw, sh, bezel, top, sr } = PH;
  const mob = await fitted(
    resolve(RAW_DIR, `${site.slug}-mobile.png`),
    sw,
    sh,
    `M${sr} 0 H${sw - sr} a${sr} ${sr} 0 0 1 ${sr} ${sr} V${sh - PH.r} a${PH.r} ${PH.r} 0 0 1 -${PH.r} ${PH.r} H${PH.r} a${PH.r} ${PH.r} 0 0 1 -${PH.r} -${PH.r} V${sr} a${sr} ${sr} 0 0 1 ${sr} -${sr} Z`,
  );
  const out = resolve(OUT_DIR, `${site.slug}.webp`);
  await sharp(Buffer.from(backgroundSvg()))
    .composite([
      { input: Buffer.from(browserFrameSvg(site.domain)) },
      { input: desk, left: x + 2, top: y + bar + 1 },
      { input: Buffer.from(phoneFrameSvg()) },
      { input: mob, left: PH.x + bezel, top: PH.y + top },
      { input: Buffer.from(phoneCameraSvg()) },
    ])
    .webp({ quality: 80 })
    .toFile(out);
  return out;
}

const only = process.argv.slice(2);
const sites = only.length ? SITES.filter((s) => only.includes(s.slug)) : SITES;
await mkdir(RAW_DIR, { recursive: true });
await mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ["--no-sandbox", "--hide-scrollbars"] });
try {
  for (const site of sites) {
    await capture(browser, site.url, resolve(RAW_DIR, `${site.slug}-desktop.png`), DESKTOP, undefined, site.waitFor);
    await capture(browser, site.url, resolve(RAW_DIR, `${site.slug}-mobile.png`), MOBILE, MOBILE_UA, site.waitFor);
    console.log("wrote", await compose(site));
  }
} finally {
  await browser.close();
}
