import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { editorialFeatures } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const typeColors: Record<string, string> = {
  "história": "bg-ncv-blue text-white",
  "ilha da semana": "bg-ncv-gold text-ncv-night",
  "artista do mês": "bg-ncv-red text-white",
  "receita da semana": "bg-green-800 text-white",
};

export function generateStaticParams() {
  return editorialFeatures.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = editorialFeatures.find((a) => a.id === id);
  if (!article) return {};
  return {
    title: `${article.title} — Nós Cabo Verde`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = editorialFeatures.find((a) => a.id === id);
  if (!article) notFound();

  const others = editorialFeatures.filter((a) => a.id !== id);

  return (
    <>
      <Navbar />
      <main className="bg-ncv-salt min-h-screen">
        {/* Hero */}
        <div className="relative h-[58vh] lg:h-[72vh] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/25 to-ncv-night/10" />

          {/* Back */}
          <div className="absolute top-6 left-6 lg:top-8 lg:left-12">
            <Link
              href="/#editorial"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-sans group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Link>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-16 pb-12 lg:pb-16 max-w-5xl">
            <span
              className={`inline-block text-xs font-sans font-bold tracking-widest uppercase px-3.5 py-1 mb-5 rounded-full ${typeColors[article.type] ?? "bg-ncv-blue text-white"}`}
            >
              {article.type}
            </span>
            <h1 className="font-serif text-3xl lg:text-5xl xl:text-6xl text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-white/55 text-base lg:text-lg font-sans mb-7 max-w-2xl">
              {article.subtitle}
            </p>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-white/35 text-xs font-sans">
                <Clock size={12} />
                {article.readTime} de leitura
              </div>
              <div className="h-px w-6 bg-white/15" />
              <div className="flex items-center gap-1.5 text-white/35 text-xs font-sans">
                <MapPin size={12} />
                {article.island}
              </div>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-2xl mx-auto px-6 pt-16 pb-28">
          {"body" in article && article.body ? (
            article.body.map((section, i) => (
              <div key={i}>
                {"heading" in section && section.heading && (
                  <h2 className="font-serif text-2xl lg:text-3xl text-ncv-night mt-14 mb-6">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p: string, j: number) => (
                  <p
                    key={j}
                    className={`font-sans leading-[1.85] mb-7 ${
                      i === 0
                        ? "text-xl lg:text-[22px] text-ncv-night/75 font-light"
                        : "text-[15px] lg:text-base text-ncv-basalt/60"
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p className="text-ncv-basalt/30 font-sans text-center py-24 text-sm">
              Artigo completo em breve.
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-ncv-basalt/8 max-w-7xl mx-auto" />

        {/* More articles */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-12 bg-ncv-gold" />
            <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
              Continua a ler
            </span>
          </div>
          <h3 className="font-serif text-4xl text-ncv-night mb-10">Mais histórias</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((item) => (
              <Link key={item.id} href={`/historias/${item.id}`} className="group">
                <div className="relative h-52 overflow-hidden rounded-2xl mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`inline-block text-[10px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${typeColors[item.type] ?? "bg-ncv-blue text-white"}`}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
                <h4 className="font-serif text-base text-ncv-night group-hover:text-ncv-blue transition-colors leading-snug mb-1.5">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-ncv-basalt/35 text-xs font-sans">
                  <Clock size={10} />
                  {item.readTime} de leitura
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
