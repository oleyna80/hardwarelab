import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SKILLS_DIR = path.resolve(ROOT, ".agent/skills");
const PLACEHOLDER_MARKER = "Add your skill instructions here.";

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

async function readIfExists(filePath) {
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
  const block = m[1];
  const name = block.match(/^name:\s*(.+)\s*$/m)?.[1]?.trim() ?? "";
  const description = block.match(/^description:\s*(.+)\s*$/m)?.[1]?.trim() ?? "";
  return { name, description, bodyStart: m[0].length };
}

function isExternalLink(target) {
  return (
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.startsWith("mailto:") ||
    target.startsWith("#") ||
    target.startsWith("/")
  );
}

async function validateMarkdownLinks(filePath, content) {
  const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const rawTarget = match[1].trim();
    const target = rawTarget.split(/\s+/)[0].replace(/^<|>$/g, "");

    if (isExternalLink(target)) {
      continue;
    }

    const cleanTarget = target.split("#")[0].split("?")[0];
    if (!cleanTarget) {
      continue;
    }

    const resolved = path.resolve(path.dirname(filePath), cleanTarget);
    if (!(await pathExists(resolved))) {
      errors.push(`${rel(filePath)}: broken link -> ${target}`);
    }
  }
}

async function collectSkillFiles() {
  const entries = await fs.readdir(SKILLS_DIR, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.resolve(SKILLS_DIR, entry.name);
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
      continue;
    }
    if (entry.isDirectory()) {
      const skillFile = path.resolve(full, "SKILL.md");
      if (await pathExists(skillFile)) {
        files.push(skillFile);
      } else {
        warnings.push(`${rel(full)}: directory has no SKILL.md`);
      }
    }
  }

  return files.sort();
}

async function validateSkillFile(filePath, names) {
  const content = await readIfExists(filePath);
  if (!content.trim()) {
    errors.push(`${rel(filePath)}: file is empty`);
    return;
  }

  const fm = parseFrontmatter(content);
  if (!fm) {
    errors.push(`${rel(filePath)}: missing YAML frontmatter`);
    return;
  }

  if (!fm.name) {
    errors.push(`${rel(filePath)}: frontmatter missing 'name'`);
  } else if (names.has(fm.name)) {
    errors.push(`${rel(filePath)}: duplicated skill name '${fm.name}'`);
  } else {
    names.add(fm.name);
  }

  if (!fm.description) {
    errors.push(`${rel(filePath)}: frontmatter missing 'description'`);
  }

  if (!content.includes("# ")) {
    errors.push(`${rel(filePath)}: missing markdown heading body`);
  }

  if (content.includes(PLACEHOLDER_MARKER)) {
    errors.push(`${rel(filePath)}: contains placeholder text '${PLACEHOLDER_MARKER}'`);
  }

  await validateMarkdownLinks(filePath, content);
}

async function main() {
  if (!(await pathExists(SKILLS_DIR))) {
    errors.push(".agent/skills/: directory is missing");
  } else {
    const skillFiles = await collectSkillFiles();
    const names = new Set();

    for (const filePath of skillFiles) {
      await validateSkillFile(filePath, names);
    }
  }

  if (warnings.length > 0) {
    console.log("WARNINGS:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
    console.log("");
  }

  if (errors.length > 0) {
    console.error("AGENT SKILLS LINT FAILED:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("AGENT SKILLS LINT PASSED");
}

main().catch((error) => {
  console.error("AGENT SKILLS LINT CRASHED");
  console.error(error);
  process.exit(1);
});
