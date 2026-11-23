# Creates ../lunaris.docs-nodocs: the same repository without documentation and agent instructions.
# Used in demo 3 to ask an agent the same question with and without documentation.
# Remove afterwards with: git worktree remove ../lunaris.docs-nodocs --force
$ErrorActionPreference = 'Stop'
$target = Join-Path (Split-Path $PSScriptRoot -Parent | Split-Path -Parent) 'lunaris.docs-nodocs'

git worktree add --detach $target HEAD
Push-Location $target
try {
    Remove-Item -Recurse -Force docs, .github/instructions, .github/prompts
    Remove-Item -Force AGENTS.md, CLAUDE.md, .github/copilot-instructions.md, CONTRIBUTING.md, README.md
    Write-Host "Created $target without docs/ and agent instructions. Open it in a second editor window."
}
finally {
    Pop-Location
}
