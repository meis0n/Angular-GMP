import { Course } from './course';

export class CourseItem implements Course {
  creationDate: Date;
  descrition: string;
  duration: number;
  id: string;
  title: string;
}
