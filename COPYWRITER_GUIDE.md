# HardwareLab Copywriter Guide (User Workflow) v1.3.0

Этот файл — единственная инструкция для новичка: как сделать обзор «от нуля до публикации» с агентом‑копирайтером, с двухпроходным процессом, и с Tech Audit (техническим ревью).

---

## 0) Что это за файлы и кто что делает

**Ты (пользователь):** запускаешь процесс, прикрепляешь документы, проверяешь вывод, прогоняешь Tech Audit, подтверждаешь правки.

**Bootstrap Agent:** проверяет дубли, формирует уникальный `slug`, создает папку обзора и служебные файлы (`_research-pack.md`, `_draft.mdx`).

**Агент‑ресёрчер (Researcher):** делает Pass A (Research Pack) — собирает ASIN/спеки/цитаты с источниками. Не пишет MDX.

**Tech Audit (Technical Reviewer):** проверяет техническую точность и терминологию в Research Pack (CPU/GPU/ports/USB naming), даёт список конкретных правок и вопросов на перепроверку.

**Агент‑копирайтер (Copywriter):** делает Pass B (MDX ONLY) — пишет обзор строго по готовому Research Pack (без веб‑поиска).

**Editor (Редактор):** делает лёгкую пост‑редактуру `index.mdx` после Copywriter и до QA: симметрия блока UserFeedback, 2+ вопросительных заголовка, опечатки/повторы — без изменения фактов и без web‑поиска.

**QA / Debugger:** прогоняет `npm run build`, проверяет схему/линки/props/длины, пишет `_qa-report.md` (и делает только механические фиксы при необходимости).

**Агент‑переводчик (Translator):** делает Pass T — переводит финальный обзор на RU/DE/FR (без изменения структуры MDX и без “довыдумывания” фактов).

### 0.1) Каноничные инструкции по ролям (для Codex в VS Code)

Чтобы промты не “дрейфовали” между сессиями, **каноничные инструкции для каждой роли** лежат в репозитории:
- `.agent/roles/bootstrap.md`
- `.agent/roles/researcher.md`
- `.agent/roles/tech-auditor.md`
- `.agent/roles/copywriter.md`
- `.agent/roles/editor.md`
- `.agent/roles/qa.md`
- `.agent/roles/translator.md`

Мини‑промт для запуска роли в чате: “Открой `.agent/roles/<role>.md`, работай строго по нему; результат сохрани по указанным путям; STOP”.

### 0.2) Рекомендуемая конфигурация по ролям (режим/модель/рассуждение)

Это не обязательное требование, а практическая рекомендация “минимум ошибок + нормальная скорость”.

1) **Bootstrap (slug + папки/файлы)**
- Режим: Agent с полным доступом к workspace
- Модель: ChatGPT Codex
- Уровень рассуждения: низкий/средний
- Почему: много файловых операций/проверок по repo, логики мало

2) **Researcher (PASS A, web-search)**
- Режим: Чат (если ресерч вне repo) или Agent с полным доступом (если пишет `_research-pack.md` в workspace)
- Модель: ChatGPT 5.2 (Thinking) или другая сильная “исследовательская”
- Уровень рассуждения: высокий
- Почему: сопоставление вариантов, источники, фильтрация мусора, аккуратность цитат

3) **Tech Audit (проверка Research Pack)**
- Режим: Чат / внешний инструмент (любой) или Agent (если пишешь `_tech-audit-review.md` прямо в repo)
- Модель: любая сильная “техническая” модель
- Уровень рассуждения: средний
- Почему: цель — выявить спорные спеки/нейминг и сформулировать, что нужно перепроверить

4) **Copywriter (PASS B, MDX only по Research Pack)**
- Режим: Agent (с доступом к workspace)
- Модель: ChatGPT 5.2 (Thinking)
- Уровень рассуждения: средний/высокий
- Почему: много ограничений, легко “уронить” сборку; нужен контроль формата/чеклистов

5) **Editor (post‑edit после Copywriter)**
- Режим: Agent (с доступом к workspace)
- Модель: ChatGPT 5.2 (без обязательного Thinking) или любая сильная “редакторская”
- Уровень рассуждения: низкий/средний
- Почему: нужно аккуратно править мелочи без изменения фактов; проще, чем PASS B, но всё равно легко нарушить ограничения по цитатам/структуре

6) **QA (build, линки, props, схемы)**
- Режим: Agent с полным доступом к workspace
- Модель: ChatGPT Codex
- Уровень рассуждения: низкий/средний
- Почему: запуск команд (`npm run build`), grep/проверки, механические фиксы

7) **Translator (RU/DE/FR)**
- Режим: Agent (с доступом к workspace, чтобы писать файлы)
- Модель: ChatGPT 5.2 (без обязательного Thinking) или любая сильная переводческая
- Уровень рассуждения: низкий/средний
- Почему: важнее точность и соблюдение структуры, чем “глубокие” выводы

**Самый надежный “под ключ”:** держи Codex‑сессии для Bootstrap+QA, и 5.2 Thinking для Researcher+Copywriter; Editor/Tech Audit/переводчик — отдельными сессиями/инструментами.

---

## 1) Подготовка (папка + картинки)

## 1.0) Bootstrap Agent (создание slug + папки + файлов)

Этот агент нужен, когда обзоров станет много (50–100+), чтобы снизить вероятность дублей и ускорить старт.

**Что делает Bootstrap Agent:**
- Проверяет, нет ли уже похожего обзора (по списку `prompts/existing-reviews-hardwarelab.md` и папкам `src/content/reviews/en/*`).
- Генерирует безопасный `slug` (без конфликтов).
- Создает папку обзора и рабочие файлы:
  - `src/content/reviews/en/<slug>/_research-pack.md` (сюда вставляется результат Pass A; `_*.md` исключены из сборки)
  - `src/content/reviews/en/<slug>/_draft.mdx` (не участвует в сборке; потом заменяем на `index.mdx`)
- После этого “передает” задачу ресёрчеру (Pass A).

Каноничные правила Bootstrap Agent: `.agent/roles/bootstrap.md`

**Команда (рекомендовано):**
```bash
node scripts/bootstrap-review.mjs "Product Name from user" --category mini-pc
```

---

## 1.1) Slug для нового обзора (как выбрать без конфликтов)

**Slug = имя папки обзора** в `src/content/reviews/en/<slug>/`.

Правила:
- Slug должен быть в `kebab-case` (a-z, 0-9, `-`).
- Slug должен быть **уникальным** (не конфликтовать с уже существующими папками обзоров).
- Агент не должен “угадывать” slugs для внутренних ссылок — ссылки берутся только из `prompts/existing-reviews-hardwarelab.md`.

Рекомендованный способ (автоматически проверяет конфликты):
```bash
node scripts/suggest-slug.mjs "ASUS - ROG Ally Gaming Handheld Console - Z1 Processor, 512GB, 1080p 120Hz Display, White, 2024"
```

Скрипт покажет:
- `Unique slug: ...`
- путь папки `src/content/reviews/en/<slug>/index.mdx`
- URL `/reviews/<slug>`

Для каждого обзора нужна папка:
- `src/content/reviews/en/<slug>/index.mdx`
- `src/content/reviews/en/<slug>/image.webp`
- `src/content/reviews/en/<slug>/og.png`

В frontmatter всегда используем:
- `heroImage: "./image.webp"`
- `ogImage: "./og.png"` (если файл есть)

---

## 2) Какие документы прикреплять в чат (в одном сообщении)

Минимально (single-pass):
- `prompts/master_prompt_v_1_3_0.md`
- `prompts/asin-hunter-protocol.md`
- `prompts/existing-reviews-hardwarelab.md`

Рекомендовано (two-pass — меньше ошибок):
- Pass A: `prompts/asin-hunter-protocol.md`, `prompts/existing-reviews-hardwarelab.md`, `prompts/user-quotes-guide.md`, `prompts/review-workflow-two-pass.md`
- Pass B: `prompts/master_prompt_v_1_3_0.md` + (reference) `prompts/error-prevention-guide.md`

Опционально:
- `prompts/translation-guide-v1.md` (если будет RU/DE/FR)
- `prompts/bootstrap_v_1_3_0.md` (как «кнопка‑инструкция» для новичков)

---

## 3) Процесс обзора (рекомендую two-pass)

### Pass A — Research Pack (без MDX)

Каноничные правила Researcher: `.agent/roles/researcher.md`

Скопируй и вставь (промт **ТОЛЬКО для ресёрчера**, который собирает данные; не пишет MDX):

````text
PASS A (Research Pack ONLY). DO NOT write MDX.

You are the Lead Investigative Researcher for HardwareLab. Your job is NOT to write reviews. Your job is to gather verified, hard data for the editorial team.

Hard rules (NO-LIE protocol):
- No hallucinations. If a fact is not verifiable from sources → write NOT FOUND.
- No “best guess” specs, ports, HDMI versions, TDP, or benchmark claims unless the source explicitly states them.
- All facts must match the exact Amazon ASIN variant (CPU/RAM/SSD/color).

Input:
- REVIEW: <Exact product name from user>
- PRIMARY REGION: amazon.com
- ALSO CHECK: amazon.de + amazon.fr (ASIN availability for translation)
- CATEGORY: <gaming|gaming-pcs|monitors|ai-workstation|mini-pc|nas|sbc>

Required outputs (keep it minimal; only what the copywriter needs):

## RESEARCH PACK (HardwareLab v1.3.0) — PASS A

### Product Identity (ASIN-locked)
* Name (Amazon listing, US): <exact listing title>
* Category: <category>
* Primary region: amazon.com
* ASIN_US (confirmed): <10-char ASIN (not necessarily B0...)>
* Verified URL (US): https://www.amazon.com/dp/<ASIN_US>
* Variant match check (US): <1–2 lines explaining why this listing matches the requested config; else STOP>

### ASINs by Region (for translation planning)
Find the closest matching listing for the SAME variant (CPU/RAM/SSD/color):
* ASIN_DE (amazon.de): <ASIN or "absent">
  * Verified URL (DE): <https://www.amazon.de/dp/... or "absent">
  * Variant match check (DE): <same CPU/RAM/SSD/color? if unsure → "absent">
* ASIN_FR (amazon.fr): <ASIN or "absent">
  * Verified URL (FR): <https://www.amazon.fr/dp/... or "absent">
  * Variant match check (FR): <same CPU/RAM/SSD/color? if unsure → "absent">

Important:
- `ASIN_DE/ASIN_FR` are for translation planning only.
- EN frontmatter must use `ASIN_US` only.

### Editorial Fields (for MDX frontmatter)
* Title candidate (50–60 chars): <string>
* Description candidate (150–160 chars): <string>
* priceCategory: <budget|mid|high|enterprise>
* rating (Amazon average, US): <number 0.0–5.0> (must be a number; if NOT FOUND → STOP)
* ratingSourceURL (US): <where you got the rating value; ideally the dp page>

### Specs (only confirmed)
Provide only the fields below (use NOT FOUND when missing):
* CPU:
* GPU:
* Memory:
* Storage:
* Networking:
* Ports summary (short):

### ReviewHero keySpecs (3–5, confirmed)
Provide 3–5 short strings that can be pasted into ReviewHero `keySpecs`.
No invented claims.

### User Quotes (source-verbatim, MDX-ready)
Provide 4–6 quotes (prefer 4 or 6). Requirements:
- Verbatim copy-paste from the source comment
- 2–4 sentences each, roughly similar length
- Unique users (no duplicates)
- Include a direct permalink to the comment/thread for each quote
- Include `sentiment` for each quote: positive|neutral|negative

Important:
- These MUST be real user/community quotes (Reddit/forums; Amazon customer reviews are allowed).
- Do NOT use press/media quotes (Wired/TrustedReviews/Tom’sGuide/etc) as “User Quotes”.
- For EN reviews: use English sources (Amazon US/CA/UK, Reddit, forums, support threads). DE/FR quotes are optional and not required.

Format each:
* user: <username (r/subreddit)>
  * sentiment: <positive|neutral|negative>
  * sourceURL: <direct link>
  * quote: "<verbatim text>"

### Press / Expert Notes (optional)
If you want to capture media opinions, put them here (separate from user quotes):
* source: <publication>
  * sourceURL: <link>
  * quote: "<verbatim excerpt>"

### Related Reviews (copy-paste only)
Pick 3–5 relevant internal links from prompts/existing-reviews-hardwarelab.md:
- Use exact review title + exact URL (no guessing, no renaming)
- If the review is not listed, do not include it

### NOT FOUND / Ambiguities
Bullet list of any missing or ambiguous data that blocks writing a clean MDX.
````

**Если агент не может открыть источники для verbatim‑цитат:** он должен STOP и попросить ссылки (не использовать snippets).

### Tech Audit — проверка Research Pack (рекомендовано перед Pass B)

Задача: поймать технические ошибки **в данных** (спеки/порты/термины) до того, как Copywriter начнёт писать MDX.

Каноничные правила Tech Audit: `.agent/roles/tech-auditor.md`

**Артефакт:**
- Tech Audit пишет результат в `src/content/reviews/en/<slug>/_tech-audit-review.md`

**После Tech Audit:** вернись к Researcher в VERIFY MODE, чтобы он подтвердил/опроверг правки источниками и добавил `## VERIFIED ADDENDUM` в `_research-pack.md`.

### Pass B — Final MDX (без веб‑поиска)

Каноничные правила Copywriter: `.agent/roles/copywriter.md`

Скопируй и вставь (промт **ТОЛЬКО для копирайтера**, который пишет по готовому Research Pack — без поиска):

````text
PASS B (Copywriter / MDX ONLY) — HardwareLab v1.3.0

You are the Senior Technical Editor for “HardwareLab”.

INPUTS YOU WILL RECEIVE IN THIS CHAT:
- prompts/master_prompt_v_1_3_0.md
- prompts/existing-reviews-hardwarelab.md (source of truth for internal links)
- A RESEARCH PACK (the only allowed source of specs/quotes/ASIN/etc)

HARD RULE: NO RESEARCH IN PASS B
- DO NOT browse the web, do not “verify” via search, do not use outside knowledge.
- USE ONLY the provided RESEARCH PACK + formatting rules from prompts/master_prompt_v_1_3_0.md.
- If required info is missing/ambiguous → STOP and ask for a corrected/extended Research Pack.

OUTPUT SEQUENCE (MANDATORY)
1) Output Phase 5 checklist (filled with live values + ✅/❌).
2) If all ✅ → output the full final index.mdx (and nothing else).
3) If any ❌ → output “STOP & FIX” and list exactly what data is missing (do NOT output MDX).

BUILD-BREAKERS (STRICT)
- Frontmatter dates unquoted: pubDate: 2026-01-12 (no quotes)
- heroImage: "./image.webp" (relative)
- tags[0] must equal category
- Imports: only @/components/ui/* (exact paths)
- ReviewHero must have 6/6 props: image, imageAlt, rating, priceCategory, keySpecs (3–5), asin
- priceCategory: budget | mid | high | enterprise
- rating must be a number (no TBD, no placeholders like 0). If rating is missing in the Research Pack → STOP.
- Internal links: ONLY copy-paste from prompts/existing-reviews-hardwarelab.md
  - URL must match exactly
  - Link text must match the exact title from the list
  - If not listed → omit the link
  - No self-link in Related Reviews

DISCLOSURE (EXACT STRING)
Must appear once after ReviewHero and before main content:
> **Disclosure:** As an Amazon Associate, we earn from qualifying purchases.
No variations.

USER FEEDBACK (UI/SYMMETRY RULES)
- UserFeedback must contain 4–6 quotes (prefer 4 or 6 for symmetry)
- Quotes must be verbatim from the Research Pack (no paraphrase)
- Each quote: 2–4 sentences, roughly similar length
- No duplicate user values
- Balanced sentiments when possible

FILE WRITE SAFETY (recommended)
- Write the MDX to `src/content/reviews/en/<slug>/_draft.mdx` first.
- After Phase 5 checklist is all ✅, overwrite `src/content/reviews/en/<slug>/index.mdx` with the same content.

NO PROCESS LEAKAGE
Final MDX must NOT contain words like: Research Pack, placeholder, TBD, chars, validation.

CONTENT REQUIREMENTS (STRICT)
- Title length: 50–60 chars (count and report)
- Description length: 150–160 chars (count and report)
- Include at least 2 question-based headings (H2/H3)
- Use the exact product name naturally in body 5–7 times (as given in Research Pack)

AffiliateButton
- Must appear exactly once, at the very end:
<AffiliateButton asin={frontmatter.asin} label="View on Amazon" />

PHASE 5 — PRE-OUTPUT VALIDATION (MUST PRINT THIS FIRST)

Copy this block and fill it with live values:

```
🛑 PRE-OUTPUT VALIDATION CHECKLIST:

FRONTMATTER (7):
✅/❌ 1. Dates unquoted? (pubDate: ____; lastUpdated: ____)
✅/❌ 2. Title length: ____ chars (50–60)
✅/❌ 3. Description length: ____ chars (150–160)
✅/❌ 4. heroImage is "./image.webp"?
✅/❌ 5. tags[0] equals category?
✅/❌ 6. rating is a number (not TBD/0)?
✅/❌ 7. priceCategory valid? (budget/mid/high/enterprise)

COMPONENTS (6):
✅/❌ 8. Imports only @/components/ui/* ?
✅/❌ 9. ReviewHero has 6/6 props AND uses frontmatter for image/imageAlt?
✅/❌ 10. keySpecs has 3–5 items?
✅/❌ 11. UserFeedback count is 4–6, unique users, similar length, 2–4 sentences each?
✅/❌ 12. UserFeedback BEFORE ProsCons?
✅/❌ 13. AffiliateButton appears once at the end only?

CONTENT (4):
✅/❌ 14. Disclosure EXACT string present once after ReviewHero?
✅/❌ 15. Internal links are only from existing-reviews list AND link text matches exactly?
✅/❌ 16. Related Reviews has no self-link?
✅/❌ 17. No “Research Pack/placeholder/TBD/validation” words in MDX?

Decision: [PROCEED / STOP & FIX]
```

START
When the user sends:
RESEARCH PACK: ...
Generate Phase 5 checklist, then (if PROCEED) output the full final index.mdx.

RESEARCH PACK:
<PASTE HERE>
````

---

## 3.1) “Под ключ” (0‑итераций после) — минимальный конвейер

Цель: чтобы к моменту, когда ты открываешь `index.mdx`, он уже был **build‑ready** и без типовых косяков (disclosure, длины, ссылки, импорты).

Важно: “под ключ” всё равно может включать **внутренние STOP‑циклы** (ресёрчер → (Tech Audit + verify) → копирайтер → QA), но без ручных доработок “после публикации”.

### Контракт файлов (чтобы агенты не конфликтовали)
- Ресёрчер пишет только: `src/content/reviews/en/<slug>/_research-pack.md`
- Копирайтер пишет: сначала `src/content/reviews/en/<slug>/_draft.mdx`, затем финализирует `src/content/reviews/en/<slug>/index.mdx`
- QA не переписывает текст, а только проверяет. Допускается механический фикс ссылок (см. ниже).

Важно: любые вспомогательные файлы в `src/content/reviews/**` должны начинаться с `_` (например, `_research-pack.md`, `_qa-report.md`), иначе Astro попробует прочитать их как контент‑записи и сборка упадёт.

### Шаг 0 — Slug + папка (до исследования)
1) Сгенерируй slug (см. `1.1 Slug...`)
2) Создай папку обзора:
   - `src/content/reviews/en/<slug>/`
   - положи туда `image.webp` (можно временно)
   - создай `_research-pack.md` (пустой файл; `_*.md` исключены из сборки)

### Шаг 1 — Researcher (Pass A)
1) Запусти ресёрчера промптом из секции **Pass A** выше.
2) Результат ресёрчера вставь в `src/content/reviews/en/<slug>/_research-pack.md` (один документ).
3) Если ресёрчер пишет `NOT FOUND` по обязательным полям (ASIN/rating/quotes/ports) — не продолжай к Pass B, сначала добей данные.

### Шаг 1.5 — Tech Audit (рекомендовано)
1) Дай `_research-pack.md` техаудитору (см. секцию **Tech Audit** выше).
2) После Tech Audit вернись к Researcher в VERIFY MODE, чтобы он добавил/обновил `## VERIFIED ADDENDUM`.
3) Только после этого переходи к Pass B.

### Шаг 2 — Copywriter (Pass B / MDX ONLY)
1) Запусти копирайтера промптом из секции **Pass B** выше.
2) Вставь в него содержимое `_research-pack.md`.
3) Копирайтер должен:
   - сначала вывести Phase 5 checklist
   - потом (если всё ✅) выдать полный `index.mdx` (в repo: сначала `_draft.mdx`, затем финализировать `index.mdx`)

### Шаг 3 — QA gate (автоматическая проверка, обязательный стоп‑гейт)

Каноничные правила QA: `.agent/roles/qa.md`

Запускать после Pass B и перед “готово”:
- `npm run build` (must pass)
- Быстрая sanity‑проверка типовых нарушений:
  - disclosure строка exact
  - `title` 50–60 / `description` 150–160
  - imports `@/components/ui/*`
  - Related Reviews: URL+title из `prompts/existing-reviews-hardwarelab.md`, без self‑link
  - UserFeedback: 4–6, уникальные users, 2–4 предложения, схожая длина

Если QA находит ошибки:
- Если ошибка “данных” (нет rating, нет источников, противоречие в спеках) → STOP и вернуть ресёрчеру.
- Если ошибка “формата” (disclosure, длины, ссылка‑текст) → вернуть копирайтеру.

**Механический фикс ссылок (опционально):**
Если проблема только в Related Reviews (титулы/слаги), можно запустить:
```bash
node scripts/fix-related-links.mjs
```
После этого обязательно снова `npm run build`.

---

## 3.1.1) 7 шагов (Bootstrap → Researcher → Tech Audit → Copywriter → Editor → QA → Translator)

Эта схема подходит, когда ты ведёшь процесс в VS Code/workspace и запускаешь несколько агентов с разными ролями.

Ключевой принцип: агенты **не координируются сами**, поэтому синхронизация делается через:
- файловые артефакты (handoff) в репозитории
- твои “STOP/GO” команды между этапами

### Контракт ролей (кто что может менять)

**1) Bootstrap Agent**
- Вход: product name + category
- Выход: `slug`, созданная папка и заготовки файлов
- Пишет: только структуру папки + `_research-pack.md` + `_draft.mdx`
- Не пишет: финальный `index.mdx`

**2) Researcher (PASS A)**
- Вход: product name, category, список существующих обзоров
- Выход: заполненный `_research-pack.md`
- Пишет: только `src/content/reviews/en/<slug>/_research-pack.md`
- Стоп‑гейт: если `ASIN_US`/`rating`/quotes/ports = NOT FOUND → STOP (не передавать дальше)

**3) Tech Audit (recommended gate)**
- Вход: `_research-pack.md`
- Выход: `_tech-audit-review.md` (спеки/порты/термины/цифры; без “переписывания статьи”)
- Пишет: только `src/content/reviews/en/<slug>/_tech-audit-review.md`
- Дальше: Researcher делает VERIFY MODE и добавляет `## VERIFIED ADDENDUM` в `_research-pack.md` (или помечает `UNVERIFIED`)

**4) Copywriter (PASS B / MDX ONLY)**
- Вход: `_research-pack.md` + `prompts/existing-reviews-hardwarelab.md`
- Выход: финальный `index.mdx`
- Пишет: сначала `src/content/reviews/en/<slug>/_draft.mdx`, затем финализирует `src/content/reviews/en/<slug>/index.mdx`
- Не пишет: `_research-pack.md`
- Стоп‑гейт: если Phase 5 checklist не все ✅ → STOP (не отдавать в QA)

**5) Editor**
- Вход: финальный `index.mdx` + `_research-pack.md`
- Выход: аккуратная редактура `index.mdx` + `_editor-report.md`
- Пишет: только `src/content/reviews/en/<slug>/index.mdx` и `src/content/reviews/en/<slug>/_editor-report.md`
- Не делает: web‑поиск, изменение фактов, “довыдумывание” 6‑й цитаты
- Стоп‑гейт: если не хватает данных/есть конфликт фактов → STOP и вернуть к Researcher/Tech Audit

**6) QA / Debugger**
- Вход: `index.mdx`
- Выход: “PASS/FAIL” + список ошибок
- Пишет: только `src/content/reviews/en/<slug>/_qa-report.md` (или лог в комментарии/PR)
- Запускает: `npm run build`
- Стоп‑гейт: если FAIL → вернуть к Copywriter (формат) или Researcher (данные)

**7) Translator (Pass T)**
- Вход: финальный EN `index.mdx` + выдержка ASINs by Region из `_research-pack.md`
- Выход: `src/content/reviews/{ru,de,fr}/<slug>/index.mdx`
- Пишет: только файлы переводов (не трогает EN)
- Стоп‑гейт: если ломается сборка/схема → вернуть переводчику

### Порядок запусков (строго последовательно)
1) Bootstrap
2) Researcher (PASS A)
3) Tech Audit (optional but recommended)
4) Copywriter (PASS B)
5) Editor
6) QA
7) Translator

---

## 3.2) Pass T — Перевод на RU/DE/FR (после финального EN)

Каноничные правила Translator: `.agent/roles/translator.md`

Когда EN‑обзор готов (Pass B ✅ + QA ✅), можно делать переводы.

**Куда класть переводы:**
- `src/content/reviews/ru/<slug>/index.mdx`
- `src/content/reviews/de/<slug>/index.mdx`
- `src/content/reviews/fr/<slug>/index.mdx`

**Картинки:**
- Скопируй `image.webp` и `og.png` из EN‑папки в каждую языковую папку (имена файлов одинаковые), чтобы работали `./image.webp` и `./og.png`.

### Промт для Translator (MDX translation only)

Скопируй и вставь в чат с переводчиком:

````text
PASS T (Translator). Translate MDX only. NO web search.

You are the Translator for HardwareLab. Your job is to translate an already-approved EN review into RU, DE, and FR.

Hard rules:
- Do NOT change MDX structure, component usage, or frontmatter keys.
- Do NOT invent facts/specs/benchmarks. Translate meaning only.
- Keep all internal links (/reviews/...) EXACTLY as-is (same slugs, same link text from existing-reviews-hardwarelab.md). Do NOT translate link titles.
- Keep `category`, `tags`, `rating`, `priceCategory` unchanged.
- Keep `asin` as the US ASIN unless the user explicitly says they have regional affiliate setup.
- Translate UserFeedback quotes into the target language while keeping meaning faithful (see prompts/translation-guide-v1.md). Output only the translated quote text.

Disclosure:
- Translate the sentence, but keep the `> **Disclosure:**` prefix.

Output requirements:
1) Produce 3 full files: RU, DE, FR.
2) For each file, state the target path:
   - src/content/reviews/<lang>/<slug>/index.mdx
3) Ensure `heroImage: "./image.webp"` and `ogImage: "./og.png"` (if images exist).

Inputs:
- EN MDX:
<PASTE EN index.mdx HERE>

- Research Pack excerpt (ASINs by Region):
ASIN_US: ...
ASIN_DE: ... (or absent)
ASIN_FR: ... (or absent)
````

После перевода прогоняй `npm run build` и смотри, что новые страницы появились на:
- `/ru/reviews/<slug>/`
- `/de/reviews/<slug>/`
- `/fr/reviews/<slug>/`

---

## 4) Tech Audit (MDX, опционально после Pass B)

Это отдельный шаг от “Tech Audit — проверка Research Pack”: здесь проверяется уже готовый `index.mdx` на техточность формулировок.

### Промпт для Tech Audit (любой инструмент/модель)

Скопируй и вставь в выбранный инструмент Tech Audit:
```text
You are a Technical Reviewer for a hardware review. Audit the MDX for technical accuracy and naming.

Focus:
- CPU/GPU clocks, TFLOPS, memory configuration (if applicable)
- Ports naming (e.g., USB 3.2 Gen 1 vs USB 3.1 Gen 1), HDMI/VRR wording
- Storage: “usable space” caveats if relevant

Output:
1) Table: “current text” → “recommended correction” → “why”
2) Any risky/uncertain claims marked as NEEDS SOURCE

Here is the MDX:
<PASTE MDX HERE>
```

---

## 5) Доработка обзора по Tech Audit (с перепроверкой)

Возможны два режима:

### A) Быстро (без перепроверки в интернете)
Если ты доверяешь Tech Audit — дай его агенту как утверждённый addendum:
```text
APPROVED PASS B ADDENDUM (Tech Audit):
<PASTE TECH AUDIT REVIEW HERE>

Task:
- Apply only the approved corrections.
- Do NOT add new claims beyond the addendum.
- Keep Phase 5 checklist output in chat first, then output full updated MDX.
```

### B) Вариант А (максимальная точность, с перепроверкой)
Если нужно перепроверить спорные моменты:
```text
APPROVED PASS B ADDENDUM (Tech Audit):
<PASTE TECH AUDIT REVIEW HERE>

VERIFICATION MODE: ON

Task:
1) For each proposed correction, verify it against an official source (manufacturer / platform docs).
2) If a claim cannot be verified, do NOT change the MDX; instead list what source is needed.
3) Output a short patch plan first (what lines/sections change), then the full updated MDX.
```

---

## 6) Related Reviews (строго по source of truth)

Источник истины для внутренних ссылок:
- `prompts/existing-reviews-hardwarelab.md` (copy-paste; не угадывать slugs/titles)

Формат:
```md
## Related Reviews
- [Exact Review Title](/reviews/exact-slug)
```

Автоисправление (если случайно напортачил):
```bash
node scripts/fix-related-links.mjs
```

---

## 7) Мини-чеклист перед публикацией

- [ ] `title` 50–60 chars; `description` 150–160 chars
- [ ] `heroImage: "./image.webp"` (+ `ogImage: "./og.png"` если есть)
- [ ] `tags[0] == category`
- [ ] Imports только `@/components/ui/*`
- [ ] ReviewHero 6/6 props; `keySpecs` 3–5 items
- [ ] UserFeedback: 4–6 verbatim quotes (лучше 4 или 6), похожая длина
- [ ] Internal links строго из `prompts/existing-reviews-hardwarelab.md`
- [ ] Disclosure строка точь‑в‑точь
- [ ] `<AffiliateButton />` ровно 1× в самом конце

---

## 🔖 VERSION NAMES

v1.3.0
