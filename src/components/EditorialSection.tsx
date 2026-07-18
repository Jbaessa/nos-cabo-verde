import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { editorialFeatures } from "@/lib/data";

const typeColors: Record<string, string> = {
  "história": "bg-ncv-blue text-white",
  "ilha da semana": "bg-ncv-gold text-ncv-night",
  "artista do mês": "bg-ncv-red text-white",
  "receita da semana": "bg-green-800 text-white",
};

export function EditorialSection() {
  const featured = editorialFeatures.find((f) => f.featured)!;
  const secondary = editorialFeatures.filter((f) => !f.featured);

  return (
    <section className="bg-ncv-salt py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
                Editorial
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ncv-night leading-tight">
              Em Destaque
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-ncv-blue text-sm font-sans font-medium hover:gap-4 transition-all"
          >
            Ver todas as histórias <ArrowRight size={15} />
          </a>
        </div>

        {/* Editorial grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured large card */}
          <div className="lg:col-span-2 group cursor-pointer">
            <div className="relative h-[300px] sm:h-[380px] lg:h-[540px] overflow-hidden rounded-2xl mb-5">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/90 via-ncv-night/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">
                <span
                  className={`inline-block text-xs font-sans font-bold tracking-widest uppercase px-3.5 py-1 mb-4 rounded-full ${typeColors[featured.type]}`}
                >
                  {featured.type}
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl text-white leading-tight mb-3">
                  {featured.title}
                </h3>
                <p className="text-white/60 text-sm font-sans mb-5">{featured.subtitle}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs font-sans">
                    <Clock size={12} />
                    {featured.readTime} de leitura
                  </div>
                  <div className="h-px w-8 bg-white/20" />
                  <span className="text-white/40 text-xs font-sans">{featured.island}</span>
                </div>
              </div>
            </div>

            {/* Read more link */}
            <Link
              href={`/historias/${featured.id}`}
              className="inline-flex items-center gap-2 text-ncv-blue text-sm font-sans font-semibold hover:gap-4 transition-all group"
            >
              Ler a história <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Secondary cards */}
          <div className="flex flex-col gap-6">
            {secondary.map((item) => (
              <div key={item.id} className="group cursor-pointer flex gap-4 items-start">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`inline-block text-[10px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 mb-2 ${typeColors[item.type]}`}
                  >
                    {item.type}
                  </span>
                  <h4 className="font-serif text-base text-ncv-night leading-snug group-hover:text-ncv-blue transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock size={10} className="text-ncv-gold" />
                    <span className="text-ncv-basalt/40 text-xs font-sans">{item.readTime}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Promotional card */}
            <div className="bg-ncv-night p-6 mt-auto">
              <p className="text-ncv-gold text-xs font-sans tracking-widest uppercase mb-3">
                Comunidade
              </p>
              <h4 className="font-serif text-xl text-white mb-3">
                Conta a tua história de Cabo Verde
              </h4>
              <p className="text-white/40 text-xs font-sans leading-relaxed mb-5">
                Cada família guarda um pedaço de Cabo Verde. Partilha o teu.
              </p>
              <a
                href="#"
                className="btn btn-gold text-xs font-bold tracking-wide uppercase px-6 py-2.5"
              >
                Partilhar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
