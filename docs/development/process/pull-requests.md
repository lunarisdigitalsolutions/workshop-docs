---
title: Pull requests
sidebar_position: 2
tags: [development, process]
---

Every change reaches `main` through a pull request.

## Definition of done

A pull request is done when:

- the change is tested,
- documentation affected by the change is updated in the same pull request,
- `docs-pr` and the build checks are green,
- one code owner of each touched area approved it (see `.github/CODEOWNERS`).

## Review focus

The pipeline checks spelling, style, links, Markdown and ADR structure. Reviewers focus on whether the
content is correct, placed in the right audience folder and useful for its reader.
