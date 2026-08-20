export interface IUserModel {
  _id?: string;
  name: string;
  email: string;
  passwordHash?: string;
  targetRole: string;
  targetCompany: string;
  selectedCourseId?: string;
  createdAt: Date;
}
