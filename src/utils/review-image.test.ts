import { describe, expect, it } from 'vitest';
import { isSafeReviewImageUrl } from './review-image';

describe('review image string references', () => {
    it.each(['/images/product.webp', 'https://example.org/image.png', 'http://example.org/image.png'])('accepts %s', value => {
        expect(isSafeReviewImageUrl(value)).toBe(true);
    });
    it.each(['./missing.webp', '../image.webp', '//evil.test/image', '/images/../secret', '/%2e%2e/secret', '/images\\evil', 'javascript:alert(1)', 'https://user:pass@example.org/a', ' https://example.org/a'])('rejects %s', value => {
        expect(isSafeReviewImageUrl(value)).toBe(false);
    });
});
