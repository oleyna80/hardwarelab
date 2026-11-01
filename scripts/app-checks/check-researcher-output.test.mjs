import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const validator = process.env.RESEARCHER_VALIDATOR ?? fileURLToPath(new URL("./check-researcher-output.mjs", import.meta.url));
const quotes = ["First quote", "Second quote", "Third quote", "Fourth quote"];

async function runFixture(t, heading, { mismatch = false, otherSection = false } = {}) {
  const root = await mkdtemp(path.join(tmpdir(), "researcher-quotes-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const dir = path.join(root, "src/content/reviews/en/example");
  await mkdir(dir, { recursive: true });
  const comments = quotes.map((quote, i) => `{ comment: "${mismatch && i === 0 ? `${quote}!` : quote}" }`).join(",\n");
  await writeFile(path.join(dir, "index.mdx"), `---\nheroImage: ./image.webp\nogImage: ./og.png\ncategory: hardware\ntags: [hardware]\n---\n> **Disclosure:**\n<AffiliateButton />\n<UserFeedback feedback={[${comments}]} />\n`);
  await Promise.all(["image.webp", "og.png"].map((name) => writeFile(path.join(dir, name), "")));
  const entries = quotes.map((quote) => `* quote: "${quote}"`).join("\n");
  await writeFile(path.join(dir, "_research-pack.md"), `${heading}\n${otherSection ? "No quotes here.\n## Other section\n" : ""}${entries}\n`);
  return spawnSync(process.execPath, [validator, "example"], { cwd: root, encoding: "utf8" });
}

for (const [name, heading] of [["legacy", "### User Quotes (source-verbatim)"], ["numbered", "## 6) User Quotes (source-verbatim, 4–6)"]]) {
  test(`${name} heading accepts exact quotes`, async (t) => {
    const result = await runFixture(t, heading);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /RESEARCHER OUTPUT CHECK PASSED/);
  });
}

for (const [name, heading, options] of [
  ["one-character mismatch", "## 6) User Quotes (source-verbatim, 4–6)", { mismatch: true }],
  ["quotes in another section", "## 6) User Quotes (source-verbatim, 4–6)", { otherSection: true }],
  ["unrelated heading", "## 6) User Quotes (Verbatim)", {}],
  ["malformed heading", "## 6) User Quotes (source-verbatim, 4–6) extra", {}],
]) {
  test(`${name} fails verbatim validation`, async (t) => {
    const result = await runFixture(t, heading, options);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /UserFeedback comment is not verbatim/);
  });
}
