"use client";

import { FacebookLogo, InstagramLogo, TiktokLogo } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import { site, type SocialKey } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { whatsappHref } from "@/lib/links";

const socialIcons = {
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  tiktok: TiktokLogo,
} as const;

export function Footer() {
  const { t } = useI18n();
  const order: SocialKey[] = ["instagram", "facebook", "tiktok"];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/25 bg-ink-2/60 pb-28 pt-16 md:pb-12 lg:pt-20">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-4">
          <a href="#top" aria-label={t.a11y.home} className="inline-block">
            <Logo size="footer" />
          </a>
          <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-muted">{t.hero.line}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5">
          <div>
            <p className="field-label">{t.footer.phone}</p>
            <p className="mt-3 select-all font-latin-display text-lg font-medium tabular-nums text-bone sm:text-xl">
              <bdi dir="ltr">{site.phone.display}</bdi>
            </p>
            <p className="mt-3 flex gap-5 text-sm font-semibold">
              <a href={`tel:${site.phone.tel}`} className="text-gold underline decoration-gold/40 hover:decoration-gold">
                {t.footer.call}
              </a>
              <a
                href={whatsappHref(t.whatsapp.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline decoration-gold/40 hover:decoration-gold"
              >
                {t.nav.whatsapp}
              </a>
            </p>
          </div>

          <div>
            <p className="field-label">{t.footer.email}</p>
            <p className="mt-3 select-all break-all text-base text-bone sm:text-lg">
              <bdi dir="ltr">{site.email}</bdi>
            </p>
            <p className="mt-3 text-sm font-semibold">
              <a href={`mailto:${site.email}`} className="text-gold underline decoration-gold/40 hover:decoration-gold">
                {t.footer.write}
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="field-label">{t.footer.follow}</p>
          <ul className="mt-3 flex flex-col">
            {order.map((key) => {
              const social = site.socials[key];
              const Icon = socialIcons[key];
              return (
                <li key={key} className="border-b border-gold/10 last:border-0">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-12 items-center gap-3 text-sm text-bone/85 transition-colors hover:text-gold"
                  >
                    <Icon size={18} aria-hidden="true" className="text-gold" />
                    <span>{social.label}</span>
                    <span dir="ltr" className="ms-auto text-xs text-muted group-hover:text-gold/80">
                      {social.handle}
                    </span>
                    <span className="sr-only">{t.a11y.opensInNewTab}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <p className="border-t border-gold/10 pt-6 text-xs text-muted">
          <bdi>{`© ${year} ${site.name}.`}</bdi> {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
