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
    // Handle bracket-array format: [tag1, "tag2", 'tag3'] — quoted and unquoted
    const bracketMatch = inline.match(/^\[(.+)\]$/);
    if (bracketMatch) {
      const tags = bracketMatch[1]
        .split(',')
        .map(t => t.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      if (tags.length > 0) return tags;
    }
    // Fallback: quoted-only inline without brackets
    const tagMatches = [...inline.matchAll(/"([^"]+)"|'([^']+)'/g)].map((m) => m[1] ?? m[2]);
    if (tagMatches.length > 0) return tagMatches;
  }

  // YAML list format: tags:\n  - item
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
