---
applyTo: 'api/openapi.json'
---

# API contract changes

When the contract changes, check which documentation describes the changed behaviour and update it in
the same change:

- order states or rules → `docs/domain/business-rules/`
- prices, fees or limits → `docs/domain/business-rules/pricing.md`
- new fields on core entities → `docs/domain/models/domain-model.md`
- anything a customer or branch staff sees → `docs/user/`
- new failure modes → `docs/operations/runbooks/`

Do not edit `docs/development/reference/api.md`; run `npm run docs:generate` instead.
