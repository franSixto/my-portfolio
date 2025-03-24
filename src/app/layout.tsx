import { ThemeProvider } from "next-themes";
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Francisco Sixto",
  description: "A designer of everithing",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="dark" style={{colorScheme:"dark"}}>
      <body>
        <ThemeProvider attribute="data-theme" enableSystem>
          <Header />
          {children}
          <Footer /> 
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;



