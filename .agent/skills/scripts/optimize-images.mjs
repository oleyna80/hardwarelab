import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

const CONTENT_DIR = 'src/content';
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function optimize() {
    console.log('🚀 Starting Image Optimization...');

    // Find all potential images
    const images = await glob(`${CONTENT_DIR}/**/*.{png,jpg,jpeg,webp}`);
    let fixedCount = 0;
    let failedCount = 0;

    for (const imgPath of images) {
        try {
            const ext = path.extname(imgPath).toLowerCase();
            const buffer = fs.readFileSync(imgPath);
            let pipeline = sharp(buffer);

            // Get metadata to decide if resize is needed
            const metadata = await pipeline.metadata();

            // Should we process? 
            // Yes if:
            // 1. Dimensions > MAX_WIDTH
            // 2. Format mismatch (e.g. file is .png but content is jpeg)
            // 3. Just to ensure high compression (we'll re-save everything to be safe and uniform)

            let processor = pipeline.resize({
                width: MAX_WIDTH,
                withoutEnlargement: true
            });

            let newBuffer;
            let targetFormat = '';

            if (ext === '.webp') {
                targetFormat = 'webp';
                newBuffer = await processor.webp({ quality: QUALITY }).toBuffer();
            } else if (ext === '.png') {
                targetFormat = 'png';
                // PNG compression level 8 is high compression, slow speed
                newBuffer = await processor.png({ quality: QUALITY, compressionLevel: 8 }).toBuffer();
            } else if (ext === '.jpg' || ext === '.jpeg') {
                targetFormat = 'jpeg';
                newBuffer = await processor.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
            }

            if (newBuffer) {
                // Check if we actually saved space or fixed format
                const oldSize = fs.statSync(imgPath).size;
                const newSize = newBuffer.length;

                // Overwrite the file
                fs.writeFileSync(imgPath, newBuffer);

                // Logging
                const sizeDiff = ((oldSize - newSize) / 1024 / 1024).toFixed(2);
                if (oldSize > newSize) {
                    console.log(`✅ Optimized: ${imgPath} (-${sizeDiff} MB)`);
                } else {
                    // Verify format mismatch fix even if size didn't drop much
                    let actualFormat = metadata.format;
                    if (actualFormat === 'jpeg') actualFormat = 'jpg';
                    // simple check
                    if (!ext.includes(actualFormat)) {
                        console.log(`✅ Fixed Format: ${imgPath} (Was ${actualFormat.toUpperCase()}, Now Real ${targetFormat.toUpperCase()})`);
                    } else {
                        // console.log(`   Processed: ${imgPath} (No size gain)`);
                    }
                }
                fixedCount++;
            }

        } catch (e) {
            console.error(`❌ Failed to optimize ${imgPath}:`, e.message);
            failedCount++;
        }
    }

    console.log(`\n🎉 Optimization Complete.`);
    console.log(`   Processed: ${fixedCount} files`);
    console.log(`   Failed: ${failedCount} files`);
}

optimize();
