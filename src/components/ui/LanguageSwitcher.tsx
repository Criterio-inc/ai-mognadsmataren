'use client';

import { useAssessmentStore } from '@/lib/store';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useAssessmentStore();

  return (
    <button
      onClick={() => setLocale(locale === 'sv' ? 'en' : 'sv')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      title={locale === 'sv' ? 'Switch to English' : 'Byt till svenska'}
    >
      <Globe className="w-4 h-4 text-slate-600 dark:text-slate-400" />
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {locale === 'sv' ? 'EN' : 'SV'}
      </span>
    </button>
  );
}
