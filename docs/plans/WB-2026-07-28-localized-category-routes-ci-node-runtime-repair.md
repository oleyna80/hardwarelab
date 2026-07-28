# Work Block — WB-009 CI Node Runtime Repair

## Control

- **Canonical ID:** `WB-2026-07-28-localized-category-routes-ci-node-runtime-repair`
- **Parent:** `WB-2026-07-28-localized-category-routes-pilot` (`WB-009`)
- **Stage:** `STAGE_1_SPEC`
- **Profile:** Managed, one-line CI compatibility repair
- **Baseline / PR:** `85befcfd47d1e1209a92e5451522e3c1e3db4600` / #13

## Expected result

`Agent Guards / validate` runs the existing build on Node 22 rather than Node
20, and all required checks on PR #13 are green without changing product code
or dependencies.

## Stage 0 preflight

| Field | Frozen value |
| --- | --- |
| Side-effect class | repository CI workflow configuration; no production runtime invocation |
| Database/data mode | none |
| Runtime/function bindings | GitHub Actions `Agent Guards / validate`, `actions/setup-node@v4`, existing `npm run build` |
| Evaluation posture | not required; the deterministic GitHub Actions run on the exact PR head is authoritative |
| Write gate | `READY`: Owner approved this CI-only repair, non-default branch commit/push and PR update; merge remains prohibited |
| Residual risk | `package.json#engines` still says `>=18` although the resolved Astro toolchain needs `>=22.12.0`; deferred separately |

## Write-set

| In scope | Out of scope |
| --- | --- |
| `.github/workflows/agent-guards.yml`; this WB's plan, specification, review, verification, drift evidence; parent verification/closeout/evaluation only after CI success | all application/package files, other workflows, workflow topology, release-state adoption, deployment, `test-results/.last-run.json` |

## Role boundaries

| Stage | Role | Responsibility |
| --- | --- | --- |
| Specify | Orchestrator, then independent Critic | freeze the literal-only change and test conditions |
| Implement | one Coder | change the declared Node literal only |
| Review | independent Reviewer | verify exact workflow diff and consistency with `ci.yml` |
| Verify | independent Verifier | inspect final PR head and GitHub Actions results |
| Drift audit | independent deterministic audit | require `ALIGNED` between frozen literal-only scope, final diff, CI evidence, and parent status |
| Close | Orchestrator | update parent status only when all required checks pass and drift is `ALIGNED` |

## Checks

```text
workflow diff check
YAML parse / static Node-version consistency check
GitHub Actions Agent Guards / validate
GitHub Actions CI quality, e2e, lighthouse
PR head and mergeability recheck
specification-to-diff drift audit
```

## Hard stops

- No adjustment beyond `node-version: "20"` → `"22"`.
- A red rerun, a new failing check, or a need to alter dependencies/build code
  ends this Work Block pending Owner decision.
- No merge or default-branch write.
