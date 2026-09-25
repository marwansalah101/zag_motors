"use client";

import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { catalog } from "@/data/catalog";
import { useI18n } from "@/lib/i18n";
import { whatsappHref } from "@/lib/links";

const fieldClass =
  "mt-2 block min-h-12 w-full rounded-none border border-gold/25 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/45 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60";

export function Consultation() {
  const { t, pick } = useI18n();
  const c = t.consultation;

  return (
    <section id="consultation" aria-labelledby="consultation-title" className="border-t border-gold/15 bg-ink-2/45 py-[clamp(5rem,10vw,9rem)]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-24">
          <div className="lg:pt-8">
            <h2
              id="consultation-title"
              className="max-w-[12ch] font-display text-[clamp(2rem,1.25rem+2.8vw,3.625rem)] font-semibold leading-[1.05] tracking-[-0.035em] ar:font-bold ar:leading-[1.3] ar:tracking-normal"
            >
              {c.title}
            </h2>
            <span aria-hidden="true" className="mt-7 block h-px max-w-48 bg-gold/70" />
            <p className="mt-7 max-w-[42ch] text-base leading-relaxed text-bone/75 sm:text-lg">{c.intro}</p>
            <div className="mt-10 border-t border-gold/20 pt-6">
              <p className="text-sm text-bone/70">{c.whatsappPrompt}</p>
              <a
                href={whatsappHref(t.whatsapp.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold underline decoration-gold/50 hover:decoration-gold"
              >
                <WhatsappLogo size={18} aria-hidden="true" />
                {c.whatsappAction}
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                <span className="sr-only">{t.a11y.opensInNewTab}</span>
              </a>
            </div>
          </div>

          <form className="placard p-5 sm:p-8 lg:p-10" onSubmit={(event) => event.preventDefault()}>
            <h3 className="font-display text-lg font-semibold tracking-[-0.02em] sm:text-xl ar:tracking-normal">{c.formTitle}</h3>
            <div className="mt-6 h-px bg-gold/30" aria-hidden="true" />
            <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
              <label className="block">
                <span className="field-label text-bone/75">{c.name}</span>
                <input className={fieldClass} type="text" name="name" autoComplete="name" placeholder={c.namePlaceholder} />
              </label>
              <label className="block">
                <span className="field-label text-bone/75">{c.phone}</span>
                <input className={fieldClass} type="tel" name="phone" autoComplete="tel" dir="ltr" placeholder={c.phonePlaceholder} />
              </label>
              <label className="block">
                <span className="field-label text-bone/75">{c.interest}</span>
                <select className={fieldClass} name="interest" defaultValue="">
                  <option value="" disabled>{c.interestPlaceholder}</option>
                  {catalog.map((category) => <option key={category.slug} value={category.slug}>{pick(category.title)}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="field-label text-bone/75">{c.branch}</span>
                <select className={fieldClass} name="branch" defaultValue="">
                  <option value="" disabled>{c.branchPlaceholder}</option>
                  {Object.entries(t.branches.items).map(([slug, branch]) => <option key={slug} value={slug}>{branch.name}</option>)}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="field-label text-bone/75">{c.date}</span>
                <input className={`${fieldClass} [color-scheme:dark]`} type="date" name="date" />
              </label>
              <label className="block sm:col-span-2">
                <span className="field-label text-bone/75">{c.message}</span>
                <textarea className={`${fieldClass} min-h-28 resize-y`} name="message" rows={3} placeholder={c.messagePlaceholder} />
              </label>
            </div>
            <div className="mt-8 border-t border-gold/20 pt-7">
              <button type="submit" disabled className="btn btn-solid w-full cursor-not-allowed opacity-75 sm:w-auto">
                {c.submit}
              </button>
              <p className="mt-4 text-xs leading-relaxed text-bone/65 ar:text-sm">{c.preview}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
