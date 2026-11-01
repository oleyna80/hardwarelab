import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { auditImages } from './audit-images.mjs';

test('missing and corrupt files fail; valid oversized image is a warning', async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), 'image-audit-'));
    try {
        const valid = path.join(dir, 'large.png');
        const data = Buffer.alloc(600 * 600 * 3);
        for (let i = 0; i < data.length; i++) data[i] = Math.floor(Math.random() * 256);
        await sharp(data, { raw: { width: 600, height: 600, channels: 3 } }).png().toFile(valid);
        assert.deepEqual(await auditImages([valid]), { errors: 0, warnings: 1 });
        const cli = fileURLToPath(new URL('./audit-images.mjs', import.meta.url));
        assert.equal(spawnSync(process.execPath, [cli, valid]).status, 0);
        const broken = path.join(dir, 'broken.png');
        await writeFile(broken, 'not an image');
        assert.equal((await auditImages([broken, path.join(dir, 'missing.png')])).errors, 2);
        assert.notEqual(spawnSync(process.execPath, [cli, broken]).status, 0);
        assert.notEqual(spawnSync(process.execPath, [cli, path.join(dir, 'missing.png')]).status, 0);
    } finally { await rm(dir, { recursive: true, force: true }); }
});
