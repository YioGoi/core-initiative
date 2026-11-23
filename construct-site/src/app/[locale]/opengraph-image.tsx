import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { isLocale } from "@core-initiative/common/config";
import { content } from "@/lib/content";

export const dynamic = "force-static";
export const alt = "Construct by Core Initiative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const displayFont = readFile(join(process.cwd(), "src/app/fonts/BarlowCondensed-SemiBold.ttf"));

export default async function ShareImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = content[locale];
  const display = await displayFont;
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#eef1f4", color: "#172c44", padding: "60px 70px", flexDirection: "column", justifyContent: "space-between", fontFamily: "Barlow", fontWeight: 600 }}>
      <div style={{ display: "flex", fontSize: 22 }}>Construct / by Core Initiative</div>
      <div style={{ display: "flex", flexDirection: "column", width: 760 }}>
        <div style={{ display: "flex", fontFamily: "Barlow", fontWeight: 600, fontSize: 132, lineHeight: 1 }}>Construct</div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 24, fontFamily: "Barlow", fontWeight: 600, fontSize: 60, lineHeight: 1.08 }}>
          {copy.hero.title.map((line) => <span key={line}>{line}</span>)}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 21, color: "#52667c" }}>{copy.hero.eyebrow}</div>
      <div style={{ position: "absolute", display: "flex", left: 905, top: 186, width: 160, height: 160, border: "2px solid #172c44", transform: "rotate(-8deg)" }} />
      <div style={{ position: "absolute", display: "flex", left: 936, top: 219, width: 160, height: 160, border: "2px solid #345ad8", background: "#eef1f4", transform: "rotate(-8deg)" }} />
      <div style={{ position: "absolute", display: "flex", left: 70, right: 70, bottom: 36, height: 1, background: "#b9c7d7" }} />
    </div>,
    { ...size, fonts: [{ name: "Barlow", data: display, weight: 600 }] },
  );
}
