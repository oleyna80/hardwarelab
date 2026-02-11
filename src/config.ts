/**
 * Site Configuration
 * 
 * Centralized configuration for domain, affiliate IDs, and analytics.
 * Update these values after domain registration and Amazon Associates approval.
 */

// Site Domain
export const SITE_DOMAIN = import.meta.env.PUBLIC_SITE_DOMAIN || 'https://hardwarelab.example.com';

// Amazon Affiliate Configuration
export const AMAZON_CONFIG = {
    // Regional domains
    domains: {
        us: 'amazon.com',
        de: 'amazon.de',
        fr: 'amazon.fr',
    } as Record<string, string>,

    // Regional affiliate tags
    tags: {
        us: import.meta.env.PUBLIC_AMAZON_TAG_US || 'YOUR_TAG-20',
        de: import.meta.env.PUBLIC_AMAZON_TAG_DE || 'YOUR_TAG-03',
        fr: import.meta.env.PUBLIC_AMAZON_TAG_FR || 'YOUR_TAG-21',
    } as Record<string, string>,

    // Build affiliate link for a specific region
    getAffiliateLink: (asin: string, region: string = 'us'): string => {
        const domain = AMAZON_CONFIG.domains[region] || AMAZON_CONFIG.domains.us;
        const tag = AMAZON_CONFIG.tags[region] || AMAZON_CONFIG.tags.us;
        return `https://www.${domain}/dp/${asin}?tag=${tag}`;
    }
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
    // Google Analytics 4 Measurement ID
    googleAnalyticsId: import.meta.env.PUBLIC_GA_ID || '',

    // Enable/disable analytics (useful for local development)
    enabled: import.meta.env.PUBLIC_ANALYTICS_ENABLED !== 'false'
};

// Site Metadata
export const SITE_CONFIG = {
    name: 'HardwareLab',
    description: 'Expert hardware reviews for Mini PCs, game consoles, NAS, and single board computers',
    author: 'HardwareLab Team',
    email: 'contact@hardwarelab.com',

    // Social links (update when available)
    social: {
        twitter: '',
        github: '',
        linkedin: ''
    }
};
