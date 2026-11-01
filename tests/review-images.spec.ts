import { test, expect, type Locator, type Page } from '@playwright/test';
import sharp from 'sharp';
import path from 'node:path';

async function loaded(image: Locator) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(async (img: HTMLImageElement) => {
        try { await img.decode(); return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0; }
        catch { return false; }
    })).toBe(true);
}

async function social(page: Page) {
    const og = await page.locator('meta[property="og:image"]').getAttribute('content');
    const twitter = await page.locator('meta[property="twitter:image"]').getAttribute('content');
    expect(og).toBeTruthy();
    expect(twitter).toBe(og);
    const url = new URL(og!);
    expect(url.hostname).toBe('hardwarelab.org');
    const response = await page.request.get(`http://127.0.0.1:4321${url.pathname}${url.search}`);
    expect(response.ok()).toBeTruthy();
    const { data, info } = await sharp(await response.body()).raw().toBuffer({ resolveWithObject: true });
    expect(info.width).toBeGreaterThan(0);
    expect(info.height).toBeGreaterThan(0);
    expect(data.length).toBe(info.width * info.height * info.channels);
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemas.join(' ')).toContain(og);
}

async function sameProduct(image: Locator, page: Page, expected: string) {
    const src = await image.getAttribute('src');
    expect(src).toBeTruthy();
    const response = await page.request.get(new URL(src!, 'http://127.0.0.1:4321').toString());
    expect(response.ok()).toBeTruthy();
    const actual = await sharp(await response.body()).resize(32, 32, { fit: 'fill' }).removeAlpha().raw().toBuffer();
    const source = await sharp(path.join(process.cwd(), expected)).resize(32, 32, { fit: 'fill' }).removeAlpha().raw().toBuffer();
    const meanError = actual.reduce((sum, value, i) => sum + Math.abs(value - (source[i] ?? 0)), 0) / actual.length;
    expect(meanError).toBeLessThan(20);
}

for (const lang of ['en', 'fr', 'de', 'ru']) {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
        test(`Steam Deck ${lang} ${viewport.width}: hero, social, and related`, async ({ page }) => {
            await page.setViewportSize(viewport);
            await page.goto(`${lang === 'en' ? '' : `/${lang}`}/reviews/steam-deck-oled`);
            const hero = page.locator('.review-hero img');
            await expect(hero).toHaveCount(1);
            await expect(hero).toHaveAttribute('alt', /Steam Deck OLED/i);
            await loaded(hero);
            await sameProduct(hero, page, `src/content/reviews/${lang}/steam-deck-oled/image.webp`);
            await social(page);
            const related = page.locator('a[href="/reviews/rog-ally-z1-2024-asus-512gb-white"] img').last();
            await expect(related).toBeVisible();
            await loaded(related);
        });
    }
    test(`Steam Deck listing card ${lang}`, async ({ page }) => {
        await page.goto(`${lang === 'en' ? '' : `/${lang}`}/reviews`);
        const card = page.locator(`a[href="${lang === 'en' ? '' : `/${lang}`}/reviews/steam-deck-oled"] img`).first();
        await loaded(card);
        await sameProduct(card, page, `src/content/reviews/${lang}/steam-deck-oled/image.webp`);
    });
}

test('Samsung corrected hero renders', async ({ page }) => {
    await page.goto('/reviews/samsung-57-odyssey-neo-g9-g95nc');
    const hero = page.locator('.review-hero img');
    await loaded(hero);
    await sameProduct(hero, page, 'src/content/reviews/en/samsung-57-odyssey-neo-g9-g95nc/image.webp');
    await social(page);
});
for (const lang of ['fr', 'de', 'ru']) {
    for (const slug of ['playstation-5-disc-slim', 'raspberry-pi-5']) {
        test(`${lang} ${slug} social uses existing asset`, async ({ page }) => {
            await page.goto(`/${lang}/reviews/${slug}`);
            await loaded(page.locator('.review-hero img'));
            await social(page);
        });
    }
}
