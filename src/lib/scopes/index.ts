import { aiScope } from './ai';
import { digitalScope } from './digital';
import type { AssessmentScope } from './types';

export type { AssessmentScope, ScopeQuestion, ScopeDimension, ScopeMaturityLevel } from './types';
export {
  getDimensionById,
  getQuestionsByDimension,
  getMaturityLevel,
  calculateDimensionScore,
  calculateOverallScore,
  calculateAllDimensionScores,
} from './types';

const scopes: Record<string, AssessmentScope> = {
  ai: aiScope,
  digital: digitalScope,
};

export type ScopeId = 'ai' | 'digital';

export function getScope(id: string): AssessmentScope {
  const scope = scopes[id];
  if (!scope) {
    throw new Error(`Unknown scope: ${id}. Available: ${Object.keys(scopes).join(', ')}`);
  }
  return scope;
}

export function getAllScopes(): AssessmentScope[] {
  return Object.values(scopes);
}

export function getScopeIds(): string[] {
  return Object.keys(scopes);
}

export const DEFAULT_SCOPE: ScopeId = 'ai';
