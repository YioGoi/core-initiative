# Core Initiative

A monorepo for independently deployable brand sites. Core Initiative connects six specialist directions; each brand owns its content, typography, styling and interaction design.

## Current state

- **Construct:** a working, multilingual web studio frontend with a layered ceramics scroll scene, an immersive instrument e-commerce concept, a Core family directory and an elastic particle reveal beneath the footer.
- **Core Initiative:** an unstyled Next.js starter.
- **Cookie:** a multilingual design studio concept with its own typography, tactile brand study and two scroll-driven transitions.
- **Tool:** a local software and systems studio prototype with a phase instrument, an assembling workflow and layered architecture motion.
- **Other brands:** registered in shared configuration; their applications have not been created.
- **Contact:** Construct, Cookie and Tool open an email draft when an address is configured. Without it, the forms offer a local message preview and copy action. They do not send or store submissions.
- **Backend:** a shared ASP.NET Core contact service is the next integration. It is not implemented. No database or dashboard is required for the current frontend.
- **Deployment:** local development and production builds work. Production hosting and DNS connections are not configured in this repository.

## Run locally

Use Node.js 24 and pnpm 10.28.2, pinned in `.nvmrc` and `package.json`.

```sh
git clone https://github.com/YioGoi/core-initiative.git
cd core-initiative
nvm use
npm install --global pnpm@10.28.2
pnpm install --frozen-lockfile
pnpm dev:construct
```

Skip the global installation if pnpm is already installed. You can use Node.js 24 directly without nvm.

| Application | Local URL | Directory |
| --- | --- | --- |
| Core Initiative | http://localhost:3000/nl | `core-initiative-site/` |
| Construct | http://localhost:3001/nl | `construct-site/` |
| Cookie | http://localhost:3002/nl | `cookie-site/` |
| Tool | http://localhost:3003/nl | `tool-site/` |

All applications support `/nl`, `/en` and `/tr`; `/` redirects to Dutch. No external accounts or environment variables are required to start. For optional configuration, copy the relevant application's `.env.example` to `.env.local`. Local environment files are ignored by Git.

## Commands

```sh
pnpm dev            # Run all sites
pnpm dev:core       # Run Core only
pnpm dev:construct  # Run Construct only
pnpm dev:cookie     # Run Cookie only
pnpm dev:tool       # Run Tool only
pnpm typecheck      # Type-check shared config and all sites
pnpm build          # Build all sites for production
pnpm check          # Type checks and production builds
```

## Repository map

```text
core-initiative/
├── core-initiative-site/  # Umbrella site starter
├── construct-site/       # Web studio implementation and brand-specific components
├── cookie-site/          # Design studio concept and independent motion language
├── tool-site/            # Software studio prototype and phase/depth motion studies
├── common/
│   ├── config/           # Brand registry and locale definitions
│   └── component/        # Reserved for future unstyled shared components
└── docs/
    ├── onboarding.md     # File-level orientation and first integration
    └── architecture.md   # Current behavior and planned boundaries
```

Each site consumes `@core-initiative/common/config`. Brand-specific styles stay inside the relevant application. Shared form components have not been extracted yet.

| Brand | Focus |
| --- | --- |
| Core Initiative | Shared origin and brand family |
| Construct | Websites and e-commerce |
| Cookie | Brand and digital design |
| Tool | Software and systems |
| Agent | AI and automation |
| Reflection | Visibility and content |
| Spoon | Creative workshop |

## Development references

Changes go through task branches and reviewed pull requests. Read the [contribution workflow](CONTRIBUTING.md) before starting work.

- [Quick onboarding](docs/onboarding.md)
- [Architecture and integration boundaries](docs/architecture.md)
- [Construct implementation, contact setup and image provenance](construct-site/README.md)
- [Cookie concept, motion behavior and asset provenance](cookie-site/README.md)
- [Tool prototype, motion direction and local setup](tool-site/README.md)

Current collaboration briefs are shared separately. Historical generated snapshots under `output/` are not the current setup reference.

Documentation, code comments, identifiers and development guidance use English. Translated website copy belongs in the Dutch, English and Turkish locale dictionaries.
