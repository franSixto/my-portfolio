// Prints docs/cv/cv-es.html to public/cv-fran-sixto.pdf using system Chrome (headless).
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = resolve(root, "docs/cv/cv-es.html");
const output = resolve(root, "public/cv-fran-sixto.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH.");
  process.exit(1);
}

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    // Give the web fonts (Google Fonts) time to load before printing.
    "--virtual-time-budget=10000",
    `--print-to-pdf=${output}`,
    pathToFileURL(input).href,
  ],
  { stdio: "inherit" },
);
console.log(`CV written to ${output}`);
