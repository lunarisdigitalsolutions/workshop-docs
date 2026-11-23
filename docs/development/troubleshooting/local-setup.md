---
title: Local setup troubleshooting
sidebar_position: 1
tags: [development, troubleshooting]
---

Known problems when running Pizza Luna locally, and how to fix them.

| Symptom | Cause | Fix |
| --- | --- | --- |
| API fails with `Login failed for user 'sa'` | SQL container not ready yet | Wait until `docker compose ps` shows `healthy`, then restart the API. |
| Orders stay in status `Placed` | Order processor not running or wrong connection string | Start `func start` and check `ServiceBus__ConnectionString` in `local.settings.json`. |
| Kitchen board shows "Access denied" | Local user has no staff role | Use the `dev-staff` test user from the team password manager. |
| `npm run docs:start` fails with "Category has no items" | API reference not generated | Run `npm run docs:generate` once, or always start with `npm run docs:start`. |
