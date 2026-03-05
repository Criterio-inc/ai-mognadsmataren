'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { getScope } from '@/lib/scopes';

export function ProgressBar() {
  const { responses, locale, scopeId } = useAssessmentStore();
  const scope = useMemo(() => getScope(scopeId), [scopeId]);
  const dimensions = scope.dimensions;
  const totalQuestions = scope.questionCount;

  const answeredCount = Object.keys(responses).length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Overall progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
          <span>
            {locale === 'sv' ? 'Framsteg' : 'Progress'}
          </span>
          <span>{answeredCount}/{totalQuestions}</span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Dimension progress indicators */}
      <div className="flex gap-1">
        {dimensions.map((dim) => {
          const answeredInDim = dim.questionIds.filter(
            (id) => responses[id] !== undefined
          ).length;
          const dimProgress = (answeredInDim / dim.questionIds.length) * 100;
          const isComplete = dimProgress === 100;

          return (
            <div
              key={dim.id}
              className="flex-1"
              title={dim[locale].name}
            >
              <div
                className={`h-1.5 rounded-full transition-all ${
                  isComplete
                    ? 'bg-green-500'
                    : dimProgress > 0
                      ? 'bg-teal-500'
                      : 'bg-slate-300 dark:bg-slate-600'
                }`}
                style={{
                  background: !isComplete && dimProgress > 0
                    ? `linear-gradient(to right, #0d9488 ${dimProgress}%, #cbd5e1 ${dimProgress}%)`
                    : undefined,
                }}
              />
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate text-center">
                {dim[locale].name.split(' ')[0]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
