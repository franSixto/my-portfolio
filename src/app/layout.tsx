import { ThemeProvider } from "next-themes";
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Metadata } from "next";
import { Work_Sans } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { ColorProvider } from '@/components/theme/ColorContext';
import HotjarScript from '@/components/HotjarScript';
import SplashScreen from '@/components/SplashScreen';

const fontPrincipal = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
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
        </head>
        <body>
          <ThemeProvider attribute="data-theme" >
            <ColorProvider>
              <SplashScreen />
              <Header />
              <main id="main-content">
                {children}
              </main>
              <SpeedInsights />
              <Analytics />
              <Footer />
            </ColorProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;



