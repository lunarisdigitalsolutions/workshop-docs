---
title: Environments
sidebar_position: 1
tags: [operations, azure]
---

Pizza Luna runs in two Azure environments in West Europe. Both are created from the same Bicep
templates; only parameters differ.

| Resource | `dev` | `prod` |
| --- | --- | --- |
| Resource group | `rg-pizzaluna-dev` | `rg-pizzaluna-prod` |
| Web frontend (Static Web Apps) | Free, PR previews | Standard |
| Ordering API (App Service) | B1, no slots | P1v3, `staging` slot |
| Order processing (Functions) | Consumption | Flex Consumption |
| Service Bus | Standard, queue `orders` | Standard, queue `orders` |
| Azure SQL | Basic | S2, point-in-time restore 14 days |
| Monitoring | Application Insights + Log Analytics | Application Insights + Log Analytics, alerts active |

All services use managed identities; secrets for the payment provider live in Key Vault
`kv-pizzaluna-<env>`.
