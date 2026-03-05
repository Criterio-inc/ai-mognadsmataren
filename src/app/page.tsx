'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogIn, Home as HomeIcon } from 'lucide-react';
import { LandingPage } from '@/components/landing/LandingPage';
import { Assessment } from '@/components/assessment/Assessment';
import { ResultsDashboard } from '@/components/results/ResultsDashboard';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAssessmentStore, useResultsStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';
import type { ScopeId } from '@/lib/scopes';

type View = 'landing' | 'assessment' | 'results';

export default function Home() {
  const [view, setView] = useState<View>('landing');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useAssessmentStore((state) => state.locale);
  const resetAssessment = useAssessmentStore((state) => state.reset);
  const setScopeId = useAssessmentStore((state) => state.setScopeId);
  const resetResults = useResultsStore((state) => state.reset);
  const tCommon = getTranslations('common', locale);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll for header transparency on landing
  useEffect(() => {
    if (view !== 'landing') return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const handleStartAssessment = (scopeId: ScopeId) => {
    resetAssessment();
    resetResults();
    setScopeId(scopeId);
    setView('assessment');
    window.scrollTo(0, 0);
  };

  const handleAssessmentComplete = () => {
    setView('results');
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    resetAssessment();
    resetResults();
    setView('landing');
    window.scrollTo(0, 0);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{tCommon.loading}</div>
      </div>
    );
  }

  const isLanding = view === 'landing';
  const headerBg = isLanding
    ? scrolled
      ? 'bg-slate-900/90 backdrop-blur-md border-b border-white/10'
      : 'bg-transparent'
    : 'bg-background/80 backdrop-blur-sm border-b border-border/50';

  return (
    <main className="relative">
      {/* Fixed header bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between transition-all duration-300 ${headerBg}`}>
        {/* Left side */}
        <div className="flex items-center gap-2">
          {view === 'assessment' || view === 'results' ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
              {locale === 'sv' ? 'Startsida' : 'Home'}
            </button>
          ) : (
            <Link
              href="/login"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                isLanding
                  ? 'text-slate-300 hover:text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LogIn className="w-4 h-4" />
              {tCommon.consultant}
            </Link>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {!isLanding && <ThemeToggle />}
        </div>
      </header>

      {/* Views */}
      <div className={isLanding ? '' : 'pt-14'}>
        {view === 'landing' && <LandingPage onStart={handleStartAssessment} />}
        {view === 'assessment' && <Assessment onComplete={handleAssessmentComplete} />}
        {view === 'results' && <ResultsDashboard onReset={handleReset} />}
      </div>
    </main>
  );
}
