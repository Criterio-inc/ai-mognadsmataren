'use client';

import { motion } from 'framer-motion';
import { Question, getDimensionById } from '@/lib/questions';
import { useAssessmentStore } from '@/lib/store';

interface QuestionCardProps {
  question: Question;
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

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: QuestionCardProps) {
  const { responses, setResponse, locale } = useAssessmentStore();
  const currentValue = responses[question.id];
  const dimension = getDimensionById(question.dimension);

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
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
          {dimension?.[locale].name}
        </span>
      </div>

      {/* Question counter */}
      <div className="text-sm text-stone-500 dark:text-stone-400 mb-2">
        {locale === 'sv' ? 'Fråga' : 'Question'} {questionNumber} {locale === 'sv' ? 'av' : 'of'} {totalQuestions}
      </div>

      {/* Question text */}
      <h2 className="text-xl md:text-2xl font-semibold text-stone-900 dark:text-white mb-8">
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
                ? 'border-amber-600 bg-orange-50 dark:bg-orange-900/30'
                : 'border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentValue === value
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                }`}
              >
                {value}
              </div>
              <span
                className={`text-sm md:text-base ${
                  currentValue === value
                    ? 'text-amber-800 dark:text-amber-300 font-medium'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                {scaleLabels[locale][value - 1]}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isFirst
              ? 'bg-stone-100 text-stone-400 cursor-not-allowed dark:bg-stone-800'
              : 'bg-stone-200 text-stone-700 hover:bg-stone-300 dark:bg-stone-700 dark:text-stone-200 dark:hover:bg-stone-600'
          }`}
        >
          {locale === 'sv' ? '← Föregående' : '← Previous'}
        </button>

        <button
          onClick={onNext}
          disabled={currentValue === undefined}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            currentValue === undefined
              ? 'bg-stone-100 text-stone-400 cursor-not-allowed dark:bg-stone-800'
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
