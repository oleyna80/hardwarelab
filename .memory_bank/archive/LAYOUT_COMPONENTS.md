# Глобальные компоненты макета

Созданы следующие глобальные компоненты макета с поддержкой мультиязычности:

## 1. Layout.astro (`src/layouts/Layout.astro`)

Основной компонент макета, который принимает пропс `lang` для поддержки мультиязычности.

### Пропсы:
- `lang?: 'en' | 'fr' | 'ru'` - язык интерфейса (по умолчанию: 'en')
- `title?: string` - заголовок страницы
- `description?: string` - мета-описание страницы

### Использование:
```astro
---
import Layout from '@/layouts/Layout.astro';
---

<Layout lang="en" title="My Page Title">
  <!-- Контент страницы -->
</Layout>
```

## 2. Header.astro (`src/components/layout/Header.astro`)

Хедер с навигацией и переключателем языка.

### Пропсы:
- `lang?: 'en' | 'fr' | 'ru'` - текущий язык

### Особенности:
- Автоматически переводит навигационные ссылки
- Переключатель языка с флагами (EN/FR/RU)
- Переключатель темы (темная/светлая)
- Адаптивный дизайн

## 3. Footer.astro (`src/components/layout/Footer.astro`)

Футер с локализованным копирайтом и Amazon Disclosure.

### Пропсы:
- `lang?: 'en' | 'fr' | 'ru'` - текущий язык

### Особенности:
- Локализованный копирайт с текущим годом
- Amazon Disclosure на трех языках
- Контактная информация
- Ссылки на разделы сайта

## 4. Hero.astro (`src/components/layout/Hero.astro`)

Общий компонент Hero-секции для главных страниц.

### Пропсы:
- `lang?: 'en' | 'fr' | 'ru'` - текущий язык
- `title?: string` - кастомный заголовок (опционально)
- `subtitle?: string` - кастомный подзаголовок (опционально)
- `ctaText?: string` - текст кнопки призыва к действию
- `ctaLink?: string` - ссылка для кнопки (по умолчанию: '/reviews')
- `featured?: boolean` - показывать ли бейдж "Featured"

### Использование:
```astro
---
import Hero from '@/components/layout/Hero.astro';
---

<Hero lang="en" featured={true} />
```

## 5. i18n Helper (`src/utils/i18n.ts`)

Вспомогательные функции для мультиязычной поддержки.

### Основные функции:
- `t(key, lang)` - получение перевода по ключу
- `getCurrentLanguage()` - определение текущего языка
- `switchLanguage(lang)` - переключение языка
- `getHtmlLang(lang)` - получение атрибута lang для HTML
- `getTextDirection(lang)` - получение направления текста

### Переводы:
Включает переводы для:
- Навигационных элементов
- Текстов футера
- Текстов Hero-компонента
- Общих интерфейсных элементов

## Структура файлов

```
src/
├── layouts/
│   ├── Layout.astro          # Основной макет
│   └── BaseLayout.astro      # Старый макет (сохранен для обратной совместимости)
├── components/layout/
│   ├── Header.astro          # Хедер с переключателем языка
│   ├── Footer.astro          # Футер с локализованным копирайтом
│   └── Hero.astro            # Общий Hero-компонент
└── utils/
    └── i18n.ts               # i18n helper функции
```

## Пример использования

Создание страницы с поддержкой мультиязычности:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Hero from '@/components/layout/Hero.astro';

const lang = 'en'; // В реальном приложении получать из URL или контекста
---

<Layout lang={lang} title="Welcome to HardwareLab">
  <Hero lang={lang} featured={true} />
  
  <section class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-4">Content Section</h2>
    <!-- Остальной контент -->
  </section>
</Layout>
```

## Поддержка языков

1. **English (en)** - язык по умолчанию
2. **Français (fr)** - французский язык
3. **Русский (ru)** - русский язык

## Маршрутизация по языкам

Для поддержки маршрутизации рекомендуется использовать структуру URL:
- `/en/*` - английская версия
- `/fr/*` - французская версия  
- `/ru/*` - русская версия
- `/*` - язык по умолчанию (английский)

Компонент Header автоматически обрабатывает переключение языка, обновляя URL и сохраняя предпочтения в localStorage.