/** Shared helpers for review-check scripts. */

export function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---\n?/);
  return m ? m[1] : null;
}

export function extractField(frontmatter, key) {
  return frontmatter.match(new RegExp(`^${key}:\\s*(.+)\\s*$`, "m"))?.[1]?.trim() ?? "";
}

export function parseTags(frontmatter) {
  const inline = extractField(frontmatter, "tags");
  if (inline) {
    const tagMatches = [...inline.matchAll(/"([^"]+)"|'([^']+)'/g)].map((m) => m[1] ?? m[2]);
    if (tagMatches.length > 0) return tagMatches;
  }

  const lines = frontmatter.split("\n");
  const idx = lines.findIndex((line) => /^tags:\s*$/.test(line));
  if (idx === -1) return [];

  const tags = [];
  for (let i = idx + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!/^\s*-\s+/.test(line)) break;
    const m = line.match(/^\s*-\s+["']?(.+?)["']?\s*$/);
    if (m?.[1]) tags.push(m[1]);
  }
  return tags;
}
