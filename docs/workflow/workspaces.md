# Git Branches and Workspace Lifecycle

## Default

Keep a persistent, clean checkout of `main`. Use a short-lived task branch, preferably in a separate Git worktree when multiple tasks must coexist. A worktree shares Git objects and refs with the repository; an independent clone does not.

Example — **one contiguous, fail-closed Bash run**, and only when the Owner-authorized mission permits worktree creation. All example values are deliberately non-operational until replaced with independently verified expected facts. Run the complete block, **not individual mutation lines**:

```bash
set -euo pipefail

# Replace every example value using approved independent mission facts.
managing_worktree=/absolute/verified/managing-worktree
new_worktree_path=/absolute/approved/worktrees/my-task
approved_parent_path=/absolute/approved/worktrees
expected_parent_uid=REPLACE_WITH_VERIFIED_NUMERIC_UID
expected_origin='https://github.com/OWNER/REPOSITORY.git'
expected_branch=main
expected_head=REPLACE_WITH_VERIFIED_40_HEX_SHA
expected_base_sha=REPLACE_WITH_VERIFIED_BASE_40_HEX_SHA
new_branch=feat/my-task

fail() { printf 'STOP: %s\n' "$1" >&2; exit 1; }

# Preserve both command status and output; comparing stdout alone hides failures.
checked_equals() {
  local reason=$1 expected=$2 actual
  shift 2
  actual=$("$@") || fail "$reason: inspection failed"
  [[ "$actual" == "$expected" ]] || fail "$reason"
}

# Inspect the actual destination and repository BEFORE the mutating fetch.
[[ "$managing_worktree" == /* && "$new_worktree_path" == /* && "$approved_parent_path" == /* ]] || fail 'non-absolute path'
[[ "$managing_worktree" != "$new_worktree_path" ]] || fail 'same source and destination'
[[ "$expected_head" =~ ^[0-9a-f]{40}$ && "$expected_base_sha" =~ ^[0-9a-f]{40}$ ]] || fail 'unresolved expected SHA'
[[ "$expected_parent_uid" =~ ^[0-9]+$ ]] || fail 'unresolved approved parent owner UID'
[[ -d "$managing_worktree" && ! -L "$managing_worktree" ]] || fail 'managing worktree not present/canonical'
# The destination must be a direct child of the independently approved, existing,
# canonical parent; reject symlinked ancestors before any fetch or worktree add.
checked_equals 'destination outside approved parent' "$approved_parent_path" dirname -- "$new_worktree_path"
[[ -d "$approved_parent_path" && ! -L "$approved_parent_path" ]] || fail 'parent absent or symlink'
resolved_parent=$(realpath -e -- "$approved_parent_path") || fail 'parent resolution failed'
[[ "$resolved_parent" == "$approved_parent_path" ]] || fail 'parent path contains symlink or is noncanonical'
observed_parent_uid=$(stat -c %u -- "$approved_parent_path") || fail 'parent owner inspection failed'
[[ "$observed_parent_uid" == "$expected_parent_uid" ]] || fail 'parent owner mismatch'
[[ -w "$approved_parent_path" && -x "$approved_parent_path" ]] || fail 'parent not writable/searchable'
[[ ! -e "$new_worktree_path" && ! -L "$new_worktree_path" ]] || fail 'destination collision'
checked_equals 'wrong managing root' "$managing_worktree" git -C "$managing_worktree" rev-parse --show-toplevel
checked_equals 'wrong repository' "$expected_origin" git -C "$managing_worktree" remote get-url origin
checked_equals 'wrong branch' "$expected_branch" git -C "$managing_worktree" branch --show-current
checked_equals 'unexpected HEAD' "$expected_head" git -C "$managing_worktree" rev-parse HEAD
manager_status=$(git -C "$managing_worktree" status --porcelain=v1 --untracked-files=all --ignored=matching) || fail 'manager status failed'
[[ -z "$manager_status" ]] || fail 'manager tracked/untracked/ignored state requires preservation'
git -C "$managing_worktree" check-ref-format --branch "$new_branch" >/dev/null || fail 'invalid branch'
if git -C "$managing_worktree" show-ref --verify --quiet "refs/heads/$new_branch"; then
  fail 'branch already exists'
else
  show_ref_status=$?
  [[ "$show_ref_status" -eq 1 ]] || fail "branch inspection failed (exit $show_ref_status)"
fi

# Fetch is itself a Git mutation: require the above identity/scope preflight.
git -C "$managing_worktree" fetch origin || fail 'fetch failed'
checked_equals 'base ref mismatch' "$expected_base_sha" git -C "$managing_worktree" rev-parse origin/main
# Re-run the complete path, identity and ownership check immediately before
# mutation, because fetch and unrelated processes can change the observed state.
checked_equals 'destination parent changed' "$approved_parent_path" dirname -- "$new_worktree_path"
[[ -d "$approved_parent_path" && ! -L "$approved_parent_path" ]] || fail 'parent changed'
resolved_parent=$(realpath -e -- "$approved_parent_path") || fail 'parent resolution changed'
[[ "$resolved_parent" == "$approved_parent_path" ]] || fail 'parent became noncanonical'
observed_parent_uid=$(stat -c %u -- "$approved_parent_path") || fail 'parent owner changed'
[[ "$observed_parent_uid" == "$expected_parent_uid" ]] || fail 'parent owner mismatch'
[[ -w "$approved_parent_path" && -x "$approved_parent_path" ]] || fail 'parent permission changed'
# Revalidate managing Git identity, refs and content after fetch, before worktree add.
# A successful fetch does not mean the managing checkout is still the approved target.
[[ -d "$managing_worktree" && ! -L "$managing_worktree" ]] || fail 'managing worktree changed'
checked_equals 'managing root changed' "$managing_worktree" git -C "$managing_worktree" rev-parse --show-toplevel
checked_equals 'repository changed' "$expected_origin" git -C "$managing_worktree" remote get-url origin
checked_equals 'manager branch changed' "$expected_branch" git -C "$managing_worktree" branch --show-current
checked_equals 'manager HEAD changed' "$expected_head" git -C "$managing_worktree" rev-parse HEAD
manager_status=$(git -C "$managing_worktree" status --porcelain=v1 --untracked-files=all --ignored=matching) || fail 'manager status recheck failed'
[[ -z "$manager_status" ]] || fail 'manager tracked/untracked/ignored state changed'
if git -C "$managing_worktree" show-ref --verify --quiet "refs/heads/$new_branch"; then
  fail 'new branch appeared after fetch'
else
  show_ref_status=$?
  [[ "$show_ref_status" -eq 1 ]] || fail "branch reinspection failed (exit $show_ref_status)"
fi
[[ ! -e "$new_worktree_path" && ! -L "$new_worktree_path" ]] || fail 'destination changed'
# Also require independently verified Owner creation authority; this shell
# cannot authenticate approval or guarantee race-free filesystem operations.
git -C "$managing_worktree" worktree add -b "$new_branch" "$new_worktree_path" "$expected_base_sha" || fail 'create failed'
checked_equals 'new root mismatch' "$new_worktree_path" git -C "$new_worktree_path" rev-parse --show-toplevel
checked_equals 'new branch mismatch' "$new_branch" git -C "$new_worktree_path" branch --show-current
checked_equals 'new HEAD mismatch' "$expected_base_sha" git -C "$new_worktree_path" rev-parse HEAD
```

The script cannot prove Owner authorization, race-free path ownership or external process state. The parent path and owner UID must be independently approved, not merely discovered from the target. The `realpath -e` and GNU `stat -c` checks assume Linux/GNU userland; they detect symlinked ancestors and permission/owner mismatches in the observed state but are not an OS-level isolation boundary or atomic filesystem guarantee. Those are **preconditions** from separately verified evidence, not generated permissions. If any prerequisite is uncertain, **do not run the block**. The example uses an approved \`origin/main\` base; an independently approved stage descendant is also valid when its exact SHA/conformance are verified.

## Before touching an existing workspace

Run read-only inspections:

```bash
# Replace this example value with the independently verified absolute task root.
task_worktree=/absolute/verified/owned-task-worktree
git -C "$task_worktree" worktree list --porcelain
git -C "$task_worktree" status --short --branch --untracked-files=all
```

Never overwrite a directory because it looks obsolete. Untracked/ignored files may contain user work. If active state or ownership is unclear, stop.

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
