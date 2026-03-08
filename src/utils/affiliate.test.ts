import { describe, expect, it } from 'vitest';
import { resolveAffiliateUrl } from './affiliate';

describe('resolveAffiliateUrl', () => {
    it('uses direct link when amazonUrl is valid', () => {
        const result = resolveAffiliateUrl('B012345678', 'de', 'https://amzn.to/example');

        expect(result.source).toBe('direct');
        expect(result.region).toBe('global');
        expect(result.isFallback).toBe(false);
        expect(result.url).toBe('https://amzn.to/example');
    });

    it('ignores unsafe direct links and falls back to ASIN mode', () => {
        const result = resolveAffiliateUrl('B012345678', 'en', 'javascript:alert(1)');

        expect(result.source).toBe('asin');
        expect(result.region).toBe('us');
        expect(result.url).toContain('amazon.com');
    });

    it('resolves local ASIN when available', () => {
        const result = resolveAffiliateUrl({ us: 'B1USUSUS01', de: 'B1DEDEDE01' }, 'de');

        expect(result.region).toBe('de');
        expect(result.isFallback).toBe(false);
        expect(result.url).toContain('amazon.de');
        expect(result.url).toContain('B1DEDEDE01');
    });

    it('falls back to US ASIN when local ASIN is missing', () => {
        const result = resolveAffiliateUrl({ us: 'B1USUSUS01' }, 'de');

        expect(result.region).toBe('us');
        expect(result.isFallback).toBe(true);
        expect(result.url).toContain('amazon.com');
        expect(result.url).toContain('B1USUSUS01');
    });

    it('treats DRAFT as missing and returns null URL', () => {
        const result = resolveAffiliateUrl('DRAFT', 'en');

        expect(result.url).toBeNull();
        expect(result.source).toBe('asin');
    });

    it('falls back for future locales without configured tags/domains', () => {
        const result = resolveAffiliateUrl({ us: 'B1USUSUS01', it: 'B1ITITIT01' }, 'it');

        expect(result.region).toBe('us');
        expect(result.isFallback).toBe(true);
        expect(result.url).toContain('amazon.com');
    });
});
