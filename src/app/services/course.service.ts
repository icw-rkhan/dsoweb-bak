import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from './auth/auth.service';

import { Course } from '../models/course.model';
import { CourseBookmark } from '../models/course-bookmark.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
      private http: HttpClient,
      private authService: AuthService) {

  }

  courses(body: any): Observable<Course[]> {
    const url = `${environment.educationApiUrl}/generic/courses`;
    const headers = this.getHeaders();

    return this.http.post(url, body, {headers}).pipe(map((response: any) =>
        response.resultMap.data.map(course => new Course().deserialize(course))));
  }

  bookmarks(body: any): Observable<CourseBookmark[]> {
    const url = `${environment.educationApiUrl}/bookmark/bookmarks`;
    const headers = this.getHeaders();

    return this.http.get(url, {headers, params: body}).pipe(map((response: any) =>
    response.resultMap.data.map(bookmark => new CourseBookmark().deserialize(bookmark))));
  }

  addBookmark(id: string) {
    const url = `${environment.educationApiUrl}/bookmark/bookmark`;
    const headers = this.getHeaders();

    const request = {
        'courseId': id
    };

    return this.http.post(url, null, {headers, params: request});
  }

  removeBookmark(id: string) {
    const url = `${environment.educationApiUrl}/bookmark/bookmark/${id}`;
    const headers = this.getHeaders();

    return this.http.delete(url, {headers});
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }
}
