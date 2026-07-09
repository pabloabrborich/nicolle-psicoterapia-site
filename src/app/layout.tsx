import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { env } from "@/lib/env";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ConsentBanner } from "@/components/ConsentBanner";
import { brand } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${brand.name} | Psicoterapia online en Ecuador`,
    template: `%s | ${brand.name}`
  },
  description:
    "Psicoterapia online para adultos, familias, crianza, talleres y arte terapia en Ecuador.",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-419">
      <body className="font-sans antialiased">
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
        <StickyMobileCTA />
        <ConsentBanner />
        {env.gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${env.gaId}`} />
            <Script id="ga4">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${env.gaId}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
        {env.metaPixelId ? (
          <Script id="meta-pixel">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${env.metaPixelId}');fbq('track','PageView');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
