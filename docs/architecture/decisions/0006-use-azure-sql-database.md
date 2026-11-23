---
title: "ADR-0006: Use Azure SQL Database"
status: accepted
date: 2026-09-22
decision-makers: Pizza Luna platform team
tags: [adr, azure, data]
---

## Context and Problem Statement

Orders, menu and branch data are relational and need transactions. Which database do we use?

## Decision Drivers

- Transactions across order and order lines.
- Familiar tooling for .NET developers (Entity Framework Core).
- Managed backups and point-in-time restore.

## Considered Options

- Azure SQL Database
- Azure Cosmos DB
- Azure Database for PostgreSQL

## Decision Outcome

Chosen option: "Azure SQL Database", because it fits the relational model, the team knows it, and
point-in-time restore covers our recovery needs. Each API module owns one schema.

### Consequences

- Good, because Entity Framework Core migrations run in the deployment pipeline.
- Bad, because schema changes need migrations that stay compatible with the running version.

### Confirmation

The deployment pipeline applies migrations before swapping slots; see
[Deploy and roll back](../../operations/deployment/deploy-and-roll-back.md).
