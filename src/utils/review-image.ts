/** String image references must be public-root paths or absolute HTTP(S) URLs.
 * Content-relative references are handled by Astro's image() schema instead. */
export function isSafeReviewImageUrl(value: string): boolean {
    if (!value || value !== value.trim() || /[\u0000-\u0020\\]/.test(value)) return false;
    if (value.startsWith('/') && !value.startsWith('//')) {
        try {
            const pathname = decodeURIComponent(value.split(/[?#]/, 1)[0] ?? '');
            return !pathname.includes('\\') && !pathname.split('/').some(part => part === '.' || part === '..');
        } catch { return false; }
    }
    try {
        const url = new URL(value);
        return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password;
    } catch { return false; }
}
