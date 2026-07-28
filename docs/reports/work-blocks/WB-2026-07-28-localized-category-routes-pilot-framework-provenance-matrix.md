# WB-009 Framework Provenance Matrix

## Scope and evidence

This is a provenance audit, not a request to import more framework files.
HardwareLab's pilot adaptation was resolved and copied from the immutable
upstream `multi-runtime` profile at
`c604f8d2085ca3469de54a525880e3f11eba0fa7`. The installer was not run.

`d208d67621166d89b55e845b3e75932c6f5f0c7e` is the final head named by the
Owner for upstream WB-008, on the remote
`agent/post-merge-ssot-release-gate` branch / PR 8. It is not available in
the local framework checkout and is not the source revision recorded for this
pilot. Its comparison with `c604f8` contains 115 commits and 19 changed
paths. Therefore this pilot is **not a full synchronization of the latest
framework or of final WB-008**.

The evidence for `c604f8` is the pinned import manifest. The WB-008 path set
was compared read-only against the current HardwareLab worktree on 2026-07-28.
Existing paths with the same name do not imply that their WB-008 delta was
adopted.

## Matrix

| Classification | Upstream artifact or capability | State in HardwareLab | Evidence / boundary |
| --- | --- | --- | --- |
| **Imported from `c604f8`** | Base multi-runtime control plane: `AGENTS.md`, active Work Block contract, lifecycle/artifact/evaluation governance, role adapters, selected skills, profile validator, evaluation validator, and portable templates. | Present as the approved WB-009 adaptation, with documented HardwareLab compatibility changes. | Exact write set and checksums are recorded in the [import manifest](../../plans/WB-2026-07-28-localized-category-routes-pilot-import-manifest.md). These are the pre-WB-008 base controls, not the WB-008 release-state gate. |
| **Imported from `c604f8`** | Local `FILE_REGISTRY.yml` and `PROJECT_MAP.md` control-plane baselines. | Present, created as HardwareLab-specific registry and map. | These paths are in the pinned import manifest. Their WB-008 release-state additions are not included merely because the paths exist. |
| **Manually adopted from WB-008** | Direct WB-008 artifact, validator, workflow, or contract. | **None proven.** | No WB-008 source SHA, patch, or manual-adoption record existed before this audit. Do not infer adoption from similar concepts such as ordinary closeout or SSOT sync. |
| **Not yet adopted** | `governance/release-state.md`: the post-merge release-state SSOT and its boundary for mutable external VCS/PR assertions. | Absent. | This is a new WB-008 artifact, not part of the `c604f8` import set. |
| **Not yet adopted** | `scripts/validate-release-state.py` and `scripts/test-release-state-contracts.py`: fail-closed release-state validator and adversarial fixtures. | Absent. | HardwareLab has `validate-evaluation.py` only; that does not validate release state. |
| **Not yet adopted** | `.github/workflows/release-state-contract.yml`: deterministic CI admission for the release-state contract. | Absent. | Existing HardwareLab GitHub Actions are unrelated CI/deploy/agent guards. |
| **Not yet adopted** | WB-008 update to `scripts/validate-governance.sh` to invoke release-state validation. | Absent. | `scripts/validate-governance.sh` does not exist in HardwareLab. |
| **Not yet adopted** | WB-008 deltas to `FILE_REGISTRY.yml`, `PROJECT_MAP.md`, and `README.md` that expose release-state projection and the completed migration. | Not adopted. Same-named local registry/map/README are not evidence of this delta. | No release-state references or WB-008 provenance occur in those local artifacts. |
| **Not yet adopted** | Historical reconciliation of upstream WB-001/002/003/005/006/007 and WB-008's own plan, review, drift audit, and closeout. | Absent by design. | Those documents describe the source framework's history; copying them would make HardwareLab's lifecycle history false. |

## Consequence for WB-009

WB-009 tests the `c604f8` multi-runtime profile plus the local pilot additions.
It does **not** test the WB-008 post-merge release-state gate, its CI behavior,
or its adversarial VCS-state parser. A later, separately approved Work Block
would be required to assess whether those release-state controls are useful in
HardwareLab and to adapt them without importing upstream historical evidence.
