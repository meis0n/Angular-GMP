import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../entities/course';
import { CourseService } from './course.service';
import { CoursesSearchParams } from '../entities/courses-search-params';
import { LoaderService } from 'src/app/shared/services/loader.service';

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

  constructor( private coursesBackendService: CourseService, private loaderService: LoaderService) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.get();
  }

  get(searchParams?: CoursesSearchParams): void {
    searchParams = {
      ...this._lastSearchParams,
      ...searchParams,
    };
    const session = this.loaderService.add();
    this.coursesBackendService.getCourses(searchParams).subscribe(c => {
      this._lastSearchParams = searchParams;
      this._courses.next(c);
    }, null, () => {
      this.loaderService.resolve(session);
    });
  }

  nextPage(): void {
    this.get({
      count: this._lastSearchParams.count += this._pageSize,
    });
  }

  previousPage(): void {
    const count = this._lastSearchParams.count -= this._pageSize;
    this.get({
      count: count < 0 ? 0 : count,
    });
  }

  createCourse(course: Course): void {
    const session = this.loaderService.add();
    this.coursesBackendService.createCourse(course).subscribe(() => {
      this.get();
    }, null, () => {
      this.loaderService.resolve(session);
    });
  }

  updateCourse(course: Course): void {
    const session = this.loaderService.add();
    this.coursesBackendService.updateCourse(course).subscribe(() => {
      this.get();
    }, null, () => {
      this.loaderService.resolve(session);
    });
  }

  removeCourse(id: Course['id']): void {
    const session = this.loaderService.add();
    this.coursesBackendService.removeCourse(id).subscribe(() => {
      this.get();
    }, null, () => {
      this.loaderService.resolve(session);
    });
  }
}
