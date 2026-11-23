---
mode: agent
description: Draft a blameless post-mortem from incident notes
---

Draft a post-mortem from the incident details the user provides.

1. Copy `docs/operations/post-mortems/template.md` to `YYYY-MM-DD-short-description.md`.
2. Fill summary, timeline, root cause analysis and action items. Describe systems and decisions, never
   people. Write the root cause at component level, without class or method names.
3. Link the runbook that was used and suggest runbook improvements as action items.
4. Add the post-mortem to `docs/operations/post-mortems/index.md`.
5. Run `npm run lint:docs`.
