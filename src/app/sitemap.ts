import type { MetadataRoute } from "next";
import { islands, editorialFeatures, experiences, events } from "@/lib/data";

const BASE = "https://noscaboverde.cv";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/ilhas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/experiencias`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/diaspora`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/parceiros`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const islandPages: MetadataRoute.Sitemap = islands.map((island) => ({
    url: `${BASE}/ilhas/${island.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const articlePages: MetadataRoute.Sitemap = editorialFeatures.map((a) => ({
    url: `${BASE}/historias/${a.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const experiencePages: MetadataRoute.Sitemap = experiences.map((e) => ({
    url: `${BASE}/experiencias/${e.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const eventPages: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${BASE}/agenda/${e.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  return [...staticPages, ...islandPages, ...articlePages, ...experiencePages, ...eventPages];
}
