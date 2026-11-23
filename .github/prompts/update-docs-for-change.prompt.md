---
mode: agent
description: Update the documentation for the current change
---

Look at the current uncommitted changes (`git diff`). For each change:

1. Identify which audiences are affected using the change chain in
   `.github/copilot-instructions.md`.
2. Find the existing pages that describe the changed behaviour. Update them; do not create new pages
   unless no page fits.
3. Keep the edit minimal and consistent with the glossary.
4. Run `npm run lint:docs` and fix any findings.

Finish with a short list of the pages you changed and why, and the pages you checked but left
unchanged.
