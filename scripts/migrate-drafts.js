#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const DRY_RUN = process.argv.includes('--dry-run');
const FILE_PATTERNS = ['src/content/reviews/**/{index,_draft}.mdx'];

function extractFrontmatter(source) {
    const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match || match.index !== 0) return null;
    return {
        raw: match[0],
        body: match[1],
        rest: source.slice(match[0].length),
    };
}

function shouldMarkAsDraft(filePath, frontmatterBody) {
    const fileName = path.basename(filePath).toLowerCase();
    const isDraftFile = fileName === '_draft.mdx';
    const hasDraftAsin = /^\s*asin:\s*["']?\s*draft\s*["']?\s*$/im.test(frontmatterBody);
    return isDraftFile || hasDraftAsin;
}

function withDraftEnabled(frontmatterBody) {
    if (/^\s*draft:\s*true\s*$/im.test(frontmatterBody)) {
        return frontmatterBody;
    }
    if (/^\s*draft:\s*false\s*$/im.test(frontmatterBody)) {
        return frontmatterBody.replace(/^\s*draft:\s*false\s*$/im, 'draft: true');
    }
    return `${frontmatterBody}\ndraft: true`;
}

async function run() {
    const files = await glob(FILE_PATTERNS);
    let changed = 0;

    for (const filePath of files) {
        const source = fs.readFileSync(filePath, 'utf8');
        const frontmatter = extractFrontmatter(source);
        if (!frontmatter) continue;
        if (!shouldMarkAsDraft(filePath, frontmatter.body)) continue;

        const updatedBody = withDraftEnabled(frontmatter.body);
        if (updatedBody === frontmatter.body) continue;

        const nextSource = `---\n${updatedBody}\n---\n${frontmatter.rest}`;
        changed += 1;

        if (DRY_RUN) {
            console.log(`[DRY-RUN] ${filePath}`);
            continue;
        }

        fs.writeFileSync(filePath, nextSource);
        console.log(`[UPDATED] ${filePath}`);
    }

    console.log(`\nProcessed ${files.length} files, changed ${changed}${DRY_RUN ? ' (dry-run)' : ''}.`);
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
