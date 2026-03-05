'use client';

import { motion } from 'framer-motion';
import { getScope } from '@/lib/scopes';
import type { ScopeQuestion } from '@/lib/scopes';
import { useAssessmentStore } from '@/lib/store';

interface QuestionCardProps {
  question: ScopeQuestion;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const scaleLabels = {
  sv: [
    'Instämmer inte alls',
    'Instämmer i låg grad',
    'Instämmer delvis',
    'Instämmer i hög grad',
    'Instämmer helt',
  ],
  en: [
    'Strongly disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly agree',
  ],
};

const notApplicableLabel = {
  sv: 'Ej aktuellt',
  en: 'Not applicable',
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: QuestionCardProps) {
  const { responses, setResponse, locale, scopeId } = useAssessmentStore();
  const currentValue = responses[question.id];
  const scope = getScope(scopeId);
  const dimension = scope.dimensions.find((d) => d.id === question.dimension);

  const handleSelect = (value: number) => {
    setResponse(question.id, value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Dimension badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
          {dimension?.[locale].name}
        </span>
      </div>

      {/* Question counter */}
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
        {locale === 'sv' ? 'Fråga' : 'Question'} {questionNumber} {locale === 'sv' ? 'av' : 'of'} {totalQuestions}
      </div>

      {/* Question text */}
      <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-8">
        {question[locale]}
      </h2>

      {/* Rating scale */}
      <div className="space-y-3 mb-8">
        {[1, 2, 3, 4, 5].map((value) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(value)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              currentValue === value
                ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/30'
                : 'border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentValue === value
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {value}
              </div>
              <span
                className={`text-sm md:text-base ${
                  currentValue === value
                    ? 'text-teal-800 dark:text-teal-300 font-medium'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {scaleLabels[locale][value - 1]}
              </span>
            </div>
          </motion.button>
        ))}

        {/* Not applicable option */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(0)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              currentValue === 0
                ? 'border-slate-500 bg-slate-100 dark:bg-slate-700/50'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentValue === 0
                    ? 'bg-slate-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                –
              </div>
              <span
                className={`text-sm md:text-base ${
                  currentValue === 0
                    ? 'text-slate-700 dark:text-slate-200 font-medium'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {notApplicableLabel[locale]}
              </span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isFirst
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          {locale === 'sv' ? '← Föregående' : '← Previous'}
        </button>

        <button
          onClick={onNext}
          disabled={currentValue == null}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            currentValue == null
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800'
              : 'bg-primary text-white hover:opacity-90'
          }`}
        >
          {isLast
            ? locale === 'sv'
              ? 'Se resultat →'
              : 'View results →'
            : locale === 'sv'
              ? 'Nästa →'
              : 'Next →'}
        </button>
      </div>
    </motion.div>
  );
}
