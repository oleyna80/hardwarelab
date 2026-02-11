import sharp from 'sharp';
import fs from 'fs';

const input = 'src/content/reviews/en/samsung-57-odyssey-neo-g9-g95nc/image.png';
const output = 'src/content/reviews/en/samsung-57-odyssey-neo-g9-g95nc/image.webp';

sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output)
    .then(() => {
        console.log('Converted to webp');
        fs.unlinkSync(input);
    })
    .catch(err => console.error(err));
