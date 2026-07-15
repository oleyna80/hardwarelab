#!/usr/bin/env node
/**
 * review-publish.mjs — Step 3 of the simplified content pipeline.
 *
 * Runs QA checks on the EN review, creates translation folders,
 * copies assets, and prints a translation prompt.
 *
 * Usage:
 *   npm run review:publish -- <slug>
 *   node scripts/review-publish.mjs <slug>
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const EN_REVIEWS_DIR = path.join(ROOT, "src", "content", "reviews", "en");
const REVIEWS_BASE = path.join(ROOT, "src", "content", "reviews");
const TRANSLATE_PROMPT = path.join(ROOT, "prompts", "translate.md");
const LANGUAGES = ["ru", "de", "fr"];
const ASSETS = ["image.webp", "og.png"];

// ── Helpers ──────────────────────────────────────────────────────────

function runCheck(label, command) {
  console.error(`\n  🔍 ${label}...`);
  try {
    execSync(command, { cwd: ROOT, stdio: "pipe", encoding: "utf8" });
    console.error(`     ✅ PASS`);
    return true;
  } catch (err) {
    console.error(`     ❌ FAIL`);
    const output = (err.stdout || "") + (err.stderr || "");
    if (output.trim()) {
      for (const line of output.trim().split("\n").slice(0, 10)) {
        console.error(`     ${line}`);
      }
    }
    return false;
  }
}

function copyAssets(slug) {
  const enFolder = path.join(EN_REVIEWS_DIR, slug);
  let copied = 0;

  for (const lang of LANGUAGES) {
    const targetFolder = path.join(REVIEWS_BASE, lang, slug);

    for (const asset of ASSETS) {
      const sourcePath = path.join(enFolder, asset);
      if (!fs.existsSync(sourcePath)) continue;

      fs.mkdirSync(targetFolder, { recursive: true });
      const targetPath = path.join(targetFolder, asset);
      fs.copyFileSync(sourcePath, targetPath);
      copied++;
    }
  }

  return copied;
}

function extractAsinsByRegion(researchPack) {
  const lines = [];
  const asinPrimary = researchPack.match(/ASIN_PRIMARY[:\s]+([A-Z0-9]{10})/i);
  const asinUS = researchPack.match(/ASIN_US[:\s]+([A-Z0-9]{10}|absent)/i);
  const asinDE = researchPack.match(/(?:ASIN_?)?DE[:\s]+([A-Z0-9]{10}|absent)/im);
  const asinFR = researchPack.match(/(?:ASIN_?)?FR[:\s]+([A-Z0-9]{10}|absent)/im);

  if (asinPrimary) lines.push(`ASIN_PRIMARY: ${asinPrimary[1]}`);
  if (asinUS) lines.push(`ASIN_US: ${asinUS[1]}`);
  if (asinDE) lines.push(`ASIN_DE: ${asinDE[1]}`);
  if (asinFR) lines.push(`ASIN_FR: ${asinFR[1]}`);

  return lines.join("\n") || "ASINs: see _research-pack.md";
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  const slug = process.argv[2];
  if (!slug || slug.startsWith("-")) {
    console.error('Usage: npm run review:publish -- <slug>');
    process.exit(1);
  }

  const reviewDir = path.join(EN_REVIEWS_DIR, slug);
  const indexPath = path.join(reviewDir, "index.mdx");

  if (!fs.existsSync(indexPath)) {
    console.error(`❌ EN review not found: src/content/reviews/en/${slug}/index.mdx`);
    console.error('   Run PASS B first to create index.mdx.');
    process.exit(1);
  }

  console.error("═══════════════════════════════════════════════════");
  console.error("  HardwareLab — review:publish");
  console.error("═══════════════════════════════════════════════════");
  console.error(`  Slug: ${slug}`);

  // ── QA Pipeline ────────────────────────────────────────────────────

  console.error("\n── QA Pipeline ──────────────────────────────────");

  const checks = [
    ["Disclosure check", `node scripts/check-disclosure.mjs`],
    ["Review package check (EN)", `node .agent/skills/scripts/check-review-package.mjs ${slug}`],
    ["Astro build", `npx astro build`],
    ["Affiliate links check", `node .agent/skills/scripts/check-affiliate-links.js`],
  ];

  let allPassed = true;
  for (const [label, cmd] of checks) {
    const ok = runCheck(label, cmd);
    if (!ok) allPassed = false;
  }

  if (!allPassed) {
    console.error("\n══════════════════════════════════════════════════");
    console.error("  ❌ QA FAILED — fix errors above before publishing.");
    console.error("══════════════════════════════════════════════════\n");
    process.exit(1);
  }

  console.error("\n  ✅ All QA checks passed");

  // ── Copy assets to translations ────────────────────────────────────

  console.error("\n── Translation setup ────────────────────────────");

  const copied = copyAssets(slug);
  console.error(`  📎 Copied ${copied} asset files to ${LANGUAGES.join("/")} folders`);

  // ── Generate translation prompt ────────────────────────────────────

  console.error("\n── Translation prompt ───────────────────────────");

  const enMdx = fs.readFileSync(indexPath, "utf8");

  const researchPackPath = path.join(reviewDir, "_research-pack.md");
  const researchPack = fs.existsSync(researchPackPath)
    ? fs.readFileSync(researchPackPath, "utf8")
    : "";
  const asinExcerpt = extractAsinsByRegion(researchPack);

  let translateTemplate = "";
  if (fs.existsSync(TRANSLATE_PROMPT)) {
    translateTemplate = fs.readFileSync(TRANSLATE_PROMPT, "utf8");
  } else {
    translateTemplate = "Translate the EN review into RU, DE, and FR. Keep MDX structure unchanged.";
  }

  const translatePrompt = `${translateTemplate}

---

## EN MDX (source)

${enMdx}

---

## ASINs by Region (from Research Pack)

${asinExcerpt}

---

## OUTPUT PATHS

- src/content/reviews/ru/${slug}/index.mdx
- src/content/reviews/de/${slug}/index.mdx
- src/content/reviews/fr/${slug}/index.mdx

Images (image.webp + og.png) are already copied to each folder.
`;

  console.error("\n═══════════════════════════════════════════════════");
  console.error("  ✅ QA PASSED — Translation prompt printed to stdout.");
  console.error("  Copy it and paste into your translator agent/model.");
  console.error("═══════════════════════════════════════════════════\n");

  process.stdout.write(translatePrompt);
}

main();
