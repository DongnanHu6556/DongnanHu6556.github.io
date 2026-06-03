#!/usr/bin/env bash
set -euo pipefail

message="${1:-Update homepage}"

if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "No changes to publish."
  exit 0
fi

git status --short
git add -A
git commit -m "$message"
git push origin master
