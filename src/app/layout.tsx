import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { Suspense } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Cursor } from "@/components/Cursor";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--app-font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--app-font-serif",
});

const siteUrl = "https://clarisolvetech.com";
const siteName = "ClariSolve TECH";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C0C0C",
};

export const metadata: Metadata = {
  title: {
    default: `${siteName} | Technology Solutions`,
    template: `%s | ${siteName}`,
  },
  description: "Technology solutions that help businesses grow. Founded by Vijay Nadella, we help businesses build websites, develop software, automate processes, improve quality, and grow through technology — without the complexity.",
  authors: [{ name: "Vijay Nadella" }],
  creator: "Vijay Nadella",
  keywords: ["ClariSolve Tech", "Vijay Nadella", "web development", "software solutions", "AI automation", "technology consulting"],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} | Technology Solutions`,
    description: "Technology solutions that help businesses grow — websites, software, AI automation, and more. Founded by Vijay Nadella.",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Technology Solutions`,
    description: "Technology solutions that help businesses grow — websites, software, AI automation, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${cormorant.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <Cursor />
        </Suspense>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
