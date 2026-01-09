# Header

Navigation header with language switcher and theme toggle.

## Location
`src/components/layout/Header.astro`

## Purpose
Главная навигация сайта с переключателем языка и темы.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `"en" \| "fr" \| "ru" \| "de"` | "en" | Текущий язык |

## Features

- **Sticky header** с backdrop-blur
- **Logo** с иконкой и названием сайта
- **Navigation links**: Home, Reviews, Gaming, Monitors, AI Workstation, Categories
- **Language picker**: dropdown с флагами (EN/FR/RU/DE)
- **Theme toggle**: 🌙 / ☀️

## Dependencies

- `src/utils/i18n.ts` — функция `t()` для переводов

## Configuration Points

| Item | Location |
|------|----------|
| Navigation links | Hardcoded в компоненте (строки 29-55) |
| Supported languages | Hardcoded: en, fr, ru (TODO: add de) |
| Logo image | `/images/hardwarelab-icon.png` |

## Client Scripts

- `__switchLanguage(lang)` — переключение языка через localStorage

## Usage

```astro
import Header from '@/components/layout/Header.astro';

<Header lang="en" />
```

## Used In

- `src/layouts/Layout.astro`
