import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    atsScore: 92,
    matchPercentage: 88,
    formattingScore: 95,
    foundKeywords: ["React", "Next.js", "Python", "FastAPI", "Redis", "Docker", "AWS"],
    missingKeywords: ["GraphQL", "Kafka"],
    suggestions: [
      "Incorporate missing core tech keywords: GraphQL, Kafka.",
      "Add explicit metrics on team size managed and monthly active users served.",
    ],
  });
}
