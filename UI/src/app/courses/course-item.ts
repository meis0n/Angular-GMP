import { Course } from './course';

export class CourseItem implements Course {
  creationDate: Date;
  description: string;
  durationMin: number;
  id: string;
  title: string;
  topRated: boolean;
}
