# Published review image inventory — S2 candidate

The reproducible inventory is `node scripts/app-checks/review-image-inventory.mjs`; it reads the review collection source, excludes drafts, records each discovered use, resolves local references and decodes them with Sharp. It does not fetch remote images. The candidate output is retained outside Git at `/home/azur/Projects/.agent-runs/hardwarelab/logs/images-s2-inventory-final.json`; it was produced before source candidate S2 was frozen and must be rerun on S2 for final assurance. It is not evidence of production deployment.

| Published locale | Entries |
| --- | ---: |
| EN | 29 |
| FR | 21 |
| DE | 21 |
| RU | 22 |
| Total | 93 |

The observed candidate output records 93 card/carousel, 93 OG/Twitter/article/product, 92 body ReviewHero import and 52 related uses: 330 content-relative uses decoded, zero functional errors. One additional `en/orange-pi-5-plus` body ReviewHero is classified optional-not-present: this page has valid decoded frontmatter hero and OG images but does not invoke the component. No remote references appeared in this candidate inventory; remote availability remains unknown and positive remote handling is tested using a synthetic fixture. See Coder implementation for the source-pattern boundary and original logs.

Before fixes, a local production build rendered Samsung EN without its ReviewHero, and six localized PlayStation Slim/Raspberry Pi reviews referenced absent social fallback `/og-default.jpg` returning 404. The proposed minimal fixes restore the Samsung opening tag and use each translation's existing correct local image and OG files. The corresponding localized files matched their English asset hashes; no image was replaced. Candidate browser checks covered Steam Deck EN/FR/DE/RU, desktop/mobile, lazy decode, listing/related and social paths, plus corrected entries. These were not executed on frozen S2; exact-S independent verification and hosted checks remain mandatory.
