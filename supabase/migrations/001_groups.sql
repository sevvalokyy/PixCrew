-- 001 · Gruplar ve grup üyeleri
-- "Ortak alan"ın temeli: bir grup ve o gruba kimlerin üye olduğu.

create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid references auth.users(id) not null,
  created_at timestamptz default now()
);

create table group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade not null,
  user_id uuid references auth.users(id) not null,
  joined_at timestamptz default now(),
  unique (group_id, user_id)  -- aynı kişi aynı gruba iki kez eklenemez
);
