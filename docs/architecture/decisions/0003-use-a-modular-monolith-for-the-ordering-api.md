---
title: "ADR-0003: Use a modular monolith for the ordering API"
status: accepted
date: 2026-09-08
decision-makers: Pizza Luna platform team
tags: [adr, architecture]
---

## Context and Problem Statement

The ordering API covers menu, branches and orders. Two developers maintain it part time. Should these
areas be separate services or one application?

## Decision Drivers

- Low operational effort for a small team.
- Clear boundaries so that areas can be split later if needed.
- Fast local development and simple deployments.

## Considered Options

- Modular monolith with modules `Menu`, `Branches` and `Ordering`
- Microservices per area
- Classic layered monolith without module boundaries

## Decision Outcome

Chosen option: "Modular monolith", because it gives us one deployment and one database to run while
keeping module boundaries explicit. Modules talk to each other only through public interfaces and
own their database schema.

### Consequences

- Good, because there is one App Service to deploy, monitor and scale.
- Good, because a module can become its own service later without redesign.
- Bad, because a failure in one module can affect the whole API.

### Confirmation

Architecture tests fail the build when a module references another module's internals.
