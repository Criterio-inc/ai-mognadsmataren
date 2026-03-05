/**
 * API endpoint to seed TWO demo projects (AI + Digital) with realistic survey responses
 * Only accessible by consultants (authenticated users)
 *
 * POST /api/seed-demo
 */

import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { db } from '@/db';
import { projects, assessmentSessions, responses, assessmentResults } from '@/db/schema';
import { nanoid } from 'nanoid';
import { getScope } from '@/lib/scopes';

// Swedish first names for realistic demo data
const SWEDISH_NAMES = [
  'Anna Andersson',
  'Erik Eriksson',
  'Maria Johansson',
  'Johan Karlsson',
  'Emma Nilsson',
  'Lars Svensson',
  'Sara Olsson',
  'Magnus Persson',
  'Karin Lindqvist',
  'Anders Bergström',
  'Eva Larsson',
  'Per Gustafsson',
  'Lena Pettersson',
  'Mikael Jonsson',
  'Helena Lindgren',
];

// ========== AI SCOPE CONFIG ==========

// Organization baseline for AI - strong on strategy, weak on governance/ecosystem
const AI_DIMENSION_BIAS: Record<string, number> = {
  strategiLedarskap: 0.8,
  anvandsfall: 0.3,
  dataInfrastruktur: 0.0,
  kompetensKultur: -0.3,
  styrningEtik: -0.5,
  teknikArkitektur: 0.2,
  organisationProcesser: -0.2,
  ekosystemInnovation: -0.8,
};

const AI_INSIGHTS = {
  summary: 'Organisationen visar en tydlig styrka inom strategiskt ledarskap och har en val forankrad AI-vision. Samtidigt finns betydande utvecklingspotential inom styrning och etik samt ekosystem och innovation. Den samlade mognadsbilden tyder pa att organisationen ar pa god vag men behover starka fundamenten for att skala sina AI-satsningar hallbart.',
  strengths: [
    'Starkt strategiskt ledarskap med tydlig AI-vision som genomsyrar organisationen.',
    'God forstaelse for anvandningsfall och var AI kan skapa affarsvarde.',
    'Positiv installning till teknisk utveckling och vilja att investera i arkitektur.',
  ],
  improvements: [
    'Styrning och etik behover formaliseras - ramverk for ansvarsfull AI saknas i stor utstrackning.',
    'Ekosystem och innovation har lagst mognad - begransade externa samarbeten och partnerskap.',
    'Kompetens och kultur behover starkas med strukturerade utbildningsinsatser.',
  ],
  recommendations: [
    'Etablera ett AI-styrningsramverk med tydliga riktlinjer for etik, dataskydd och riskhantering.',
    'Kartlagg er status gentemot EU AI Act och skapa en efterlevnadsplan.',
    'Investera i strategiska partnerskap med akademi, startups och branschorganisationer.',
    'Skapa en intern AI-akademi med rollbaserade utbildningsspar.',
  ],
  nextSteps: [
    'Tillsatt en AI-styrgrupp med mandat att ta fram policyer och riktlinjer (Q1).',
    'Genomfor en gap-analys mot EU AI Act-kraven (Q1-Q2).',
    'Lansera ett pilotprogram for AI-kompetenslyft med 3-5 team (Q2).',
    'Identifiera och inled samtal med 2-3 potentiella ekosystempartners (Q2-Q3).',
  ],
};

// ========== DIGITAL SCOPE CONFIG ==========

// Organization baseline for Digital - strong on shared understanding, weaker on execution
const DIGITAL_DIMENSION_BIAS: Record<string, number> = {
  gemesamBild: 0.5,
  strategiskKoppling: -0.3,
  prioriteringBeslut: 0.1,
  agarskapGenomforande: -0.5,
};

const DIGITAL_INSIGHTS = {
  summary: 'Ledningsgruppen har en relativt god gemensam forstaelse for digitaliseringens betydelse, men det finns utmaningar i att omsatta denna forstaelse till konkret strategisk koppling och genomforande. Agarskap och genomforandeformaga identifieras som det framsta utvecklingsomradet.',
  strengths: [
    'Ledningsgruppen delar en god forstaelse for vad digitalisering innebar for verksamheten.',
    'Det finns vilja och intresse att prioritera digitala initiativ.',
    'Grundlaggande forstaelse for digitaliseringens paverkan pa medborgare och medarbetare.',
  ],
  improvements: [
    'Agarskap och genomforande ar svagast - tydligare ansvar och forandringsledning behovs.',
    'Den strategiska kopplingen mellan IT/digital och verksamhetsmal behover starkas.',
    'Prioriteringsprocesser for digitala initiativ kan forbattras med tydligare kriterier.',
  ],
  recommendations: [
    'Skapa en digital handlingsplan med matbara mal kopplade till verksamhetsstrategin.',
    'Utse tydliga processagare for varje digitalt initiativ med definierade mandat.',
    'Etablera en regelbunden uppfoljningsstruktur for digitala projekt i ledningsgruppen.',
    'Investera i forandringsledningskompetens hos chefer och nyckelpersoner.',
  ],
  nextSteps: [
    'Workshop i ledningsgruppen: koppla digitala mal till verksamhetsplanen (nasta manad).',
    'Kartlagg nuvarande digitala initiativ och utse ansvariga agare (inom 6 veckor).',
    'Etablera kvartalsvis digital uppfoljning i ledningsgruppens agenda (lopande).',
    'Planera utbildningsinsats i forandringsledning for ledningsgruppen (Q2).',
  ],
};

// Respondent profiles with different perspectives
const RESPONDENT_PROFILES = [
  { name: 'optimist', bias: 0.8, variance: 0.3, dimensionBonus: {} as Record<string, number> },
  { name: 'pessimist', bias: -0.7, variance: 0.3, dimensionBonus: {} as Record<string, number> },
  { name: 'balanced', bias: 0, variance: 0.5, dimensionBonus: {} as Record<string, number> },
  { name: 'strategic', bias: 0.3, variance: 0.8, dimensionBonus: { strategiLedarskap: 1.0, gemesamBild: 0.8 } },
  { name: 'operational', bias: -0.2, variance: 0.6, dimensionBonus: { organisationProcesser: 0.8, agarskapGenomforande: 0.6 } },
  { name: 'visionary', bias: 0.5, variance: 0.7, dimensionBonus: { ekosystemInnovation: 0.7, strategiskKoppling: 0.5 } },
  { name: 'critical', bias: -0.5, variance: 0.4, dimensionBonus: {} as Record<string, number> },
  { name: 'enthusiast', bias: 1.0, variance: 0.5, dimensionBonus: {} as Record<string, number> },
  { name: 'realist', bias: 0, variance: 0.3, dimensionBonus: {} as Record<string, number> },
  { name: 'pragmatic', bias: 0.2, variance: 0.6, dimensionBonus: {} as Record<string, number> },
  { name: 'cautious', bias: -0.3, variance: 0.2, dimensionBonus: {} as Record<string, number> },
  { name: 'ambitious', bias: 0.6, variance: 0.7, dimensionBonus: {} as Record<string, number> },
  { name: 'detail-oriented', bias: -0.1, variance: 0.4, dimensionBonus: { styrningEtik: 0.5, prioriteringBeslut: 0.5 } },
  { name: 'big-picture', bias: 0.4, variance: 0.5, dimensionBonus: { strategiLedarskap: 0.5, anvandsfall: 0.5, gemesamBild: 0.5 } },
  { name: 'newcomer', bias: 0.1, variance: 1.0, dimensionBonus: {} as Record<string, number> },
];

// Generate score with profile and dimension context
function generateProfiledScore(
  profile: typeof RESPONDENT_PROFILES[0],
  dimension: string,
  dimensionBias: Record<string, number>
): number {
  let score = 3;
  score += dimensionBias[dimension] || 0;
  score += profile.bias;

  if (profile.dimensionBonus[dimension]) {
    score += profile.dimensionBonus[dimension];
  }

  const variance = (Math.random() - 0.5) * 2 * profile.variance * 1.5;
  score += variance;

  return Math.max(1, Math.min(5, Math.round(score)));
}

function calculateDimScore(responseValues: number[]): number {
  if (responseValues.length === 0) return 0;
  const sum = responseValues.reduce((a, b) => a + b, 0);
  return Number((sum / responseValues.length).toFixed(2));
}

interface SeedConfig {
  projectName: string;
  clientName: string;
  scopeId: 'ai' | 'digital';
  dimensionBias: Record<string, number>;
  insights: {
    summary: string;
    strengths: string[];
    improvements: string[];
    recommendations: string[];
    nextSteps: string[];
  };
}

async function seedOneProject(userId: string, config: SeedConfig) {
  const scope = getScope(config.scopeId);

  // Build dimension -> questionIds map from scope
  const dimensionQuestionMap: Record<string, number[]> = {};
  for (const dim of scope.dimensions) {
    dimensionQuestionMap[dim.id] = dim.questionIds;
  }

  // 1. Create the project
  const shareCode = nanoid(8);
  const [project] = await db.insert(projects).values({
    name: config.projectName,
    clientName: config.clientName,
    clientDomain: 'demo.se',
    shareCode,
    createdById: userId,
    scope: config.scopeId,
    status: 'active' as const,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  }).returning();

  // 2. Create 15 assessment sessions with responses
  const createdSessions = [];

  for (let i = 0; i < 15; i++) {
    const name = SWEDISH_NAMES[i];
    const email = `${name.toLowerCase().replace(' ', '.')}@demo.se`;
    const profile = RESPONDENT_PROFILES[i];

    const [assessmentSession] = await db.insert(assessmentSessions).values({
      projectId: project.id,
      respondentEmail: email,
      respondentName: name,
      completedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    }).returning();

    const allResponses: { sessionId: string; questionId: number; value: number }[] = [];
    const dimensionResponses: Record<string, number[]> = {};
    for (const dimId of Object.keys(dimensionQuestionMap)) {
      dimensionResponses[dimId] = [];
    }

    // Generate responses for all questions in this scope
    for (let q = 1; q <= scope.questionCount; q++) {
      // Find which dimension this question belongs to
      let questionDimension = scope.dimensions[0].id;
      for (const [dimId, qIds] of Object.entries(dimensionQuestionMap)) {
        if (qIds.includes(q)) {
          questionDimension = dimId;
          break;
        }
      }

      const value = generateProfiledScore(profile, questionDimension, config.dimensionBias);
      allResponses.push({
        sessionId: assessmentSession.id,
        questionId: q,
        value,
      });

      dimensionResponses[questionDimension].push(value);
    }

    await db.insert(responses).values(allResponses);

    // Calculate dimension scores
    const dimensionScores: Record<string, number> = {};
    for (const [dim, vals] of Object.entries(dimensionResponses)) {
      dimensionScores[dim] = calculateDimScore(vals);
    }

    const dimValues = Object.values(dimensionScores);
    const overallScore = Number((dimValues.reduce((a, b) => a + b, 0) / dimValues.length).toFixed(2));

    // Determine maturity level using scope's maturity levels
    let maturityLevel = 1;
    for (const ml of scope.maturityLevels) {
      if (overallScore >= ml.scoreRange[0] && overallScore <= ml.scoreRange[1]) {
        maturityLevel = ml.level;
        break;
      }
    }

    await db.insert(assessmentResults).values({
      sessionId: assessmentSession.id,
      dimensionScores,
      overallScore: Math.round(overallScore),
      maturityLevel,
      aiInsights: i === 0 ? config.insights : undefined, // Only first respondent gets cached insights
    });

    createdSessions.push({ name, email, overallScore });
  }

  return {
    project: {
      id: project.id,
      name: project.name,
      shareCode: project.shareCode,
      scope: config.scopeId,
    },
    respondents: createdSessions.length,
    reportUrl: `/dashboard/project/${project.id}/report`,
  };
}

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Create BOTH demo projects
    const aiResult = await seedOneProject(userId, {
      projectName: 'Demo: AI-Mognadsmätning 2025',
      clientName: 'Innovatech AB',
      scopeId: 'ai',
      dimensionBias: AI_DIMENSION_BIAS,
      insights: AI_INSIGHTS,
    });

    const digitalResult = await seedOneProject(userId, {
      projectName: 'Demo: Digital Mognadsmätning 2025',
      clientName: 'Kommunförbundet Mitt',
      scopeId: 'digital',
      dimensionBias: DIGITAL_DIMENSION_BIAS,
      insights: DIGITAL_INSIGHTS,
    });

    return NextResponse.json({
      success: true,
      projects: [aiResult, digitalResult],
      message: 'Två demo-projekt skapade med 15 respondenter vardera',
      reportUrl: aiResult.reportUrl,
    });
  } catch (error) {
    console.error('Error seeding demo projects:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create demo projects', details: errorMessage },
      { status: 500 }
    );
  }
}
