export interface IResumeModel {
  _id?: string;
  userId: string;
  fileName: string;
  rawText: string;
  atsScore: number;
  extractedSkills: string[];
  missingKeywords: string[];
  createdAt: Date;
}
