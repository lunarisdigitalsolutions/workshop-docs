#!/usr/bin/env bash
# Bash variant of new-nodocs-copy.ps1.
set -euo pipefail
target="$(cd "$(dirname "$0")/../.." && pwd)/lunaris.docs-nodocs"
git worktree add --detach "$target" HEAD
cd "$target"
rm -rf docs .github/instructions .github/prompts
rm -f AGENTS.md CLAUDE.md .github/copilot-instructions.md CONTRIBUTING.md README.md
echo "Created $target without docs/ and agent instructions."
