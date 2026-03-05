'use client';

import { useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getScope, calculateAllDimensionScores, calculateOverallScore, getMaturityLevel } from '@/lib/scopes';
import { useAssessmentStore, useResultsStore } from '@/lib/store';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';

interface AssessmentProps {
  onComplete: () => void;
}

export function Assessment({ onComplete }: AssessmentProps) {
  const { currentQuestionIndex, setCurrentQuestionIndex, getResponsesMap, locale, scopeId } = useAssessmentStore();
  const { setResults, setIsLoading } = useResultsStore();

  const scope = useMemo(() => getScope(scopeId), [scopeId]);
  const questions = scope.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = useCallback(async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete - calculate results
      setIsLoading(true);

      const responsesMap = getResponsesMap();

      // Calculate dimension scores using scope config
      const dimensionScores = calculateAllDimensionScores(responsesMap, scope);

      // Count "Ej aktuellt" (value 0) responses per dimension
      const notApplicableCounts: Record<string, number> = {};
      for (const dim of scope.dimensions) {
        const dimQuestions = scope.questions.filter((q) => q.dimension === dim.id);
        notApplicableCounts[dim.id] = dimQuestions
          .map((q) => responsesMap.get(q.id))
          .filter((v) => v === 0)
          .length;
      }

      // Calculate overall score and maturity level
      const overallScore = calculateOverallScore(responsesMap);
      const maturityLevel = getMaturityLevel(scope.maturityLevels, overallScore).level;

      setResults(dimensionScores, overallScore, maturityLevel, notApplicableCounts);
      onComplete();
    }
  }, [currentQuestionIndex, setCurrentQuestionIndex, getResponsesMap, setResults, setIsLoading, onComplete, questions, scope]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex, setCurrentQuestionIndex]);

  const scopeName = scope.name[locale];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-orange-50 dark:from-stone-900 dark:to-stone-900/20 pt-4 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-2">
            {scopeName}
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            {locale === 'sv'
              ? `Svara på frågorna för att bedöma er mognad`
              : `Answer the questions to assess your maturity`}
          </p>
        </div>

        {/* Progress */}
        <ProgressBar />

        {/* Question */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === questions.length - 1}
            />
          </AnimatePresence>
        </div>

        {/* Tips */}
        <div className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
          <p>
            {locale === 'sv'
              ? 'Tips: Svara utifrån hur det faktiskt ser ut idag, inte hur ni vill att det ska vara'
              : 'Tip: Answer based on how things actually are today, not how you want them to be'}
          </p>
        </div>
      </div>
    </div>
  );
}
