/** Local copies of verified brand marks. See /public/brands/SOURCES.md. */
export type Brand = {
  name: string;
  logo?: string;
};

export const brands: Brand[] = [
  { name: "Lento", logo: "/brands/lento.png" },
  { name: "ZForce", logo: "/brands/zforce.webp" },
  { name: "HDK", logo: "/brands/hdk.png" },
  { name: "A-CAR" },
  { name: "Glide", logo: "/brands/glide.png" },
  { name: "Fiat", logo: "/brands/fiat.svg" },
  { name: "Jet Car" },
];
