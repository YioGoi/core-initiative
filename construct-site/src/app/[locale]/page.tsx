import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale, locales } from "@core-initiative/common/config";
import { site } from "@/config/site";
import { content } from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return {
    metadataBase: new URL(site.origin),
    title: site.name,
    description: content[locale].introduction,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((language) => [language, `/${language}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <h1>{site.name}</h1>
      <p>{content[locale].introduction}</p>
    </main>
  );
}
