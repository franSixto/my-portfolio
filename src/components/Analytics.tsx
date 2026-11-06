import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/metaPixel";

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

/** Meta Pixel base code. Renders nothing unless NEXT_PUBLIC_META_PIXEL_ID is a digits-only id. */
export function MetaPixelInit() {
  if (!META_PIXEL_ID) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}

/** Image fallback for visitors without JavaScript. Rendered in the body. */
export function MetaPixelNoscript() {
  if (!META_PIXEL_ID) return null;
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element -- tracking pixel fallback */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
