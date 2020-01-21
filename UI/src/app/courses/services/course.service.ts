import { Injectable } from '@angular/core';

import { courses } from '../mock';
import { Course } from '../course';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import * as moment from 'moment';
import { GetCoursesRequest } from './contracts/getCoursesRequest';

const mapper = {
  fromBE: function (c: Object) {
    return {
      creationDate: c['date'],
      description: c['description'],
      durationMin: c['length'],
      id: c['id'],
      title: c['name'],
      topRated: c['isTopRated'],
    };
  },
  toBE: function (c: Course): Object {
    return {
      date: moment(c.creationDate).toISOString(),
      description: c.description,
      length: c.durationMin,
      id: c.id || (Math.random() * 10000).toFixed(0).toString(),
      name: c.title,
      isTopRated: c.topRated,
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  BASE_URL = 'courses';
  /**
   *
   */
  constructor(private httpClient: HttpClient) {}

  getCourses(options?: GetCoursesRequest): Observable<Course[]> {
    return this.httpClient.get(`${this.BASE_URL}`, {
      params: {
        ...{
          start: '0',
          count: '10'
        },
        ...options
      }
    }).pipe(
      map(
        (courses: Object[]) => {
          return courses.map(mapper.fromBE);
        },
      )
    );
  }

  createCourse(course: Course): Observable<Object> {
    return this.httpClient.post(`${this.BASE_URL}`, mapper.toBE(course));
  }

  getCourseById(id: Course['id']): Observable<Course> {
    return this.httpClient.get(`${this.BASE_URL}/${id}`).pipe(
      map(mapper.fromBE)
    );
  }

  updateCourse(course: Course): Observable<Object> {
    return this.httpClient.patch(`${this.BASE_URL}/${course.id}`, mapper.toBE(course));
  }

  removeCourse(id: Course['id']): Observable<Object> {
    return this.httpClient.delete(`${this.BASE_URL}/${id}`);
  }

  private courses: Course[] = courses;
}
