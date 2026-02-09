'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { dimensions } from '@/lib/questions';

export function ProgressBar() {
  const { responses, locale } = useAssessmentStore();
  const answeredCount = Object.keys(responses).length;
  const progress = (answeredCount / 32) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Overall progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400 mb-2">
          <span>
            {locale === 'sv' ? 'Framsteg' : 'Progress'}
          </span>
          <span>{answeredCount}/32</span>
        </div>
        <div className="h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
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
                      ? 'bg-amber-500'
                      : 'bg-stone-300 dark:bg-stone-600'
                }`}
                style={{
                  background: !isComplete && dimProgress > 0
                    ? `linear-gradient(to right, #d97706 ${dimProgress}%, #d6d3d1 ${dimProgress}%)`
                    : undefined,
                }}
              />
              <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 truncate text-center">
                {dim[locale].name.split(' ')[0]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
