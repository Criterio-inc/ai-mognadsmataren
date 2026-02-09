'use client';

import { useAssessmentStore } from '@/lib/store';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useAssessmentStore();

  return (
    <button
      onClick={() => setLocale(locale === 'sv' ? 'en' : 'sv')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
      title={locale === 'sv' ? 'Switch to English' : 'Byt till svenska'}
    >
      <Globe className="w-4 h-4 text-stone-600 dark:text-stone-400" />
      <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
        {locale === 'sv' ? 'EN' : 'SV'}
      </span>
    </button>
  );
}
