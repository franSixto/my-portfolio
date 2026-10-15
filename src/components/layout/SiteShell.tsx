import { ThemeProvider } from "next-themes";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Analytics, { AnalyticsInit } from "@/components/Analytics";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getDictionary } from "@/i18n/dictionary";
import { buildSiteJsonLd, serializeJsonLd } from "@/i18n/seo";
import type { Locale } from "@/i18n/routes";
import "@/app/globals.css";

// Two variable families, latin only. Schibsted Grotesk: display, headings, UI.
// Newsreader: leads and long-form reading text.
const fontSans = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
});

const fontSerif = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
  variable: "--font-newsreader",
});

/**
 * Shared document shell. Each locale has its own root layout (so <html lang>
 * is correct in the server HTML) and both render this component.
 */
export default function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const translations = getDictionary(locale);

  return (
    <html lang={locale} className={`${fontSans.variable} ${fontSerif.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- root layout shell, App Router head */}
      <head>
        <Analytics />
        <AnalyticsInit />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Prevent FOUC - next-themes uses 'theme' as the default key
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildSiteJsonLd(locale)) }}
        />
      </head>
      <body className="font-sans bg-paper text-ink" suppressHydrationWarning>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider locale={locale} translations={translations}>
            <Header />
            <main id="main-content" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <VercelAnalytics />
            <SpeedInsights />
            <Footer locale={locale} />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
