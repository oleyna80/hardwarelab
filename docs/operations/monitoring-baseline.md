# Monitoring Baseline (Phase A)

## Goal

Provide minimal production observability for HardwareLab:
- uptime checks every 5 minutes
- actionable alert signal on failure
- basic diagnostics for failed probes

## Workflow

GitHub Actions workflow:
- `.github/workflows/uptime-monitor.yml`

Triggers:
- `schedule`: every 5 minutes
- `workflow_dispatch`: manual run

## Probe Targets

By default, probes run against:
- `https://hardwarelab.org/`
- `https://hardwarelab.org/health`
- `https://hardwarelab.org/sitemap-index.xml`

Base URL can be overridden via repository variable:
- `SITE_BASE_URL`

## Alerting Behavior

When at least one endpoint is not `2xx`:
1. Workflow fails.
2. GitHub issue `Uptime alert: hardwarelab.org` is created or updated.
3. Probe artifacts are uploaded (`/tmp/uptime`): headers, response body snippets, summary.
4. If `UPTIME_ALERT_WEBHOOK` secret is configured, webhook message is sent.

When all probes recover (`2xx`):
1. Workflow succeeds.
2. Existing open uptime issue is commented and closed automatically.

## Setup

Required:
- none (works out of the box with default `https://hardwarelab.org`)

Optional:
- Repo variable: `SITE_BASE_URL`
- Repo secret: `UPTIME_ALERT_WEBHOOK`

## Operations Commands (WSL)

Run monitor manually:

```bash
gh workflow run "Uptime Monitor" -R oleyna80/hardwarelab
```

Inspect recent monitor runs:

```bash
gh run list -R oleyna80/hardwarelab --workflow "Uptime Monitor" --limit 10
```

Inspect failed run logs:

```bash
gh run view -R oleyna80/hardwarelab <RUN_ID> --log-failed
```

## Phase A Evidence

This baseline satisfies the runbook requirement:
- uptime monitor active
- alert channel active (GitHub issue)
- failure diagnostics preserved in run artifacts
