// i18n helper для мультиязычной поддержки
export type Language = 'en' | 'fr' | 'ru' | 'de';

export interface Translations {
    [key: string]: {
        en: string;
        fr: string;
        ru: string;
        de: string;
    };
}

// Основные переводы для компонентов макета
export const LAYOUT_TRANSLATIONS: Translations = {
    siteName: {
        en: 'HardwareLab',
        fr: 'HardwareLab',
        ru: 'HardwareLab',
        de: 'HardwareLab'
    },
    siteDescription: {
        en: 'Expert reviews of computer hardware',
        fr: 'Avis d\'experts sur le matériel informatique',
        ru: 'Экспертные обзоры компьютерного оборудования',
        de: 'Experten-Bewertungen von Computer-Hardware'
    },
    home: {
        en: 'Home',
        fr: 'Accueil',
        ru: 'Главная',
        de: 'Startseite'
    },
    reviews: {
        en: 'Reviews',
        fr: 'Avis',
        ru: 'Обзоры',
        de: 'Testberichte'
    },
    categories: {
        en: 'Categories',
        fr: 'Catégories',
        ru: 'Категории',
        de: 'Kategorien'
    },
    about: {
        en: 'About',
        fr: 'À propos',
        ru: 'О проекте',
        de: 'Über uns'
    },
    themeToggle: {
        en: 'Toggle theme',
        fr: 'Changer le thème',
        ru: 'Сменить тему',
        de: 'Design wechseln'
    },
    languageToggle: {
        en: 'Language',
        fr: 'Langue',
        ru: 'Язык',
        de: 'Sprache'
    },
    copyright: {
        en: '© {year} HardwareLab. All rights reserved.',
        fr: '© {year} HardwareLab. Tous droits réservés.',
        ru: '© {year} HardwareLab. Все права защищены.',
        de: '© {year} HardwareLab. Alle Rechte vorbehalten.'
    },
    disclosure: {
        en: 'We use affiliate links. Learn more in our <a href="/disclosure" class="underline">disclosure</a>.',
        fr: 'Nous utilisons des liens d\'affiliation. En savoir plus dans notre <a href="/disclosure" class="underline">divulgation</a>.',
        ru: 'Мы используем affiliate-ссылки. Подробнее в <a href="/disclosure" class="underline">раскрытии информации</a>.',
        de: 'Wir verwenden Affiliate-Links. Erfahren Sie mehr in unserer <a href="/disclosure" class="underline">Offenlegung</a>.'
    },
    amazonDisclosure: {
        en: 'As an Amazon Associate I earn from qualifying purchases.',
        fr: 'En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.',
        ru: 'Как партнер Amazon, я зарабатываю на соответствующих покупках.',
        de: 'Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.'
    },
    privacyPolicy: {
        en: 'Privacy Policy',
        fr: 'Politique de confidentialité',
        ru: 'Политика конфиденциальности',
        de: 'Datenschutzerklärung'
    },
    readyToBuy: {
        en: 'Ready to buy?',
        fr: 'Prêt à acheter ?',
        ru: 'Готовы к покупке?',
        de: 'Bereit zum Kauf?'
    },
    checkPrice: {
        en: 'Check Price on Amazon',
        fr: 'Voir le prix sur Amazon',
        ru: 'Проверить цену на Amazon',
        de: 'Preis auf Amazon prüfen'
    },
    checkLatestPrice: {
        en: 'Check the latest price on Amazon',
        fr: 'Consultez le dernier prix sur Amazon',
        ru: 'Проверьте актуальную цену на Amazon',
        de: 'Prüfen Sie den aktuellen Preis auf Amazon'
    },
    sections: {
        en: 'Sections',
        fr: 'Sections',
        ru: 'Разделы',
        de: 'Abschnitte'
    },
    allReviews: {
        en: 'All reviews',
        fr: 'Tous les avis',
        ru: 'Все обзоры',
        de: 'Alle Testberichte'
    },
    cpus: {
        en: 'Processors',
        fr: 'Processeurs',
        ru: 'Процессоры',
        de: 'Prozessoren'
    },
    gpus: {
        en: 'Graphics cards',
        fr: 'Cartes graphiques',
        ru: 'Видеокарты',
        de: 'Grafikkarten'
    },
    ram: {
        en: 'RAM',
        fr: 'Mémoire vive',
        ru: 'Оперативная память',
        de: 'Arbeitsspeicher'
    },
    contact: {
        en: 'Contact',
        fr: 'Contact',
        ru: 'Контакты',
        de: 'Kontakt'
    },
    contactDescription: {
        en: 'For partnership inquiries:',
        fr: 'Pour les demandes de partenariat :',
        ru: 'По вопросам сотрудничества:',
        de: 'Für Partnerschaftsanfragen:'
    }
};


// Переводы для компонента Hero
export const HERO_TRANSLATIONS: Translations = {
    heroTitle: {
        en: 'Expert Reviews of',
        fr: 'Avis d\'experts sur',
        ru: 'Экспертные обзоры',
        de: 'Experten-Tests für'
    },
    heroSubtitle: {
        en: 'Ready-to-Use Devices',
        fr: 'Appareils Prêts à l\'Emploi',
        ru: 'готовых устройств',
        de: 'Einsatzbereite Geräte'
    },
    heroDescription: {
        en: 'In-depth reviews of mini PCs, game consoles, NAS systems, and single-board computers. Honest verdicts and practical recommendations for your home, office, or homelab.',
        fr: 'Critiques approfondies de mini PC, consoles de jeux, systèmes NAS et ordinateurs monocartes. Verdicts honnêtes et recommandations pratiques pour votre maison, bureau ou homelab.',
        ru: 'Подробные обзоры мини-ПК, игровых консолей, NAS-систем и одноплатных компьютеров. Честные вердикты и практические рекомендации для дома, офиса или домашней лаборатории.',
        de: 'Ausführliche Tests von Mini-PCs, Spielkonsolen, NAS-Systemen und Einplatinencomputern. Ehrliche Urteile und praktische Empfehlungen für Ihr Zuhause, Büro oder Homelab.'
    },
    browseReviews: {
        en: 'Browse Reviews',
        fr: 'Parcourir les avis',
        ru: 'Смотреть обзоры',
        de: 'Testberichte ansehen'
    },
    byCategories: {
        en: 'By Categories',
        fr: 'Par catégories',
        ru: 'По категориям',
        de: 'Nach Kategorien'
    },
    latestReviews: {
        en: 'Latest Reviews',
        fr: 'Derniers avis',
        ru: 'Последние обзоры',
        de: 'Neueste Testberichte'
    },
    allReviews: {
        en: 'All reviews',
        fr: 'Tous les avis',
        ru: 'Все обзоры',
        de: 'Alle Testberichte'
    },
    popularCategories: {
        en: 'Popular Categories',
        fr: 'Catégories populaires',
        ru: 'Популярные категории',
        de: 'Beliebte Kategorien'
    },
    processors: {
        en: 'Processors',
        fr: 'Processeurs',
        ru: 'Процессоры',
        de: 'Prozessoren'
    },
    graphicsCards: {
        en: 'Graphics Cards',
        fr: 'Cartes graphiques',
        ru: 'Видеокарты',
        de: 'Grafikkarten'
    },
    memory: {
        en: 'Memory',
        fr: 'Mémoire',
        ru: 'Память',
        de: 'Arbeitsspeicher'
    },
    storage: {
        en: 'Storage',
        fr: 'Stockage',
        ru: 'Накопители',
        de: 'Speicher'
    },
    cpu: {
        en: 'CPU',
        fr: 'CPU',
        ru: 'CPU',
        de: 'CPU'
    },
    gpu: {
        en: 'GPU',
        fr: 'GPU',
        ru: 'GPU',
        de: 'GPU'
    },
    ramLabel: {
        en: 'RAM',
        fr: 'RAM',
        ru: 'RAM',
        de: 'RAM'
    },
    ssdHdd: {
        en: 'SSD/HDD',
        fr: 'SSD/HDD',
        ru: 'SSD/HDD',
        de: 'SSD/HDD'
    },
    stayUpdated: {
        en: 'Stay updated with new reviews',
        fr: 'Restez informé des nouveaux avis',
        ru: 'Оставайтесь в курсе новых обзоров',
        de: 'Bleiben Sie auf dem Laufenden'
    },
    newsletterDescription: {
        en: 'Subscribe to our newsletter and get notifications about new tests and market analysis.',
        fr: 'Abonnez-vous à notre newsletter et recevez des notifications sur les nouveaux tests et analyses de marché.',
        ru: 'Подпишитесь на рассылку и получайте уведомления о новых тестах и аналитике рынка.',
        de: 'Abonnieren Sie unseren Newsletter und erhalten Sie Benachrichtigungen über neue Tests und Marktanalysen.'
    },
    emailPlaceholder: {
        en: 'Your email',
        fr: 'Votre email',
        ru: 'Ваш email',
        de: 'Ihre E-Mail'
    },
    subscribe: {
        en: 'Subscribe',
        fr: 'S\'abonner',
        ru: 'Подписаться',
        de: 'Abonnieren'
    },
    noSpam: {
        en: 'No spam. Unsubscribe anytime.',
        fr: 'Pas de spam. Désabonnez-vous à tout moment.',
        ru: 'Без спама. Отписаться можно в любой момент.',
        de: 'Kein Spam. Jederzeit abbestellbar.'
    },
    noReviews: {
        en: 'Reviews coming soon. Stay tuned!',
        fr: 'Avis à venir. Restez à l\'écoute!',
        ru: 'Обзоры скоро появятся. Следите за обновлениями!',
        de: 'Testberichte folgen bald. Bleiben Sie dran!'
    },
    featured: {
        en: 'Featured',
        fr: 'En vedette',
        ru: 'Рекомендуемое',
        de: 'Empfohlen'
    },
    miniPc: {
        en: 'Mini PCs',
        fr: 'Mini PC',
        ru: 'Мини-ПК',
        de: 'Mini-PCs'
    },
    miniPcDesc: {
        en: 'Compact workstations',
        fr: 'Stations de travail compactes',
        ru: 'Компактные рабочие станции',
        de: 'Kompakte Workstations'
    },
    consoles: {
        en: 'Game Consoles',
        fr: 'Consoles de jeux',
        ru: 'Игровые консоли',
        de: 'Spielkonsolen'
    },
    consolesDesc: {
        en: 'Next-gen gaming',
        fr: 'Jeu de nouvelle génération',
        ru: 'Гейминг нового поколения',
        de: 'Next-Gen-Gaming'
    },
    nas: {
        en: 'NAS',
        fr: 'NAS',
        ru: 'NAS (Сетевые хранилища)',
        de: 'NAS'
    },
    nasDesc: {
        en: 'Network storage',
        fr: 'Stockage réseau',
        ru: 'Сетевое хранение',
        de: 'Netzwerkspeicher'
    },
    sbc: {
        en: 'Single Board Computers',
        fr: 'Ordinateurs à carte unique',
        ru: 'Одноплатные ПК (SBC)',
        de: 'Einplatinencomputer'
    },
    sbcDesc: {
        en: 'DIY & Maker boards',
        fr: 'Cartes DIY et Maker',
        ru: 'Для DIY и мейкеров',
        de: 'DIY & Maker Boards'
    },
    gaming: {
        en: 'Gaming',
        fr: 'Gaming',
        ru: 'Гейминг',
        de: 'Gaming'
    },
    monitors: {
        en: 'Monitors',
        fr: 'Moniteurs',
        ru: 'Мониторы',
        de: 'Monitore'
    },
    aiWorkstation: {
        en: 'AI Workstations',
        fr: 'Stations de travail IA',
        ru: 'AI Рабочие станции',
        de: 'AI-Workstations'
    }
};

// Функция для получения перевода
export function t(key: keyof typeof LAYOUT_TRANSLATIONS | keyof typeof HERO_TRANSLATIONS, lang: Language = 'en'): string {
    const translations = { ...LAYOUT_TRANSLATIONS, ...HERO_TRANSLATIONS };
    const translation = translations[key]?.[lang] || translations[key]?.en || key;

    // Замена плейсхолдеров
    if (typeof translation === 'string') {
        return translation.replace(/\{year\}/g, new Date().getFullYear().toString());
    }
    return String(translation);
}

// Функция для получения текущего языка из URL или localStorage
export function getCurrentLanguage(): Language {
    if (typeof window === 'undefined') return 'en';

    const urlLang = window.location.pathname.split('/')[1];
    const validLangs: Language[] = ['en', 'fr', 'ru', 'de'];

    if (validLangs.includes(urlLang as Language)) {
        return urlLang as Language;
    }

    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && validLangs.includes(storedLang as Language)) {
        return storedLang as Language;
    }

    return 'en';
}

// Функция для смены языка
export function switchLanguage(lang: Language): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem('preferredLanguage', lang);
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');

    // Если первый сегмент пути - это язык, заменяем его
    const validLangs: Language[] = ['en', 'fr', 'ru', 'de'];
    if (validLangs.includes(pathParts[1] as Language)) {
        pathParts[1] = lang;
    } else {
        // Иначе добавляем язык в начало
        pathParts.splice(1, 0, lang);
    }

    const newPath = pathParts.join('/');
    window.location.href = newPath;
}

// Функция для получения атрибута lang для HTML
export function getHtmlLang(lang: Language): string {
    const langMap: Record<Language, string> = {
        en: 'en',
        fr: 'fr',
        ru: 'ru',
        de: 'de'
    };
    return langMap[lang] || 'en';
}

// Функция для получения направления текста
export function getTextDirection(): 'ltr' | 'rtl' {
    return 'ltr'; // Все поддерживаемые языки используют LTR
}

// Получение языка из URL пути
export function getLangFromUrl(url: URL): Language {
    const lang = url.pathname.split('/')[1];
    const validLangs: Language[] = ['en', 'fr', 'ru', 'de'];
    return validLangs.includes(lang as Language) ? (lang as Language) : 'en';
}

// Создает локализованную функцию перевода для компонента
export function useTranslations(lang: Language = 'en') {
    return (key: keyof typeof LAYOUT_TRANSLATIONS | keyof typeof HERO_TRANSLATIONS) => t(key, lang);
}
