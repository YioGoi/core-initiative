import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale } from "@core-initiative/common/config";
import { content } from "@/lib/content";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };
const mono = readFile(join(process.cwd(), "src/app/fonts/IBMPlexMono-Regular.ttf"));

export async function generateImageMetadata({ params }: { params: { locale: string } | Promise<{ locale: string }> }) {
  const candidate = (await params).locale;
  // Next may collect image IDs before parent locale parameters are available.
  const locale = isLocale(candidate) ? candidate : defaultLocale;
  return [{ id: "share", alt: `${content[locale].hero.title.join(" ")} — ${content[locale].hero.eyebrow}. Tool by Core Initiative.`, size, contentType: "image/png" }];
}

export default async function ShareImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = content[locale];
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#211f26", color: "#e9e5dd", fontFamily: "IBM Plex Mono", padding: "46px 60px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 64, letterSpacing: -6 }}>tool<span style={{ color: "#d8dd95" }}>.</span></span><span style={{ fontSize: 17, color: "#afa2ba" }}>by Core Initiative</span></div>
      <div style={{ display: "flex", flexDirection: "column", width: 750, marginTop: -8 }}>
        <div style={{ fontSize: 62, lineHeight: 1.3, letterSpacing: -4 }}>{copy.hero.title[0]}</div>
        <div style={{ fontSize: 62, lineHeight: 1.3, letterSpacing: -4, color: "#d8dd95" }}>{copy.hero.title[1]}</div>
        <div style={{ marginTop: 28, fontSize: 21, color: "#bfb7c5" }}>{copy.hero.eyebrow}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #53485f", paddingTop: 22, fontSize: 15, color: "#bfb7c5" }}><span>{copy.hero.note}</span><span>tool.coreinitiative.nl</span></div>
      <div style={{ display: "flex", position: "absolute", left: 820, top: 168, width: 300, height: 300 }}>
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none"><circle cx="150" cy="150" r="144" stroke="#514759" /><circle cx="150" cy="150" r="119" stroke="#d8dd95" strokeWidth="5" strokeDasharray="530 748" transform="rotate(-120 150 150)" /><circle cx="150" cy="150" r="84" stroke="#afa2ba" strokeWidth="5" strokeDasharray="375 528" transform="rotate(30 150 150)" /><circle cx="150" cy="150" r="49" stroke="#d8dd95" strokeWidth="5" strokeDasharray="220 308" transform="rotate(-70 150 150)" /><circle cx="150" cy="150" r="3" fill="#d8dd95" /></svg>
      </div>
    </div>,
    { ...size, fonts: [{ name: "IBM Plex Mono", data: await mono, weight: 400 }] },
  );
}
