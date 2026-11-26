import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@core-initiative/common/config";
import { site } from "@/config/site";
import "../globals.css";

const display = localFont({ src: "../fonts/SpaceGrotesk.ttf", variable: "--font-display", weight: "300 700", display: "swap" });
const body = localFont({ src: "../fonts/IBMPlexSans.ttf", variable: "--font-body", weight: "100 700", display: "swap" });
const mono = localFont({ src: "../fonts/IBMPlexMono-Regular.ttf", variable: "--font-mono", weight: "400", display: "swap", preload: false });
export const metadata: Metadata = { metadataBase: new URL(site.origin), icons: { icon: "/icon.svg" }, robots: { index: site.indexable, follow: site.indexable } };
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}><body>{children}</body></html>;
}
