import type { Localized } from "@/i18n/copy";

/**
 * Reels strip: four cards from local files in /public/reels/.
 * Set `type` to "video" or "image" to match the file you drop in.
 * A placeholder card renders until the file exists.
 */
export type Reel = {
  slug: string;
  type: "video" | "image";
  src: string;
  /** Optional still for video reels. */
  poster?: string;
  /** Where the card links. Point it at the reel's own URL when you have it. */
  href: string;
  caption: Localized | null;
};

export const reels: Reel[] = [
  { slug: "reel-1", type: "video", src: "/reels/reel-1.mp4", poster: "/reels/reel-1.jpg", href: "https://www.instagram.com/p/Ddo21aFCFxI/", caption: null },
  { slug: "reel-2", type: "video", src: "/reels/reel-2.mp4", poster: "/reels/reel-2.jpg", href: "https://www.instagram.com/p/DRckKLMEVcp/", caption: null },
  { slug: "reel-3", type: "video", src: "/reels/reel-3.mp4", poster: "/reels/reel-3.jpg", href: "https://www.instagram.com/p/Db59mAqt2QG/", caption: null },
  { slug: "reel-4", type: "video", src: "/reels/reel-4.mp4", poster: "/reels/reel-4.jpg", href: "https://www.instagram.com/p/DdOg1JAMl9E/", caption: null },
];

/** The four clips supplied for ZAG's Sold in Sahel highlight. */
export type SoldItem = {
  slug: string;
  src: string;
  poster: string;
};

export const soldHighlightUrl = "https://www.instagram.com/stories/highlights/18099552752588237/";

export const sold: SoldItem[] = [
  { slug: "sold-1", src: "/sold/Instagram highlights stories 18099552752588237.mp4", poster: "/sold/poster-1.jpg" },
  { slug: "sold-2", src: "/sold/4.mp4", poster: "/sold/poster-2.jpg" },
  { slug: "sold-3", src: "/sold/5.mp4", poster: "/sold/poster-3.jpg" },
  { slug: "sold-4", src: "/sold/f.mp4", poster: "/sold/poster-4.jpg" },
];

/**
 * Branches. Names and addresses are in /i18n/copy.ts under `branches.items`.
 * Photos: /public/branches/{slug}.jpg.
 */
export type Branch = {
  slug: "el-haram" | "zayed" | "north-coast";
  /** Google Maps search query. Swap for a pinned Maps share link when you have one. */
  mapsQuery: string;
};

export const branches: Branch[] = [
  { slug: "el-haram", mapsQuery: "ZAG Motors, El Mansoria St, El Haram, Giza" },
  { slug: "zayed", mapsQuery: "ZAG Motors, Waslet Dahshur, Sheikh Zayed" },
  { slug: "north-coast", mapsQuery: "ZAG Motors, Sky Court Mall, Amwaj, North Coast" },
];
