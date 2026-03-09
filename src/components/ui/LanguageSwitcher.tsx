"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-1.5 rounded-full border border-charcoal/10 bg-warm-white/80 px-3 py-1.5 text-sm font-medium text-charcoal backdrop-blur-sm transition-colors hover:bg-cream-dark">
        <span className="text-base leading-none">
          {locale === "nl" ? "🇳🇱" : locale === "en" ? "🇬🇧" : "🇫🇷"}
        </span>
        <span>{localeNames[locale]}</span>
      </MenuButton>
      <MenuItems className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-xl border border-charcoal/5 bg-warm-white p-1 shadow-xl">
        {locales.map((l) => (
          <MenuItem key={l}>
            <button
              onClick={() => handleChange(l)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors data-[focus]:bg-cream-dark ${
                l === locale ? "font-semibold text-sage-dark" : "text-charcoal"
              }`}
            >
              <span className="text-base leading-none">
                {l === "nl" ? "🇳🇱" : l === "en" ? "🇬🇧" : "🇫🇷"}
              </span>
              {localeNames[l]}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
