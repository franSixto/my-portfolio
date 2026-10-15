import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_META } from "@/content/site";
import type { Locale } from "@/i18n/routes";

// Brand tokens (see globals.css): paper, ink, muted, rule, accent.
const COLORS = {
  paper: "#FBFBFA",
  ink: "#14201C",
  muted: "#4E5A55",
  rule: "#D5DBD7",
  accent: "#0B6B55",
};

const HEADLINE: Record<Locale, string> = {
  es: "Diseño UX/UI, web y MVPs con IA",
  en: "UX/UI design, websites and AI-assisted MVPs",
};

const PLACE = "Córdoba, Argentina";

// Read at build time: the opengraph-image routes are prerendered, so the fonts
// are never needed at request time.
const FONT_DIR = join(process.cwd(), "src/lib/og/fonts");

async function loadFont(file: "Medium" | "SemiBold") {
  const buffer = await readFile(join(FONT_DIR, `SchibstedGrotesk-${file}.ttf`));
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

/** Default social preview (1200x630) for a locale tree. */
export async function renderOgImage(locale: Locale) {
  const [medium, semibold] = await Promise.all([loadFont("Medium"), loadFont("SemiBold")]);
  const jobTitle = SITE_META[locale].jobTitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: COLORS.paper,
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div style={{ width: 16, height: "100%", background: COLORS.accent }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 80px 64px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 500,
              color: COLORS.muted,
              letterSpacing: "-0.01em",
            }}
          >
            fransixto.com.ar
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 88,
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: COLORS.ink,
                maxWidth: 980,
              }}
            >
              {HEADLINE[locale]}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", height: 2, background: COLORS.rule }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: 28,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    fontSize: 46,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: COLORS.ink,
                  }}
                >
                  Francisco Sixto
                </div>
                <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: COLORS.muted, marginTop: 6 }}>
                  {jobTitle}
                </div>
              </div>
              <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: COLORS.accent }}>
                {PLACE}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Schibsted Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Schibsted Grotesk", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
