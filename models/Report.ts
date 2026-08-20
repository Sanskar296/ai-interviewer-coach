import { SpeechTelemetry, VideoTelemetry, LLMEvaluation, WeakArea, Recommendation } from '@/types';

export interface IReportModel {
  _id?: string;
  userId: string;
  interviewId: string;
  overallScore: number;
  speechAnalysis: SpeechTelemetry;
  videoAnalysis: VideoTelemetry;
  llmEvaluation: LLMEvaluation;
  weakAreas: WeakArea[];
  recommendations: Recommendation[];
  createdAt: Date;
}
