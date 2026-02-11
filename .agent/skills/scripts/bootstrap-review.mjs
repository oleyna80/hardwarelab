#!/usr/bin/env node
/**
 * bootstrap-review.mjs
 *
 * Создает каркас для нового обзора:
 * - проверяет конфликты по slug (папки + existing-reviews list)
 * - создает папку src/content/reviews/en/<slug>/
 * - создает src/content/reviews/en/<slug>/_research-pack.md (исключен из сборки по шаблону _*.md)
 * - создает src/content/reviews/en/<slug>/_draft.mdx (исключен из сборки по шаблону _*.mdx)
 *
 * Пример:
 *   node scripts/bootstrap-review.mjs "ASUS - ROG Ally ... 2024" --category gaming
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, "../../..");
const EN_REVIEWS_DIR = path.join(ROOT, "src", "content", "reviews", "en");
const EXISTING_REVIEWS_MD = path.join(
  ROOT,
  "prompts",
  "existing-reviews-hardwarelab.md",
);

const VALID_CATEGORIES = new Set([
  "gaming",
  "gaming-pcs",
  "monitors",
  "ai-workstation",
  "mini-pc",
  "nas",
  "sbc",
]);

function readExistingSlugs() {
  const slugs = new Set();

  if (fs.existsSync(EN_REVIEWS_DIR)) {
    const entries = fs.readdirSync(EN_REVIEWS_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      slugs.add(entry.name);
    }
  }

  if (fs.existsSync(EXISTING_REVIEWS_MD)) {
    const text = fs.readFileSync(EXISTING_REVIEWS_MD, "utf8");
    const matches = text.matchAll(/\/reviews\/([a-z0-9-]+)/g);
    for (const match of matches) {
      slugs.add(match[1]);
    }
  }

  return slugs;
}

function readExistingTitles() {
  const titles = [];
  if (!fs.existsSync(EXISTING_REVIEWS_MD)) return titles;
  const text = fs.readFileSync(EXISTING_REVIEWS_MD, "utf8");
  for (const match of text.matchAll(
    /\|\s*([^|]+?)\s*\|\s*`(\/reviews\/[^`]+)`\s*\|/g,
  )) {
    titles.push({ title: match[1].trim(), url: match[2].trim() });
  }
  return titles;
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['"]/g, "")
    .replace(/[()[\]{}]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "the",
  "with",
  "for",
  "to",
  "in",
  "of",
  "by",
  "on",
  "at",
  "from",
  "includes",
  "include",
  "including",
  "style",
  "edition",
  "special",
  "bundle",
  "renewed",
  "new",
  "model",
  "version",
  "gaming",
  "console",
  "handheld",
  "desktop",
  "computer",
  "display",
  "screen",
  "processor",
  "chip",
  "core",
  "up",
  "fps",
  "hz",
]);

function pickVariantTokens(tokens) {
  const year = tokens.find((t) => /^20\d{2}$/.test(t));
  const storage =
    tokens.find((t) => /^(128|256|512)gb$/.test(t)) ??
    tokens.find((t) => /^\d+tb$/.test(t));
  const color =
    tokens.find((t) =>
      ["white", "black", "silver", "gray", "grey", "blue", "red", "green"].includes(t),
    ) ?? null;

  const cpuLike =
    tokens.find((t) =>
      /^(z1|z1-extreme|m\d|m\d-pro|m\d-max|6800u|7840u|8845hs|7735hs|6900hx)$/.test(t),
    ) ?? null;

  return [cpuLike, storage, color, year].filter(Boolean);
}

function buildCandidateSlug(rawName) {
  const base = slugify(rawName);
  const tokens = base.split("-").filter(Boolean);

  const filtered = tokens.filter((t) => !STOPWORDS.has(t));
  const variant = pickVariantTokens(tokens);

  const result = [];
  for (const t of filtered) {
    if (result.includes(t)) continue;
    result.push(t);
    if (result.length >= 6) break;
  }

  for (const t of variant) {
    if (!result.includes(t)) result.push(t);
  }

  let slug = result.join("-");
  if (slug.length > 60) {
    slug = slug.slice(0, 60).replace(/-+$/g, "");
  }

  return slug;
}

function makeUniqueSlug(slug, taken) {
  if (!taken.has(slug)) return slug;
  let i = 2;
  while (taken.has(`${slug}-${i}`)) i += 1;
  return `${slug}-${i}`;
}

function tokenizeForSimilarity(input) {
  const tokens = slugify(input).split("-").filter(Boolean);
  return new Set(tokens.filter((t) => !STOPWORDS.has(t)));
}

function jaccard(a, b) {
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : inter / union;
}

function findPossibleDuplicates(productName, existingTitles) {
  const t = tokenizeForSimilarity(productName);
  const scored = existingTitles
    .map((x) => ({ ...x, score: jaccard(t, tokenizeForSimilarity(x.title)) }))
    .filter((x) => x.score >= 0.35)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
  return scored;
}

function parseArgs(argv) {
  const args = { productName: "", category: "mini-pc" };
  const rest = [...argv];
  const productParts = [];
  while (rest.length) {
    const token = rest[0];
    if (token.startsWith("--")) break;
    productParts.push(rest.shift());
  }
  args.productName = productParts.join(" ").trim();
  while (rest.length) {
    const flag = rest.shift();
    if (flag === "--category") args.category = (rest.shift() || "").trim();
    else {
      console.error(`Unknown flag: ${flag}`);
      process.exit(1);
    }
  }
  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const { productName, category } = parseArgs(process.argv.slice(2));
  if (!productName) {
    console.error(
      'Usage: node .agent/skills/scripts/bootstrap-review.mjs "Product Name..." --category mini-pc',
    );
    process.exit(1);
  }
  if (!VALID_CATEGORIES.has(category)) {
    console.error(
      `Invalid --category "${category}". Valid: ${[...VALID_CATEGORIES].join(", ")}`,
    );
    process.exit(1);
  }

  const taken = readExistingSlugs();
  const candidate = buildCandidateSlug(productName);
  const slug = makeUniqueSlug(candidate, taken);

  const existingTitles = readExistingTitles();
  const possibleDupes = findPossibleDuplicates(productName, existingTitles);

  console.log("Product:", productName);
  console.log("Category:", category);
  console.log("Candidate slug:", candidate);
  console.log("Unique slug:", slug);
  console.log("Folder:", `src/content/reviews/en/${slug}/`);
  console.log("URL:", `/reviews/${slug}`);

  if (possibleDupes.length) {
    console.log("\nPossible duplicates (check before proceeding):");
    for (const d of possibleDupes) {
      console.log(`- ${(d.score * 100).toFixed(0)}%: ${d.title} → ${d.url}`);
    }
  }

  const reviewDir = path.join(EN_REVIEWS_DIR, slug);
  ensureDir(reviewDir);

  const researchPath = path.join(reviewDir, "_research-pack.md");
  if (!fs.existsSync(researchPath)) {
    fs.writeFileSync(
      researchPath,
      `# Research Pack (PASS A)\n\nProduct: ${productName}\nCategory: ${category}\n\nPaste the Research Pack output here.\n`,
      "utf8",
    );
    console.log("\nCreated:", path.relative(ROOT, researchPath));
  } else {
    console.log("\nExists:", path.relative(ROOT, researchPath));
  }

  const draftPath = path.join(reviewDir, "_draft.mdx");
  if (!fs.existsSync(draftPath)) {
    const today = new Date().toISOString().slice(0, 10);
    fs.writeFileSync(
      draftPath,
      `---\n` +
        `title: "DRAFT — ${productName}"\n` +
        `description: "DRAFT — Generated by Pass B (MDX ONLY)."\n` +
        `pubDate: ${today}\n` +
        `lastUpdated: ${today}\n` +
        `heroImage: "./image.webp"\n` +
        `heroImageAlt: "DRAFT"\n` +
        `category: "${category}"\n` +
        `tags: ["${category}"]\n` +
        `asin: "DRAFT"\n` +
        `rating: 0\n` +
        `priceCategory: "mid"\n` +
        `---\n\n` +
        `This file is excluded from builds because it starts with _.\n` +
        `After Pass B, replace with index.mdx.\n`,
      "utf8",
    );
    console.log("Created:", path.relative(ROOT, draftPath));
  } else {
    console.log("Exists:", path.relative(ROOT, draftPath));
  }

  console.log("\nNext step: run PASS A (Researcher) for this product and paste output into:");
  console.log(`- src/content/reviews/en/${slug}/_research-pack.md`);
}

main();
