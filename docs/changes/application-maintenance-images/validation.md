# Historical verification record — exact S `454cc4d470033746484d750ef7da14b7c44ef9cc`

## 2026-11-01 — stopped, invalidated partial attempt; no PASS

Control Tower stopped this assurance before the remaining mandatory matrix. This record is historical evidence only and is not a verifier PASS/READY for S or any later candidate.

### Candidate custody and provenance correction

- Git exact-S blob for `tests/review-images.spec.ts`: `5501f19dc5049758e581790c676b5013ac275293`.
- Archive file: `/home/azur/Projects/.agent-runs/hardwarelab/images-s2-verifier-20261101-1230/tests/review-images.spec.ts`; its blob is also `5501f19dc5049758e581790c676b5013ac275293`.
- Recorded archive tree and `454cc4d470033746484d750ef7da14b7c44ef9cc^{tree}`: `204316cf599bd8e28ef72d5f39aa3cd029b804b7`.
- The raw-decode content observed during the stop discussion was **not** in this archive. It was read from the dirty source worktree `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-maintenance/tests/review-images.spec.ts`, whose file blob was `7da97299c2413575192d28903b873553e5bd50ed`; its index blob remained exact-S `5501f19dc5049758e581790c676b5013ac275293`.
- Root cause: an incorrect inspection path appended `/source` to the archive root. That nonexistent path caused static inspection to fall back to the current source worktree. This did not establish raw decode in S.

### Attribution disposition

No test or build result from this attempt is assigned PASS to S. The following logs are preserved for diagnosis only and must not be reused as evidence for S or a later candidate without a fresh custody/provenance check:

- `logs/01-npm-ci.log`
- `logs/02-lint.log`
- `logs/03-check-types.log`
- `logs/04-review-image-vitest.log`
- `logs/05-image-node-tests.log`
- `logs/06-production-inventory.json`
- `logs/06-production-inventory.stderr`
- `logs/07-build.log`

The associated contemporaneous checkpoints are `checkpoints/00-pre-npm-ci.txt` through `checkpoints/07-build.txt` and `checkpoints/STOP-source-rework.txt`; their candidate attribution is superseded by this record.

### Not run

`check:affiliate` was aborted before dispatch. `lint:images`, affiliate tests, actual researcher selector, contact test, browser matrix, Lighthouse, full/prod audit, Docker, final security/diff review, and hosted CI were not run. Heavy processes are stopped; the archive, logs, cache, dependencies, and checkpoints are retained at this path for forensic review.
