# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Merchant Cash Advance (MCA) lead marketplace platform** built with React, TypeScript, and Supabase. The application sells MCA leads with different age bands (fresh to aged) across three product types: Direct Submissions, Alpha Data, and Pulse Data.

## Development Commands

- `npm run dev` - Start development server (Vite on port 8080)
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

### Technology Stack
- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19 with SWC
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **UI Components**: shadcn/ui (built on Radix UI primitives)
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack React Query 5.83.0 for server state
- **Forms**: React Hook Form 7.61.1 with Zod validation
- **Database**: Supabase (PostgreSQL) with real-time capabilities
- **Authentication**: Supabase Auth (via localStorage)
- **Icons**: Lucide React
- **Charts**: Recharts 2.15.4
- **Markdown**: React Markdown for blog content
- **SEO**: React Helmet Async
- **Notifications**: Sonner (toasts)

### Key Directories
- `src/components/` - React components (UI components in `ui/` subdirectory)
- `src/pages/` - Page components (11 routes defined in App.tsx)
- `src/hooks/` - Custom React hooks for data fetching and business logic
- `src/integrations/supabase/` - Supabase client configuration and generated types
- `src/lib/` - Utility functions including `cn()` for className merging
- `src/assets/` - Static assets
- `supabase/migrations/` - Database schema migrations (6 files)
- `public/blog-content/` - Markdown blog posts

### Design System
- Custom Tailwind configuration with CSS variables for theming
- Dark mode support via `class` strategy
- Font families: Manrope (headings), Inter (body)
- Semantic color tokens (primary, secondary, surface, text, etc.)
- Custom shadows (card, elevation-1/2/3)
- Animation utilities (shimmer, pulse-down, fade-in)

### Database Schema (Supabase)
The application manages MCA lead inventory with:
- `inventory_segments`: Product inventory with age bands and pricing
- `inventory_snapshots`: Historical inventory tracking
- `customers`: Customer management
- `orders`: Order processing
- `products` & `prices`: Product catalog
- `subscriptions`: Subscription management
- Multiple analytical views for business intelligence

## Development Patterns

### Component Structure
- Use shadcn/ui components as base (`@/components/ui/`)
- Apply custom styles with `cn()` utility from `@/lib/utils`
- Follow Radix UI accessibility patterns
- Use TypeScript interfaces for props

### Data Fetching
- Use TanStack React Query for server state
- Custom hooks in `src/hooks/` encapsulate data fetching logic
- Example: `useInventorySegments()` fetches and manages inventory data
- Supabase client configured in `src/integrations/supabase/client.ts`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Apply design tokens via CSS variables (e.g., `hsl(var(--primary))`)
- Use `cn()` for conditional className merging
- Follow responsive design patterns with Tailwind breakpoints

### TypeScript
- Full TypeScript integration
- Supabase types auto-generated in `src/integrations/supabase/types.ts`
- Component props typed with interfaces
- Utility types in `src/lib/` directory

### Environment Variables
- Supabase configuration in `.env` file
- Required: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Development vs production modes supported

## Key Files for Understanding

1. `src/App.tsx` - Main application with routing and provider setup
2. `src/integrations/supabase/client.ts` - Supabase client configuration
3. `src/hooks/useInventorySegments.ts` - Example data fetching pattern
4. `src/components/ui/button.tsx` - shadcn/ui component pattern
5. `tailwind.config.ts` - Design system configuration
6. `vite.config.ts` - Build configuration with path alias `@` for `./src`
7. `components.json` - shadcn/ui component configuration

## Business Logic

### Product Types
1. **Direct Submissions** - Fresh MCA leads
2. **Alpha Data** - Processed lead data
3. **Pulse Data** - Real-time lead intelligence

### Inventory Management
- Leads categorized by age bands (fresh to aged)
- Real-time inventory tracking
- Historical snapshots for analytics
- Pricing based on lead age and type

### E-commerce Features
- Shopping cart functionality
- Order processing
- Customer management
- Subscription handling

## Development Workflow

1. Start development server: `npm run dev`
2. Create components using shadcn/ui patterns
3. Fetch data via React Query with custom hooks
4. Apply styles with Tailwind and design tokens
5. Test with production build: `npm run build`
6. Run linter: `npm run lint`

## Deployment Workflow

This project originates from **Lovable.dev** and follows a specific deployment pattern:

1. **Source of Truth**: The Lovable.dev platform hosts the live site
2. **Local Development**: This repo was cloned for local development work
3. **Push to Deploy**: When changes are ready, push to the git repo to trigger Lovable's automatic rebuild
4. **No Direct Lovable Edits**: All development happens locally, not in the Lovable interface

## Agent Delegation Model

When working on this codebase with Claude Code:

- **Coordinator Role**: Claude Code (main conversation) handles planning, decisions, and user communication
- **Execution Role**: Sub-agents handle all coding, file creation, file modification, and file operations
- **Workflow**: User and Claude Code discuss and plan together, then Claude Code spawns appropriate sub-agents with clear instructions
- **Quality Gate**: If existing code is fundamentally broken, prefer clean rewrites over patching bad foundations

## Notes

- Real-time capabilities via Supabase subscriptions
- Blog content managed as Markdown files in `public/blog-content/`
- Legal pages (Terms, Privacy, TCPA) included in page routes