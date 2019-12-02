import { Injectable } from '@angular/core';

import { courses } from './mock';
import { Course } from './course';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  getCourses(): Course[] {
    return this.courses;
  }
  createCourse(course: Course): void {
    this.courses.push(course);
  }
  getCourseById(id: Course['id']): Course {
    return this.courses.find(c => c.id === id);
  }
  updateCourse(course: Course): void {
    this.courses = this.courses.map(c => c.id === course.id ? course : c);
  }
  removeCourse(id: Course['id']): void {
    this.courses = this.courses.filter(c => c.id !== id);
  }

  private courses: Course[] = courses;
}
