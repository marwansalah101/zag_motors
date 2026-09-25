---
name: ZAG Motors
description: A dealer's showroom floor at night; every vehicle, sale and branch wears a ruled gold spec placard.
colors:
  ink: "#0b0b0c"
  ink-2: "#121213"
  ink-3: "#1a191b"
  gold: "#c9a24b"
  gold-deep: "#a6843a"
  bone: "#ede8dc"
  muted: "#8a8577"
typography:
  display:
    fontFamily: "Unbounded, Cairo, ui-sans-serif, sans-serif"
    fontSize: "clamp(2rem, 1.25rem + 2.8vw, 3.625rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Unbounded, Cairo, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.625rem, 1.2rem + 1.3vw, 2.375rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Unbounded, Cairo, ui-sans-serif, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, Cairo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.96875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, Cairo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.16em"
  button:
    fontFamily: "Archivo, Cairo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
  display-ar:
    fontFamily: "Cairo, ui-sans-serif, sans-serif"
    fontSize: "clamp(2rem, 1.25rem + 2.8vw, 3.625rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body-ar:
    fontFamily: "Cairo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.96875rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "40px"
  placard-pad-sm: "24px"
  placard-pad-md: "32px"
  placard-pad-lg: "40px"
  container: "1320px"
  section-y: "clamp(5rem, 10vw, 9rem)"
components:
  button-solid:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-solid-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
  button-line:
    backgroundColor: "rgba(11, 11, 12, 0.55)"
    textColor: "{colors.bone}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
  placard:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "32px"
  field-label:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  pending-field:
    textColor: "{colors.muted}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  language-toggle-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "36px"
---

# Design System: ZAG Motors

## Overview

**Creative North Star: "The Showroom Placard"**

The site is a dealer's showroom floor after dark. Every category, sold unit and branch stands on an ink panel. Each panel has a 1px gold hairline, registration marks at its corners and a column of ruled fields, like the spec card clipped to a vehicle on the floor. The placard is honest about what it does not know. A field with no confirmed data shows a dashed blank marked "to confirm". The system never fills it with an invented number.

The system is dark only (`color-scheme: dark`, theme color ink). It uses one metal accent and one warm paper-white for text, and nothing else. Hierarchy comes from scale contrast: wide, tightly tracked Unbounded titles sit against tiny tracked field labels. Weight and color do little of that work. The page is quiet between placards. Generous section spacing and single hairline rules divide space, not boxes or fills. One diagonal gold line zig-zags down the catalog and ties the placards into a running Z, the brand's own letter.

Arabic is a first-class reading, not a translation layer. It is set in Cairo throughout, mirrored with logical properties, and never letterspaced or uppercased.

**Key Characteristics:**
- Dark only: ink stand, bone text, gold rules. No light theme.
- Square corners everywhere (0 radius), including buttons.
- Placard material: 1px gold hairline, registration corners, dotted leaders, dashed pending fields.
- Every media slot has a finished, labelled placeholder. Media fades in only once it has loaded.
- Scroll-driven reveals that are progressive, CSS-only and fully disabled under reduced motion.
- Built for RTL from the start: logical insets, mirrored diagonals and arrows, and bidi-isolated Latin identifiers.

## Colors

A near-black stand, a single brass-gold metal and a warm bone text color. The palette is restrained, with gold as the only chroma.

### Primary
- **Showroom Gold** (gold): the site accent. Used for placard hairlines (at 24% alpha), section rules (25–35%), registration corners, the zig-zag line and its diamond nodes, solid buttons, focus rings, selection, lot numbers, text links and the SOLD stamp. Manufacturer logos keep their verified colors inside the brand carousel.
- **Burnished Gold** (gold-deep): the darker metal step of the same hue. It is declared in `@theme` but no shipped surface uses it yet. Keep it as a reserve for pressed or shadowed gold, and do not treat it as an established role.

### Neutral
- **Stand Ink** (ink): page background, the header at 80% under backdrop blur, and the gradient that settles hero footage into the page. Also the text color on gold fills.
- **Placard Ink** (ink-2): the placard panel and empty-slot surface, one step lifted from the stand. Also the hover fill on social-count cells and the footer at 60%.
- **Deep Panel** (ink-3): the third tonal step. It is declared in `@theme` but unused in the shipped page. Keep it as a reserve for a surface nested inside a placard.
- **Bone** (bone): all primary text. Body copy runs at 65–70% alpha. Bone is also the hover fill of the solid button.
- **Field Grey** (muted): field labels, fine print, file paths, the dotted leaders (55%) and the dashed borders of pending fields (70%).

### Named Rules
**The One Metal Rule.** Gold is the only color with chroma. Any new state or emphasis is gold at some alpha, or bone. Nothing else is introduced.

**The Hairline Alpha Rule.** Structural gold appears as a 1px line at graded alpha: 10% for inner list dividers, 15% for section borders, 20–35% for rules and strips, 55–70% for chips, buttons and slot corners, and 100% only for corners, nodes and fills.

## Typography

**Display Font:** Unbounded (Latin display), falling back to Cairo
**Body Font:** Archivo (Latin body), falling back to Cairo
**Arabic Font:** Cairo for all Arabic, display and body alike

**Character:** Unbounded's wide, round geometric caps read like badge lettering on a vehicle. Archivo is the plain text of the spec sheet. Under `:lang(ar)` the root reassigns `--font-display` and `--font-sans` to Cairo, so every Arabic run is Cairo with no per-component work. Latin brand names and lot codes opt back into Unbounded with `lang="en"` and the `latin-display` font token. Cairo is loaded with `preload: false`, so English visitors never fetch it.

### Hierarchy
- **Display** (600, clamp(2rem → 3.625rem), line-height 1.02, -0.035em): section titles.
- **Hero line** (500, clamp(1.375rem → 2.375rem), 1.18, -0.02em): the one line under the hero logo. Arabic: 800, line-height 1.5.
- **Headline** (600, clamp(1.625rem → 2.375rem), 1.06, -0.03em): placard titles.
- **Title** (600, 1rem–1.5rem, -0.01 to -0.02em): branch names, social counts, mobile nav items (Unbounded, 1.125rem).
- **Body** (400, 0.96875rem–1.125rem, relaxed ≈1.625): intros and placard descriptions, capped at 46–52ch, bone at 70%. Arabic body line-height is 1.75.
- **Label** (0.6875rem, 0.16em, uppercase, muted): field labels, footer column heads, social names. Arabic: 0.8125rem, no tracking, no case change.
- **Numeral specimen** (Unbounded 600, up to 14rem, -0.04em): lot numbers set as ink-filled, gold-stroked outlines on empty vehicle plates.

### Named Rules
**The Arabic Plain Rule.** Arabic never gets letterspacing or `text-transform`. Every tracked or uppercase Latin style carries an Arabic override (`ar:tracking-normal`, or `letter-spacing: 0; text-transform: none` under `:lang(ar)`), and Arabic small text is sized up (0.6875rem → 0.8125rem, 0.8125rem → 0.9375rem).

**The Arabic Weight Bump Rule.** Cairo display runs one or two steps heavier than the Latin equivalent (`ar:font-bold` on titles, `ar:font-extrabold` on the hero line), with taller leading (1.3–1.5).

**The Scale-Not-Weight Rule.** Hierarchy comes from the size gap between display titles and 11px field labels. Weights stay in the 400–600 band for Latin.

## Layout

A single centered container (1320px max) with inline gutters of 16 / 24 / 40px at base / sm / lg. Major sections breathe with vertical padding of clamp(5rem, 10vw, 9rem). Sections are divided by a 1px gold/15 top border, never by background bands.

Section headers follow one pattern: title and intro at the start, count fields at the end, and one full-width gold hairline under both. The hairline draws in on scroll.

The catalog uses a 12-column grid on large screens. The rows alternate sides, with a 4:3 plate spanning 8 columns and the placard overlapping it by one column across 5. On phones the placard stacks under the plate, inset 12–32px and pulled up by 48px. Between rows, the **ZAG line** runs diagonally from one placard's inner corner to the next. It is positioned with logical insets (`start-[41.67%]`/`end-[41.67%]` on large screens) and mirrored with `rtl:-scale-x-100`, so the Z runs correctly in both directions.

The Sold in Sahel highlight uses portrait 9:16 clips in a snap-scrolling rail on phones and a four-column grid on desktop. On phones a fixed WhatsApp bar sits at the bottom inside `safe-area-inset-bottom`, and the footer reserves space for it.

All direction-sensitive spacing and placement uses logical properties (`ps`/`pe`, `ms`/`me`, `start`/`end`, `text-align: end`). Only the things that must flip are mirrored: diagonals, arrows (`rtl:-scale-x-100`), hero gradients (`rtl:bg-linear-to-l`), rule transform-origin and the stamp's rotation.

## Elevation & Depth

The system is flat. Nothing floats on a drop shadow. Depth comes from three things: tonal steps (ink → ink-2), 1px gold hairlines, and layering. Placards overlap their plates, sticky chrome sits on ink at 70–80% with backdrop blur, and media is settled into the stand with ink gradients. A fixed, paper-fine fractal-noise grain (4.5% opacity) sits over the whole page.

### Named Rules
**The No-Drop-Shadow Rule.** Separation is a hairline or a tonal step, never an outer shadow. The only box-shadow in the build is the SOLD stamp's inset double rule, which draws a stamp border. It does not create elevation.

## Shapes

All corners are square (0px): placards, slots, buttons, chips, the language toggle and pending fields. The recurring geometry is:
- **Registration corners:** 14px L-marks in each corner, drawn on a `::before` with eight 1px gradients, set 1px outside the border. Their color and length are tunable (`--reg-color`, `--reg-size`). Slots use gold at 70%.
- **The diamond node:** a 7px gold square rotated 45°. It marks both ends of every zig-zag segment.
- **The Z glyph:** the brand's Z drawn as a 1.25px hairline. Used in counts and as the ghost mark on empty slots.
- **The diagonal:** a single 1px non-scaling stroke. It is the one governing line of the page.
- **The hatch:** a 135° 1px gold/7% repeat every 13px. This is the texture of emptiness.

## Components

### Buttons
Square, confident and uppercase in Latin.
- **Shape:** square (0px), min-height 48px (52px on the mobile WhatsApp bar), 22px inline padding, 10px icon gap.
- **Solid:** gold fill with ink text and a gold border. On hover it turns to bone. Used for the primary action (Browse catalog, mobile WhatsApp, skip link).
- **Line:** a 1px gold/70 border, bone text and a translucent ink fill (55%). On hover it fills with gold and ink text. Used for secondary actions (WhatsApp us, Ask about this).
- **Motion:** 220ms ease-out-quart on color changes. `:active` nudges the button down 1px.
- **Arabic:** 0.9375rem, no tracking, no uppercase.

### Placard (signature)
- **Surface:** ink-2 with a 1px gold/24 border and registration corners.
- **Padding:** 24 / 32 / 40px.
- **Contents:** headline title, a gold/25 hairline that draws on scroll, a 46ch description, then a `dl` of **field rows**. Each row is a label and a value. The label's `dt::after` grows a dotted muted/55 leader that runs to the value, which is end-aligned.
- **Lot row:** Latin `01`–`06` in Unbounded, tabular gold, in both languages.
- **Action:** the placard ends with a line button.

### Pending field
An unfilled field is shown as a visible blank. It has a 1px dashed muted/70 border, muted text, 2×8px padding and 0.75rem text (0.8125rem in Arabic). Unconfirmed brand chips wear the same dashed treatment and carry a screen-reader-only "unconfirmed" suffix. Confirmed brand chips use a solid 1px gold/55 border with tracked uppercase Latin.

### Media slot
Every image and video sits on a **SlotPlaceholder**. It is a hatched ink-2 plate with gold/70 registration corners, a ghost Z glyph (or a lot numeral on large catalog plates), a bone label naming the slot, and the file path in 11px muted mono, isolated with `<bdi dir="ltr">`. Label placement is chosen so that overlaid content never covers it. **MediaImage** keeps the image at 0 opacity over its placeholder until it has actually loaded (checking `complete` and `naturalWidth` for images that finish before hydration), then fades in over 700ms. A failed file leaves the placeholder in place. The hero and reels fade in on `loadeddata`. Sold clips use still frames extracted from the supplied videos, so their preview and PLAY stamp are visible before playback loads. The stamp uses the same gold double-rule treatment as the SOLD marker; it changes to PAUSE during playback and offers RETRY if loading fails.

### SOLD stamp
A rubber stamp for sold plates. Gold tracked uppercase (0.22em) in Unbounded, drawn with an inset gold / ink / gold double rule. It sits on translucent ink with a 2px blur, rotated -6° (+6° in RTL), and pinned to the top-start corner.

### Navigation
A sticky 64px header on ink/80 with a medium backdrop blur and a gold/15 bottom border. Desktop links are bone/80, 0.875rem. On hover a 1px gold underline scales in from the start edge (300ms ease-out-expo, origin flipped in RTL). The language toggle is a gold/30 bordered segmented pair: the active option is filled gold with ink text, and the Arabic option is always set in Cairo. The mobile menu opens as full-width rows at least 56px tall, in Unbounded 1.125rem, separated by gold/10 hairlines. It closes on Escape.

### Brand band (carousel)
Verified manufacturer logos sit inside wide, registered ink plates with their names underneath. Keep original logo shapes and colors; the FIAT wordmark is inverted to read on ink. A-CAR and Jet Car remain plain names until their exact logo sources are verified. Four identical runs keep the LTR rail filled on wide screens; it moves continuously without pausing on hover. The plate under the pointer glows gold.

### Isolate-and-dim
Hover-capable galleries isolate the item under the pointer. In the sold grid, the other plates fade to 40% over 300ms.

### Motion
All scroll motion is progressive CSS (`animation-timeline: view()`). It is wrapped in `@supports` and `prefers-reduced-motion: no-preference`, so content is fully visible without it:
- **draw-rule:** hairlines scale in from the start edge (entry 10% → cover 30%).
- **field-in:** field rows rise 0.5rem and fade in, staggered 3% per row through `--i`.
- **zig-line:** the diagonal unclips from top to bottom (entry 30% → cover 55%).
- **zig-node:** the diamonds scale in from 0.2, using `scale` so the effect composes with the node's rotation. The end node lands later.

Easing tokens are ease-out-expo (`cubic-bezier(0.16, 1, 0.3, 1)`) and ease-out-quart (`cubic-bezier(0.25, 1, 0.5, 1)`). The brand carousel remains continuous under reduced-motion settings by owner request.

## Do's and Don'ts

### Do:
- **Do** put every product, sale and location on a placard: ink-2, a 1px gold/24 hairline and registration corners.
- **Do** show unknown data as a dashed pending field labelled "to confirm", in muted.
- **Do** give every image and video slot a finished SlotPlaceholder, and fade the media in only after it has loaded.
- **Do** keep all corners square (0px).
- **Do** set Arabic in Cairo, one weight step heavier on display text, with no letterspacing and no uppercase.
- **Do** use logical properties for all placement. Mirror only diagonals, arrows, gradients, rule origins and rotations.
- **Do** isolate Latin identifiers inside Arabic text with `<bdi>` or U+2068/U+2069, and mark Latin brand names with `lang="en"`.
- **Do** keep lot codes as Latin two-digit numbers (`01`) in both languages. They are identifiers, like plate numbers.
- **Do** gate every scroll or decorative animation behind `@supports` and `prefers-reduced-motion: no-preference`.

### Don't:
- **Don't** show prices or invent specs, model names or counts. Leave the field pending instead.
- **Don't** add a light theme or a second accent hue.
- **Don't** add rounded corners, drop shadows or glossy gradient cards with "Explore" buttons.
- **Don't** letterspace or uppercase Arabic.
- **Don't** let a broken image or empty video box render. The placeholder is the fallback.
- **Don't** autoplay reel videos. They play only on hover or focus, and the hero video never loads under reduced motion.
