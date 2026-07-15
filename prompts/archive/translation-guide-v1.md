# Руководство по переводу для HardwareLab (Astro/MDX)

Этот документ содержит правила перевода обзоров с английского языка на другие языки (RU, DE, FR) для проекта HardwareLab, чтобы избежать ошибок валидации схемы Astro.

## ⚠️ Критические правила (Schema Validation)

## Translation Quality Tier

Каноническая policy по глубине локализации: `.agent/workflows/translation-tier-policy.md`

Коротко:
- для большинства категорий structural translation может быть временно допустим, если цель — package completeness;
- для `ai-workstation` требуется **editor-grade localization**, а не механическое зеркалирование EN-текста.

При создании перевода, **Frontmatter (YAML)** и **Компоненты** должны строго следовать этим правилам:

### 1. Frontmatter: Поле `asin`
В заголовке файла (между `---`) обязательно должно быть поле `asin` (ASIN). Не используйте `amazonAsin`.

✅ **Правильно:**
```yaml
---
asin: "B0XXXXXXXX"
---
```

❌ **Неправильно:**
```yaml
---
amazonAsin: "B0XXXXXXXX" # Ошибка схемы: expected `asin`, got `amazonAsin`
---
```

### 2. Frontmatter: Формат Дат
Даты должны быть указаны **без кавычек**.

✅ **Правильно:**
```yaml
pubDate: 2026-01-09
```

❌ **Неправильно:**
```yaml
pubDate: "2026-01-09" # Ошибка: ожидается Date, получена String
```

### 3. Компонент `<ReviewHero>`
При вызове компонента используйте проп `asin`, передавая в него значение из frontmatter.

⚠️ Примечание: у `ReviewHero` нет пропса `productName` — используйте только актуальные пропсы компонента.

✅ **Правильно:**
```jsx
<ReviewHero
  // ... другие пропсы
  asin={frontmatter.asin}
/>
```

❌ **Неправильно:**
```jsx
<ReviewHero
  asin="B0..." # Ошибка: компонент ожидает проп 'asin'
/>
```

### 4. Компонент `<AffiliateButton>`
Также использует проп `asin`.

✅ **Правильно:**
```jsx
<AffiliateButton asin={frontmatter.asin} label="Купить на Amazon" />
```

❌ **Неправильно:**
```jsx
<AffiliateButton asin={frontmatter.amazonAsin} ... /> # Ошибка: ключ во frontmatter называется `asin`
```

### 5. Изображения: относительный путь (КРИТИЧНО!)

⚠️ **Используйте `frontmatter.heroImage` с относительным путём (`./image.webp`).**

Изображения лежат рядом с `index.mdx`. Путь должен быть относительным, как в остальных обзорах.

✅ **Правильно:**
```mdx
<ReviewHero
  image={frontmatter.heroImage}
  imageAlt={frontmatter.heroImageAlt}
  ...
/>
```

❌ **Неправильно:**
```mdx
<ReviewHero
  image="/images/reviews/product/image.webp"
  ...
/>
```

**Почему?** Абсолютные пути (`/images`, `/public`) не совпадают со структурой обзоров и дают 404.

---

## 📝 Чек-лист переводчика

1.  [ ] **Frontmatter**: Ключ называется `asin`, а не `amazonAsin`.
2.  [ ] **Frontmatter**: Даты (`pubDate`, `lastUpdated`) без кавычек.
3.  [ ] **Frontmatter**: Присутствуют обязательные поля `rating` (число) и `priceCategory` (строка).
4.  [ ] **Компоненты**: В `<ReviewHero>` и `<AffiliateButton>` передается `asin={frontmatter.asin}`.
5.  [ ] **Изображения**: Используется `frontmatter.heroImage` с относительным путём `./image.webp`.
6.  [ ] **Теги**: Первый тег в списке соответствует категории.
7.  [ ] **SpecGrid**: `specs` передаётся объектом (`Record<string, string>`), а не массивом.
8.  [ ] **UserFeedback**: Сначала извлеки исходную цитату verbatim, затем переведи на язык страницы (RU/DE/FR), сохрани смысл (без выдуманных “сводок”) и в тексте оставь только перевод (без оригинала).

---

## Пример идеального файла (RU)

```mdx
---
title: "Заголовок на русском"
description: "Описание на русском"
pubDate: 2026-01-09
asin: "B0DLBTPDCS"
rating: 4.7
priceCategory: "mid"
heroImage: "./image.webp"
heroImageAlt: "Описание изображения"
ogImage: "./og.png"
---

import ReviewHero from '@/components/ui/ReviewHero.astro';
import AffiliateButton from '@/components/ui/AffiliateButton.astro';

<ReviewHero
  image={frontmatter.heroImage}
  imageAlt={frontmatter.heroImageAlt}
  asin={frontmatter.asin}
  rating={frontmatter.rating}
  priceCategory={frontmatter.priceCategory}
  keySpecs={["Spec 1", "Spec 2", "Spec 3"]}
/>

## Текст обзора...

<AffiliateButton asin={frontmatter.asin} label="Купить на Amazon" />
```
