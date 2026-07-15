# HardwareLab Content Guide v2.0

Единственная инструкция: как сделать обзор от нуля до публикации в 3 шага.

---

## Обзор процесса

```
review:new  →  Researcher (PASS A)  →  review:write  →  Writer (PASS B)  →  review:publish  →  Translator
```

Каждый `npm run` скрипт **печатает готовый промпт** для copy-paste в соответствующий инструмент.

---

## Шаг 1: Инициализация + PASS A (Research)

```bash
npm run review:new -- "Product Name" --category mini-pc
```

**Что делает скрипт:**
- Генерирует уникальный slug
- Создаёт папку `src/content/reviews/en/<slug>/`
- Создаёт `_research-pack.md` (пустой шаблон) и `_draft.mdx`
- **Печатает в stdout готовый PASS A промпт** с product name, category, и списком существующих обзоров

**Что делаешь ты:**
1. Копируешь промпт из stdout
2. Вставляешь в ChatGPT / другую модель (дёшево и с web search)
3. Результат (Research Pack) сохраняешь в `src/content/reviews/en/<slug>/_research-pack.md`

**Промпт:** `prompts/pass-a.md`

**Категории:** `consoles | gaming | gaming-pcs | monitors | ai-workstation | mini-pc | nas | sbc`

---

## Шаг 2: PASS B (MDX Writing)

```bash
npm run review:write -- <slug>
```

**Что делает скрипт:**
- Читает `_research-pack.md` и проверяет заполненность (ASIN, rating, quotes, specs)
- **Печатает в stdout готовый PASS B промпт** = writer instructions + research pack + existing reviews

**Что делаешь ты:**
1. Копируешь промпт из stdout
2. Вставляешь в агент с доступом к workspace (Codex / Antigravity / Claude)
3. Агент создаёт `index.mdx` + `image.webp` + `og.png`

**Промпт:** `prompts/pass-b.md`

---

## Шаг 3: QA + Перевод

```bash
npm run review:publish -- <slug>
```

**Что делает скрипт:**
1. Запускает QA pipeline: disclosure → review-package → build → affiliate check
2. Если PASS: копирует `image.webp` + `og.png` в `ru/de/fr` папки
3. **Печатает в stdout промпт для переводчика**

**Что делаешь ты:**
1. Если QA FAIL — fixишь и перезапускаешь
2. Если QA PASS — копируешь промпт перевода из stdout
3. Вставляешь в переводчик-модель
4. После перевода: `npm run build` (финальная проверка)

**Промпт:** `prompts/translate.md`

---

## Файлы промптов

| Файл | Назначение | Когда используется |
|------|-----------|-------------------|
| `prompts/pass-a.md` | Ресёрч (ASIN + specs + quotes) | Шаг 1: внешняя модель с web search |
| `prompts/pass-b.md` | Написание MDX (без web search) | Шаг 2: агент с workspace access |
| `prompts/translate.md` | Перевод RU/DE/FR | Шаг 3: переводчик-модель |
| `prompts/existing-reviews-hardwarelab.md` | Список обзоров (автоген) | Включается автоматически скриптами |

Старые промпты (v1.3.0) → `prompts/archive/`

---

## Структура обзора

Каждый обзор живёт в `src/content/reviews/en/<slug>/`:

```
<slug>/
├── index.mdx        # Финальный обзор
├── image.webp       # Hero image (1200×675)
├── og.png           # Social image (1200×630)
├── _research-pack.md  # PASS A данные (исключён из сборки)
└── _draft.mdx       # Черновик (исключён из сборки)
```

---

## Быстрый чеклист перед публикацией

- [ ] `title` 50–60 chars; `description` 150–160 chars
- [ ] `heroImage: "./image.webp"`, `ogImage: "./og.png"`
- [ ] `tags[0] == category`
- [ ] Imports: `@/components/ui/*`
- [ ] ReviewHero: 6/6 props; `keySpecs` 3–5 items
- [ ] UserFeedback: 4–6 verbatim quotes, similar length
- [ ] Internal links строго из `existing-reviews-hardwarelab.md`
- [ ] Disclosure строка exact: `> **Disclosure:** As an Amazon Associate, we earn from qualifying purchases.`
- [ ] `<AffiliateButton />` ровно 1× в конце
- [ ] `npm run build` проходит

---

## Если что-то пошло не так

```bash
# Очистить кеш Astro
rm -rf .astro/ && npm run dev

# Проверить типы
npx astro check

# Полный reset
rm -rf node_modules/ .astro/ && npm install
```

Подробнее: `.agent/workflows/troubleshooting.md`

---

## 🔖 VERSION

v2.0.0 (2026-04-05) — упрощён конвейер: 3 шага, 3 промпта, CLI-автоматизация.
