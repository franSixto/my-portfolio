// Prints the CV sources in docs/cv/ to PDFs in public/ using system Chrome (headless).
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const builds = [
  ["docs/cv/cv-es.html", "public/cv-fran-sixto.pdf"],
  ["docs/cv/cv-en.html", "public/cv-fran-sixto-en.pdf"],
];

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

for (const [source, target] of builds) {
  const output = resolve(root, target);
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      // Give the web fonts (Google Fonts) time to load before printing.
      "--virtual-time-budget=10000",
      `--print-to-pdf=${output}`,
      pathToFileURL(resolve(root, source)).href,
    ],
    { stdio: "inherit" },
  );
  console.log(`CV written to ${output}`);
}
