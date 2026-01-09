import { test, expect } from '@playwright/test';

test.describe('Amazon Affiliate Compliance', () => {

    test('all affiliate links have required rel attributes', async ({ page }) => {
        await page.goto('/');

        const amazonLinks = page.locator('a[href*="amazon."]');
        const count = await amazonLinks.count();

        for (let i = 0; i < count; i++) {
            const link = amazonLinks.nth(i);
            const rel = await link.getAttribute('rel');
            const href = await link.getAttribute('href');

            expect(rel, `Link ${href} missing rel`).toBeTruthy();
            expect(rel).toContain('nofollow');
            expect(rel).toContain('sponsored');
        }
    });

    test('all affiliate links have tag parameter', async ({ page }) => {
        await page.goto('/');

        const amazonLinks = page.locator('a[href*="amazon."]');
        const count = await amazonLinks.count();

        for (let i = 0; i < count; i++) {
            const href = await amazonLinks.nth(i).getAttribute('href');
            expect(href).toMatch(/[?&]tag=/);
        }
    });

    test('disclosure visible on pages with affiliate links', async ({ page }) => {
        await page.goto('/');

        const amazonLinks = page.locator('a[href*="amazon."]');
        const hasAffiliateLinks = await amazonLinks.count() > 0;

        if (hasAffiliateLinks) {
            const disclosure = page.locator('text=/Amazon Associate|Partenaire Amazon|Amazon-Partner|партнер Amazon/i');
            await expect(disclosure.first()).toBeVisible();
        }
    });

    test('affiliate links open in new tab', async ({ page }) => {
        await page.goto('/');

        const amazonLinks = page.locator('a[href*="amazon."]');
        const count = await amazonLinks.count();

        for (let i = 0; i < count; i++) {
            const target = await amazonLinks.nth(i).getAttribute('target');
            expect(target).toBe('_blank');
        }
    });
});
