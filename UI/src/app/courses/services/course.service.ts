import { Injectable } from '@angular/core';

import { Course } from '../entities/course';
import { HttpClient } from '@angular/common/http';
import { map, delay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import * as moment from 'moment';
import { CoursesSearchParams } from '../entities/courses-search-params';

import { LoaderService } from '../../shared/services/loader.service';
import { AuthorsService } from './authors.service';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  BASE_URL = 'courses';
  /**
   *
   */
  constructor(private httpClient: HttpClient, private loaderService: LoaderService, private authorsService: AuthorsService) {}

  getCourses(options?: CoursesSearchParams): Observable<Course[]> {
    const session = this.loaderService.add();
    return this.httpClient.get(`${this.BASE_URL}`, {
      params: {
        ...{
          ...options,
          count: options && options.count && options.count.toString(),
          start: options && options.start && options.start.toString(),
        }
      }
    }).pipe(
      // to show loader component behavior
      delay(500),
      tap(() => this.loaderService.resolve(session)),
      map(
        (courses: Record<string, any>[]) => {
          return courses.map(this.mapFromBE.bind(this));
        },
      ),
    );
  }

  createCourse(course: Course): Observable<Record<string, any>> {
    return this.httpClient.post(`${this.BASE_URL}`, this.mapToBE(course));
  }

  getCourseById(id: Course['id']): Observable<Course> {
    return this.httpClient.get(`${this.BASE_URL}/${id}`).pipe(
      map(this.mapFromBE.bind(this))
    );
  }

  updateCourse(course: Partial<Course>): Observable<Record<string, any>> {
    return this.httpClient.put(`${this.BASE_URL}/${course.id}`, this.mapToBE(course));
  }

  removeCourse(id: Course['id']): Observable<Record<string, any>> {
    return this.httpClient.delete(`${this.BASE_URL}/${id}`);
  }

  mapFromBE (c: Record<string, any>): Course {
    return {
      creationDate: c['date'],
      description: c['description'],
      durationMin: c['length'],
      id: c['id'],
      title: c['name'],
      topRated: c['isTopRated'],
      authors: c['authors'] ? c['authors'].map(this.authorsService.mapAuthorFromBE) : [],
    };
  }

  mapToBE (c: Partial<Course>): Record<string, any> {
    return {
      date: c.creationDate,
      description: c.description,
      length: c.durationMin,
      id: c.id || (Math.random() * 10000).toFixed(0).toString(),
      name: c.title,
      isTopRated: c.topRated,
      authors: c.authors,
    };
  }
}
