"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, InstagramLogo, Pause, Play } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/SectionHeader";
import { MediaImage } from "@/components/media/MediaImage";
import { SlotPlaceholder } from "@/components/media/SlotPlaceholder";
import { sold, soldHighlightUrl, type SoldItem } from "@/data/media";
import { useI18n } from "@/lib/i18n";

export function Sold() {
  const { t } = useI18n();

  return (
    <section id="sold" aria-labelledby="sold-title" className="border-t border-gold/15 py-[clamp(5rem,10vw,9rem)]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <SectionHeader
          id="sold-title"
          kicker={t.sold.kicker}
          title={<HighlightedTitle title={t.sold.title} highlight={t.sold.titleHighlight} />}
          intro={t.sold.intro}
          aside={
            <a
              href={soldHighlightUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line self-start"
            >
              <InstagramLogo size={18} aria-hidden="true" />
              {t.sold.viewHighlight}
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" className="rtl:-scale-x-100" />
              <span className="sr-only">{t.a11y.opensInNewTab}</span>
            </a>
          }
        />

        <ul className="sold-grid mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-5 lg:mt-14 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0 max-sm:-mx-4 max-sm:scroll-px-4 max-sm:px-4">
          {sold.map((item, index) => (
            <SoldVideo key={item.slug} item={item} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SoldVideo({ item, index }: { item: SoldItem; index: number }) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      if (failed) {
        setFailed(false);
        video.load();
      }
      video.play().catch(() => {
        setPlaying(false);
        setFailed(true);
      });
    } else {
      video.pause();
    }
  };

  return (
    <li className="sold-plate w-[min(72vw,17rem)] shrink-0 snap-start sm:w-[15rem] lg:w-auto">
      <figure>
        <div className="placard group relative aspect-9/16 overflow-hidden">
          <MediaImage
            src={item.poster}
            alt=""
            placeholder={
              <SlotPlaceholder
                label={t.slots.reel(item.slug)}
                path={`public${item.poster}`}
                alt={t.sold.videoLabel(number)}
                size="sm"
              />
            }
          />
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            aria-label={t.sold.videoLabel(number)}
            playsInline
            preload="none"
            onLoadedData={() => setReady(true)}
            onError={() => {
              setReady(false);
              setFailed(true);
              setPlaying(false);
            }}
            onPlaying={() => {
              setReady(true);
              setFailed(false);
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onClick={togglePlayback}
            className={`absolute inset-0 size-full cursor-pointer object-cover transition-opacity duration-500 ${ready && !failed ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            {t.sold.videoUnsupported}
          </video>
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? t.sold.pauseVideo(number) : failed ? t.sold.retryVideo(number) : t.sold.playVideo(number)}
            aria-pressed={playing}
            className={`absolute inset-0 z-10 m-auto flex h-9 w-fit min-w-25 items-center justify-center gap-2 -rotate-6 bg-ink/75 px-3 text-xs font-bold uppercase tracking-[0.18em] text-gold shadow-[inset_0_0_0_1.5px_var(--color-gold),inset_0_0_0_3.5px_color-mix(in_oklab,var(--color-ink)_75%,transparent),inset_0_0_0_4.5px_var(--color-gold)] backdrop-blur-[2px] transition-[background-color,color,opacity,transform] duration-200 hover:rotate-0 hover:bg-gold hover:text-ink focus-visible:rotate-0 focus-visible:bg-gold focus-visible:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ink active:scale-95 rtl:rotate-6 rtl:hover:rotate-0 rtl:focus-visible:rotate-0 ar:tracking-normal ${playing ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" : "opacity-100"}`}
          >
            {playing ? <Pause size={14} weight="fill" aria-hidden="true" /> : <Play size={15} weight="fill" aria-hidden="true" />}
            <span className="font-latin-display ar:font-[inherit]">{playing ? t.sold.pause : failed ? t.sold.retry : t.sold.play}</span>
          </button>
          <SoldStamp label={t.sold.stamp} />
        </div>
        <figcaption className="mt-3 flex items-center justify-between gap-3">
          <span className="font-display text-sm font-medium text-bone ar:font-sans">{t.sold.videoLabel(number)}</span>
          <span className="font-display text-xs tabular-nums text-gold" aria-hidden="true">{number}</span>
        </figcaption>
      </figure>
    </li>
  );
}

/** Renders a section title with one word picked out in gold, topped with a small summer mark. */
function HighlightedTitle({ title, highlight }: { title: string; highlight: string }) {
  const index = title.indexOf(highlight);
  if (index === -1) return <>{title}</>;

  const before = title.slice(0, index);
  const after = title.slice(index + highlight.length);

  return (
    <>
      {before}
      <span className="relative inline-block text-gold">
        <SunSurfMark
          aria-hidden="true"
          className="pointer-events-none absolute -top-[0.55em] left-1/2 h-[0.42em] w-[1.05em] -translate-x-1/2 -rotate-3 text-gold/70 rtl:rotate-3"
        />
        {highlight}
      </span>
      {after}
    </>
  );
}

/** A tiny sun-over-surf mark — the section's one nod to summer, set above "Sahel". */
function SunSurfMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 16" fill="none" {...props}>
      <path
        d="M20 1v2.6M15.3 3.3l1.9 1.9M24.7 3.3l-1.9 1.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="20" cy="8.4" r="2.3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2 13.5c3-2.4 6-2.4 9 0s6 2.4 9 0 6-2.4 9 0 6 2.4 9 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A dealer's rubber stamp: gold double rule, set slightly off square. */
function SoldStamp({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute start-3 top-3 -rotate-6 bg-ink/75 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-gold shadow-[inset_0_0_0_1.5px_var(--color-gold),inset_0_0_0_3.5px_color-mix(in_oklab,var(--color-ink)_75%,transparent),inset_0_0_0_4.5px_var(--color-gold)] backdrop-blur-[2px] sm:start-4 sm:top-4 sm:px-3 sm:py-1.5 rtl:rotate-6 ar:text-[0.8125rem] ar:tracking-normal"
    >
      <span className="font-latin-display ar:font-[inherit]">{label}</span>
    </span>
  );
}
