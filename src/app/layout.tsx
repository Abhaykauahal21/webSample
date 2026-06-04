import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { PageTransition } from "@/components/PageTransition";
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

export const metadata: Metadata = {
  title: "ClariSolve TECH | Technology Solutions",
  description: "Technology solutions that help businesses grow. Founded by Vijay Nadella, we help businesses build websites, develop software, automate processes, improve quality, and grow through technology — without the complexity.",
  authors: [{ name: "Vijay Nadella — Founder & CEO, ClariSolve Tech" }],
  creator: "Vijay Nadella",
  keywords: ["ClariSolve Tech", "Vijay Nadella", "web development", "software solutions", "AI automation", "technology consulting"],
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
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
