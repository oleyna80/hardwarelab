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
    // Replace with your Amazon Affiliate Tag after approval
    affiliateTag: import.meta.env.PUBLIC_AMAZON_AFFILIATE_TAG || 'YOUR_AMAZON_TAG-20',

    // Amazon domain by country (default: US)
    domain: import.meta.env.PUBLIC_AMAZON_DOMAIN || 'amazon.com',

    // Associate link structure
    getAffiliateLink: (asin: string) => {
        const tag = AMAZON_CONFIG.affiliateTag;
        const domain = AMAZON_CONFIG.domain;
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
