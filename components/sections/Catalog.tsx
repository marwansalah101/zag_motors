"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/SectionHeader";
import { ZGlyph } from "@/components/ZGlyph";
import { MediaImage } from "@/components/media/MediaImage";
import { SlotPlaceholder } from "@/components/media/SlotPlaceholder";
import { brands } from "@/data/brands";
import { catalog, type CatalogCategory } from "@/data/catalog";
import { useI18n } from "@/lib/i18n";
import { cn, whatsappHref } from "@/lib/links";

export function Catalog() {
  const { t } = useI18n();

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="py-[clamp(5rem,10vw,9rem)]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <SectionHeader
          id="catalog-title"
          title={t.catalog.title}
          intro={t.catalog.intro}
          aside={
            <p className="field-label flex shrink-0 items-center gap-3 text-bone/70">
              <span>{t.catalog.categories(catalog.length)}</span>
              <ZGlyph className="size-2.5 text-gold" />
              <span>{t.brands.count(brands.length)}</span>
            </p>
          }
          note={
            <p className="flex items-center gap-2.5 text-xs text-muted ar:text-[0.8125rem]">
              <span aria-hidden="true" className="pending-field inline-block h-3.5 w-6 shrink-0" />
              {t.catalog.legend}
            </p>
          }
        />

        <ol className="mt-14 lg:mt-20">
          {catalog.map((category, index) => (
            <li key={category.slug} id={category.slug}>
              <CatalogRow category={category} index={index} />
              {index < catalog.length - 1 && <ZigConnector fromEnd={index % 2 === 0} />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * One category: a registered 4:3 plate and its placard. Rows alternate sides;
 * on large screens the placard overlaps the plate by one column and runs the
 * full height of the row so the zig-zag rule can meet its corners.
 */
function CatalogRow({ category, index }: { category: CatalogCategory; index: number }) {
  const { t, pick } = useI18n();
  const placardAtEnd = index % 2 === 0;
  const title = pick(category.title);
  const file = category.image ?? `vehicles/${category.slug}.jpg`;

  return (
    <article
      aria-labelledby={`${category.slug}-title`}
      className="grid grid-cols-1 lg:min-h-[clamp(32rem,40vw,38rem)] lg:grid-cols-12"
    >
      <div
        className={cn(
          "relative overflow-hidden lg:row-start-1 lg:aspect-auto",
          !category.imageAspect && "aspect-[4/3]",
          category.imageAspect === "square" && "aspect-square",
          category.imageAspect === "portrait" && "aspect-[3/4]",
          placardAtEnd ? "lg:col-[1/9]" : "lg:col-[5/13]",
        )}
      >
        <MediaImage
          src={`/${file}`}
          alt={title}
          className={cn(category.imageFlip && "-scale-x-100")}
          style={{ objectPosition: category.imagePosition }}
          placeholder={
            <SlotPlaceholder
              label={t.slots.image(category.slug)}
              path={`public/${file}`}
              alt={title}
              size="lg"
              align="top"
              side={placardAtEnd ? "start" : "end"}
              mark={<PlateNumeral index={index} />}
            />
          }
        />
      </div>

      <Placard
        category={category}
        index={index}
        className={cn(
          "relative z-10 -mt-12 mx-3 sm:mx-8 lg:row-start-1 lg:m-0",
          placardAtEnd ? "lg:col-[8/13]" : "lg:col-[1/6]",
        )}
      />
    </article>
  );
}

function Placard({ category, index, className }: { category: CatalogCategory; index: number; className?: string }) {
  const { t, pick } = useI18n();
  const title = pick(category.title);
  const lot = lotCode(index);

  return (
    <div className={cn("placard flex flex-col p-6 sm:p-8 xl:p-10", className)}>
      <h3
        id={`${category.slug}-title`}
        className="font-display text-[clamp(1.625rem,1.2rem+1.3vw,2.375rem)] font-semibold leading-[1.06] tracking-[-0.03em] ar:font-bold ar:leading-[1.35] ar:tracking-normal"
      >
        {title}
      </h3>
      <span aria-hidden="true" className="draw-rule mt-6 block h-px bg-gold/25" />
      <p className="mt-5 max-w-[46ch] text-[0.96875rem] leading-relaxed text-bone/70">{pick(category.description)}</p>

      <dl className="mt-8 flex flex-col gap-3.5 lg:mt-auto lg:pt-8">
        <div className="field-row field-in" style={{ "--i": 0 } as React.CSSProperties}>
          <dt className="field-label">{t.catalog.lot}</dt>
          <dd lang="en" className="font-latin-display text-sm font-medium tabular-nums text-gold">
            {lot}
          </dd>
        </div>

        <div className="field-row field-in" style={{ "--i": 1 } as React.CSSProperties}>
          <dt className="field-label">{t.catalog.brands}</dt>
          <dd className="flex flex-wrap justify-end gap-1.5">
            {category.brands.length === 0 ? (
              <Pending label={t.catalog.brandsPending} />
            ) : (
              category.brands.map((brand) => (
                <span
                  key={brand.name}
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em]",
                    brand.confirmed ? "border border-gold/55 text-bone" : "pending-field",
                  )}
                >
                  <span lang="en" className="font-latin-display">
                    {brand.name}
                  </span>
                  {!brand.confirmed && <span className="sr-only">{` ${t.a11y.unconfirmed}`}</span>}
                </span>
              ))
            )}
          </dd>
        </div>

        {category.specs.map((spec, specIndex) => (
          <div
            key={spec.label.en}
            className="field-row field-in"
            style={{ "--i": specIndex + 2 } as React.CSSProperties}
          >
            <dt className="field-label">{pick(spec.label)}</dt>
            <dd className="flex items-baseline justify-end gap-2 text-sm text-bone">
              {spec.value ? (
                <>
                  <bdi className="tabular-nums">{pick(spec.value)}</bdi>
                  {spec.note && (
                    <bdi lang="en" className="text-xs text-muted">
                      {spec.note}
                    </bdi>
                  )}
                </>
              ) : (
                <Pending label={t.catalog.toConfirm} />
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <a
          href={whatsappHref(t.whatsapp.about(title))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-line w-full sm:w-auto"
        >
          <WhatsappLogo size={18} aria-hidden="true" />
          {t.catalog.ask}
        </a>
      </div>
    </div>
  );
}

function Pending({ label }: { label: string }) {
  return <span className="pending-field inline-block px-2 py-0.5 text-xs ar:text-[0.8125rem]">{label}</span>;
}

/** Lot codes are identifiers, like a plate number: "01" in both languages. */
function lotCode(index: number) {
  return String(index + 1).padStart(2, "0");
}

/** Lot number set at plate scale on an empty vehicle plate, so no two placeholders read alike. */
function PlateNumeral({ index }: { index: number }) {
  return (
    <span
      lang="en"
      className="block font-latin-display text-[clamp(6.5rem,17vw,14rem)] font-semibold leading-none tracking-[-0.04em] text-ink-2 [-webkit-text-stroke:2px_color-mix(in_oklab,var(--color-gold)_42%,transparent)] [paint-order:stroke_fill]"
    >
      {lotCode(index)}
    </span>
  );
}

/*
 * The ZAG line. Each gap between rows carries one diagonal, so the placards'
 * edges and the diagonals trace a running Z down the catalog.
 * - Large screens: inner corner of one placard to the inner corner of the next
 *   (placards sit in columns 8-12 / 1-5, so both ends are 5/12 in from an edge).
 * - Phones: bottom outer corner of the inset placard to the far top corner of
 *   the next full-width plate.
 * The box is placed with logical insets and the drawing is mirrored for RTL.
 */
function ZigConnector({ fromEnd }: { fromEnd: boolean }) {
  return (
    <div aria-hidden="true" className="relative h-20 sm:h-24 lg:h-[clamp(7rem,11vw,10rem)]">
      <div
        className={cn(
          "absolute inset-y-0 lg:start-[41.6667%] lg:end-[41.6667%]",
          fromEnd ? "start-0 end-3 sm:end-8" : "start-3 end-0 sm:start-8",
        )}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="zig-line absolute inset-0 size-full overflow-visible text-gold/70 rtl:-scale-x-100"
        >
          <line
            x1={fromEnd ? 100 : 0}
            y1={0}
            x2={fromEnd ? 0 : 100}
            y2={100}
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          className={cn(
            "zig-node absolute -top-[3.5px] size-[7px] rotate-45 bg-gold",
            fromEnd ? "-end-[3.5px]" : "-start-[3.5px]",
          )}
        />
        <span
          className={cn(
            "zig-node zig-node-end absolute -bottom-[3.5px] size-[7px] rotate-45 bg-gold",
            fromEnd ? "-start-[3.5px]" : "-end-[3.5px]",
          )}
        />
      </div>
    </div>
  );
}
