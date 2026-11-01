import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { glob } from 'glob';

const MAX_SIZE_BYTES = 500 * 1024;

export async function auditImages(images) {
    let errors = 0;
    let warnings = 0;
    for (const imgPath of images) {
        try {
            const stats = await fs.stat(imgPath);
            const pipeline = sharp(imgPath, { failOn: 'error' });
            const metadata = await pipeline.metadata();
            await pipeline.raw().toBuffer();
            const ext = path.extname(imgPath).slice(1).toLowerCase().replace('jpeg', 'jpg');
            const format = metadata.format?.replace('jpeg', 'jpg');
            if (ext !== format || stats.size > MAX_SIZE_BYTES) {
                warnings++;
                console.log(`WARNING ${imgPath}: ${ext !== format ? `extension ${ext}, format ${format}; ` : ''}${stats.size > MAX_SIZE_BYTES ? `size ${stats.size} bytes exceeds ${MAX_SIZE_BYTES}` : ''}`);
            }
        } catch (error) {
            errors++;
            console.error(`ERROR ${imgPath}: ${error.message}`);
        }
    }
    return { errors, warnings };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    const images = process.argv.length > 2 ? process.argv.slice(2) : await glob('src/content/**/*.{png,jpg,jpeg,webp,avif}');
    const { errors, warnings } = await auditImages(images);
    console.log(`Image audit: ${images.length} files, ${errors} errors, ${warnings} warnings`);
    if (errors) process.exitCode = 1;
}
