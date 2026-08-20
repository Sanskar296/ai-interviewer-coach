export interface IQuestionModel {
  _id?: string;
  questionText: string;
  category: string;
  difficulty: string;
  companyTarget?: string;
  roleTarget?: string;
  hints: string[];
  idealTalkingPoints: string[];
}
