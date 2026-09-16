import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { ConsentProvider } from "@/components/ConsentProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/JsonLd";
import { resolveSiteUrl } from "@/lib/site";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: {
    default: "PixelPitch — eFootball Blog",
    template: "%s | PixelPitch",
  },
  description:
    "PixelPitch covers eFootball news, guides, and match analysis — clean sports editorial for competitive players.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "PixelPitch — eFootball Blog",
    description:
      "eFootball news, guides, and match analysis from PixelPitch.",
    siteName: "PixelPitch",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelPitch — eFootball Blog",
    description:
      "eFootball news, guides, and match analysis from PixelPitch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreFranklin.variable} ${sourceSerif.variable}`}
    >
      <body suppressHydrationWarning>
        <ConsentProvider>
          <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
          <div className="site-shell">
            <div className="site-content">{children}</div>
            <Footer />
          </div>
          <CookieConsent />
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
