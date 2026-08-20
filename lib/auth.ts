export interface SessionUser {
  id: string;
  name: string;
  email: string;
  targetRole: string;
  targetCompany: string;
}

export function getMockUserSession(): SessionUser {
  return {
    id: "user-101",
    name: "Sanskar Sharma",
    email: "sanskar@example.com",
    targetRole: "Senior Full Stack Engineer",
    targetCompany: "Google",
  };
}

export function verifyAuthToken(token?: string): boolean {
  return !!token;
}
