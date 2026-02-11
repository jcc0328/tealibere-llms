# PrivacyWidget.io Technical Architecture & Implementation Guide

## 1) End-to-end architecture
- **Frontend**: Next.js 14 App Router for landing page + authenticated dashboard.
- **Widget delivery**: `public/widget.js` served from Vercel CDN and embedded on customer sites.
- **Database/Auth**: Supabase (Postgres + Auth + RLS).
- **Payments**: Stripe Checkout, Webhooks, Customer Portal.
- **Deployment**: Vercel for app + API routes.

## 2) Core user flow
1. User signs up with Supabase Auth.
2. User starts paid plan via `/api/stripe/checkout`.
3. Stripe webhook updates `profiles.subscription_status`.
4. Dashboard shows script snippet with site id.
5. Customer embeds script on their website.
6. End-user submits opt-out request from widget.
7. `/api/widget/submit` validates origin + active subscription and stores request.

## 3) CORS model for external widget requests
Because widget runs on external domains, `app/api/widget/submit/route.ts` implements:
- `OPTIONS` preflight response with `Access-Control-Allow-*` headers.
- Runtime origin validation against `sites.domain_url`.
- Explicit `Vary: Origin` to preserve CDN correctness.
- Rejection if subscription not in `active/trialing`.

## 4) Environment variables
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`

## 5) Compliance notes
- Store IP + User-Agent for audit trail.
- Use status transitions (`pending` -> `archived`) as internal workflow.
- Keep widget copy transparent and legally reviewed.
