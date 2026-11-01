import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { inventory } from './review-image-inventory.mjs';

test('published local references decode; missing, unsafe and corrupt references fail; drafts excluded', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'review-inventory-'));
    const dir = path.join(root, 'src/content/reviews/en/a');
    try {
        await mkdir(dir, { recursive: true });
        await mkdir(path.join(root, 'public'), { recursive: true });
        const image = await sharp({ create: { width: 2, height: 2, channels: 3, background: 'red' } }).png().toBuffer();
        await writeFile(path.join(dir, 'image.png'), image);
        await writeFile(path.join(root, 'public', 'image.png'), image);
        const write = async (hero, og = '/image.png') => writeFile(path.join(dir, 'index.mdx'), `---\nheroImage: "${hero}"\nogImage: "${og}"\n---\nimport image from './image.png';\n<ReviewHero image={image} />\n`);
        await write('./image.png');
        await writeFile(path.join(dir, 'draft.mdx'), '---\ndraft: true\nheroImage: "./missing.png"\n---\n');
        let result = await inventory(root);
        assert.equal(result.errors, 0);
        assert.equal(result.counts.en, 1);
        assert.ok(result.records.some(r => r.kind === 'content-relative' && r.status === 'decoded'));
        assert.ok(result.records.some(r => r.kind === 'public' && r.status === 'decoded'));
        await write('https://example.org/image.png');
        result = await inventory(root);
        assert.equal(result.errors, 0);
        assert.ok(result.records.some(r => r.kind === 'remote-availability-unknown'));
        await writeFile(path.join(dir, 'index.mdx'), '---\nheroImage: "./image.png"\nogImage: "/image.png"\n---\n<ReviewHero image={unresolved} />\n');
        assert.ok((await inventory(root)).errors > 0);
        await write('./missing.png');
        assert.ok((await inventory(root)).errors > 0);
        await write('../outside.png');
        assert.ok((await inventory(root)).errors > 0);
        await writeFile(path.join(dir, 'image.png'), 'invalid image');
        await write('./image.png');
        assert.ok((await inventory(root)).errors > 0);
    } finally { await rm(root, { recursive: true, force: true }); }
});
