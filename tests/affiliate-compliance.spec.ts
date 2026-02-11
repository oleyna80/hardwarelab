import { test, expect, type Page } from '@playwright/test';

const TAG_PATTERN = /[?&]tag=/i;
const PRODUCT_PATH_PATTERN = /amazon\.[^/]+\/(?:[^"]*\/)?(?:dp|gp\/product|gp\/aw\/d|exec\/obidos\/ASIN)\//i;

const isMonetizedAmazonLink = (href: string) =>
    TAG_PATTERN.test(href) || PRODUCT_PATH_PATTERN.test(href);

async function getAmazonLinks(page: Page) {
    const amazonLinks = page.locator('a[href*="amazon."]');
    const count = await amazonLinks.count();
    const links: Array<{ href: string; rel: string; target: string }> = [];

    for (let i = 0; i < count; i++) {
        const link = amazonLinks.nth(i);
        links.push({
            href: (await link.getAttribute('href')) ?? '',
            rel: (await link.getAttribute('rel')) ?? '',
            target: (await link.getAttribute('target')) ?? '',
        });
    }

    return links;
}

test.describe('Amazon Affiliate Compliance', () => {

    test('all affiliate links have required rel attributes', async ({ page }) => {
        await page.goto('/');

        const links = await getAmazonLinks(page);
        const monetizedLinks = links.filter((link) => isMonetizedAmazonLink(link.href));

        for (const link of monetizedLinks) {
            expect(link.rel, `Link ${link.href} missing rel`).toBeTruthy();
            expect(link.rel).toContain('nofollow');
            expect(link.rel).toContain('sponsored');
        }
    });

    test('all Amazon product links have tag parameter', async ({ page }) => {
        await page.goto('/');

        const links = await getAmazonLinks(page);
        const productLinks = links.filter((link) => PRODUCT_PATH_PATTERN.test(link.href));

        for (const link of productLinks) {
            expect(link.href).toMatch(TAG_PATTERN);
        }
    });

    test('disclosure visible on pages with affiliate links', async ({ page }) => {
        await page.goto('/');

        const links = await getAmazonLinks(page);
        const hasAffiliateLinks = links.some((link) => TAG_PATTERN.test(link.href));

        if (hasAffiliateLinks) {
            const disclosure = page.locator('text=/Amazon Associate|Partenaire Amazon|Amazon-Partner|партнер Amazon/i');
            await expect(disclosure.first()).toBeVisible();
        }
    });

    test('affiliate links open in new tab', async ({ page }) => {
        await page.goto('/');

        const links = await getAmazonLinks(page);
        const monetizedLinks = links.filter((link) => isMonetizedAmazonLink(link.href));

        for (const link of monetizedLinks) {
            expect(link.target).toBe('_blank');
        }
    });
});
