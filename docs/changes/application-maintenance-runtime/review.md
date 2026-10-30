## Reviewer Report — independent technical review

**Mission:** `/root/runtime_reviewer`

**Verdict: REWORK**

Reviewed exact immutable source candidate:

`S = 872adc236d9b2cf8da1310b0a55f1c3cd3c2a8b9`

Review basis:

- Stage baseline: `c2fced7fc0b2f4f5031f6dfe11001e54b07df9bd`
- W: `e3f801a4e5aaf4d9ad79c04893ad46aa842082b1`
- P: `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`
- Stage Critic READY: `170e0d8ae80e69b68bfe777fa1bfa826b799eb6e`

**Files/boundaries reviewed:** full `c2fced7..S` diff; W/P; implementation, baseline and security-review records; `.github/workflows/ci.yml`; `.nvmrc`; `Dockerfile`; `package.json` and lockfile; Playwright/Lighthouse configuration; `contact.ts` and `contact.test.ts`; JSON-LD output.

### By severity

- 🔴 HIGH: 1 — E2E/Lighthouse direct SSR servers do not explicitly run in production mode.
- 🟡 MEDIUM: 1 — webhook-redirect test does not represent actual Fetch behavior for `redirect: "error"`.
- ⚪ LOW: 0

| Severity | File:Line | Finding | Evidence | Recommendation |
|---|---|---|---|---|
| 🔴 HIGH | `playwright.config.ts:12`, `lighthouserc.json:5` | The commands used for browser E2E and Lighthouse start the built Node SSR entrypoint without `NODE_ENV=production`. | Both commands set only `HOST` and `PORT`. The contact route determines production CORS policy from `process.env.NODE_ENV === "production"` at `contact.ts:13`; development origins remain permitted when false at `contact.ts:69`. The Docker runtime does set production mode at `Dockerfile:32`, but the new direct-server E2E/Lighthouse commands do not. Required production-runtime checks may therefore validate development policy instead. | Prefix both server commands with `NODE_ENV=production`. Add a focused test which imports/runs the route in production mode and proves a dev-only `http://localhost` origin is rejected. |
| 🟡 MEDIUM | `contact.test.ts:34` | The new redirect test tests a synthetic `302 Response`, not the behavior of native Fetch with `redirect: "error"`. | The test mock returns `new Response(..., { status: 302 })` and asserts a `502` result. With `redirect: "error"` set at `contact.ts:543`, native Fetch rejects on redirect; control reaches the outer fail-closed handling returning `503` at `contact.ts:568`. The present test therefore does not cover the actual redirect transport path. | Make the fetch mock reject with a Fetch-like `TypeError` and assert the actual `503` failure response. Preferably add a bounded loopback redirect test for transport-level confirmation. |

### Other review results

- The full stage diff is within the source/evidence/configuration write-set; no unrelated source, release, content, asset, or secret path was found.
- Static package/lock inspection shows the Node 22.23.4, Astro 7, adapter, Sharp and Docker version alignment is internally coherent.
- CI contains the specified focused affiliate, contact, researcher, E2E and Lighthouse commands.
- The foreground SSR process configuration is structurally suitable, subject to the missing explicit production mode above.
- JSON-LD serialisation escapes `<` at `SEO.astro:206`, mitigating closing-script injection.
- Turnstile timeout and webhook redirect rejection are source-level fail-closed hardening measures.
- The security review’s zero-production-audit result and the remaining development-only Lighthouse/LHCI dependency chain are a reasonable preliminary triage. Final exact-S execution/container evidence remains required.

### Explicit inspection limits and sequential gates

The following are **not source findings in S** and must remain separated from this REWORK result:

- Exact-S local matrix and Docker/native-Sharp runtime execution evidence are not established in the reviewed implementation record. They must be performed again on the corrected replacement S.
- Hosted CI is **NOT_OBSERVED**. Under P/W it is an evidence-only H-phase requirement after same-S Reviewer/Verifier assurance, not a defect in current source S.
- No live provider, deployed contact endpoint, secret, or production infrastructure was accessed.
- Remaining security claims needing runtime/deployment proof include proxy-header trust, rate-limit process scope, optional Turnstile policy and hostname/action verification, external-provider behavior, CSP/edge headers, deployment secrets/configuration, and final container runtime restrictions.

This verdict binds only `872adc236d9b2cf8da1310b0a55f1c3cd3c2a8b9`. A replacement source candidate requires a new independent review.

---

## Reviewer Report — повторный независимый технический review

**Mission identity:** `/root/runtime_reviewer`
**Verdict:** **READY** — исключительно для независимого source-level Reviewer gate на exact source candidate
**Exact S:** `65b69c3c7e05d44600468c114065d7c5e6be21d4`
**Baseline:** `c2fced7fc0b2f4f5031f6dfe11001e54b07df9bd`
**W:** `e3f801a4e5aaf4d9ad79c04893ad46aa842082b1`
**P:** `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`

**Dimensions:** code, security, architecture, docs, CI/configuration, drift
**Files reviewed:** полный stage diff `c2fced7..65b69c3`; runtime Docker/Node/Lighthouse/Playwright/CI-конфигурация; `contact.ts` и focused tests; lockfile/dependency graph; security disposition и historical Reviewer/Verifier evidence.
**Working tree:** чистый. `git diff --check c2fced7..S` завершён без диагностик.

**Findings:** 0 новых source findings.

### By severity

- 🔴 HIGH: 0
- 🟡 MEDIUM: 0
- ⚪ LOW: 0

### Проверка исправлений прежних findings

| Предыдущее finding | Evidence в exact S | Независимый вывод |
|---|---|---|
| HIGH: E2E/Lighthouse запускали SSR без явного production режима | `playwright.config.ts:12`, `lighthouserc.json:5` | Исправлено. Обе команды теперь запускают built SSR entrypoint с `NODE_ENV=production`, loopback host/port и без переиспользования чужого E2E-сервера. |
| MEDIUM: redirect-проверка была только mocked и не моделировала нативное Fetch-поведение `redirect: "error"` | `contact.test.ts:59`, `contact.test.ts:79`, `contact.test.ts:82`, `contact.test.ts:84`, `contact.ts:543` | Исправлено. Новый owned loopback HTTP server отдаёт реальный `302`; тест подтверждает один запрос к `/redirect`, отсутствие перехода на `/target` и закрытый отказ `503`. Это именно нативный transport-path, а не искусственный `Response(302)`. |
| Подтверждённый Verifier Docker defect: SSR в runtime-образе не находил `zod/v4` после `npm ci --omit=dev` | `package.json:41`, `Dockerfile:36`, `Dockerfile:37` | Исправлено статически: `zod` 4.6.7 вновь является прямой production dependency, поэтому включается в runtime install. Lockfile exact S содержит root `node_modules/zod` 4.6.7; это согласовано с import SSR bundle. |

Дополнительно focused production-origin test действительно загружает модуль после `NODE_ENV=production` и `ALLOWED_ORIGINS=http://localhost:4321`, затем получает `403` до любого outbound fetch: `contact.test.ts:26`–`contact.test.ts:34`. Это покрывает важную module-initialization границу `IS_PRODUCTION` в `contact.ts:13` и HTTPS-only фильтр production origins в `contact.ts:68`–`contact.ts:82`.

### Security disposition

Я независимо выполнил dependency-аудит exact lockfile с изолированным NPM cache:

- `npm audit --package-lock-only --omit=dev --json`: **0 vulnerabilities** в production graph exact S.
- Полный `npm audit --package-lock-only --json`: **18** package records: 14 high, 2 moderate, 2 low, 0 critical.

Оставшиеся advisories находятся в dev/Lighthouse/Playwright transitive graph. В частности, вложенный `zod` 3.25.76 относится к `chromium-bidi` в tooling graph; это не прямой runtime `zod` 4.6.7. Текущая disposition корректна как **needs-more-proof**, а не как «устранено» или «невозможно эксплуатировать»: `docs/changes/application-maintenance/security-review.md:13`–`docs/changes/application-maintenance/security-review.md:25`.

Не найдено статического доказательства reachable production critical/high residual. Следовательно, W-stop из `docs/changes/application-maintenance-runtime/work-block.md:21` не срабатывает на основании текущего источника. Отдельно проверены source fixes: Turnstile timeout `contact.ts:193`–`contact.ts:228` и webhook redirect rejection / fail-closed `503` `contact.ts:535`–`contact.ts:589`.

### Scope and drift

- Изменённые source/config paths лежат в разрешённом write-set W; docs evidence paths предусмотрены прямо W: `work-block.md:11`–`work-block.md:15`.
- Исторический `review.md` корректно остаётся evidence старого REWORK и не заявляет READY на новый S.
- `lighthouserc.json` сохраняет `temporary-public-storage` для CI, но это не противоречит W: локальный запуск с upload disabled — требование execution evidence; source CI-конфигурация не обязана отключать CI upload.
- Упрощений security boundary не обнаружено: webhook URL остаётся host-restricted, credentials в URL запрещены `contact.ts:101`–`contact.ts:113`.

### Ограничения и следующие обязательные gates

- `READY` не означает, что весь W завершён. Я **не запускал** на новом S полную локальную matrix, E2E/Lighthouse либо Docker build/start с loopback/native Sharp. Результаты старого Verifier нельзя переносить на changed S. Это обязательный независимый **Verifier PASS** на том же exact S по W `work-block.md:22`–`work-block.md:24`.
- Полный audit остаётся residual-risk observation, а не production penetration test. Не наблюдались production proxy/header trust, in-process rate-limit поведение под несколькими репликами, Turnstile provider/action/hostname enforcement, host CSP/edge headers, secrets и deployment configuration.
- **Hosted CI не является finding для S и не запущен мной.** Он остаётся будущим evidence-only **H gate** после same-S Reviewer READY и Verifier PASS; его нельзя подменить ни этим source review, ни локальными утверждениями Coder.
