import { ThemeProvider } from "next-themes";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from "next";
import { Work_Sans } from 'next/font/google';

const roboto = Work_Sans({
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
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }} >
      <body>
        <ThemeProvider attribute="data-theme" >
          <Header />
          {children}
          <Footer /> 
        </ThemeProvider>
      </body>
    </html>
    </>
  );
};

export default RootLayout;



