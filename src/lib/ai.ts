import { getScope, DEFAULT_SCOPE } from './scopes';
import type { AssessmentScope, ScopeDimension } from './scopes';

interface AIInsightsInput {
  dimensionScores: Record<string, number>;
  overallScore: number;
  maturityLevel: number;
  locale: 'sv' | 'en';
  scopeId?: string;
  notApplicableCounts?: Record<string, number>;
}

interface AIInsights {
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  nextSteps: string[];
}

export type { AIInsights, AIInsightsInput };

export async function generateAIInsights(input: AIInsightsInput): Promise<AIInsights> {
  const { dimensionScores, overallScore, maturityLevel, locale, scopeId = DEFAULT_SCOPE, notApplicableCounts } = input;
  const scope = getScope(scopeId);

  // Sort dimensions by score
  const sortedDimensions = scope.dimensions
    .map((d) => ({ ...d, score: dimensionScores[d.id] ?? 0 }))
    .sort((a, b) => b.score - a.score);

  const strongestDims = sortedDimensions.filter((d) => d.score >= 3.5);
  const weakestDims = sortedDimensions.filter((d) => d.score < 3.0);

  const currentLevel = scope.maturityLevels.find((l) => l.level === maturityLevel)!;

  // Build "Ej aktuellt" info per dimension
  const notApplicableInfo = notApplicableCounts
    ? scope.dimensions
        .filter((d) => (notApplicableCounts[d.id] || 0) > 0)
        .map((d) => ({
          name: d[locale].name,
          count: notApplicableCounts[d.id],
          totalQuestions: d.questionIds.length,
        }))
    : [];

  // Build context for AI
  const context = {
    overallScore: overallScore.toFixed(1),
    maturityLevel,
    maturityLevelName: currentLevel[locale].name,
    dimensionScores: scope.dimensions.map((d) => ({
      name: d[locale].name,
      score: (dimensionScores[d.id] ?? 0).toFixed(1),
      notApplicableCount: notApplicableCounts?.[d.id] || 0,
    })),
    strongestAreas: strongestDims.map((d) => d[locale].name),
    weakestAreas: weakestDims.map((d) => d[locale].name),
    notApplicableInfo,
  };

  // Try AI generation via OpenRouter
  try {
    const aiResponse = await callOpenRouter(context, locale, scope);
    if (aiResponse) {
      return aiResponse;
    }
  } catch (error) {
    console.error('AI generation failed, using predefined content:', error);
  }

  // Fallback to predefined content
  return generatePredefinedInsights(input, scope, sortedDimensions);
}

async function callOpenRouter(
  context: {
    overallScore: string;
    maturityLevel: number;
    maturityLevelName: string;
    dimensionScores: { name: string; score: string; notApplicableCount: number }[];
    strongestAreas: string[];
    weakestAreas: string[];
    notApplicableInfo: { name: string; count: number; totalQuestions: number }[];
  },
  locale: 'sv' | 'en',
  scope: AssessmentScope
): Promise<AIInsights | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return null;
  }

  const systemPrompt = scope.aiConfig.systemPrompt[locale];
  const userPromptIntro = scope.aiConfig.userPromptIntro[locale];

  const dimensionList = context.dimensionScores.map((d) => `- ${d.name}: ${d.score}/5${d.notApplicableCount > 0 ? ` (${d.notApplicableCount} ${locale === 'sv' ? 'frågor markerade som "Ej aktuellt"' : 'questions marked as "Not applicable"'})` : ''}`).join('\n');

  const notApplicableSv = context.notApplicableInfo.length > 0
    ? `\n\nDimensioner med "Ej aktuellt"-svar (frågor markerade som ej tillämpbara):
${context.notApplicableInfo.map((d) => `- ${d.name}: ${d.count} av ${d.totalQuestions} frågor markerade som "Ej aktuellt"`).join('\n')}
OBS: "Ej aktuellt"-svar exkluderas från poängberäkningen men är i sig en viktig signal om organisationens mognad inom dessa områden.`
    : '';

  const notApplicableEn = context.notApplicableInfo.length > 0
    ? `\n\nDimensions with "Not applicable" responses (questions marked as not applicable):
${context.notApplicableInfo.map((d) => `- ${d.name}: ${d.count} of ${d.totalQuestions} questions marked as "Not applicable"`).join('\n')}
NOTE: "Not applicable" responses are excluded from score calculations but are themselves an important signal about the organization's maturity in these areas.`
    : '';

  const userPrompt = locale === 'sv'
    ? `${userPromptIntro}

Övergripande poäng: ${context.overallScore}/5 (Nivå ${context.maturityLevel}: ${context.maturityLevelName})

Dimensionspoäng:
${dimensionList}

Starkaste områden: ${context.strongestAreas.join(', ') || 'Inga tydligt starka'}
Svagaste områden: ${context.weakestAreas.join(', ') || 'Inga tydligt svaga'}${notApplicableSv}

Ge en JSON-respons med följande struktur:
{
  "summary": "2-3 meningar som sammanfattar resultatet. Om frågor markerats som 'Ej aktuellt', kommentera vad detta signalerar om organisationens mognad.",
  "strengths": ["3 styrkor baserat på höga poäng"],
  "improvements": ["3 förbättringsområden baserat på låga poäng och/eller dimensioner med många 'Ej aktuellt'-svar"],
  "recommendations": ["3 konkreta rekommendationer anpassade efter mognadsnivån"],
  "nextSteps": ["3 praktiska nästa steg för de kommande 3-6 månaderna"]
}`
    : `${userPromptIntro}

Overall score: ${context.overallScore}/5 (Level ${context.maturityLevel}: ${context.maturityLevelName})

Dimension scores:
${dimensionList}

Strongest areas: ${context.strongestAreas.join(', ') || 'None clearly strong'}
Weakest areas: ${context.weakestAreas.join(', ') || 'None clearly weak'}${notApplicableEn}

Provide a JSON response with the following structure:
{
  "summary": "2-3 sentences summarizing the result. If questions were marked as 'Not applicable', comment on what this signals about the organization's maturity.",
  "strengths": ["3 strengths based on high scores"],
  "improvements": ["3 areas for improvement based on low scores and/or dimensions with many 'Not applicable' responses"],
  "recommendations": ["3 concrete recommendations adapted to the maturity level"],
  "nextSteps": ["3 practical next steps for the coming 3-6 months"]
}`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': `Mognadsmätaren - ${scope.name.sv}`,
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No content in AI response');
  }

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not extract JSON from AI response');
  }

  return JSON.parse(jsonMatch[0]) as AIInsights;
}

function generatePredefinedInsights(
  input: AIInsightsInput,
  scope: AssessmentScope,
  sortedDimensions: (ScopeDimension & { score: number })[]
): AIInsights {
  const { overallScore, maturityLevel, locale, notApplicableCounts } = input;

  const strongestDim = sortedDimensions[0];
  const weakestDim = sortedDimensions[sortedDimensions.length - 1];

  // Dimensions where all questions are "Ej aktuellt"
  const fullyNaDimensions = notApplicableCounts
    ? scope.dimensions.filter((d) => (notApplicableCounts[d.id] || 0) === d.questionIds.length)
    : [];
  const totalNaCount = notApplicableCounts
    ? Object.values(notApplicableCounts).reduce((a, b) => a + b, 0)
    : 0;

  const currentLevel = scope.maturityLevels.find((l) => l.level === maturityLevel)!;
  const content = scope.predefinedInsights[locale];

  const naNote = totalNaCount > 0
    ? locale === 'sv'
      ? ` ${totalNaCount} frågor markerades som "Ej aktuellt", vilket i sig ger värdefull information om vilka områden organisationen ännu inte har adresserat.`
      : ` ${totalNaCount} questions were marked as "Not applicable", which itself provides valuable information about which areas the organization has not yet addressed.`
    : '';

  const summary = locale === 'sv'
    ? `Er organisation befinner sig på nivå ${maturityLevel} (${currentLevel.sv.name}) med en övergripande poäng på ${overallScore.toFixed(1)}/5. ${strongestDim[locale].name} är ert starkaste område medan ${weakestDim[locale].name} har störst utvecklingspotential.${naNote}`
    : `Your organization is at level ${maturityLevel} (${currentLevel.en.name}) with an overall score of ${overallScore.toFixed(1)}/5. ${strongestDim[locale].name} is your strongest area while ${weakestDim[locale].name} has the most development potential.${naNote}`;

  const strengths = content.strengths[strongestDim.id] || [];
  const improvements = content.improvements[weakestDim.id] || [];

  const recommendations = locale === 'sv'
    ? [
        `Börja med en workshop för att fördjupa förståelsen inom ${weakestDim.sv.name}`,
        `Dokumentera och dela goda exempel från ${strongestDim.sv.name}`,
        currentLevel.sv.typicalNeeds.split('.')[0],
      ]
    : [
        `Start with a workshop to deepen understanding of ${weakestDim.en.name}`,
        `Document and share good examples from ${strongestDim.en.name}`,
        currentLevel.en.typicalNeeds.split('.')[0],
      ];

  const nextSteps = locale === 'sv'
    ? [
        'Genomför en uppföljande mätning om 6 månader',
        'Sätt konkreta mål för de två svagaste dimensionerna',
        currentLevel.sv.typicalNeeds.split('.').slice(1, 2)[0]?.trim() || 'Involvera fler i organisationen i utvecklingsarbetet',
      ]
    : [
        'Conduct a follow-up assessment in 6 months',
        'Set concrete goals for the two weakest dimensions',
        currentLevel.en.typicalNeeds.split('.').slice(1, 2)[0]?.trim() || 'Involve more people in the organization in the development work',
      ];

  return {
    summary,
    strengths,
    improvements,
    recommendations,
    nextSteps,
  };
}

// API route handler function
export async function handleGenerateInsights(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const insights = await generateAIInsights(body);
    return Response.json(insights);
  } catch (error) {
    console.error('Error generating insights:', error);
    return Response.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
