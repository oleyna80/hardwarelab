#!/usr/bin/env bash
set -euo pipefail

EVENT_NAME="${1:-}"
PR_BASE_SHA="${2:-}"
PUSH_BEFORE_SHA="${3:-}"
HEAD_SHA="${4:-${GITHUB_SHA:-HEAD}}"

if [[ -z "${EVENT_NAME}" ]]; then
  EVENT_NAME="${GITHUB_EVENT_NAME:-}"
fi

BASE_SHA=""
if [[ "${EVENT_NAME}" == "pull_request" ]]; then
  BASE_SHA="${PR_BASE_SHA}"
else
  BASE_SHA="${PUSH_BEFORE_SHA}"
fi

# Fallback for edge cases (e.g. first push where "before" can be all zeros)
if [[ -z "${BASE_SHA}" || "${BASE_SHA}" =~ ^0+$ ]] || ! git cat-file -e "${BASE_SHA}^{commit}" 2>/dev/null; then
  if git rev-parse --verify HEAD~1 >/dev/null 2>&1; then
    BASE_SHA="$(git rev-parse HEAD~1)"
  else
    BASE_SHA=""
  fi
fi

if [[ -z "${BASE_SHA}" ]]; then
  echo "Could not determine base commit. Running checks for all EN review slugs."
  mapfile -t SLUGS < <(find src/content/reviews/en -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort)
else
  mapfile -t SLUGS < <(
    git diff --name-only "${BASE_SHA}" "${HEAD_SHA}" \
      | awk -F/ '/^src\/content\/reviews\/en\/[^/]+\// {print $5}' \
      | sort -u
  )
fi

if [[ "${#SLUGS[@]}" -eq 0 ]]; then
  echo "No EN review changes detected. Skipping check:researcher-output."
  exit 0
fi

echo "EN review slugs to validate:"
printf ' - %s\n' "${SLUGS[@]}"

for slug in "${SLUGS[@]}"; do
  if [[ -f "src/content/reviews/en/${slug}/index.mdx" ]]; then
    npm run -s check:researcher-output -- "${slug}"
  else
    echo "Skip ${slug}: no index.mdx (directory may be draft-only)."
  fi
done
