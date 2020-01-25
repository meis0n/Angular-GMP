
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Course } from '../entities/course';

export const coursesAdapter: EntityAdapter<Course> = createEntityAdapter<
  Course
>()
