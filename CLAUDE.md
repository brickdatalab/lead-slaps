# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Merchant Cash Advance (MCA) lead marketplace platform** built with React, TypeScript, and Supabase. The application sells MCA leads with different age bands (fresh to aged) across three product types: Direct Submissions, Alpha Data, and Pulse Data.

**Live Site**: leadslaps.com

## Development Commands

```bash
npm run dev       # Start development server (Vite on port 8080)
npm run build     # Production build
npm run build:dev # Development build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Architecture

### Technology Stack
| Category | Technology | Version |
|----------|------------|---------|
| Frontend | React with TypeScript | 18.3.1 |
| Build Tool | Vite with SWC | 5.4.19 |
| Styling | Tailwind CSS | 3.4.17 |
| UI Components | shadcn/ui (Radix UI primitives) | - |
| Routing | React Router DOM | 6.30.1 |
| State Management | TanStack React Query | 5.83.0 |
| Forms | React Hook Form + Zod | 7.61.1 |
| Database | Supabase (PostgreSQL) | 2.81.1 |
| Icons | Phosphor Icons | 2.1.10 |
| Charts | Recharts | 2.15.4 |
| Markdown | React Markdown | 10.1.0 |
| SEO | React Helmet Async | 2.0.5 |
| Notifications | Sonner (toasts) | 1.7.4 |

### Key Directories
```
src/
├── assets/           # Static assets (images, logos)
├── components/       # React components
│   ├── ui/          # shadcn/ui base components (40+ components)
│   └── products/    # Product-specific components
├── hooks/           # Custom React hooks
│   ├── use-toast.ts
│   └── useInventorySegments.ts
├── integrations/
│   └── supabase/    # Supabase client & auto-generated types
├── lib/             # Utility functions (cn() helper)
└── pages/           # Page components (11 routes)

public/
├── blog-content/    # Markdown blog posts (4 articles)
├── favicon.ico
├── robots.txt
└── sitemap.xml

supabase/
└── migrations/      # Database schema migrations (6 files)
```

### Application Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/` | Index | Landing page with Hero, Products, FAQ |
| `/products` | Products | Product catalog with inventory |
| `/add-ons` | AddOns | Additional services |
| `/contact` | Contact | Contact form |
| `/blog` | Blog | Blog listing page |
| `/blog/:slug` | BlogPost | Individual blog posts |
| `/build-data-set` | BuildDataSet | Custom data builder |
| `/terms` | Terms | Terms of service |
| `/privacy` | Privacy | Privacy policy |
| `/tcpa` | Tcpa | TCPA compliance |
| `*` | NotFound | 404 page |

## Database Schema (Supabase)

### Tables
| Table | Purpose |
|-------|---------|
| `inventory_segments` | Product inventory with age bands and pricing |
| `inventory_snapshots` | Historical inventory tracking for 7-day trends |
| `customers` | Customer management with Stripe integration |
| `customer_lifetime_spend` | Aggregated customer spending metrics |
| `orders` | Order processing with Stripe payment tracking |
| `order_items` | Line items for each order |
| `products` | Product catalog with Stripe sync |
| `prices` | Pricing tiers (one-time and recurring) |
| `subscriptions` | Subscription management |
| `coupons` | Discount codes |

### Views (Analytics)
- `v_dashboard_stats` - Key metrics (revenue, MRR, customer counts)
- `v_monthly_revenue` - Revenue trends by month
- `v_mrr` - Monthly recurring revenue breakdown
- `v_top_customers` - Customer lifetime value rankings
- `v_active_subscriptions` - Current subscription details
- `v_revenue_by_product` - Product performance metrics
- `v_customer_cohorts` - Cohort analysis
- `v_recent_activity` - Activity feed

### Functions
- `search_customers(query)` - Full-text customer search
- `search_products(query)` - Full-text product search
- `update_customer_lifetime_spend(customer_id)` - Refresh LTV calculations

## Design System

### CSS Variables (in `src/index.css`)
The design uses HSL color format with CSS variables for theming:

```css
--primary: 210 100% 15%;      /* Navy #0A2540 */
--accent: 173 80% 40%;        /* Teal #14B8A6 */
--text-primary: 210 100% 15%; /* Dark navy */
--text-secondary: 215 20% 27%; /* Slate */
--surface: 210 40% 98%;       /* Off-white */
```

### Typography
- **Headings**: Manrope (font-heading, font-manrope)
- **Body**: Inter (font-body, font-inter)

### Shadows
```css
shadow-card        /* Subtle card shadow */
shadow-card-hover  /* Elevated hover state */
shadow-elevation-1 /* Light elevation */
shadow-elevation-2 /* Medium elevation */
shadow-elevation-3 /* Heavy elevation */
```

### Animations
- `animate-shimmer` - Loading shimmer effect
- `animate-pulse-down` - Scroll indicator
- `animate-fade-in` - Element fade in

## Development Patterns

### Component Structure
```tsx
// Use shadcn/ui components from @/components/ui/
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// Apply conditional styles with cn() utility
import { cn } from "@/lib/utils";

<Button className={cn("base-styles", isActive && "active-styles")} />
```

### Data Fetching Pattern
```tsx
// Custom hooks encapsulate Supabase queries with React Query
import { useInventorySegments } from "@/hooks/useInventorySegments";

function Component() {
  const { segments, isLoading, error, refresh } = useInventorySegments(30000);
  // Auto-refreshes every 30 seconds
}
```

### Icon Usage
```tsx
// Using Phosphor Icons (NOT Lucide)
import { ShoppingCart, ArrowRight, Check } from "@phosphor-icons/react";

<ShoppingCart size={24} weight="regular" />
<ArrowRight size={20} weight="bold" />
```

### SEO Pattern
```tsx
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>Page Title | Lead Slaps</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://leadslaps.com/page" />
</Helmet>
```

## TypeScript

### Supabase Types
Auto-generated types in `src/integrations/supabase/types.ts`:
```tsx
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type Customer = Tables<"customers">;
type NewOrder = TablesInsert<"orders">;
```

### Path Aliases
Configured in `vite.config.ts` and `tsconfig.json`:
```tsx
import { Component } from "@/components/Component";  // src/components/Component
import { supabase } from "@/integrations/supabase/client";
```

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Business Logic

### Product Types
1. **Direct Submissions** (`direct_submissions`) - Fresh MCA leads from direct applications
2. **Alpha Data** (`alpha_data`) - Processed and enriched lead data
3. **Pulse Data** (`pulse_data`) - Real-time lead intelligence

### Age Bands
| Key | Label | Description |
|-----|-------|-------------|
| `lt_15` | < 15 days | Fresh leads |
| `15_30` | 15-30 days | Recent leads |
| `30_90` | 30-90 days | Standard leads |
| `90_180` | 90-180 days | Aged leads |
| `180_365` | 180-365 days | Older leads |
| `1_2y` | 1-2 years | Vintage leads |

### Inventory Tracking
- Real-time availability from `inventory_segments`
- 7-day change tracking via `inventory_snapshots`
- Percentage change calculations for trend indicators

## Deployment Workflow

This project originates from **Lovable.dev**:

1. **Source of Truth**: Lovable.dev platform hosts the live site
2. **Local Development**: Clone repo for local development
3. **Push to Deploy**: Push to git triggers Lovable's automatic rebuild
4. **No Direct Lovable Edits**: All development happens locally

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app with routing and providers |
| `src/index.css` | Design system CSS variables |
| `src/integrations/supabase/client.ts` | Supabase client config |
| `src/integrations/supabase/types.ts` | Auto-generated DB types |
| `src/hooks/useInventorySegments.ts` | Example data fetching pattern |
| `tailwind.config.ts` | Tailwind + design tokens |
| `vite.config.ts` | Build config with @ alias |
| `components.json` | shadcn/ui configuration |

## Agent Delegation Model

When working on this codebase with Claude Code:

- **Coordinator Role**: Claude Code (main conversation) handles planning, decisions, and user communication
- **Execution Role**: Sub-agents handle coding, file creation, and modification
- **Quality Gate**: If existing code is fundamentally broken, prefer clean rewrites over patching bad foundations

## Code Quality Guidelines

1. **Prefer editing over creating**: Edit existing files rather than creating new ones
2. **Follow existing patterns**: Match the established component and hook structures
3. **Use Phosphor Icons**: Not Lucide - check existing components for icon usage patterns
4. **Apply design tokens**: Use CSS variables via Tailwind classes, not raw colors
5. **Type everything**: Leverage the auto-generated Supabase types
6. **Keep pages simple**: Pages should compose components, not contain complex logic

## Notes

- Real-time capabilities available via Supabase subscriptions (not currently implemented)
- Blog content is static Markdown in `public/blog-content/`
- Stripe integration for payments (managed server-side)
- Square integration for POS (via `square_variation_id`)
