#!/usr/bin/env bash
# Materialise the pre-modernization code (the behavioural oracle) as a read-only worktree in .legacy/.
set -euo pipefail
LEGACY_SHA=b6304a9470e453c15a89453cb242076e8c8efab4
cd "$(dirname "$0")/.."
if [ ! -e .legacy/src ]; then
  git worktree add --detach .legacy "$LEGACY_SHA" >/dev/null
fi
