import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

const CONTENT_DIR = 'src/content';
const MAX_SIZE_BYTES = 500 * 1024; // 500KB warning threshold

async function audit() {
    console.log('🔍 Scanning for images in src/content...');

    const images = await glob(`${CONTENT_DIR}/**/*.{png,jpg,jpeg,webp,avif}`);
    let issuesFound = 0;

    for (const imgPath of images) {
        try {
            const stats = fs.statSync(imgPath);
            const metadata = await sharp(imgPath).metadata();
            const ext = path.extname(imgPath).toLowerCase().replace('.', '');

            // Format check
            let actualFormat = metadata.format;
            if (actualFormat === 'jpeg') actualFormat = 'jpg';

            // Allow jpg/jpeg match
            const isFormatMismatch = (ext !== actualFormat) && !(ext === 'jpg' && actualFormat === 'jpeg');

            // Size check
            const isLarge = stats.size > MAX_SIZE_BYTES;

            if (isFormatMismatch || isLarge) {
                issuesFound++;
                console.log(`\n❌ Issue in: ${imgPath}`);
                if (isFormatMismatch) {
                    console.log(`   - Format Mismatch: Extension is .${ext}, but content is ${actualFormat.toUpperCase()}`);
                }
                if (isLarge) {
                    console.log(`   - File Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB (Threshold: ${(MAX_SIZE_BYTES / 1024).toFixed(0)} KB)`);
                    console.log(`   - Dimensions: ${metadata.width}x${metadata.height}`);
                }
            }
        } catch (e) {
            console.error(`⚠️ Error reading ${imgPath}:`, e.message);
        }
    }

    if (issuesFound === 0) {
        console.log('\n✅ No image issues found!');
    } else {
        console.log(`\n⚠️ Found ${issuesFound} images with issues.`);
    }
}

audit();
