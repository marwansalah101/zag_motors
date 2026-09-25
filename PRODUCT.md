# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + Tailwind CSS + TypeScript, statically exported. No backend, no forms, no analytics. (Pinned by the user's brief for an empty repo.)

## Users

Everyone who buys leisure and personal vehicles in Egypt, confirmed by the owner as "all of the above":

- North Coast (Sahel) and gated-compound owners buying a golf car, buggy or jet car for the summer.
- Resorts, compounds and businesses buying one or several units.
- Riders buying ATVs, scooters and motorcycles for fun or commuting.

Most arrive from Instagram, TikTok or Facebook on a phone, often outdoors, and move to WhatsApp to ask about a model before visiting a branch.

## Product Purpose

The ZAG Motors home page is the brand's front door: it shows the full range (land and water), proves the brand delivers in Sahel, and routes every visitor into a WhatsApp conversation or a branch visit. Success is a visitor who taps WhatsApp with a category already in mind.

## Positioning

One dealer covering the whole leisure-vehicle range, from golf cars and buggies to jet cars, ATVs, electric cars, scooters and motorcycles. It has branches in Cairo (El Haram), Sheikh Zayed and on the North Coast itself (Sky Court Mall, in front of Amwaj), and a record of vehicles sold into Sahel compounds.

## Operating Context

- Sales happen on WhatsApp: +20 100 067 0936 (wa.me/201000670936). Phone and WhatsApp are the same number.
- Email: zagmotorsshop@gmail.com.
- Social: Instagram @zag_motors, TikTok @zag_motors, Facebook "زيتون ZAG Motors" (facebook.com/www.zaytoun). The owner states follower counts of IG 3.1K, TikTok 3.7K, FB 120K. [Inferred note: Instagram's public crawler view on 2026-09-25 showed 2,291 followers; the owner's figure is used.]
- Branches: El Haram (El Mansoria St), Zayed – Waslet Dahshur, North Coast (Sky Court Mall, in front of Amwaj).
- Their own posts reference Sahel compounds (Amwaj, Marassi, Hacienda Bay, Fouka Bay).

## Capabilities and Constraints

- Bilingual EN/AR with full RTL; all copy centralized; no hardcoded strings in components.
- NO prices anywhere. No installment calculator, financing, service/warranty, pre-owned, or season switch.
- Owner supplies missing media for /public/vehicles/{slug}.jpg, /public/reels/, and /public/branches/{slug}.jpg. Four supplied Sold in Sahel highlight videos live in /public/sold/. Every slot must render a designed placeholder when the file is missing.
- Catalog categories (in order): Golf Cars; Beach Buggies & Jet Cars; ATVs; Electric Cars; Scooters; Motorcycles.
- Brands carried: Lento, ZForce, HDK, A-CAR, Glide, Fiat, Jet Car. The category mapping is a best guess, flagged until the owner confirms it: [Inferred: Lento and HDK are golf-car makers; Glide is an Egyptian electric-scooter maker; ZForce is CFMOTO's side-by-side buggy line; Jet Car is a car-shaped watercraft; Fiat fits Electric Cars; A-CAR is unknown.]
- Specs must not be fabricated. Unknown values render as clearly marked placeholders. One sourced spec: ZAG's own Facebook post lists the HDK D3 golf car with a 6.3 kW AC motor and a 48V lithium battery.

## Brand Commitments

- Name: ZAG Motors. Logo (seen on Instagram): gold angular "Z" monogram with a "ZAG / MOTORS" lockup on near-black. The owner will supply the file.
- Dark only. Pinned palette: background #0B0B0C, gold #C9A24B, text #EDE8DC, muted #8A8577.
- Wide display face for headings (Syne or Unbounded), a clean body face, Cairo for Arabic.
- Show verified manufacturer logos for carried brands in the home-page carousel. Keep a plain name when the exact maker logo cannot be verified; record sources in `public/brands/SOURCES.md`.

## Evidence on Hand

- Contact details, branches and follower counts above (owner-supplied).
- One real spec (HDK D3, from ZAG's Facebook).
- Four Sold in Sahel highlight videos have been supplied. No testimonials, customer names, delivery counts or awards have been supplied; none may be invented.

## Product Principles

1. Every path ends in WhatsApp, pre-filled with what the visitor was looking at.
2. Show the range, not the price: category, brands, what it's for.
3. Say only what is known; unknowns are visibly marked, never filled with plausible fiction.
4. Arabic is a first-class reading experience, not a mirrored afterthought.
5. The owner can maintain it: every piece of content lives in one data or copy file.

## Accessibility & Inclusion

The brand carousel moves continuously, including on hover and under reduced-motion settings, by owner request. No horizontal page scroll at 375px. Phone and email must be selectable text as well as links. WCAG AA contrast on the dark ground.
