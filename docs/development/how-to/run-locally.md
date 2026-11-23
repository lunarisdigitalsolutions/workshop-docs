---
title: How to run locally
sidebar_position: 1
tags: [development, setup]
---

Start the API, the order processor and the frontend on your machine.

## Prerequisites

- .NET 10 SDK, Node.js 22, Azure Functions Core Tools 4
- Docker for the local SQL Server and the Service Bus emulator

## Steps

1. Start the dependencies:

   ```bash
   docker compose up -d sqlserver servicebus-emulator
   ```

2. Run the API and apply database migrations:

   ```bash
   dotnet run --project src/PizzaLuna.Api
   ```

3. Start the order processor in a second terminal:

   ```bash
   func start --script-root src/PizzaLuna.OrderProcessing
   ```

4. Start the frontend:

   ```bash
   npm start --prefix src/web
   ```

The shop opens at `http://localhost:4200`, the kitchen board at `http://localhost:4200/kitchen`.

If something fails, check [local setup troubleshooting](../troubleshooting/local-setup.md).
