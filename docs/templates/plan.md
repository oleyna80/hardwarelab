# Project Plan P — <project-id>

> Instantiate as `docs/projects/<project-id>/plan.md` for **new significant initiatives** after acceptance of the exact project-local requirements/design Spec. A committed P is reviewed by an **independent Project Critic before separate Owner exact-P approval**. It is a frozen execution proposal/contract, **not** product ROADMAP, permission registry or mutable task status. No P for ordinary routine work; historical root `plan.md` and legacy per-task plans retain original exact provenance.

## Project identity and exact specification

- **Repository and unique stable ID** (ASCII kebab-case, never reused):
- **Product outcome and initiative intent provenance:**
- **Owner-accepted exact Spec:** `docs/projects/<project-id>/spec.md`; source commit, path, Git blob and separate Owner acceptance evidence
- **Starting repository baseline (commit/tree), relevant adopted ADRs:**
- **In/out scope, dependencies, interfaces, data/security/operational constraints:**

## Finite scope and proposed delegation

- **Explicit approved implementation paths and separate evidence/report paths:** <list actual paths, no wildcards>
- **Stage-level source subset and exact evidence/report writer assignment requirement:**
- **Permitted engineering choices and authorized branch/commit/CI/fixture operations:**
- **Sensitive changes, merge, deployment and other Owner stops:**
- **Actual platform/OS/sandbox limits beyond this document:**

## Stages and verifiable acceptance

| Stage | Actual entry/dependency | Finite outputs | Testable acceptance/independent gates |
| --- | --- | --- | --- |
| S1 — <outcome> | <approved inputs> | <verified artifacts> | <AC, real tests, CI> |
| S2 — <outcome> | <S1 evidence> | <verified artifacts> | <AC, independent checks> |

Write only stages needed; W becomes detailed only when actionable. Approved P does **not** self-authorize implementation.

## Recovery, concurrency and revisions

- **Task/project linking:** current authorized task W → exact repository + project ID → exact P commit/path/blob → accepted Spec commit/path/blob and Owner evidence → original Project Critic READY → separate Owner approval → W/Stage Critic. Include original intent binding and STOP on mismatch.
- **Parallel projects, one writer per path, actual branch/base drift and conflicts:**
- **Historical legacy approvals and paths retained without migration:**
- **Material Spec/P revisions require affected Owner/Project Critic decisions; W-only conforming revisions use new W/Stage Critic.**

## Risks, checks and delivery boundaries

- **Feasible positive/negative/native/CI test strategy; evidence and failure handling:**
- **Required independent Reviewer/Verifier on exact S, evidence-only S..H and actual CI H:**
- **Owner final merge/deployment GO and rollback/STOP conditions:**
- **Durable task checkpoint and original independent report location:**

## Independent review boundary

Commit the complete P **without placeholders requiring later mutation**; independent Project Critic reviews its exact commit/path/blob and accepted Spec; Owner then separately approves/rejects the exact P and delegated limits. Neither a Critic verdict nor Owner approval is inserted into frozen P. A W must be separately committed and independently Stage-Critic reviewed before bounded execution. Do not derive authority from ROADMAP/latest/root P.
