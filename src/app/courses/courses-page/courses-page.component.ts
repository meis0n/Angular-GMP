import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../course';

import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  faPlus = faPlus;

  courses: Course[];

  filter: string;

  constructor (
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit (): void {
    this.courses = this.courseService.getCourses();
  }

  addCourse (): void {
    this.router.navigateByUrl('course/new');
  }

  onCourseChange (course: Course): void {
    this.router.navigateByUrl(`course/${course.id}`);
  }

  async onCourseDelete (courseId: Course['id']): Promise<void> {
    const course = await this.courseService.getCourseById(courseId);
    const isUserAgree = confirm(`Удалить курс ${course.title}`);
    if (isUserAgree) {
      await this.courseService.removeCourse(courseId);
      this.refreshCourses();
    }
  }

  onSearch (filterValue: string): void {
    this.filter = filterValue;
  }

  private refreshCourses (): void {
    this.courses = this.courseService.getCourses();
  }
}
