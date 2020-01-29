import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import { Course } from '../entities/course';

export const selectCoursesState =
    createFeatureSelector<CoursesState>("courses");

export const selectAllCourses = createSelector(
    selectCoursesState,
    (state) => {
        const allCourses = Object.values(state.data.entities);
        return allCourses;
    }
);

export const selectCourseById = createSelector(
    selectCoursesState,
    (state, props: { id: Course['id'] }): Course => {
        const course = state.data.entities[props.id];
        return course;
    }
);

export const selectSearchParams = createSelector(
    selectCoursesState,
    (state) => {
        return state.searchParams;
    }
);
