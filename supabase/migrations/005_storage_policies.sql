-- 005 · Storage (dosya deposu) izinleri
-- Önkoşul: Supabase panelinde "photos" adında, PRIVATE (herkese açık olmayan) bir
-- bucket oluşturulmuş olmalı. Aşağıdaki kurallar o bucket'a erişimi düzenler.
--
-- NOT (MVP): Bu kurallar şimdilik gevşek — giriş yapmış HER kullanıcı yükleyip
-- okuyabilir. Faz 3'te (yayın öncesi) sadece grup üyesine daraltılacak.

create policy "giriş yapanlar yükler"
on storage.objects for insert
to authenticated
with check (bucket_id = 'photos');

create policy "giriş yapanlar okur"
on storage.objects for select
to authenticated
using (bucket_id = 'photos');
