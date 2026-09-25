# ZAG Motors home page prototype

Direction: "Showroom placard" (impeccable seed 636ea3eb, code-led). Contract: `.impeccable/surfaces/app-page-tsx.md`.

## Plan

- [x] Research: Instagram (login-walled; got logo look + counts), Facebook (page "زيتون ZAG Motors", HDK D3 spec), brand lookups (Lento, Glide, HDK)
- [x] PRODUCT.md + direction contract
- [x] Scaffold Next 16 App Router + Tailwind v4 + TS, static export
- [x] Tokens, fonts (Unbounded / Archivo / Cairo), browser surfaces (selection, scrollbar, focus)
- [x] i18n: one copy file (EN + AR), locale store, RTL flip, no hardcoded strings
- [x] Data files: site, brands, catalog, media (reels, sold, branches)
- [x] Media slots with designed placeholders (image, video, logo); never a broken image
- [x] Header (logo, links, EN/AR, WhatsApp) + sticky mobile WhatsApp
- [x] Hero (video + poster fallback, reduced-motion aware, sized to content)
- [x] Brand marquee (pause on hover, isolate-and-dim, reduced-motion static, RTL direction)
- [x] Catalog: 6 alternating placards, zig-zag rule, WhatsApp prefill, flagged brands, marked placeholder specs
- [x] Reels strip (4 cards) + social counts
- [x] Sold in Sahel (4 supplied portrait videos, SOLD stamp)
- [x] Branches (compact, 3 cards, Open in Maps)
- [x] Footer (selectable phone/email + links)
- [x] Verify: build, lint, typecheck, screenshots desktop/mobile EN+AR, 375px overflow, reduced motion
- [x] Detector + finish review + DESIGN.md

## Review

**Verification (all green on the final build):**
- `next build` (static export to `/out`), `tsc --noEmit` and `eslint` are all clean.
- 1440, 390 and 375 px, in EN and AR: `scrollWidth == clientWidth` (no horizontal scroll), 0 broken images, 0 console errors apart from the expected 404s for media not yet supplied.
- Marquee drifts left in EN and right in AR (~64 px/s). Under reduced motion there is no hero `<video>`, the marquee is static and wrapped, and its duplicates are hidden.
- With test files dropped into `/out`: `logo.png` replaced the stand-in after `logo.svg` 404'd, and vehicle, sold and branch photos replaced their placeholders. The test files were removed afterwards.
- The impeccable detector returned no findings.
- Finish reviewer: the first pass returned `recapture` (2x mobile captures exceeded Chromium's 16,384 px limit), then `fix` (7 items), then `fix` (1 regression: mixed lot numerals in AR), then `ship`.

**Bugs found and fixed during verification:**
- The Arabic marquee rendered empty: the LTR track overflowed leftward inside an RTL box. Fixed by laying out the marquee container LTR.
- `rtl:divide-x-reverse` misplaced dividers. Tailwind v4's `divide-x` is already logical.
- Mixed-script spec values broke bidi. Fixed by splitting the value and note into `<bdi>` runs, and isolating slugs with U+2068/2069.
- Placeholder labels were hidden under overlapping placards. Label side is now chosen per row.
- The reduced-motion brand list overflowed. The list now wraps.
- The front reel video sometimes stayed invisible. It is in the prerendered HTML, so when it loaded before hydration (a cached file, or slow JS), React never saw `loadeddata`/`canplay`: it stayed at `opacity-0` and was never played. Fixed with a ref that picks up `readyState` and errors when React attaches, the same approach as `MediaImage`. Before the fix it failed in 1 of 3 normal loads and 3 of 3 slow-JS loads; after it, 0 of 10.

**Open items for the owner:** see the final summary. They cover the brand mapping, the Facebook URL, the IG follower count, the Arabic copy review, and the Maps pins.

---

# Mobile pass: overflow + crowded hero (phones only)

Scope: below `sm` (640px) only, plus the `md:hidden` WhatsApp bar. Desktop and tablet must not change.

- [x] Audit 320–414px, EN + AR, in Chromium and WebKit: page overflow, element-level spill, screenshots
- [x] Hero: fills the first screen (`100svh` less the header), content settled at the foot of the footage, CTAs full-width and stacked, deeper scrim midpoint so the lockup reads over the jet car
- [x] Sticky WhatsApp bar waits off-screen (and `inert`) while the hero's own actions are visible, then slides up. It shows immediately on deep links
- [x] Social counts: icon above label on phones (the Instagram icon was squeezed to nothing and the labels collided)
- [x] Consultation: `grid-cols-1` so a `<select>`'s intrinsic width can't push the form past its column (it overflowed by 11px at 320px)
- [x] Catalog field rows: the label keeps its width on narrow phones and the value wraps instead
- [x] Sold rail runs to the screen edge on phones instead of being cut 16px short of it
- [x] `@supports not (overflow: clip)` fallback: on iOS 15 and older the brand marquee would otherwise widen the whole page
- [x] Root cause of "still scrollable left/right" after the first pass: `overflow-x: clip` was only set on `body`, but `document.scrollingElement` is `html`. That relies on the browser *propagating* body's overflow up to the viewport — a legacy algorithm that predates the `clip` keyword and isn't consistently honored for it. Moved `overflow-x: clip` (+ `overscroll-behavior-x: none`) onto `html` directly, so the actual scrolling box enforces it without depending on propagation

## Review

- `tsc`, `eslint` and `next build` are clean.
- At 320/360/375/390/414px, EN + AR, in both Chromium and WebKit: document width equals the viewport and no element crosses the edge. The hero is 716 of 780px (the screen less the 64px header).
- Desktop and tablet are unchanged. At 640/768/1024/1280/1440px, EN + AR, with the added classes reverted in the DOM: 0 of 831 elements moved and 0 computed styles changed (control 0). The same check at 375px does flag the changes, so it is not vacuous.
- The WhatsApp bar is hidden and inert at the top, visible after scrolling past the hero actions, hidden again back at the top, and visible straight away on `/#branches`.
- Known: at 320px (EN only) "INSTAGRAM" runs ~10px into its own cell padding. It stays inside the cell.
- Not changed (desktop, out of scope): the Facebook icon in the reels social row is squeezed to 8.5px wide at ≥1024px. `shrink-0` on the icon fixes it.
