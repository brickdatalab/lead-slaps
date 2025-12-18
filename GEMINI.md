# Lead Slaps - Merchant Cash Advance (MCA) Lead Marketplace

## Project Overview
Lead Slaps is a marketplace platform for selling Merchant Cash Advance (MCA) leads. It provides a storefront for purchasing leads across three product tiers (Direct Submissions, Alpha Data, Pulse Data) and six age bands. The application tracks inventory in real-time and integrates with Stripe for payments.

**Origin:** This project was originally scaffolded using [Lovable.dev](https://lovable.dev).

## Technology Stack

*   **Frontend:** React 18, TypeScript, Vite 5
*   **Styling:** Tailwind CSS, shadcn/ui, Lucide React icons
*   **State Management:** TanStack Query (React Query)
*   **Routing:** React Router DOM 6
*   **Backend / Database:** Supabase (PostgreSQL, Auth, Edge Functions)
*   **Payments:** Stripe (Checkout, Webhooks)
*   **Deployment:** Netlify (implied by `public/_headers`) or similar static hosting.

## Development & Usage

### Key Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local development server (usually port 8080) |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code quality issues |

### Environment Variables

The application requires the following environment variables (typically in `.env`):

*   `VITE_SUPABASE_URL`: Your Supabase project URL.
*   `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase Anon Key.
*   `SUPABASE_SERVICE_ROLE_KEY`: (Backend/Edge Functions only) For administrative tasks.
*   `STRIPE_SECRET_KEY`: (Backend/Edge Functions only) For Stripe operations.
*   `STRIPE_PUBLISHABLE_KEY`: (Frontend) For Stripe Elements/Checkout.

## Architecture

### Directory Structure

*   **`src/components/`**: React components. `ui/` contains reusable shadcn/ui components. `products/` contains domain-specific components like `InventoryDashboard` and `OrderConfigurator`.
*   **`src/pages/`**: Application routes (e.g., `Index.tsx`, `Products.tsx`, `BuildDataSet.tsx`).
*   **`src/hooks/`**: Custom hooks, largely for data fetching (e.g., `useInventorySegments.ts`).
*   **`src/integrations/supabase/`**: Supabase client configuration and auto-generated TypeScript types.
*   **`src/config/`**: Configuration files, including `stripePriceMap.ts` which maps products to Stripe Price IDs.
*   **`supabase/`**: Supabase configuration (`config.toml`), migrations, and Edge Functions (`create-checkout-session`).
*   **`public/blog-content/`**: Markdown files for the blog.

### Database (Supabase)

Key tables in the schema:

*   **`inventory_segments`**: Real-time inventory tracking by product and age band.
*   **`products` / `prices`**: Mirrored from Stripe (intended sync).
*   **`orders` / `order_items`**: Transaction records.
*   **`customers`**: Customer profiles.

### Business Logic

*   **Products:**
    1.  **Direct Submissions** (Premium, < 30 days)
    2.  **Alpha Data** (Growth, 30 days - 6 months)
    3.  **Pulse Data** (Scale, 6 months - 2 years)
*   **Age Bands:** `lt_15`, `15_30`, `30_90`, `90_180`, `180_365`, `1_2y`.
*   **Pricing:** Defined per product/age-band combination (refer to `STRIPE_CATALOG.md`).

## Development Conventions

*   **Styling:** Use Tailwind CSS utility classes. The design system relies on HSL CSS variables (defined in `src/index.css`).
*   **Components:** Prefer creating small, focused components. Use `shadcn/ui` primitives for UI elements.
*   **Data Fetching:** Encapsulate Supabase queries within custom React Query hooks (e.g., `useInventorySegments`).
*   **Type Safety:** Strictly use TypeScript. Use the generated Supabase types from `src/integrations/supabase/types.ts`.
*   **Forms:** Use `react-hook-form` combined with `zod` for schema validation.

## Important Reference Files

*   **`CLAUDE.md`**: Contains detailed context about the project history, architecture, and specific implementation details.
*   **`STRIPE_CATALOG.md`**: Comprehensive documentation on the Stripe product catalog, pricing strategy, and database schema for the marketplace.
