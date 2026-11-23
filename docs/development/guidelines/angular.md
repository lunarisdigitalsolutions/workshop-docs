---
title: Angular guideline
sidebar_position: 3
tags: [development, angular]
---

Conventions for the web frontend.

- Use standalone components and signals; no NgModules in new code.
- Two feature areas: `shop` for customers and `kitchen` for branch staff. The `kitchen` routes
  require a signed-in staff role.
- API clients are generated from `api/openapi.json`; do not hand-write HTTP calls.
- Every user-facing text is in English and goes through the translation pipe, so a second language
  can be added later.
