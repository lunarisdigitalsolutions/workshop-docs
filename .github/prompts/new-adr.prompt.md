---
mode: agent
description: Draft a new architecture decision record
---

Draft an ADR for the decision described by the user.

1. Confirm the topic is architectural; if it is an implementation detail, say so and stop.
2. Search `docs/architecture/decisions/` for related or conflicting decisions.
3. Copy `docs/architecture/decisions/template.md` to the next free number and fill every section with
   evidence from the repository. Mark open points as questions instead of guessing.
4. Add the record to `docs/architecture/decisions/index.md` with status `proposed`.
5. Run `npm run lint:structure`.
