import sharp from 'sharp';

const path = 'src/content/reviews/en/samsung-57-odyssey-neo-g9-g95nc/image.webp';

async function check() {
    try {
        const meta = await sharp(path).metadata();
        console.log('Metadata:', JSON.stringify(meta, null, 2));
    } catch (e) {
        console.error('Error reading image:', e);
    }
}

check();
