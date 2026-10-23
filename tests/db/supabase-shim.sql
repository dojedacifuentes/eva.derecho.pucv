-- Réplica mínima de lo que Supabase trae antes de nuestras migraciones, para probarlas con PGlite.
-- No va a producción: en Supabase esto ya existe.

create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;

create schema auth;
grant usage on schema auth to anon, authenticated, service_role;

create table auth.users (
  id uuid primary key,
  email text unique,
  raw_user_meta_data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Igual que en Supabase: el usuario es el «sub» del JWT que PostgREST deja en request.jwt.claims.
create function auth.uid() returns uuid
language sql stable
as $$
  select nullif(
    coalesce(current_setting('request.jwt.claim.sub', true), (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')),
    ''
  )::uuid;
$$;
grant execute on function auth.uid() to anon, authenticated, service_role;

-- Supabase concede por defecto todo sobre public a estos roles; nuestras migraciones lo recortan.
grant usage on schema public to anon, authenticated, service_role;
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
