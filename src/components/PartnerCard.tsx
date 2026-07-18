type Partner = {
  id: string;
  name: string;
  type: string;
  island: string;
  islandId: string;
  description: string;
  image: string;
  verified: boolean;
  badge: string;
  website: string;
};

type Props = { partner: Partner };

const typeColors: Record<string, string> = {
  Hotel: "bg-ncv-blue/40 text-sky-300",
  Restaurante: "bg-amber-900/40 text-amber-300",
  "Operador Turístico": "bg-emerald-900/40 text-emerald-300",
  "Escola de Desporto": "bg-purple-900/40 text-purple-300",
};

export function PartnerCard({ partner }: Props) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={partner.image}
          alt={partner.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-sans font-medium ${typeColors[partner.type] ?? "bg-white/20 text-white"}`}>
            {partner.type}
          </span>
          {partner.verified && (
            <span className="px-2.5 py-1 rounded-full bg-ncv-gold/90 text-ncv-night text-xs font-sans font-semibold flex items-center gap-1">
              <svg viewBox="0 0 20 20" className="w-3 h-3 fill-current">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {partner.badge}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-lg text-white leading-snug">{partner.name}</h3>
        </div>
        <p className="text-ncv-gold/80 text-xs font-sans mb-3">{partner.island}</p>
        <p className="text-white/60 text-sm font-sans line-clamp-3 flex-1 mb-4">{partner.description}</p>

        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-glass text-xs py-2.5 text-center w-full"
        >
          Visitar site
        </a>
      </div>
    </div>
  );
}
