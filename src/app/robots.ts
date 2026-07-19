import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/conta/", "/favoritos/", "/perfil/", "/pesquisa?"],
      },
    ],
    sitemap: "https://noscaboverde.cv/sitemap.xml",
  };
}
