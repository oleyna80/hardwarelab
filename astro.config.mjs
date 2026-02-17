import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        mdx(),
        sitemap(),
        partytown({
            config: {
                forward: ["dataLayer.push"],
            },
        }),
    ],
    output: 'static',
    site: process.env.PUBLIC_SITE_DOMAIN || 'https://hardwarelab.org',
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'fr', 'ru', 'de'],
        routing: {
            prefixDefaultLocale: false,
        },
    },
    markdown: {
        shikiConfig: {
            theme: 'github-dark',
        },
    },
});
