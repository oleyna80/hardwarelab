import { describe, expect, it } from "vitest";
import { classifyRoute, isMoneyPage } from "./routing";

describe("classifyRoute", () => {
    it("classifies localized category details as money pages", () => {
        expect(classifyRoute("/fr/categories/mini-pc")).toMatchObject({
            kind: "category-detail",
            lang: "fr",
            isLocalized: true,
            isMoneyPage: true,
            category: "mini-pc",
        });
        expect(isMoneyPage("/fr/categories/mini-pc")).toBe(true);
    });

    it("rejects unknown localized category slugs", () => {
        expect(classifyRoute("/fr/categories/not-a-category")).toMatchObject({
            kind: "other",
            lang: "fr",
            isLocalized: true,
            isMoneyPage: false,
        });
        expect(isMoneyPage("/fr/categories/not-a-category")).toBe(false);
    });

    it("rejects English category paths as localized category details", () => {
        expect(classifyRoute("/en/categories/mini-pc")).toMatchObject({
            kind: "other",
            lang: "en",
            isLocalized: true,
            isMoneyPage: false,
        });
        expect(isMoneyPage("/en/categories/mini-pc")).toBe(false);
    });

    it("rejects localized category paths with extra segments", () => {
        expect(classifyRoute("/fr/categories/mini-pc/extra")).toMatchObject({
            kind: "other",
            lang: "fr",
            isLocalized: true,
            isMoneyPage: false,
        });
        expect(isMoneyPage("/fr/categories/mini-pc/extra")).toBe(false);
    });
});
