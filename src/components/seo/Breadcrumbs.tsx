import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StructuredData } from "./StructuredData";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  dark?: boolean;
}

const BASE = "https://noscaboverde.cv";

export function Breadcrumbs({ items, dark = false }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE}${item.href}` } : {}),
    })),
  };

  const textClass = dark
    ? "text-white/40 hover:text-white/70"
    : "text-ncv-basalt/40 hover:text-ncv-basalt/70";
  const currentClass = dark ? "text-white/70" : "text-ncv-basalt/70";
  const separatorClass = dark ? "text-white/20" : "text-ncv-basalt/20";

  return (
    <>
      <StructuredData data={jsonLd} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans flex-wrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={11} className={separatorClass} />}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className={`transition-colors ${textClass}`}>
                {item.label}
              </Link>
            ) : (
              <span className={currentClass} aria-current={i === items.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
