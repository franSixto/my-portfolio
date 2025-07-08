import { ThemeProvider } from "next-themes";
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Metadata } from "next";
import { Work_Sans } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Analytics, { AnalyticsInit } from '@/components/Analytics';
import { ColorProvider } from '@/components/theme/ColorContext';
import HotjarScript from '@/components/HotjarScript';
import SplashScreen from '@/components/SplashScreen';

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
      <html lang="en" data-theme="dark" style={{ colorScheme: "dark", fontFamily: fontPrincipal.style.fontFamily }} >
        <head>
          <HotjarScript />
          <Analytics />
          <AnalyticsInit />
        </head>
        <body className={`${fontPrincipal.variable} font-sans`}>
          <ThemeProvider attribute="data-theme" >
            <ColorProvider>
              <SplashScreen />
              <Header />
              <main id="main-content">
                {children}
              </main>
              <SpeedInsights />
              <Footer />
            </ColorProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;



