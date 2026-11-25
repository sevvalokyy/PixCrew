-- 003 · Fotoğraflar
-- Fotoğraf dosyasının kendisi Storage'da durur; bu tablo yalnızca o dosyanın
-- nerede olduğunu (storage_path) ve bilgilerini tutar.

create table photos (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade not null,
  uploader_id uuid references auth.users(id) not null,  -- "kendi yüklediklerim" filtresi için şart
  storage_path text not null,                            -- dosyanın Storage'daki yolu
  created_at timestamptz default now()
);
