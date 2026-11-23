# Contributing

Thanks for improving the Pizza Luna documentation.

1. Read the [documentation guideline](docs/development/guidelines/documentation.md): where a page goes,
   the four questions every page answers, and the format rules.
2. Create a branch and use [conventional commits](docs/development/process/conventional-commits.md),
   for example `docs(operations): add runbook for payment outages`.
3. Run the checks before you push:

   ```bash
   npm install
   npm run lint:docs
   npm run docs:start   # preview the portal at http://localhost:3000
   ```

4. Open a pull request and complete the documentation checklist in the template.
