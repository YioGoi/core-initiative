export const locales = ["nl", "en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const languageNames: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
  tr: "Türkçe",
};

export const brands = {
  core: { name: "Core Initiative", origin: "https://coreinitiative.nl" },
  construct: { name: "Construct", origin: "https://construct.coreinitiative.nl" },
  cookie: { name: "Cookie", origin: "https://cookie.coreinitiative.nl" },
  tool: { name: "Tool", origin: "https://tool.coreinitiative.nl" },
  agent: { name: "Agent", origin: "https://agent.coreinitiative.nl" },
  reflection: { name: "Reflection", origin: "https://reflection.coreinitiative.nl" },
  spoon: { name: "Spoon", origin: "https://spoon.coreinitiative.nl" },
} as const;

export type BrandId = keyof typeof brands;
