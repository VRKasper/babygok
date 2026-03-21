export const locales = ["nl", "en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
  fr: "Français",
};
