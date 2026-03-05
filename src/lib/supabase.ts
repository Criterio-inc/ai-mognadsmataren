import { createBrowserClient } from '@supabase/ssr';

let _supabase: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Supabase URL and anon key must be set in environment variables');
    }
    _supabase = createBrowserClient(url, key);
  }
  return _supabase;
}

// Lazy proxy so module can be imported without env vars being set (build-time)
export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient>, {
  get(_target, prop) {
    return (getSupabaseClient() as Record<string | symbol, unknown>)[prop];
  },
});

// Allowed email domains for consultants
const ALLOWED_DOMAINS = ['curago.se', 'criteroconsulting.se'];

// Check if email is from allowed domain
export function isEmailAllowed(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return ALLOWED_DOMAINS.includes(domain);
}

// Sign up with email and password
export async function signUp(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  if (!isEmailAllowed(email)) {
    return {
      success: false,
      error: `Endast e-postadresser med @curago.se eller @criteroconsulting.se kan registrera sig.`,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password: password,
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return {
        success: false,
        error: 'Denna e-postadress är redan registrerad. Försök logga in istället.',
      };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Sign in with email and password
export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  if (!isEmailAllowed(email)) {
    return {
      success: false,
      error: `Endast e-postadresser med @curago.se eller @criteroconsulting.se kan logga in.`,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password: password,
  });

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { success: false, error: 'Fel e-postadress eller lösenord.' };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Get current user
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Sign out
export async function signOut() {
  await supabase.auth.signOut();
}
