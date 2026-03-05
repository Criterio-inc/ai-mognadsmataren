import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { assessmentSessions, responses, assessmentResults, projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { isDeadlinePassed } from '@/lib/utils';
import { getScope } from '@/lib/scopes';
import type { AssessmentScope } from '@/lib/scopes';

type Params = Promise<{ sessionId: string }>;

// Calculate dimension scores from responses using scope config
// "Ej aktuellt" (value 0) is excluded from score averages but tracked separately
function calculateScores(responsesMap: Record<number, number>, scope: AssessmentScope) {
  const dimensionScores: Record<string, number> = {};

  for (const dim of scope.dimensions) {
    // Exclude "Ej aktuellt" (0) from the average
    const values = dim.questionIds.map((id) => responsesMap[id]).filter((v) => v !== undefined && v > 0);
    if (values.length > 0) {
      dimensionScores[dim.id] = values.reduce((a, b) => a + b, 0) / values.length;
    } else {
      dimensionScores[dim.id] = 0;
    }
  }

  // Exclude "Ej aktuellt" (0) from the overall average
  const allValues = Object.values(responsesMap).filter((v) => v !== undefined && v > 0);
  const overallScore = allValues.length > 0 ? allValues.reduce((a, b) => a + b, 0) / allValues.length : 0;

  // Map to maturity level using scope-specific ranges
  const maturityLevelObj = scope.maturityLevels.find(
    (l) => overallScore >= l.scoreRange[0] && overallScore <= l.scoreRange[1]
  );
  const maturityLevel = maturityLevelObj?.level ?? 1;

  return { dimensionScores, overallScore, maturityLevel };
}

// PATCH /api/survey/[sessionId] - Save responses
export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const { sessionId } = await params;
  const body = await req.json();
  const { questionId, value } = body;

  if (!questionId || value == null) {
    return NextResponse.json({ error: 'questionId and value are required' }, { status: 400 });
  }

  // Verify session exists and is not completed
  const [session] = await db
    .select()
    .from(assessmentSessions)
    .where(eq(assessmentSessions.id, sessionId));

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  if (session.completedAt) {
    return NextResponse.json({ error: 'Session already completed' }, { status: 403 });
  }

  // Check if project is still open
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, session.projectId));

  if (!project || project.status === 'closed' || isDeadlinePassed(project.deadline)) {
    return NextResponse.json({ error: 'Survey is closed' }, { status: 403 });
  }

  // Upsert response
  const [existingResponse] = await db
    .select()
    .from(responses)
    .where(eq(responses.sessionId, sessionId));

  // Check if response for this question exists
  const existingResponses = await db
    .select()
    .from(responses)
    .where(eq(responses.sessionId, sessionId));

  const existing = existingResponses.find((r) => r.questionId === questionId);

  if (existing) {
    await db
      .update(responses)
      .set({ value })
      .where(eq(responses.id, existing.id));
  } else {
    await db.insert(responses).values({
      sessionId,
      questionId,
      value,
    });
  }

  return NextResponse.json({ success: true });
}

// POST /api/survey/[sessionId] - Complete the survey
export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { sessionId } = await params;

  // Verify session exists and is not completed
  const [session] = await db
    .select()
    .from(assessmentSessions)
    .where(eq(assessmentSessions.id, sessionId));

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  if (session.completedAt) {
    return NextResponse.json({ error: 'Session already completed' }, { status: 403 });
  }

  // Get project to know the scope
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, session.projectId));

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const scope = getScope(project.scope);

  // Get all responses
  const sessionResponses = await db
    .select()
    .from(responses)
    .where(eq(responses.sessionId, sessionId));

  // Check if all questions are answered (scope-dependent count)
  if (sessionResponses.length < scope.questionCount) {
    return NextResponse.json(
      { error: `Please answer all questions (${sessionResponses.length}/${scope.questionCount} completed)` },
      { status: 400 }
    );
  }

  // Calculate scores using scope config
  const responsesMap = sessionResponses.reduce(
    (acc, r) => ({ ...acc, [r.questionId]: r.value }),
    {} as Record<number, number>
  );

  const { dimensionScores, overallScore, maturityLevel } = calculateScores(responsesMap, scope);

  // Save results
  await db.insert(assessmentResults).values({
    sessionId,
    dimensionScores,
    overallScore: Math.round(overallScore * 10) / 10,
    maturityLevel,
  });

  // Mark session as completed
  await db
    .update(assessmentSessions)
    .set({ completedAt: new Date() })
    .where(eq(assessmentSessions.id, sessionId));

  return NextResponse.json({ success: true });
}
