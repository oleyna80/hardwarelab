# CI Playwright runner — задание Codex CLI

## Цель и маршрут

Восстановить выполнение E2E в GitHub Actions, закрепив Ubuntu 24.04 только для job `e2e`. Это отдельное устранение блокера CI перед продолжением планирования `lite-workspace-update`.

Классификация: **routine** по [development.md §1](../../workflow/development.md): ограниченное обратимое изменение среды одного job, без изменения тестов, зависимостей, продукта или требований проверок. Отдельные Spec/P/W, Critics и независимые Reviewer/Verifier — **NOT_APPLICABLE**; нужны focused self-review и фактический CI. Это не изменяет маршрут значимой задачи переноса Lite.

Owner согласовал подготовку этого задания в архитектурной сессии. Исполнение передаётся отдельным запуском Codex CLI в указанном проекте: два пути ниже, адресные локальные коммиты, обычный non-force push текущей ветки и наблюдение автоматического CI. Здесь подготовлено только задание; workflow ещё не исправлен. Handoff фиксирует согласованный объём, а не создаёт новые полномочия.

## Наблюдавшийся baseline — 2026-10-30

- Worktree: `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-lite`.
- Repository: `oleyna80/hardwarelab`; origin: `git@github.com:oleyna80/hardwarelab.git`.
- Branch: `chore/sdlc-lite-adoption`; HEAD: `f9e61130c12694fe9be0953ebcaf00a9199ba04e`.
- [PR #14](https://github.com/oleyna80/hardwarelab/pull/14): OPEN/Draft; base `main`, наблюдавшийся base SHA `72ada873d66d19de2609515b443766065fe132c9`.
- [Lite Checks](https://github.com/oleyna80/hardwarelab/actions/runs/41039599098): SUCCESS.
- [CI](https://github.com/oleyna80/hardwarelab/actions/runs/41039599127): quality и lighthouse SUCCESS; e2e FAILURE при установке Chromium; сами E2E **NOT_RUN**.
- [Лог e2e](https://github.com/oleyna80/hardwarelab/actions/runs/41039599127/job/124009133161): runner Ubuntu 26.04.1, Playwright 1.57.0, `Playwright does not support chromium on ubuntu26.04-x64`.

Причина: `ubuntu-latest` перешёл на образ Ubuntu 26.04, который не поддерживает установленная версия Playwright. В её локальном `playwright-core` есть поддержка `ubuntu24.04-x64`. [Объявление GitHub о миграции](https://github.blog/changelog/2026-09-17-ubuntu-26-generally-available-and-latest-migration/) рекомендует явный `ubuntu-24.04` при несовместимости. Это обоснование решения, а не доказательство будущего PASS; закрепляется версия ОС, образы внутри неё продолжают обновляться.

## Write-set и сохранность

Разрешены только:

1. `.github/workflows/ci.yml`: ровно `jobs.e2e.runs-on`, `ubuntu-latest` → `ubuntu-24.04`.
2. `docs/changes/ci-playwright-runner/handoff.md`: собственные результаты, точные наблюдавшиеся SHA, CI и следующий шаг; исходное задание сохранить.

Не менять другие jobs/steps/triggers/actions, тесты, Playwright config, dependencies/lockfile, приложение, контент, парсер, hooks, Lite-документы и прежние handoff. Предупреждение Lighthouse об отсутствии `.lighthouseci` для upload — отдельный вопрос, вне scope. Не добавлять обходы проверок или `PLAYWRIGHT_HOST_PLATFORM_OVERRIDE` в CI. Не менять shared `memory_bank/`.

В исходном worktree индекс пуст. Существующая работа другого задания должна остаться побайтно неизменной и не попасть в коммит:

| Путь | SHA-256 на входе |
| --- | --- |
| `docs/changes/lite-workspace-update/handoff.md` (modified) | `aeacb739e277383297d8d0b83827c8486b8f9681afd97ded116086f2278a8d28` |
| `docs/changes/sdlc-lite-adoption/handoff.md` (modified) | `b00e76ad2ca8bad1e22030d92562d1b710ddeeccaec152f15748f028c2653ec8` |
| `docs/projects/lite-workspace-update/owner-decisions.md` (untracked) | `1c6b82f6306bc79404ae7ee5bdc2635a416efe13b93b201b0ef06a0c7e1cc249` |
| `docs/projects/lite-workspace-update/plan.md` (untracked) | `7907a35ca13de5bc75cf16e9ffb40a04df21de372dcf50d61354ae9f735d6cfc` |

Accepted Lite Spec: commit `cccc54d717b9f72d262ce89e3378bcc4abf872cb`, path `docs/projects/lite-workspace-update/spec.md`, blob `778907a738f1677328092e7849f166cc762d5b92`. Не редактировать и не считать принятым исполнение ещё не утверждённого плана.

## Выполнение и критерии результата

1. Прочитать применимые инструкции, brief/map, integrated memory и этот handoff. Проверить фактические root/repo/remote/branch/HEAD, индекс, dirty/untracked, PR/base/head и hashes выше. При необъяснённом расхождении или конкурирующем writer остановить затронутое действие; сохранить чужую работу. Git-записи выполнять через `git -C <проверенный абсолютный worktree>`.
2. Просмотреть текущий workflow, исходный CI failure и поддержку Ubuntu 24.04 в установленной версии Playwright. Уже выполненный CI достаточен для исходного воспроизведения: не нужен новый заведомо падающий запуск или установка системных/browser dependencies на локальной Ubuntu 26.04.
3. Сделать одну замену runner и дополнить собственный handoff. Проверить, что полный diff workflow равен только указанной замене; проверить whitespace, конфликтные маркеры, полный tracked diff и содержимое нового untracked handoff. Если доступен YAML parser, проверить синтаксис без установки новых пакетов. Новые тесты и повтор полного локального quality-набора для этой замены не требуются; основной тест — реальный hosted CI.
4. Выполнить адресное staging только двух разрешённых путей, проверить весь staged diff, сохранить остальные файлы/индекс. Сделать обычный scoped commit с действующими hooks; non-force push только `chore/sdlc-lite-adoption`. Не обходить hooks, не использовать reset/clean/stash/force, не менять `main` и не создавать другую ветку/worktree без основания и полномочий.
5. Дождаться автоматических проверок PR на новом HEAD. Подтвердить Lite Checks и все jobs CI: quality, e2e, lighthouse. Для e2e проверить в логах Ubuntu 24.04, успешную установку Chromium и реальное выполнение `npm run test:e2e`; записать фактический итог тестов. Skipped/queued/NOT_RUN не являются PASS. Учитывать, что PR workflow может проверять сгенерированный merge commit: записать связь run с PR head/base, а не приравнивать checkout SHA к head.
6. При новой ошибке самостоятельно диагностировать её и исправлять только в пределах write-set и разрешённой замены. Если нужны изменения тестов, зависимостей, других jobs или расширение scope — **BLOCKED** с причиной и предложением, без ослабления gates. Недоступный/отменённый CI также не заменять локальным PASS. Не запускать deploy, manual workflow dispatch, merge или интеграцию Lite.
7. Записать результаты в собственный handoff: проверенный source candidate, команды/исходы, CI URLs/head/base, сохранность чужих файлов, статус и следующий шаг. При evidence-only коммите проверить diff от source candidate, push и фактические обязательные CI на delivery HEAD. В handoff допустим наблюдавшийся предшественник; финальный delivery SHA и CI сообщить отдельно, без бесконечного цикла коммитов ради собственной SHA.

Успех: ровно одна замена workflow, чужая работа сохранена, собственное evidence доставлено в текущую ветку, обязательные CI на delivery HEAD действительно SUCCESS, E2E реально выполнены. Финальная приёмка Owner, merge и deploy остаются отдельными действиями.

## Checkpoint подготовки

**NOT_COMMITTED.** Задание подготовлено; workflow не изменён, исправленный CI ещё не запускался. Следующий шаг — передать этот путь Codex CLI, запущенному в целевом worktree. После устранения блокера вернуться к согласованию плана `lite-workspace-update`; это задание не разрешает его реализацию.

## Выполнение — 2026-10-30

Исходное состояние подтверждено: HEAD и PR head `f9e61130c12694fe9be0953ebcaf00a9199ba04e`, PR base `72ada873d66d19de2609515b443766065fe132c9`, индекс пуст; четыре посторонних файла совпали с SHA-256 выше, blob Spec совпал. Журнал исходного e2e подтверждает отказ установки Playwright 1.57.0 на Ubuntu 26.04 до запуска тестов; установленный `playwright-core` объявляет Ubuntu 24.04 поддерживаемой. В `jobs.e2e.runs-on` выполнена единственная разрешённая замена на `ubuntu-24.04`. Hosted CI для изменения ожидается после push; этот checkpoint не утверждает PASS.

### Результат проверки source candidate

- Source candidate `e26613dfbfc7e13340c7af0f61dee18331d3e412` отправлен обычным push. Проверены полный tracked diff, новый handoff, staged diff, `git diff --check`, отсутствие конфликтных маркеров и разбор YAML через установленный PyYAML; workflow diff содержит только согласованную замену. Полный локальный quality-набор не запускался согласно заданию.
- Автоматические [Lite Checks](https://github.com/oleyna80/hardwarelab/actions/runs/41041411920) — SUCCESS; [CI](https://github.com/oleyna80/hardwarelab/actions/runs/41041413980) — SUCCESS, все три job (`quality`, `e2e`, `lighthouse`) успешны. PR #14 head `e26613dfbfc7e13340c7af0f61dee18331d3e412`, base `72ada873d66d19de2609515b443766065fe132c9`; checkout job использовал сгенерированный PR merge commit `c8343cdc32ab9f8b9e55fa41667e5e67c5749897`.
- [Журнал e2e](https://github.com/oleyna80/hardwarelab/actions/runs/41041413980/job/124015247523): образ `ubuntu-24.04`, Chromium установлен, `npm run test:e2e` выполнен — 4 passed.
- Четыре посторонних файла сохранили SHA-256 из таблицы; индекс после первого коммита пуст. Следующий шаг — доставить этот evidence-only checkpoint и проверить автоматический CI на итоговом HEAD. Затем вернуться к согласованию плана `lite-workspace-update`; приёмка Owner, merge и deploy остаются отдельными действиями.
