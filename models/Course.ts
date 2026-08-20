export interface ICourseModel {
  _id?: string;
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
