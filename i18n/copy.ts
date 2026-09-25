/**
 * Every interface string on the site, in English and Arabic.
 *
 * Catalog content (category titles, descriptions, specs) lives with the
 * catalog itself in /data/catalog.ts so a category is edited in one place.
 * Components never contain copy: they read from here or from /data.
 *
 * Arabic was written for the Egyptian market and should be reviewed by the
 * ZAG team before launch.
 */

export type Locale = "en" | "ar";

export type Localized = Record<Locale, string>;

const en = {
  meta: {
    title: "ZAG Motors | Golf cars, buggies, ATVs and scooters",
    description:
      "Golf cars, beach buggies, jet cars, ATVs, electric cars, scooters and motorcycles. Branches in El Haram, Sheikh Zayed and the North Coast. Ask us on WhatsApp.",
  },
  a11y: {
    skip: "Skip to content",
    home: "ZAG Motors home",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary",
    brandsBand: "Brands we carry",
    unconfirmed: "(brand not yet confirmed)",
    opensInNewTab: "(opens in a new tab)",
  },
  nav: {
    catalog: "Catalog",
    sold: "Sold in Sahel",
    branches: "Branches",
    whatsapp: "WhatsApp",
  },
  lang: {
    en: "EN",
    ar: "عربي",
  },
  hero: {
    line: "Golf cars, buggies, ATVs and scooters.",
    browse: "Browse catalog",
    whatsapp: "WhatsApp us",
  },
  brands: {
    count: (n: number) => `${n} brands`,
    previous: "Previous brands",
    next: "Next brands",
  },
  catalog: {
    title: "The catalog",
    intro:
      "Six categories, on land and on water. Ask us on WhatsApp for models and what is on the floor today.",
    categories: (n: number) => `${n} categories`,
    lot: "Lot",
    brands: "Brands",
    brandsPending: "To confirm",
    toConfirm: "To confirm",
    legend: "Dashed fields are placeholders until ZAG confirms them.",
    ask: "Ask about this",
  },
  reels: {
    title: "From the reels",
    intro: "New arrivals, handovers and collabs, straight from our feed.",
    followers: "followers",
    watch: "Watch on Instagram",
    previous: "Previous reel",
    next: "Next reel",
  },
  sold: {
    kicker: "Summer vibes",
    title: "Sold in Sahel",
    titleHighlight: "Sahel",
    intro: "Vehicles we have handed over on the North Coast.",
    stamp: "Sold",
    play: "Play",
    pause: "Pause",
    retry: "Retry",
    viewHighlight: "View the highlight",
    videoLabel: (number: string) => `Sahel delivery ${number}`,
    playVideo: (number: string) => `Play Sahel delivery ${number}`,
    pauseVideo: (number: string) => `Pause Sahel delivery ${number}`,
    retryVideo: (number: string) => `Retry Sahel delivery ${number}`,
    videoUnsupported: "Your browser cannot play this video.",
  },
  branches: {
    title: "Wherever you go, you'll find us",
    openMaps: "Open in Maps",
    items: {
      "el-haram": { name: "El Haram", address: "El Mansoria St, El Haram, Giza" },
      zayed: { name: "Zayed", address: "Waslet Dahshur, Sheikh Zayed" },
      "north-coast": { name: "North Coast", address: "Sky Court Mall, in front of Amwaj" },
    } as Record<string, { name: string; address: string }>,
  },
  consultation: {
    title: "Book a consultation",
    intro: "Tell us what you're looking for and where you'd like to meet. Our team can help you explore the right vehicle in person.",
    formTitle: "Plan your visit",
    name: "Your name",
    namePlaceholder: "Full name",
    phone: "Phone number",
    phonePlaceholder: "+20",
    interest: "Interested in",
    interestPlaceholder: "Choose a vehicle type",
    branch: "Preferred branch",
    branchPlaceholder: "Choose a branch",
    date: "Preferred date",
    message: "Anything we should know?",
    messagePlaceholder: "A model, a question, or who will be joining you...",
    submit: "Request an appointment",
    preview: "Form preview — appointment requests are not being sent yet.",
    whatsappPrompt: "Ready to arrange a visit now?",
    whatsappAction: "Message us on WhatsApp",
  },
  footer: {
    phone: "Phone & WhatsApp",
    email: "Email",
    follow: "Follow",
    call: "Call",
    write: "Write",
    rights: "All rights reserved.",
  },
  slots: {
    image: (slug: string) => `Image slot: ${slug}`,
    video: (slug: string) => `Video slot: ${slug}`,
    reel: (slug: string) => `Reel slot: ${slug}`,
  },
  whatsapp: {
    general: "Hi ZAG Motors, I'd like to ask about your vehicles.",
    about: (category: string) => `Hi ZAG Motors, I'd like to ask about ${category}.`,
  },
};

export type Copy = typeof en;

const ar: Copy = {
  meta: {
    title: "ZAG Motors | جولف كار، باجي، ATV وسكوترات",
    description:
      "جولف كار، بيتش باجي، جت كار، ATV، سيارات كهربائية، سكوترات وموتوسيكلات. فروعنا في الهرم والشيخ زايد والساحل الشمالي. اسألنا على واتساب.",
  },
  a11y: {
    skip: "انتقل إلى المحتوى",
    home: "الصفحة الرئيسية لـ ZAG Motors",
    language: "اللغة",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
    primaryNav: "التنقل الرئيسي",
    brandsBand: "الماركات المتوفرة لدينا",
    unconfirmed: "(الماركة غير مؤكدة بعد)",
    opensInNewTab: "(يفتح في نافذة جديدة)",
  },
  nav: {
    catalog: "الكتالوج",
    sold: "مبيعات الساحل",
    branches: "الفروع",
    whatsapp: "واتساب",
  },
  lang: {
    en: "EN",
    ar: "عربي",
  },
  hero: {
    line: "جولف كار، باجي، ATV وسكوترات.",
    browse: "تصفح الكتالوج",
    whatsapp: "كلمنا على واتساب",
  },
  brands: {
    count: (n: number) => `${formatArabicNumber(n)} ماركات`,
    previous: "الماركات السابقة",
    next: "الماركات التالية",
  },
  catalog: {
    title: "الكتالوج",
    intro: "ست فئات، على الأرض وعلى المياه. اسألنا على واتساب عن الموديلات والمتاح في المعرض اليوم.",
    categories: (n: number) => `${formatArabicNumber(n)} فئات`,
    lot: "رقم",
    brands: "الماركات",
    brandsPending: "قيد التأكيد",
    toConfirm: "قيد التأكيد",
    legend: "الخانات المنقطة بيانات مؤقتة حتى تؤكدها ZAG.",
    ask: "اسأل عنها",
  },
  reels: {
    title: "من الريلز",
    intro: "أحدث الوصولات والتسليمات والتعاونات من صفحتنا.",
    followers: "متابع",
    watch: "شاهد على إنستجرام",
    previous: "الريل السابق",
    next: "الريل التالي",
  },
  sold: {
    kicker: "أجواء الصيف",
    title: "بيعت في الساحل",
    titleHighlight: "الساحل",
    intro: "مركبات سلّمناها لأصحابها في الساحل الشمالي.",
    stamp: "تم البيع",
    play: "تشغيل",
    pause: "إيقاف",
    retry: "إعادة التشغيل",
    viewHighlight: "شاهد الهايلايت",
    videoLabel: (number: string) => `تسليم في الساحل \u2068${number}\u2069`,
    playVideo: (number: string) => `شغّل تسليم الساحل \u2068${number}\u2069`,
    pauseVideo: (number: string) => `أوقف تسليم الساحل \u2068${number}\u2069`,
    retryVideo: (number: string) => `أعد تشغيل تسليم الساحل \u2068${number}\u2069`,
    videoUnsupported: "متصفحك لا يدعم تشغيل هذا الفيديو.",
  },
  branches: {
    title: "أينما ذهبت، ستجدنا",
    openMaps: "افتح في الخرائط",
    items: {
      "el-haram": { name: "الهرم", address: "شارع المنصورية، الهرم، الجيزة" },
      zayed: { name: "زايد", address: "وصلة دهشور، الشيخ زايد" },
      "north-coast": { name: "الساحل الشمالي", address: "سكاي كورت مول، أمام أمواج" },
    },
  },
  consultation: {
    title: "احجز استشارة",
    intro: "قل لنا ماذا تبحث عنه وأين تفضل مقابلتنا. فريقنا يساعدك في اختيار المركبة المناسبة عند زيارتك.",
    formTitle: "خطط لزيارتك",
    name: "الاسم",
    namePlaceholder: "الاسم بالكامل",
    phone: "رقم الهاتف",
    phonePlaceholder: "+20",
    interest: "المركبة التي تهمك",
    interestPlaceholder: "اختر نوع المركبة",
    branch: "الفرع المفضل",
    branchPlaceholder: "اختر الفرع",
    date: "التاريخ المفضل",
    message: "هل هناك شيء تود إخبارنا به؟",
    messagePlaceholder: "موديل معين، سؤال، أو من سيرافقك...",
    submit: "اطلب موعدًا",
    preview: "هذه معاينة للنموذج — طلبات الحجز لا تُرسل حاليًا.",
    whatsappPrompt: "تريد ترتيب زيارة الآن؟",
    whatsappAction: "راسلنا على واتساب",
  },
  footer: {
    phone: "الهاتف وواتساب",
    email: "البريد الإلكتروني",
    follow: "تابعنا",
    call: "اتصل",
    write: "اكتب لنا",
    rights: "جميع الحقوق محفوظة.",
  },
  // U+2068/U+2069 isolate the Latin slug so bidi never splits "el-haram".
  slots: {
    image: (slug: string) => `مكان الصورة: \u2068${slug}\u2069`,
    video: (slug: string) => `مكان الفيديو: \u2068${slug}\u2069`,
    reel: (slug: string) => `مكان الريل: \u2068${slug}\u2069`,
  },
  whatsapp: {
    general: "مرحباً ZAG Motors، أريد الاستفسار عن مركباتكم.",
    about: (category: string) => `مرحباً ZAG Motors، أريد الاستفسار عن ${category}.`,
  },
};

function formatArabicNumber(n: number) {
  return new Intl.NumberFormat("ar-EG").format(n);
}

export const copy: Record<Locale, Copy> = { en, ar };

/** Intl locale tag used for number formatting in each UI language. */
export const numberLocale: Record<Locale, string> = { en: "en-US", ar: "ar-EG" };
