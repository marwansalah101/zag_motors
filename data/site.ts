/**
 * Contact details, social accounts and the logo.
 * Follower counts are the figures supplied by ZAG; update them here.
 */

export const site = {
  name: "ZAG Motors",
  phone: {
    /** Shown as selectable text. */
    display: "+20 100 067 0936",
    /** Used for tel: links. */
    tel: "+201000670936",
  },
  /** International number without "+", as wa.me expects. */
  whatsapp: "201000670936",
  email: "zagmotorsshop@gmail.com",
  logo: "/zag-mark.svg",
  hero: {
    video: "/hero.mp4",
    /** Still frame shown while the video loads and for reduced-motion visitors. */
    poster: "/hero-poster.jpg",
  },
  socials: {
    instagram: {
      label: "Instagram",
      handle: "@zag_motors",
      url: "https://www.instagram.com/zag_motors/",
      followers: 3100,
    },
    tiktok: {
      label: "TikTok",
      handle: "@zag_motors",
      url: "https://www.tiktok.com/@zag_motors",
      followers: 3700,
    },
    facebook: {
      label: "Facebook",
      // Page found as "زيتون ZAG Motors"; confirm this is the one to link.
      handle: "ZAG Motors",
      url: "https://www.facebook.com/www.zaytoun",
      followers: 120000,
    },
  },
} as const;

export type SocialKey = keyof typeof site.socials;
