---
title: "ADR-0005: Host on App Service and Static Web Apps"
status: accepted
date: 2026-09-15
decision-makers: Pizza Luna platform team
tags: [adr, azure]
---

## Context and Problem Statement

We need hosting for the Angular frontend, the ordering API and the order processor that a small team
can operate without container or cluster know-how.

## Decision Drivers

- Managed platform services, no clusters to patch.
- Built-in deployment slots for safe releases.
- Predictable monthly cost.

## Considered Options

- Static Web Apps for the frontend, App Service for the API, Azure Functions for processing
- Azure Container Apps for all components
- Azure Kubernetes Service

## Decision Outcome

Chosen option: "Static Web Apps, App Service and Azure Functions", because each component runs on the
simplest managed service that fits it, and App Service deployment slots give us zero-downtime
releases.

### Consequences

- Good, because there is no container image or cluster to maintain.
- Good, because Static Web Apps provides pull request preview environments for the frontend.
- Bad, because moving to containers later means changing the deployment pipelines.

### Confirmation

All resources are defined in Bicep; see [Environments](../../operations/deployment/environments.md).
