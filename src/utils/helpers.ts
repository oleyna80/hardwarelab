// Вспомогательные функции

/**
 * Форматирует число в денежный формат
 */
export function formatCurrency(amount: number, currency: string = 'RUB'): string {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Форматирует дату
 */
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        ...options,
    };

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('ru-RU', defaultOptions).format(dateObj);
}

/**
 * Вычисляет время чтения текста
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

/**
 * Генерирует slug из строки
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}

/**
 * Обрезает текст до указанной длины
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '…';
}

/**
 * Добавляет affiliate-атрибуты к ссылке
 */
export function addAffiliateAttributes(url: string, retailer: string): string {
    const urlObj = new URL(url);
    // Здесь можно добавить UTM-параметры
    urlObj.searchParams.set('utm_source', 'hardwarelab');
    urlObj.searchParams.set('utm_medium', 'affiliate');
    urlObj.searchParams.set('utm_campaign', retailer.toLowerCase());

    return urlObj.toString();
}

/**
 * Получает цвет оценки
 */
export function getScoreColor(score: number): string {
    if (score >= 9) return 'bg-green-500';
    if (score >= 8) return 'bg-lime-500';
    if (score >= 7) return 'bg-yellow-500';
    if (score >= 6) return 'bg-orange-500';
    return 'bg-red-500';
}

/**
 * Дебаунс функция
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Проверяет, является ли устройство мобильным
 */
export function isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
}

/**
 * Копирует текст в буфер обмена
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
            return false;
        }

        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}
