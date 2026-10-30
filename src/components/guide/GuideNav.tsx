import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getDestination, getPublishedCategories } from "@/lib/guide";

export async function GuideNav({ locale, destinationId }: { locale: string; destinationId: string }) {
  const t = await getTranslations({ locale, namespace: "guide" });
  const destination = getDestination(destinationId);
  const lang = locale === "en" ? "en" : "pt";
  const prefix = locale === "en" ? "/en" : "";
  if (!destination) return null;

  return (
    <nav aria-label={t("relatedLabel")} className="mt-12 border-t border-ncv-basalt/10 pt-8">
      <h2 className="font-serif text-2xl text-ncv-blue mb-4">{t("relatedTitle")}</h2>
      <ul className="space-y-1 text-ncv-blue font-semibold">
        {getPublishedCategories(destinationId).map((c) => (
          <li key={c}>
            <Link className="inline-block py-2 underline underline-offset-4" href={`${prefix}/guia/${destinationId}/${c}`}>
              {destination.categories[c].title[lang]}
            </Link>
          </li>
        ))}
        <li>
          <Link className="inline-block py-2 underline underline-offset-4" href={`${prefix}/guia/luanda-praia`}>
            {t("luandaTitle")}
          </Link>
        </li>
        <li>
          <Link className="inline-block py-2 underline underline-offset-4" href={`${prefix}/guia/como-escolhemos`}>
            {t("methodTitle")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
