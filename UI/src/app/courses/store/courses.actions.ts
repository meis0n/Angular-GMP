import { createAction, props } from '@ngrx/store';
import { Course } from '../entities/course';
import { CoursesSearchParams } from '../entities/courses-search-params';

export enum CoursesActionTypes {
  SetCourses = '[Courses] SET_COURSES',

  GetCoursesRequestStarted = '[Courses API] GET_COURSES_STARTED',
  GetCoursesRequestSuccess = '[Courses API] GET_COURSES_SUCCESS',
  NextPageRequestStarted = '[Courses API] NEXT_PAGE_STARTED',

  AddCourseRequestStarted = '[Courses API] ADD_COURSE_STARTED',
  AddCourseRequestSuccess = '[Courses API] ADD_COURSE_SUCCESS',

  UpdateCourseRequestStarted = '[Courses API] UPDATE_COURSE_STARTED',
  UpdateCourseRequestSuccess = '[Courses API] UPDATE_COURSE_SUCCESS',

  DeleteCourseRequestStarted = '[Courses API] DELETE_COURSE_STARTED',
  DeleteCourseRequestSuccess = '[Courses API] DELETE_COURSE_SUCCESS',
}

export const setCourses = createAction(
  CoursesActionTypes.SetCourses,
  props<{ payload: Course[] }>()
);

export const getCoursesRequestStarted = createAction(
  CoursesActionTypes.GetCoursesRequestStarted,
  props<{ payload?: CoursesSearchParams } | null>()
);

export const getCoursesRequestSuccess = createAction(
  CoursesActionTypes.GetCoursesRequestSuccess,
  props<{ payload: Course[] }>()
);

export const getCoursesNextPage = createAction(
  CoursesActionTypes.NextPageRequestStarted,
);


export const createCourseRequestStarted = createAction(
  CoursesActionTypes.AddCourseRequestStarted,
  props<{ payload: Course }>()
);

export const createCourseRequestSuccess = createAction(
  CoursesActionTypes.AddCourseRequestSuccess,
);

export const updateCourseRequestStarted = createAction(
  CoursesActionTypes.UpdateCourseRequestStarted,
  props<{ payload: Course }>()
);

export const updateCourseRequestSuccess = createAction(
  CoursesActionTypes.UpdateCourseRequestSuccess,
);

export const deleteCourseRequestStarted = createAction(
  CoursesActionTypes.DeleteCourseRequestStarted,
  props<{ payload: Course['id'] }>()
);

export const deleteCourseRequestSuccess = createAction(
  CoursesActionTypes.DeleteCourseRequestSuccess,
);
