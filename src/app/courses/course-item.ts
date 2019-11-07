import { Course } from './course';

export class CourseItem implements Course {
  creationDate: string;
  description: string;
  duration: string;
  id: string;
  title: string;
}
