import type { Metadata, Viewport } from "next";
import { Archivo, Cairo, Unbounded } from "next/font/google";
import { copy } from "@/i18n/copy";
import { site } from "@/data/site";
import { I18nProvider } from "@/lib/i18n";
import { localeBootScript } from "@/lib/locale-boot";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Only fetched once Arabic text is on screen, so English visitors skip it.
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: copy.en.meta.title,
  description: copy.en.meta.description,
  icons: { icon: site.logo },
  openGraph: {
    title: copy.en.meta.title,
    description: copy.en.meta.description,
    siteName: "ZAG Motors",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      // The boot script may set lang/dir before hydration for Arabic readers.
      suppressHydrationWarning
      className={`${unbounded.variable} ${archivo.variable} ${cairo.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeBootScript }} />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
