## Independent Stage Critic report — `application-maintenance-runtime`

**Mission identity:** `/root/runtime_critic`

**Verdict: REWORK**

Reviewed exact W:

- Commit: `46376a928fcccd09cf24f9ec893a97da5f76d25b`
- Path: `docs/changes/application-maintenance-runtime/work-block.md`
- Git blob: `bab563bd763ef25341fc1c801326390859e696c5`
- Content SHA-256 observed: `f57603899c3b71a83ee0914d118c1b22237b511a3cb0d68cff5d53078da1ad88`

This is a Stage-Critic REWORK, not an implementation authorization. A corrected W must receive a fresh independent Stage Critic review before Coder work.

### Provenance and scope: confirmed

- Observed worktree `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-maintenance`, branch `chore/application-maintenance`, HEAD equals the reviewed W commit; status/index were clean.
- W parent checkpoint is accurate: `c2fced7fc0b2f4f5031f6dfe11001e54b07df9bd`, tree `88df3eb834e03063cacdfff81d6847411fc061ba`.
- Accepted Spec binding is valid: `3360d201366c2cad3d8bd843cec4984e68f805f6`, blob `08e0c7e6b6653e320c096836a21a8cf7ffb62239`.
- Approved P binding is valid: `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`, blob `62e685cec97758866d3e5ff627fc98a195e20961`.
- Original Project Critic report/provenance is reachable: `b296ab08555cf0745188b0c4783e43d772653255`, blob `dd640b0f7e9d9ab4714c6f38755765ccbc4c3f60`.
- The separate Owner decision at the entry checkpoint binds that exact P and explicitly delegates conforming W/Stage Critic/implementation, including the stacked draft-PR base.
- Ancestry checks from Spec, P, Project Critic, and entry checkpoint to W all returned exit code 0. `git diff --check c2f..W` returned exit code 0.
- The S1 write-set is finite, within P S1 permissions, and excludes releases, production policy, secrets, editorial/content, and image assets. No scope expansion was found.

### Blocking findings

1. **W does not define the required hosted CI coverage for all mandatory focused tests.**

   W execution item 4 requires local `npm run test:affiliate` and `node --test scripts/app-checks/check-researcher-output.test.mjs`, but only generally says “Wire focused tests into permitted CI.” The current CI runs neither command:

   - `quality` runs lint, types, build, affiliate links, image lint and the changed-EN-slug selector.
   - The selector invokes `check-researcher-output.mjs` only for changed English review slugs; it is not the node unit-test file and may legitimately select no review.
   - CI has no Vitest invocation for `test:affiliate`, no explicit `node --test` step, and no concrete future command for the proposed contact security tests.

   This conflicts with the approved P’s mandatory matrix: it lists both existing commands and says that focused unit checks absent from CI must be added to the permitted workflow, rather than assumed covered. W line 24 then promises actual quality/E2E/Lighthouse/Lite CI on H, but those hosted gates would not prove the mandatory unit checks.

   **Minimum correction:** revise W to name the exact CI steps/scripts and their job placement. At minimum, include `npm run test:affiliate`, `node --test scripts/app-checks/check-researcher-output.test.mjs`, and the exact positive/negative contact-security command(s) introduced by S1. Preserve all existing jobs and gates. A new W plus fresh Stage Critic is required.

2. **The Docker fallback names a CI equivalence that does not exist.**

   W line 23 permits a “CI build/start smoke” as equivalent if the Docker daemon is unavailable. The current `.github/workflows/ci.yml` has no Docker build, container start, loopback probe, or Sharp-in-container smoke step. Thus the stated fallback is not a feasible route to the P-required container evidence.

   Current entry conditions are favorable: Docker client/server `29.1.3` is available locally, so the specified local route is presently usable. But a stage contract cannot treat a non-existent future CI job as equivalent.

   **Minimum correction:** either:

   - make local Docker build/start a required gate and state that loss of daemon access is a STOP/BLOCKED condition; or
   - explicitly add the exact permitted CI Docker build/start/probe steps to the W and its acceptance/CI wiring.

   The first is narrower and sufficient given the observed local daemon.

3. **Baseline-reproduction fallback is circular and contradicts the mandatory-gate rule.**

   W line 19 says that, if the safe clean baseline cannot run, the Coder should obtain “Stage Critic disposition of the reproduction method.” The Stage Critic decision must precede the Coder; it cannot serve as a post-failure substitute authorization. The P says unavailable mandatory capabilities yield `NOT_RUN/BLOCKED` and escalation, and `development.md §5` requires the same.

   **Minimum correction:** replace this with a concrete fail-closed rule: record the failure, stop the affected stage as `BLOCKED`/`NOT_RUN`, and return to the Orchestrator for a revised W or permitted remediation path. Do not authorize an after-the-fact “disposition” by the already-completed Stage Critic.

### CI/PR and runtime-feasibility assessment

The required CI/PR route is materially available, subject to the W corrections above:

- Both `.github/workflows/ci.yml` and `lite-checks.yml` trigger on `pull_request`; CI provides `quality → e2e/lighthouse`, and Lite Checks provides the `validate` job.
- Authenticated GitHub access has `repo` and `workflow` scopes. The parent orchestration check additionally confirmed a configured-origin task-ref push dry-run and repository `push=true`.
- PR #14 was observed open/draft with head `chore/sdlc-lite-adoption`, base `main`, and its historical checks successful. This is predecessor-only evidence; W correctly requires rechecking remote refs, PR #14, ancestry, and overlaps before any task publication.
- Current local runtime observations: Node `v22.22.3`, npm `10.9.8`, Google Chrome available, and Docker client/server `29.1.3`. The selected Node `22.23.4` is not an installed managed Node version in this worktree. Per the parent’s independent check, its official archive and SHA-256 were verified and an executable was extracted in a task temporary directory; that provides a non-system configuration route, but the final W should retain the required explicit runtime verification.
- No browser download, dependency installation, Docker build, application process, or source test was executed by this critic; those remain `NOT_RUN`.

### Executed read-only checks

- Repository/root/branch/HEAD/status/index/worktree/hook configuration inspection.
- Exact commit/blob/tree reads for W, P, Spec, Owner decisions, handoff, and Project Critic report.
- Git ancestry checks: Spec→W, P→W, Project Critic→W, entry checkpoint→W.
- `git diff --check c2fced7..46376a9`.
- Inspection of `package.json`, current CI/Lite workflows, Dockerfile, Lighthouse and Playwright configuration, researcher selector, existing test paths, local runtime/browser/Docker availability, and GitHub/PR metadata.

### Limitations

This was an independent read-only native-agent review, but agents share the repository filesystem and Git object store; this is not OS isolation. No claim is made for dependency compatibility, test success, native Sharp execution, container smoke, hosted CI on the task branch, or production behavior.

### Next authorized action

Orchestrator should prepare a **new, bounded W** that resolves the three findings without changing Spec/P scope, commit it, and request a new independent Stage Critic review. No Coder implementation should begin from `46376a928fcccd09cf24f9ec893a97da5f76d25b`.
