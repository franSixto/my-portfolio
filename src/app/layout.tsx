import { ThemeProvider } from "next-themes";
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Metadata } from "next";
import { Work_Sans } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const fontPrincipal = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

import './globals.css';

export const metadata: Metadata = {
  title: "Francisco Sixto",
  description: "A designer of everithing",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en" data-theme="dark" style={{ colorScheme: "dark", fontFamily: fontPrincipal.style.fontFamily }} >
        <body>
          <ThemeProvider attribute="data-theme" >
            <Header />
            {children}
            <SpeedInsights />
            <Analytics />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;



