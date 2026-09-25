"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/links";

type Status = "loading" | "loaded" | "error";

type Props = {
  src: string;
  alt: string;
  /** Rendered until the image has loaded, and for good if it never does. */
  placeholder: React.ReactNode;
  eager?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * An image that can never show as broken. It stays transparent over its
 * placeholder until it has actually loaded; a missing file leaves only the
 * placeholder behind.
 */
export function MediaImage({ src, alt, placeholder, eager = false, className, style }: Props) {
  const [status, setStatus] = useState<Status>("loading");

  // The file may finish (or fail) before React hydrates and attaches onLoad.
  const measure = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
  }, []);

  return (
    <>
      {status !== "loaded" && placeholder}
      {status !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element -- static export; files are optional and supplied later
        <img
          ref={measure}
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          style={style}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700 ease-(--ease-out-quart)",
            status === "loaded" ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      )}
    </>
  );
}
