import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { isMissing } from './utils/shared';

const regionalAsinSchema = z.object({
    us: z.string().optional(),
    de: z.string().optional(),
    fr: z.string().optional(),
    it: z.string().optional(),
    es: z.string().optional(),
}).strict();

// Generates id matching the old slug format: "de/product" from "de/product/index.mdx"
const reviewId = ({ entry }: { entry: string }) =>
    entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '');

// Обзоры
const reviewsCollection = defineCollection({
    loader: glob({
        pattern: '**/*.{md,mdx}',
        base: './src/content/reviews',
        generateId: reviewId,
    }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        lastUpdated: z.date().optional(),
        heroImage: z.union([image(), z.string()]).optional(),
        ogImage: z.union([image(), z.string()]).optional(),

        reviewType: z.enum(['standard', 'build']).default('standard'),
        category: z.enum([
            'gaming',
            'gaming-pcs',
            'monitors',
            'ai-workstation',
            'mini-pc',
            'nas',
            'sbc',
            'consoles'
        ]).optional(),

        asin: z.union([z.string(), regionalAsinSchema]).optional(),
        amazonUrl: z.string().url().optional(),
        priceCategory: z.enum(['budget', 'mid', 'high', 'enterprise']),
        rating: z.number().min(0).max(5),
        draft: z.boolean().default(false),

        pros: z.array(z.string()).optional(),
        cons: z.array(z.string()).optional(),
        specs: z.record(z.string(), z.string()).optional(),
        tags: z.array(z.string()).optional(),

        socialPublish: z.boolean().optional(),
        socialText: z.string().optional(),
        socialHighlights: z.array(z.string()).optional(),

        buildComponents: z.array(z.object({
            name: z.string(),
            asin: z.string(),
            category: z.string(),
            price: z.number().optional(),
            alternativeAsin: z.string().optional(),
            description: z.string().optional()
        })).optional(),

        monitorSpecs: z.object({
            resolution: z.string(),
            refreshRate: z.string(),
            panelType: z.string(),
            responseTime: z.string(),
            hdr: z.string().optional(),
            curvature: z.string().optional()
        }).optional(),

        gamingPerformance: z.object({
            fps1080p: z.record(z.string(), z.number()).optional(),
            fps1440p: z.record(z.string(), z.number()).optional(),
            fps4k: z.record(z.string(), z.number()).optional(),
            features: z.array(z.string()).optional()
        }).optional(),

        aiPerformance: z.object({
            vram: z.string(),
            tokensPerSecond: z.string().optional(),
            cudaCores: z.number().optional(),
            tensorCores: z.number().optional(),
            benchmarks: z.record(z.string(), z.string()).optional()
        }).optional(),
    }).refine((data) => {
        if (data.draft) return true;
        const hasDirectUrl = !isMissing(data.amazonUrl);
        const hasStringAsin = typeof data.asin === 'string' && !isMissing(data.asin);
        const hasObjectAsin = typeof data.asin === 'object'
            && data.asin !== null
            && Object.values(data.asin).some((value) => !isMissing(value));
        return hasDirectUrl || hasStringAsin || hasObjectAsin;
    }, {
        message: 'Published reviews must have at least one valid regional ASIN or amazonUrl',
        path: ['asin'],
    }),
});

// Категории и продукты — пустые коллекции (контент не используется)
const categoriesCollection = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/categories' }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        icon: z.string().optional(),
    }),
});

const productsCollection = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
    schema: z.object({
        title: z.string(),
    }),
});

const blogCollection = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()),
    }),
});

export const collections = {
    'products': productsCollection,
    'reviews': reviewsCollection,
    'categories': categoriesCollection,
    'blog': blogCollection,
};
