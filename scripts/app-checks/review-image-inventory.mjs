import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { glob } from 'glob';
import { parseFrontmatter } from 'astro/markdown';
import sharp from 'sharp';

// Mirror the collection glob and draft filter used by the review pages.
export async function inventory(root = process.cwd()) {
    const content = path.join(root, 'src/content/reviews');
    const files = await glob('**/*.{md,mdx}', { cwd: content, ignore: '**/_*.{md,mdx}' });
    const entries = new Map();
    const counts = { en: 0, fr: 0, de: 0, ru: 0 };
    const records = [];
    let errors = 0;
    for (const file of files.sort()) {
        const text = await fs.readFile(path.join(content, file), 'utf8');
        const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
        if (!match) throw new Error(`Missing frontmatter: ${file}`);
        const { frontmatter: data } = parseFrontmatter(text);
        if (data.draft === true) continue;
        const id = file.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '');
        const lang = id.split('/')[0];
        if (!(lang in counts)) throw new Error(`Unexpected published locale: ${id}`);
        counts[lang]++;
        entries.set(id, { file, text, data });
    }
    async function add(id, role, ref, relative = true) {
        const record = { id, role, ref };
        records.push(record);
        if (!ref) { record.kind = 'optional'; return; }
        if (typeof ref !== 'string') { record.kind = 'invalid'; errors++; return; }
        if (/^https?:\/\//i.test(ref)) {
            try { const url = new URL(ref); if (url.username || url.password) throw new Error('credentials'); record.kind = 'remote-availability-unknown'; return; } catch { record.kind = 'invalid'; errors++; return; }
        }
        let decoded;
        try { decoded = decodeURIComponent(ref.split(/[?#]/, 1)[0]); } catch { record.kind = 'invalid'; errors++; return; }
        if (decoded.includes('\\') || decoded.split('/').some(part => part === '..' || part === '.') && !decoded.startsWith('./') || decoded.startsWith('//')) {
            record.kind = 'unsafe'; errors++; return;
        }
        let target;
        if (decoded.startsWith('/')) { record.kind = 'public'; target = path.join(root, 'public', decoded.slice(1)); }
        else if (relative && decoded.startsWith('./') && !decoded.slice(2).split('/').some(part => part === '..' || part === '.')) { record.kind = 'content-relative'; target = path.resolve(content, path.dirname(entries.get(id).file), decoded); }
        else { record.kind = 'invalid'; errors++; return; }
        try {
            const base = record.kind === 'public' ? path.join(root, 'public') : path.dirname(path.join(content, entries.get(id).file));
            const realBase = await fs.realpath(base);
            const realTarget = await fs.realpath(target);
            if (!realTarget.startsWith(realBase + path.sep)) throw new Error('path escapes asset directory');
            await sharp(realTarget, { failOn: 'error' }).raw().toBuffer();
            record.status = 'decoded';
        } catch (error) { record.status = `ERROR: ${error.message}`; errors++; }
    }
    for (const [id, entry] of entries) {
        const { data, text } = entry;
        await add(id, 'card/carousel', data.heroImage);
        await add(id, 'og/twitter/article/product', data.ogImage || data.heroImage || '/og-default.jpg');
        const imports = new Map([...text.matchAll(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g)].map(m => [m[1], m[2]]));
        const hero = text.match(/<ReviewHero\b[\s\S]*?\bimage=\{(\w+)\}/);
        if (hero) {
            const ref = imports.get(hero[1]);
            if (ref) await add(id, 'rendered-hero-import', ref);
            else { records.push({ id, role: 'rendered-hero-import', kind: 'unresolved', ref: hero[1] }); errors++; }
        }
        else records.push({ id, role: 'rendered-hero', kind: 'optional-not-present' });
        for (const match of text.matchAll(/<RelatedReview\s+[^>]*slug=["']([^"']+)["']/g)) {
            const target = /^(en|fr|de|ru)\//.test(match[1]) ? match[1] : `en/${match[1]}`;
            const related = entries.get(target);
            if (related) await add(target, `related-from:${id}`, related.data.heroImage);
            else records.push({ id, role: `related:${target}`, kind: 'optional-missing-entry' });
        }
    }
    return { counts, records, errors };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    const result = await inventory();
    console.log(JSON.stringify(result, null, 2));
    if (result.errors) process.exitCode = 1;
}
