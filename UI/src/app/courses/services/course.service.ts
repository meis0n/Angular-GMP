import { Injectable } from '@angular/core';

import { Course } from '../entities/course';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import * as moment from 'moment';
import { CoursesSearchParams } from '../entities/courses-search-params';

import { LoaderService } from '../../shared/services/loader.service';

const mapper = {
  fromBE: function (c: Record<string, any>): Course {
    return {
      creationDate: c['date'],
      description: c['description'],
      durationMin: c['length'],
      id: c['id'],
      title: c['name'],
      topRated: c['isTopRated'],
    };
  },
  toBE: function (c: Course): Record<string, any> {
    return {
      date: moment(c.creationDate).toISOString(),
      description: c.description,
      length: c.durationMin,
      id: c.id || (Math.random() * 10000).toFixed(0).toString(),
      name: c.title,
      isTopRated: c.topRated,
    };
  }
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  BASE_URL = 'courses';
  /**
   *
   */
  constructor(private httpClient: HttpClient, private loaderService: LoaderService) {}

  getCourses(options?: CoursesSearchParams): Observable<Course[]> {
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
      delay(2000),
      map(
        (courses: Record<string, any>[]) => {
          return courses.map(mapper.fromBE);
        },
      )
    );
  }

  createCourse(course: Course): Observable<Record<string, any>> {
    return this.httpClient.post(`${this.BASE_URL}`, mapper.toBE(course));
  }

  getCourseById(id: Course['id']): Observable<Course> {
    return this.httpClient.get(`${this.BASE_URL}/${id}`).pipe(
      map(mapper.fromBE)
    );
  }

  updateCourse(course: Course): Observable<Record<string, any>> {
    return this.httpClient.put(`${this.BASE_URL}/${course.id}`, mapper.toBE(course));
  }

  removeCourse(id: Course['id']): Observable<Record<string, any>> {
    return this.httpClient.delete(`${this.BASE_URL}/${id}`);
  }
}
