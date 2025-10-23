import { ThemeProvider } from "next-themes";
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Metadata } from "next";
import { Work_Sans } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Analytics, { AnalyticsInit } from '@/components/Analytics';
import { ColorProvider } from '@/components/theme/ColorContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { PartyModeProvider } from '@/contexts/PartyModeContext';
import '@/lib/patchReactDevTools';
import '@/lib/suppressConsoleErrors';

const fontPrincipal = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-work-sans',
});

import './globals.css';

export const metadata: Metadata = {
  title: "Francisco Sixto",
  description: "A designer of everything",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Analytics />
          <AnalyticsInit />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    // Prevenir FOUC - next-themes usa 'theme' como clave por defecto
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
        </head>
        <body className={`${fontPrincipal.variable} font-sans`} suppressHydrationWarning>
          <svg style={{ display: "none" }}>
            <filter
              id="glass-distortion"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              filterUnits="objectBoundingBox"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.01"
                numOctaves="1"
                seed="5"
                result="turbulence"
              />

              <feComponentTransfer in="turbulence" result="mapped">
                <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
                <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
                <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
              </feComponentTransfer>

              <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

              <feSpecularLighting
                in="softMap"
                surfaceScale="5"
                specularConstant="1"
                specularExponent="100"
                lightingColor="white"
                result="specLight"
              >
                <fePointLight x="-200" y="-200" z="300" />
              </feSpecularLighting>

              <feComposite
                in="specLight"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
                result="litImage"
              />

              <feDisplacementMap
                in="SourceGraphic"
                in2="softMap"
                scale="150"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>
          <ThemeProvider 
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ColorProvider>
              <LanguageProvider>
                <PartyModeProvider>
                  <Header />
                  <main id="main-content">
                    {children}
                  </main>
                  <SpeedInsights />
                  <Footer />
                </PartyModeProvider>
              </LanguageProvider>
            </ColorProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;



