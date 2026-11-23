---
title: How to change the API
sidebar_position: 2
tags: [development, api]
---

Add or change an endpoint of the ordering API without breaking clients or leaving documentation
behind.

1. Change the endpoint in the owning module and add or update its tests.
2. Update the contract in `api/openapi.json`. It is the source for the generated
   [API reference](../reference/api.md) and the frontend client.
3. Check the change chain from the [documentation guideline](../guidelines/documentation.md):
   - new or changed order behaviour → update the [order lifecycle](../../domain/business-rules/order-lifecycle.md);
   - visible to customers or staff → update the [user guide](../../user/index.md);
   - new failure mode → add or update a [runbook](../../operations/index.md).
4. Run `npm run lint:docs` and `npm run docs:build`.
5. Open a pull request; the template lists the same checks.

Breaking changes need a new API version and an announcement in the pull request description.
