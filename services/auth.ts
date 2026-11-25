// Kimlik (auth) işlemleri — ekranlar Supabase ile doğrudan değil, bu katman üzerinden konuşur.
import { supabase } from '../lib/supabase';

export function signUp(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

export function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
