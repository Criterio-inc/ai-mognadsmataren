'use client';

import { motion } from 'framer-motion';
import type { ScopeDimension } from '@/lib/scopes';

interface DimensionBarsProps {
  scores: Record<string, number>;
  locale: 'sv' | 'en';
  dimensions: ScopeDimension[];
  notApplicableCounts?: Record<string, number>;
}

const barColors = [
  'from-amber-500 to-amber-700',
  'from-orange-400 to-orange-600',
  'from-yellow-500 to-yellow-700',
  'from-lime-500 to-lime-700',
  'from-rose-400 to-rose-600',
  'from-amber-600 to-amber-800',
  'from-emerald-500 to-emerald-700',
  'from-violet-400 to-violet-600',
];

export function DimensionBars({ scores, locale, dimensions, notApplicableCounts }: DimensionBarsProps) {
  return (
    <div className="space-y-6">
      {dimensions.map((dim, index) => {
        const score = scores[dim.id] || 0;
        const percentage = (score / 5) * 100;
        const naCount = notApplicableCounts?.[dim.id] || 0;
        const questionsPerDim = dim.questionIds.length;
        const allNa = naCount === questionsPerDim && questionsPerDim > 0;

        return (
          <motion.div
            key={dim.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Header */}
            <div className="flex justify-between items-baseline mb-2">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  {dim[locale].name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {dim[locale].description}
                </p>
              </div>
              <div className="text-right">
                {allNa ? (
                  <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                    {locale === 'sv' ? 'Ej aktuellt' : 'N/A'}
                  </span>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {score.toFixed(1)}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">/5</span>
                  </>
                )}
              </div>
            </div>

            {/* Bar */}
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${allNa ? 'from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500' : barColors[index % barColors.length]} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: allNa ? '0%' : `${percentage}%` }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
              />
            </div>

            {/* Scale markers and "Ej aktuellt" indicator */}
            <div className="flex justify-between mt-1">
              <div className="flex gap-0 flex-1 justify-between">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`text-xs ${
                      score >= n
                        ? 'text-slate-600 dark:text-slate-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  >
                    {n}
                  </span>
                ))}
              </div>
              {naCount > 0 && !allNa && (
                <span className="text-xs text-slate-400 dark:text-slate-500 ml-2 whitespace-nowrap">
                  {locale === 'sv'
                    ? `${naCount} av ${questionsPerDim} ej aktuellt`
                    : `${naCount} of ${questionsPerDim} N/A`}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
