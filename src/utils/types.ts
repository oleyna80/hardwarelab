// TypeScript типы проекта

export type Category =
    | 'cpu'
    | 'gpu'
    | 'ram'
    | 'storage'
    | 'motherboard'
    | 'cooling'
    | 'psu'
    | 'case';

export interface Product {
    id: string;
    title: string;
    category: Category;
    manufacturer: string;
    model: string;
    releaseDate: Date;
    specs: Record<string, any>;
    affiliateLinks?: AffiliateLink[];
    featured: boolean;
    image?: string;
}

export interface AffiliateLink {
    retailer: string;
    url: string;
    price: number;
    currency?: string;
}

export interface Review {
    id: string;
    title: string;
    productId: string;
    author: string;
    date: Date;
    excerpt: string;
    score: number;
    tags: string[];
    readingTime?: number;
    coverImage?: string;
    pros?: string[];
    cons?: string[];
    verdict?: string;
    content?: string;
}

export interface SpecItem {
    label: string;
    value: string | number;
    unit?: string;
    highlight?: boolean;
}

export interface Verdict {
    score: number;
    pros: string[];
    cons: string[];
    summary: string;
    recommendation: 'buy' | 'consider' | 'avoid';
}

export interface BreadcrumbItem {
    label: string;
    href: string;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    canonical?: string;
    noindex?: boolean;
}

// Props для компонентов
export interface SpecGridProps {
    specs: SpecItem[];
    columns?: 1 | 2 | 3;
    compact?: boolean;
}

export interface PriceCheckButtonProps {
    url: string;
    retailer: string;
    price: number;
    currency?: string;
    variant?: 'primary' | 'secondary' | 'outline';
}

export interface AffiliateButtonProps {
    // ASIN может быть строкой или объектом с ASIN для разных регионов
    asin: string | { us: string; fr?: string;[key: string]: string };
    // Текст кнопки
    label?: string;
    // Язык для выбора ASIN
    lang?: 'en' | 'fr' | 'ru';
    // Розничный продавец
    retailer?: string;
    // Цена для отображения
    price?: number;
    // Валюта
    currency?: string;
    // Вариант стиля
    variant?: 'primary' | 'secondary' | 'outline';
    // Размер
    size?: 'sm' | 'md' | 'lg';
    // Показывать иконку
    icon?: boolean;
    // Тэг партнёрской программы
    tag?: string;
}

export interface VerdictBoxProps {
    score: number;
    pros: string[];
    cons: string[];
    summary: string;
    recommendation: 'buy' | 'consider' | 'avoid';
}

export interface TerminalBlockProps {
    command: string;
    language?: 'bash' | 'powershell' | 'cmd';
    output?: string;
    copyable?: boolean;
}

export interface ProsConsProps {
    pros: string[];
    cons: string[];
    columns?: 1 | 2;
}