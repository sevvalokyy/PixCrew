// Grup işlemleri — grup oluşturma ve kullanıcının gruplarını listeleme.
import { supabase } from '../lib/supabase';
import { getCurrentUser } from './auth';

export type Group = { id: string; name: string };

// Kullanıcının üyesi olduğu grupları getirir (RLS zaten sadece kendi gruplarını döndürür).
export async function listMyGroups(): Promise<Group[]> {
  const { data, error } = await supabase
    .from('groups')
    .select('id, name')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as Group[];
}

// Yeni grup oluşturur ve kullanıcıyı o gruba üye olarak ekler.
// Başarılıysa { error: null }, değilse { error: '<mesaj>' } döner.
export async function createGroup(name: string): Promise<{ error: string | null }> {
  const user = await getCurrentUser();
  if (!user) return { error: 'Oturum bulunamadı.' };

  // 1) Grubu oluştur
  const { data: group, error: groupError } = await supabase
    .from('groups')
    .insert({ name: name.trim(), created_by: user.id })
    .select()
    .single();

  if (groupError || !group) {
    return { error: groupError?.message ?? 'Grup oluşturulamadı.' };
  }

  // 2) Kendini gruba üye ekle
  const { error: memberError } = await supabase
    .from('group_members')
    .insert({ group_id: group.id, user_id: user.id });

  if (memberError) return { error: memberError.message };
  return { error: null };
}
