import { coursesAdapter } from './courses.adapter';
import { createReducer, on, Action, ActionReducerMap } from '@ngrx/store';
import { setCourses, getCoursesRequestStarted, getCoursesNextPage } from './courses.actions';
import { Course } from '../entities/course';
import { EntityState } from '@ngrx/entity';
import { CoursesSearchParams } from '../entities/courses-search-params';

export interface CoursesState {
  searchParams: CoursesSearchParams;
  data: EntityState<Course>;
}

export const coursesFeatureKey = 'courses';

const initialDataState = coursesAdapter.getInitialState();

export const coursesReducerFn = createReducer(
    initialDataState,
    on(setCourses, (state, { payload }) => {
        return coursesAdapter.addAll(payload, state);
    })
);

export function coursesReducer(
    state = initialDataState,
    action: Action
): EntityState<Course> {
    return coursesReducerFn(state, action);
}


const initialSearchParamsState = {
  start: 0,
  count: 10,
  sort: 'asc',
  filter: '',
  textFragment: ''
};

export const searchParamsReducerFn = createReducer(
    initialSearchParamsState,
    on(getCoursesRequestStarted, (state, { payload }) => {
        return {
          ...state,
          ...(payload || {})
        };
    }),
    on(getCoursesNextPage, (state) => {
      return {
        ...state,
        count: state.count + 10,
      };
  })
);

export function searchParamsReducer(
    state = initialSearchParamsState,
    action: Action
): CoursesSearchParams {
    return searchParamsReducerFn(state, action);
}



export const reducers: ActionReducerMap<CoursesState> = {
  searchParams: searchParamsReducer,
  data: coursesReducer,
};
