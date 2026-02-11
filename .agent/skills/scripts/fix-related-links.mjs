#!/usr/bin/env node
/**
 * fix-related-links.mjs
 * 
 * Automatically corrects the "Related Reviews" section in all MDX files:
 * 1. Finds all .mdx files in src/content/reviews
 * 2. Builds a map of lang:slug -> title from frontmatter
 * 3. In "Related Reviews" sections, replaces link text with the actual title of the target page
 * 4. Warns about dead links
 * 
 * Usage: node .agent/skills/scripts/fix-related-links.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REVIEWS_DIR = path.join(__dirname, '../../..', 'src', 'content', 'reviews');

/**
 * Parses frontmatter from MDX content
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;

    const frontmatter = {};
    const lines = match[1].split(/\r?\n/);

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Remove quotes
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        frontmatter[key] = value;
    }

    return frontmatter;
}

/**
 * Recursively finds all .mdx files
 */
function findMdxFiles(dir) {
    const files = [];

    function walk(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.name.endsWith('.mdx')) {
                files.push(fullPath);
            }
        }
    }

    walk(dir);
    return files;
}

/**
 * Extracts lang and slug from file path
 * src/content/reviews/en/slug/index.mdx -> { lang: 'en', slug: 'slug' }
 * src/content/reviews/ru/slug/index.mdx -> { lang: 'ru', slug: 'slug' }
 */
function getInfoFromPath(filePath) {
    const relativePath = path.relative(REVIEWS_DIR, filePath);
    const parts = relativePath.split(path.sep);
    // Expected: [lang, slug, index.mdx]
    if (parts.length >= 2) {
        return { lang: parts[0], slug: parts[1] };
    }
    return null;
}

/**
 * Builds a map of "lang:slug" -> title
 */
function buildTitleMap(mdxFiles) {
    const titleMap = new Map();

    for (const file of mdxFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        const frontmatter = parseFrontmatter(content);

        if (frontmatter && frontmatter.title) {
            const info = getInfoFromPath(file);
            if (info) {
                const key = `${info.lang}:${info.slug}`;
                titleMap.set(key, frontmatter.title);
            }
        }
    }

    return titleMap;
}

/**
 * Parses a target URL to get { lang, slug }
 * /reviews/slug -> { lang: 'en', slug: 'slug' }
 * /ru/reviews/slug -> { lang: 'ru', slug: 'slug' }
 */
function parseUrl(url) {
    // Remove leading slash
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    const parts = cleanUrl.split('/');

    // en: reviews/slug
    if (parts[0] === 'reviews' && parts[1]) {
        return { lang: 'en', slug: parts[1] };
    }

    // other: {lang}/reviews/slug
    if (parts.length === 3 && parts[1] === 'reviews') {
        return { lang: parts[0], slug: parts[2] };
    }

    return null;
}

/**
 * Fixes Related Reviews section
 */
function fixRelatedReviews(content, titleMap, filePath) {
    const warnings = [];
    const sourceInfo = getInfoFromPath(filePath);

    // Find Related Reviews section header (EN/RU/DE...)
    // Allow for "Related Reviews", "Похожие обзоры", etc.
    // We look for a header that starts with ## until the next header or AffiliateButton/component
    const sectionRegex = /(## (?:Related Reviews|Похожие обзоры|Ähnliche Testberichte|Revues Connexes).*?\n)([\s\S]*?)(?=\n## |\n{\/\*|\n<Affiliate|\n$)/g;

    let newContent = content.replace(sectionRegex, (match, header, body) => {
        let newBody = body;

        // Pattern 1: [Text](/url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

        newBody = newBody.replace(linkRegex, (linkMatch, text, url) => {
            const target = parseUrl(url);

            if (target) {
                const key = `${target.lang}:${target.slug}`;
                const actualTitle = titleMap.get(key);

                if (actualTitle) {
                    if (actualTitle !== text) {
                        // Title mismatch, update it
                        return `[${actualTitle}](${url})`;
                    }
                    return linkMatch; // Title matches, no change
                } else {
                    // Target not found in map
                    warnings.push(`⚠️  Dead link: ${url} (in ${path.relative(REVIEWS_DIR, filePath)})`);
                    return linkMatch;
                }
            } else {
                // Not a review link, ignore
                return linkMatch;
            }
        });

        return header + newBody;
    });

    return { newContent, warnings };
}

/**
 * Main
 */
async function main() {
    console.log('🔍 Scanning MDX files...\n');

    const mdxFiles = findMdxFiles(REVIEWS_DIR);
    console.log(`📁 Found ${mdxFiles.length} MDX files\n`);

    // Build title map
    console.log('📊 Building title map...\n');
    const titleMap = buildTitleMap(mdxFiles);
    console.log(`📖 Indexed ${titleMap.size} titles (EN/RU/DE/FR)\n`);

    // Process files
    let modifiedCount = 0;
    const totalWarnings = [];

    for (const file of mdxFiles) {
        const content = fs.readFileSync(file, 'utf-8');

        // Skip check if no header found (simple check)
        if (!content.match(/## (?:Related Reviews|Похожие обзоры|Ähnliche Testberichte|Revues Connexes)/)) {
            continue;
        }

        const { newContent, warnings } = fixRelatedReviews(content, titleMap, file);
        totalWarnings.push(...warnings);

        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf-8');
            console.log(`✅ Fixed: ${path.relative(REVIEWS_DIR, file)}`);
            modifiedCount++;
        }
    }

    console.log(`\n📝 Files updated: ${modifiedCount}`);

    if (totalWarnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        for (const warning of totalWarnings) {
            console.log(`   ${warning}`);
        }
    }

    console.log('\n✨ Done!');
}

main().catch(console.error);
