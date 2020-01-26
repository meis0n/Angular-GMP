import { Author } from './author';

export interface Course {
  creationDate: string;
  description: string;
  durationMin: number;
  id: string;
  title: string;
  topRated: boolean;
  authors: Author[];
}
