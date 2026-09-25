import { ZGlyph } from "@/components/ZGlyph";
import { cn } from "@/lib/links";

type Props = {
  /** Visible label, e.g. "Image slot: golf-cars". */
  label: string;
  /** Where the owner drops the file, shown under the label. */
  path: string;
  /** Accessible description of what will fill this slot; empty for decorative slots. */
  alt: string;
  size?: "sm" | "md" | "lg";
  /** Label placement, chosen so it never sits under content laid over the slot. */
  align?: "top" | "bottom";
  side?: "start" | "end";
  /** Replaces the ghost Z on large slots (e.g. a lot numeral). */
  mark?: React.ReactNode;
  glyphClassName?: string;
  className?: string;
};

/**
 * The finished stand-in for any missing photo or video: a dark hatched plate
 * with registration corners, naming exactly which file belongs here.
 */
export function SlotPlaceholder({
  label,
  path,
  alt,
  size = "md",
  align = "bottom",
  side = "start",
  mark,
  glyphClassName,
  className,
}: Props) {
  const atEnd = side === "end";

  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={cn(
        "slot-surface reg-corners absolute inset-0 flex flex-col",
        align === "bottom" ? "justify-end" : "justify-start",
        atEnd && "items-end",
        className,
      )}
      style={{ "--reg-color": "color-mix(in oklab, var(--color-gold) 70%, transparent)" } as React.CSSProperties}
    >
      {mark && size === "lg" ? (
        <span
          aria-hidden="true"
          className={cn("absolute top-1/2 -translate-y-1/2", atEnd ? "end-[7%]" : "start-[7%]", glyphClassName)}
        >
          {mark}
        </span>
      ) : (
        <ZGlyph
          className={cn(
            "absolute text-gold/20",
            size === "lg" && ["top-1/2 size-[clamp(5rem,14vw,11rem)] -translate-y-1/2", atEnd ? "end-[8%]" : "start-[8%]"],
            size === "md" && ["size-14", atEnd ? "start-6" : "end-6", align === "bottom" ? "top-6" : "bottom-6"],
            size === "sm" && ["size-7", atEnd ? "start-3" : "end-3", align === "bottom" ? "top-3" : "bottom-3"],
            glyphClassName,
          )}
        />
      )}
      <div
        aria-hidden="true"
        className={cn("flex max-w-full flex-col gap-1.5", atEnd && "items-end text-end", size === "sm" ? "p-3" : "p-5 sm:p-6")}
      >
        <span className={cn("font-medium text-bone/85", size === "sm" ? "text-xs" : "text-sm")}>{label}</span>
        <span className="block max-w-full truncate text-start font-mono text-[0.6875rem] text-muted">
          <bdi dir="ltr">{path}</bdi>
        </span>
      </div>
    </div>
  );
}
