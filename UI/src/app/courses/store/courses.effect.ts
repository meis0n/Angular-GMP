import { Injectable } from '@angular/core';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { CourseService } from '../services/course.service';
import { getCoursesRequestSuccess, setCourses, getCoursesRequestStarted, getCoursesNextPage, createCourseRequestStarted, createCourseRequestSuccess, updateCourseRequestStarted, updateCourseRequestSuccess, deleteCourseRequestStarted, deleteCourseRequestSuccess, CoursesActionTypes } from './courses.actions';
import { Course } from '../entities/course';
import { Store, select } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import { selectSearchParams } from './courses.selectors';
import { TypedAction } from '@ngrx/store/src/models';

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

    private getAllCourses(): Observable<TypedAction<CoursesActionTypes.GetCoursesRequestSuccess>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(getCoursesRequestStarted.type),
                withLatestFrom(this.store.pipe(select(selectSearchParams))),
                mergeMap(([, searchParams]) =>
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

    private nextPage(): Observable<TypedAction<CoursesActionTypes.GetCoursesRequestStarted>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(getCoursesNextPage.type),
                map(() => {
                    return getCoursesRequestStarted(null);
                })
            )
        );
    }

    private addCourses(): Observable<TypedAction<CoursesActionTypes.SetCourses>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(getCoursesRequestSuccess.type),
                map(({ payload }: { payload: Course[] }) =>
                    setCourses({ payload })
                )
            )
        );
    }

    private createCourse(): Observable<TypedAction<CoursesActionTypes.AddCourseRequestSuccess>> {
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

    private addCourse(): Observable<TypedAction<CoursesActionTypes.GetCoursesRequestStarted>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(createCourseRequestSuccess.type),
                map(() => getCoursesRequestStarted(null))
            )
        );
    }

    private updateCourse(): Observable<TypedAction<CoursesActionTypes.UpdateCourseRequestSuccess>> {
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

    private updateCourseSuccess(): Observable<TypedAction<CoursesActionTypes.GetCoursesRequestStarted>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(updateCourseRequestSuccess.type),
                map(() => getCoursesRequestStarted(null))
            )
        );
    }

    private deleteCourse(): Observable<TypedAction<CoursesActionTypes.DeleteCourseRequestSuccess>> {
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

    private deleteCourseSuccess(): Observable<TypedAction<CoursesActionTypes.GetCoursesRequestStarted>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(deleteCourseRequestSuccess.type),
                map(() => getCoursesRequestStarted(null))
            )
        );
    }
}
