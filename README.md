# Imperra Marketplace

A monorepo containing a Next.js frontend and NestJS backend application.

## Prerequisites

- Node.js v24 (specified in `.nvmrc`)
- pnpm >= 8.0.0

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Development

Run both frontend and backend in development mode:

```bash
pnpm dev
```

Or run them separately:

```bash
# Frontend only (Next.js on http://localhost:3000)
pnpm dev:web

# Backend only (NestJS on http://localhost:3001)
pnpm dev:api
```

### Build

Build all applications:

```bash
pnpm build
```

Build individually:

```bash
pnpm build:web
pnpm build:api
```

### Linting

```bash
pnpm lint
```

## Project Structure

```
imperra-marketplace/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── api/          # NestJS backend application
├── packages/         # Shared packages (if needed)
├── package.json      # Root package.json with workspace configuration
└── pnpm-workspace.yaml
```

## Applications

### Web (Next.js)

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Port**: 3000

### API (NestJS)

- **Framework**: NestJS 10
- **Language**: TypeScript
- **Port**: 3001
- **Health Check**: http://localhost:3001/health

## Workspace Commands

All commands can be run from the root directory using pnpm workspace filters:

- `pnpm --filter web <command>` - Run command in web app
- `pnpm --filter api <command>` - Run command in api app

