import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { environment } from '../../environments/environment';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  jobs(body: any): Observable<Job[]> {
    const url = `${environment.careerAPIUrl}/job/findAll`;

    const headers = this.getHeaders();

    return this.http.post(url, body, {headers}).pipe(
      map((response: any) => response.resultMap.data.map(job => new Job().deserialize(job)))
    );
  }

  getJobById(id: string): Observable<Job> {
    const url = `${environment.careerAPIUrl}/job/findOneById`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers, params: {'id': id}}).pipe(
      map((response: any) => new Job().deserialize(response.resultMap.data)));
  }

  savedJobs(body: any): Observable<Job[]> {
    const url = `${environment.careerAPIUrl}/application/findAll`;

    const headers = this.getHeaders();

    return this.http.post(url, body, {headers}).pipe(
      map((response: any) => response.resultMap.data.map(job => new Job().deserialize(job)))
    );
  }

  saveJob(id: string) {
    const url = `${environment.careerAPIUrl}/application/save`;

    const headers = this.getHeaders();

    return this.http.post(url, {'jobId': id}, {headers});
  }

  bookmarkedJobs(body: any): Observable<Job[]> {
    const url = `${environment.careerAPIUrl}/bookmark/findAllByUserId`;

    const headers = this.getHeaders();

    return this.http.post(url, body, {headers}).pipe(
      map((response: any) => response.resultMap.bookmarkList.map(job => new Job().deserialize(job)))
    );
  }

  addBookmark(id: string) {
    const url = `${environment.careerAPIUrl}/bookmark/save`;

    const headers = this.getHeaders();

    return this.http.post(url, {'jobId': id}, {headers});
  }

  deleteBookmark(id: string) {
    const url = `${environment.careerAPIUrl}/bookmark/deleteOneById`;

    const headers = this.getHeaders();

    return this.http.post(url, null, {headers, params: {'id': id}});
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.auth.getToken()}`)
      .append('Content-Type', 'application/json');

    return headers;
  }
}
