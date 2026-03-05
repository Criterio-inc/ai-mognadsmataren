import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScopeId } from './scopes';

interface AssessmentState {
  responses: Record<number, number>;
  currentQuestionIndex: number;
  locale: 'sv' | 'en';
  scopeId: ScopeId;
  setResponse: (questionId: number, value: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setLocale: (locale: 'sv' | 'en') => void;
  setScopeId: (scopeId: ScopeId) => void;
  reset: () => void;
  getResponsesMap: () => Map<number, number>;
  isComplete: (totalQuestions: number) => boolean;
  getProgress: (totalQuestions: number) => number;
}

const initialState = {
  responses: {},
  currentQuestionIndex: 0,
  locale: 'sv' as const,
  scopeId: 'ai' as ScopeId,
};

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setResponse: (questionId, value) =>
        set((state) => ({
          responses: { ...state.responses, [questionId]: value },
        })),
      setCurrentQuestionIndex: (index) =>
        set({ currentQuestionIndex: index }),
      setLocale: (locale) => set({ locale }),
      setScopeId: (scopeId) => set({ scopeId, responses: {}, currentQuestionIndex: 0 }),
      reset: () => set(initialState),
      getResponsesMap: () => new Map(Object.entries(get().responses).map(
        ([k, v]) => [parseInt(k), v]
      )),
      isComplete: (totalQuestions) => Object.keys(get().responses).length === totalQuestions,
      getProgress: (totalQuestions) => (Object.keys(get().responses).length / totalQuestions) * 100,
    }),
    {
      name: 'maturity-assessment',
      partialize: (state) => ({
        responses: state.responses,
        currentQuestionIndex: state.currentQuestionIndex,
        locale: state.locale,
        scopeId: state.scopeId,
      }),
    }
  )
);

// Results store
interface ResultsState {
  dimensionScores: Record<string, number> | null;
  overallScore: number | null;
  maturityLevel: number | null;
  notApplicableCounts: Record<string, number> | null;
  aiInsights: {
    summary: string;
    strengths: string[];
    improvements: string[];
    recommendations: string[];
    nextSteps: string[];
  } | null;
  isLoading: boolean;
  setResults: (dimensionScores: Record<string, number>, overallScore: number, maturityLevel: number, notApplicableCounts?: Record<string, number>) => void;
  setAiInsights: (insights: ResultsState['aiInsights']) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useResultsStore = create<ResultsState>((set) => ({
  dimensionScores: null,
  overallScore: null,
  maturityLevel: null,
  notApplicableCounts: null,
  aiInsights: null,
  isLoading: false,
  setResults: (dimensionScores, overallScore, maturityLevel, notApplicableCounts) =>
    set({ dimensionScores, overallScore, maturityLevel, notApplicableCounts: notApplicableCounts || null }),
  setAiInsights: (aiInsights) => set({ aiInsights }),
  setIsLoading: (isLoading) => set({ isLoading }),
  reset: () =>
    set({
      dimensionScores: null,
      overallScore: null,
      maturityLevel: null,
      notApplicableCounts: null,
      aiInsights: null,
      isLoading: false,
    }),
}));
