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
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5 with SWC
- **Styling**: Tailwind CSS with custom design system (CSS variables in HSL format)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM 6
- **State Management**: TanStack React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Database**: Supabase (PostgreSQL) with real-time capabilities
- **Authentication**: Supabase Auth (via localStorage)

### Key Directories
- `src/components/` - React components (`ui/` subdirectory contains shadcn/ui components)
- `src/components/products/` - Product-specific components (InventoryDashboard, OrderConfigurator, ProductTierCard)
- `src/pages/` - Page components (11 routes defined in App.tsx)
- `src/hooks/` - Custom React hooks for data fetching and business logic
- `src/integrations/supabase/` - Supabase client and auto-generated types
- `src/lib/` - Utility functions including `cn()` for className merging
- `supabase/migrations/` - Database schema migrations
- `public/blog-content/` - Markdown blog posts

### Design System
- **All colors MUST be HSL format** (see `src/index.css` for the complete design system)
- Font families: Manrope (headings), Inter (body)
- CSS variables for theming: `--primary`, `--accent`, `--surface`, `--text-*`, etc.
- Custom utility classes: `.section-padding`, `.container-padding`, `.card-elevated`, `.gradient-text`
- Path alias `@` maps to `./src`

### Database Schema (Supabase)
Core tables:
- `inventory_segments` - Product inventory with age bands and pricing
- `inventory_snapshots` - Historical inventory tracking for 7-day change calculations
- `customers`, `orders`, `order_items` - E-commerce entities
- `products`, `prices` - Product catalog (Stripe integration)
- `subscriptions`, `coupons` - Subscription management

Views for analytics: `v_dashboard_stats`, `v_monthly_revenue`, `v_top_customers`, `v_active_subscriptions`

### Data Fetching Pattern
Custom hooks encapsulate Supabase queries with React Query. Example pattern:

```typescript
// src/hooks/useInventorySegments.ts
const { data } = await supabase
  .from('inventory_segments')
  .select('*')
  .order('product_key');
```

## Business Logic

### Product Types
1. **Direct Submissions** - Fresh MCA leads
2. **Alpha Data** - Processed lead data
3. **Pulse Data** - Real-time lead intelligence

### Lead Age Bands
`lt_15`, `15_30`, `30_90`, `90_180`, `180_365`, `1_2y` - pricing varies by age

### Inventory Management
- Real-time inventory tracking via `inventory_segments`
- 7-day change tracking via `inventory_snapshots` (fetched and compared in `useInventorySegments`)
- Snapshots saved on each inventory fetch

## Deployment Workflow

This project originates from **Lovable.dev**:
1. All development happens locally
2. Push to git repo triggers Lovable's automatic rebuild
3. Do not edit directly in Lovable interface

## Environment Variables

Required:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Stripe Integration

### Products in Stripe (Live Mode)
Lead Products:
- Direct Submissions: `prod_TZkGTQc16lOLjS`
- Alpha Data: `prod_TZkGEzwPfTRsTY`
- Pulse Data: `prod_TZkGdXoHPJCH8v`

Add-On Products:
- FundSense: `prod_TZkGQ5QuxNvck3`
- TrustDial: `prod_TZkGZEJ4EMZLwp`
- StatementSnap: `prod_TZkGfdUVmGmlCp`

### Price Configuration
All Stripe Price IDs are configured in `src/config/stripePriceMap.ts`. This file maps product types and age bands to their respective Stripe Price IDs.

### Edge Function
The Stripe Checkout Edge Function is deployed at `create-checkout-session`. It requires the `STRIPE_SECRET_KEY` secret to be set in Supabase.

To set the Stripe secret key:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_your_key_here
```

### Checkout Flow
1. User builds order in `/build-data-set` (OrderConfigurator component)
2. Frontend calls `create-checkout-session` Edge Function
3. Edge Function creates Stripe Checkout Session
4. User redirected to Stripe hosted checkout
5. On success, user redirected to `/order-success`
