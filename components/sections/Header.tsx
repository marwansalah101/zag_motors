"use client";

import { useEffect, useState } from "react";
import { List, WhatsappLogo, X } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import type { Locale } from "@/i18n/copy";
import { useI18n } from "@/lib/i18n";
import { cn, whatsappHref } from "@/lib/links";

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "#catalog", label: t.nav.catalog },
    { href: "#sold", label: t.nav.sold },
    { href: "#branches", label: t.nav.branches },
  ];

  return (
    <>
      <a
        href="#main"
        className="btn btn-solid fixed start-4 top-3 z-50 -translate-y-24 focus-visible:translate-y-0"
      >
        {t.a11y.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-gold/15 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-4 px-4 sm:px-6 lg:gap-8 lg:px-10">
          <a href="#top" aria-label={t.a11y.home} className="shrink-0" onClick={() => setOpen(false)}>
            <Logo variant="mark" />
          </a>

          <nav aria-label={t.a11y.primaryNav} className="ms-auto hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative py-2 text-sm text-bone/80 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 after:ease-(--ease-out-expo) hover:text-bone hover:after:scale-x-100 rtl:after:origin-right ar:text-[0.9375rem]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageToggle className="ms-auto md:ms-0" />

          <a
            href={whatsappHref(t.whatsapp.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line hidden min-h-10 px-4 md:inline-flex"
          >
            <WhatsappLogo size={18} weight="regular" aria-hidden="true" />
            {t.nav.whatsapp}
          </a>

          <button
            type="button"
            className="-me-2 inline-flex size-11 items-center justify-center text-bone md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
          </button>
        </div>

        <nav
          id="mobile-nav"
          aria-label={t.a11y.primaryNav}
          hidden={!open}
          className="border-t border-gold/15 bg-ink md:hidden"
        >
          <ul className="px-4 py-2">
            {links.map((link) => (
              <li key={link.href} className="border-b border-gold/10 last:border-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center font-display text-lg font-medium tracking-[-0.01em] ar:tracking-normal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}

function LanguageToggle({ className }: { className?: string }) {
  const { t, locale, setLocale } = useI18n();
  const options: Locale[] = ["en", "ar"];

  return (
    <div role="group" aria-label={t.a11y.language} className={cn("flex items-center border border-gold/30", className)}>
      {options.map((option) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            lang={option}
            aria-pressed={active}
            onClick={() => setLocale(option)}
            className={cn(
              "min-h-9 min-w-11 px-2.5 text-[0.8125rem] font-semibold transition-colors duration-200",
              option === "ar" ? "font-[family-name:var(--font-cairo)]" : "tracking-[0.08em]",
              active ? "bg-gold text-ink" : "text-bone/70 hover:text-bone",
            )}
          >
            {t.lang[option]}
          </button>
        );
      })}
    </div>
  );
}
