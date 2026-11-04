-- Ejecuta esto en el SQL Editor de tu proyecto Supabase.
create table if not exists public.workspaces (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.workspaces enable row level security;
revoke all on table public.workspaces from public, anon;
grant select, insert, update, delete on public.workspaces to authenticated;

drop policy if exists "Users access only their own writing workspace" on public.workspaces;
create policy "Users access only their own writing workspace"
  on public.workspaces for all to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
