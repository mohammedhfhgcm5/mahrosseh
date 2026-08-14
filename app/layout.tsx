import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cairo } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fragola Gelato",
    template: "%s | Fragola Gelato",
  },
  description:
    "Fragola Gelato — premium Italian gelato and refreshing drinks. Browse the menu, specials, and locations.",
  applicationName: "Fragola Gelato",
  keywords: [
    "gelato",
    "Fragola",
    "Fragola Gelato",
    "ice cream",
    "drinks",
    "menu",
  ],
  authors: [{ name: "Fragola Gelato" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Fragola Gelato",
    title: "Fragola Gelato",
    description:
      "Premium Italian gelato and refreshing drinks. Browse the menu, specials, and locations.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Fragola Gelato",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fragola Gelato",
    description: "Premium Italian gelato and refreshing drinks.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
