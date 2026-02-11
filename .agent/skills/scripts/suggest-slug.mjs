#!/usr/bin/env node
/**
 * suggest-slug.mjs
 *
 * Генерирует безопасный slug для нового обзора и проверяет, что он не конфликтует
 * с существующими обзорами:
 * - папки в src/content/reviews/en/*
 * - ссылки /reviews/<slug> в prompts/existing-reviews-hardwarelab.md
 *
 * Использование:
 *   node scripts/suggest-slug.mjs "ASUS - ROG Ally ... 2024"
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

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['"]/g, "")
    .replace(/[()\\[\\]{}]/g, " ")
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
  const storage = tokens.find((t) => /^(128|256|512)gb$/.test(t)) ?? tokens.find((t) => /^\d+tb$/.test(t));
  const color =
    tokens.find((t) =>
      ["white", "black", "silver", "gray", "grey", "blue", "red", "green"].includes(t),
    ) ?? null;

  const cpuLike = tokens.find((t) => /^(z1|z1-extreme|m\d|m\d-pro|m\d-max|6800u|7840u|8845hs)$/.test(t)) ?? null;

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

function main() {
  const input = process.argv.slice(2).join(" ").trim();
  if (!input) {
    console.error('Usage: node scripts/suggest-slug.mjs "Product Name..."');
    process.exit(1);
  }

  const taken = readExistingSlugs();
  const candidate = buildCandidateSlug(input);
  const unique = makeUniqueSlug(candidate, taken);

  console.log("Product:", input);
  console.log("Candidate slug:", candidate);
  console.log("Unique slug:", unique);
  console.log("Folder:", `src/content/reviews/en/${unique}/index.mdx`);
  console.log("URL:", `/reviews/${unique}`);
}

main();

