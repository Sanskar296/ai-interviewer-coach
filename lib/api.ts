const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// --- Types ---

export interface QuestionItem {
  id: string;
  question: string;
  category: string;
  hints: string[];
  ideal_talking_points: string[];
}

export interface InterviewSession {
  session_id: string;
  role: string;
  category: string;
  questions: QuestionItem[];
  created_at: string;
}

export interface InterviewStartRequest {
  role: string;
  category: string;
  difficulty: string;
  question_count: number;
}

export interface AnswerSubmitRequest {
  session_id: string;
  question_id: string;
  answer_text: string;
  audio_duration_seconds?: number;
}

export interface AnswerFeedbackResponse {
  question_id: string;
  clarity_score: number;
  relevance_score: number;
  star_framework_score: number;
  overall_score: number;
  key_strengths: string[];
  areas_for_improvement: string[];
  improved_sample_answer: string;
  pacing_wpm: number;
  sentiment: string;
}

export interface SectionScore {
  name: string;
  score: number;
  feedback: string;
  passed: boolean;
}

export interface ResumeScanRequest {
  resume_text: string;
  target_role?: string;
  experience_level?: string;
}

export interface ResumeScanResponse {
  ats_score: number;
  match_percentage: number;
  formatting_score: number;
  sections: SectionScore[];
  found_keywords: string[];
  missing_keywords: string[];
  action_verbs_used: string[];
  suggestions: string[];
  strengths: string[];
}

export interface CompanyQuestion {
  id: string;
  company: string;
  role: string;
  category: string;
  question: string;
  difficulty: string;
  frequency: string;
  sample_answer: string;
  recruiter_tips: string[];
}

export interface ProgressMetric {
  label: string;
  value: string;
  change: string;
  trending: 'up' | 'down' | 'neutral';
}

export interface SkillRadar {
  skill: string;
  score: number;
}

export interface SessionHistory {
  id: string;
  title: string;
  date: string;
  score: number;
  category: string;
}

export interface ProgressDashboardResponse {
  metrics: ProgressMetric[];
  skills: SkillRadar[];
  recent_sessions: SessionHistory[];
  recommended_focus: string[];
}

// --- API Client Methods ---

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText || response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // Health
  checkHealth: () => fetchJson<{ status: string; version: string; database: any }>("/health"),

  // Interview Arena
  startInterview: (req: InterviewStartRequest) =>
    fetchJson<InterviewSession>("/api/interview/start", {
      method: "POST",
      body: JSON.stringify(req),
    }),

  submitAnswer: (req: AnswerSubmitRequest) =>
    fetchJson<AnswerFeedbackResponse>("/api/interview/answer", {
      method: "POST",
      body: JSON.stringify(req),
    }),

  // Resume Scanner
  scanResumeText: (req: ResumeScanRequest) =>
    fetchJson<ResumeScanResponse>("/api/resume/scan", {
      method: "POST",
      body: JSON.stringify(req),
    }),

  uploadResumeFile: async (file: File, targetRole: string = "Full Stack Engineer"): Promise<ResumeScanResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("target_role", targetRole);

    const response = await fetch(`${API_BASE_URL}/api/resume/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Resume upload failed (${response.status}): ${response.statusText}`);
    }

    return response.json();
  },

  // Company Prep
  getCompanies: () => fetchJson<{ companies: Array<{ id: string; name: string; logo: string; roles: string[]; tag: string }> }>("/api/company/companies"),

  getCompanyQuestions: (company?: string, role?: string) => {
    const params = new URLSearchParams();
    if (company) params.append("company", company);
    if (role) params.append("role", role);
    const queryString = params.toString() ? `?${params.toString()}` : "";
    return fetchJson<{ company: string; role: string; total_questions: number; questions: CompanyQuestion[] }>(`/api/company/questions${queryString}`);
  },

  // Progress Dashboard
  getProgressDashboard: () => fetchJson<ProgressDashboardResponse>("/api/progress/dashboard"),
};
