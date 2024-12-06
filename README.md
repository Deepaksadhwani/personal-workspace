# Personal workspace

This is the Personal Workspace monorepo, managed with [Turborepo](https://turbo.build/repo). It serves as a centralized repository containing multiple projects and packages designed for efficient and scalable web development.

## Project Structure

```
.
├── .commitlintrc.ts
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── .npmrc
├── apps/
│   └── jira clone/
├── biome.json
├── lefthook.yml
├── package.json
├── packages/
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ui/
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── turbo.json
```
## Development

To start the development servers for all apps, run the following command:

```sh
pnpm dev
```

This command runs the dev scripts in each app concurrently.

## Building

To build all apps and packages, run the following command:

```sh
pnpm build
```

The build artifacts will be output to the `dist` directories within each app/package.

# Development and Build

This monorepo is managed with **Turborepo** to support development and build processes. You can target specific apps or packages using the `--filter` flag:

# Run development for a specific project:

  ```sh
  pnpm dev --filter=<package-or-app-name>
  # Example: pnpm dev --filter=jira-clone

 pnpm build --filter=<package-or-app-name>
  # Example: pnpm build --filter=jira-clone
 ```

## Scripts

Key scripts defined in the root `package.json`:

- `pnpm dev`: Start development mode.
- `pnpm build`: Build all apps and packages.
- `pnpm lint`: Lint the entire project using Biome.
- `pnpm lint:fix`: Lint and fix issues.
- `pnpm clean`: Clean up the `node_modules` directories.
- `pnpm commit`: Create a conventional commit using Commitizen.

# Linting and Formatting

This project uses Biome for linting and formatting:

- Lint code:

  ```sh
  pnpm lint
  ```

- Fix linting issues:

  ```sh
  pnpm lint:fix
  ```

## Git Hooks

Git hooks are managed using Lefthook. The hooks are defined in `lefthook.yml`:

- Install Git hooks:

  ```sh
  pnpm lefthook install
  ```

## Commit Conventions

We enforce commit message conventions using Commitlint:

- Make a commit:

  ```sh
  pnpm commit
  ```

  This will prompt for a properly formatted commit message.

## Continuous Integration

The CI workflow is defined in `ci.yml`. It includes jobs for linting and building the project.

## References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io)
- [Biome Documentation](https://biomejs.dev)
- [Lefthook Documentation](https://evilmartians.com/chronicles/lefthook)
- [Commitlint Documentation](https://commitlint.js.org)
