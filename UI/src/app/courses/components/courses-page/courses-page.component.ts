import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../../entities/course';

import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { BehaviorSubject } from 'rxjs';
import { CoursesStoreService } from '../../services/courses-store.service';
import { debounceTime } from 'rxjs/operators';

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

  private filterSubscrition: Subscription;

  constructor (
    public coursesStoreService: CoursesStoreService,
    private coursesBackendService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterSubscrition = this.filter
    .pipe(
      debounceTime(200)
    )
    .subscribe(value => {
      if(!value.length || value.length >= 3) {
        this.coursesStoreService.get({
          textFragment: value,
        });
      }
    });
  }

  addCourse (): void {
    this.router.navigateByUrl('courses/new');
  }

  onCourseChange (course: Course): void {
    this.router.navigateByUrl(`courses/${course.id}`);
  }

  onCourseDelete (courseId: Course['id']): void {
    this.coursesBackendService.getCourseById(courseId).subscribe(c => {
      const isUserAgree = confirm(`Удалить курс ${c.title}`);

      if (isUserAgree) {
        this.coursesStoreService.removeCourse(courseId);
      }
    });
  }

  onLoadMore (): void {
    this.coursesStoreService.nextPage();
  }

  onSearch (): void {
    this.filter.next(this.filterInput);
  }

  ngOnDestroy(): void {
    this.filterSubscrition.unsubscribe();
  }
}
