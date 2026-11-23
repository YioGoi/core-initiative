import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@core-initiative/common/config";
import { site } from "@/config/site";
import "../globals.css";

const display = localFont({ src: "../fonts/BarlowCondensed-SemiBold.ttf", weight: "600", display: "swap", variable: "--font-display" });
const body = localFont({ src: "../fonts/Manrope-Variable.ttf", weight: "200 800", display: "swap", variable: "--font-body" });

export const metadata: Metadata = { metadataBase: new URL(site.origin) };
export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale} className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
