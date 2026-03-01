#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { globSync } from "glob";

const DISCLOSURE_BLOCK_RE =
    />\s*\*\*(Disclosure|Divulgation|Offenlegung|Раскрытие информации)\s*:?\*\*/i;
const AFFILIATE_SIGNAL_RE = /<AffiliateButton|amazonUrl\s*:|asin\s*:/;

const ENGLISH_DISCLOSURE_RE = /As an Amazon Associate/i;

const EXPECTED_BY_LOCALE = {
    en: /As an Amazon Associate/i,
    fr: /Partenaire Amazon/i,
    de: /Amazon-Partner/i,
    ru: /(партнер Amazon|партн(?:е|ё)рск[а-я\s]+Amazon|участник[а-я\s]+Amazon)/i,
    es: /(Afiliado de Amazon|Asociado de Amazon)/i,
    it: /Affiliato Amazon/i,
};

const files = globSync("src/content/reviews/*/*/index.mdx").sort();
const errors = [];
let checked = 0;
let skipped = 0;

for (const file of files) {
    const segments = file.split(path.sep);
    const locale = segments[3];
    const expected = EXPECTED_BY_LOCALE[locale];

    if (!expected) {
        skipped += 1;
        continue;
    }

    const content = fs.readFileSync(file, "utf8");
    const hasDisclosureBlock = DISCLOSURE_BLOCK_RE.test(content);
    const hasAffiliateSignals = AFFILIATE_SIGNAL_RE.test(content);

    if (hasAffiliateSignals && !hasDisclosureBlock) {
        errors.push(`${file}: missing disclosure block for affiliate content`);
        continue;
    }

    if (!hasDisclosureBlock) {
        skipped += 1;
        continue;
    }

    checked += 1;

    if (!expected.test(content)) {
        errors.push(
            `${file}: disclosure block does not match locale "${locale}" expected phrasing`,
        );
    }

    if (locale !== "en" && ENGLISH_DISCLOSURE_RE.test(content)) {
        errors.push(
            `${file}: contains EN disclosure phrase "As an Amazon Associate" in non-EN locale`,
        );
    }
}

if (errors.length > 0) {
    console.error("\nDisclosure lint failed:\n");
    for (const error of errors) {
        console.error(`- ${error}`);
    }
    console.error(
        `\nChecked: ${checked}, skipped (no disclosure block for non-affiliate or unsupported locale): ${skipped}`,
    );
    process.exit(1);
}

console.log(
    `Disclosure lint passed. Checked: ${checked}, skipped (no disclosure block for non-affiliate or unsupported locale): ${skipped}`,
);
