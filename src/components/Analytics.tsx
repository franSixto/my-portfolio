import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <Script
      id="google-gtag"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
    />
  );
}

// Para inicializar gtag
export function AnalyticsInit() {
  if (!GA_ID) return null;
  return (
    <Script id="gtag-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}
    </Script>
  );
}
