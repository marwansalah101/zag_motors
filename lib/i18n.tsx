"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { copy, numberLocale, type Copy, type Locale, type Localized } from "@/i18n/copy";
import { LOCALE_STORAGE_KEY } from "@/lib/locale-boot";

/*
 * The chosen language lives in a tiny external store so the server render
 * (always English) and the first client render agree, and the stored choice
 * applies right after hydration without a setState-in-effect round trip.
 */
const listeners = new Set<() => void>();
let current: Locale | null = null;

function readStored(): Locale {
  if (current) return current;
  try {
    current = window.localStorage.getItem(LOCALE_STORAGE_KEY) === "ar" ? "ar" : "en";
  } catch {
    current = "en";
  }
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function writeLocale(next: Locale) {
  current = next;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  } catch {
    // Private mode or blocked storage: the choice still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

type I18nValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Copy;
  pick: (value: Localized) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  setLocale: (next: Locale) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(subscribe, readStored, () => "en");
  const dir = locale === "ar" ? "rtl" : "ltr";

  // Mirror the language onto <html> so CSS, fonts and the browser follow it.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
    root.classList.remove("i18n-pending");
    document.title = copy[locale].meta.title;
  }, [locale, dir]);

  const setLocale = useCallback((next: Locale) => writeLocale(next), []);

  const value = useMemo<I18nValue>(() => {
    const formatter = (options?: Intl.NumberFormatOptions) => new Intl.NumberFormat(numberLocale[locale], options);
    return {
      locale,
      dir,
      t: copy[locale],
      pick: (v) => v[locale],
      formatNumber: (n, options) => formatter(options).format(n),
      setLocale,
    };
  }, [locale, dir, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
