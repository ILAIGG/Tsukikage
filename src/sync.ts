import { createClient } from '@supabase/supabase-js';
import type { Workspace } from './model';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
export const syncConfigured = Boolean(url && key);
const supabase = syncConfigured ? createClient(url, key) : null;

export async function sendSignInCode(email: string) {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
  if (error) throw error;
}
export async function confirmSignInCode(email: string, token: string) {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
  if (error) throw error;
  return data.user;
}
export async function activeUser() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}
export async function signOut() { if (supabase) await supabase.auth.signOut(); }
export async function uploadWorkspace(workspace: Workspace) {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const user = await activeUser(); if (!user) throw new Error('Inicia sesión primero.');
  const { error } = await supabase.from('workspaces').upsert({ user_id: user.id, payload: workspace, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) throw error;
}
export async function downloadWorkspace(): Promise<Workspace | null> {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const user = await activeUser(); if (!user) throw new Error('Inicia sesión primero.');
  const { data, error } = await supabase.from('workspaces').select('payload').eq('user_id', user.id).maybeSingle();
  if (error) throw error;
  return (data?.payload as Workspace | undefined) || null;
}
