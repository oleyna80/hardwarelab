#!/usr/bin/env node
/**
 * review-write.mjs — Step 2 of the simplified content pipeline.
 *
 * Reads the filled research pack, validates it has required fields,
 * and prints a ready-to-paste PASS B prompt for the writer agent.
 *
 * Usage:
 *   npm run review:write -- <slug>
 *   node scripts/review-write.mjs <slug>
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const EN_REVIEWS_DIR = path.join(ROOT, "src", "content", "reviews", "en");
const EXISTING_REVIEWS_MD = path.join(ROOT, "prompts", "existing-reviews-hardwarelab.md");
const PASS_B_PROMPT = path.join(ROOT, "prompts", "pass-b.md");

// ── Research pack validation ─────────────────────────────────────────

function validateResearchPack(content) {
  const issues = [];

  // Check for placeholder text
  if (content.includes("Paste the PASS A output here") || content.includes("Paste the Research Pack output here")) {
    issues.push("Research pack is still a placeholder — run PASS A first");
    return issues;
  }

  // Check minimum length
  if (content.length < 500) {
    issues.push(`Research pack is too short (${content.length} chars) — likely incomplete`);
  }

  // Check for ASIN (any format: ASIN_PRIMARY: B0..., * ASIN_US (confirmed): B0..., asin: "B0...")
  const hasAsin = /(?:ASIN|asin)[_\s]*(?:PRIMARY|US)?[^:]*?[:=]\s*"?([A-Z0-9]{10})"?/i.test(content);
  if (!hasAsin) {
    issues.push("No valid ASIN found — PASS A must include a confirmed ASIN");
  }

  // Check for rating
  const hasRating = /rating[:\s]+\d+\.?\d*/i.test(content);
  const hasNotFoundRating = /rating[:\s]*(NOT FOUND|null|TBD|N\/A)/i.test(content);
  if (!hasRating || hasNotFoundRating) {
    issues.push("No valid rating found — PASS A must include a rating (or STOP if unavailable)");
  }

  // Check for quotes section
  const hasQuotes = /User Quotes|source-verbatim/i.test(content);
  if (!hasQuotes) {
    issues.push("No User Quotes section found — PASS A must include 4-6 verbatim quotes");
  }

  // Check for specs
  const hasSpecs = /Specs.*confirmed|### Specs/i.test(content);
  if (!hasSpecs) {
    issues.push("No Specs section found — PASS A must include confirmed specs");
  }

  return issues;
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  const slug = process.argv[2];
  if (!slug || slug.startsWith("-")) {
    console.error('Usage: npm run review:write -- <slug>');
    process.exit(1);
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    console.error(`❌ Invalid slug: "${slug}". Only lowercase letters, digits, and hyphens allowed.`);
    process.exit(1);
  }

  const reviewDir = path.join(EN_REVIEWS_DIR, slug);
  const researchPackPath = path.join(reviewDir, "_research-pack.md");

  if (!fs.existsSync(reviewDir)) {
    console.error(`❌ Review folder not found: src/content/reviews/en/${slug}/`);
    console.error('   Run "npm run review:new" first.');
    process.exit(1);
  }

  if (!fs.existsSync(researchPackPath)) {
    console.error(`❌ Research pack not found: src/content/reviews/en/${slug}/_research-pack.md`);
    process.exit(1);
  }

  // 1. Read and validate research pack
  const researchPack = fs.readFileSync(researchPackPath, "utf8");
  const issues = validateResearchPack(researchPack);

  console.error("═══════════════════════════════════════════════════");
  console.error("  HardwareLab — review:write");
  console.error("═══════════════════════════════════════════════════");
  console.error(`  Slug:   ${slug}`);
  console.error(`  Pack:   src/content/reviews/en/${slug}/_research-pack.md`);
  console.error(`  Size:   ${researchPack.length} chars`);

  if (issues.length > 0) {
    console.error("\n❌ Research pack validation FAILED:");
    for (const issue of issues) {
      console.error(`   • ${issue}`);
    }
    console.error("\nFix the research pack before running PASS B.");
    process.exit(1);
  }

  console.error("\n✅ Research pack validated");

  // 2. Read PASS B prompt template
  let passBTemplate = "";
  if (fs.existsSync(PASS_B_PROMPT)) {
    passBTemplate = fs.readFileSync(PASS_B_PROMPT, "utf8");
  } else {
    console.error("⚠️  prompts/pass-b.md not found, using minimal prompt");
    passBTemplate = "PASS B (Copywriter / MDX ONLY) — see prompts/master_prompt_v_1_3_0.md for full rules.";
  }

  // 3. Read existing reviews
  const existingReviews = fs.existsSync(EXISTING_REVIEWS_MD)
    ? fs.readFileSync(EXISTING_REVIEWS_MD, "utf8")
    : "(no existing reviews found)";

  // 4. Compose and print the prompt
  const prompt = `${passBTemplate}

---

## RESEARCH PACK (source of truth for this review)

${researchPack}

---

## EXISTING REVIEWS (for internal links — copy-paste only)

${existingReviews}

---

## OUTPUT TARGET

Save the final review to: \`src/content/reviews/en/${slug}/index.mdx\`
Image files go in the same folder: \`src/content/reviews/en/${slug}/image.webp\` and \`og.png\`
`;

  console.error("\n═══════════════════════════════════════════════════");
  console.error("  PASS B prompt printed to stdout.");
  console.error("  Copy it and paste into your writer agent/model.");
  console.error("═══════════════════════════════════════════════════\n");

  process.stdout.write(prompt);
}

main();
