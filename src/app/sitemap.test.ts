import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

const BASE = "https://noscaboverde.cv";
const entries = sitemap();
const urls = entries.map((e) => e.url);

describe("sitemap", () => {
  it("has English and Portuguese alternates on every entry", () => {
    for (const e of entries) {
      expect(e.alternates?.languages).toHaveProperty("pt");
      expect(e.alternates?.languages).toHaveProperty("en");
    }
  });

  it("has an English URL for every Portuguese page", () => {
    for (const url of urls.filter((u) => !u.startsWith(`${BASE}/en`))) {
      expect(urls).toContain(url.replace(BASE, `${BASE}/en`));
    }
  });

  it("omits routes that do not exist", () => {
    expect(urls.some((u) => u.includes("/agenda"))).toBe(false);
  });

  it("includes the always-on guide pages", () => {
    expect(urls).toContain(`${BASE}/guia/como-escolhemos`);
    expect(urls).toContain(`${BASE}/en/guia/luanda-praia`);
  });

  it("does not use the build date as lastModified", () => {
    const today = new Date().toISOString().slice(0, 10);
    const stale = entries.filter((e) => String(e.lastModified).startsWith(today));
    expect(stale.filter((e) => e.url.includes("/guia/"))).toEqual([]);
    expect(entries.every((e) => typeof e.lastModified === "string")).toBe(true);
  });
});
