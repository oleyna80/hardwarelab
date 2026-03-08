#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { glob } from 'glob';

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = Number(process.env.AFFILIATE_CHECK_PORT || '4173');
const STARTUP_TIMEOUT_MS = 30_000;
const REQUEST_TIMEOUT_MS = 12_000;
const CHECKABLE_LANGS = new Set(['en', 'fr', 'de', 'ru', 'it', 'es']);

const AMAZON_CONFIG = {
  domains: { us: 'amazon.com', de: 'amazon.de', fr: 'amazon.fr' },
  tags: {
    us: process.env.PUBLIC_AMAZON_TAG_US || 'YOUR_TAG-20',
    de: process.env.PUBLIC_AMAZON_TAG_DE || 'YOUR_TAG-03',
    fr: process.env.PUBLIC_AMAZON_TAG_FR || 'YOUR_TAG-21',
  },
};

const REGION_MAP = {
  en: 'us',
  ru: 'us',
  de: 'de',
  fr: 'fr',
  it: 'it',
  es: 'es',
};

const ALLOWED_DIRECT_HOSTS = ['amazon.com', 'amazon.de', 'amazon.fr', 'amazon.it', 'amazon.es', 'amzn.to'];

function isMissing(value) {
  if (typeof value !== 'string') return value == null;
  const normalized = value.trim().toUpperCase();
  return normalized === '' || normalized === 'DRAFT' || normalized === 'UNDEFINED';
}

function parseArgs() {
  const args = process.argv.slice(2);
  const baseUrlArg = args.find((arg) => arg.startsWith('--base-url='));
  return {
    baseUrl: baseUrlArg ? baseUrlArg.replace('--base-url=', '').trim() : null,
  };
}

function withTimeout(promise, timeoutMs, errorMessage) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(errorMessage)), timeoutMs);
  });
  return Promise.race([promise, timeout]);
}

async function parseFrontmatter(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;

  try {
    const { parse } = await import('yaml');
    return parse(match[1]) || {};
  } catch (error) {
    console.error(`Failed to parse frontmatter: ${filePath}`);
    throw error;
  }
}

function deriveMetaFromPath(filePath) {
  const rel = path.relative(path.join(process.cwd(), 'src/content/reviews'), filePath).replace(/\\/g, '/');
  const parts = rel.split('/');
  if (parts.length < 3) return null;

  let lang = 'en';
  let slugParts = parts.slice(0, -1);
  const maybeLang = parts[0].toLowerCase();

  if (CHECKABLE_LANGS.has(maybeLang)) {
    lang = maybeLang;
    slugParts = parts.slice(1, -1);
  }

  const slug = slugParts.join('/');
  if (!slug) return null;

  return { lang, slug };
}

function hostAllowed(hostname) {
  return ALLOWED_DIRECT_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
}

function resolveDirectUrl(value) {
  if (isMissing(value)) return null;
  const candidate = String(value).trim();

  try {
    const parsed = new URL(candidate);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
    if (!hostAllowed(parsed.hostname.toLowerCase())) return null;
    return candidate;
  } catch {
    return null;
  }
}

function normalizeAsinObject(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const out = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'string') out[key] = value;
  }
  return out;
}

function resolveAffiliateExpectation(asin, lang, amazonUrl) {
  const directUrl = resolveDirectUrl(amazonUrl);
  if (directUrl) {
    return { source: 'direct', url: directUrl };
  }

  const preferred = REGION_MAP[lang] || 'us';
  const configured = Object.prototype.hasOwnProperty.call(AMAZON_CONFIG.tags, preferred) ? preferred : 'us';
  let targetRegion = configured;
  let targetAsin = null;

  if (typeof asin === 'string') {
    if (!isMissing(asin)) {
      targetAsin = asin.trim();
      targetRegion = 'us';
    }
  } else {
    const asinObject = normalizeAsinObject(asin);
    if (asinObject) {
      if (!isMissing(asinObject[configured])) {
        targetAsin = asinObject[configured].trim();
        targetRegion = configured;
      } else if (!isMissing(asinObject.us)) {
        targetAsin = asinObject.us.trim();
        targetRegion = 'us';
      }
    }
  }

  if (!targetAsin) return { source: 'asin', url: null };
  const domain = AMAZON_CONFIG.domains[targetRegion] || AMAZON_CONFIG.domains.us;
  const tag = AMAZON_CONFIG.tags[targetRegion] || AMAZON_CONFIG.tags.us;
  return {
    source: 'asin',
    url: `https://www.${domain}/dp/${targetAsin}/?tag=${tag}`,
  };
}

function tokenizeRel(relValue) {
  return new Set(String(relValue || '').toLowerCase().split(/\s+/).filter(Boolean));
}

function parseAnchorTags(html) {
  const anchorPattern = /<a\b[^>]*>/gi;
  const hrefPattern = /\bhref=(?:"([^"]*)"|'([^']*)')/i;
  const relPattern = /\brel=(?:"([^"]*)"|'([^']*)')/i;
  const anchors = [];

  for (const tag of html.match(anchorPattern) || []) {
    const hrefMatch = tag.match(hrefPattern);
    if (!hrefMatch) continue;

    const href = hrefMatch[1] || hrefMatch[2];
    const relMatch = tag.match(relPattern);
    const rel = relMatch ? (relMatch[1] || relMatch[2] || '') : '';
    anchors.push({ href, rel, relTokens: tokenizeRel(rel) });
  }

  return anchors;
}

function normalizeDirectTarget(url) {
  const parsed = new URL(url);
  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
  const pathname = parsed.pathname.replace(/\/+$/, '') || '/';
  return { host, pathname };
}

function matchesDirect(foundHref, expectedHref) {
  try {
    const found = normalizeDirectTarget(foundHref);
    const expected = normalizeDirectTarget(expectedHref);
    return found.host === expected.host && found.pathname === expected.pathname;
  } catch {
    return false;
  }
}

function matchesAsin(foundHref, expectedHref) {
  try {
    const found = new URL(foundHref);
    const expected = new URL(expectedHref);
    const foundHost = found.hostname.toLowerCase().replace(/^www\./, '');
    const expectedHost = expected.hostname.toLowerCase().replace(/^www\./, '');
    if (foundHost !== expectedHost) return false;

    const expectedAsin = expected.pathname.split('/').filter(Boolean)[1];
    if (!expectedAsin) return false;
    if (!found.pathname.includes(`/dp/${expectedAsin}`)) return false;

    const foundTag = found.searchParams.get('tag');
    const expectedTag = expected.searchParams.get('tag');
    return foundTag === expectedTag;
  } catch {
    return false;
  }
}

async function waitForServer(baseUrl) {
  const startedAt = Date.now();
  let lastError = null;

  while (Date.now() - startedAt < STARTUP_TIMEOUT_MS) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok || response.status < 500) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  throw new Error(`Preview server did not start in time (${STARTUP_TIMEOUT_MS}ms): ${String(lastError || '')}`);
}

function startPreviewServer(host, port) {
  const proc = spawn('npm', ['run', 'preview', '--', '--host', host, '--port', String(port)], {
    stdio: 'ignore',
    shell: false,
  });
  return proc;
}

async function collectTargets() {
  const reviewFiles = await glob('src/content/reviews/**/index.mdx');
  const targets = [];

  for (const filePath of reviewFiles) {
    const pathMeta = deriveMetaFromPath(filePath);
    if (!pathMeta) continue;

    const frontmatter = await parseFrontmatter(filePath);
    if (!frontmatter || frontmatter.draft === true) continue;

    const hasMonetizationData = !isMissing(frontmatter.amazonUrl)
      || (typeof frontmatter.asin === 'string' && !isMissing(frontmatter.asin))
      || (frontmatter.asin && typeof frontmatter.asin === 'object' && Object.values(frontmatter.asin).some((v) => !isMissing(v)));
    if (!hasMonetizationData) continue;

    const isBuild = frontmatter.reviewType === 'build';
    const localeDirExists = pathMeta.lang === 'en'
      ? true
      : fs.existsSync(path.join(process.cwd(), 'src/pages', pathMeta.lang, 'reviews'));
    if (!isBuild && !localeDirExists) continue;

    const pagePath = isBuild
      ? `/builds/${pathMeta.slug.split('/').pop()}`
      : pathMeta.lang === 'en'
        ? `/reviews/${pathMeta.slug}`
        : `/${pathMeta.lang}/reviews/${pathMeta.slug}`;

    const expected = resolveAffiliateExpectation(frontmatter.asin, pathMeta.lang, frontmatter.amazonUrl);
    targets.push({
      filePath,
      pagePath,
      expected,
    });
  }

  return targets;
}

async function main() {
  const { baseUrl: baseUrlArg } = parseArgs();
  const baseUrl = baseUrlArg || `http://${DEFAULT_HOST}:${DEFAULT_PORT}`;

  const targets = await collectTargets();
  if (targets.length === 0) {
    console.log('⚠️ No monetized published review pages found for affiliate check.');
    process.exit(0);
  }

  let previewProc = null;
  if (!baseUrlArg) {
    previewProc = startPreviewServer(DEFAULT_HOST, DEFAULT_PORT);
  }

  try {
    await waitForServer(baseUrl);
    const errors = [];

    for (const target of targets) {
      const pageUrl = new URL(target.pagePath, baseUrl).toString();
      let html = '';

      try {
        const response = await withTimeout(
          fetch(pageUrl),
          REQUEST_TIMEOUT_MS,
          `Timeout while fetching ${pageUrl}`,
        );
        if (!response.ok) {
          errors.push(`${target.pagePath}: HTTP ${response.status}`);
          continue;
        }
        html = await response.text();
      } catch (error) {
        errors.push(`${target.pagePath}: fetch failed (${String(error)})`);
        continue;
      }

      const links = parseAnchorTags(html);
      const sponsoredLinks = links.filter((link) => link.relTokens.has('sponsored'));

      if (sponsoredLinks.length === 0) {
        errors.push(`${target.pagePath}: missing sponsored affiliate link`);
        continue;
      }

      const invalidRel = sponsoredLinks.find((link) => !link.relTokens.has('nofollow'));
      if (invalidRel) {
        errors.push(`${target.pagePath}: sponsored link missing nofollow`);
      }

      if (!target.expected.url) {
        errors.push(`${target.pagePath}: monetization data exists but resolver produced empty URL`);
        continue;
      }

      const matches = sponsoredLinks.some((link) => (
        target.expected.source === 'direct'
          ? matchesDirect(link.href, target.expected.url)
          : matchesAsin(link.href, target.expected.url)
      ));

      if (!matches) {
        errors.push(`${target.pagePath}: affiliate URL mismatch (expected ${target.expected.url})`);
      }
    }

    if (errors.length) {
      console.log('\n=== Affiliate Compliance Report ===\n');
      for (const error of errors) {
        console.log(`❌ ${error}`);
      }
      console.log(`\nChecked ${targets.length} pages, found ${errors.length} issue(s).`);
      process.exit(1);
    }

    console.log('\n=== Affiliate Compliance Report ===\n');
    console.log(`✅ Checked ${targets.length} monetized pages. No affiliate issues found.`);
  } finally {
    if (previewProc) {
      previewProc.kill('SIGTERM');
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
