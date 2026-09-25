"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, WhatsappLogo } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import { MediaImage } from "@/components/media/MediaImage";
import { branches } from "@/data/media";
import { site } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { whatsappHref } from "@/lib/links";

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      // Phones: the hero is the whole first screen, content settled at the foot of the footage.
      className="relative isolate overflow-hidden border-b border-gold/15 max-sm:flex max-sm:min-h-[calc(100svh-4rem)] max-sm:flex-col"
    >
      <HeroMedia />

      {/* Dark overlay for text readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/35 to-ink/10 max-sm:via-ink/55"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-ink/75 via-ink/15 to-transparent rtl:bg-linear-to-l"
      />

      <div className="mx-auto max-w-[1320px] px-4 pb-12 pt-[clamp(9rem,22vw,17rem)] sm:px-6 sm:pb-16 lg:px-10 max-sm:flex max-sm:w-full max-sm:flex-1 max-sm:flex-col max-sm:justify-end max-sm:pb-9 max-sm:pt-24">
        <div className="max-w-[44rem]">
          <Logo size="hero" />

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(1.375rem,1rem+1.7vw,2.375rem)] font-medium leading-[1.18] tracking-[-0.02em] text-bone sm:mt-8 ar:font-extrabold ar:leading-[1.5] ar:tracking-normal"
          >
            {t.hero.line}
          </h1>

          {/* MobileWhatsApp watches this row and stays out of the way while it is on screen. */}
          <div data-hero-actions className="mt-8 flex flex-wrap gap-3 sm:mt-10 max-sm:flex-col">
            <a href="#catalog" className="btn btn-solid">
              {t.hero.browse}

              <ArrowDown
                size={16}
                weight="bold"
                aria-hidden="true"
              />
            </a>

            <a
              href={whatsappHref(t.whatsapp.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line"
            >
              <WhatsappLogo
                size={18}
                aria-hidden="true"
              />

              {t.hero.whatsapp}
            </a>
          </div>
        </div>
      </div>

      <BranchStrip />
    </section>
  );
}

const HERO_PLAYBACK_RATE = 0.55;

function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    /*
     * Setting muted/defaultMuted as properties is important
     * for reliable autoplay in Chrome/Safari.
     */
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playbackRate = HERO_PLAYBACK_RATE;

    const playVideo = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playbackRate = HERO_PLAYBACK_RATE;

        await video.play();

        console.log("Hero video playing", {
          src: video.currentSrc,
          duration: video.duration,
          readyState: video.readyState,
        });
      } catch (error) {
        console.warn("Hero autoplay was blocked:", error);
      }
    };

    /*
     * If the video is already ready, play immediately.
     * Otherwise wait until the browser can actually play it.
     */
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void playVideo();
    } else {
      video.addEventListener("canplay", playVideo, {
        once: true,
      });
    }

    /*
     * Some browsers/webviews may reject autoplay initially.
     * Any user interaction gives us another chance.
     */
    const retryPlayback = () => {
      if (video.paused) {
        void playVideo();
      }
    };

    window.addEventListener("pointerdown", retryPlayback, {
      passive: true,
    });

    window.addEventListener("touchstart", retryPlayback, {
      passive: true,
    });

    window.addEventListener("keydown", retryPlayback);

    return () => {
      video.removeEventListener("canplay", playVideo);

      window.removeEventListener(
        "pointerdown",
        retryPlayback,
      );

      window.removeEventListener(
        "touchstart",
        retryPlayback,
      );

      window.removeEventListener(
        "keydown",
        retryPlayback,
      );
    };
  }, []);

  /*
   * Only use the image manually if the actual video fails.
   * Otherwise let the <video> element handle its poster itself.
   */
  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
      >
        <MediaImage
          src={site.hero.poster}
          alt=""
          eager
          placeholder={<div className="absolute inset-0 bg-ink-2" />}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-20 overflow-hidden"
    >
      <video
        ref={videoRef}
        poster={site.hero.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover"
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;

          video.muted = true;
          video.defaultMuted = true;
          video.playbackRate = HERO_PLAYBACK_RATE;

          console.log("Hero video metadata loaded", {
            src: video.currentSrc,
            duration: video.duration,
            width: video.videoWidth,
            height: video.videoHeight,
          });
        }}
        onCanPlay={(event) => {
          const video = event.currentTarget;

          video.muted = true;
          video.defaultMuted = true;
          video.playbackRate = HERO_PLAYBACK_RATE;

          void video.play().catch((error) => {
            console.warn(
              "Hero video play() failed:",
              error,
            );
          });
        }}
        onPlaying={() => {
          console.log("HERO VIDEO IS PLAYING");
        }}
        onError={(event) => {
          const video = event.currentTarget;

          console.error("HERO VIDEO ERROR", {
            src: video.currentSrc,
            errorCode: video.error?.code,
            errorMessage: video.error?.message,
            networkState: video.networkState,
            readyState: video.readyState,
          });

          setFailed(true);
        }}
      >
        <source
          src={site.hero.video}
          type="video/mp4"
        />
      </video>
    </div>
  );
}

function BranchStrip() {
  const { t } = useI18n();

  return (
    <div className="border-t border-gold/20 bg-ink/70 backdrop-blur-sm">
      <ul className="mx-auto grid max-w-[1320px] grid-cols-3 divide-x divide-gold/20 px-4 sm:px-6 lg:px-10">
        {branches.map((branch) => {
          const item = t.branches.items[branch.slug];

          return (
            <li
              key={branch.slug}
              className="min-w-0 first:ps-0 [&:not(:first-child)]:ps-3 sm:[&:not(:first-child)]:ps-6"
            >
              <a
                href="#branches"
                className="group flex flex-col gap-1 py-4 pe-3 sm:py-5 sm:pe-6"
              >
                <span className="font-display text-[0.8125rem] font-medium leading-tight text-bone transition-colors group-hover:text-gold sm:text-sm ar:font-bold">
                  {item.name}
                </span>

                <span className="hidden truncate text-xs text-muted sm:block">
                  {item.address}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
