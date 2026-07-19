import type { Metadata } from "next";

const BASE = "https://noscaboverde.cv";

export const metadata: Metadata = {
  title: "Experiências em Cabo Verde: trekking, kitesurf, mergulho e cultura",
  description:
    "Reserva experiências autênticas em Cabo Verde: trekking no Vale de Paul, kitesurf no Sal, mergulho em Santa Luzia, ascensão ao Pico do Fogo e muito mais.",
  alternates: { canonical: `${BASE}/experiencias` },
  openGraph: {
    title: "Experiências em Cabo Verde — Nós Cabo Verde",
    description:
      "Trekking, kitesurf, mergulho, gastronomia e cultura. Experiências autênticas em todas as ilhas de Cabo Verde.",
    url: `${BASE}/experiencias`,
    type: "website",
    locale: "pt_CV",
    siteName: "Nós Cabo Verde",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiências em Cabo Verde — Nós Cabo Verde",
    description:
      "Trekking, kitesurf, mergulho e cultura. Experiências autênticas em todas as ilhas.",
  },
};

export default function ExperienciasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
