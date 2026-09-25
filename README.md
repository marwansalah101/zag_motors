# ZAG Motors home page

A single-page prototype for ZAG Motors, built with Next.js (App Router), Tailwind CSS v4 and TypeScript. It is dark only, bilingual (English/Arabic with full RTL) and a static export with no backend.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in /out, host anywhere
```

## Adding media

Every slot shows a labelled placeholder until its file exists, so you can add files one at a time. Drop them into `/public`:

| Slot | File |
| --- | --- |
| Logo mark and site icon | `zag-mark.svg` (transparent vector; `zag_icon.jpg` is the original reference) |
| Hero video | `hero.mp4` (muted loop) and `hero-poster.jpg` (still frame) |
| Catalog | `vehicles/golf-cars.jpg`, `vehicles/buggies-jet-cars.jpg`, `vehicles/atvs.jpg`, `vehicles/electric-cars.jpg`, `vehicles/scooters.jpg`, `vehicles/motorcycles.jpg` |
| Reels | `reels/reel-1.mp4` … `reel-4.mp4` (optional stills `reel-1.jpg` …) |
| Sold in Sahel | The four supplied MP4 files in `public/sold/` and their corresponding `poster-1.jpg` … `poster-4.jpg` preview frames |
| Branches | `branches/el-haram.jpg`, `branches/zayed.jpg`, `branches/north-coast.jpg` |

Landscape 4:3 works best for the catalog; portrait 9:16 works for reels and Sold in Sahel clips. The Sold section shows a still from each supplied clip, loads video when played, and links to the [full Instagram highlight](https://www.instagram.com/stories/highlights/18099552752588237/).

## Editing content

| What | Where |
| --- | --- |
| Catalog categories: titles, descriptions, brands, specs | `data/catalog.ts` |
| Scrolling brand wordmarks | `data/brands.ts` |
| Phone, email, socials, follower counts | `data/site.ts` |
| Reel files and links, Sold in Sahel clips, Maps queries | `data/media.ts` |
| All other text, in English and Arabic | `i18n/copy.ts` |

- **Specs:** `value: null` shows a dashed "To confirm" field. Replace it with a real value; never guess.
- **Brands:** `confirmed: false` shows the brand with a dashed outline. Set it to `true` once confirmed.
- **Sold clips:** `data/media.ts` lists only the four supplied videos, in display order.

## Behaviour notes

- WhatsApp links go to `wa.me/201000670936`. Each catalog button pre-fills a message naming its category, in the visitor's language.
- The language choice is remembered in the browser.
- The brand carousel moves continuously, including on hover; the hovered logo plate glows.
