---
title: Conventional commits
sidebar_position: 1
tags: [development, process]
---

Commit messages and pull request titles follow [Conventional Commits](https://www.conventionalcommits.org).
Release notes are generated from them.

```text
type(scope): short summary in imperative mood
```

| Type | Use for |
| --- | --- |
| `feat` | New behaviour for users or clients |
| `fix` | Bug fixes |
| `docs` | Documentation only |
| `build`, `ci` | Tooling and pipelines |
| `chore` | Maintenance without behaviour change |

Common scopes: `api`, `web`, `functions`, `infra`, `user`, `domain`, `development`, `architecture`,
`operations`, `adr`.
