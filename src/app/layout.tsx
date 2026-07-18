import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/lib/favorites-context";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
  description:
    "Portal digital da cultura, beleza e identidade cabo-verdiana. Descobre as dez ilhas, a música, a gastronomia, o povo e as experiências autênticas de Cabo Verde.",
  keywords: ["Cabo Verde", "cultura", "turismo", "ilhas", "música", "gastronomia", "diáspora"],
  openGraph: {
    title: "Nós Cabo Verde",
    description: "Dez ilhas. Um povo. Uma alma.",
    locale: "pt_CV",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${dmSerif.variable} ${manrope.variable}`}>
      <body className="min-h-screen antialiased">
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
