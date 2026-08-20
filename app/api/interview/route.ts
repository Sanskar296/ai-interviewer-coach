import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    status: "evaluated",
    overallScore: 88,
    speechAnalysis: {
      speedWpm: 138,
      pauseCount: 3,
      pauseDurationSec: 1.6,
      fillerWords: [{ word: "um", count: 2 }, { word: "like", count: 1 }],
      totalFillerCount: 3,
      fluencyScore: 89,
    },
    videoAnalysis: {
      eyeContactPct: 92,
      headPoseStability: "Stable",
      facePresence: true,
      expression: "Confident",
    },
    llmEvaluation: {
      technicalDepthScore: 90,
      communicationScore: 88,
      starFrameworkScore: 86,
      overallScore: 88,
      keyStrengths: [
        "Excellent architectural detail mentioning CRDTs and Operational Transformation.",
        "Clear quantitative result mentioned during database latency explanation.",
      ],
      improvedSampleAnswer: "To design Google Docs collaborative infrastructure at scale, I would utilize Conflict-free Replicated Data Types (CRDTs)...",
    },
  });
}
