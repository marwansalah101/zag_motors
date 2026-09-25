"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import { cn, whatsappHref } from "@/lib/links";

/**
 * Always-reachable WhatsApp action on phones. It waits below the screen while
 * the hero's own actions are in view, so the first screen never offers the
 * same button twice, and slides up once they scroll away.
 */
export function MobileWhatsApp() {
  const { t } = useI18n();
  const [heroActionsInView, setHeroActionsInView] = useState(true);

  useEffect(() => {
    const actions = document.querySelector("[data-hero-actions]");
    if (!actions) return;

    const observer = new IntersectionObserver(([entry]) => setHeroActionsInView(entry.isIntersecting));
    observer.observe(actions);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={heroActionsInView}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 bg-linear-to-t from-ink via-ink/85 to-transparent px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6 transition-[translate,opacity] duration-300 ease-(--ease-out-quart) motion-reduce:transition-none md:hidden",
        heroActionsInView && "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <a
        href={whatsappHref(t.whatsapp.general)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-solid min-h-[3.25rem] w-full"
      >
        <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
        {t.hero.whatsapp}
      </a>
    </div>
  );
}
