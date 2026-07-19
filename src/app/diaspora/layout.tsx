import type { Metadata } from "next";

const BASE = "https://noscaboverde.cv";

export const metadata: Metadata = {
  title: "Diáspora Cabo-Verdiana: histórias, comunidades e raízes",
  description:
    "Descobre a diáspora cabo-verdiana: 700 000 cabo-verdianos espalhados pelo mundo. Histórias de Portugal, EUA, França, Holanda e muito mais.",
  alternates: { canonical: `${BASE}/diaspora` },
  openGraph: {
    title: "Diáspora Cabo-Verdiana — Nós Cabo Verde",
    description:
      "700 000 cabo-verdianos no mundo. Histórias, comunidades e raízes da diáspora cabo-verdiana.",
    url: `${BASE}/diaspora`,
    type: "website",
    locale: "pt_CV",
    siteName: "Nós Cabo Verde",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diáspora Cabo-Verdiana — Nós Cabo Verde",
    description:
      "700 000 cabo-verdianos no mundo. Histórias, comunidades e raízes.",
  },
};

export default function DiasporaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
