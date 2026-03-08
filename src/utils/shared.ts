export function isMissing(value: unknown): boolean {
    if (typeof value !== 'string') return value == null;
    const normalized = value.trim().toUpperCase();
    return normalized === '' || normalized === 'DRAFT' || normalized === 'UNDEFINED';
}
