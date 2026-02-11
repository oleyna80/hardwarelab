# Hero

Homepage hero section.

## Location
`src/components/layout/Hero.astro`

## Purpose
Hero-секция для главной страницы с заголовком и CTA.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `"en" \| "fr" \| "ru" \| "de"` | "en" | Текущий язык |
| `title` | `string` | — | Кастомный заголовок |
| `subtitle` | `string` | — | Кастомный подзаголовок |
| `ctaText` | `string` | — | Текст кнопки CTA |
| `ctaLink` | `string` | "/reviews" | Ссылка CTA |
| `featured` | `boolean` | false | Показывать "Featured" бейдж |

## Features

- Градиентный фон
- Локализованный заголовок/подзаголовок
- CTA кнопка на страницу обзоров

## Dependencies

- `src/utils/i18n.ts` — функция `t()` для переводов

## Usage

```astro
import Hero from '@/components/layout/Hero.astro';

<Hero lang="en" featured={false} />
```

## Used In

- `src/pages/index.astro`
- `src/pages/{fr,ru,de}/index.astro`
