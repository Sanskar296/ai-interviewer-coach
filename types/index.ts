export type RoleLevel = 'Junior' | 'Mid-Level' | 'Senior' | 'Lead' | 'Principal';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  targetRole: string;
  targetCompany: string;
  selectedCourseId?: string;
  previousPerformanceScore: number;
}

export interface CandidateProfile {
  resumeSummary?: string;
  selectedCourse?: Course;
  targetRole: string;
  targetCompany: string;
  previousPerformanceScore: number;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  durationHours: number;
  rating: number;
  enrolledStudents: number;
  thumbnail: string;
  description: string;
  skillsTaught: string[];
}

export interface Question {
  id: string;
  question: string;
  category: 'System Design' | 'Behavioral' | 'Coding' | 'Architecture' | 'Leadership';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companyTarget?: string;
  roleTarget?: string;
  hints: string[];
  idealTalkingPoints: string[];
}

export interface SpeechTelemetry {
  speedWpm: number; // Words Per Minute
  pauseCount: number;
  pauseDurationSec: number;
  fillerWords: { word: string; count: number }[];
  totalFillerCount: number;
  fluencyScore: number; // 0 - 100
}

export interface VideoTelemetry {
  eyeContactPct: number; // 0 - 100
  headPoseStability: 'Stable' | 'Excessive Movement' | 'Tilted';
  facePresence: boolean;
  expression: 'Confident' | 'Neutral' | 'Stressed' | 'Engaged';
}

export interface LLMEvaluation {
  technicalDepthScore: number;
  communicationScore: number;
  starFrameworkScore: number;
  overallScore: number;
  keyStrengths: string[];
  improvedSampleAnswer: string;
}

export interface WeakArea {
  id: string;
  area: string;
  category: string;
  severity: 'High' | 'Medium' | 'Low';
  impactDescription: string;
  metricObserved: string;
}

export interface Recommendation {
  id: string;
  title: string;
  type: 'Course' | 'Practice' | 'Drill';
  actionableStep: string;
  relatedCourseId?: string;
  estimatedTimeToFix: string;
}

export interface InterviewReport {
  id: string;
  date: string;
  candidateProfile: CandidateProfile;
  overallScore: number;
  speechAnalysis: SpeechTelemetry;
  videoAnalysis: VideoTelemetry;
  llmEvaluation: LLMEvaluation;
  weakAreas: WeakArea[];
  recommendations: Recommendation[];
}

export interface ResumeData {
  id: string;
  fileName: string;
  uploadedAt: string;
  atsScore: number;
  extractedSkills: string[];
  missingKeywords: string[];
  rawText: string;
}
