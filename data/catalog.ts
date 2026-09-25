import type { Localized } from "@/i18n/copy";

/**
 * The six catalog categories, in page order. Everything a category shows is
 * here: title, two-line description, brands, and spec fields.
 *
 * Images: /public/vehicles/{slug}.jpg by default; set `image` for other files.
 * A placeholder renders until the file exists.
 *
 * Brands: `confirmed: false` marks a best-guess mapping. It renders with a
 * dashed outline until you set it to true.
 *
 * Specs: `value: null` renders a clearly marked "To confirm" field. Replace
 * with a real value when you have one; never guess.
 */

export type CatalogBrand = {
  name: string;
  confirmed: boolean;
};

export type CatalogSpec = {
  label: Localized;
  value: Localized | null;
  /** Optional source or model the value applies to, shown small after it (e.g. "HDK D3"). */
  note?: string;
};

export type CatalogCategory = {
  slug: string;
  image?: string;
  /** Match the source photo's shape on narrow screens. */
  imageAspect?: "square" | "portrait";
  /** Keep the vehicle in frame when a portrait photo fills the wide desktop plate. */
  imagePosition?: string;
  /** Turn the vehicle toward the alternate side in the catalog sequence. */
  imageFlip?: boolean;
  title: Localized;
  description: Localized;
  brands: CatalogBrand[];
  specs: CatalogSpec[];
};

const pending = null;

export const catalog: CatalogCategory[] = [
  {
    slug: "golf-cars",
    image: "vehicles/golf-cars.jpg",
    imageAspect: "square",
    imagePosition: "50% 55%",
    title: { en: "Golf Cars", ar: "جولف كار" },
    description: {
      en: "Electric carts for compounds, resorts and summer homes. Made for short, quiet trips between the villa, the beach and the club.",
      ar: "عربيات كهربائية للكمباوندات والمنتجعات وبيوت المصيف. مصممة للمشاوير القصيرة الهادئة بين الفيلا والبحر والنادي.",
    },
    brands: [
      // HDK: ZAG's own Facebook post features the HDK D3 golf car.
      { name: "HDK", confirmed: true },
      // Lento (Guangdong Lento Electric Vehicles) builds golf carts: best guess.
      { name: "Lento", confirmed: false },
    ],
    specs: [
      // Motor and battery: from ZAG's Facebook post on the HDK D3.
      {
        label: { en: "Motor", ar: "المحرك" },
        value: { en: "6.3 kW AC", ar: "6.3 كيلوواط AC" },
        note: "HDK D3",
      },
      {
        label: { en: "Battery", ar: "البطارية" },
        value: { en: "48V lithium", ar: "ليثيوم 48 فولت" },
        note: "HDK D3",
      },
      { label: { en: "Seating", ar: "عدد المقاعد" }, value: pending },
      { label: { en: "Range per charge", ar: "المسافة لكل شحنة" }, value: pending },
    ],
  },
  {
    slug: "buggies-jet-cars",
    image: "vehicles/water-buggy.png",
    imageAspect: "portrait",
    imagePosition: "50% 65%",
    imageFlip: true,
    title: { en: "Beach Buggies & Jet Cars", ar: "بيتش باجي وجت كار" },
    description: {
      en: "Off-road buggies for the dunes and jet cars for the water. One summer, on both sides of the shoreline.",
      ar: "باجي للرمال والطرق الوعرة، وجت كار للمياه. صيف واحد على جانبي الشاطئ.",
    },
    brands: [
      // ZForce is CFMOTO's side-by-side buggy line: best guess.
      { name: "ZForce", confirmed: false },
      // Jet Car is a car-shaped watercraft: best guess.
      { name: "Jet Car", confirmed: false },
    ],
    specs: [
      { label: { en: "Engine", ar: "المحرك" }, value: pending },
      { label: { en: "Seating", ar: "عدد المقاعد" }, value: pending },
      { label: { en: "Drivetrain", ar: "نظام الدفع" }, value: pending },
      { label: { en: "Jet car power", ar: "قوة الجت كار" }, value: pending },
    ],
  },
  {
    slug: "atvs",
    image: "vehicles/atv.jpg",
    imageAspect: "portrait",
    imagePosition: "50% 66%",
    imageFlip: true,
    title: { en: "ATVs", ar: "مركبات ATV" },
    description: {
      en: "Four-wheel quads for sand, desert trails and farm roads. Tell us who is riding and we will help you pick the size.",
      ar: "مركبات رباعية للرمال والمدقات الصحراوية والطرق الزراعية. أخبرنا من سيقودها ونساعدك في اختيار المقاس المناسب.",
    },
    brands: [],
    specs: [
      { label: { en: "Engine", ar: "المحرك" }, value: pending },
      { label: { en: "Transmission", ar: "ناقل الحركة" }, value: pending },
      { label: { en: "Drive", ar: "الدفع" }, value: pending },
      { label: { en: "Rider age", ar: "سن السائق" }, value: pending },
    ],
  },
  {
    slug: "electric-cars",
    image: "vehicles/electric-car.png",
    imageAspect: "square",
    title: { en: "Electric Cars", ar: "سيارات كهربائية" },
    description: {
      en: "Compact electric cars for city errands and compound roads. Quiet to drive and easy to park.",
      ar: "سيارات كهربائية صغيرة لمشاوير المدينة وطرق الكمباوند. هادئة في القيادة وسهلة في الركن.",
    },
    brands: [
      // Fiat builds compact EVs: best guess.
      { name: "Fiat", confirmed: false },
      // A-CAR: no public information found; placed here as a guess.
      { name: "A-CAR", confirmed: false },
    ],
    specs: [
      { label: { en: "Range", ar: "المدى" }, value: pending },
      { label: { en: "Top speed", ar: "السرعة القصوى" }, value: pending },
      { label: { en: "Seating", ar: "عدد المقاعد" }, value: pending },
      { label: { en: "Charging time", ar: "زمن الشحن" }, value: pending },
    ],
  },
  {
    slug: "scooters",
    image: "vehicles/electric-scooter.png",
    imageAspect: "portrait",
    imagePosition: "50% 70%",
    title: { en: "Scooters", ar: "سكوترات" },
    description: {
      en: "Scooters for the daily commute and the coast road. Light, nimble and easy to park.",
      ar: "سكوترات للمشوار اليومي وطريق الساحل. خفيفة وسريعة الحركة وسهلة الركن.",
    },
    brands: [
      // Glide is an Egyptian electric-scooter maker: best guess.
      { name: "Glide", confirmed: false },
    ],
    specs: [
      { label: { en: "Motor", ar: "المحرك" }, value: pending },
      { label: { en: "Top speed", ar: "السرعة القصوى" }, value: pending },
      { label: { en: "Range", ar: "المدى" }, value: pending },
      { label: { en: "Charging time", ar: "زمن الشحن" }, value: pending },
    ],
  },
  {
    slug: "motorcycles",
    image: "vehicles/Motorcycles.png",
    imageAspect: "portrait",
    imagePosition: "50% 68%",
    title: { en: "Motorcycles", ar: "موتوسيكلات" },
    description: {
      en: "Motorcycles for riders who want more road. Ask us what is on the floor this week.",
      ar: "موتوسيكلات لمن يريد طريقاً أطول. اسألنا عن المتاح في المعرض هذا الأسبوع.",
    },
    brands: [],
    specs: [
      { label: { en: "Engine", ar: "المحرك" }, value: pending },
      { label: { en: "Transmission", ar: "ناقل الحركة" }, value: pending },
      { label: { en: "Top speed", ar: "السرعة القصوى" }, value: pending },
      { label: { en: "Fuel tank", ar: "خزان الوقود" }, value: pending },
    ],
  },
];
