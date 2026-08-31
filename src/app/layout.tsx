import type { Metadata } from "next";
import { Cormorant_Garamond, Italiana, Manrope } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { images } from "@/lib/images";
import "./globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italiana",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

const title = "ONAS | Estética Integral en Lanús Oeste";
const description =
  "ONAS — Clínica de estética integral en Lanús Oeste. Tratamientos faciales, Botox, ácido hialurónico, masoterapia facial y más. Reservá tu turno.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://onas-estetica.local",
  ),
  title,
  description,
  keywords: [
    "ONAS",
    "estética integral",
    "Lanús Oeste",
    "Botox",
    "ácido hialurónico",
    "masoterapia facial",
    "tratamientos faciales",
  ],
  openGraph: {
    title,
    description,
    locale: "es_AR",
    type: "website",
    siteName: "ONAS",
    images: [
      {
        url: images.og,
        width: 1200,
        height: 630,
        alt: "ONAS — estética integral en Lanús Oeste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [images.og],
  },
  icons: {
    icon: images.logo,
    apple: images.logo,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${italiana.variable} ${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-ivory font-sans text-ink">
        <JsonLd />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
