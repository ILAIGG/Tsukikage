import type { SupabaseClient } from '@supabase/supabase-js';
import type { Workspace } from './model';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
const loadClient=url&&key?()=>import('@supabase/supabase-js'):null;
export const syncConfigured=!!loadClient;
let client:Promise<SupabaseClient>|undefined;
function getClient(){
  if(!loadClient)return Promise.resolve(null);
  if(!client)client=loadClient().then(({createClient})=>createClient(url,key)).catch(error=>{client=undefined;throw error});
  return client;
}

export async function sendSignInCode(email: string) {
  const supabase=await getClient();
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
  if (error) throw error;
}
export async function confirmSignInCode(email: string, token: string) {
  const supabase=await getClient();
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
  if (error) throw error;
  return data.user;
}
export async function activeUser() {
  try {
    const supabase=await getClient();if(!supabase)return null;
    const {data,error}=await supabase.auth.getUser();
    return error?null:data.user;
  } catch { return null; }
}
export async function signOut() { const supabase=await getClient();if (supabase) await supabase.auth.signOut(); }
export async function uploadWorkspace(workspace: Workspace) {
  const supabase=await getClient();
  if (!supabase) throw new Error('Supabase no está configurado.');
  const user = await activeUser(); if (!user) throw new Error('Inicia sesión primero.');
  const { error } = await supabase.from('workspaces').upsert({ user_id: user.id, payload: workspace, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) throw error;
}
export async function downloadWorkspace(): Promise<Workspace | null> {
  const supabase=await getClient();
  if (!supabase) throw new Error('Supabase no está configurado.');
  const user = await activeUser(); if (!user) throw new Error('Inicia sesión primero.');
  const { data, error } = await supabase.from('workspaces').select('payload').eq('user_id', user.id).maybeSingle();
  if (error) throw error;
  return (data?.payload as Workspace | undefined) || null;
}
