import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ROLES_DIR = path.resolve(ROOT, ".agent/roles");
const ARCHIVE_DIR = path.resolve(ROLES_DIR, "archive");

const ACTIVE_ROLES = [
  "tech-lead",
  "coder",
  "single-researcher",
  "researcher",
  "translator",
  "qa",
];

const LEGACY_ROLES = [
  "bootstrap",
  "tech-auditor",
  "copywriter",
  "editor",
  "art-director",
  "assets",
  "codebase-researcher",
  "qa-code",
  "devops",
  "compliance-audit",
  "seo-analytics",
];

const REQUIRED_ROOT_DOCS = ["README.md", "_COMMON_RULES.md"];
const REQUIRED_ARCHIVE_DOCS = ["README.md"];

const errors = [];
const warnings = [];

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function safeRead(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

function collectAllowedRootMarkdown() {
  const out = new Set(REQUIRED_ROOT_DOCS);
  for (const role of ACTIVE_ROLES) {
    out.add(`${role}.md`);
  }
  for (const role of LEGACY_ROLES) {
    out.add(`${role}.md`);
  }
  return out;
}

async function validateRootShape() {
  const entries = await fs.readdir(ROLES_DIR, { withFileTypes: true });
  const rootMarkdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);

  const allowedRootMarkdown = collectAllowedRootMarkdown();
  for (const fileName of rootMarkdownFiles) {
    if (!allowedRootMarkdown.has(fileName)) {
      errors.push(
        `.agent/roles/${fileName}: unexpected role/doc in root (add to lean set or move to archive/)`,
      );
    }
  }

  for (const fileName of allowedRootMarkdown) {
    const abs = path.resolve(ROLES_DIR, fileName);
    if (!(await pathExists(abs))) {
      errors.push(`.agent/roles/${fileName}: required file is missing`);
    }
  }
}

async function validateArchiveShape() {
  if (!(await pathExists(ARCHIVE_DIR))) {
    errors.push(".agent/roles/archive/: directory is missing");
    return;
  }

  for (const fileName of REQUIRED_ARCHIVE_DOCS) {
    const abs = path.resolve(ARCHIVE_DIR, fileName);
    if (!(await pathExists(abs))) {
      errors.push(`.agent/roles/archive/${fileName}: required file is missing`);
    }
  }

  const archiveEntries = await fs.readdir(ARCHIVE_DIR, { withFileTypes: true });
  const archiveMarkdown = archiveEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);

  const expectedArchiveRoleFiles = new Set(LEGACY_ROLES.map((role) => `${role}.md`));
  for (const fileName of expectedArchiveRoleFiles) {
    if (!archiveMarkdown.includes(fileName)) {
      errors.push(`.agent/roles/archive/${fileName}: archived role file is missing`);
    }
  }

  for (const fileName of archiveMarkdown) {
    if (fileName === "README.md") {
      continue;
    }
    if (!expectedArchiveRoleFiles.has(fileName)) {
      warnings.push(
        `.agent/roles/archive/${fileName}: unexpected archived markdown file (verify this is intentional)`,
      );
    }
  }
}

async function validateLegacyAliases() {
  for (const role of LEGACY_ROLES) {
    const fileName = `${role}.md`;
    const rolePath = path.resolve(ROLES_DIR, fileName);
    if (!(await pathExists(rolePath))) {
      continue;
    }

    const content = await safeRead(rolePath);
    if (!content.includes(`# Legacy Role Alias: ${role}`)) {
      errors.push(
        `.agent/roles/${fileName}: missing required alias header '# Legacy Role Alias: ${role}'`,
      );
    }

    if (!content.includes("DEPRECATED")) {
      errors.push(`.agent/roles/${fileName}: missing DEPRECATED marker`);
    }

    if (!content.includes(`archive/${fileName}`)) {
      errors.push(
        `.agent/roles/${fileName}: missing canonical archive link to 'archive/${fileName}'`,
      );
    }

    const archivedPath = path.resolve(ARCHIVE_DIR, fileName);
    if (!(await pathExists(archivedPath))) {
      errors.push(
        `.agent/roles/${fileName}: alias points to missing archived file '.agent/roles/archive/${fileName}'`,
      );
    }
  }
}

async function validateActiveRoles() {
  for (const role of ACTIVE_ROLES) {
    const fileName = `${role}.md`;
    const rolePath = path.resolve(ROLES_DIR, fileName);
    if (!(await pathExists(rolePath))) {
      continue;
    }

    const content = await safeRead(rolePath);
    if (content.includes("Legacy Role Alias:")) {
      errors.push(`.agent/roles/${fileName}: active role cannot be an alias stub`);
    }
    if (content.includes("> **Status:** DEPRECATED")) {
      errors.push(`.agent/roles/${fileName}: active role must not be marked deprecated`);
    }
  }
}

async function main() {
  await validateRootShape();
  await validateArchiveShape();
  await validateLegacyAliases();
  await validateActiveRoles();

  if (warnings.length > 0) {
    console.log("WARNINGS:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
    console.log("");
  }

  if (errors.length > 0) {
    console.error("AGENT ROLES LINT FAILED:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("AGENT ROLES LINT PASSED");
}

main().catch((error) => {
  console.error("AGENT ROLES LINT CRASHED");
  console.error(error);
  process.exit(1);
});
