import { Course } from './course';
import { Author } from './author';

export class CourseItem implements Course {
  creationDate: string;
  description: string;
  durationMin: number;
  id: string;
  title: string;
  topRated: boolean;
  authors: Author[];
}
