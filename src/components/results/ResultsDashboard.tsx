'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore, useResultsStore } from '@/lib/store';
import { getScope } from '@/lib/scopes';
import { MaturityGauge } from '../visualization/MaturityGauge';
import { RadarChart } from '../visualization/RadarChart';
import { MaturitySteps } from '../visualization/MaturitySteps';
import { DimensionBars } from '../visualization/DimensionBars';
import { AIInsightsCard } from './AIInsightsCard';
import { Download, RefreshCw, Share2 } from 'lucide-react';

interface ResultsDashboardProps {
  onReset: () => void;
}

export function ResultsDashboard({ onReset }: ResultsDashboardProps) {
  const { locale, scopeId, getResponsesMap } = useAssessmentStore();
  const { dimensionScores, overallScore, maturityLevel, notApplicableCounts, aiInsights, isLoading, setAiInsights, setIsLoading } = useResultsStore();

  const scope = useMemo(() => getScope(scopeId), [scopeId]);

  // Fetch AI insights on mount
  useEffect(() => {
    if (!dimensionScores || !overallScore || !maturityLevel || aiInsights) return;

    const fetchInsights = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dimensionScores,
            overallScore,
            maturityLevel,
            locale,
            scopeId,
            notApplicableCounts,
          }),
        });

        if (response.ok) {
          const insights = await response.json();
          setAiInsights(insights);
        }
      } catch (error) {
        console.error('Failed to fetch AI insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, [dimensionScores, overallScore, maturityLevel, locale, scopeId, aiInsights, setAiInsights, setIsLoading]);

  if (!dimensionScores || !overallScore || !maturityLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">
          {locale === 'sv' ? 'Laddar resultat...' : 'Loading results...'}
        </p>
      </div>
    );
  }

  const scopeName = scope.name[locale];
  const dimCount = scope.dimensions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30 dark:from-slate-900 dark:to-slate-900 pt-4 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {locale === 'sv' ? `Ert mognadsresultat` : `Your maturity results`}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {locale === 'sv'
              ? `${scopeName} – bedömning baserad på ${dimCount} strategiska dimensioner`
              : `${scopeName} – assessment based on ${dimCount} strategic dimensions`}
          </p>
        </motion.div>

        {/* Main gauge and radar */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Gauge card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
              {locale === 'sv' ? 'Övergripande mognadsnivå' : 'Overall maturity level'}
            </h2>
            <MaturityGauge score={overallScore} locale={locale} maturityLevels={scope.maturityLevels} />
          </motion.div>

          {/* Radar card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
              {locale === 'sv' ? 'Dimensionsanalys' : 'Dimension analysis'}
            </h2>
            <div className="flex justify-center">
              <RadarChart scores={dimensionScores} locale={locale} dimensions={scope.dimensions} />
            </div>
          </motion.div>
        </div>

        {/* Maturity steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 mb-12"
        >
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 text-center">
            {locale === 'sv' ? 'Mognadsresan' : 'Maturity journey'}
          </h2>
          <MaturitySteps currentLevel={maturityLevel} locale={locale} maturityLevels={scope.maturityLevels} />
        </motion.div>

        {/* Dimension details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 mb-12"
        >
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            {locale === 'sv' ? 'Dimensioner i detalj' : 'Dimensions in detail'}
          </h2>
          <DimensionBars scores={dimensionScores} locale={locale} dimensions={scope.dimensions} notApplicableCounts={notApplicableCounts || undefined} />
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <AIInsightsCard
            insights={aiInsights}
            isLoading={isLoading}
            locale={locale}
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            {locale === 'sv' ? 'Gör om bedömningen' : 'Retake assessment'}
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-colors"
            onClick={() => {
              alert(locale === 'sv' ? 'PDF-export kommer snart!' : 'PDF export coming soon!');
            }}
          >
            <Download className="w-5 h-5" />
            {locale === 'sv' ? 'Ladda ner rapport' : 'Download report'}
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => {
              alert(locale === 'sv' ? 'Delningsfunktion kommer snart!' : 'Sharing coming soon!');
            }}
          >
            <Share2 className="w-5 h-5" />
            {locale === 'sv' ? 'Dela med teamet' : 'Share with team'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
