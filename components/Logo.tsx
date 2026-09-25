import { BrandMark } from "@/components/BrandMark";
import { site } from "@/data/site";
import { cn } from "@/lib/links";

type Props = {
  size?: "header" | "hero" | "footer";
  variant?: "mark" | "lockup";
  className?: string;
};

const sizes = {
  header: {
    mark: "h-10 w-[2.85rem]",
    name: "text-2xl",
    motors: "text-[0.55rem] tracking-[0.42em]",
    gap: "gap-2.5",
  },
  hero: {
    mark: "h-[clamp(4.5rem,7vw,6rem)] w-[clamp(5.1rem,8vw,6.8rem)]",
    name: "text-[clamp(3.25rem,5.5vw,4.75rem)]",
    motors: "text-[clamp(0.7rem,1.15vw,1rem)] tracking-[0.46em]",
    gap: "gap-[clamp(0.75rem,2vw,1.5rem)]",
  },
  footer: {
    mark: "h-14 w-16",
    name: "text-3xl",
    motors: "text-[0.6875rem] tracking-[0.44em]",
    gap: "gap-3",
  },
} as const;

export function Logo({ size = "header", variant = "lockup", className }: Props) {
  const scale = sizes[size];

  return (
    <span
      lang="en"
      dir="ltr"
      role="img"
      aria-label={site.name}
      className={cn("inline-flex w-fit shrink-0 items-center", scale.gap, className)}
    >
      <BrandMark className={cn("shrink-0 text-gold", scale.mark)} />
      {variant === "lockup" && (
        <span aria-hidden="true" className="flex flex-col justify-center leading-none">
          <span className={cn("font-latin-display font-semibold tracking-[-0.055em] text-bone", scale.name)}>
            ZAG
          </span>
          <span className={cn("mt-[0.4em] font-latin-display font-medium text-gold", scale.motors)}>
            MOTORS
          </span>
        </span>
      )}
    </span>
  );
}
