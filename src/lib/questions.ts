// Thin wrapper for backwards compatibility
// All scope-specific data now lives in src/lib/scopes/
// This file delegates to the AI scope by default

import { getScope } from './scopes';
import type { ScopeQuestion, ScopeDimension, ScopeMaturityLevel } from './scopes';

const defaultScope = getScope('ai');

// Re-export types (keeping old names for backwards compat)
export type Dimension = string;

export interface Question {
  id: number;
  dimension: Dimension;
  sv: string;
  en: string;
}

export interface DimensionInfo {
  id: Dimension;
  sv: { name: string; description: string };
  en: { name: string; description: string };
  questionIds: number[];
}

export interface MaturityLevel {
  level: number;
  sv: { name: string; description: string; characteristics: string; typicalNeeds: string };
  en: { name: string; description: string; characteristics: string; typicalNeeds: string };
  scoreRange: [number, number];
}

// Default exports (AI scope) for backwards compatibility
export const dimensions: DimensionInfo[] = defaultScope.dimensions;
export const questions: Question[] = defaultScope.questions;
export const maturityLevels: MaturityLevel[] = defaultScope.maturityLevels;

// Helper functions (delegating to scope system)
export function getDimensionById(id: Dimension): DimensionInfo | undefined {
  return dimensions.find((d) => d.id === id);
}

export function getQuestionsByDimension(dimension: Dimension): Question[] {
  return questions.filter((q) => q.dimension === dimension);
}

export function getMaturityLevel(score: number): MaturityLevel {
  const level = maturityLevels.find(
    (l) => score >= l.scoreRange[0] && score <= l.scoreRange[1]
  );
  return level || maturityLevels[0];
}

export function calculateDimensionScore(
  responses: Map<number, number>,
  dimension: Dimension
): number {
  const dimQuestions = getQuestionsByDimension(dimension);
  const allValues = dimQuestions
    .map((q) => responses.get(q.id))
    .filter((v): v is number => v !== undefined);
  // Exclude "Ej aktuellt" (0) from the average calculation
  const scores = allValues.filter((v) => v > 0);

  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function calculateOverallScore(responses: Map<number, number>): number {
  // Exclude "Ej aktuellt" (0) from the average calculation
  const allScores = Array.from(responses.values()).filter((v) => v > 0);
  if (allScores.length === 0) return 0;
  return allScores.reduce((a, b) => a + b, 0) / allScores.length;
}

// Count "Ej aktuellt" responses per dimension
export function countNotApplicable(
  responses: Map<number, number>,
  dimension: Dimension
): number {
  const dimQuestions = getQuestionsByDimension(dimension);
  return dimQuestions
    .map((q) => responses.get(q.id))
    .filter((v) => v === 0)
    .length;
}

// Count total "Ej aktuellt" responses
export function countTotalNotApplicable(responses: Map<number, number>): number {
  return Array.from(responses.values()).filter((v) => v === 0).length;
}
