import { describe, expect, it } from "vitest";
import ptMessages from "../../messages/pt.json";
import enMessages from "../../messages/en.json";
import { partners } from "./data";

describe("partners", () => {
  it("only lists partners with a recorded verification", () => {
    for (const p of partners) {
      expect(p.verifiedAt).toBeTruthy();
      expect(p.verificationSource).toBeTruthy();
    }
  });

  it("does not claim verified partners when there are none", () => {
    if (partners.length > 0) return;
    expect(ptMessages.partnersPage.desc).not.toContain("{count}");
    expect(enMessages.partnersPage.desc).not.toContain("{count}");
    expect(ptMessages.partnersPage.headingHighlight).not.toBe("verificados");
    expect(enMessages.partnersPage.heading.toLowerCase()).not.toContain("verified");
  });
});

describe("footer guide links", () => {
  it("has the guide labels in the namespace the footer reads", () => {
    for (const m of [ptMessages, enMessages]) {
      expect(m.footerFull.linkPraiaGuide).toBeTruthy();
      expect(m.footerFull.linkLuandaPraia).toBeTruthy();
    }
  });
});
