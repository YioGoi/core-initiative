import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { isLocale } from "@core-initiative/common/config";
import { content } from "@/lib/content";

export const dynamic = "force-static";
export const alt = "Cookie — Brand & Digital Design, by Core Initiative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const sans = readFile(join(process.cwd(), "src/app/fonts/DMSans-Medium.ttf"));
const serif = readFile(join(process.cwd(), "src/app/fonts/Fraunces-ShareItalic.ttf"));

export default async function ShareImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = content[locale];
  const [body, display] = await Promise.all([sans, serif]);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f9f3e9", color: "#521c2d", fontFamily: "DM Sans", fontWeight: 500, flexDirection: "column", padding: "48px 64px", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", fontSize: 58, letterSpacing: -4 }}>cookie<span style={{ fontSize: 20, letterSpacing: 0, marginLeft: 24 }}>by Core Initiative</span></div>
      <div style={{ display: "flex", flexDirection: "column", width: 820, marginTop: -10 }}>
        <div style={{ fontSize: 94, lineHeight: 1.1, letterSpacing: -5 }}>{copy.hero.line}</div>
        <div style={{ fontFamily: "Fraunces", fontStyle: "italic", fontSize: 114, lineHeight: 1.1, letterSpacing: -5, color: "#a5233c" }}>{copy.hero.emphasis}</div>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #cfacb0", paddingTop: 22, justifyContent: "space-between", fontSize: 19 }}><span>{copy.hero.eyebrow}</span><span>cookie.coreinitiative.nl</span></div>
      <div style={{ display: "flex", position: "absolute", width: 240, height: 240, left: 900, top: 205, background: "#edc3cb", borderRadius: 120, transform: "rotate(-12deg)", alignItems: "center", justifyContent: "center" }}>
        <svg width="160" height="160" viewBox="0 0 100 100">{[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="50" cy="29" rx="13" ry="22" transform={`rotate(${angle} 50 50)`} fill="#a5233c" />)}<circle cx="50" cy="50" r="9" fill="#edc3cb" /></svg>
      </div>
    </div>,
    { ...size, fonts: [{ name: "DM Sans", data: body, weight: 500 }, { name: "Fraunces", data: display, style: "italic", weight: 500 }] },
  );
}
