import type { Language } from "@/utils/i18n";

export const categorySlugs = [
    "mini-pc",
    "consoles",
    "nas",
    "sbc",
    "monitors",
    "gaming",
    "ai-workstation",
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export const localizedCategoryLanguages = ["fr", "de", "ru"] as const;
export type LocalizedCategoryLanguage =
    (typeof localizedCategoryLanguages)[number];

interface CategoryTranslation {
    title: string;
    description: string;
}

export interface CategoryDefinition {
    slug: CategorySlug;
    tags: readonly string[];
    icon: string;
    translations: Record<Language, CategoryTranslation>;
}

export interface CategoryPageCopy {
    home: string;
    categories: string;
    latestUpdates: string;
    reviewSingular: string;
    reviewPlural: string;
    emptyTitle: string;
    emptyDescription: string;
    browseAllReviews: string;
    relatedCategories: string;
}

export const categoryPageCopy: Record<Language, CategoryPageCopy> = {
    en: {
        home: "Home",
        categories: "Categories",
        latestUpdates: "Latest updates",
        reviewSingular: "Review",
        reviewPlural: "Reviews",
        emptyTitle: "No reviews yet",
        emptyDescription:
            "We're working on reviews for this category. Check back soon!",
        browseAllReviews: "Browse All Reviews",
        relatedCategories: "Explore Other Categories",
    },
    fr: {
        home: "Accueil",
        categories: "Catégories",
        latestUpdates: "Dernières mises à jour",
        reviewSingular: "avis",
        reviewPlural: "avis",
        emptyTitle: "Pas encore d'avis",
        emptyDescription:
            "Nous préparons des avis pour cette catégorie. Revenez bientôt !",
        browseAllReviews: "Parcourir tous les avis",
        relatedCategories: "Explorer d'autres catégories",
    },
    de: {
        home: "Startseite",
        categories: "Kategorien",
        latestUpdates: "Neueste Updates",
        reviewSingular: "Testbericht",
        reviewPlural: "Testberichte",
        emptyTitle: "Noch keine Testberichte",
        emptyDescription:
            "Wir arbeiten an Testberichten für diese Kategorie. Schauen Sie bald wieder vorbei!",
        browseAllReviews: "Alle Testberichte ansehen",
        relatedCategories: "Weitere Kategorien entdecken",
    },
    ru: {
        home: "Главная",
        categories: "Категории",
        latestUpdates: "Последние обновления",
        reviewSingular: "обзор",
        reviewPlural: "обзоров",
        emptyTitle: "Пока нет обзоров",
        emptyDescription:
            "Мы готовим обзоры для этой категории. Загляните позже!",
        browseAllReviews: "Смотреть все обзоры",
        relatedCategories: "Другие категории",
    },
};

export const categoryCatalog: Record<CategorySlug, CategoryDefinition> = {
    "mini-pc": {
        slug: "mini-pc",
        tags: ["mini-pc", "mac-mini", "ryzen-7-5800h", "nuc"],
        icon: "🖥️",
        translations: {
            en: {
                title: "Mini PC Reviews",
                description:
                    "Compact powerhouses for homelab, office, and entertainment. In-depth reviews of Mac mini, Beelink, Intel NUC, and other mini PCs.",
            },
            fr: {
                title: "Avis sur les mini PC",
                description:
                    "Des machines compactes pour le homelab, le bureau et le divertissement. Tests approfondis de Mac mini, Beelink, Intel NUC et d'autres mini PC.",
            },
            de: {
                title: "Mini-PC-Testberichte",
                description:
                    "Kompakte Kraftpakete für Homelab, Büro und Unterhaltung. Ausführliche Tests von Mac mini, Beelink, Intel NUC und weiteren Mini-PCs.",
            },
            ru: {
                title: "Обзоры мини-ПК",
                description:
                    "Компактные мощные устройства для домашней лаборатории, офиса и развлечений. Подробные обзоры Mac mini, Beelink, Intel NUC и других мини-ПК.",
            },
        },
    },
    consoles: {
        slug: "consoles",
        tags: ["playstation", "xbox", "gaming-console", "steam-deck"],
        icon: "🎮",
        translations: {
            en: {
                title: "Game Console Reviews",
                description:
                    "Next-gen gaming consoles reviewed. PlayStation 5, Xbox Series, and more with performance benchmarks.",
            },
            fr: {
                title: "Avis sur les consoles de jeux",
                description:
                    "Tests de consoles de nouvelle génération : PlayStation 5, Xbox Series et plus encore, avec des mesures de performances.",
            },
            de: {
                title: "Spielkonsolen-Testberichte",
                description:
                    "Tests von Gaming-Konsolen der neuesten Generation: PlayStation 5, Xbox Series und mehr mit Leistungsbenchmarks.",
            },
            ru: {
                title: "Обзоры игровых консолей",
                description:
                    "Обзоры игровых консолей нового поколения: PlayStation 5, Xbox Series и других моделей с тестами производительности.",
            },
        },
    },
    nas: {
        slug: "nas",
        tags: ["nas", "network-storage", "synology", "qnap"],
        icon: "🗄️",
        translations: {
            en: {
                title: "NAS Reviews",
                description:
                    "Network-attached storage solutions for home and business. Synology, QNAP, and DIY NAS builds reviewed.",
            },
            fr: {
                title: "Avis sur les NAS",
                description:
                    "Des solutions de stockage réseau pour la maison et les entreprises. Tests de Synology, QNAP et NAS à monter soi-même.",
            },
            de: {
                title: "NAS-Testberichte",
                description:
                    "Netzwerkspeicherlösungen für Zuhause und Unternehmen. Tests von Synology, QNAP und selbstgebauten NAS-Systemen.",
            },
            ru: {
                title: "Обзоры NAS",
                description:
                    "Сетевые хранилища для дома и бизнеса. Обзоры Synology, QNAP и NAS-систем для самостоятельной сборки.",
            },
        },
    },
    sbc: {
        slug: "sbc",
        tags: ["raspberry-pi", "orange-pi", "single-board", "maker"],
        icon: "🛠️",
        translations: {
            en: {
                title: "Single Board Computers",
                description:
                    "Raspberry Pi, Orange Pi, and other SBC reviews for makers, hobbyists, and DIY projects.",
            },
            fr: {
                title: "Ordinateurs monocartes",
                description:
                    "Tests de Raspberry Pi, Orange Pi et autres ordinateurs monocartes pour les makers, amateurs et projets DIY.",
            },
            de: {
                title: "Einplatinencomputer",
                description:
                    "Tests von Raspberry Pi, Orange Pi und weiteren Einplatinencomputern für Maker, Hobbyprojekte und Eigenbau.",
            },
            ru: {
                title: "Одноплатные компьютеры",
                description:
                    "Обзоры Raspberry Pi, Orange Pi и других одноплатных компьютеров для мейкеров, любителей и DIY-проектов.",
            },
        },
    },
    monitors: {
        slug: "monitors",
        tags: ["monitor", "display", "oled", "144hz", "4k-monitor"],
        icon: "📺",
        translations: {
            en: {
                title: "Monitor Reviews",
                description:
                    "High-performance displays for gaming and productivity. OLEDs, high refresh rate, and color-accurate monitors.",
            },
            fr: {
                title: "Avis sur les moniteurs",
                description:
                    "Des écrans performants pour le jeu et la productivité : OLED, haute fréquence de rafraîchissement et couleurs fidèles.",
            },
            de: {
                title: "Monitor-Testberichte",
                description:
                    "Leistungsstarke Displays für Gaming und Produktivität: OLED, hohe Bildwiederholraten und farbtreue Monitore.",
            },
            ru: {
                title: "Обзоры мониторов",
                description:
                    "Высокопроизводительные дисплеи для игр и работы: OLED, высокая частота обновления и точная цветопередача.",
            },
        },
    },
    gaming: {
        slug: "gaming",
        tags: ["gaming", "gpu", "graphics-card", "gaming-pc"],
        icon: "🕹️",
        translations: {
            en: {
                title: "Gaming Hardware",
                description:
                    "GPUs, peripherals, and gaming setup components. Benchmarks and deep dives into gaming gear.",
            },
            fr: {
                title: "Matériel gaming",
                description:
                    "GPU, périphériques et composants pour les configurations de jeu. Benchmarks et analyses détaillées du matériel gaming.",
            },
            de: {
                title: "Gaming-Hardware",
                description:
                    "GPUs, Peripheriegeräte und Komponenten für Gaming-Setups. Benchmarks und detaillierte Analysen von Gaming-Hardware.",
            },
            ru: {
                title: "Игровое оборудование",
                description:
                    "Видеокарты, периферия и компоненты игровых систем. Тесты и подробные разборы игрового оборудования.",
            },
        },
    },
    "ai-workstation": {
        slug: "ai-workstation",
        tags: ["ai", "machine-learning", "workstation", "cuda", "llm"],
        icon: "🤖",
        translations: {
            en: {
                title: "AI Workstations",
                description:
                    "Hardware for Machine Learning and AI. GPU benchmarks, VRAM analysis, and build guides for LLMs.",
            },
            fr: {
                title: "Stations de travail IA",
                description:
                    "Du matériel pour le machine learning et l'IA : benchmarks GPU, analyse de la VRAM et guides de configuration pour les LLM.",
            },
            de: {
                title: "KI-Workstations",
                description:
                    "Hardware für Machine Learning und KI: GPU-Benchmarks, VRAM-Analysen und Bauanleitungen für LLMs.",
            },
            ru: {
                title: "Рабочие станции для ИИ",
                description:
                    "Оборудование для машинного обучения и ИИ: тесты GPU, анализ VRAM и руководства по сборке систем для LLM.",
            },
        },
    },
};

export function getCategory(category: string): CategoryDefinition | undefined {
    return categoryCatalog[category as CategorySlug];
}
