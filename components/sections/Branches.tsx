"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { MediaImage } from "@/components/media/MediaImage";
import { SlotPlaceholder } from "@/components/media/SlotPlaceholder";
import { branches } from "@/data/media";
import { useI18n } from "@/lib/i18n";
import { mapsHref } from "@/lib/links";

export function Branches() {
  const { t } = useI18n();

  return (
    <section id="branches" aria-labelledby="branches-title" className="border-t border-gold/15 py-[clamp(4rem,8vw,6.5rem)]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <h2
          id="branches-title"
          className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl ar:font-bold ar:tracking-normal"
        >
          {t.branches.title}
        </h2>
        <span aria-hidden="true" className="draw-rule mt-5 block h-px bg-gold/30" />

        <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
          {branches.map((branch) => {
            const item = t.branches.items[branch.slug];
            const file = `branches/${branch.slug}.jpg`;
            return (
              <li key={branch.slug} className="placard flex flex-col">
                <div className="relative aspect-[16/7] overflow-hidden md:aspect-[16/9]">
                  <MediaImage
                    src={`/${file}`}
                    alt={item.name}
                    placeholder={
                      <SlotPlaceholder
                        label={t.slots.image(branch.slug)}
                        path={`public/${file}`}
                        alt={item.name}
                        size="sm"
                      />
                    }
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5 p-4 sm:p-5">
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] ar:tracking-normal">{item.name}</h3>
                  <p className="text-sm leading-snug text-bone/65">{item.address}</p>
                  <a
                    href={mapsHref(branch.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-auto inline-flex items-center gap-1.5 self-start pt-3 text-sm font-semibold text-gold underline decoration-gold/40 hover:decoration-gold"
                  >
                    {t.branches.openMaps}
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-(--ease-out-expo) group-hover:-translate-y-0.5 rtl:-scale-x-100"
                    />
                    <span className="sr-only">{`${item.name} ${t.a11y.opensInNewTab}`}</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
