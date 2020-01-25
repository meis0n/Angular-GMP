import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../../entities/course';

import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { getCoursesRequestStarted, getCoursesNextPage, deleteCourseRequestStarted } from '../../store/courses.actions';
import { CoursesState } from '../../store/courses.reducer';
import { selectAllCourses, selectSearchParams, selectCourseById } from '../../store/courses.selectors';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  faPlus = faPlus;

  allCoursesAmount = 0;

  filterInput = '';
  filter = new BehaviorSubject<string>('');
  //filter = new Observable<string>();

  courses$: Observable<any>;

  private filterSubscrition: Subscription;
  private deleteSubscrition: Subscription;

  constructor (
    // public coursesStoreService: CoursesStoreService,
    private coursesBackendService: CourseService,
    private router: Router,
    private store: Store<CoursesState>
  ) {}

  ngOnInit(): void {
    this.filterSubscrition = this.filter
    .pipe(
      debounceTime(200),
      tap(value => {
        if(!value.length || value.length >= 3) {
          this.store.dispatch(getCoursesRequestStarted({
            payload: {
              textFragment: value,
            }
          }));
        }
      })
    )
    .subscribe();

    this.courses$ = this.store.pipe(select(selectAllCourses));
    this.store.dispatch(getCoursesRequestStarted(null));
  }

  addCourse (): void {
    this.router.navigateByUrl('courses/new');
  }

  onCourseChange (course: Course): void {
    this.router.navigateByUrl(`courses/${course.id}`);
  }

  onCourseDelete (courseId: Course['id']): void {
    this.deleteSubscrition = this.store.pipe(
      select(selectCourseById, { id: courseId }),
      tap((course) => {
        const isUserAgree = confirm(`Удалить курс ${course.title}`);

        if (isUserAgree) {
          this.store.dispatch(deleteCourseRequestStarted({ payload: courseId }));
        }
      })
    ).subscribe();
  }

  onLoadMore (): void {
    this.store.dispatch(getCoursesNextPage());
  }

  onSearch (): void {
    this.filter.next(this.filterInput);
  }

  ngOnDestroy(): void {
    this.filterSubscrition.unsubscribe();
    if(this.deleteSubscrition) {
      this.deleteSubscrition.unsubscribe();
    }
  }
}
