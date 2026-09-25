"use client";

import Image from "next/image";
import { brands, type Brand } from "@/data/brands";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/links";

export function BrandBand() {
  const { t } = useI18n();

  return (
    <section aria-label={t.a11y.brandsBand} className="border-b border-gold/15 py-9 sm:py-12">
      <div className="brand-carousel" dir="ltr">
        <div className="brand-carousel-track">
          {[0, 1, 2, 3].map((index) => <BrandList key={index} copy={index > 0} />)}
        </div>
      </div>
    </section>
  );
}

function BrandList({ copy = false }: { copy?: boolean }) {
  return (
    <ul className={cn("brand-carousel-list flex w-max shrink-0 gap-4 pe-4 sm:gap-5 sm:pe-5", copy && "brand-carousel-list--copy")} aria-hidden={copy || undefined}>
      {brands.map((brand) => <BrandSlide key={brand.name} brand={brand} />)}
    </ul>
  );
}

function BrandSlide({ brand }: { brand: Brand }) {
  return (
    <li className="brand-slide w-[clamp(10.25rem,28vw,13.75rem)] shrink-0">
      <div className="brand-plate reg-corners relative flex h-28 items-center justify-center border border-gold/30 bg-ink-2 px-4 sm:h-32">
        <span className="brand-logo-content flex w-full items-center justify-center">
          {brand.logo ? (
            <Image src={brand.logo} alt="" width={220} height={100} unoptimized className={cn("max-h-20 w-full object-contain", brand.name === "Fiat" && "invert")} />
          ) : (
            <span lang="en" className="font-latin-display text-lg font-semibold tracking-[-0.02em] text-bone">{brand.name}</span>
          )}
        </span>
      </div>
      <p lang="en" className="field-label mt-4 text-center text-bone/70">{brand.name}</p>
    </li>
  );
}
