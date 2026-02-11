# HardwareLab Roadmap (Internal Canonical)

Статус: Draft v1  
Владелец: Solo Founder (Dmitrii)  
Последнее обновление: 2026-02-08

---

## 1) North Star

Сайт должен расти как Amazon-affiliate медиа:  
**максимум целевого органического трафика -> максимум качественных переходов по affiliate-ссылкам -> рост выручки.**

Качество контента — не вторично, а часть монетизации (доверие и повторные визиты).

---

## 2) Фиксированные ограничения и рамки

### In Scope
- Amazon affiliate-монетизация.
- Рост SEO-трафика.
- Публикация обзоров и статей блога в текущей тематике железа.
- Оптимизация конверсий (CTR -> CR -> revenue).

### Non-Goals
- Не расширяем количество языков (остаемся на EN/FR/RU/DE).
- Не расширяем тематику обзоров за рамки текущих hardware-категорий.

---

## 3) KPI Framework (основные метрики)

Каноничные определения и формулы KPI:
- `.memory_bank/kpi-framework.md`

Ключевые KPI:
1. `organic_sessions_month`
2. `affiliate_ctr` (клики по affiliate / сессии на коммерческих страницах)
3. `affiliate_conversion_rate` (заказы / клики)

Рекомендуется добавить служебные KPI (второй уровень):
1. `rpm_affiliate` (revenue per 1000 sessions)
2. `money_pages_share` (доля трафика на страницы с коммерческим интентом)
3. `content_freshness` (% материалов, обновленных за 90 дней)

---

## 4) Приоритеты (после завершения техблока)

Порядок исполнения:
1. Monetization
2. SEO
3. Content
4. Platform/CI/CD

---

## 5) Timeline

### Phase A: Technical Foundation + VPS Migration
Период: `2026-02-08 -> 2026-03-31` (дедлайн: конец Q1 2026)

Цель фазы: полностью перейти с WSL на VPS и зафиксировать production-ready контур.

### Обязательный результат к 2026-03-31
- Production работает на VPS стабильно.
- Деплой воспроизводим (минимум one-command или documented runbook).
- Базовый CI/CD для проверки сборки и критических проверок.
- HTTPS, базовая безопасность и резервное копирование настроены.
- Мониторинг доступности и ошибок подключен.

### Checklist Phase A
- [ ] VPS инфраструктура: Docker + reverse proxy + SSL + restart policy.
- [ ] CI pipeline: `build`, `check:affiliate`, `lint:images`, `lint:agent-docs`, `lint:agent-roles`, `lint:agent-skills`, smoke checks.
- [ ] Documentation gate: `lint:agent-docs` + `lint:agent-roles` + `lint:agent-skills` before merging agent/process changes.
- [ ] Наблюдаемость: uptime check, error logging, deploy log.
- [ ] Recovery: backup + restore инструкция (проверенный тест восстановления).
- [ ] Performance gate: Lighthouse mobile >= 90 на ключевых страницах.

---

### Phase B: Monetization Engine First
Период: `2026-04-01 -> 2026-05-15`

Цель: поднять доходность существующего трафика до масштабного контент-роста.

### Основные инициативы
- [ ] Карта CTA-размещений (hero, mid-article, verdict, comparison blocks).
- [ ] Стандартизация affiliate UI-компонентов и текста призывов.
- [ ] Ивент-трекинг кликов по позициям CTA.
- [ ] 2-3 controlled эксперимента по CTR (без клоакинга и запрещенных практик).
- [ ] Категорийная матрица комиссий Amazon для выбора более доходных тем.

---

### Phase C: SEO Scale
Период: `2026-05-16 -> 2026-07-15`

Цель: устойчивый рост целевого органического трафика.

### Основные инициативы
- [ ] Семантические кластеры под коммерческий интент (best/compare/vs/review).
- [ ] Internal linking graph: hub pages -> reviews -> comparison pages.
- [ ] ТехSEO-гигиена: schema completeness, indexation control, crawl budget.
- [ ] Refresh-план для страниц с потенциалом роста (top opportunities).

---

### Phase D: Content Throughput (Reviews + Blog)
Период: `2026-07-16 -> 2026-12-31` (rolling)

Цель: масштабировать выпуск контента без потери качества.

### Основные инициативы
- [ ] Контент-календарь на 8-12 недель вперед.
- [ ] Баланс форматов: review, comparison, buyer guides, troubleshooting posts.
- [ ] SLA обновлений: важные страницы обновляются не реже 1 раза в 90 дней.
- [ ] QA-гейт качества перед публикацией (факты, SEO, compliance, UX).

---

## 6) Compliance Guardrails (Amazon/Legal)

Минимальные постоянные требования:
- Всегда показывать disclosure:  
  `As an Amazon Associate I earn from qualifying purchases.`
- Не использовать стимулы за клик/покупку (rewards, cashback, bonuses).
- Не делать запрещенные paid-search практики по Amazon trademark terms.
- Не использовать редиректы/скрытие источника перехода.
- Для цен/наличия использовать только разрешенные источники данных (PA API/served links) и актуальные правила показа.

Важно: если добавляется display-реклама (например, ad networks), перед запуском проверять совместимость размещения с Program Policies, чтобы не создать ложную ассоциацию/endorsement рядом с Program Content.

Официальные документы для проверки:
- Operating Agreement: https://affiliate-program.amazon.com/help/operating/agreement/
- Participation Requirements: https://affiliate-program.amazon.com/help/operating/participation/
- Program Policies hub: https://affiliate-program.amazon.com/help/operating/policies
- Commission Income Statement: https://affiliate-program.amazon.com/help/operating/linking

---

## 7) Ideas To Add (что еще добавить)

1. Revenue dashboard в одном месте: Sessions, CTR, CR, Revenue, RPM по страницам/категориям.
2. Topic scoring перед публикацией: `traffic_potential x commercial_intent x commission_rate x ranking_difficulty`.
3. Шаблон "money page": единый каркас блоков для максимальной конверсии без потери доверия.
4. Programmatic internal links: авто-блоки "best alternatives / compare / related reviews".
5. Update engine: очередь на обновление статей по падению позиций/CTR.
6. SERP CTR optimization: системная работа с title/meta (релизами раз в 2 недели).
7. "Trust layer": прозрачная методика тестов, источники данных, дата последнего обновления в каждом материале.
8. Commission-aware editorial planning: при прочих равных публиковать приоритетно темы с лучшим payout.

---

## 8) Operating Rules For Agents

1. Этот файл — источник truth для приоритетов и фаз.
2. Любой Tech Lead план в `.agent/reports/tech-lead/` должен ссылаться на текущую фазу roadmap.
3. Обновление roadmap: минимум 1 раз в 2 недели или после закрытия крупной фазы.
4. Изменения фиксировать коротким changelog-блоком внизу файла.
5. Для Phase A использовать runbook: `.agent/workflows/vps-migration-runbook.md`.
6. При изменении KPI-логики синхронно обновлять `.memory_bank/kpi-framework.md`.

---

## Changelog

### 2026-02-08
- Создан первый каноничный roadmap проекта.
- Зафиксированы цели, KPI, фазный план и compliance guardrails.
- Добавлены артефакты исполнения Phase A: `AGENT_CONTRACT` + VPS migration runbook.
