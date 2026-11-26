import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@core-initiative/common/config";
import { site } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({ url: `${site.origin}/${locale}`, alternates: { languages: { ...Object.fromEntries(locales.map((language) => [language, `${site.origin}/${language}`])), "x-default": `${site.origin}/${defaultLocale}` } } }));
}
