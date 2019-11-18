import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../course';

import { courses } from './mock';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  faPlus = faPlus;

  courses: Course[];

  filter: string;

  ngOnInit (): void {
    this.courses = courses;
  }

  addCourse (): void {
    console.log('add new course');
  }

  onCourseChange (course: Course): void {
    console.log(course);
  }

  onCourseDelete (courseId: string): void {
    console.log(courseId);
  }

  onSearch (filterValue: string): void {
    this.filter = filterValue;
  }
}
