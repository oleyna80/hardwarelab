---
name: code-review-prod-safe
description: Сделай ревью изменений: найди silent-failure, фоллбеки, ретраи, логирование, безопасность секретов.
Выдай список: Critical/High/Medium с файлами и конкретными местами.
Не предлагай переписывать архитектуру; минимальные правки.
---

# Code Review Prod Safe

## Instructions

Цель: сделать ревью изменений с упором на production‑надёжность (fail-fast, отсутствие silent fallback, безопасность секретов, стабильные ретраи/таймауты).

### Inputs

- Ветка/коммиты (если не указано — ревью текущего diff в рабочем дереве).
- Контекст окружения (VPS/systemd, scheduler, ключевые env-флаги).

### Workflow

1. Определи изменения
   - `git status -sb`, `git diff`, при необходимости `git log -n 10`
2. Проверь NO‑GO категории (Critical)
   - silent fallback / “проглатывание” исключений (exit code 0 при ошибках)
   - скрытые mock-режимы в проде
   - утечки секретов в логах/исключениях
   - отсутствие таймаутов/ретраев на внешних API
   - риск double-run (scheduler overlap)

---

# Code Review Prod Safe

## Instructions

Add your skill instructions here.
