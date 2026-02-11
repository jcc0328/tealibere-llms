-- PrivacyWidget.io schema for Supabase/PostgreSQL
-- Includes Row Level Security (RLS) policies for per-tenant isolation.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  subscription_status text not null default 'inactive' check (subscription_status in ('inactive', 'trialing', 'active', 'past_due', 'canceled')),
  stripe_customer_id text unique,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  domain_url text not null,
  script_key text not null unique,
  settings_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.opt_out_requests (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  consumer_email text not null,
  request_type text not null default 'opt_out_admt',
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default timezone('utc', now()),
  status text not null default 'pending' check (status in ('pending', 'archived'))
);

-- Optional compatibility view for specs that refer to `requests`.
create or replace view public.requests as
  select id, site_id, consumer_email, request_type, ip_address::text as ip_address, user_agent, created_at, status
  from public.opt_out_requests;

alter table public.profiles enable row level security;
alter table public.sites enable row level security;
alter table public.opt_out_requests enable row level security;

-- Profiles: user can read/update only their own record.
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Sites: only owner can manage sites.
create policy "sites_select_own"
  on public.sites for select
  using (auth.uid() = user_id);

create policy "sites_insert_own"
  on public.sites for insert
  with check (auth.uid() = user_id);

create policy "sites_update_own"
  on public.sites for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "sites_delete_own"
  on public.sites for delete
  using (auth.uid() = user_id);

-- Opt-out requests: users can only access requests belonging to their own sites.
create policy "requests_select_own_sites"
  on public.opt_out_requests for select
  using (
    exists (
      select 1
      from public.sites s
      where s.id = opt_out_requests.site_id and s.user_id = auth.uid()
    )
  );

create policy "requests_update_own_sites"
  on public.opt_out_requests for update
  using (
    exists (
      select 1
      from public.sites s
      where s.id = opt_out_requests.site_id and s.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.sites s
      where s.id = opt_out_requests.site_id and s.user_id = auth.uid()
    )
  );

-- Public widget insert policy:
-- Allows unauthenticated users to create requests ONLY for valid sites.
create policy "requests_insert_from_widget"
  on public.opt_out_requests for insert
  to anon, authenticated
  with check (
    exists (
      select 1
      from public.sites s
      join public.profiles p on p.id = s.user_id
      where s.id = opt_out_requests.site_id and p.subscription_status in ('trialing', 'active')
    )
  );
