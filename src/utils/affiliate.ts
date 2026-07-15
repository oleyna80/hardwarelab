import { AMAZON_CONFIG, type ConfiguredRegion } from '../config';
import { isMissing } from './shared';

type NonConfiguredRegion = 'it' | 'es';
export type TargetLocale = 'en' | 'ru' | 'de' | 'fr' | 'it' | 'es';
export type AsinInput = string | Partial<Record<ConfiguredRegion | NonConfiguredRegion, string | undefined>>;

export interface AffiliateResult {
    url: string | null;
    label: string;
    isFallback: boolean;
    region: ConfiguredRegion | 'global';
    source: 'direct' | 'asin';
}

const REGION_MAP: Record<TargetLocale, ConfiguredRegion | NonConfiguredRegion> = {
    en: 'us',
    ru: 'us',
    de: 'de',
    fr: 'fr',
    it: 'it',
    es: 'es',
};

const ALLOWED_DIRECT_HOSTS = new Set([
    'amazon.com',
    'amazon.co.uk',
    'amazon.ca',
    'amazon.com.au',
    'amazon.de',
    'amazon.fr',
    'amazon.it',
    'amazon.es',
    'amzn.to',
]);

function isConfiguredRegion(value: string): value is ConfiguredRegion {
    return value in AMAZON_CONFIG.tags && value in AMAZON_CONFIG.domains;
}

function parseLocale(lang: string): string {
    return lang.trim().toLowerCase().split(/[-_]/)[0] ?? 'en';
}

function resolvePreferredRegion(lang: string): ConfiguredRegion | NonConfiguredRegion {
    const locale = parseLocale(lang);
    return REGION_MAP[locale as TargetLocale] || 'us';
}

function resolveDirectUrl(amazonUrlProp?: string): string | null {
    if (!amazonUrlProp || isMissing(amazonUrlProp)) return null;
    const candidate = amazonUrlProp.trim();

    try {
        const parsed = new URL(candidate);
        if (!['http:', 'https:'].includes(parsed.protocol)) return null;

        const host = parsed.hostname.toLowerCase();
        const isAllowed = Array.from(ALLOWED_DIRECT_HOSTS).some(
            (allowedHost) => host === allowedHost || host.endsWith(`.${allowedHost}`),
        );
        return isAllowed ? candidate : null;
    } catch {
        return null;
    }
}

function buildAsinResult(asin: string | undefined, region: ConfiguredRegion, isFallback: boolean): AffiliateResult {
    if (!asin) {
        return {
            url: null,
            label: 'Not available',
            isFallback,
            region,
            source: 'asin',
        };
    }

    const { domain, tag } = AMAZON_CONFIG.getRegionalConfig(region);
    return {
        url: `https://www.${domain}/dp/${asin}/?tag=${tag}`,
        label: isFallback ? 'Buy on Amazon US (International)' : `Buy on Amazon ${region.toUpperCase()}`,
        isFallback,
        region,
        source: 'asin',
    };
}

export function resolveAffiliateUrl(
    asin: AsinInput | undefined,
    lang: string,
    amazonUrlProp?: string,
): AffiliateResult {
    const directUrl = resolveDirectUrl(amazonUrlProp);
    if (directUrl) {
        return {
            url: directUrl,
            label: 'Buy on Amazon',
            isFallback: false,
            region: 'global',
            source: 'direct',
        };
    }

    const preferredRegion = resolvePreferredRegion(lang);
    const activeRegion: ConfiguredRegion = isConfiguredRegion(preferredRegion) ? preferredRegion : 'us';

    let targetAsin: string | undefined;
    let isFallback = preferredRegion !== activeRegion;
    let targetRegion: ConfiguredRegion = activeRegion;

    if (typeof asin === 'string') {
        if (!isMissing(asin)) {
            targetAsin = asin.trim();
            // Use the regional store if the current language maps to a configured region (de, fr…)
            // For English/Russian/non-configured locales, fall back to US
            if (isConfiguredRegion(preferredRegion)) {
                targetRegion = preferredRegion;
                isFallback = false;
            } else {
                targetRegion = 'us';
                isFallback = !['en', 'ru'].includes(parseLocale(lang));
            }
        }
        return buildAsinResult(targetAsin, targetRegion, isFallback);
    }

    if (asin && typeof asin === 'object') {
        const localAsin = asin[activeRegion];
        if (!isMissing(localAsin)) {
            targetAsin = localAsin?.trim();
            targetRegion = activeRegion;
        } else if (!isMissing(asin.us)) {
            targetAsin = asin.us?.trim();
            targetRegion = 'us';
            isFallback = preferredRegion !== 'us' || activeRegion !== 'us';
        }
    }

    return buildAsinResult(targetAsin, targetRegion, isFallback);
}
