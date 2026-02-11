import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const LOCALES = ["en", "ru", "de", "fr"];

const slug = process.argv[2];
if (!slug || slug.startsWith("-")) {
  console.error("Usage: node scripts/check-review-package.mjs <slug>");
  process.exit(1);
}

const errors = [];
const warnings = [];

function rel(filePath) {
  return path.relative(ROOT, filePath).replaceAll(path.sep, "/");
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readFileSafe(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) {
    return null;
  }
  return m[1];
}

function extractField(frontmatter, key) {
  return frontmatter.match(new RegExp(`^${key}:\\s*(.+)\\s*$`, "m"))?.[1]?.trim() ?? "";
}

function parseTags(frontmatter) {
  const raw = extractField(frontmatter, "tags");
  if (!raw) {
    return [];
  }
  const tagMatches = [...raw.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return tagMatches;
}

async function checkLocale(locale) {
  const baseDir = path.resolve(ROOT, "src/content/reviews", locale, slug);
  const indexPath = path.resolve(baseDir, "index.mdx");
  const imagePath = path.resolve(baseDir, "image.webp");
  const ogPath = path.resolve(baseDir, "og.png");

  if (!(await pathExists(indexPath))) {
    errors.push(`${rel(indexPath)}: missing index.mdx`);
    return;
  }

  if (!(await pathExists(imagePath))) {
    errors.push(`${rel(imagePath)}: missing image.webp`);
  }
  if (!(await pathExists(ogPath))) {
    errors.push(`${rel(ogPath)}: missing og.png`);
  }

  const content = await readFileSafe(indexPath);
  const fm = parseFrontmatter(content);
  if (!fm) {
    errors.push(`${rel(indexPath)}: missing frontmatter block`);
    return;
  }

  const hero = extractField(fm, "heroImage").replace(/^["']|["']$/g, "");
  const og = extractField(fm, "ogImage").replace(/^["']|["']$/g, "");
  const category = extractField(fm, "category").replace(/^["']|["']$/g, "");
  const rating = extractField(fm, "rating");
  const priceCategory = extractField(fm, "priceCategory");
  const tags = parseTags(fm);

  if (hero && hero !== "./image.webp") {
    errors.push(`${rel(indexPath)}: heroImage must be './image.webp' when specified`);
  }
  if (og && og !== "./og.png") {
    errors.push(`${rel(indexPath)}: ogImage must be './og.png' when specified`);
  }
  if (!hero && !content.includes("import heroImage from './image.webp'")) {
    warnings.push(
      `${rel(indexPath)}: no heroImage frontmatter and no "import heroImage from './image.webp'"`,
    );
  }
  if (!og) {
    warnings.push(`${rel(indexPath)}: ogImage missing in frontmatter`);
  }
  if (!category) {
    warnings.push(`${rel(indexPath)}: category missing in frontmatter`);
  }
  if (!rating) {
    errors.push(`${rel(indexPath)}: missing rating`);
  }
  if (!priceCategory) {
    errors.push(`${rel(indexPath)}: missing priceCategory`);
  }
  if (tags.length === 0) {
    warnings.push(`${rel(indexPath)}: tags missing in frontmatter`);
  } else if (category && tags[0] !== category) {
    errors.push(`${rel(indexPath)}: tags[0] must equal category`);
  }

  if (!content.includes("> **Disclosure:**")) {
    warnings.push(`${rel(indexPath)}: disclosure prefix not found`);
  }
}

async function main() {
  for (const locale of LOCALES) {
    await checkLocale(locale);
  }

  if (warnings.length > 0) {
    console.log("WARNINGS:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
    console.log("");
  }

  if (errors.length > 0) {
    console.error("REVIEW PACKAGE CHECK FAILED:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`REVIEW PACKAGE CHECK PASSED (${slug})`);
}

main().catch((error) => {
  console.error("REVIEW PACKAGE CHECK CRASHED");
  console.error(error);
  process.exit(1);
});
