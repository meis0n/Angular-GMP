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

  constructor() { }

  ngOnInit() {
    this.courses = courses;
  }

  addCourse() {
    console.log('add new course');
  }

  onCourseChange(course: Course) {
    console.log(course);
  }

  onCourseDelete(courseId: string) {
    console.log(courseId);
  }

  onSearch(filterValue: string) {
    this.filter = filterValue;
  }
}
