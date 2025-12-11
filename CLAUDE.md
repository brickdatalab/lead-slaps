# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MCA (Merchant Cash Advance) lead marketplace built with React/TypeScript and Supabase. Sells leads across three product types (Direct Submissions, Alpha Data, Pulse Data) with pricing based on lead age bands (lt_15, 15_30, 30_90, 90_180, 180_365, 1_2y).

## Development Commands

```bash
npm run dev      # Start dev server (Vite, port 8080)
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

### Technology Stack
- React 18 + TypeScript + Vite 5 (SWC)
- Tailwind CSS + shadcn/ui (Radix primitives)
- TanStack React Query (server state)
- React Hook Form + Zod (forms)
- Supabase (PostgreSQL, Edge Functions)
- Stripe (checkout via Edge Function)

### Critical Design System Rule
**All colors MUST use HSL format.** See `src/index.css` for the complete variable system:
- Fonts: Manrope (headings), Inter (body)
- CSS variables: `--primary`, `--accent`, `--surface`, `--text-*`
- Path alias: `@` → `./src`

### Key Architecture Patterns

**Data Fetching**: Custom hooks wrap Supabase queries with React Query
```typescript
// Pattern used in src/hooks/useInventorySegments.ts
const { data } = await supabase.from('inventory_segments').select('*');
```

**Checkout Flow** (`src/components/products/OrderConfigurator.tsx` → Stripe):
1. User builds cart from `inventory_segments` data
2. Frontend calls `create-checkout-session` Edge Function with Stripe Price IDs
3. Edge Function creates Stripe Checkout Session
4. Redirect to Stripe → success redirects to `/order-success`

**Price Configuration**: `src/config/stripePriceMap.ts` maps product types and age bands to Stripe Price IDs. All pricing changes require updates here.

### Database Schema (Supabase)

Core tables:
- `inventory_segments` - Products with age bands, pricing, quantities
- `inventory_snapshots` - Historical tracking for 7-day change calculations
- `customers`, `orders`, `order_items` - E-commerce entities
- `products`, `prices`, `subscriptions`, `coupons` - Stripe sync

Types are auto-generated in `src/integrations/supabase/types.ts`

### Routes (src/App.tsx)
```
/                → Index (homepage)
/products        → Products listing
/build-data-set  → OrderConfigurator (checkout flow)
/order-success   → Post-purchase confirmation
/add-ons         → Add-on products
/blog, /blog/:slug → Blog system (markdown in public/blog-content/)
/contact, /terms, /privacy, /tcpa → Static pages
```

## Stripe Integration

### Products (Live Mode)
- Direct Submissions: `prod_TZkGTQc16lOLjS`
- Alpha Data: `prod_TZkGEzwPfTRsTY`
- Pulse Data: `prod_TZkGdXoHPJCH8v`
- FundSense: `prod_TZkGQ5QuxNvck3`
- TrustDial: `prod_TZkGZEJ4EMZLwp`
- StatementSnap: `prod_TZkGfdUVmGmlCp`

### Edge Function Setup
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_your_key_here
```
Edge Function: `supabase/functions/create-checkout-session/index.ts`

## Environment Variables

Required:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Deployment

Project originates from **Lovable.dev**:
1. Develop locally
2. Push to git triggers Lovable rebuild
3. Do not edit in Lovable interface directly
