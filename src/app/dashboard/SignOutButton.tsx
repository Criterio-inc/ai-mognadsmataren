'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { signOut } from '@/lib/supabase';

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
      title="Logga ut"
    >
      <LogOut className="w-5 h-5" />
    </button>
  );
}
