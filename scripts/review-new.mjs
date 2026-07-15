#!/usr/bin/env node
/**
 * review-new.mjs — Step 1 of the simplified content pipeline.
 *
 * Creates the review scaffold and prints a ready-to-paste PASS A prompt.
 *
 * Usage:
 *   npm run review:new -- "Product Name" --category mini-pc
 *   node scripts/review-new.mjs "Product Name" --category mini-pc
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const EN_REVIEWS_DIR = path.join(ROOT, "src", "content", "reviews", "en");
const EXISTING_REVIEWS_MD = path.join(ROOT, "prompts", "existing-reviews-hardwarelab.md");
const PASS_A_PROMPT = path.join(ROOT, "prompts", "pass-a.md");

const VALID_CATEGORIES = new Set([
  "consoles", "gaming", "gaming-pcs", "monitors",
  "ai-workstation", "mini-pc", "nas", "sbc",
]);

// ── Slug generation (from bootstrap-review.mjs) ──────────────────────

const STOPWORDS = new Set([
  "a","an","and","the","with","for","to","in","of","by","on","at","from",
  "includes","include","including","style","edition","special","bundle",
  "renewed","new","model","version","gaming","console","handheld","desktop",
  "computer","display","screen","processor","chip","core","up","fps","hz",
]);

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

function pickVariantTokens(tokens) {
  const year = tokens.find((t) => /^20\d{2}$/.test(t));
  const storage = tokens.find((t) => /^(128|256|512)gb$/.test(t)) ?? tokens.find((t) => /^\d+tb$/.test(t));
  const color = tokens.find((t) =>
    ["white","black","silver","gray","grey","blue","red","green"].includes(t)
  ) ?? null;
  const cpuLike = tokens.find((t) =>
    /^(z1|z1-extreme|m\d|m\d-pro|m\d-max|6800u|7840u|8845hs|7735hs|6900hx|n100|n305|i5-\d+p?)$/.test(t)
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
  if (slug.length > 60) slug = slug.slice(0, 60).replace(/-+$/g, "");
  return slug;
}

function readExistingSlugs() {
  const slugs = new Set();
  if (fs.existsSync(EN_REVIEWS_DIR)) {
    for (const entry of fs.readdirSync(EN_REVIEWS_DIR, { withFileTypes: true })) {
      if (entry.isDirectory()) slugs.add(entry.name);
    }
  }
  if (fs.existsSync(EXISTING_REVIEWS_MD)) {
    const text = fs.readFileSync(EXISTING_REVIEWS_MD, "utf8");
    for (const match of text.matchAll(/\/reviews\/([a-z0-9-]+)/g)) {
      slugs.add(match[1]);
    }
  }
  return slugs;
}

function makeUniqueSlug(slug, taken) {
  if (!taken.has(slug)) return slug;
  let i = 2;
  while (taken.has(`${slug}-${i}`)) i += 1;
  return `${slug}-${i}`;
}

// ── Duplicate detection ──────────────────────────────────────────────

function tokenizeForSimilarity(input) {
  return new Set(slugify(input).split("-").filter(Boolean).filter((t) => !STOPWORDS.has(t)));
}

function jaccard(a, b) {
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : inter / union;
}

function readExistingTitles() {
  if (!fs.existsSync(EXISTING_REVIEWS_MD)) return [];
  const text = fs.readFileSync(EXISTING_REVIEWS_MD, "utf8");
  const titles = [];
  for (const match of text.matchAll(/\|\s*([^|]+?)\s*\|\s*`(\/reviews\/[^`]+)`\s*\|/g)) {
    titles.push({ title: match[1].trim(), url: match[2].trim() });
  }
  return titles;
}

function findPossibleDuplicates(productName, existingTitles) {
  const t = tokenizeForSimilarity(productName);
  return existingTitles
    .map((x) => ({ ...x, score: jaccard(t, tokenizeForSimilarity(x.title)) }))
    .filter((x) => x.score >= 0.35)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// ── Arg parsing ──────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { productName: "", category: "" };
  const rest = [...argv];
  const productParts = [];
  while (rest.length) {
    if (rest[0].startsWith("--")) break;
    productParts.push(rest.shift());
  }
  args.productName = productParts.join(" ").trim();
  while (rest.length) {
    const flag = rest.shift();
    if (flag === "--category") args.category = (rest.shift() || "").trim();
    else { console.error(`Unknown flag: ${flag}`); process.exit(1); }
  }
  return args;
}

// ── PASS A prompt generation ─────────────────────────────────────────

function generatePassAPrompt(productName, category) {
  // Read the consolidated pass-a.md if it exists
  let passATemplate = "";
  if (fs.existsSync(PASS_A_PROMPT)) {
    passATemplate = fs.readFileSync(PASS_A_PROMPT, "utf8");
  }

  const existingReviews = fs.existsSync(EXISTING_REVIEWS_MD)
    ? fs.readFileSync(EXISTING_REVIEWS_MD, "utf8")
    : "(no existing reviews found)";

  const prompt = `${passATemplate}

---

## INPUT FOR THIS SESSION

REVIEW: ${productName}
CATEGORY: ${category}

## EXISTING REVIEWS (use for Related Reviews section — copy-paste only)

${existingReviews}
`;

  return prompt;
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  const { productName, category } = parseArgs(process.argv.slice(2));
  if (!productName) {
    console.error('Usage: npm run review:new -- "Product Name" --category mini-pc');
    process.exit(1);
  }
  if (!category || !VALID_CATEGORIES.has(category)) {
    console.error(`Invalid --category "${category}". Valid: ${[...VALID_CATEGORIES].join(", ")}`);
    process.exit(1);
  }

  // 1. Generate slug
  const taken = readExistingSlugs();
  const candidate = buildCandidateSlug(productName);
  const slug = makeUniqueSlug(candidate, taken);

  // 2. Check for duplicates
  const existingTitles = readExistingTitles();
  const possibleDupes = findPossibleDuplicates(productName, existingTitles);

  console.error("═══════════════════════════════════════════════════");
  console.error("  HardwareLab — review:new");
  console.error("═══════════════════════════════════════════════════");
  console.error(`  Product:  ${productName}`);
  console.error(`  Category: ${category}`);
  console.error(`  Slug:     ${slug}`);
  console.error(`  Folder:   src/content/reviews/en/${slug}/`);
  console.error(`  URL:      /reviews/${slug}`);

  if (possibleDupes.length) {
    console.error("\n⚠️  Possible duplicates:");
    for (const d of possibleDupes) {
      console.error(`   ${(d.score * 100).toFixed(0)}% — ${d.title} → ${d.url}`);
    }
  }

  // 3. Create folder and scaffold files
  const reviewDir = path.join(EN_REVIEWS_DIR, slug);
  fs.mkdirSync(reviewDir, { recursive: true });

  const researchPath = path.join(reviewDir, "_research-pack.md");
  if (!fs.existsSync(researchPath)) {
    fs.writeFileSync(researchPath,
      `# Research Pack (PASS A)\n\nProduct: ${productName}\nCategory: ${category}\n\nPaste the PASS A output here.\n`,
      "utf8",
    );
    console.error(`\n✅ Created: src/content/reviews/en/${slug}/_research-pack.md`);
  } else {
    console.error(`\n📄 Exists: src/content/reviews/en/${slug}/_research-pack.md`);
  }

  const draftPath = path.join(reviewDir, "_draft.mdx");
  if (!fs.existsSync(draftPath)) {
    const today = new Date().toISOString().slice(0, 10);
    fs.writeFileSync(draftPath,
      `---\ntitle: "DRAFT — ${productName}"\ndescription: "DRAFT"\npubDate: ${today}\nlastUpdated: ${today}\nheroImage: "./image.webp"\nheroImageAlt: "DRAFT"\ncategory: "${category}"\ntags: ["${category}"]\nasin: "DRAFT"\nrating: 0\npriceCategory: "mid"\ndraft: true\n---\n\nDRAFT — replace with index.mdx after PASS B.\n`,
      "utf8",
    );
    console.error(`✅ Created: src/content/reviews/en/${slug}/_draft.mdx`);
  }

  // 4. Generate and print PASS A prompt to stdout
  console.error("\n═══════════════════════════════════════════════════");
  console.error("  PASS A prompt printed to stdout.");
  console.error("  Copy it and paste into your research agent/model.");
  console.error("═══════════════════════════════════════════════════\n");

  const prompt = generatePassAPrompt(productName, category);
  process.stdout.write(prompt);
}

main();
