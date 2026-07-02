create extension if not exists pgcrypto;
create table if not exists public.prompts(id uuid primary key default gen_random_uuid(),user_id uuid,title text not null,model text,folder text,category text,tags text[] default '{}',content text not null,note text,favorite boolean default false,popularity integer default 0,version integer default 1,history jsonb default '[]'::jsonb,created_at timestamptz default now(),updated_at timestamptz default now());
alter table public.prompts enable row level security;
