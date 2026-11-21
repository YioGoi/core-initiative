# Core Initiative

Starter monorepo for Core Initiative and its specialist brands. Each site is a separate Next.js application that can be deployed independently. Shared code starts in `common/`.

This first version is a runnable technical foundation. Visual layouts, style guides, forms, and backend implementation come next.

## Run locally

We use Node.js 24 and pnpm 10.28.2. The Node version is pinned in `.nvmrc`; the pnpm version is pinned in `package.json`.

```sh
nvm use
npm install --global pnpm@10.28.2
pnpm install --frozen-lockfile
pnpm dev
```

Skip the global installation step if pnpm is already installed. If you do not use nvm, install Node.js 24 directly.

| Application | Local URL | Directory |
| --- | --- | --- |
| Core Initiative | http://localhost:3000/nl | `core-initiative-site/` |
| Construct | http://localhost:3001/nl | `construct-site/` |

Both applications support `/nl`, `/en`, and `/tr`. The root URL redirects to the default `/nl` route. No environment variables or service accounts are required to get started. Each application's `.env.example` shows how to override its site origin.

## Repository map

```text
core-initiative/
├── core-initiative-site/  # Umbrella site's Next.js starter
├── construct-site/       # Web and e-commerce brand's Next.js starter
├── common/
│   ├── config/           # Brand registry and locale definitions
│   └── component/        # Reserved for shared, unstyled components
├── docs/
│   ├── onboarding.md     # Quick orientation for Tolga
│   ├── architecture.md   # Decisions, boundaries, and open questions
│   └── artifacts/        # Source files for the PDF and HTML brief
└── output/               # Generated PDF and HTML brief
```

The other brands are Cookie, Tool, Agent, Reflection, and Spoon. They are registered in the shared config; their application directories have not been created yet.

## Commands

```sh
pnpm dev:core       # Run Core only
pnpm dev:construct  # Run Construct only
pnpm typecheck      # Type-check the shared config and both sites
pnpm build          # Build both sites for production
pnpm check          # Run type checks and production builds
```

Each site imports the shared config from `@core-initiative/common/config`. The `common/component/` directory is reserved for future work; no form components or styling system have been implemented yet.

## Repository language

Write documentation, code comments, and development guidance in English. Website copy belongs in locale dictionaries and supports Dutch, English, and Turkish.

## Further reading

- [Quick onboarding](docs/onboarding.md)
- [Architecture and open decisions](docs/architecture.md)
- [PDF brief](output/pdf/core-initiative-tolga-guide.pdf)
- [HTML brief](output/html/core-initiative-tolga-guide.html)

The PDF and HTML brief summarize the project direction. This README is the current reference for repository structure and run commands.
