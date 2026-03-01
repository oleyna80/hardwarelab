# Agent Log — Async Communication Thread

Общий тред для межагентной коммуникации. Агенты дописывают сверху (новые — первыми).

---

## Формат записи

```
## [YYYY-MM-DD] 👤 FROM → @TO (или @all)
**Тема:** slug
Сообщение.
```

**Получатели (`@TO`):**
| Тег | Роль |
|-----|------|
| `@tech-lead` | Tech Lead |
| `@coder` | Coder |
| `@researcher` | Researcher |
| `@translator` | Translator |
| `@qa` | QA |
| `@all` | Все агенты |

---

## Как найти свои сообщения (RULE ZERO)

Каждый агент при старте ищет свои упоминания в этом файле:

```bash
# Найти сообщения адресованные тебе (замени @coder на свой тег):
grep -n "@coder\|@all" .memory_bank/agent-log.md
```

Или просто ищи свой `@тег` и `@all` в файле визуально / через поиск редактора.

---

## Правила

- Дописывать **сверху** (новые — первыми)
- Указывать `@тег` получателя явно — это триггер для фильтрации
- Не удалять записи — архивировать в `.memory_bank/archive/agent-log-archive.md` раз в фазу
- Использовать для: вопросов между агентами, флагов, решений принятых в сессии, блокеров

---

## [2026-03-01] 👤 CODER → @tech-lead
**Тема:** lighthouse-ci-gate-baseline

Статус:
- ✅ Добавлен CI performance baseline gate: Lighthouse assertions (`categories:performance >= 0.5`) на ключевых страницах.
- ✅ В CI (`.github/workflows/ci.yml`) добавлен job `lighthouse` после `quality`.
- ✅ Добавлен артефакт `.lighthouseci` для отладки регрессий в PR/push pipeline.
- ⚠️ Локальный WSL run `npm run check:lighthouse` нестабилен без Linux Chrome binary; целевой источник истины для gate — GitHub Actions runner c `browser-actions/setup-chrome`.

## [2026-03-01] 👤 CODER → @tech-lead
**Тема:** uptime-workflow-parse-hotfix

Статус:
- ✅ Найден post-merge дефект в `.github/workflows/uptime-monitor.yml`: workflow invalid (`0 jobs`) из-за использования `secrets.*` в step `if:`.
- ✅ Внесён hotfix: step `if` оставлен как `failure()`, проверка наличия `UPTIME_ALERT_WEBHOOK` перенесена в shell runtime.
- ✅ Ожидаемый результат: workflow parse-safe, no immediate failure on push due to syntax/context restrictions.

---

## [2026-03-01] 👤 CODER → @tech-lead
**Тема:** observability-baseline-uptime-monitor-added

Статус:
- ✅ Добавлен `Uptime Monitor` workflow (`.github/workflows/uptime-monitor.yml`) с запуском каждые 5 минут.
- ✅ Проверки: `/`, `/health`, `/sitemap-index.xml`.
- ✅ На фейле:
  - issue-алерт `Uptime alert: hardwarelab.org` создаётся/обновляется,
  - лог-артефакты probe сохраняются,
  - optional webhook (`UPTIME_ALERT_WEBHOOK`) отправляется при наличии секрета.
- ✅ На восстановлении: открытый uptime issue закрывается автоматически.

Документация:
- `docs/deployment/github-vps.md` (section 10)
- `docs/operations/monitoring-baseline.md`

---

## [2026-03-01] 👤 CODER → @tech-lead
**Тема:** go-live-rollback-checklist-added

Статус:
- ✅ В `docs/deployment/github-vps.md` добавлены короткие copy/paste чеклисты:
  - `Go-Live` через `gh workflow run "Deploy to VPS" -f image_tag=sha-...`
  - `Rollback` на предыдущий immutable SHA
- ✅ Добавлены smoke-check команды для VPS (`/health`) и public endpoint.

---

## [2026-03-01] 👤 CODER → @tech-lead
**Тема:** docs-sync-after-successful-deploy

Статус:
- ✅ Memory Bank синхронизирован с фактическим прод-контрактом после успешного rollout.
- Обновлены: `activeContext.md`, `techContext.md`, `systemPatterns.md`, `agents.md`, `progress.md`.
- Зафиксирован known-good deploy baseline: `sha-15e95e1d8c6f7630125babc0f5ad4521e63249c2`.

Артефакт:
- `.agent/reports/coder/2026-03-01-docs-sync-post-deploy-completion.md`

---

## [2026-03-01] 👤 CODER → @tech-lead
**Тема:** deploy-success-and-known-good-sha

Статус:
- ✅ Deploy chain restored after secrets/auth fixes (`VPS_SSH_KEY`, `VPS_APP_DIR`, `VPS_HOST`, `VPS_PORT`, `GHCR_TOKEN`).
- ✅ Successful run: `Deploy to VPS #22549588059`.
- ✅ Verified runtime on VPS:
  - `hardwarelab-app` → `ghcr.io/oleyna80/hardwarelab:sha-15e95e1d8c6f7630125babc0f5ad4521e63249c2`
  - app health: `healthy`
  - web health: `healthy`

Rollback anchor:
- `known-good` image SHA: `15e95e1d8c6f7630125babc0f5ad4521e63249c2`

---

## [2026-03-01] 👤 CODER → @tech-lead
**Тема:** ssr-contract-cicd-chain-complete

Статус:
- ✅ Каноничный runtime-контракт зафиксирован как SSR (`output: 'server'`, `@astrojs/node`).
- ✅ Добавлен health endpoint `GET /health` (`src/pages/health.ts`).
- ✅ `Dockerfile` переведен на SSR runtime (`node ./dist/server/entry.mjs`, порт `4321`).
- ✅ Контракты Nginx разведены: `nginx.proxy.conf` для reverse proxy, `nginx.conf` оставлен как static-only legacy.
- ✅ CI/CD-цепочка переведена на последовательность `CI -> Docker Publish -> Deploy to VPS` через `workflow_run`.
- ✅ Деплой-источник закреплён за immutable тегами `sha-*` (manual/auto deploy запрещают `latest`).

Проверки:
- `npx astro check` → PASS (0 errors, 0 warnings, 2 hints)
- `npm run build` → PASS
- `npm run lint:agent-docs` → PASS
- `npm run lint:agent-roles` → PASS
- `npm run lint:agent-skills` → PASS

Артефакт:
- `.agent/reports/coder/2026-03-01-ssr-contract-cicd-chain-completion.md`

---

## [2026-03-01] 👤 CODER → @tech-lead
**Тема:** missing-task-context-blocker

Блокер:
- Входные placeholders не были заполнены: `<вставь TASK>`, `<вставь путь к plan.md>`.
- Указанный путь репозитория не существовал в WSL: `/home/dmitrii/projects/hardwarelab-site`.

Safe fallback:
- Изменения продуктового кода не выполнялись до уточнения контекста.
- Создан отчёт-блокер: `.agent/reports/coder/2026-03-01-missing-task-context-completion.md`.

---

## [2026-03-01] 👤 CODER → @tech-lead
**Тема:** deploy-contract-status-and-blocker

Статус:
- ✅ `deploy.sh` обновлен (`IMAGE_REPO` default: `ghcr.io/oleyna80/hardwarelab-site`)
- ✅ `.env.vps.example` обновлен (`IMAGE_REPO`, `IMAGE_TAG`)
- ✅ `backup-restore-runbook.md` обновлен (smoke-check без `localhost:8081`)
- ✅ `backup-restore-runbook.md` дополнен шагом `docker login ghcr.io`
- ✅ `techContext.md` синхронизирован: `hardwarelab-web` не публикует host-port `8081` в текущем `docker-compose.vps.yml`

Проверки:
- `docker pull ghcr.io/oleyna80/hardwarelab-site:latest` → `denied`
- `./deploy.sh` → `denied` на pull того же image

Блокер:
- На VPS нет GHCR auth (`docker login ghcr.io` не выполнен), поэтому `docker inspect ... ExposedPorts` для целевого GHCR-образа пока не могу подтвердить.

---

## [2026-03-01] 👤 TECH LEAD → @coder
**Тема:** ghcr-auth-blocker

`docker pull ghcr.io/...` → `denied` — это не баг `deploy.sh`, это отсутствие `docker login` на VPS.

CI делает логин автоматически (`deploy-vps.yml`, строка 29). Для ручного деплоя:
```bash
echo "ghp_TOKEN" | docker login ghcr.io -u oleyna80 --password-stdin
./deploy.sh
```
- PAT scope: `read:packages` (GitHub → Settings → Developer Settings → Tokens)
- После успешного login + pull: проверь `ExposedPorts` — ожидаем `4321/tcp`
- Если `80/tcp` only — у нас баг в CI (публикует не тот target), эскалируй `@tech-lead`
- Добавь шаг `docker login ghcr.io` в `backup-restore-runbook.md` как часть Restore Procedure
- После завершения: ответь `@tech-lead` в этом логе с результатом pull + ExposedPorts

---

## [2026-03-01] 👤 TECH LEAD → @all
**Тема:** phase-a-status

Security sprint завершён. Зафиксированные решения (не менять без TL-плана):
- `TURNSTILE_ENFORCE=true` по умолчанию на VPS
- Trusted proxy: только `172.18.0.0/16`
- `asin` удалён из `/api/latest-reviews.json` feed — намеренно
- HMAC для webhook и CSP nonce — backlog, не трогать в Phase A

---

## [2026-03-01] 👤 TECH LEAD → @coder
**Тема:** deploy-contract-open-tasks

Три открытых задачи зафиксированы в плане `.agent/reports/tech-lead/2026-03-01-deploy-contract-fix-plan.md`:
1. `deploy.sh` — добавить `IMAGE_REPO` дефолт `ghcr.io/oleyna80/hardwarelab-site`
2. `.env.vps.example` — добавить `IMAGE_REPO` и `IMAGE_TAG`
3. `backup-restore-runbook.md` — заменить `localhost:8081` smoke checks
4. `techContext.md` — синхронизировать порт 8081 (сейчас не публикуется из compose)

Когда выполнишь — ответь в этом логе `@tech-lead` с кратким статусом.
