// Shared types for all assessment scopes

export interface ScopeQuestion {
  id: number;
  dimension: string;
  sv: string;
  en: string;
}

export interface ScopeDimension {
  id: string;
  sv: {
    name: string;
    description: string;
  };
  en: {
    name: string;
    description: string;
  };
  questionIds: number[];
}

export interface ScopeMaturityLevel {
  level: number;
  sv: {
    name: string;
    description: string;
    characteristics: string;
    typicalNeeds: string;
  };
  en: {
    name: string;
    description: string;
    characteristics: string;
    typicalNeeds: string;
  };
  scoreRange: [number, number];
}

export interface ScopeAIConfig {
  systemPrompt: { sv: string; en: string };
  userPromptIntro: { sv: string; en: string };
}

export interface ScopePredefinedInsights {
  sv: {
    strengths: Record<string, string[]>;
    improvements: Record<string, string[]>;
  };
  en: {
    strengths: Record<string, string[]>;
    improvements: Record<string, string[]>;
  };
}

export interface AssessmentScope {
  id: string;
  name: { sv: string; en: string };
  description: { sv: string; en: string };
  targetAudience: { sv: string; en: string };
  questionCount: number;
  dimensionCount: number;
  questions: ScopeQuestion[];
  dimensions: ScopeDimension[];
  maturityLevels: ScopeMaturityLevel[];
  aiConfig: ScopeAIConfig;
  predefinedInsights: ScopePredefinedInsights;
}

// Helper functions that work with any scope
export function getDimensionById(dimensions: ScopeDimension[], id: string): ScopeDimension | undefined {
  return dimensions.find((d) => d.id === id);
}

export function getQuestionsByDimension(questions: ScopeQuestion[], dimension: string): ScopeQuestion[] {
  return questions.filter((q) => q.dimension === dimension);
}

export function getMaturityLevel(maturityLevels: ScopeMaturityLevel[], score: number): ScopeMaturityLevel {
  const level = maturityLevels.find(
    (l) => score >= l.scoreRange[0] && score <= l.scoreRange[1]
  );
  return level || maturityLevels[0];
}

export function calculateDimensionScore(
  responses: Map<number, number>,
  questions: ScopeQuestion[],
  dimension: string
): number {
  const dimQuestions = getQuestionsByDimension(questions, dimension);
  const scores = dimQuestions
    .map((q) => responses.get(q.id))
    .filter((v): v is number => v !== undefined);

  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function calculateOverallScore(responses: Map<number, number>): number {
  const allScores = Array.from(responses.values());
  if (allScores.length === 0) return 0;
  return allScores.reduce((a, b) => a + b, 0) / allScores.length;
}

export function calculateAllDimensionScores(
  responses: Map<number, number>,
  scope: AssessmentScope
): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const dim of scope.dimensions) {
    scores[dim.id] = calculateDimensionScore(responses, scope.questions, dim.id);
  }
  return scores;
}
