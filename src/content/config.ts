import { z, defineCollection } from 'astro:content';

// Продукты
const productsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.enum(['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'cooling', 'psu', 'case']),
        manufacturer: z.string(),
        model: z.string(),
        releaseDate: z.date(),
        specs: z.record(z.string(), z.any()),
        affiliateLinks: z.array(z.object({
            retailer: z.string(),
            url: z.string().url(),
            price: z.number(),
        })).optional(),
        featured: z.boolean().default(false),
        image: z.string().optional(),
    }),
});

// Обзоры
const reviewsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        lastUpdated: z.date().optional(),
        heroImage: z.string().optional(),
        ogImage: z.string().optional(),

        // Expansion fields
        reviewType: z.enum(['standard', 'build']).default('standard'),
        category: z.enum([
            'gaming',
            'monitors',
            'ai-workstation',
            'mini-pc',
            'nas',
            'sbc'
        ]).optional(), // Optional for backward compatibility with existing content

        amazonAsin: z.string(),
        priceCategory: z.enum(['budget', 'mid', 'high', 'enterprise']),
        rating: z.number().min(0).max(5),

        // Optional fields as data is in MDX components
        pros: z.array(z.string()).optional(),
        cons: z.array(z.string()).optional(),
        specs: z.record(z.string(), z.string()).optional(),

        tags: z.array(z.string()).optional(),

        // Build Review Components (Multi-ASIN)
        buildComponents: z.array(z.object({
            name: z.string(),
            asin: z.string(),
            category: z.string(), // cpu, gpu, ram, etc.
            price: z.number().optional(),
            alternativeAsin: z.string().optional(),
            description: z.string().optional()
        })).optional(),

        // Specialized Specs
        monitorSpecs: z.object({
            resolution: z.string(),
            refreshRate: z.string(),
            panelType: z.string(),
            responseTime: z.string(),
            hdr: z.string().optional(),
            curvature: z.string().optional()
        }).optional(),

        gamingPerformance: z.object({
            fps1080p: z.record(z.string(), z.number()).optional(), // game -> fps
            fps1440p: z.record(z.string(), z.number()).optional(),
            fps4k: z.record(z.string(), z.number()).optional(),
            features: z.array(z.string()).optional() // DLSS, Ray Tracing support etc.
        }).optional(),

        aiPerformance: z.object({
            vram: z.string(),
            tokensPerSecond: z.string().optional(), // for LLMs
            cudaCores: z.number().optional(),
            tensorCores: z.number().optional(),
            benchmarks: z.record(z.string(), z.string()).optional()
        }).optional(),
    }),
});

// Категории
const categoriesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        icon: z.string().optional(),
    }),
});

// Блог
const blogCollection = defineCollection({
    type: 'content',
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