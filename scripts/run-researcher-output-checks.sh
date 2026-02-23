#!/usr/bin/env bash
set -euo pipefail

event_name="${1:-}"
pr_base_sha="${2:-}"
before_sha="${3:-}"
head_sha="${4:-HEAD}"

is_zero_sha() {
  local sha="${1:-}"
  [[ -z "$sha" || "$sha" =~ ^0+$ ]]
}

resolve_base_sha() {
  if [[ "$event_name" == "pull_request" ]] && ! is_zero_sha "$pr_base_sha"; then
    echo "$pr_base_sha"
    return 0
  fi

  if ! is_zero_sha "$before_sha"; then
    echo "$before_sha"
    return 0
  fi

  git rev-parse "${head_sha}^" 2>/dev/null || true
}

base_sha="$(resolve_base_sha)"
if [[ -z "$base_sha" ]]; then
  echo "Researcher checks: unable to resolve base SHA, skipping."
  exit 0
fi

if ! git cat-file -e "${base_sha}^{commit}" 2>/dev/null; then
  echo "Researcher checks: base SHA not found (${base_sha}), skipping."
  exit 0
fi

if ! git cat-file -e "${head_sha}^{commit}" 2>/dev/null; then
  echo "Researcher checks: head SHA not found (${head_sha}), skipping."
  exit 0
fi

mapfile -t changed_files < <(git diff --name-only "$base_sha" "$head_sha")
if [[ "${#changed_files[@]}" -eq 0 ]]; then
  echo "Researcher checks: no changed files."
  exit 0
fi

mapfile -t slugs < <(
  printf '%s\n' "${changed_files[@]}" \
    | awk -F/ '/^src\/content\/reviews\/en\/[^/]+\// { print $5 }' \
    | sort -u
)

if [[ "${#slugs[@]}" -eq 0 ]]; then
  echo "Researcher checks: no changed EN review slugs."
  exit 0
fi

echo "Researcher checks: validating ${#slugs[@]} slug(s): ${slugs[*]}"
for slug in "${slugs[@]}"; do
  node .agent/skills/scripts/check-researcher-output.mjs "$slug"
done

echo "Researcher checks: done."
