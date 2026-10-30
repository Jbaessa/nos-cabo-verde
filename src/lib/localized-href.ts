export function localizedHref(href: string, locale: string): string {
  if (locale !== "en" || !href.startsWith("/")) return href;
  return href === "/" ? "/en" : `/en${href}`;
}
