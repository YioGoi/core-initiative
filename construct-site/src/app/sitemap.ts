import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@core-initiative/common/config";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: new URL(`/${locale}`, site.origin).href,
    alternates: { languages: { ...Object.fromEntries(locales.map((language) => [language, new URL(`/${language}`, site.origin).href])), "x-default": new URL(`/${defaultLocale}`, site.origin).href } },
  }));
}
