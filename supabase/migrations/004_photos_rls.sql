-- 004 · Fotoğraflar için güvenlik kuralları
-- Sadece grup üyeleri o grubun fotoğraflarını görebilir ve kendi adına ekleyebilir.

alter table photos enable row level security;

-- Grup üyeleri o grubun fotoğraf kayıtlarını görebilir
create policy "üyeler fotoğrafları görür"
on photos for select
using (
  exists (
    select 1 from group_members
    where group_members.group_id = photos.group_id
      and group_members.user_id = auth.uid()
  )
);

-- Grup üyesi, kendi adına fotoğraf ekleyebilir
create policy "üye fotoğraf ekler"
on photos for insert
with check (
  uploader_id = auth.uid()
  and exists (
    select 1 from group_members
    where group_members.group_id = photos.group_id
      and group_members.user_id = auth.uid()
  )
);
