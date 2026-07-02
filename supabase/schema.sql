create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  role text default 'user',
  created_at timestamptz default now()
);

create table if not exists public.prompt_folders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  model text default 'ChatGPT',
  folder text default '默认文件夹',
  category text default '未分类',
  tags text[] default '{}',
  content text not null,
  note text,
  image_url text,
  favorite boolean default false,
  popularity integer default 0,
  version integer default 1,
  history jsonb default '[]'::jsonb,
  is_public boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.prompt_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  prompt_id uuid references public.prompts(id) on delete cascade,
  action text not null,
  created_at timestamptz default now()
);

create index if not exists prompts_user_idx on public.prompts(user_id);
create index if not exists prompts_tags_idx on public.prompts using gin(tags);
create index if not exists prompts_search_idx on public.prompts using gin(
  to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(content,'') || ' ' || coalesce(category,'') || ' ' || coalesce(folder,''))
);

alter table public.profiles enable row level security;
alter table public.prompt_folders enable row level security;
alter table public.prompts enable row level security;
alter table public.prompt_usage_logs enable row level security;

create policy "profiles own select" on public.profiles for select using (auth.uid() = id);
create policy "profiles own insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles own update" on public.profiles for update using (auth.uid() = id);

create policy "folders own all" on public.prompt_folders for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "prompts own all" on public.prompts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "usage own all" on public.prompt_usage_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists prompts_updated_at on public.prompts;
create trigger prompts_updated_at
before update on public.prompts
for each row execute function public.update_updated_at();

-- 可选：Storage 创建 bucket
-- 在 Supabase Storage 中创建 bucket：prompt-images
