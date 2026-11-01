# Application maintenance — delivery evidence

## Frozen subjects

Accepted Spec commit `3360d201366c2cad3d8bd843cec4984e68f805f6`, blob `08e0c7e6b6653e320c096836a21a8cf7ffb62239`; approved P commit `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`, blob `62e685cec97758866d3e5ff627fc98a195e20961`; Project Critic READY `b296ab08555cf0745188b0c4783e43d772653255`; Owner decision in `docs/projects/application-maintenance/owner-decisions.md` at checkpoint `c2fced7fc0b2f4f5031f6dfe11001e54b07df9bd`.

Runtime W `e3f801a4e5aaf4d9ad79c04893ad46aa842082b1`, Stage Critic report `170e0d8ae80e69b68bfe777fa1bfa826b799eb6e`, S `65b69c3c7e05d44600468c114065d7c5e6be21d4`, evidence-only H `bf4e050c9e36b08288ce33cdaa6f71570e866116`: separate Reviewer READY and Verifier PASS are in the runtime reports. H hosted CI: [quality, E2E and Lighthouse](https://github.com/oleyna80/hardwarelab/actions/runs/41117660419), [Lite Checks](https://github.com/oleyna80/hardwarelab/actions/runs/41117660358).

Images W `48bd7bc7df43d08d490550dd796d2d9ceb386ad2`, blob `0527c2ff9da8383624c3590d445cc069e37c7ae1`, Stage Critic READY recorded at `9fcada3904af810a4d9e9123a791299263006748`, source S `bbf7de5ff280cf0f6aa1aeeed996dfc51583d89c`. The stage reports preserve REWORK on prior candidate `454cc4d470033746484d750ef7da14b7c44ef9cc` and the independent rerun results for S. The final evidence head and hosted CI links are recorded in the [task draft PR](https://github.com/oleyna80/hardwarelab/pull/15) after observation, avoiding a link-only commit.

## Scope and evidence

Runtime aligns Node 22, Astro 7, integrations and Sharp, and makes bounded contact/JSON-LD security corrections. Image stage inventories published reviews across four locales, fixes the proven Samsung hero markup and six localized social/hero references using existing assets, and tests image validation and decoding. See `image-inventory.md`, `security-review.md`, and each stage's independent reports for detailed evidence and limits.

Local exact-S verification includes clean installation, lint, types, build, affiliate and disclosure checks, image and researcher tests, production inventory, focused browser and full E2E, Lighthouse collect/assert without upload, full and production npm audits, and committed-context Docker build/start, HTTP page/image and native Sharp checks. Full audit findings and residual dev-tool risks are dispositioned in `security-review.md`; production audit has zero records. This is local evidence and does not establish deployment or production configuration.

## Separate integration and release decisions

PR #15 is stacked on `chore/sdlc-lite-adoption`; integration, Owner acceptance, merge and deploy are separate decisions. Do not infer deployed image SHA or previous release from Git: both are unknown without observing the actual deployment. Following a separately authorized integration and release, identify the deployed immutable image SHA and perform read-only checks of Steam Deck OLED and its FR/DE/RU translations, related/listing and social imagery, and normal security headers. Production proxy/headers, contact-provider behavior, credentials and external remote-image availability remain unobserved.

If rollback is separately authorized and needed, propose restoring the previously known-good immutable image through the existing release process. Its identity and the availability of that process are currently unknown; no rollback, remote deletion or production access is delegated by this delivery record.
