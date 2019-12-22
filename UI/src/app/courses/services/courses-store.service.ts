import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscribable } from 'rxjs';
import { Course } from '../entities/course';
import { CourseService } from './course.service';
import { CoursesSearchParams } from '../entities/courses-search-params';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  public _courses = new BehaviorSubject<Course[]>([]);
  private _pageSize = 10;
  private _lastSearchParams: CoursesSearchParams = {
    start: 0,
    count: this._pageSize,
  };

  public courses$ = this._courses.asObservable();

  constructor( private coursesBackendService: CourseService) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.get();
  }

  get(searchParams?: CoursesSearchParams) {
    searchParams = {
      ...this._lastSearchParams,
      ...searchParams,
    };
    this.coursesBackendService.getCourses(searchParams).subscribe(c => {
      this._lastSearchParams = searchParams;
      this._courses.next(c);
    });
  }

  nextPage() {
    this.get({
      count: this._lastSearchParams.count += this._pageSize,
    });
  }

  previousPage() {
    const count = this._lastSearchParams.count -= this._pageSize;
    this.get({
      count: count < 0 ? 0 : count,
    });
  }

  createCourse(course: Course): void {
    this.coursesBackendService.createCourse(course).subscribe(() => {
      this.get();
    });
  }

  updateCourse(course: Course): void {
    this.coursesBackendService.updateCourse(course).subscribe(() => {
      this.get();
    });
  }

  removeCourse(id: Course['id']) {
    this.coursesBackendService.removeCourse(id).subscribe(() => {
      this.get();
    });;
  }
}
