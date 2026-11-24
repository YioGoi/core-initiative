import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@core-initiative/common/config";
import { site } from "@/config/site";
import "../globals.css";

const sans = localFont({ src: "../fonts/DMSans-Variable.ttf", variable: "--font-sans", weight: "100 1000", display: "swap" });
const serif = localFont({ src: "../fonts/Fraunces-Italic.ttf", variable: "--font-serif", weight: "100 900", style: "italic", display: "swap" });

export const metadata: Metadata = { metadataBase: new URL(site.origin), icons: { icon: "/icon.svg" } };
export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale} className={`${sans.variable} ${serif.variable}`}><body>{children}</body></html>;
}
