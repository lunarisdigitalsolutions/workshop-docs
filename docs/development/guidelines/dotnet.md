---
title: .NET guideline
sidebar_position: 2
tags: [development, dotnet]
---

Conventions for the ordering API and the order processing functions.

- Target .NET 10 and enable nullable reference types and warnings as errors.
- Keep each API module (`Menu`, `Branches`, `Ordering`) in its own folder with a public interface;
  other modules use only that interface ([ADR-0003](../../architecture/decisions/0003-use-a-modular-monolith-for-the-ordering-api.md)).
- Endpoints are minimal APIs grouped per module. Every endpoint has an OpenAPI summary.
- Never call the payment provider or the email service from the API; publish a message instead
  ([ADR-0004](../../architecture/decisions/0004-decouple-order-processing-with-service-bus.md)).
- Log with structured properties (`OrderNumber`, `BranchCode`) so on-call can filter in Application
  Insights.
