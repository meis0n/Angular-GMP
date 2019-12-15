import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../course';

import { CourseService } from '../course.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  faPlus = faPlus;

  courses$ = new BehaviorSubject<Course[]>([]);
  allCoursesAmount = 0;

  filter: string;

  constructor (
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit (): void {
    this.courseService.getCourses().subscribe(c => {
      this.courses$.next(c);
    });
  }

  addCourse (): void {
    this.router.navigateByUrl('courses/new');
  }

  onCourseChange (course: Course): void {
    this.router.navigateByUrl(`courses/${course.id}`);
  }

  async onCourseDelete (courseId: Course['id']): Promise<void> {
    await this.courseService.getCourseById(courseId).subscribe(c => {
      const isUserAgree = confirm(`Удалить курс ${c.title}`);

      if (isUserAgree) {
        this.courseService.removeCourse(courseId).subscribe(() => {
          this.updateCourses().subscribe(c => {
            this.courses$.next(c);
          });
        });
      }
    });
  }

  onSearch (filterValue: string): void {
    this.updateCourses({
      textFragment: filterValue,
    }).subscribe(c => {
      this.courses$.next(c);
    })
  }

  onLoadMore () {
    const courses = this.courses$.getValue();
    this.updateCourses().subscribe(c => {
      this.courses$.next([...courses, ...c]);
      this.allCoursesAmount += c.length;
    })
  }

  updateCourses (additionalParams?: Object) {
    return this.courseService.getCourses({
      count: this.allCoursesAmount.toString(),
      ...additionalParams,
    })
  }
}
