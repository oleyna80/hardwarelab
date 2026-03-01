import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const BASE_URL = 'https://hardwarelab.org';
const FEED_LIMIT = 20;
const ALLOWED_FEED_LANGS = new Set(['en', 'fr', 'de', 'ru', 'es', 'it']);

function normalizeImage(
    heroImage: unknown,
): string | undefined {
    if (!heroImage) return undefined;
    if (typeof heroImage === 'string') return heroImage;

    if (typeof heroImage === 'object' && heroImage !== null && 'src' in heroImage) {
        const src = (heroImage as { src?: unknown }).src;
        return typeof src === 'string' ? src : undefined;
    }

    return undefined;
}

function buildReviewUrl(slug: string): {
    lang: string;
    reviewSlug: string;
    path: string;
    url: string;
} | null {
    const [langRaw, ...slugParts] = slug.split('/');
    const reviewSlug = slugParts.join('/');
    if (!langRaw || !reviewSlug) return null;

    const lang = langRaw.toLowerCase();
    if (!ALLOWED_FEED_LANGS.has(lang)) return null;

    const localizedPath = lang === 'en'
        ? `/reviews/${reviewSlug}`
        : `/${lang}/reviews/${reviewSlug}`;
    const url = new URL(localizedPath, BASE_URL).toString();
    return {
        lang,
        reviewSlug,
        path: localizedPath,
        url,
    };
}

export const GET: APIRoute = async () => {
    const allReviews = await getCollection('reviews');
    const sortedReviews = allReviews.sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );

    const feed = sortedReviews
        .map((review) => {
            const urlMeta = buildReviewUrl(review.slug);
            if (!urlMeta) return null;

            return {
                title: review.data.title,
                description: review.data.description,
                pubDate: review.data.pubDate.toISOString(),
                lang: urlMeta.lang,
                slug: urlMeta.reviewSlug,
                path: urlMeta.path,
                url: urlMeta.url,
                category: review.data.category || 'general',
                tags: review.data.tags || [],
                rating: review.data.rating,
                priceCategory: review.data.priceCategory,
                socialText: review.data.socialText,
                socialHighlights: review.data.socialHighlights || [],
                image: normalizeImage(review.data.heroImage),
            };
        })
        .filter(Boolean)
        .slice(0, FEED_LIMIT);

    return new Response(JSON.stringify(feed), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
};
