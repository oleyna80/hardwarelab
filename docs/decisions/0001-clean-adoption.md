# ADR-0001 — Clean Agentic SDLC Lite adoption

- **Date:** 2026-10-27
- **Status:** Experiment authorized by Owner; integration to `main` pending.
- **Context:** Legacy HardwareLab accumulated multiple agents, governance contracts, Skills, memories, hooks and overlapping control mechanisms. Their migration would require unnecessary compatibility machinery.
- **Decision:** Keep original Git ancestry and actual application sources. Construct a new branch tree without old agent directories or normative documentation, then install canonical Lite `main` workflow, roles, optional cooperative hooks and new repository-specific memory. Codex is the intended local harness.
- **QA exception:** Some application validators previously lived under `.agent/skills/scripts/`; relocate six scripts to `scripts/app-checks/` and fix referencing npm/shell/content scripts rather than losing product quality checks.
- **Boundaries:** Do not change application behavior, packages/lockfile, tests, production workflows, secrets, `main` or deployment. No automatic Skills copy or source-Lite Spec/P/approval inheritance.
- **Source baselines:** HardwareLab `72ada873d66d19de2609515b443766065fe132c9`, Lite `55ebee6cf26db99d708f089f297344ef0341f698`.
- **Assurance:** Lite hooks are cooperative; independent platform/tool permissions and GitHub protected-branch policy are needed for enforcement. Verify structure, application quality and actual Codex execution before Owner decides merge.
