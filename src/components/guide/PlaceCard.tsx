import { ExternalLink } from "lucide-react";
import type { Place } from "@/lib/guide";

type Labels = {
  bestFor: string;
  price: string;
  website: string;
  book: string;
  checked: string;
  reviews: string;
  fewReviews: string;
};

export function PlaceCard({ place, lang, labels }: { place: Place; lang: "pt" | "en"; labels: Labels }) {
  return (
    <article className="bg-white rounded-2xl border border-ncv-basalt/10 p-5 lg:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-serif text-xl text-ncv-blue">{place.name}</h3>
        <span className="text-sm text-ncv-basalt/60" aria-label={`${labels.price}: ${place.priceBand}/4`}>
          {"$".repeat(place.priceBand)}
        </span>
      </div>
      <p className="text-sm text-ncv-basalt/60 mt-1">{place.zone[lang]}</p>
      <p className="text-ncv-basalt/80 mt-3 leading-relaxed">{place.why[lang]}</p>
      <p className="text-sm text-ncv-basalt/70 mt-3">
        <strong className="font-semibold">{labels.bestFor}:</strong> {place.bestFor[lang]}
      </p>
      <ul className="mt-4 space-y-1 text-xs text-ncv-basalt/60">
        {place.ratings.map((r) => (
          <li key={r.source}>
            <a href={r.url} target="_blank" rel="nofollow noopener" className="underline underline-offset-2">
              {r.source}
            </a>
            {`: ${r.score.toLocaleString(lang)}/5 · ${r.reviews.toLocaleString(lang)} ${labels.reviews} · ${labels.checked} ${r.checkedAt}`}
          </li>
        ))}
        {place.lowReviewCategory && <li>{labels.fewReviews}</li>}
      </ul>
      <div className="flex flex-wrap gap-4 mt-4 text-sm font-semibold text-ncv-blue">
        {place.website && (
          <a href={place.website} target="_blank" rel="nofollow noopener" className="inline-flex items-center gap-1.5 min-h-11">
            {labels.website} <ExternalLink size={14} />
          </a>
        )}
        {place.bookingUrl && (
          <a href={place.bookingUrl} target="_blank" rel="nofollow noopener" className="inline-flex items-center gap-1.5 min-h-11">
            {labels.book} <ExternalLink size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
