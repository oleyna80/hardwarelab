import fs from 'fs';

const pack = fs.readFileSync('src/content/reviews/en/qnap-tr-004-4-bay-usb/_research-pack.md', 'utf8');
const index = fs.readFileSync('src/content/reviews/en/qnap-tr-004-4-bay-usb/index.mdx', 'utf8');

const packQuotes = [];
const packRe = /^\s*\*\s+quote:\s+"(.*)"\s*$/gm;
let m;
while ((m = packRe.exec(pack)) !== null) {
    packQuotes.push(m[1]);
}

const indexQuotes = [];
const blockMatch = index.match(/<UserFeedback\s+feedback=\{\[([\s\S]*?)\]\}\s*\/>/m);
if (blockMatch) {
    const block = blockMatch[1];
    const re = /comment:\s*"((?:[^"\\]|\\.)*)"/g;
    while ((m = re.exec(block)) !== null) {
        indexQuotes.push(m[1].replaceAll('\\"', '"'));
    }
}

console.log(`Pack Quotes: ${packQuotes.length}`);
console.log(`Index Quotes: ${indexQuotes.length}`);

packQuotes.forEach(q => {
    if (!indexQuotes.includes(q)) {
        console.log(`MISSING IN INDEX: "${q}"`);
    }
});

indexQuotes.forEach(q => {
    if (!packQuotes.includes(q)) {
        console.log(`EXTRA IN INDEX: "${q}"`);
    }
});
