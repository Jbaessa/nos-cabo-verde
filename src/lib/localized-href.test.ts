import { describe, expect, it } from "vitest";
import { localizedHref } from "./localized-href";

describe("localizedHref", () => {
  it("leaves Portuguese links unprefixed", () => {
    expect(localizedHref("/ilhas", "pt")).toBe("/ilhas");
  });

  it("prefixes English internal links", () => {
    expect(localizedHref("/ilhas", "en")).toBe("/en/ilhas");
    expect(localizedHref("/", "en")).toBe("/en");
    expect(localizedHref("/#cultura", "en")).toBe("/en/#cultura");
  });

  it("leaves external and mail links alone", () => {
    expect(localizedHref("mailto:a@b.cv", "en")).toBe("mailto:a@b.cv");
    expect(localizedHref("https://x.example", "en")).toBe("https://x.example");
    expect(localizedHref("#", "en")).toBe("#");
  });
});
