-- 002 · Gruplar için güvenlik kuralları (Row Level Security)
-- Herkes sadece kendi üyesi olduğu gruplara / kendi üyeliklerine erişebilir.

alter table groups enable row level security;
alter table group_members enable row level security;

-- GRUPLAR: kullanıcı, üyesi olduğu grupları görebilir
create policy "üyeler grubu görür"
on groups for select
using (
  exists (
    select 1 from group_members
    where group_members.group_id = groups.id
      and group_members.user_id = auth.uid()
  )
);

-- GRUPLAR: giriş yapmış kullanıcı kendi adına yeni grup oluşturabilir
create policy "kullanıcı grup oluşturur"
on groups for insert
with check (created_by = auth.uid());

-- GRUP ÜYELERİ: kullanıcı kendi üyelik kayıtlarını görebilir
create policy "kendi üyeliğini görür"
on group_members for select
using (user_id = auth.uid());

-- GRUP ÜYELERİ: kullanıcı kendini bir gruba ekleyebilir
create policy "kendini gruba ekler"
on group_members for insert
with check (user_id = auth.uid());
