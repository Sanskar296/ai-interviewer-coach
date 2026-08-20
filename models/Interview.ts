export interface IInterviewModel {
  _id?: string;
  userId: string;
  roleTarget: string;
  companyTarget: string;
  courseId?: string;
  questions: string[];
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
}
