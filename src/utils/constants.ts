// Константы проекта

export const SITE = {
    name: 'HardwareLab',
    description: 'Экспертные обзоры компьютерного оборудования',
    url: 'https://hardwarelab.example.com',
    locale: 'ru_RU',
};

export const NAVIGATION = [
    { href: '/', label: 'Главная' },
    { href: '/reviews', label: 'Обзоры' },
    { href: '/categories', label: 'Категории' },
    { href: '/about', label: 'О проекте' },
];

export const CATEGORIES = [
    { id: 'cpu', name: 'Процессоры', icon: '⚡' },
    { id: 'gpu', name: 'Видеокарты', icon: '🎮' },
    { id: 'ram', name: 'Оперативная память', icon: '💾' },
    { id: 'storage', name: 'Накопители', icon: '💿' },
    { id: 'motherboard', name: 'Материнские платы', icon: '🔌' },
    { id: 'cooling', name: 'Охлаждение', icon: '❄️' },
    { id: 'psu', name: 'Блоки питания', icon: '🔋' },
    { id: 'case', name: 'Корпуса', icon: '🖥️' },
];

export const MANUFACTURERS = [
    'AMD',
    'Intel',
    'NVIDIA',
    'ASUS',
    'MSI',
    'Gigabyte',
    'Corsair',
    'Samsung',
    'Crucial',
    'Kingston',
    'Seagate',
    'Western Digital',
    'Noctua',
    'be quiet!',
    'Fractal Design',
    'Lian Li',
];

export const SCORE_COLORS: Record<number, string> = {
    1: 'bg-red-500',
    2: 'bg-red-400',
    3: 'bg-orange-500',
    4: 'bg-orange-400',
    5: 'bg-yellow-500',
    6: 'bg-yellow-400',
    7: 'bg-lime-400',
    8: 'bg-lime-500',
    9: 'bg-green-500',
    10: 'bg-green-600',
};

export const RECOMMENDATION = {
    buy: { label: 'Рекомендуем', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    consider: { label: 'Рассмотреть', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    avoid: { label: 'Избегать', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
} as const;