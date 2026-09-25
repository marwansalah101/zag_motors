import { site } from "@/data/site";

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mapsHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

type ClassPart = string | false | null | undefined | ClassPart[];

export function cn(...parts: ClassPart[]): string {
  return parts
    .map((part) => (Array.isArray(part) ? cn(...part) : part))
    .filter(Boolean)
    .join(" ");
}
