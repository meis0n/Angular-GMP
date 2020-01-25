import { Injectable } from '@angular/core';
import { map, mergeMap, catchError, filter, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { CourseService } from '../services/course.service';
import { getCoursesRequestSuccess, setCourses, getCoursesRequestStarted, getCoursesNextPage, createCourseRequestStarted, createCourseRequestSuccess, updateCourseRequestStarted, updateCourseRequestSuccess, deleteCourseRequestStarted, deleteCourseRequestSuccess } from './courses.actions';
import { Course } from '../entities/course';
import { CoursesSearchParams } from '../entities/courses-search-params';
import { Store, select } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import { selectSearchParams } from './courses.selectors';

@Injectable()
export class CoursesEffects {
    constructor(private actions: Actions, private coursesService: CourseService, private store: Store<CoursesState>) {}

    public getAllCourses$ = this.getAllCourses();
    public addCourses$ = this.addCourses();
    public nextPage$ = this.nextPage();

    public createCourse$ = this.createCourse();
    public addCourse$ = this.addCourse();

    public updateCourse$ = this.updateCourse();
    public updateCourseSuccess$ = this.updateCourseSuccess();

    public deleteCourse$ = this.deleteCourse();
    public deleteCourseSuccess$ = this.deleteCourseSuccess();

    private getAllCourses() {
        return createEffect(() =>
            this.actions.pipe(
                ofType(getCoursesRequestStarted.type),
                withLatestFrom(this.store.pipe(select(selectSearchParams))),
                mergeMap(([initial, searchParams]) =>
                    this.coursesService.getCourses(searchParams).pipe(
                        catchError(() => of(undefined))
                    )
                ),
                map((payload: Course[]) => {
                    return getCoursesRequestSuccess({ payload });
                })
            )
        );
    }

    private nextPage() {
      return createEffect(() =>
          this.actions.pipe(
              ofType(getCoursesNextPage.type),
              map(() => {
                  return getCoursesRequestStarted(null);
              })
          )
      );
    }

    private addCourses() {
        return createEffect(() =>
            this.actions.pipe(
                ofType(getCoursesRequestSuccess.type),
                map(({ payload }: { payload: Course[] }) =>
                  setCourses({ payload })
                )
            )
        );
    }

    private createCourse() {
      return createEffect(() =>
          this.actions.pipe(
              ofType(createCourseRequestStarted.type),
              mergeMap(({ payload }: { payload: Course}) =>
                  this.coursesService.createCourse(payload).pipe(
                      catchError(() => of(undefined))
                  )
              ),
              map(() => createCourseRequestSuccess())
          )
      );
  }

    private addCourse() {
        return createEffect(() =>
            this.actions.pipe(
                ofType(createCourseRequestSuccess.type),
                map(() => getCoursesRequestStarted(null))
            )
        );
    }

    private updateCourse() {
      return createEffect(() =>
          this.actions.pipe(
              ofType(updateCourseRequestStarted.type),
              mergeMap(({ payload }: { payload: Course}) =>
                  this.coursesService.updateCourse(payload).pipe(
                      catchError(() => of(undefined))
                  )
              ),
              map(() => updateCourseRequestSuccess())
          )
      );
    }

    private updateCourseSuccess() {
        return createEffect(() =>
            this.actions.pipe(
                ofType(updateCourseRequestSuccess.type),
                map(() => getCoursesRequestStarted(null))
            )
        );
    }

    private deleteCourse() {
      return createEffect(() =>
          this.actions.pipe(
              ofType(deleteCourseRequestStarted.type),
              mergeMap(({ payload }: { payload: Course['id']}) =>
                  this.coursesService.removeCourse(payload).pipe(
                      catchError(() => of(undefined))
                  )
              ),
              map(() => deleteCourseRequestSuccess())
          )
      );
    }

    private deleteCourseSuccess() {
        return createEffect(() =>
            this.actions.pipe(
                ofType(deleteCourseRequestSuccess.type),
                map(() => getCoursesRequestStarted(null))
            )
        );
    }
}
