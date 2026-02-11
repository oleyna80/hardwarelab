#!/usr/bin/env node

/**
 * Copy Assets to Translations
 * 
 * Copies image assets (image.webp, og.png) from EN review folder
 * to all translation folders (ru, de, fr).
 * 
 * Usage:
 *   node scripts/copy-assets-to-translations.mjs <slug>
 * 
 * Example:
 *   node scripts/copy-assets-to-translations.mjs rog-ally-z1-2024-asus-512gb-white
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const REVIEWS_BASE = path.join(__dirname, '../../..', 'src', 'content', 'reviews');
const LANGUAGES = ['ru', 'de', 'fr'];
const ASSETS = ['image.webp', 'og.png'];

function main() {
  const slug = process.argv[2];

  if (!slug) {
    console.error('❌ Error: No slug provided');
    console.error('Usage: node scripts/copy-assets-to-translations.mjs <slug>');
    process.exit(1);
  }

  const enFolder = path.join(REVIEWS_BASE, 'en', slug);

  // Check if EN folder exists
  if (!fs.existsSync(enFolder)) {
    console.error(`❌ Error: EN folder not found: ${enFolder}`);
    process.exit(1);
  }

  console.log(`📁 Source: ${enFolder}`);
  console.log(`🌍 Languages: ${LANGUAGES.join(', ')}`);
  console.log(`📎 Assets: ${ASSETS.join(', ')}`);
  console.log('');

  let copiedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const asset of ASSETS) {
    const sourcePath = path.join(enFolder, asset);

    // Check if source asset exists
    if (!fs.existsSync(sourcePath)) {
      console.warn(`⚠️  Warning: ${asset} not found in EN folder (skipping)`);
      skippedCount++;
      continue;
    }

    for (const lang of LANGUAGES) {
      const targetFolder = path.join(REVIEWS_BASE, lang, slug);
      const targetPath = path.join(targetFolder, asset);

      try {
        // Create target folder if it doesn't exist
        if (!fs.existsSync(targetFolder)) {
          fs.mkdirSync(targetFolder, { recursive: true });
          console.log(`📂 Created folder: ${lang}/${slug}/`);
        }

        // Copy the file
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Copied ${asset} → ${lang}/${slug}/${asset}`);
        copiedCount++;
      } catch (err) {
        console.error(`❌ Error copying ${asset} to ${lang}: ${err.message}`);
        errorCount++;
      }
    }
  }

  console.log('');
  console.log('─'.repeat(40));
  console.log(`📊 Summary:`);
  console.log(`   ✅ Copied: ${copiedCount} files`);
  if (skippedCount > 0) {
    console.log(`   ⚠️  Skipped: ${skippedCount} assets (not found in EN)`);
  }
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount}`);
    process.exit(1);
  }

  if (copiedCount === 0 && skippedCount === ASSETS.length) {
    console.error('');
    console.error('❌ No assets were copied. Make sure image.webp exists in EN folder.');
    console.error('   Run Art Director first to generate images.');
    process.exit(1);
  }

  console.log('');
  console.log('🎉 Done!');
}

main();
