---
title: Quality scenarios
sidebar_position: 1
tags: [architecture, quality]
---

Concrete, testable versions of the [quality goals](../introduction.md).

| ID | Quality | Scenario | Response measure |
| --- | --- | --- | --- |
| QS-1 | Reliability | Order processing is down for 30 minutes during opening hours. | No placed order is lost; all are processed within 10 minutes after recovery. |
| QS-2 | Performance | 300 orders arrive within 15 minutes on a Friday evening. | `POST /api/orders` answers within 500 ms at the 95th percentile. |
| QS-3 | Operability | The orders queue grows above 50 messages. | On-call is alerted within 5 minutes and follows a documented runbook. |
| QS-4 | Maintainability | A new menu category is introduced. | The change touches only the `Menu` module and ships within one day. |
| QS-5 | Security | A staff account is compromised. | Access is revoked centrally in Entra ID within 15 minutes; no card data is exposed. |
