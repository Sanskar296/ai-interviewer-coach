import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    user: {
      id: "usr-101",
      name: body.name || "Sanskar Sharma",
      email: body.email || "sanskar@example.com",
      targetRole: body.targetRole || "Senior Full Stack Engineer",
      targetCompany: body.targetCompany || "Google",
    },
    token: "mock-jwt-session-token",
  });
}
