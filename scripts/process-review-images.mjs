#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const HERO_SIZE = { width: 1200, height: 675 };
const OG_SIZE = { width: 1200, height: 630 };

function printHelp() {
  console.log(`
Usage:
  node scripts/process-review-images.mjs --slug <slug> --input <file>
  node scripts/process-review-images.mjs --review-dir <dir> --input <file>

Required:
  --input <path>          Path to source image (typically square 1024x1024 from Nano Banana)

One of:
  --slug <slug>           Review slug (resolved to src/content/reviews/<locale>/<slug>)
  --review-dir <path>     Direct path to review folder

Optional:
  --locale <code>         Locale for --slug mode (default: en)
  --og-input <path>       Separate source image for og.png (default: --input)
  --background <color>    Padding background for contain mode (default: #F8F7F5)
  --hero-fit <mode>       contain|cover|inside|outside|fill (default: contain)
  --og-fit <mode>         contain|cover|inside|outside|fill (default: contain)
  --position <value>      Resize position (default: center)
  --hero-quality <0-100>  WebP quality for image.webp (default: 90)
  --help                  Show this help

Examples:
  npm run images:review -- --slug steam-deck-oled --input ~/Downloads/hero.png
  npm run images:review -- --slug steam-deck-oled --input ~/Downloads/hero.png --og-input ~/Downloads/og.png --background "#061337"
  npm run images:review -- --review-dir src/content/reviews/en/steam-deck-oled --input ./press_front_home.png
`.trim());
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    if (key === 'help') {
      args.help = true;
      continue;
    }
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

function resolveReviewDir({ slug, locale = 'en', reviewDir }) {
  if (reviewDir) {
    return path.resolve(reviewDir);
  }
  if (!slug) {
    throw new Error('Provide either --slug or --review-dir');
  }
  return path.resolve('src/content/reviews', locale, slug);
}

function assertExists(filePath, kind) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${kind} not found: ${filePath}`);
  }
}

async function getMeta(filePath) {
  const meta = await sharp(filePath).metadata();
  if (!meta.width || !meta.height) {
    throw new Error(`Failed to read image metadata: ${filePath}`);
  }
  return meta;
}

async function renderTarget({
  sourcePath,
  outputPath,
  width,
  height,
  fit,
  background,
  position,
  format,
  quality,
}) {
  const pipeline = sharp(sourcePath).resize(width, height, {
    fit,
    position,
    background,
    withoutEnlargement: true,
  });

  if (format === 'webp') {
    await pipeline.webp({ quality }).toFile(outputPath);
    return;
  }

  await pipeline.png({ compressionLevel: 9, palette: true }).toFile(outputPath);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const inputPath = path.resolve(args.input ?? '');
  const ogInputPath = path.resolve(args['og-input'] ?? args.input ?? '');
  const reviewDir = resolveReviewDir({
    slug: args.slug,
    locale: args.locale ?? 'en',
    reviewDir: args['review-dir'],
  });

  assertExists(inputPath, 'Input image');
  assertExists(ogInputPath, 'OG input image');
  assertExists(reviewDir, 'Review directory');

  const background = args.background ?? '#F8F7F5';
  const heroFit = args['hero-fit'] ?? 'contain';
  const ogFit = args['og-fit'] ?? 'contain';
  const position = args.position ?? 'center';
  const heroQuality = Number(args['hero-quality'] ?? 90);

  if (!Number.isFinite(heroQuality) || heroQuality < 1 || heroQuality > 100) {
    throw new Error('--hero-quality must be between 1 and 100');
  }

  const heroMeta = await getMeta(inputPath);
  const ogMeta = await getMeta(ogInputPath);

  const heroTarget = path.join(reviewDir, 'image.webp');
  const ogTarget = path.join(reviewDir, 'og.png');

  console.log(`Review dir: ${reviewDir}`);
  console.log(`Hero source: ${inputPath} (${heroMeta.width}x${heroMeta.height})`);
  console.log(`OG source: ${ogInputPath} (${ogMeta.width}x${ogMeta.height})`);
  if (heroMeta.width === heroMeta.height) {
    console.log('Detected square source (1:1) - good for Nano Banana defaults.');
  }

  await renderTarget({
    sourcePath: inputPath,
    outputPath: heroTarget,
    width: HERO_SIZE.width,
    height: HERO_SIZE.height,
    fit: heroFit,
    background,
    position,
    format: 'webp',
    quality: heroQuality,
  });

  await renderTarget({
    sourcePath: ogInputPath,
    outputPath: ogTarget,
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    fit: ogFit,
    background,
    position,
    format: 'png',
  });

  console.log(`Created: ${heroTarget} (${HERO_SIZE.width}x${HERO_SIZE.height})`);
  console.log(`Created: ${ogTarget} (${OG_SIZE.width}x${OG_SIZE.height})`);
}

main().catch((error) => {
  console.error(`Image processing failed: ${error.message}`);
  process.exit(1);
});
