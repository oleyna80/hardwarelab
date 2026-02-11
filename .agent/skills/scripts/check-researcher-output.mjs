import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const slug = process.argv[2];

if (!slug || slug.startsWith("-")) {
  console.error("Usage: node scripts/check-researcher-output.mjs <slug>");
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
  const lines = frontmatter.split("\n");
  const idx = lines.findIndex((line) => /^tags:\s*$/.test(line));
  if (idx === -1) {
    return [];
  }

  const tags = [];
  for (let i = idx + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!/^\s*-\s+/.test(line)) {
      break;
    }
    const m = line.match(/^\s*-\s+["']?(.+?)["']?\s*$/);
    if (m?.[1]) {
      tags.push(m[1]);
    }
  }
  return tags;
}

function getSection(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const headingRe = new RegExp(`^#{2,3}\\s+${escaped}\\s*$`, "m");
  const headingMatch = headingRe.exec(content);
  if (!headingMatch || headingMatch.index === undefined) {
    return "";
  }

  const start = headingMatch.index + headingMatch[0].length;
  const tail = content.slice(start);
  const nextHeadingIdx = tail.search(/\n#{2,3}\s+/);
  if (nextHeadingIdx === -1) {
    return tail;
  }
  return tail.slice(0, nextHeadingIdx);
}

function parseAllowedRelatedLinks(existingReviewsContent) {
  const set = new Set();
  const re = /\[([^\]]+)\]\((\/reviews\/[^)]+)\)/g;
  let m;
  while ((m = re.exec(existingReviewsContent)) !== null) {
    set.add(`${m[1]}|${m[2]}`);
  }
  return set;
}

function parseRelatedLinks(indexContent) {
  const section = getSection(indexContent, "Related Reviews");
  const links = [];
  const re = /\[([^\]]+)\]\((\/reviews\/[^)]+)\)/g;
  let m;
  while ((m = re.exec(section)) !== null) {
    links.push({ title: m[1], url: m[2] });
  }
  return links;
}

function parseUserFeedbackComments(indexContent) {
  const blockMatch = indexContent.match(/<UserFeedback\s+feedback=\{\[([\s\S]*?)\]\}\s*\/>/m);
  if (!blockMatch) {
    return [];
  }

  const block = blockMatch[1];
  const comments = [];
  const re = /comment:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    comments.push(m[1].replaceAll('\\"', '"'));
  }
  return comments;
}

function parseResearchPackQuotes(packContent) {
  const section = getSection(packContent, "User Quotes (source-verbatim)");
  const quotes = [];
  const re = /^\s*\*\s+quote:\s+"(.*)"\s*$/gm;
  let m;
  while ((m = re.exec(section)) !== null) {
    quotes.push(m[1]);
  }
  return quotes;
}

async function main() {
  const baseDir = path.resolve(ROOT, "src/content/reviews/en", slug);
  const indexPath = path.resolve(baseDir, "index.mdx");
  const imagePath = path.resolve(baseDir, "image.webp");
  const ogPath = path.resolve(baseDir, "og.png");
  const researchPackPath = path.resolve(baseDir, "_research-pack.md");
  const existingReviewsPath = path.resolve(ROOT, "prompts/existing-reviews-hardwarelab.md");

  if (!(await pathExists(indexPath))) {
    errors.push(`${rel(indexPath)}: missing index.mdx`);
  }
  if (!(await pathExists(imagePath))) {
    errors.push(`${rel(imagePath)}: missing image.webp`);
  }
  if (!(await pathExists(ogPath))) {
    errors.push(`${rel(ogPath)}: missing og.png`);
  }
  if (!(await pathExists(indexPath))) {
    reportAndExit();
    return;
  }

  const indexContent = await readFileSafe(indexPath);
  const fm = parseFrontmatter(indexContent);
  if (!fm) {
    errors.push(`${rel(indexPath)}: missing frontmatter block`);
    reportAndExit();
    return;
  }

  const hero = extractField(fm, "heroImage").replace(/^["']|["']$/g, "");
  const og = extractField(fm, "ogImage").replace(/^["']|["']$/g, "");
  const category = extractField(fm, "category").replace(/^["']|["']$/g, "");
  const tags = parseTags(fm);

  if (hero !== "./image.webp") {
    errors.push(`${rel(indexPath)}: heroImage must be './image.webp'`);
  }
  if (og !== "./og.png") {
    errors.push(`${rel(indexPath)}: ogImage must be './og.png'`);
  }
  if (!category) {
    errors.push(`${rel(indexPath)}: missing category`);
  }
  if (tags.length === 0) {
    warnings.push(`${rel(indexPath)}: tags missing in frontmatter`);
  } else if (category && tags[0] !== category) {
    errors.push(`${rel(indexPath)}: tags[0] must equal category`);
  }

  if (!indexContent.includes("> **Disclosure:**")) {
    errors.push(`${rel(indexPath)}: disclosure block is missing`);
  }

  const affiliateButtons = [...indexContent.matchAll(/<AffiliateButton\b/g)].length;
  if (affiliateButtons !== 1) {
    errors.push(
      `${rel(indexPath)}: expected exactly one explicit <AffiliateButton />, found ${affiliateButtons}`,
    );
  }

  if (await pathExists(existingReviewsPath)) {
    const existingContent = await readFileSafe(existingReviewsPath);
    const allowed = parseAllowedRelatedLinks(existingContent);
    const related = parseRelatedLinks(indexContent);

    if (related.length === 0) {
      errors.push(`${rel(indexPath)}: Related Reviews section has no links`);
    }
    if (related.length > 5) {
      errors.push(`${rel(indexPath)}: Related Reviews has more than 5 links`);
    }

    for (const link of related) {
      const key = `${link.title}|${link.url}`;
      if (!allowed.has(key)) {
        errors.push(
          `${rel(indexPath)}: Related Reviews link is not exact-match in registry -> [${link.title}](${link.url})`,
        );
      }
    }
  } else {
    warnings.push(`${rel(existingReviewsPath)}: missing existing reviews registry`);
  }

  const comments = parseUserFeedbackComments(indexContent);
  if (!(comments.length === 4 || comments.length === 6)) {
    errors.push(`${rel(indexPath)}: UserFeedback must contain exactly 4 or 6 comments`);
  }

  if (await pathExists(researchPackPath)) {
    const packContent = await readFileSafe(researchPackPath);
    const packQuotes = parseResearchPackQuotes(packContent);
    const packQuoteSet = new Set(packQuotes);

    if (packQuotes.length === 0) {
      warnings.push(`${rel(researchPackPath)}: no quotes parsed from research pack`);
    }

    for (const comment of comments) {
      if (!packQuoteSet.has(comment)) {
        errors.push(`${rel(indexPath)}: UserFeedback comment is not verbatim from _research-pack.md`);
      }
    }
  } else {
    warnings.push(`${rel(researchPackPath)}: missing _research-pack.md, verbatim check skipped`);
  }

  reportAndExit();
}

function reportAndExit() {
  if (warnings.length > 0) {
    console.log("WARNINGS:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
    console.log("");
  }

  if (errors.length > 0) {
    console.error("RESEARCHER OUTPUT CHECK FAILED:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`RESEARCHER OUTPUT CHECK PASSED (${slug})`);
}

main().catch((error) => {
  console.error("RESEARCHER OUTPUT CHECK CRASHED");
  console.error(error);
  process.exit(1);
});
