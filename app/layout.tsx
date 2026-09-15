import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
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
  title: {
    default: "PixelPitch — eFootball Blog",
    template: "%s | PixelPitch",
  },
  description:
    "PixelPitch covers eFootball news, guides, and match analysis — clean sports editorial for competitive players.",
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
      <body>{children}</body>
    </html>
  );
}
