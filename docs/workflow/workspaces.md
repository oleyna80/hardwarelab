# Git Branches and Workspace Lifecycle

## Operation guide

Keep a persistent, clean checkout of `main` as general advice, not a prerequisite for creating a sibling. Use a task branch, preferably in a separate worktree when tasks coexist. Worktrees share Git objects and refs; they are not isolation.

- **Enter or recover:** establish the task, repository/root, branch/HEAD, staged, unstaged and untracked state, scope and applicable task evidence before writes. Follow the [lifecycle](development.md) and [memory/recovery procedure](memory.md); see [existing workspace](#before-touching-an-existing-workspace).
- **Continue:** in a stable bounded session reuse the established context and inspect consequential results. Restore affected preflight after recovery, target/ref changes or unexpected state, not for every shell line.
- **Create:** use the guarded procedure below after establishing authority, base, path, relevant manager state and checkout effects.
- **Delete:** use [safe cleanup](#safe-cleanup-after-owner-approved-disposition), with separate Owner disposition; its rules are unchanged.

## Create a workspace

Two base contracts are available. An **available exact commit** is an independently approved full SHA already present locally, including an approved stage descendant; no fetch or equality with `origin/main` is inherently required. If an approved named stage ref is part of the contract, check its exact value too. A **fresh named ref** requires an authorized fetch and exact comparison to the expected approved SHA; fetch is a mutation and a mismatch or failure stops creation. Never select the available route to avoid a required freshness check. Existence, ancestry and ref names do not establish approval.

Before running the complete block, independently establish the expected values and creation authority. Inspect the effective `post-checkout` source for this operation, including worktree-specific configuration, command/environment overrides and executable contents; see [connecting Git hooks](#connecting-git-hooks). Establish the effect scope and preserve relevant manager/index and hook-affected data, including relevant ignored paths without disclosing secrets. Known unrelated staged, unstaged, untracked or ignored data is permitted; unknown ownership, overlap or hook effects stop creation. No recursive ignored-content scan is required merely for creation. Prepare a secure SHA-256 manifest of the independently identified relevant regular files, including untracked/ignored data and executable hook contents; protect it from concurrent modification and disclose no secrets. Use an empty manifest only when that set is independently established to be empty, never when it is unknown. Record and independently recheck existence, metadata/executable bits and any non-regular paths or additional hook effects; a file hash or status alone is insufficient. Compare the snapshot after each relevant operation. The explicit confirmations below represent these independent checks, not permissions granted by the script.

Run **one contiguous guarded Bash block**, not an isolated mutation line. At its prompts, independently inspect the stated observations before entering `verified`; an unattended or uncertain run stops. Placeholders deliberately stop until replaced with verified mission facts. The example uses Linux/GNU tools and assumes ordinary paths without newlines; if the required inspection cannot be performed reliably, stop.

```bash
set -euo pipefail
managing_worktree=/absolute/verified/managing-worktree
approved_parent_path=/absolute/approved/worktrees
new_worktree_path=/absolute/approved/worktrees/my-task
expected_parent_uid=REPLACE_WITH_VERIFIED_NUMERIC_UID
expected_origin='https://github.com/OWNER/REPOSITORY.git'
expected_branch=main
expected_head=REPLACE_WITH_VERIFIED_40_HEX_SHA
expected_base_sha=REPLACE_WITH_VERIFIED_BASE_40_HEX_SHA
new_branch=feat/my-task
base_route=REPLACE_WITH_available_OR_fresh
fresh_ref=refs/remotes/origin/main
stage_ref='' # Set when an exact named stage ref is part of the approval.
authority_verified=no
state_and_hooks_verified=no
relevant_manifest=/absolute/secure/approved-relevant-files.sha256

fail() { printf 'STOP: %s\n' "$1" >&2; exit 1; }
checked_equals() {
  local reason=$1 expected=$2 actual rc
  shift 2
  if actual=$("$@"); then :; else rc=$?; fail "$reason: inspection failed (exit $rc)"; fi
  [[ "$actual" == "$expected" ]] || fail "$reason"
}
inspect_boundary() {
  local resolved uid registered ref_rc
  [[ -d "$managing_worktree" && ! -L "$managing_worktree" ]] || fail 'manager absent or symlink'
  checked_equals 'wrong manager root' "$managing_worktree" git -C "$managing_worktree" rev-parse --show-toplevel
  checked_equals 'wrong repository' "$expected_origin" git -C "$managing_worktree" remote get-url origin
  checked_equals 'wrong manager branch' "$expected_branch" git -C "$managing_worktree" branch --show-current
  checked_equals 'wrong manager HEAD' "$expected_head" git -C "$managing_worktree" rev-parse HEAD
  checked_equals 'destination outside approved parent' "$approved_parent_path" dirname -- "$new_worktree_path"
  [[ -d "$approved_parent_path" && ! -L "$approved_parent_path" ]] || fail 'parent absent or symlink'
  if resolved=$(realpath -e -- "$approved_parent_path"); then :; else fail 'parent resolution failed'; fi
  [[ "$resolved" == "$approved_parent_path" ]] || fail 'noncanonical parent'
  if uid=$(stat -c %u -- "$approved_parent_path"); then :; else fail 'parent owner inspection failed'; fi
  [[ "$uid" == "$expected_parent_uid" && -w "$approved_parent_path" && -x "$approved_parent_path" ]] || fail 'parent owner or permissions mismatch'
  [[ ! -e "$new_worktree_path" && ! -L "$new_worktree_path" ]] || fail 'destination collision'
  if registered=$(git -C "$managing_worktree" worktree list --porcelain); then :; else fail 'registration inspection failed'; fi
  if grep -Fxq -- "worktree $new_worktree_path" <<< "$registered"; then fail 'destination already registered'; else ref_rc=$?; [[ "$ref_rc" -eq 1 ]] || fail "registration comparison failed (exit $ref_rc)"; fi
  git -C "$managing_worktree" check-ref-format --branch "$new_branch" >/dev/null || fail 'invalid branch'
  if git -C "$managing_worktree" show-ref --verify --quiet "refs/heads/$new_branch"; then fail 'branch exists'; else ref_rc=$?; [[ "$ref_rc" -eq 1 ]] || fail "branch inspection failed (exit $ref_rc)"; fi
}
[[ "$managing_worktree" == /* && "$approved_parent_path" == /* && "$new_worktree_path" == /* && "$managing_worktree" != "$new_worktree_path" ]] || fail 'invalid paths'
[[ "$expected_head" =~ ^[0-9a-f]{40}$ && "$expected_base_sha" =~ ^[0-9a-f]{40}$ && "$expected_parent_uid" =~ ^[0-9]+$ ]] || fail 'unresolved expected facts'
[[ "$authority_verified" == yes && "$state_and_hooks_verified" == yes ]] || fail 'authority, state or hook effects not established'
[[ "$base_route" == available || "$base_route" == fresh ]] || fail 'unknown base route'
[[ -f "$relevant_manifest" && ! -L "$relevant_manifest" ]] || fail 'relevant manifest missing or symlink'
if manifest_before=$(sha256sum -- "$relevant_manifest"); then :; else fail 'manifest inspection failed'; fi
if hook_path_before=$(git -C "$managing_worktree" rev-parse --git-path hooks); then :; else fail 'hook path inspection failed'; fi
if worktree_config_before=$(git -C "$managing_worktree" config --bool --get extensions.worktreeConfig); then :; else rc=$?; [[ "$rc" -eq 1 && -z "$worktree_config_before" ]] || fail "worktree configuration inspection failed (exit $rc)"; fi
verify_relevant() {
  checked_equals 'manifest changed' "$manifest_before" sha256sum -- "$relevant_manifest"
  # GNU sha256sum --check rejects a zero-byte manifest; its digest identifies that case.
  if [[ ${manifest_before%% *} != e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 ]]; then
    (cd "$managing_worktree" && sha256sum --quiet --strict --check "$relevant_manifest") || fail 'relevant file bytes changed or inspection failed'
  fi
  checked_equals 'hook path changed' "$hook_path_before" git -C "$managing_worktree" rev-parse --git-path hooks
  local observed rc
  if observed=$(git -C "$managing_worktree" config --bool --get extensions.worktreeConfig); then :; else rc=$?; [[ "$rc" -eq 1 && -z "$observed" ]] || fail "worktree configuration inspection failed (exit $rc)"; fi
  [[ "$observed" == "$worktree_config_before" ]] || fail 'worktree configuration changed'
}
confirm_observations() {
  local answer
  printf '%s\n' 'Independently inspect relevant hook configuration/code, file existence and metadata, and all other scoped effects against the secure snapshot. Type verified only if unchanged:' >&2
  if IFS= read -r answer; then :; else fail 'observation confirmation unavailable'; fi
  [[ "$answer" == verified ]] || fail 'relevant observations not verified'
}
inspect_boundary
verify_relevant
if manager_before=$(git -C "$managing_worktree" status --porcelain=v1 --untracked-files=all); then :; else rc=$?; fail "manager status failed (exit $rc)"; fi
if index_path=$(git -C "$managing_worktree" rev-parse --git-path index); then :; else fail 'index path inspection failed'; fi
[[ "$index_path" == /* ]] || index_path="$managing_worktree/$index_path"
if index_before=$(sha256sum -- "$index_path"); then :; else fail 'index inspection failed'; fi
if diff_before=$(git -C "$managing_worktree" diff --binary --no-ext-diff); then :; else fail 'manager diff inspection failed'; fi
if staged_before=$(git -C "$managing_worktree" diff --cached --binary --no-ext-diff); then :; else fail 'index diff inspection failed'; fi

if [[ "$base_route" == fresh ]]; then
  [[ "$fresh_ref" == refs/remotes/origin/* ]] || fail 'expected origin remote-tracking ref required'
  if git -C "$managing_worktree" fetch origin; then :; else rc=$?; fail "fetch failed (exit $rc); inspect fetch effects"; fi
  checked_equals 'fresh ref mismatch' "$expected_base_sha" git -C "$managing_worktree" rev-parse --verify "$fresh_ref"
  # Fetch may invalidate identity, path, branch, state and hook observations.
  inspect_boundary
  verify_relevant
  confirm_observations
  checked_equals 'fresh ref changed' "$expected_base_sha" git -C "$managing_worktree" rev-parse --verify "$fresh_ref"
fi
checked_equals 'base is missing, not a commit or differs' "$expected_base_sha" git -C "$managing_worktree" rev-parse --verify "$expected_base_sha^{commit}"
if [[ -n "$stage_ref" ]]; then checked_equals 'stage ref mismatch' "$expected_base_sha" git -C "$managing_worktree" rev-parse --verify "$stage_ref"; fi
checked_equals 'manager status changed' "$manager_before" git -C "$managing_worktree" status --porcelain=v1 --untracked-files=all
checked_equals 'manager index changed' "$index_before" sha256sum -- "$index_path"
checked_equals 'manager unstaged bytes changed' "$diff_before" git -C "$managing_worktree" diff --binary --no-ext-diff
checked_equals 'manager staged bytes changed' "$staged_before" git -C "$managing_worktree" diff --cached --binary --no-ext-diff
verify_relevant
confirm_observations
if git -C "$managing_worktree" worktree add -b "$new_branch" "$new_worktree_path" "$expected_base_sha"; then
  add_rc=0
else
  add_rc=$?
fi
printf 'worktree add exit: %s\n' "$add_rc"
# Inspect even on failure: Git or a hook may leave a directory, branch or registration.
if registered_after=$(git -C "$managing_worktree" worktree list --porcelain); then printf '%s\n' "$registered_after"; else printf '%s\n' 'registration inspection failed' >&2; fi
if git -C "$managing_worktree" show-ref --verify "refs/heads/$new_branch"; then :; else rc=$?; printf 'branch inspection exit: %s\n' "$rc"; fi
if [[ -e "$new_worktree_path" || -L "$new_worktree_path" ]]; then ls -ld -- "$new_worktree_path"; else printf '%s\n' 'destination absent'; fi
[[ "$add_rc" -eq 0 ]] || fail 'creation/hook failed; preserve partial state, do not remove or retry automatically'
checked_equals 'new root mismatch' "$new_worktree_path" git -C "$new_worktree_path" rev-parse --show-toplevel
checked_equals 'new branch mismatch' "$new_branch" git -C "$new_worktree_path" branch --show-current
checked_equals 'new HEAD mismatch' "$expected_base_sha" git -C "$new_worktree_path" rev-parse HEAD
if grep -Fxq -- "worktree $new_worktree_path" <<< "$registered_after"; then :; else fail 'new registration absent or inspection failed'; fi
if new_status=$(git -C "$new_worktree_path" status --porcelain=v1 --untracked-files=all); then printf 'new workspace status:\n%s\n' "$new_status"; else fail 'new status inspection failed'; fi
[[ -z "$new_status" ]] || fail 'new workspace has changes; inspect hook effects'
checked_equals 'manager status changed' "$manager_before" git -C "$managing_worktree" status --porcelain=v1 --untracked-files=all
checked_equals 'manager index changed' "$index_before" sha256sum -- "$index_path"
checked_equals 'manager unstaged bytes changed' "$diff_before" git -C "$managing_worktree" diff --binary --no-ext-diff
checked_equals 'manager staged bytes changed' "$staged_before" git -C "$managing_worktree" diff --cached --binary --no-ext-diff
verify_relevant
```

After the block compare the independently captured relevant untracked/ignored bytes and any hook-affected outputs in both workspaces. An unexpected difference or incomplete inspection is not successful acceptance even when Git returned zero. Record numeric exit, diagnostics and actual partial state on any failure; preserve it and seek separately authorized recovery, without automatic cleanup, reset or retry. The script cannot authenticate authority, inspect arbitrary hook effects or prevent races; independently approved canonical parent and UID are preconditions, not discovered permissions.

## Before touching an existing workspace

Inspect the authorized task root and current registration, branch/HEAD and staged, unstaged and untracked state; compare them with task evidence. Follow the [lifecycle](development.md) and [memory procedure](memory.md) for entry/recovery. Never overwrite an apparently obsolete directory. If active state or ownership is unclear, stop. A stable bounded sequence does not require repeating the full entry check per command.

## Connecting Git hooks

From the intended, verified non-bare worktree, inspect the existing configuration before enabling the optional `.githooks`:

```bash
task_worktree=/absolute/verified/owned-task-worktree
git -C "$task_worktree" worktree list --porcelain
git -C "$task_worktree" config --show-origin --show-scope --get-all core.hooksPath
git -C "$task_worktree" config --show-origin --show-scope --get core.hooksPath
git -C "$task_worktree" rev-parse --git-path hooks
git -C "$task_worktree" config --bool --get extensions.worktreeConfig
```

The two `core.hooksPath` queries show configured values/sources and the effective value for this invocation, respectively. Exit 1 with no value means the key is unset; other errors require investigation. Without an override, Git uses its default hooks directory. `git rev-parse --git-path hooks` reports the configured or default path; resolve a relative path from this worktree's root. Command-line or environment overrides can change the effective value for another invocation.

Inspect that directory and the worktree's `.githooks`, including hook contents and executable bits. Setting `core.hooksPath` replaces the directory Git uses; it does not chain existing hooks. Preserve needed existing behavior before replacement. Choose the scope deliberately:

- **Repository-wide setting:** `git config --local` writes the common repository configuration, including when run inside a linked worktree. It also affects worktrees added later, unless overridden. If that shared scope and replacement are intended and authorized, run `git -C "$task_worktree" config --local core.hooksPath "$task_worktree/.githooks"`. This absolute path selects this worktree's hook files for all affected worktrees; it does not select each worktree's own copy. Keep that source available while the setting is in use.
- **One worktree only:** use `--worktree` only when `extensions.worktreeConfig` is already enabled. Without it, do not rely on `--worktree` for an isolated write: Git may use the common configuration or reject the write, depending on the Git version and repository state. After confirming the intended scope and authorization, the following block checks the prerequisite before writing:

```bash
worktree_config=$(git -C "$task_worktree" config --bool --get extensions.worktreeConfig) || {
  printf '%s\n' 'STOP: worktreeConfig is unset or could not be read; configuration unchanged.' >&2
  exit 1
}
[[ "$worktree_config" == true ]] || {
  printf '%s\n' 'STOP: worktreeConfig is disabled; configuration unchanged.' >&2
  exit 1
}
git -C "$task_worktree" config --worktree core.hooksPath "$task_worktree/.githooks"
```

Do not enable `extensions.worktreeConfig` as an automatic fallback. Older Git versions can refuse repositories with this extension; existing common `core.worktree` and `core.bare` settings may require migration to the main worktree's configuration. Compatibility and migration are a separate scoped setup decision; see the official [worktree configuration guide](https://git-scm.com/docs/git-worktree#_configuration_file) and [git-config reference](https://git-scm.com/docs/git-config). If the intended isolated scope cannot be established, leave the configuration unchanged.

After an authorized change, repeat the inspections in the target and every other affected worktree, including the main one. Confirm each effective path and its source, intended executable hook files, and preserved existing behavior. A configuration inspection does not prove hook execution: test the relevant Git operation separately in a disposable fixture before rollout. These hooks remain cooperative checks, not sandbox enforcement or native agent hooks.

When testing a command-scoped override, repeat the same `-c` option for inspection and execution. For example, in an already prepared disposable non-bare fixture with an executable synthetic `pre-commit` hook, inspect the path and invoke that hook with the same override (replace both absolute placeholders):

```bash
fixture_worktree=/absolute/task-owned/disposable-fixture
fixture_hook_dir=/absolute/task-owned/synthetic-hooks
git -C "$fixture_worktree" -c core.hooksPath="$fixture_hook_dir" rev-parse --git-path hooks
git -C "$fixture_worktree" -c core.hooksPath="$fixture_hook_dir" hook run pre-commit
```

Check the synthetic hook's recorded output or marker. This direct invocation tests routing; separately test any behavior that depends on a particular Git operation. The override applies only to each command that includes it; inspect ordinary configuration without `-c` separately.

## Safe cleanup (after Owner-approved disposition)

Do **not** use a separate copied \`git worktree remove\` line after disconnected inspection commands. The entire inspection and mutation must be in **one guarded shell execution**, and no textual "STOP" or printed state is accepted as a passing predicate.

The values below are deliberately non-operational until replaced with **exact, separately approved** ownership/cleanup record data. \`cleanup_approval_ref\` and \`processes_confirmed_clear\` require real human/operational confirmation, not synthetic approval. Every predicate failure exits **before** removal:

```bash
set -euo pipefail

managing_worktree=/absolute/verified/managing-worktree
owned_worktree_path=/absolute/approved/worktrees/my-task
expected_origin='https://github.com/OWNER/REPOSITORY.git'
expected_manager_branch=main
expected_owned_branch=feat/my-task
expected_owned_head=REPLACE_WITH_VERIFIED_40_HEX_SHA
expected_manager_head=REPLACE_WITH_VERIFIED_40_HEX_SHA
cleanup_approval_ref=''              # verified Owner approval record identifying this exact worktree
processes_confirmed_clear=no         # change only after independently checking no active users/processes

fail() { printf 'STOP: %s\n' "$1" >&2; exit 1; }

# Preserve both command status and output; comparing stdout alone hides failures.
checked_equals() {
  local reason=$1 expected=$2 actual
  shift 2
  actual=$("$@") || fail "$reason: inspection failed"
  [[ "$actual" == "$expected" ]] || fail "$reason"
}

[[ "$managing_worktree" == /* && "$owned_worktree_path" == /* ]] || fail 'non-absolute path'
[[ "$managing_worktree" != "$owned_worktree_path" ]] || fail 'same managing/owned path'
[[ -d "$managing_worktree" && -d "$owned_worktree_path" ]] || fail 'missing checkout'
[[ ! -L "$managing_worktree" && ! -L "$owned_worktree_path" ]] || fail 'symlink target'
[[ "$expected_owned_head" =~ ^[0-9a-f]{40}$ && "$expected_manager_head" =~ ^[0-9a-f]{40}$ ]] || fail 'unresolved expected SHA'
[[ -n "$cleanup_approval_ref" && "$processes_confirmed_clear" == yes ]] || fail 'approval or process check missing'
checked_equals 'wrong manager root' "$managing_worktree" git -C "$managing_worktree" rev-parse --show-toplevel
checked_equals 'wrong repository' "$expected_origin" git -C "$managing_worktree" remote get-url origin
checked_equals 'manager branch changed' "$expected_manager_branch" git -C "$managing_worktree" branch --show-current
checked_equals 'manager HEAD changed' "$expected_manager_head" git -C "$managing_worktree" rev-parse HEAD
manager_status=$(git -C "$managing_worktree" status --porcelain=v1 --untracked-files=all --ignored=matching) || fail 'manager status inspection failed'
[[ -z "$manager_status" ]] || fail 'manager tracked/untracked/ignored state requires preservation'
checked_equals 'wrong owned root' "$owned_worktree_path" git -C "$owned_worktree_path" rev-parse --show-toplevel
checked_equals 'wrong owned branch' "$expected_owned_branch" git -C "$owned_worktree_path" branch --show-current
checked_equals 'owned HEAD changed' "$expected_owned_head" git -C "$owned_worktree_path" rev-parse HEAD
registered=$(git -C "$managing_worktree" worktree list --porcelain) || fail 'registration inspection failed'
grep -Fxq -- "worktree $owned_worktree_path" <<< "$registered" || fail 'worktree not registered at exact path'
owned_status=$(git -C "$owned_worktree_path" status --porcelain=v1 --untracked-files=all --ignored=matching) || fail 'status inspection failed'
[[ -z "$owned_status" ]] || fail 'tracked, untracked or ignored contents must be preserved'
# Verify manager remains clean immediately before the destructive Git operation.
manager_status=$(git -C "$managing_worktree" status --porcelain=v1 --untracked-files=all --ignored=matching) || fail 'manager status recheck failed'
[[ -z "$manager_status" ]] || fail 'manager changed during cleanup preflight'
# Recheck registration, ownership, retained Git/PR evidence and absence of active processes immediately before execution.
# The script cannot authenticate the Owner approval record or detect every active process:
# if not independently verified, STOP here and do not execute the mutation.
git -C "$managing_worktree" worktree remove "$owned_worktree_path" || fail 'worktree removal failed'
```

**Authority boundary:** \`cleanup_approval_ref\` is a declaration referring to **already-verified** Owner authorization, not an access-control mechanism. Setting it to a nonempty value or changing \`processes_confirmed_clear\` cannot establish authorization or OS isolation. Independently verify authorization for the exact owned path, clean/ignored files, running processes, correct managing Git repository and retained PR/commit history **before running this script**. A clean status does not prove absence of running processes. If these conditions cannot be established, preserve the worktree.

No \`--force\`, blind recursive deletion, or automatic cleanup. \`git worktree prune\` and branch deletion are **separate mutating actions**, permitted only after inspected stale registration and explicit authorization; this example does not execute either of them. Record \`CLEANED\`, \`PRESERVED\`, or \`CLEANUP_PENDING\` with the observed result.

## Explicit target verification before mutations

Read-only inspection of permitted repositories/files **outside** the task worktree, Git history and external reference sources is allowed under actual security rules; it does **not** need a full write-target preflight. Copying from such a source is a **write at its destination**: verify approved destination independently.

For Git/index/ref/worktree mutations, derive expected identity, absolute root, branch, HEAD, dirty/untracked inventory and authorized scope from mission/checkpoint (not from possibly wrong target). Inspect explicit target:

```bash
# Replace this example value with the independently verified absolute task root.
task_worktree=/absolute/verified/owned-task-worktree
git -C "$task_worktree" rev-parse --show-toplevel
git -C "$task_worktree" remote get-url origin
git -C "$task_worktree" branch --show-current
git -C "$task_worktree" rev-parse HEAD
git -C "$task_worktree" status --short --branch --untracked-files=all
git -C "$task_worktree" diff --name-status
git -C "$task_worktree" diff --cached --name-status
```

Compare actual facts with expected repo/branch/HEAD and **every** dirty/untracked path. Wrong root/ref, unknown owner, unapproved or unexpected dirty/untracked path → **STOP before affected write**. Expected own drafts are allowed. `git -C` selects a target, not isolation/permission.

For Python, redirect, patch/edit tool, `cp`, `mv`, install and other non-Git writes, verify explicit absolute destination or tool's checked working directory and approved exact paths; for `mv` verify both mutated paths. An inherited/unverified cwd is insufficient. Permitted read-only A → authorized B writes target only B, not A.

Stable bounded edit sequences in a verified context need not repeat full preflight per line; observe operation post-state and recheck after compaction/resume, unexpected changes, target/ref switch and before commit/ref/cleanup. Bootstrap an absent worktree by inspecting authorized parent, destination, collisions, source/base and permissions first; do not require nonexistent target HEAD. Verify actual new root/branch/HEAD/status after creation. Shared Git refs remain shared.

## Content coverage: tracked, staged, untracked

Before claiming PASS, enumerate all relevant tracked/staged/**untracked** files, directly check untracked content/whitespace/conflict markers/local links and record coverage/hashes **before staging**. `git diff --check` does **not** inspect untracked bytes. `git diff --no-index --check <baseline-or-empty-file> <path>` may return 1 for a difference without whitespace fault; evaluate numeric exit code **with diagnostic output and content**. An absent/unclear check is not PASS.

Only **after authorized scoped staging**, use `git -C "$task_worktree" diff --cached --check` and inspect full staged diff and index blobs versus approved write-set. Changes invalidate affected prior PASS. Also verify the full baseline-to-delivery PR diff and actual CI on final H; a clean last commit alone is insufficient.

Never reset/clean/stash, force-push, bypass hooks, delete other worktrees or treat checked-out sibling state as private. Cleanup only with separate Owner authority and inventory of all owned/ignored/untracked paths.
