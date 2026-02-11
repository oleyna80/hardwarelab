import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DOC_TARGETS = [".agent", ".memory_bank", "README.md"];
const MARKDOWN_EXT = new Set([".md", ".mdx"]);
const SKIP_PREFIXES = [".agent/reports/", ".memory_bank/archive/"];

const errors = [];
const warnings = [];

function isExternalLink(target) {
  return (
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.startsWith("mailto:") ||
    target.startsWith("#") ||
    target.startsWith("/")
  );
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectMarkdownFiles(basePath) {
  const abs = path.resolve(ROOT, basePath);
  const stat = await fs.stat(abs);
  if (stat.isFile()) {
    return [abs];
  }

  const out = [];
  const stack = [abs];
  while (stack.length > 0) {
    const dir = stack.pop();
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (!MARKDOWN_EXT.has(path.extname(entry.name))) {
        continue;
      }
      out.push(full);
    }
  }
  return out;
}

function relativePath(abs) {
  return path.relative(ROOT, abs).replaceAll(path.sep, "/");
}

function shouldSkipFile(filePath) {
  const rel = relativePath(filePath);
  return SKIP_PREFIXES.some((prefix) => rel.startsWith(prefix));
}

async function validateMarkdownLinks(filePath, content) {
  const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const rawTarget = match[1].trim();
    const target = rawTarget.split(/\s+/)[0].replace(/^<|>$/g, "");

    if (target.startsWith("file://")) {
      errors.push(
        `${relativePath(filePath)}: local file:// link is not portable -> ${target}`,
      );
      continue;
    }

    if (isExternalLink(target)) {
      continue;
    }

    const cleanTarget = target.split("#")[0].split("?")[0];
    if (!cleanTarget) {
      continue;
    }

    const resolved = path.resolve(path.dirname(filePath), cleanTarget);
    if (!(await pathExists(resolved))) {
      errors.push(`${relativePath(filePath)}: broken link -> ${target}`);
    }
  }
}

function validateForbiddenPatterns(filePath, content) {
  if (content.includes(".agent/roles/tech-audit.md")) {
    errors.push(
      `${relativePath(filePath)}: stale role path '.agent/roles/tech-audit.md'`,
    );
  }

  if (
    relativePath(filePath).startsWith(".agent/workflows/") &&
    content.includes("image.png")
  ) {
    errors.push(
      `${relativePath(filePath)}: workflow uses 'image.png' instead of 'image.webp'`,
    );
  }

  const npmTestRegex = /\bnpm test\b/g;
  if (npmTestRegex.test(content)) {
    warnings.push(
      `${relativePath(filePath)}: uses 'npm test'; prefer explicit script command`,
    );
  }
}

function collectNpmRunCommands(content) {
  const runRegex = /\bnpm run ([a-zA-Z0-9:_-]+)/g;
  const out = [];
  let match;
  while ((match = runRegex.exec(content)) !== null) {
    out.push(match[1]);
  }
  return out;
}

async function main() {
  const packageJsonPath = path.resolve(ROOT, "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
  const knownScripts = new Set(Object.keys(packageJson.scripts || {}));

  const markdownFiles = (
    await Promise.all(DOC_TARGETS.map((target) => collectMarkdownFiles(target)))
  ).flat();

  for (const filePath of markdownFiles) {
    if (shouldSkipFile(filePath)) {
      continue;
    }

    const content = await fs.readFile(filePath, "utf8");

    await validateMarkdownLinks(filePath, content);
    validateForbiddenPatterns(filePath, content);

    for (const script of collectNpmRunCommands(content)) {
      if (!knownScripts.has(script)) {
        errors.push(
          `${relativePath(filePath)}: unknown npm script 'npm run ${script}'`,
        );
      }
    }
  }

  if (warnings.length > 0) {
    console.log("WARNINGS:");
    for (const item of warnings) {
      console.log(`- ${item}`);
    }
    console.log("");
  }

  if (errors.length > 0) {
    console.error("AGENT DOCS LINT FAILED:");
    for (const item of errors) {
      console.error(`- ${item}`);
    }
    process.exit(1);
  }

  console.log("AGENT DOCS LINT PASSED");
}

main().catch((error) => {
  console.error("AGENT DOCS LINT CRASHED");
  console.error(error);
  process.exit(1);
});
