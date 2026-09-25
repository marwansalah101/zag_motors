import { cn } from "@/lib/links";

type Props = {
  id: string;
  /** Small tracked label drawn above the title, in gold. */
  kicker?: string;
  title: React.ReactNode;
  intro?: string;
  /** Right-hand (end-side) content: counts, links. */
  aside?: React.ReactNode;
  /** Fine print under the rule. */
  note?: React.ReactNode;
  className?: string;
};

/** A section's ruled header: title and intro at the start, fields at the end, one hairline under both. */
export function SectionHeader({ id, kicker, title, intro, aside, note, className }: Props) {
  return (
    <header className={className}>
      <div className="flex flex-col gap-8 pb-8 md:flex-row md:items-end md:justify-between md:gap-12">
        <div className="max-w-[46rem]">
          {kicker && (
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-gold ar:text-[0.8125rem] ar:tracking-[0.04em]">
              {kicker}
            </p>
          )}
          <h2
            id={id}
            className="font-display text-[clamp(2rem,1.25rem+2.8vw,3.625rem)] font-semibold leading-[1.02] tracking-[-0.035em] ar:font-bold ar:leading-[1.3] ar:tracking-normal"
          >
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-bone/70 sm:text-lg">{intro}</p>}
        </div>
        {aside}
      </div>
      <span aria-hidden="true" className="draw-rule block h-px bg-gold/35" />
      {note && <div className={cn("pt-4")}>{note}</div>}
    </header>
  );
}
