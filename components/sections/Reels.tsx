"use client";

import { useCallback, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
} from "@phosphor-icons/react";

import { MediaImage } from "@/components/media/MediaImage";
import { SlotPlaceholder } from "@/components/media/SlotPlaceholder";
import { reels, type Reel } from "@/data/media";
import { site, type SocialKey } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/links";
import { useReducedMotion } from "@/lib/useReducedMotion";

const socialIcons = {
  instagram: InstagramLogo,
  tiktok: TiktokLogo,
  facebook: FacebookLogo,
} as const;

/**
 * Files inside Next.js /public are served from the site root.
 * These all resolve correctly:
 *   /reels/reel-1.mp4
 *   reels/reel-1.mp4
 *   public/reels/reel-1.mp4
 *   /public/reels/reel-1.mp4
 */
function publicAssetPath(src: string) {
  let value = src.trim();

  if (value.startsWith("/public/")) value = value.slice("/public".length);
  if (value.startsWith("public/")) value = value.slice("public".length);
  if (!value.startsWith("/")) value = `/${value}`;

  return value;
}

function playMuted(video: HTMLVideoElement, slug: string) {
  video.muted = true;
  void video.play().catch((error) => {
    console.warn("Autoplay was blocked for local reel video", {
      slug,
      src: video.currentSrc,
      error,
    });
  });
}

export function Reels() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="reels-title"
      className="border-t border-gold/15 py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-16 xl:gap-24">
          <div className="w-full lg:order-2 lg:w-auto lg:max-w-[26rem]">
            <h2
              id="reels-title"
              className="font-display text-[clamp(2rem,1.25rem+2.8vw,3.625rem)] font-semibold leading-[1.02] tracking-[-0.035em] ar:font-bold ar:leading-[1.3] ar:tracking-normal"
            >
              {t.reels.title}
            </h2>

            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-bone/70 sm:text-lg">
              {t.reels.intro}
            </p>

            <span
              aria-hidden="true"
              className="draw-rule mt-6 block h-px bg-gold/35"
            />

            <div className="mt-6">
              <SocialCounts />
            </div>
          </div>

          <div className="lg:order-1">
            <ReelStack reels={reels} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialCounts() {
  const { t, formatNumber } = useI18n();
  const order: SocialKey[] = ["instagram", "tiktok", "facebook"];

  return (
    <ul className="grid shrink-0 grid-cols-3 divide-x divide-gold/20 border-y border-gold/20">
      {order.map((key) => {
        const social = site.socials[key];
        const Icon = socialIcons[key];

        return (
          <li key={key}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-2 px-3 py-4 transition-colors hover:bg-ink-2 sm:px-5"
            >
              {/* Phones: a third of the screen can't fit icon and label side by side. */}
              <span className="flex items-center gap-2 text-muted transition-colors group-hover:text-gold max-sm:flex-col max-sm:items-start max-sm:gap-1.5">
                <Icon size={16} aria-hidden="true" />
                <span className="field-label text-inherit">{social.label}</span>
              </span>

              <span className="font-display text-xl font-semibold tabular-nums tracking-[-0.02em] text-bone sm:text-2xl ar:tracking-normal">
                {formatNumber(social.followers, {
                  notation: "compact",
                  maximumFractionDigits: 1,
                })}
              </span>

              <span className="text-xs text-muted">{t.reels.followers}</span>
              <span className="sr-only">{t.a11y.opensInNewTab}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** How each stack slot sits behind the front card. */
const STACK_SLOTS = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, z: 40 },
  { x: 16, y: -20, rotate: 3, scale: 0.93, opacity: 0.55, z: 30 },
  { x: -18, y: -38, rotate: -4, scale: 0.86, opacity: 0.32, z: 20 },
  { x: 22, y: -54, rotate: 5, scale: 0.79, opacity: 0.16, z: 10 },
] as const;

function ReelStack({ reels }: { reels: Reel[] }) {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const count = reels.length;

  if (count === 0) return null;

  const go = (direction: 1 | -1) => {
    setActive((current) => (current + direction + count) % count);
  };

  return (
    <div className="flex flex-col items-center gap-8 sm:gap-10">
      <div className="relative aspect-9/16 w-[min(19rem,70vw)] sm:w-80 lg:w-88 xl:w-96">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-12 -z-10 bg-gold/[0.07] blur-[90px]"
        />

        {reels.map((reel, index) => (
          <StackCard
            key={reel.slug}
            reel={reel}
            position={(index - active + count) % count}
            reduced={reduced}
          />
        ))}
      </div>

      <div className="flex items-center gap-6">
        <span className="font-display text-sm font-semibold tabular-nums tracking-[-0.01em] text-gold">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label={t.reels.previous}
            onClick={() => go(-1)}
            className="flex size-11 items-center justify-center border border-gold/35 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
          >
            <ArrowLeft size={19} weight="bold" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={t.reels.next}
            onClick={() => go(1)}
            className="flex size-11 items-center justify-center border border-gold/35 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
          >
            <ArrowRight size={19} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StackCard({
  reel,
  position,
  reduced,
}: {
  reel: Reel;
  position: number;
  reduced: boolean;
}) {
  const { t, pick } = useI18n();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const isActive = position === 0;
  const caption = reel.caption ? pick(reel.caption) : null;
  const slot = STACK_SLOTS[Math.min(position, STACK_SLOTS.length - 1)];
  const videoSrc = publicAssetPath(reel.src);

  // The front video is in the prerendered HTML, so it can load (or fail)
  // before React hydrates and attaches onLoadedData/onCanPlay/onError.
  // Catch up from the element's own state when React attaches it.
  const syncVideo = useCallback(
    (video: HTMLVideoElement | null) => {
      if (!video) return;
      if (video.error) return setFailed(true);
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setReady(true);
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) playMuted(video, reel.slug);
    },
    [reel.slug],
  );

  const placeholder = (
    <SlotPlaceholder
      label={t.slots.reel(reel.slug)}
      path={`public${videoSrc}`}
      alt=""
      size="sm"
      align="top"
    />
  );

  const content = (
    <>
      <span className="absolute inset-0 overflow-hidden bg-ink">
        {reel.poster ? (
          <MediaImage
            src={publicAssetPath(reel.poster)}
            alt=""
            placeholder={placeholder}
          />
        ) : (
          placeholder
        )}

        {/*
          These are downloaded/local MP4 files in /public/reels, not embedded
          Instagram reels. Only the front card mounts a video element.
        */}
        {isActive && !failed && (
          <video
            key={videoSrc}
            ref={syncVideo}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onLoadedData={() => setReady(true)}
            onCanPlay={(event) => playMuted(event.currentTarget, reel.slug)}
            onError={(event) => {
              const video = event.currentTarget;

              console.error("Local reel video failed to load", {
                slug: reel.slug,
                configuredSrc: reel.src,
                resolvedSrc: videoSrc,
                currentSrc: video.currentSrc,
                errorCode: video.error?.code,
                errorMessage: video.error?.message,
                networkState: video.networkState,
                readyState: video.readyState,
              });

              setFailed(true);
            }}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
              ready ? "opacity-100" : "opacity-0",
            )}
          />
        )}
      </span>

      {isActive ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink via-ink/60 to-transparent"
          />

          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4">
            {caption && (
              <span className="text-sm font-medium leading-snug text-bone">
                {caption}
              </span>
            )}

            <span className="flex items-center gap-1.5 text-xs font-semibold text-gold">
              <InstagramLogo size={14} aria-hidden="true" />
              {t.reels.watch}
              <ArrowUpRight
                size={12}
                weight="bold"
                aria-hidden="true"
                className="rtl:-scale-x-100"
              />
            </span>
          </span>
        </>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ink/55"
        />
      )}
    </>
  );

  const style: React.CSSProperties = {
    transform: `translate(${slot.x}px, ${slot.y}px) rotate(${slot.rotate}deg) scale(${slot.scale})`,
    opacity: slot.opacity,
    zIndex: slot.z,
  };

  const className = cn(
    "placard reg-corners absolute inset-0 overflow-hidden",
    !reduced &&
      "transition-[transform,opacity] duration-500 ease-(--ease-out-quart)",
    !isActive && "pointer-events-none",
  );

  if (isActive && reel.href) {
    return (
      <a
        href={reel.href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        className={className}
        aria-label={caption ? `${caption}. ${t.reels.watch}` : t.reels.watch}
      >
        {content}
      </a>
    );
  }

  return (
    <div aria-hidden={!isActive} style={style} className={className}>
      {content}
    </div>
  );
}
