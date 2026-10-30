import type { MetadataRoute } from "next";
import { islands, editorialFeatures, experiences } from "@/lib/data";
import { guideAllPaths } from "@/lib/guide";

const BASE = "https://noscaboverde.cv";
const SITE_UPDATED_AT = "2026-10-30";

type Frequency = MetadataRoute.Sitemap[number]["changeFrequency"];

function localized(path: string, priority: number, changeFrequency: Frequency, lastModified = SITE_UPDATED_AT): MetadataRoute.Sitemap {
  const pt = `${BASE}${path}`;
  const en = `${BASE}/en${path}`;
  const languages = { pt, en };
  return [
    { url: pt, lastModified, changeFrequency, priority, alternates: { languages } },
    { url: en, lastModified, changeFrequency, priority, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized("", 1, "weekly"),
    ...localized("/ilhas", 0.9, "weekly"),
    ...localized("/experiencias", 0.8, "weekly"),
    ...localized("/diaspora", 0.7, "monthly"),
    ...localized("/parceiros", 0.5, "monthly"),
    ...islands.flatMap((island) => localized(`/ilhas/${island.id}`, 0.9, "monthly")),
    ...editorialFeatures.flatMap((a) => localized(`/historias/${a.id}`, 0.75, "monthly")),
    ...experiences.flatMap((e) => localized(`/experiencias/${e.id}`, 0.7, "monthly")),
    ...guideAllPaths().flatMap((p) => localized(p.path, 0.9, "monthly", p.lastModified)),
  ];
}
