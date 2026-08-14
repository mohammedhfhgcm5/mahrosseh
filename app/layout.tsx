import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cairo } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import { SITE_NAME_AR } from "@/lib/constants";
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
    default: `${SITE_NAME_AR} | Fragola Gelato`,
    template: `%s | ${SITE_NAME_AR}`,
  },
  description:
    "فراجولا جيلاتو — جيلاتو إيطالي فاخر ومشروبات منعشة. تصفّح المنيو واكتشف الفروع والعروض.",
  applicationName: "Fragola Gelato",
  keywords: [
    "جيلاتو",
    "فراجولا",
    "Fragola Gelato",
    "آيس كريم",
    "مشروبات",
    "منيو",
  ],
  authors: [{ name: "Fragola Gelato" }],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: SITE_NAME_AR,
    title: `${SITE_NAME_AR} | Fragola Gelato`,
    description:
      "جيلاتو إيطالي فاخر ومشروبات منعشة. تصفّح المنيو واكتشف الفروع والعروض.",
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
    title: `${SITE_NAME_AR} | Fragola Gelato`,
    description: "جيلاتو إيطالي فاخر ومشروبات منعشة.",
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
